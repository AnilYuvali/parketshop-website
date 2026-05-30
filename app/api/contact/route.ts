import { createHash } from "node:crypto";

import { NextResponse, type NextRequest } from "next/server";

import { captureAndDeliverLead } from "@/lib/contact/delivery";
import { assessContactSpam, validateContactLeadPayload } from "@/lib/contact/validation";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const rateLimitWindowMs = 15 * 60 * 1000;
const maxRequestsPerWindow = 5;
const requestBuckets = new Map<string, { count: number; resetAt: number }>();

function json(status: number, body: Record<string, unknown>) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}

function hashIp(ip: string) {
  const salt = process.env.CONTACT_IP_HASH_SALT ?? "parketshop-contact";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

function checkRateLimit(key: string) {
  const now = Date.now();
  const current = requestBuckets.get(key);

  if (!current || current.resetAt <= now) {
    requestBuckets.set(key, { count: 1, resetAt: now + rateLimitWindowMs });
    return true;
  }

  if (current.count >= maxRequestsPerWindow) return false;

  current.count += 1;
  return true;
}

function isAllowedOrigin(request: NextRequest) {
  const allowed = (process.env.CONTACT_ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (allowed.length === 0) return true;

  const origin = request.headers.get("origin");
  return !origin || allowed.includes(origin);
}

async function readJson(request: NextRequest) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  if (!isAllowedOrigin(request)) {
    return json(403, {
      ok: false,
      message: "Bu istek kabul edilemedi.",
    });
  }

  const ip = getClientIp(request);

  if (!checkRateLimit(ip)) {
    return json(429, {
      ok: false,
      message: "Çok fazla deneme yapıldı. Lütfen birkaç dakika sonra tekrar deneyin.",
    });
  }

  const body = await readJson(request);

  if (!body) {
    return json(400, {
      ok: false,
      message: "Form verisi okunamadı.",
    });
  }

  const validation = validateContactLeadPayload(body);
  const spam = assessContactSpam(validation.payload);

  if (spam.blockSilently) {
    return json(200, {
      ok: true,
      message: "Mesajınız alındı. Teşekkür ederiz.",
    });
  }

  if (!validation.ok) {
    return json(400, {
      ok: false,
      message: "Lütfen form alanlarını kontrol edin.",
      fieldErrors: validation.fieldErrors,
    });
  }

  const result = await captureAndDeliverLead(validation.lead, {
    ipHash: hashIp(ip),
    origin: request.headers.get("origin"),
    referer: request.headers.get("referer"),
    spamScore: spam.score,
    userAgent: request.headers.get("user-agent"),
  });

  if (!result.captured && !result.delivered) {
    console.error("Contact lead capture or delivery failed", result.error);

    return json(503, {
      ok: false,
      message: "Mesajınız şu anda gönderilemedi. Lütfen daha sonra tekrar deneyin.",
    });
  }

  if (result.deliveryAttempted && !result.delivered) {
    console.error("Contact lead delivery failed", {
      error: result.error,
      leadId: result.leadId,
    });
  }

  return json(200, {
    ok: true,
    message: "Mesajınız alındı. Teşekkür ederiz.",
  });
}
