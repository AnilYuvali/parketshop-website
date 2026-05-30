export type ContactField = "name" | "phone" | "email" | "message";

export type ContactFieldErrors = Partial<Record<ContactField, string>>;

export type ContactLead = {
  name: string;
  phone: string;
  email: string;
  message: string;
  pageUrl: string | null;
};

export type ContactPayload = ContactLead & {
  website: string;
  startedAt: number | null;
};

type ContactValidationSuccess = {
  ok: true;
  lead: ContactLead;
  payload: ContactPayload;
};

type ContactValidationFailure = {
  ok: false;
  fieldErrors: ContactFieldErrors;
  payload: ContactPayload;
};

export type ContactValidationResult = ContactValidationSuccess | ContactValidationFailure;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phonePattern = /^\+?[0-9\s().-]{7,32}$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function textField(record: Record<string, unknown>, key: string): string {
  const value = record[key];
  return typeof value === "string" ? value : "";
}

function optionalUrl(record: Record<string, unknown>, key: string): string | null {
  const value = textField(record, key).trim();
  if (!value) return null;

  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.toString().slice(0, 500);
  } catch {
    return null;
  }
}

function parseStartedAt(record: Record<string, unknown>): number | null {
  const value = record.startedAt;

  if (typeof value === "number" && Number.isFinite(value)) return value;

  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function normalizeSingleLine(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function normalizeMessage(value: string): string {
  return value.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();
}

export function readContactPayload(input: unknown): ContactPayload {
  const record = isRecord(input) ? input : {};

  return {
    name: normalizeSingleLine(textField(record, "name")),
    phone: normalizeSingleLine(textField(record, "phone")),
    email: normalizeSingleLine(textField(record, "email")).toLowerCase(),
    message: normalizeMessage(textField(record, "message")),
    website: normalizeSingleLine(textField(record, "website")),
    startedAt: parseStartedAt(record),
    pageUrl: optionalUrl(record, "pageUrl"),
  };
}

export function validateContactLeadPayload(input: unknown): ContactValidationResult {
  const payload = readContactPayload(input);
  const fieldErrors: ContactFieldErrors = {};
  const phoneDigits = payload.phone.replace(/\D/g, "");

  if (payload.name.length < 2) {
    fieldErrors.name = "Lütfen adınızı yazın.";
  } else if (payload.name.length > 120) {
    fieldErrors.name = "Ad alanı 120 karakterden kısa olmalı.";
  }

  if (!phonePattern.test(payload.phone) || phoneDigits.length < 7 || phoneDigits.length > 15) {
    fieldErrors.phone = "Lütfen geçerli bir telefon numarası yazın.";
  }

  if (!emailPattern.test(payload.email) || payload.email.length > 254) {
    fieldErrors.email = "Lütfen geçerli bir e-posta adresi yazın.";
  }

  if (payload.message.length < 10) {
    fieldErrors.message = "Mesajınız en az 10 karakter olmalı.";
  } else if (payload.message.length > 2000) {
    fieldErrors.message = "Mesajınız 2000 karakterden kısa olmalı.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors, payload };
  }

  return {
    ok: true,
    lead: {
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
      message: payload.message,
      pageUrl: payload.pageUrl,
    },
    payload,
  };
}

export function assessContactSpam(payload: ContactPayload, now = Date.now()) {
  const elapsedMs = payload.startedAt ? now - payload.startedAt : null;
  const linkCount = (payload.message.match(/https?:\/\/|www\.|\.com|\.net|\.org/gi) ?? []).length;
  const repeatedCharacters = /(.)\1{7,}/.test(payload.message);
  const htmlTags = /<[^>]+>/.test(payload.message);
  const score =
    (payload.website ? 10 : 0) +
    (elapsedMs !== null && elapsedMs < 2500 ? 5 : 0) +
    (elapsedMs !== null && elapsedMs < 0 ? 5 : 0) +
    (linkCount > 2 ? 3 : 0) +
    (repeatedCharacters ? 1 : 0) +
    (htmlTags ? 2 : 0);

  return {
    blockSilently: Boolean(payload.website) || (elapsedMs !== null && elapsedMs < 2500) || score >= 5,
    elapsedMs,
    linkCount,
    score,
  };
}
