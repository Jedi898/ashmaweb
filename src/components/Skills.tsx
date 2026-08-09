"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  PenTool,
  Layers,
  Sparkles,
} from "lucide-react";
import { SlideTab, Morph } from "@/lib/motion-primitives";

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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState(skillCategories[0].id);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const activeCategory = skillCategories.find((c) => c.id === activeTab)!;

  return (
    <section id="skills" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-72 h-72 bg-[#d4af37]/3 rounded-full blur-[100px]" />
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
            Skills &{" "}
            <span className="gold-gradient-text">Capabilities</span>
          </h2>
          <div className="mx-auto mt-4 w-20 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
        </motion.div>

{/* Tab Filters — sliding active pill (FLIP) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center mb-12"
        >
          <SlideTab
            layoutId="skills-tab-pill"
            options={skillCategories.map((c) => ({
              id: c.id,
              label: c.label,
              icon: <c.icon size={15} />,
            }))}
            activeId={activeTab}
            onChange={setActiveTab}
            pillClassName="bg-[#d4af37] shadow-lg shadow-[#d4af37]/20"
          />
        </motion.div>

        {/* Skills Grid — blur cross-fade on tab morph */}
        <Morph id={activeTab} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeCategory.skills.map((skill) => (
            <motion.div
              key={skill}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              onMouseEnter={() => setHoveredSkill(skill)}
              onMouseLeave={() => setHoveredSkill(null)}
              className="group relative p-5 rounded-xl overflow-hidden glass card-hover cursor-default"
            >
              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${activeCategory.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <div className="relative z-10 flex items-center gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#d4af37]/10 flex items-center justify-center group-hover:bg-[#d4af37]/20 transition-colors duration-300">
                  <Sparkles
                    size={18}
                    className="text-[#d4af37] group-hover:rotate-12 transition-transform duration-300"
                  />
                </div>
                <span className="text-base sm:text-lg font-medium text-[#f5f0e8] group-hover:text-[#d4af37] transition-colors duration-300">
                  {skill}
                </span>
              </div>

              {/* Bottom Glow Line */}
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </motion.div>
          ))}
        </Morph>
      </div>
    </section>
  );
}

