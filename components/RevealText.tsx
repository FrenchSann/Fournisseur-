"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { maskLineChild, maskLineContainer } from "@/lib/animations";

const TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
  div: motion.div,
} as const;

interface RevealTextProps {
  lines: string[];
  as?: keyof typeof TAGS;
  className?: string;
  lineClassName?: string;
}

/**
 * Masque de titre : chaque ligne dans un conteneur overflow-hidden, translatée
 * à 112% puis animée à 0 (950ms, courbe sortante), décalage de 90ms entre
 * lignes. Le style inline "hidden" appliqué par Framer Motion est neutralisé
 * sans JS via la règle .reveal-line-inner posée dans app/layout.tsx
 * (<noscript><style>) — le texte reste toujours présent et lisible dans le HTML.
 */
export function RevealText({ lines, as = "span", className, lineClassName }: RevealTextProps) {
  const MotionTag = TAGS[as];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={maskLineContainer}
    >
      {lines.map((line, i) => (
        <span key={i} className={cn("block overflow-hidden", lineClassName)}>
          <motion.span className="reveal-line-inner block" variants={maskLineChild}>
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
