"use client";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Central Motion Config — Emil Kowalski-style UI physics
 * ─────────────────────────────────────────────────────────────────────────────
 * Single source of truth for spring physics, easing curves, and shared
 * variants. JSX primitives built on these live in `./motion-primitives`.
 *
 * Hard rules:
 *  1. Micro-interactions trigger on `pointerdown` (zero input lag) and never on
 *     touch/click release. Tactile feedback = scale 0.97, spring
 *     stiffness 500 / damping 30.
 *  2. Modals & popovers NEVER animate from scale(0). They enter from
 *     scale(0.95) + opacity 0 → scale(1) + opacity 1 over 150–180ms easeOut.
 *     Trigger-based popovers dynamically attach `transform-origin`.
 *  3. Sliding active pills use Framer Motion `layoutId` (FLIP) with a subtle
 *     `filter: blur(2px)` cross-fade during content morphs.
 *  4. Animate ONLY `transform` and `opacity` to prevent layout thrashing.
 *     All micro-interactions run under 180ms and are fully interruptible.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { Transition } from "framer-motion";

/* ──────────────────────────────────────────────────────────────────────────
 * Spring physics
 * ────────────────────────────────────────────────────────────────────────── */

/** Snappy tactile press — instant pointerdown feedback. Fully interruptible. */
export const SPRING_PRESS: Transition = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 0.6,
};

/** Modal / popover entrance — short, damped, easeOut-dominant (180ms). */
export const SPRING_MODAL: Transition = {
  type: "tween",
  duration: 0.18,
  ease: [0.16, 1, 0.3, 1],
};

/** Gentle reveal for scroll-into-view content. */
export const SPRING_GENTLE: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 32,
  mass: 0.9,
};

/** Layout morphs (FLIP) — fast, no bounce. */
export const SPRING_LAYOUT: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 34,
  mass: 0.7,
};

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

/* ──────────────────────────────────────────────────────────────────────────
 * Variants
 * ────────────────────────────────────────────────────────────────────────── */

/** Modal physics — NEVER scale(0). Enters from 0.95 + fade, 180ms easeOut. */
export const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: SPRING_MODAL,
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.12, ease: "easeIn" as const },
  },
} as const;

/** Generic fade-up for staggered lists — transform/opacity only. */
export const fadeVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: SPRING_GENTLE,
  },
};

/** Container stagger helper. */
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/* ──────────────────────────────────────────────────────────────────────────
 * Helpers
 * ────────────────────────────────────────────────────────────────────────── */

/**
 * Compute a CSS `transform-origin` string from a trigger element's bounding
 * box. Used to make popovers/menus scale toward the trigger that opened them
 * instead of the center of the viewport.
 */
export function getTriggerOrigin(el: HTMLElement | null | undefined): string {
  if (typeof window === "undefined" || !el) return "50% 50%";
  const rect = el.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const x = (rect.left + rect.width / 2) / vw;
  const y = (rect.top + rect.height / 2) / vh;
  return `${x * 100}% ${y * 100}%`;
}
