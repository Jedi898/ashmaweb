import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent the site from being embedded in third-party frames (clickjacking).
  { key: "X-Frame-Options", value: "DENY" },
  // Prevent MIME-type sniffing.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Defense-in-depth XSS filter (legacy browsers).
  { key: "X-XSS-Protection", value: "1; mode=block" },
  // Only send the origin, not the full path, on cross-origin requests.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Restrict browser features.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // Enforce HTTPS in production (browser-based upgrade). HSTS is also set via
  // vercel.json for strict, includeSubDomains coverage.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Content-Security-Policy. Inline styles are required by Tailwind/Framer;
  // inline scripts are required by Next.js hydration. Static portfolio (no
  // user HTML, no dangerouslySetInnerHTML) keeps XSS surface minimal while
  // still blocking frame-embedding, plugin injection, and mixed content.
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "img-src 'self' data: blob:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join("; "),
  },
];

const imageCache = { key: "Cache-Control", value: "public, max-age=31536000, immutable" };

const nextConfig: NextConfig = {
  images: {
    // Serve optimized images with responsive srcset
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 480, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24, // 24h cache for optimized images
  },
  async headers() {
    return [
      {
        // Apply hardening to every route (defense in depth alongside middleware).
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/gallery/:path*",
        headers: [imageCache],
      },
      {
        source: "/gallery2/:path*",
        headers: [imageCache],
      },
      {
        source: "/banner.png",
        headers: [imageCache],
      },
      {
        source: "/profile.webp",
        headers: [imageCache],
      },
      {
        source: "/about.webp",
        headers: [imageCache],
      },
    ];
  },
};

export default nextConfig;
