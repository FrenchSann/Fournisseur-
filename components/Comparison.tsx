"use client";

import { motion } from "framer-motion";
import { strikeContainer, strikeLineVariants } from "@/lib/animations";

const ROWS = [
  { critere: "Trouver des usines fiables", sans: "des semaines de recherche à l'aveugle", avec: "liste triée et vérifiée, prête à l'emploi" },
  { critere: "Vérifier le MOQ réel", sans: "découvert au premier appel, souvent une déception", avec: "MOQ déjà négocié et documenté" },
  { critere: "Confirmer les certifications", sans: "vérification manuelle, usine par usine", avec: "certifications déjà vérifiées par appel" },
  { critere: "Rédiger le premier message", sans: "formulé à l'aveugle, sans référence", avec: "modèles de messages déjà rédigés" },
  { critere: "Temps avant un devis fiable", sans: "3 à 6 semaines", avec: "moins de 48 heures" },
];

export function Comparison() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15% 0px" }}
      variants={strikeContainer}
      className="rule-structure"
    >
      {ROWS.map((row) => (
        <div
          key={row.critere}
          className="rule-b-secondaire grid grid-cols-1 gap-s2 p-s5 last:border-b-0 md:grid-cols-3 md:items-center md:gap-s6 md:p-s6"
        >
          <p className="text-label text-fumee">{row.critere}</p>
          <p className="text-body-tight relative inline-block w-fit text-fumee">
            {row.sans}
            <motion.span
              aria-hidden
              variants={strikeLineVariants}
              className="bg-fumee absolute top-1/2 left-0 h-px w-full origin-left"
            />
          </p>
          <p className="text-body-tight text-matcha font-semibold">{row.avec}</p>
        </div>
      ))}
    </motion.div>
  );
}
