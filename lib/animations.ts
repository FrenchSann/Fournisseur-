import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { animate, useInView, type Variants } from "framer-motion";

// Miroir de styles/tokens.css (--d-fast/--d-mid/--d-slow, --e-out/--e-io).
// Framer Motion attend des nombres en secondes et des tableaux de bézier en
// JS, jamais des var() CSS — GARDER SYNCHRONISÉ avec tokens.css si les
// timings changent.
export const D_FAST = 0.22;
export const D_MID = 0.42;
export const D_SLOW = 0.95;
export const E_OUT = [0.16, 0.84, 0.3, 1] as const;
export const E_IO = [0.65, 0, 0.35, 1] as const;

/** Lit une media query en s'abonnant directement au MediaQueryList plutôt
 * qu'en posant l'état depuis un effet (qui déclenche un rendu en cascade à
 * chaque montage). Le snapshot serveur vaut toujours `false` : aucune media
 * query n'est évaluable au SSR, et React réévalue juste après l'hydratation —
 * donc pas de mismatch. */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

// Masque de titre : chaque ligne translatée à 112% puis animée à 0%,
// décalage de 90ms entre lignes via staggerChildren sur le parent.
export const maskLineContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09 },
  },
};

export const maskLineChild: Variants = {
  hidden: { y: "112%" },
  visible: {
    y: "0%",
    transition: { duration: D_SLOW, ease: E_OUT },
  },
};

// Cascade au scroll — jamais d'opacité nulle au repos initial (contrainte
// SEO/no-JS) : seule la translation Y anime, le contenu reste lisible avant
// hydratation.
export const cascadeContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

export const cascadeItem: Variants = {
  hidden: { y: 24 },
  visible: {
    y: 0,
    transition: { duration: D_MID, ease: E_OUT },
  },
};

// Grille qui se dessine — scaleY du haut vers le bas.
export const gridLinesVariants: Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.9, ease: E_OUT },
  },
};

// Hover carte de pack : la carte recule (translate négatif), pose l'ombre
// d'impression ; le filet de niche et le prix sont des variants enfants
// orchestrés par le même état "hover"/"rest" du parent.
export const cardVariants: Variants = {
  rest: { x: 0, y: 0, boxShadow: "none" },
  hover: {
    x: -4,
    y: -4,
    boxShadow: "var(--shadow-print)",
    transition: { duration: D_FAST, ease: E_OUT },
  },
};

export const cardNicheRuleVariants: Variants = {
  rest: { scaleX: 0.22 },
  hover: { scaleX: 1, transition: { duration: D_FAST, ease: E_OUT } },
};

// Le conteneur empile 2 lignes de prix identiques (encre puis bleu) : au
// repos on voit la 1re ligne, au survol on translate d'exactement une ligne
// (1.18em = line-height de .text-card-title) pour révéler la 2e, bleue.
export const cardPriceVariants: Variants = {
  rest: { y: "0em" },
  hover: { y: "-1.18em", transition: { duration: D_FAST, ease: E_OUT } },
};

// Comparaison avant/après : ligne de rature qui se dessine (scaleX) sur
// chaque critère "sans le pack", en cascade avec le conteneur parent.
export const strikeContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export const strikeLineVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: D_MID, ease: E_OUT } },
};

// Volet d'encre : bas → haut (couvre) puis haut → disparaît, en 900ms.
export const pageWipeVariants: Variants = {
  initial: { scaleY: 0, transformOrigin: "bottom" },
  animate: {
    scaleY: [0, 1, 1, 0],
    transformOrigin: ["bottom", "bottom", "top", "top"],
    transition: { duration: 0.9, times: [0, 0.42, 0.58, 1], ease: E_IO },
  },
};

export const pageContentVariants: Variants = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
};

/** Compteur qui monte, easing cubique, ~1100ms, déclenché à l'entrée en vue.
 * La valeur initiale est déjà la cible : sans JS, le chiffre final est lisible
 * dans le HTML. Sous reduced motion on ne lance rien et on renvoie la cible. */
export function useCounter(target: number, duration = 1.1) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [animated, setAnimated] = useState(target);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, target, {
      duration,
      ease: [0.33, 1, 0.68, 1],
      onUpdate: (v) => setAnimated(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target, duration, reduced]);

  return { ref, value: reduced ? target : animated };
}
