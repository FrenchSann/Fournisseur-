"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";

const STEPS = [
  {
    n: "01",
    title: "On liste les usines candidates",
    body: "Par niche, on identifie les usines compatibles avec un MOQ accessible et une capacité de petite série — pas les plus grosses, les plus adaptées.",
  },
  {
    n: "02",
    title: "On vérifie par appel, pas par e-mail",
    body: "Contact direct avec chaque usine : MOQ réel négocié, délai constaté (pas annoncé), certifications déclarées et vérifiables.",
  },
  {
    n: "03",
    title: "On écarte, on documente, on livre",
    body: "Les usines non conformes sont écartées du pack. Les autres sont documentées dans une fiche prête à contacter, avec grille de prix et modèles de messages.",
  },
];

/** Rail vertical avec progression liée au scroll de la section (pas une
 * animation d'entrée classique : la barre suit la position de lecture). */
export function Steps() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.4"] });

  return (
    <div ref={ref} className="grid grid-cols-1 gap-s7 lg:grid-cols-[2px_1fr] lg:gap-s10">
      <div className="relative hidden bg-fumee/15 lg:block" aria-hidden>
        <motion.div
          className="absolute top-0 left-0 w-full origin-top bg-matcha"
          style={{ height: "100%", scaleY: scrollYProgress }}
        />
      </div>
      <ol className="flex flex-col gap-s8">
        {STEPS.map((step) => (
          <li key={step.n} className="rule-t-secondaire grid grid-cols-1 gap-s4 pt-s6 md:grid-cols-[64px_1fr]">
            <span className="text-label text-fumee">{step.n}</span>
            <div>
              <h3 className="text-card-title">{step.title}</h3>
              <p className="text-body mt-s3 text-fumee">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
