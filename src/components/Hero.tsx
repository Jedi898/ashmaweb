"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Palette, Award } from "lucide-react";
import { Pressable } from "@/lib/motion-primitives";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const statCards = [
  {
    icon: Palette,
    value: "1+",
    label: "Years Teaching",
    gradient: "from-[#d4af37]/20 to-transparent",
  },
  {
    icon: Award,
    value: "6",
    label: "Semesters Developed",
    gradient: "from-[#e8a87c]/20 to-transparent",
  },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Luxury Theme Texture Background (Replaces banner.png) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Base Dark Palette */}
        <div className="absolute inset-0 bg-[#0a0a0b]" />

        {/* Haute Couture Dot / Grid Texture */}
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: `radial-gradient(#d4af37 0.75px, transparent 0.75px), radial-gradient(#d4af37 0.75px, #0a0a0b 0.75px)`,
            backgroundSize: `28px 28px`,
            backgroundPosition: `0 0, 14px 14px`,
          }}
        />

        {/* Elegant Geometric Silk Line Weave */}
        <svg
          className="absolute inset-0 w-full h-full opacity-25"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="hero-gold-weave"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 80 0 L 0 80 M 0 0 L 80 80"
                fill="none"
                stroke="url(#weaveGrad)"
                strokeWidth="0.5"
              />
              <linearGradient id="weaveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d4af37" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#e8a87c" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#d4af37" stopOpacity="0.4" />
              </linearGradient>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-gold-weave)" />
        </svg>

        {/* Pulsing Central Gold Glow */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.35, 0.5, 0.35],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-[#d4af37]/20 via-[#e8a87c]/10 to-transparent rounded-full blur-[140px]"
        />

        {/* Side Ambient Orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#d4af37]/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-[#e8a87c]/15 rounded-full blur-[100px]" />

        {/* Depth Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-[#0a0a0b]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0b]/90 via-transparent to-[#0a0a0b]/90" />
      </div>

      {/* Decorative Accent Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/25 to-transparent" />
        <div className="absolute bottom-[15%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/25 to-transparent" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-[#0a0a0b]/60 backdrop-blur-md border border-[#d4af37]/30 text-[#d4af37] text-xs sm:text-sm font-medium tracking-wider shadow-lg"
            >
              <Sparkles size={14} className="text-[#d4af37]" />
              Stylist for Mr. Nepal 2024
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-serif font-bold leading-[1.1] tracking-tight text-[clamp(2.25rem,6vw_+_0.5rem,6rem)]"
            >
              Transforming
              <br />
              <span className="gold-gradient-text">Inspiration</span>
              <br />
              into Wearable Art
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg sm:text-xl text-[#c4b998] font-light tracking-wide max-w-xl mx-auto lg:mx-0"
            >
              Fashion Educator <span className="text-[#d4af37]">•</span> Digital
              Illustrator <span className="text-[#d4af37]">•</span> Editorial
              Stylist
            </motion.p>

            {/* Highlight badge */}
            <motion.p
              variants={itemVariants}
              className="mt-4 text-sm text-[#c4b998]/70 font-light italic max-w-lg mx-auto lg:mx-0"
            >
              Faculty at IEC College of Art & Fashion
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <Pressable
                as="a"
                href="#portfolio"
                className="group pressable relative min-h-12 px-8 py-3.5 bg-[#d4af37] text-[#0a0a0b] font-medium tracking-wider rounded-full overflow-hidden hover:shadow-xl hover:shadow-[#d4af37]/20"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Portfolio
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </span>
                <motion.span className="absolute inset-0 bg-gradient-to-r from-[#e8c84a] to-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
              </Pressable>

              <Pressable
                as="a"
                href="#contact"
                className="group pressable relative min-h-12 px-8 py-3.5 text-[#f5f0e8] font-medium tracking-wider rounded-full overflow-hidden border border-[#d4af37]/40 backdrop-blur-md bg-[#0a0a0b]/40 hover:border-[#d4af37]/70"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Book Workshop / Styling
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </span>
              </Pressable>
            </motion.div>
          </div>

          {/* Right Side - Circular Profile & Floating Stats */}
          <motion.div
            variants={containerVariants}
            className="flex-1 flex flex-col items-center gap-6 w-full max-w-md mx-auto"
          >
            {/* Circular Profile Portrait */}
            <motion.div variants={itemVariants} className="relative">
              {/* Glow behind portrait */}
              <div className="absolute -inset-6 bg-gradient-to-br from-[#d4af37]/40 via-transparent to-[#e8a87c]/25 rounded-full blur-2xl opacity-70" />

              {/* Rotating gold ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-3 rounded-full border border-dashed border-[#d4af37]/50"
              />

              {/* Circular Frame */}
              <div className="relative w-[clamp(14rem,38vw,20rem)] h-[clamp(14rem,38vw,20rem)] rounded-full p-[4px] bg-gradient-to-br from-[#d4af37] via-[#e8a87c] to-[#d4af37] shadow-2xl shadow-black/50">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#0a0a0b]">
                  <img
                    src="/profile.webp"
                    alt="Ashma Singh Thakuri"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Floating name plate */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap glass-strong rounded-full px-6 py-2.5 backdrop-blur-xl shadow-lg shadow-black/30 border border-[#d4af37]/30">
                <p className="font-serif text-sm sm:text-base font-bold text-[#f5f0e8]">
                  Ashma Singh Thakuri
                </p>
              </div>

              {/* Gold ring decoration */}
              <div className="absolute -top-2 -right-2 w-12 h-12 border-2 border-[#d4af37]/50 rounded-full" />
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-[#d4af37]/30 rounded-full backdrop-blur-sm" />
            </motion.div>

            {/* Stats Row */}
            <div className="mt-10 grid grid-cols-2 gap-4 w-full">
              {statCards.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="relative p-5 rounded-2xl overflow-hidden glass-strong card-hover backdrop-blur-xl border border-[#d4af37]/20"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-40`}
                  />
                  <div className="relative z-10">
                    <stat.icon size={24} className="text-[#d4af37] mb-2" />
                    <div className="text-2xl sm:text-3xl font-serif font-bold text-[#f5f0e8]">
                      {stat.value}
                    </div>
                    <div className="text-xs text-[#c4b998] font-light mt-1">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Curriculum Card */}
            <motion.div
              variants={itemVariants}
              className="w-full relative p-4 rounded-2xl overflow-hidden glass-strong card-hover backdrop-blur-xl border border-[#d4af37]/20"
            >
              <div className="relative z-10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles size={18} className="text-[#d4af37]" />
                </div>
                <div>
                  <div className="text-sm font-medium text-[#f5f0e8]">
                    Curriculum Developer
                  </div>
                  <div className="text-xs text-[#c4b998] font-light">
                    Womenswear • Menswear • Kidswear
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border border-[#d4af37]/40 flex items-start justify-center pt-2 bg-[#0a0a0b]/30 backdrop-blur-sm"
        >
          <div className="w-1 h-2 rounded-full bg-[#d4af37]/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}