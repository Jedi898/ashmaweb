"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Pressable } from "@/lib/motion-primitives";

const navLinks = [
  { label: "About", href: "#about", id: "about" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Education", href: "#education", id: "education" },
  { label: "Portfolio", href: "#portfolio", id: "portfolio" },
  { label: "Gallery", href: "#gallery", id: "gallery" },
  { label: "Contact", href: "#contact", id: "contact" },
];

/** Track the section currently in view for the sliding active pill. */
function useActiveSection() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    for (const link of navLinks) {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return active;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 pt-safe ${
        scrolled
          ? "bg-[#0a0a0b]/80 backdrop-blur-xl border-b border-[#d4af37]/10 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo — 44px touch target */}
          <a
            href="#"
            className="min-touch flex items-center text-lg sm:text-xl font-serif tracking-[0.15em] text-[#f5f0e8] hover:text-[#d4af37] transition-colors duration-300"
            aria-label="Back to top"
          >
            ASHMA<span className="text-[#d4af37]">.</span>
          </a>

          {/* Desktop Links — shown at lg (1024px) to fit iPad landscape + desktop */}
          <div className="hidden lg:flex items-center gap-1 lg:gap-2 xl:gap-3">
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`relative min-touch flex items-center px-3 py-2 rounded-full text-sm font-medium tracking-wider transition-colors duration-150 group ${
                    isActive
                      ? "text-[#0a0a0b]"
                      : "text-[#c4b998] hover:text-[#f5f0e8]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: "spring", stiffness: 400, damping: 34, mass: 0.7 }}
                      className="absolute inset-0 rounded-full bg-[#d4af37] -z-10"
                    />
                  )}
                  {link.label}
                </a>
              );
            })}
            <Pressable
              as="a"
              href="#contact"
              className="pressable group relative min-touch ml-2 px-5 py-2 text-sm font-medium tracking-wider text-[#0a0a0b] bg-[#d4af37] rounded-full overflow-hidden hover:bg-[#e8c84a] hover:shadow-lg hover:shadow-[#d4af37]/25"
            >
              <span className="relative z-10">Get in Touch</span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-[#e8c84a] to-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                initial={false}
              />
            </Pressable>
          </div>

          {/* Mobile Menu Button — 44px touch target */}
          <Pressable
            as="button"
            className="pressable min-touch lg:hidden relative w-11 h-11 flex items-center justify-center text-[#f5f0e8] hover:text-[#d4af37]"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </Pressable>
        </div>
      </nav>

      {/* Mobile Menu — transform/opacity only (no height thrash) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="lg:hidden border-t border-[#d4af37]/10 bg-[#0a0a0b]/95 backdrop-blur-xl overflow-hidden"
            style={{ maxHeight: "calc(100dvh - 4rem)" }}
          >
            <div className="px-4 py-4 overflow-y-auto space-y-1 pb-safe">
              {navLinks.map((link, i) => {
                const isActive = active === link.id;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03, duration: 0.18 }}
                    onClick={closeMobile}
                    className={`relative block min-touch px-4 py-3 rounded-xl text-sm font-medium tracking-wider transition-colors ${
                      isActive
                        ? "text-[#d4af37] bg-[#d4af37]/10"
                        : "text-[#c4b998] hover:text-[#f5f0e8]"
                    }`}
                  >
                    {link.label}
                  </motion.a>
                );
              })}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.18 }}
                onClick={closeMobile}
                className="block w-full min-touch text-center px-5 py-3 text-sm font-medium tracking-wider text-[#0a0a0b] bg-[#d4af37] rounded-full hover:bg-[#e8c84a] transition-colors"
              >
                Get in Touch
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
