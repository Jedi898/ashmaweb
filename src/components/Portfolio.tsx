"use client";

import { motion } from "framer-motion";
import { Eye } from "lucide-react";

const portfolioItems = [
  {
    title: "Fashion Illustration Collection",
    category: "Digital Art",
    image: null,
    gradient: "from-[#d4af37]/20 to-[#1a1a1e]",
    description: "Hand & digital fashion illustrations showcasing diverse garment techniques",
  },
  {
    title: "Editorial Styling - Mr. Nepal 2024",
    category: "Styling",
    image: null,
    gradient: "from-[#e8a87c]/20 to-[#1a1a1e]",
    description: "Creative wardrobe direction and styling presentation for national pageant",
  },
  {
    title: "Student Portfolio Development",
    category: "Education",
    image: null,
    gradient: "from-[#d4af37]/15 to-[#1a1a1e]",
    description: "Guided final-year student portfolios across Womenswear, Menswear & Kidswear",
  },
  {
    title: "Curriculum Design",
    category: "Academic",
    image: null,
    gradient: "from-[#e8a87c]/15 to-[#1a1a1e]",
    description: "Developed comprehensive 6-semester fashion design curriculum",
  },
];

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

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4af37]/3 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#e8a87c]/3 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#d4af37] text-sm font-medium tracking-[0.2em] uppercase">
            Showcase
          </span>
<h2 className="mt-3 font-serif font-bold text-[#f5f0e8] text-[clamp(1.75rem,4vw,3rem)]">
            Featured{" "}
            <span className="gold-gradient-text">Portfolio</span>
          </h2>
          <div className="mx-auto mt-4 w-20 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
        >
          {portfolioItems.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              className="group relative rounded-2xl overflow-hidden card-hover cursor-pointer"
            >
              {/* Image Placeholder / Gradient Background */}
              <div
                className={`relative h-64 sm:h-72 bg-gradient-to-br ${item.gradient} flex items-center justify-center`}
              >
                {/* Decorative Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 w-12 h-12 border border-[#d4af37]/30 rounded-full" />
                  <div className="absolute bottom-4 right-4 w-20 h-20 border border-[#d4af37]/20 rounded-full" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-[#d4af37]/10 rounded-full" />
                </div>

                {/* Icon */}
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-[#d4af37]/10 flex items-center justify-center group-hover:bg-[#d4af37]/20 transition-colors duration-300">
                  <Eye size={28} className="text-[#d4af37]" />
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-sm text-[#c4b998] font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Info Bar */}
              <div className="p-5 bg-[#1a1a1e] border-t border-[#d4af37]/10">
                <span className="text-xs font-medium tracking-wider text-[#d4af37] uppercase">
                  {item.category}
                </span>
                <h3 className="mt-1 text-lg font-serif font-bold text-[#f5f0e8] group-hover:text-[#d4af37] transition-colors duration-300">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

