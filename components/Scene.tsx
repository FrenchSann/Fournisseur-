"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { cascadeContainer, cascadeItem } from "@/lib/animations";

interface SceneProps {
  /** Numéro de scène, affiché en filigrane géant derrière le titre. */
  number: string;
  /** Slug line de scénario — INT./EXT. LIEU — MOMENT. */
  slug: string;
  /** Timecode de tournage, purement décoratif mais toujours plausible. */
  timecode: string;
  title: string;
  id?: string;
  className?: string;
  /** Fond légèrement relevé : une scène tournée dans une autre pièce. */
  elevated?: boolean;
  children: React.ReactNode;
}

/**
 * Unité de base du film : une scène. En-tête façon feuille de service
 * (numéro, slug line, timecode), chiffre géant en filigrane qui dérive au
 * scroll (parallaxe = profondeur de champ), puis le contenu réel.
 *
 * Le chiffre de fond est aria-hidden : c'est du décor de plateau, pas de
 * l'information. Le contenu, lui, est toujours présent et lisible en SSR —
 * seule une translation anime, jamais une opacité nulle au repos.
 */
export function Scene({
  number,
  slug,
  timecode,
  title,
  id,
  className,
  elevated,
  children,
}: SceneProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const numberY = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        // Fond transparent : la projection (.film-backdrop) doit traverser.
        // Une scène "elevated" n'est plus un aplat mais un voile clair —
        // on change de pièce, pas de calque.
        "vignette relative overflow-hidden py-s10",
        elevated && "bg-creme/5",
        className
      )}
    >
      <div className="relative z-[2] mx-auto max-w-[1400px] px-s5 xl:px-s7">
        {/* Feuille de service : slug line + timecode */}
        <div className="rule-b-secondaire flex flex-wrap items-baseline justify-between gap-s3 pb-s3">
          <p className="text-slug">
            Scène {number} <span className="mx-s3 opacity-40">/</span> {slug}
          </p>
          <p className="text-timecode">{timecode}</p>
        </div>

        <div className="relative mt-s8">
          {/* Chiffre de scène en filigrane — décor, jamais lu */}
          <motion.span
            aria-hidden
            style={{ y: numberY }}
            className="text-scene-number pointer-events-none absolute -top-s9 right-0 -z-[1] select-none"
          >
            {number}
          </motion.span>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-12% 0px" }}
            variants={cascadeContainer}
          >
            <motion.h2 variants={cascadeItem} className="text-section-title max-w-[20ch]">
              {title}
            </motion.h2>
            <motion.div variants={cascadeItem} className="mt-s8">
              {children}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
