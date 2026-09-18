"use client";

import { motion } from "framer-motion";
import { gridLinesVariants } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface GridLinesProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  lineCount?: number;
}

/** Section wrapper avec filets verticaux de fond qui se dessinent du haut
 * vers le bas à l'entrée. Purement décoratif (aria-hidden) : le contenu réel
 * est rendu normalement dans le flux, indépendamment de cette couche. */
export function GridLines({ children, className, id, lineCount = 6 }: GridLinesProps) {
  return (
    <section id={id} className={cn("relative", className)}>
      <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden>
        <div
          className="mx-auto grid h-full max-w-[1400px] px-s5 xl:px-s7"
          style={{ gridTemplateColumns: `repeat(${lineCount}, 1fr)` }}
        >
          {Array.from({ length: lineCount }).map((_, i) => (
            <motion.div
              key={i}
              className="h-full rule-grille border-l-0"
              style={{ transformOrigin: "top" }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px" }}
              variants={gridLinesVariants}
            />
          ))}
        </div>
      </div>
      <div className="relative">{children}</div>
    </section>
  );
}
