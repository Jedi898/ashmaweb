"use client";

import { motion } from "framer-motion";
import { Briefcase, ChevronRight } from "lucide-react";

const experiences = [
  {
    title: "Fashion Design Instructor",
    organization: "IEC College of Art and Fashion",
    period: "Feb 2024 – Present",
    highlights: [
      "Taught across all 6 semesters of the fashion design program",
      "Specialized in hand & digital fashion illustration (Photoshop/Illustrator), garment design, and color application",
      "Guided final-year students in portfolio development and pattern work across Womenswear, Menswear, and Kidswear",
    ],
  },
  {
    title: "Official Styling Presentation Leader",
    organization: "Mr. Nepal 2024",
    period: "2024",
    highlights: [
      "Delivered official styling presentations and creative wardrobe direction",
      "Curated cohesive visual narratives for national pageant platform",
    ],
  },
  {
    title: "Diploma Program Instructor",
    organization: "IEC School of Art & Fashion",
    period: "Nov 2022 – May 2023",
    highlights: [
      "Taught specialized 8-month diploma courses in design foundations",
      "Developed curriculum structure for emerging fashion professionals",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#d4af37]/3 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#d4af37] text-sm font-medium tracking-[0.2em] uppercase">
            Career
          </span>
<h2 className="mt-3 font-serif font-bold text-[#f5f0e8] text-[clamp(1.75rem,4vw,3rem)]">
            Experience &{" "}
            <span className="gold-gradient-text">Milestones</span>
          </h2>
          <div className="mx-auto mt-4 w-20 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative"
        >
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#d4af37]/40 via-[#d4af37]/20 to-transparent md:-translate-x-px" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title + exp.period}
              variants={itemVariants}
              className={`relative flex flex-col md:flex-row gap-6 mb-12 last:mb-0 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-0 md:left-1/2 top-0 w-5 h-5 -translate-x-[10px] md:-translate-x-[10px] rounded-full bg-[#0a0a0b] border-2 border-[#d4af37] z-10" />

              {/* Content */}
              <div className={`flex-1 pl-8 md:pl-0 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                <div className="group relative p-6 rounded-2xl glass card-hover">
                  {/* Icon */}
                  <div className={`flex mb-4 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                    <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 flex items-center justify-center group-hover:bg-[#d4af37]/20 transition-colors duration-300">
                      <Briefcase size={18} className="text-[#d4af37]" />
                    </div>
                  </div>

                  {/* Period Badge */}
                  <span className="inline-block px-3 py-1 mb-3 text-xs font-medium tracking-wider text-[#d4af37] bg-[#d4af37]/10 rounded-full">
                    {exp.period}
                  </span>

                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#f5f0e8] group-hover:text-[#d4af37] transition-colors duration-300">
                    {exp.title}
                  </h3>
                  <p className="mt-1 text-sm text-[#c4b998] font-medium tracking-wide">
                    {exp.organization}
                  </p>

                  {/* Highlights */}
                  <ul className={`mt-4 space-y-2 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                    {exp.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2 text-sm text-[#c4b998]/80 font-light leading-relaxed"
                      >
                        <ChevronRight
                          size={14}
                          className={`mt-1 flex-shrink-0 text-[#d4af37] ${
                            index % 2 === 0 ? "md:order-2" : ""
                          }`}
                        />
                        <span className={index % 2 === 0 ? "md:flex-1" : ""}>
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block flex-1" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

