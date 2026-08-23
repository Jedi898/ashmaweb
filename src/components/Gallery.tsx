"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Palette,
  Users,
  Images,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { galleries } from "@/data/gallery";
import { getImageInfo } from "@/lib/image-manifest";

const iconMap: Record<string, React.ElementType> = {
  palette: Palette,
  users: Users,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function Gallery() {
  return (
    <section id="gallery" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-80 h-80 bg-[#d4af37]/3 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#e8a87c]/3 rounded-full blur-[90px]" />
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
            Galleries
          </span>
<h2 className="mt-3 font-serif font-bold text-[#f5f0e8] text-[clamp(1.75rem,4vw,3rem)]">
            The Creative{" "}
            <span className="gold-gradient-text">Archives</span>
          </h2>
          <div className="mx-auto mt-4 w-20 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
        </motion.div>

        {/* Gallery Cards with Cover Images */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8"
        >
          {galleries.map((gallery) => {
            const Icon = iconMap[gallery.icon] || Images;
            const coverInfo = getImageInfo(gallery.cover);
            return (
              <motion.div
                key={gallery.id}
                variants={itemVariants}
                className="group relative"
              >
                <Link
                  href={`/gallery/${gallery.id}`}
                  className="block relative overflow-hidden rounded-3xl cursor-pointer h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/40"
                >
{/* Cover Image Container — fluid aspect ratio (portrait on phone, landscape on tablet+) */}
                  <div
                    className="relative bg-[#1a1a1e] overflow-hidden"
                    style={{ aspectRatio: "3 / 4" }}
                  >
                    {/* Cover Image */}
                    <Image
                      src={gallery.cover}
                      alt={gallery.coverAlt}
                      fill
                      placeholder={coverInfo ? "blur" : undefined}
                      blurDataURL={coverInfo?.blurDataUrl}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:brightness-90"
                    />

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b]/95 via-[#0a0a0b]/40 to-[#0a0a0b]/10 group-hover:via-[#0a0a0b]/30 transition-all duration-700" />

                    {/* Decorative Circles */}
                    <div className="absolute top-6 right-6 w-20 h-20 border border-[#d4af37]/20 rounded-full group-hover:scale-110 group-hover:border-[#d4af37]/40 transition-all duration-700" />
                    <div className="absolute top-10 right-10 w-12 h-12 border border-[#d4af37]/10 rounded-full group-hover:scale-125 transition-transform duration-700" />

                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-[#d4af37]/20 to-transparent rounded-bl-full" />

{/* Content — fills the aspect-ratio box */}
                    <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 sm:p-8 lg:p-10">
                      {/* Icon */}
                      <div>
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0a0a0b]/60 backdrop-blur-md border border-[#d4af37]/30 group-hover:bg-[#d4af37]/20 group-hover:scale-105 transition-all duration-500">
                          <Icon size={28} className="text-[#d4af37]" />
                        </div>
                      </div>

                      {/* Bottom Content */}
                      <div>
                        {/* Title */}
                        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#f5f0e8] group-hover:text-[#d4af37] transition-colors duration-500">
                          {gallery.title}
                        </h3>

                        {/* Subtitle */}
                        <p className="mt-1 text-sm font-medium tracking-wider text-[#c4b998] uppercase">
                          {gallery.subtitle}
                        </p>

                        {/* Description */}
                        <p className="mt-3 text-sm text-[#c4b998]/70 font-light leading-relaxed max-w-md line-clamp-2">
                          {gallery.description}
                        </p>

                        {/* Bottom Bar */}
                        <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10">
                          <span className="inline-flex items-center gap-2 text-xs font-medium tracking-wider text-[#d4af37]">
                            <Images size={14} />
                            {gallery.imageCount} Works
                          </span>
                          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d4af37]/10 backdrop-blur-sm border border-[#d4af37]/20 text-[#d4af37] text-xs font-medium tracking-wider group-hover:bg-[#d4af37] group-hover:text-[#0a0a0b] transition-all duration-500">
                            View Gallery
                            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Glow Line */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
