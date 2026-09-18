"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/animations";

/**
 * Curseur personnalisé — garde-fous accessibilité (voir plan §7) :
 * 1. `cursor: none` n'est jamais posé statiquement : seulement via la classe
 *    .cursor-none-active, elle-même posée uniquement ici, après confirmation
 *    JS + pointer:fine + largeur ≥768px. Sans JS ou sur tactile, curseur natif.
 * 2. Composant monté une seule fois dans layout.tsx, ne rend rien sur mobile/tactile.
 * 3. :focus-visible (globals.css) reste indépendant : ce curseur est décoratif.
 * 4. Étiquette via délégation d'événements document-level sur [data-cursor-label].
 * 5. aria-hidden.
 * 6. Désactivé sous prefers-reduced-motion.
 */
export function CustomCursor() {
  const [label, setLabel] = useState<string | null>(null);
  const reduced = usePrefersReducedMotion();
  // Les trois media queries renvoient false au SSR (useMediaQuery) : le
  // curseur est donc dérivé du rendu, sans état ni effet de synchronisation.
  const fine = useMediaQuery("(pointer: fine)");
  const wide = useMediaQuery("(min-width: 768px)");
  const enabled = fine && wide && !reduced;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 700, damping: 45, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 700, damping: 45, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("cursor-none-active");

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor-label]");
      setLabel(target?.dataset.cursorLabel ?? null);
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver);

    return () => {
      document.documentElement.classList.remove("cursor-none-active");
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[80] flex items-center justify-center"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
    >
      <motion.div
        className="relative flex items-center justify-center bg-matcha"
        animate={{
          width: label ? 92 : 18,
          height: label ? 36 : 18,
          borderRadius: label ? 9999 : 0,
          rotate: label ? 0 : 45,
          backgroundColor: label ? "var(--color-matcha)" : "transparent",
        }}
        transition={{ duration: 0.22, ease: [0.16, 0.84, 0.3, 1] }}
      >
        {!label && (
          <span
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundColor: "var(--color-creme)",
              clipPath:
                "polygon(42% 0%, 58% 0%, 58% 42%, 100% 42%, 100% 58%, 58% 58%, 58% 100%, 42% 100%, 42% 58%, 0% 58%, 0% 42%, 42% 42%)",
            }}
          />
        )}
        {label && <span className="text-label text-nuit whitespace-nowrap">{label}</span>}
      </motion.div>
    </motion.div>
  );
}
