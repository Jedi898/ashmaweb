"use client";

import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Award } from "lucide-react";

const education = [
  {
    degree: "Bachelor's (Hons.) in Fashion and Retailing",
    institution: "IEC College of Art & Fashion",
    affiliation: "Affiliated with Limkokwing University, Malaysia",
    period: "2019 – 2022",
    icon: GraduationCap,
  },
  {
    degree: "Diploma in Fashion Design",
    institution: "IEC School of Art & Fashion",
    period: "2015 – 2016",
    icon: BookOpen,
  },
  {
    degree: "High School",
    institution: "Global College of Management",
    period: "2013 – 2015",
    icon: Award,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function Education() {
  return (
    <section id="education" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-[#e8a87c]/3 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-[#d4af37]/3 rounded-full blur-[80px]" />
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
            Academics
          </span>
<h2 className="mt-3 font-serif font-bold text-[#f5f0e8] text-[clamp(1.75rem,4vw,3rem)]">
            Educational{" "}
            <span className="gold-gradient-text">Background</span>
          </h2>
          <div className="mx-auto mt-4 w-20 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
        >
          {education.map((edu, index) => {
            const Icon = edu.icon;
            return (
              <motion.div
                key={edu.degree}
                variants={cardVariants}
                className={`group relative p-6 sm:p-8 rounded-2xl overflow-hidden glass card-hover ${
                  index === 0 ? "md:col-span-3 md:flex md:items-center md:gap-8" : ""
                }`}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#d4af37]/10 to-transparent rounded-bl-full" />

                <div className={`relative z-10 ${index === 0 ? "md:flex md:items-start md:gap-6" : ""}`}>
                  {/* Icon */}
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#d4af37]/10 flex items-center justify-center mb-4 group-hover:bg-[#d4af37]/20 transition-colors duration-300">
                    <Icon size={24} className="text-[#d4af37]" />
                  </div>

                  <div className="flex-1">
                    {/* Period */}
                    <span className="inline-block px-3 py-1 mb-3 text-xs font-medium tracking-wider text-[#d4af37] bg-[#d4af37]/10 rounded-full">
                      {edu.period}
                    </span>

                    <h3 className="text-lg sm:text-xl font-serif font-bold text-[#f5f0e8] group-hover:text-[#d4af37] transition-colors duration-300">
                      {edu.degree}
                    </h3>
                    <p className="mt-1 text-sm text-[#c4b998] font-medium">
                      {edu.institution}
                    </p>
                    {edu.affiliation && (
                      <p className="mt-1 text-xs text-[#c4b998]/60 font-light italic">
                        {edu.affiliation}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

