"use client";

import { motion } from "framer-motion";
import { Sparkles, GraduationCap, Briefcase, Heart } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const highlights = [
  {
    icon: GraduationCap,
    title: "Educator",
    text: "Faculty at IEC College of Art & Fashion",
  },
  {
    icon: Briefcase,
    title: "Stylist",
    text: "Official Stylist for Mr. Nepal 2024",
  },
  {
    icon: Heart,
    title: "Artist",
    text: "Hand & digital fashion illustration specialist",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-[#d4af37]/4 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 -left-32 w-80 h-80 bg-[#e8a87c]/4 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            {/* Glow behind */}
            <div className="absolute -inset-4 bg-gradient-to-br from-[#d4af37]/25 via-transparent to-[#e8a87c]/15 rounded-[2.5rem] blur-2xl opacity-50" />

            {/* Frame */}
            <motion.div
              variants={itemVariants}
              className="relative rounded-[2rem] overflow-hidden border border-[#d4af37]/30 shadow-2xl shadow-black/40"
            >
<img
                src="/about.webp"
                alt="Ashma Singh Thakuri — About"
                className="w-full h-auto object-cover aspect-[4/5] sm:aspect-[3/4]"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b]/80 via-transparent to-transparent" />

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute bottom-6 left-6 right-6"
              >
                <div className="glass-strong rounded-2xl p-5 backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 flex items-center justify-center flex-shrink-0">
                      <Sparkles size={18} className="text-[#d4af37]" />
                    </div>
                    <div>
                      <p className="text-sm font-serif font-bold text-[#f5f0e8]">
                        Ashma Singh Thakuri
                      </p>
                      <p className="text-xs text-[#d4af37] font-medium tracking-wider uppercase mt-0.5">
                        Nepal
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Decorative corner */}
            <div className="absolute -top-5 -left-5 w-16 h-16 border-2 border-[#d4af37]/30 rounded-2xl" />
            <div className="absolute -bottom-5 -right-5 w-10 h-10 bg-[#d4af37]/15 rounded-full" />
          </motion.div>

          {/* Right - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants}>
              <span className="text-[#d4af37] text-sm font-medium tracking-[0.2em] uppercase">
                About Me
              </span>
<h2 className="mt-3 font-serif font-bold text-[#f5f0e8] leading-tight text-[clamp(1.75rem,4vw,3rem)]">
                A Passion for Fashion,{" "}
                <span className="gold-gradient-text">Education</span> &{" "}
                <span className="gold-gradient-text">Artistry</span>
              </h2>
              <div className="mt-5 w-20 h-[1px] bg-gradient-to-r from-[#d4af37] to-transparent" />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-base sm:text-lg text-[#c4b998] font-light leading-relaxed"
            >
              Based in Nepal, I am a Fashion Educator, Digital Illustrator, and
              Editorial Stylist dedicated to transforming inspiration into
              wearable art. As faculty at IEC College of Art & Fashion and the
              official stylist for Mr. Nepal 2024, I blend academic rigor with
              editorial creativity to shape the next generation of fashion
              talent.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="mt-4 text-base text-[#c4b998] font-light leading-relaxed"
            >
              From hand-drawn sketches to full garment collections, my work
              spans Womenswear, Menswear, and Kidswear — bridging tradition
              with contemporary design thinking.
            </motion.p>

            {/* Highlights Grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {highlights.map((item) => (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  className="group p-4 rounded-2xl glass card-hover"
                >
                  <item.icon
                    size={20}
                    className="text-[#d4af37] mb-2 group-hover:scale-110 transition-transform duration-300"
                  />
                  <h3 className="text-sm font-serif font-bold text-[#f5f0e8]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-[#c4b998] font-light leading-snug">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

