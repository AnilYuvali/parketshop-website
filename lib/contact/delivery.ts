import { createHmac } from "node:crypto";

import type { ContactLead } from "@/lib/contact/validation";

type LeadContext = {
  ipHash: string | null;
  origin: string | null;
  referer: string | null;
  spamScore: number;
  userAgent: string | null;
};

type DeliveryResult = {
  captured: boolean;
  delivered: boolean;
  deliveryAttempted: boolean;
  leadId?: string;
  error?: string;
};

type SupabaseConfig = {
  key: string;
  mode: "insert-only" | "service";
  url: string;
};

type DeliveryPayload = {
  context: LeadContext;
  lead: ContactLead;
  leadId?: string;
  toEmail: string;
};

const defaultLeadEmail = "anil@parketshop.com.tr";

function getSupabaseConfig(): SupabaseConfig | null {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const key = serviceKey ?? publishableKey;

  if (!url || !key) return null;

  return {
    url: url.replace(/\/+$/, ""),
    key,
    mode: serviceKey ? "service" : "insert-only",
  };
}

function getLeadRecipient() {
  return process.env.CONTACT_LEAD_TO_EMAIL ?? defaultLeadEmail;
}

function getWebhookUrls() {
  return [process.env.CONTACT_CRM_WEBHOOK_URL, process.env.CONTACT_LEAD_WEBHOOK_URL]
    .filter((value): value is string => Boolean(value))
    .map((value) => value.trim())
    .filter(Boolean);
}

function signatureFor(body: string) {
  const secret = process.env.CONTACT_LEAD_WEBHOOK_SECRET;
  if (!secret) return null;
  return createHmac("sha256", secret).update(body).digest("hex");
}

async function safeResponseText(response: Response) {
  try {
    return (await response.text()).slice(0, 500);
  } catch {
    return "";
  }
}

async function insertSupabaseLead(lead: ContactLead, context: LeadContext) {
  const config = getSupabaseConfig();
  if (!config) return null;
  const selectId = config.mode === "service";

  const response = await fetch(`${config.url}/rest/v1/contact_leads${selectId ? "?select=id" : ""}`, {
    method: "POST",
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
      "Content-Type": "application/json",
      Prefer: selectId ? "return=representation" : "return=minimal",
    },
    body: JSON.stringify({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      message: lead.message,
      page_url: lead.pageUrl,
      user_agent: context.userAgent,
      ip_hash: context.ipHash,
      spam_score: context.spamScore,
      metadata: {
        origin: context.origin,
        referer: context.referer,
        to_email: getLeadRecipient(),
      },
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Supabase insert failed (${response.status}): ${await safeResponseText(response)}`);
  }

  if (!selectId) return "captured";

  const rows = (await response.json()) as Array<{ id?: string }>;
  return rows[0]?.id ?? null;
}

async function updateSupabaseDeliveryStatus(
  leadId: string | undefined,
  status: "delivered" | "delivery_failed",
  error?: string,
) {
  const config = getSupabaseConfig();
  if (!config || !leadId) return;

  const response = await fetch(`${config.url}/rest/v1/contact_leads?id=eq.${encodeURIComponent(leadId)}`, {
    method: "PATCH",
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      status,
      delivered_at: status === "delivered" ? new Date().toISOString() : null,
      delivery_attempted_at: new Date().toISOString(),
      delivery_error: error ? error.slice(0, 1000) : null,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Supabase delivery update failed (${response.status}): ${await safeResponseText(response)}`);
  }
}

async function postWebhook(url: string, payload: DeliveryPayload) {
  const body = JSON.stringify(payload);
  const signature = signatureFor(body);
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (signature) headers["x-parketshop-signature"] = `sha256=${signature}`;

  const response = await fetch(url, {
    method: "POST",
    headers,
    body,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Webhook delivery failed (${response.status}): ${await safeResponseText(response)}`);
  }
}

async function sendResendEmail(payload: DeliveryPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const from = process.env.CONTACT_EMAIL_FROM;
  if (!from) {
    throw new Error("RESEND_API_KEY is set but CONTACT_EMAIL_FROM is missing.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [payload.toEmail],
      reply_to: payload.lead.email,
      subject: `Yeni ParketShop iletisim talebi: ${payload.lead.name}`,
      text: [
        "Yeni ParketShop iletisim talebi",
        "",
        `Ad: ${payload.lead.name}`,
        `E-posta: ${payload.lead.email}`,
        `Telefon: ${payload.lead.phone}`,
        payload.lead.pageUrl ? `Sayfa: ${payload.lead.pageUrl}` : null,
        payload.leadId ? `Lead ID: ${payload.leadId}` : null,
        "",
        payload.lead.message,
      ]
        .filter(Boolean)
        .join("\n"),
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Resend delivery failed (${response.status}): ${await safeResponseText(response)}`);
  }

  return true;
}

async function deliverLead(payload: DeliveryPayload) {
  const webhookUrls = getWebhookUrls();
  let attempted = false;
  let delivered = false;
  const errors: string[] = [];

  for (const url of webhookUrls) {
    attempted = true;
    try {
      await postWebhook(url, payload);
      delivered = true;
    } catch (error) {
      errors.push(error instanceof Error ? error.message : "Webhook delivery failed.");
    }
  }

  if (process.env.RESEND_API_KEY) {
    attempted = true;

    try {
      await sendResendEmail(payload);
      delivered = true;
    } catch (error) {
      errors.push(error instanceof Error ? error.message : "Email delivery failed.");
    }
  }

  if (attempted && !delivered && errors.length > 0) {
    throw new Error(errors.join(" "));
  }

  return {
    attempted,
    delivered,
    error: errors.length > 0 ? errors.join(" ") : undefined,
  };
}

export async function captureAndDeliverLead(lead: ContactLead, context: LeadContext): Promise<DeliveryResult> {
  let leadId: string | undefined;
  let captured = false;
  let captureError: string | undefined;

  try {
    leadId = (await insertSupabaseLead(lead, context)) ?? undefined;
    captured = Boolean(leadId);
  } catch (error) {
    captureError = error instanceof Error ? error.message : "Lead capture failed.";
  }

  try {
    const delivery = await deliverLead({
      lead,
      leadId,
      context,
      toEmail: getLeadRecipient(),
    });

    if (delivery.attempted) {
      await updateSupabaseDeliveryStatus(
        leadId,
        delivery.delivered ? "delivered" : "delivery_failed",
        delivery.error,
      );
    }

    return {
      captured,
      delivered: delivery.delivered,
      deliveryAttempted: delivery.attempted,
      leadId,
      error:
        [captureError, delivery.error].filter(Boolean).join(" ") ||
        (!delivery.attempted ? "No contact lead capture or delivery target configured." : undefined),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Lead delivery failed.";

    try {
      await updateSupabaseDeliveryStatus(leadId, "delivery_failed", message);
    } catch {
      // The lead itself is already captured; keep the user-facing path successful.
    }

    return {
      captured,
      delivered: false,
      deliveryAttempted: true,
      leadId,
      error: [captureError, message].filter(Boolean).join(" "),
    };
  }
}
