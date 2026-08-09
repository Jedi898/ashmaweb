import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-[#0a0a0b] text-[#f5f0e8] px-4">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#e8a87c]/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 text-center max-w-xl">
        <p className="text-[#d4af37] text-sm font-medium tracking-[0.25em] uppercase">
          Error 404
        </p>
        <h1 className="mt-3 font-serif font-bold text-[clamp(2.5rem,6vw,4rem)] leading-tight">
          Page Not <span className="gold-gradient-text">Found</span>
        </h1>
        <p className="mt-4 text-[#c4b998] font-light">
          The page you are looking for doesn&apos;t exist or may have moved.
          Let&apos;s get you back to the atelier.
        </p>
        <Link
          href="/"
          className="pressable inline-flex items-center justify-center mt-8 px-8 py-3.5 bg-[#d4af37] text-[#0a0a0b] font-medium tracking-wider rounded-full hover:shadow-xl hover:shadow-[#d4af37]/20"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
