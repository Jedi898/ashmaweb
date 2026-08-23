"use client";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Reusable Motion Primitives — built on ./motion.ts config
 * ─────────────────────────────────────────────────────────────────────────────
 * <Pressable>  — tactile, zero-lag button (scale 0.97 on pointerdown)
 * <SlideTab>   — sliding active-state pill (FLIP via layoutId)
 * <Modal>      — scale-from-origin modal / popover overlay (never scale(0))
 * <Popover>    — trigger-anchored popover with dynamic transform-origin
 * <Morph>      — blur cross-fade for layout/content morphs
 * ─────────────────────────────────────────────────────────────────────────────
 */

import {
  forwardRef,
  useCallback,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type Ref,
} from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  type HTMLMotionProps,
} from "framer-motion";
import {
  SPRING_PRESS,
  SPRING_LAYOUT,
  EASE_OUT,
  modalVariants,
  getTriggerOrigin,
} from "./motion";

/* ──────────────────────────────────────────────────────────────────────────
 * <Pressable /> — tactile, zero-lag button
 * ──────────────────────────────────────────────────────────────────────────
 * Replaces whileTap/hover. Scale hits 0.97 on `pointerdown` (instant, no lag)
 * and releases on pointerup/leave. Uses a motion value + spring so it is fully
 * interruptible — if the pointer leaves mid-press it reverses from its live
 * position.
 */

type PressableElement = "button" | "a" | "div";

type PressableProps = {
  children: ReactNode;
  as?: PressableElement;
  scale?: number;
  href?: string;
  target?: string;
  rel?: string;
className?: string;
  style?: CSSProperties;
  "aria-label"?: string;
  "aria-expanded"?: boolean;
type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLElement>) => void;
  onPointerDown?: React.PointerEventHandler<HTMLElement>;
};

export const Pressable = forwardRef<HTMLElement, PressableProps>(
  function Pressable(
    { children, as = "button", scale = 0.97, ...rest },
    ref
  ) {
    const scaleMV = useMotionValue(1);
    const spring = useSpring(scaleMV, SPRING_PRESS);

    const handlePointerDown = useCallback(
      (e: React.PointerEvent<HTMLElement>) => {
        scaleMV.set(scale);
        rest.onPointerDown?.(e);
      },
      [scale, scaleMV, rest]
    );

    const release = useCallback(() => scaleMV.set(1), [scaleMV]);

    const motionProps = {
      ...rest,
      ref: ref as Ref<never>,
      style: { ...rest.style, scale: spring },
      onPointerDown: handlePointerDown,
      onPointerUp: release,
      onPointerLeave: release,
      onPointerCancel: release,
    };

if (as === "a") {
      return <motion.a {...motionProps}>{children}</motion.a>;
    }
    if (as === "div") {
      return <motion.div {...motionProps}>{children}</motion.div>;
    }
    return (
      <motion.button
        {...(motionProps as HTMLMotionProps<"button">)}
        disabled={rest.disabled}
      >
        {children}
      </motion.button>
    );
  }
);

/* ──────────────────────────────────────────────────────────────────────────
 * <SlideTab /> — sliding active-state pill (FLIP)
 * ──────────────────────────────────────────────────────────────────────────
 * Renders a group of buttons; the active one gets a `layoutId` background pill
 * that Framer Motion FLIP-animates between tabs using only transform, keeping
 * the interaction under 180ms.
 */

type SlideTabOption = { id: string; label: string; icon?: ReactNode };

type SlideTabProps<T extends SlideTabOption> = {
  options: T[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
  pillClassName?: string;
  /** Unique across the page when multiple pill groups exist. */
  layoutId?: string;
};

export function SlideTab<T extends SlideTabOption>({
  options,
  activeId,
  onChange,
  className = "",
  pillClassName = "",
  layoutId = "active-pill",
}: SlideTabProps<T>) {
  return (
    <div className={`relative inline-flex items-center gap-1 ${className}`}>
      {options.map((option) => {
        const isActive = option.id === activeId;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={`relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium tracking-wider transition-colors duration-150 ${
              isActive
                ? "text-[#0a0a0b]"
                : "text-[#c4b998] hover:text-[#f5f0e8]"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId={layoutId}
                transition={SPRING_LAYOUT}
                className={`absolute inset-0 -z-10 rounded-full ${pillClassName}`}
              />
            )}
            {option.icon}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * <Modal /> — scale-from-origin modal / popover overlay
 * ──────────────────────────────────────────────────────────────────────────
 * Never animates from scale(0). Enters from scale(0.95) + opacity 0 →
 * scale(1) + opacity 1 over 180ms with easeOut. Fully interruptible.
 */

type ModalProps = {
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
  className?: string;
  /** Optional origin — scale toward the trigger that opened the modal. */
  origin?: string;
  withBackdrop?: boolean;
};

export function Modal({
  open,
  onClose,
  children,
  className = "",
  origin = "50% 50%",
  withBackdrop = true,
}: ModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {withBackdrop && (
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={onClose}
              className="absolute inset-0 bg-[#0a0a0b]/80 backdrop-blur-md"
            />
          )}
          <motion.div
            key="panel"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ transformOrigin: origin }}
            className={`relative z-10 ${className}`}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * <Popover /> — trigger-anchored popover with dynamic transform-origin
 * ──────────────────────────────────────────────────────────────────────────
 * Wraps a trigger; on activation it measures the trigger's bounding box and
 * attaches the resulting coordinates as the popover's transform-origin, so the
 * panel scales out of the trigger rather than the viewport center.
 */

type PopoverProps = {
  trigger: (getProps: () => HTMLMotionProps<"button">) => ReactNode;
  children: ReactNode;
  className?: string;
  panelClassName?: string;
  align?: "start" | "center" | "end";
};

export function Popover({
  trigger,
  children,
  className = "",
  panelClassName = "",
  align = "center",
}: PopoverProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [origin, setOrigin] = useState("50% 50%");

  const openWithOrigin = useCallback(() => {
    setOrigin(getTriggerOrigin(triggerRef.current));
    setOpen(true);
  }, []);

  const getProps = useCallback(
    (): HTMLMotionProps<"button"> => ({
      ref: triggerRef,
      onClick: () => (open ? setOpen(false) : openWithOrigin()),
      "aria-expanded": open,
    }),
    [open, openWithOrigin]
  );

  return (
    <div className={`relative inline-block ${className}`}>
      {trigger(getProps)}
      <AnimatePresence>
        {open && (
          <motion.div
            key="popover"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ transformOrigin: origin }}
            className={`absolute z-[90] mt-2 ${
              align === "start"
                ? "left-0"
                : align === "end"
                  ? "right-0"
                  : "left-1/2 -translate-x-1/2"
            } ${panelClassName}`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * <Morph /> — blur cross-fade for layout/content morphs
 * ──────────────────────────────────────────────────────────────────────────
 * Wraps children re-keyed by `id`. On change it applies a subtle
 * `filter: blur(2px)` + opacity dip to prevent harsh jump cuts between
 * morphing states. Transform/opacity only.
 */

type MorphProps = {
  id: string | number;
  children: ReactNode;
  className?: string;
};

export function Morph({ id, children, className = "" }: MorphProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={id}
        initial={{ opacity: 0, filter: "blur(2px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, filter: "blur(2px)" }}
        transition={{ duration: 0.18, ease: EASE_OUT }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
