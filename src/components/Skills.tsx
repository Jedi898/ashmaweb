"use client";

import { motion } from "framer-motion";
import { Briefcase, PenTool, Layers, Sparkles } from "lucide-react";

interface SkillCategory {
  id: string;
  label: string;
  icon: React.ElementType;
  skills: string[];
  color: string;
}

const skillCategories: SkillCategory[] = [
  {
    id: "creative",
    label: "Creative & Digital Illustration",
    icon: PenTool,
    color: "from-[#d4af37]/20 to-[#e8a87c]/10",
    skills: [
      "Hand Fashion Illustration",
      "Digital Illustration",
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Autodesk AutoCAD",
    ],
  },
  {
    id: "design",
    label: "Design Theory & Garment Technique",
    icon: Layers,
    color: "from-[#e8a87c]/20 to-[#d4af37]/10",
    skills: [
      "Elements of Design (EOD)",
      "Principles of Design (POD)",
      "Garment Construction",
      "Surface Ornamentation",
      "Textile Design",
    ],
  },
  {
    id: "industry",
    label: "Industry & Business",
    icon: Briefcase,
    color: "from-[#d4af37]/20 to-transparent",
    skills: [
      "Portfolio Development",
      "Styling",
      "Boutique Management",
      "Marketing",
      "Branding",
      "Entrepreneurship",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-[#e8a87c]/5 rounded-full blur-[120px]" />
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
            Expertise
          </span>
          <h2 className="mt-3 font-serif font-bold text-[#f5f0e8] text-[clamp(1.75rem,4vw,3rem)]">
            Skills & <span className="gold-gradient-text">Capabilities</span>
          </h2>
          <div className="mx-auto mt-4 w-20 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
        </motion.div>

        {/* All Skill Categories Rendered Together */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                variants={categoryVariants}
                className="flex flex-col p-6 rounded-2xl glass border border-[#d4af37]/20 backdrop-blur-xl hover:border-[#d4af37]/40 transition-all duration-300 shadow-xl"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-[#d4af37]/15">
                  <div className="w-10 h-10 rounded-lg bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0 border border-[#d4af37]/30">
                    <Icon size={20} className="text-[#d4af37]" />
                  </div>
                  <h3 className="font-serif font-semibold text-lg text-[#f5f0e8]">
                    {category.label}
                  </h3>
                </div>

                {/* Skills Grid for Category */}
                <div className="flex flex-col gap-3.5 flex-grow">
                  {category.skills.map((skill) => (
                    <div
                      key={skill}
                      className="group relative p-4 rounded-xl overflow-hidden glass card-hover cursor-default transition-all duration-300 border border-white/5 hover:border-[#d4af37]/30"
                    >
                      {/* Gradient Overlay */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                      />

                      <div className="relative z-10 flex items-center gap-3.5">
                        <div className="w-8 h-8 rounded-lg bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#d4af37]/20 transition-colors duration-300">
                          <Sparkles
                            size={16}
                            className="text-[#d4af37] group-hover:rotate-12 transition-transform duration-300"
                          />
                        </div>
                        <span className="text-sm sm:text-base font-medium text-[#f5f0e8] group-hover:text-[#d4af37] transition-colors duration-300">
                          {skill}
                        </span>
                      </div>

                      {/* Bottom Glow Line */}
                      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}