"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { D_SLOW, E_OUT } from "@/lib/animations";
import { RevealText } from "@/components/RevealText";

interface TitleCardProps {
  /** Sur-titre en mono, façon mention de bobine. */
  kicker?: string;
  /** Lignes du carton, découpées à la main comme un intertitre. */
  lines: string[];
  /** Ligne d'accent en serif italique matcha — une seule, jamais deux. */
  accent?: string;
  className?: string;
}

/**
 * Carton-titre — l'intertitre entre deux actes. Plein cadre, noir, une
 * seule idée par carton. Les filets s'ouvrent comme un rideau ; le texte,
 * lui, est déjà là en SSR (RevealText ne joue que la translation).
 */
export function TitleCard({ kicker, lines, accent, className }: TitleCardProps) {
  return (
    <section
      className={cn(
        "vignette light-pool relative flex min-h-[68vh] items-center justify-center overflow-hidden py-s10",
        className
      )}
    >
      {/* Changement de bobine : le rond clignote deux fois, comme sur une
          copie 35 mm juste avant le raccord. Une seule fois, au passage. */}
      <motion.span
        aria-hidden
        className="cue-mark z-[3]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: [0, 1, 0, 1, 0] }}
        viewport={{ once: true, margin: "-25% 0px" }}
        transition={{ duration: 0.9, times: [0, 0.12, 0.3, 0.42, 0.6], ease: "linear" }}
      />

      <div className="relative z-[2] mx-auto max-w-[1400px] px-s5 text-center xl:px-s7">
        {kicker && <p className="text-slug mb-s7">{kicker}</p>}

        <motion.div
          aria-hidden
          className="bg-matcha mx-auto mb-s7 h-px w-full max-w-[420px] origin-center"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: D_SLOW, ease: E_OUT }}
        />

        <RevealText as="h2" className="text-title-card" lines={lines} />

        {accent && (
          <RevealText as="p" className="text-display-serif mt-s5" lines={[accent]} />
        )}

        <motion.div
          aria-hidden
          className="bg-matcha mx-auto mt-s7 h-px w-full max-w-[420px] origin-center"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: D_SLOW, ease: E_OUT, delay: 0.08 }}
        />
      </div>
    </section>
  );
}
