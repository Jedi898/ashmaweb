import { NextRequest, NextResponse } from "next/server";

/**
 * Secure contact form endpoint.
 *
 * Security measures:
 *  - Server-side validation (never trust the client).
 *  - In-memory rate limiting (per-IP sliding window) to deter spam/abuse.
 *  - No user-controlled HTML is echoed back (JSON only).
 *  - Returns generic error messages to avoid leaking internals.
 *
 * NOTE: In-memory rate limiting is per-server-instance. For a production
 * multi-instance deploy, prefer a shared store (e.g. Upstash Redis / Vercel KV)
 * or the Vercel WAF rate limiting rules. This keeps the portfolio dependency-free
 * while still protecting the single-instance default.
 */

// Simple sliding-window rate limiter keyed by IP.
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 submissions per minute per IP

const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX) return true;
  return false;
}

// Basic email regex — good enough for validation, never a security boundary.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_LENGTHS = { name: 100, email: 254, subject: 200, message: 2000 };

export async function POST(request: NextRequest) {
  // Derive a client key (IP, or a fallback for environments without one).
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Validate shape.
  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, subject, message } = body as Record<string, unknown>;

  const errors: string[] = [];

  if (typeof name !== "string" || name.trim().length < 2) {
    errors.push("A valid name (at least 2 characters) is required.");
  } else if (name.length > MAX_LENGTHS.name) {
    errors.push(`Name must be under ${MAX_LENGTHS.name} characters.`);
  }

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    errors.push("A valid email address is required.");
  } else if (email.length > MAX_LENGTHS.email) {
    errors.push(`Email must be under ${MAX_LENGTHS.email} characters.`);
  }

  if (typeof subject !== "string" || subject.trim().length < 3) {
    errors.push("A subject (at least 3 characters) is required.");
  } else if (subject.length > MAX_LENGTHS.subject) {
    errors.push(`Subject must be under ${MAX_LENGTHS.subject} characters.`);
  }

  if (typeof message !== "string" || message.trim().length < 10) {
    errors.push("A message (at least 10 characters) is required.");
  } else if (message.length > MAX_LENGTHS.message) {
    errors.push(`Message must be under ${MAX_LENGTHS.message} characters.`);
  }

  if (errors.length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

// ── Delivery ─────────────────────────────────────────────────────────────
  // Safely strip any control characters from the message before logging/
  // forwarding to prevent header-injection style issues.
  const clean = (s: string) => s.replace(/[\u0000-\u001f\u007f]/g, "").trim();
  const payload = {
    name: clean(String(name)),
    email: clean(String(email)),
    subject: clean(String(subject)),
    message: clean(String(message)),
  };

  // By default, the portfolio has no email provider configured, so we ack the
  // submission and log it server-side. To enable real delivery, integrate a
  // provider (Resend/SendGrid/Postmark) here using server-side env vars and
  // never expose the API key to the client.
  // eslint-disable-next-line no-console
  console.log("[contact] new submission", payload);

  return NextResponse.json(
    { ok: true, message: "Message received. Thank you!" },
    { status: 200 }
  );
}

// Only allow POST — reject others with 405 for a tighter surface.
export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
