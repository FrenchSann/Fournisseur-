"use client";

import { motion } from "framer-motion";
import { Counter } from "@/components/Counter";
import { cascadeContainer, cascadeItem } from "@/lib/animations";
import { chiffresCles } from "@/lib/packs";

// Chiffres agrégés — voir le TODO sur chiffresCles dans lib/packs.ts :
// données d'exemple en attendant l'export réel du back-office.
const STATS = [
  { value: chiffresCles.usinesContactees, suffix: "", label: "usines contactées et qualifiées" },
  { value: chiffresCles.niches, suffix: "", label: "niches couvertes" },
  { value: chiffresCles.usinesEcartees, suffix: "", label: "usines écartées après vérification" },
  { value: chiffresCles.tauxReponse72h, suffix: "%", label: "taux de réponse usine sous 72h" },
];

export function ProofStats() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={cascadeContainer}
      className="grid grid-cols-2 gap-s6 lg:grid-cols-4"
    >
      {STATS.map((stat) => (
        <motion.div key={stat.label} variants={cascadeItem} className="rule-t-structure pt-s5">
          <p className="text-section-title">
            <Counter value={stat.value} suffix={stat.suffix} />
          </p>
          <p className="text-label text-fumee mt-s3 max-w-[20ch]">{stat.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
