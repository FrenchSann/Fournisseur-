"use client";

import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

const NAV = [
  { href: "/#scene-01", label: "01 Constat" },
  { href: "/#scene-03", label: "03 Méthode" },
  { href: "/#scene-04", label: "04 Packs" },
  { href: "/#scene-06", label: "06 Questions" },
];

/** Durée totale de la "bobine", en secondes — sert à traduire la position
 * de scroll en timecode de lecture. Purement décoratif. */
const RUNTIME_SECONDS = 768; // 00:12:48

function formatTimecode(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `00:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function Header() {
  const [condensed, setCondensed] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setCondensed(y > 90);
  });

  // Tête de lecture : la position de scroll devient un temps de film.
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.round(p * RUNTIME_SECONDS);
    setElapsed((prev) => (prev === next ? prev : next));
  });

  return (
    <header
      className={cn(
        "rule-b-structure sticky top-0 z-50 bg-[#000] transition-[padding] duration-[var(--d-mid)] ease-[var(--e-out)]",
        condensed ? "py-s3" : "py-s5"
      )}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-s5 px-s5 xl:px-s7">
        <Link href="/" className="text-card-title shrink-0" data-cursor-label="accueil">
          Manufacture
        </Link>

        <nav className="hidden items-center gap-s6 lg:flex" aria-label="Navigation principale">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-slug hover:text-matcha transition-colors duration-[var(--d-fast)]"
              data-cursor-label="dérouler"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-s5 lg:flex">
          <span className="text-timecode" aria-hidden>
            {formatTimecode(elapsed)} / {formatTimecode(RUNTIME_SECONDS)}
          </span>
          <Button href="/catalogue" variant="secondary" className="!px-s4 !py-s2" cursorLabel="entrer">
            Catalogue
          </Button>
        </div>

        <details className="group lg:hidden">
          <summary className="text-slug cursor-pointer list-none" data-cursor-label="menu">
            <span className="group-open:hidden">Menu</span>
            <span className="hidden group-open:inline">Fermer</span>
          </summary>
          <div className="rule-b-structure fixed inset-x-0 top-[var(--header-h,64px)] z-40 bg-[#000] px-s5 py-s5">
            <nav className="flex flex-col gap-s5" aria-label="Navigation principale">
              {NAV.map((item) => (
                <Link key={item.href} href={item.href} className="text-card-title">
                  {item.label}
                </Link>
              ))}
              <Button href="/catalogue" variant="primary" className="w-fit">
                Catalogue
              </Button>
            </nav>
          </div>
        </details>
      </div>

      {/* Tête de lecture */}
      <motion.div
        className="bg-matcha absolute bottom-0 left-0 h-[2px] w-full origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </header>
  );
}
