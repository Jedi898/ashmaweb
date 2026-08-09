"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-[#d4af37]/10">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <a
              href="#"
              className="text-sm font-serif tracking-[0.15em] text-[#c4b998] hover:text-[#d4af37] transition-colors duration-300"
            >
              ASHMA SINGH THAKURI
            </a>
          </motion.div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs text-[#c4b998]/50 font-light flex items-center gap-1"
          >
            &copy; {new Date().getFullYear()} Crafted with
            <Heart size={12} className="text-[#d4af37] fill-[#d4af37]" />
            in Nepal
          </motion.p>
        </div>
      </div>
    </footer>
  );
}

