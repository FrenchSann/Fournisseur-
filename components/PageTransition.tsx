"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { pageWipeVariants, usePrefersReducedMotion } from "@/lib/animations";

// Persiste en dehors du cycle de vie React : app/template.tsx remonte ce
// composant quand le premier segment d'URL change (y compris au tout premier
// rendu), donc un état React classique ne suffit pas à distinguer "premier
// chargement" de "navigation suivante". Une variable de module survit aux
// remounts tant que la page n'est pas rechargée en dur.
let hasNavigatedOnce = false;

function labelFromPathname(pathname: string) {
  if (pathname === "/") return "Accueil";
  const last = pathname.split("/").filter(Boolean).pop() ?? "";
  return last.replace(/-/g, " ");
}

interface PageTransitionProps {
  children: React.ReactNode;
}

/** Volet de nuit : bas → haut (couvre) puis haut → disparaît, 900ms, nom de
 * page surimprimé en matcha au pic de couverture — comme si on éteignait la
 * lampe entre deux pages. Ne se joue jamais au tout premier chargement (rien
 * à transitionner depuis), ni sous prefers-reduced-motion.
 *
 * Deux chemins mènent ici, d'où les deux mécanismes :
 * - navigation qui change le premier segment (/ → /catalogue) : le template
 *   remonte, l'état initial décide, `hasNavigatedOnce` écarte le 1er rendu ;
 * - navigation dans le même segment (/catalogue → /catalogue/[slug]) : pas de
 *   remount, c'est le changement de `pathname` en cours de rendu qui décide. */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();
  // Pathname dont le volet est en train de se jouer, null si aucun.
  const [wipeFor, setWipeFor] = useState<string | null>(() =>
    hasNavigatedOnce && !reduced ? pathname : null,
  );
  const [renderedPath, setRenderedPath] = useState(pathname);

  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setWipeFor(reduced ? null : pathname);
  }

  useEffect(() => {
    hasNavigatedOnce = true;
  }, []);

  return (
    <>
      {wipeFor !== null && (
        <motion.div
          // Une navigation pendant le volet le rejoue depuis le début.
          key={wipeFor}
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center bg-nuit"
          variants={pageWipeVariants}
          initial="initial"
          animate="animate"
          onAnimationComplete={() => setWipeFor(null)}
        >
          {/* Claquette : on annonce le plan suivant pendant le noir */}
          <span className="flex flex-col items-center gap-s3 text-center">
            <span className="bg-matcha h-px w-[120px]" />
            <span className="text-slug text-creme">{labelFromPathname(wipeFor)}</span>
            <span className="text-timecode">Plan suivant</span>
            <span className="bg-matcha h-px w-[120px]" />
          </span>
        </motion.div>
      )}
      {children}
    </>
  );
}
