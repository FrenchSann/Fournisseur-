"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { D_SLOW, E_OUT } from "@/lib/animations";

interface EnsoMarkProps {
  size?: number;
  className?: string;
}

/**
 * Enso — le trait de pinceau unique de la cérémonie du thé. Signature
 * graphique du site, posée une seule fois derrière le hero, jamais
 * dupliquée ailleurs. Cercle volontairement imparfait (92 % du tour, comme
 * un geste qui ne referme jamais tout à fait), tracé au scroll via
 * `pathLength` — s'affiche instantanément fermé sous prefers-reduced-motion
 * (le SVG reste dans le HTML, donc jamais invisible sans JS).
 */
export function EnsoMark({ size = 480, className }: EnsoMarkProps) {
  const r = size / 2 - 6;
  const center = size / 2;

  return (
    <svg
      aria-hidden
      className={cn("enso-mark", className)}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      <motion.circle
        cx={center}
        cy={center}
        r={r}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 0.92 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: D_SLOW, ease: E_OUT }}
        transform={`rotate(-108 ${center} ${center})`}
      />
    </svg>
  );
}
