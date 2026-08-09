"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
import Image from "next/image";
import {
  ArrowLeft,
  Images,
  Palette,
  Users,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Maximize2,
  Camera,
  Frame,
} from "lucide-react";
import Link from "next/link";
import type { Gallery } from "@/data/gallery";
import { getImageInfo, getAspectRatio } from "@/lib/image-manifest";
import { Pressable } from "@/lib/motion-primitives";

const iconMap: Record<string, React.ElementType> = {
  palette: Palette,
  users: Users,
};

/* ─── Spring Physics (Kowalski-style, fully interruptible) ─── */
const SPRING = {
  type: "spring",
  stiffness: 300,
  damping: 28,
  mass: 0.8,
} as const;

const SPRING_SOFT = {
  type: "spring",
  stiffness: 260,
  damping: 32,
  mass: 0.9,
} as const;

/* Drag-dismiss thresholds */
const DISMISS_VELOCITY = 500; // px/s
const DISMISS_DISTANCE = 160; // px

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: SPRING_SOFT,
  },
};

/** Deterministic pseudo-EXIF timestamp derived from the work index. */
function workTimestamp(index: number): string {
  const base = new Date("2023-01-01T10:00:00Z").getTime();
  const t = new Date(base + index * 7 * 24 * 60 * 60 * 1000);
  return t.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export default function GalleryPage({ gallery }: { gallery: Gallery }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const open = activeIndex !== null;
  const bodyLocked = useRef(false);
  const Icon = iconMap[gallery.icon] || Images;

  /* Motion values driving the drag-to-dismiss gesture */
  const dragY = useMotionValue(0);
  const scaleWhileDrag = useTransform(dragY, [0, 500], [1, 0.95]);
  const backdropOpacity = useTransform(dragY, [0, 600], [1, 0]);

  const openLightbox = useCallback((index: number) => {
    setActiveIndex(index);
    if (!bodyLocked.current) {
      document.body.style.overflow = "hidden";
      bodyLocked.current = true;
    }
  }, []);

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
    dragY.set(0);
    if (bodyLocked.current) {
      document.body.style.overflow = "";
      bodyLocked.current = false;
    }
  }, [dragY]);

  const navigate = useCallback(
    (dir: number) => {
      setActiveIndex((prev) => {
        if (prev === null) return prev;
        const len = gallery.images.length;
        return (prev + dir + len) % len;
      });
      // Reset drag position instantly so the next image springs in clean.
      dragY.set(0);
    },
    [gallery.images.length, dragY]
  );

  /* Keyboard: Escape closes, arrows navigate */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [closeLightbox, navigate]);

  /* Preload lightbox neighbors so navigation is instant */
  useEffect(() => {
    if (activeIndex === null) return;
    const len = gallery.images.length;
    const toPreload = [
      gallery.images[(activeIndex - 1 + len) % len].src,
      gallery.images[(activeIndex + 1) % len].src,
    ];
    for (const src of toPreload) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
    }
    const links = document.head.querySelectorAll(
      'link[rel="preload"][as="image"]'
    );
    if (links.length > 8) {
      for (let i = 0; i < links.length - 8; i++) links[i].remove();
    }
  }, [activeIndex, gallery.images]);

  /* Cleanup body scroll lock on unmount */
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleDrag = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    dragY.set(info.offset.y);
  };

  const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const shouldDismiss =
      info.offset.y > DISMISS_DISTANCE || info.velocity.y > DISMISS_VELOCITY;
    if (shouldDismiss) {
      closeLightbox();
    } else {
      // Spring back to center — Framer's spring physics handles this automatically.
      dragY.set(0);
    }
  };

const activeImage =
    activeIndex === null ? null : gallery.images[activeIndex];
  const activeInfo = activeImage ? getImageInfo(activeImage.src) : null;

  return (
    <section className="relative min-h-screen pt-24 sm:pt-28 pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#e8a87c]/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#d4af37]/3 to-transparent rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={SPRING_SOFT}
          className="mb-8"
        >
          <Link
            href="/#gallery"
            className="inline-flex items-center gap-2 text-sm text-[#c4b998] hover:text-[#d4af37] transition-colors duration-300 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Archives
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING_SOFT, delay: 0.05 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/20 mb-6">
            <Icon size={28} className="text-[#d4af37]" />
          </div>
          <p className="text-[#d4af37] text-sm font-medium tracking-[0.25em] uppercase">
            {gallery.subtitle}
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-serif font-bold">
            <span className="gold-gradient-text">{gallery.title}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#c4b998] font-light leading-relaxed">
            {gallery.description}
          </p>
          <div className="mx-auto mt-6 w-20 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
        </motion.div>

        {/* Photo Grid — shared layout, Kowalski micro-details */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start gap-4 sm:gap-5"
        >
          {gallery.images.map((image, index) => {
            const info = getImageInfo(image.src);
            const aspect = getAspectRatio(image.src);
            const isExpanded = open && activeIndex === index;
            return (
              <motion.button
                key={image.name + index}
                layoutId={`gallery-image-${index}`}
                variants={itemVariants}
                initial={false}
                onClick={() => openLightbox(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={SPRING}
                aria-expanded={isExpanded}
                aria-haspopup="dialog"
                aria-label={`View ${image.name}`}
                className="group relative w-full break-inside-avoid overflow-hidden rounded-2xl cursor-pointer bg-[#1a1a1e] border border-white/10 shadow-xl shadow-black/30 hover:shadow-2xl hover:shadow-black/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/40"
              >
                {/* Image — standardized aspect ratio prevents CLS */}
                <div
                  className="relative w-full overflow-hidden rounded-[15px] bg-[#1a1a1e]"
                  style={{ aspectRatio: aspect }}
                >
                  <Image
                    src={info?.thumb ?? image.src}
                    alt={image.name}
                    fill
                    placeholder={info ? "blur" : undefined}
                    blurDataURL={info?.blurDataUrl}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading={index < 6 ? "eager" : "lazy"}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-90"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Hover Content */}
                  <div className="absolute inset-x-0 bottom-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-base sm:text-lg font-serif font-bold text-[#f5f0e8] leading-tight text-left">
                      {image.name}
                    </p>
                    <div className="mt-2 flex items-center gap-3 text-[10px] text-[#d4af37] font-medium tracking-wider">
                      <span className="inline-flex items-center gap-1">
                        <Camera size={11} />
                        {info?.width ?? "--"} × {info?.height ?? "--"}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-[#d4af37]/50" />
                      <span>
                        {String(index + 1).padStart(2, "0")} /{" "}
                        {gallery.images.length}
                      </span>
                    </div>
                  </div>

                  {/* Expand Icon */}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-[#f5f0e8] opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500">
                    <Maximize2 size={15} />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* ─── Shared-Layout Expanded Viewer with Drag-to-Dismiss ─── */}
      <AnimatePresence>
        {open && activeImage && (
          <>
            {/* Backdrop — opacity fades proportionally to drag distance */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={SPRING_SOFT}
              style={{ opacity: backdropOpacity }}
              className="fixed inset-0 z-[90] bg-[#0a0a0b]/92 backdrop-blur-xl"
              onClick={closeLightbox}
            />

{/* Expanded card — shares layoutId with the clicked thumbnail.
                Standardized modal entrance: scale 0.95 → 1, opacity 0 → 1,
                never scale(0). Fully interruptible. */}
            <motion.div
              key="viewer"
              layoutId={`gallery-image-${activeIndex}`}
              initial={{ borderRadius: 16, scale: 0.95, opacity: 0 }}
              animate={{ borderRadius: 24, scale: 1, opacity: 1 }}
              exit={{ borderRadius: 16, scale: 0.97, opacity: 0 }}
              transition={{ ...SPRING, duration: 0.18 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0.05, bottom: 0.6 }}
              dragMomentum={false}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              role="dialog"
              aria-modal="true"
              aria-label={activeImage.name}
              className="fixed inset-0 z-[100] m-auto flex w-[min(92vw,1100px)] h-[min(76vh,820px)] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#141416] shadow-2xl shadow-black/70"
            >
{/* Close button — tactile press */}
              <Pressable
                as="button"
                onClick={(e) => {
                  e?.stopPropagation();
                  closeLightbox();
                }}
                aria-label="Close viewer"
                className="pressable absolute top-4 right-4 z-30 w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[#f5f0e8] flex items-center justify-center hover:bg-[#d4af37] hover:text-[#0a0a0b]"
              >
                <X size={20} />
              </Pressable>

              {/* Counter */}
              <div className="absolute top-5 left-5 z-30 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[11px] text-[#d4af37] font-medium tracking-wider">
                {String(activeIndex + 1).padStart(2, "0")} / {gallery.images.length}
              </div>

{/* Left / Right Navigation — tactile press */}
              <Pressable
                as="button"
                onClick={(e) => {
                  e?.stopPropagation();
                  navigate(-1);
                }}
                aria-label="Previous work"
                className="pressable absolute left-3 sm:left-5 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[#f5f0e8] flex items-center justify-center hover:bg-[#d4af37] hover:text-[#0a0a0b]"
              >
                <ChevronLeft size={22} />
              </Pressable>
              <Pressable
                as="button"
                onClick={(e) => {
                  e?.stopPropagation();
                  navigate(1);
                }}
                aria-label="Next work"
                className="pressable absolute right-3 sm:right-5 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[#f5f0e8] flex items-center justify-center hover:bg-[#d4af37] hover:text-[#0a0a0b]"
              >
                <ChevronRight size={22} />
              </Pressable>

              {/* Image — scale(0.95) while dragging, via motion value */}
              <motion.div
                style={{ scale: scaleWhileDrag }}
                className="relative w-full h-full"
              >
                <Image
                  src={activeImage.src}
                  alt={activeImage.name}
                  fill
                  priority
                  placeholder={activeInfo ? "blur" : undefined}
                  blurDataURL={activeInfo?.blurDataUrl}
                  sizes="(max-width: 1100px) 92vw, 1100px"
                  className="object-contain rounded-2xl"
                />
              </motion.div>

              {/* Morphing Meta Details — fade + height reveal */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 16, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: 10, height: 0 }}
                  transition={SPRING_SOFT}
                  className="absolute inset-x-0 bottom-0 z-20 overflow-hidden"
                >
                  <div className="mx-auto max-w-2xl px-6 pb-6 pt-14 text-center">
                    <div className="mx-auto w-full rounded-2xl bg-black/50 backdrop-blur-xl border border-white/10 px-6 py-4 shadow-xl shadow-black/40">
                      {/* Title */}
                      <p className="text-xs font-medium tracking-[0.25em] uppercase text-[#d4af37]">
                        {gallery.title}
                      </p>
                      <h3 className="mt-1.5 text-xl sm:text-2xl font-serif font-bold text-[#f5f0e8] leading-snug">
                        {activeImage.name}
                      </h3>

                      {/* Meta row — EXIF-style details */}
                      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[11px] text-[#c4b998]/80 font-light tracking-wider">
                        <span className="inline-flex items-center gap-1.5">
                          <Camera size={12} className="text-[#d4af37]/70" />
                          {activeInfo?.width ?? "--"} × {activeInfo?.height ?? "--"} px
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Frame size={12} className="text-[#d4af37]/70" />
                          WebP · Optimized
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Images size={12} className="text-[#d4af37]/70" />
                          {workTimestamp(activeIndex)}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Drag hint */}
              <div className="absolute top-1/2 right-4 z-20 hidden sm:flex flex-col items-center gap-1 text-[#c4b998]/50 pointer-events-none">
                <ChevronDown className="animate-bounce" size={16} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

