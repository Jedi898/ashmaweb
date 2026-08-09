import { NextRequest, NextResponse } from "next/server";

/**
 * Edge proxy — defense-in-depth security headers applied to every route before
 * the response reaches the client. This runs on the edge network (and locally
 * in dev), so protection is guaranteed regardless of hosting config. The
 * `next.config.ts` headers() block mirrors the same set as a fallback.
 *
 * NOTE: Next.js 16 renamed the `middleware` convention to `proxy`. This file
 * follows the new convention.
 */
export default function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // Restrict embedding: never allow this site inside a frame.
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Content-Security-Policy", "frame-ancestors 'none'");

  // Prevent MIME sniffing.
  response.headers.set("X-Content-Type-Options", "nosniff");

  // Referrer policy — don't leak the full URL cross-origin.
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Restrict powerful browser features.
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()"
  );

  // Enforce HTTPS (overlaps with HSTS in next.config / vercel.json).
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );

  return response;
}

// Run on all routes except static build assets and certain static files.
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|txt|xml|webmanifest)).*)",
  ],
};
