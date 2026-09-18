"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/Button";
import { EnsoMark } from "@/components/EnsoMark";
import { RevealText } from "@/components/RevealText";
import { D_MID, E_OUT } from "@/lib/animations";

/**
 * Cold open — le plan d'ouverture. Plein cadre, letterboxé en cinémascope,
 * vignetté, une seule source de lumière au-dessus du titre. Le cadre est
 * découpé en trois : feuille de tournage en haut, titre au centre, amorce
 * de pellicule en bas — tout doit tenir dans un écran, sans scroll.
 *
 * L'enso tient lieu de lune : il dérive un peu plus vite que le texte au
 * scroll (parallaxe), ce qui creuse le plan sans déplacer la lecture.
 */
export function ColdOpen() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const moonY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section
      ref={ref}
      className="letterbox letterbox-safe vignette light-pool relative flex min-h-[100svh] flex-col overflow-hidden px-s5 xl:px-s7"
    >
      {/* La lune / l'enso — décor de fond, dérive au scroll */}
      <motion.div aria-hidden style={{ y: moonY }} className="pointer-events-none absolute inset-0 z-[1]">
        <EnsoMark size={540} className="enso-moon" />
      </motion.div>

      <div className="relative z-[2] mx-auto flex w-full max-w-[1400px] flex-1 flex-col">
        {/* Feuille de tournage : slug line + voyant d'enregistrement */}
        <div className="rule-b-secondaire flex flex-wrap items-baseline justify-between gap-s3 pb-s3">
          <p className="text-slug">Ext. quartier des fabriques — 03:14</p>
          <p className="text-timecode flex items-center gap-s2">
            <motion.span
              aria-hidden
              className="bg-matcha inline-block h-[6px] w-[6px] rounded-badge"
              animate={{ opacity: [1, 0.15, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
            00:00:00:01
          </p>
        </div>

        {/* Le plan : titre, réplique, sorties */}
        <motion.div style={{ y: textY }} className="flex flex-1 flex-col justify-center py-s7">
          <h1>
            <RevealText as="span" className="text-title-card block" lines={["Le sourcing,", "déjà fait."]} />
            <RevealText as="span" className="text-display-serif mt-s3 block" lines={["déjà vérifié."]} />
          </h1>

          <motion.p
            className="text-intro mt-s6"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: D_MID, ease: E_OUT, delay: 0.5 }}
          >
            Huit carnets d&apos;usines vérifiées une par une, au téléphone, avant vous. Contacts directs,
            MOQ négocié, délais constatés.
          </motion.p>

          <div className="mt-s7 flex flex-wrap gap-s4">
            <Button href="/catalogue" cursorLabel="entrer">
              Voir le catalogue
            </Button>
            <Button href="#scene-03" variant="secondary" cursorLabel="dérouler">
              La méthode
            </Button>
          </div>
        </motion.div>

        {/* Amorce de pellicule */}
        <div>
          <div className="film-perfs mb-s3 h-[3px] w-full opacity-60" aria-hidden />
          <p className="text-slug">Dérouler — bobine 1 sur 6</p>
        </div>
      </div>
    </section>
  );
}
