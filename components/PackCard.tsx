"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { cardVariants, cardNicheRuleVariants, cardPriceVariants } from "@/lib/animations";
import { formatPrice, formatNumber, cn } from "@/lib/utils";
import type { Pack } from "@/lib/packs";

interface PackCardProps {
  pack: Pack;
  className?: string;
  /** Carte "lot complet" : mise en page pleine largeur, hors grille niche. */
  variant?: "grid" | "feature";
  /** Fourni uniquement par la grille interactive du catalogue : active le
   * réordonnancement FLIP (layout) via Framer Motion. */
  layoutId?: string;
}

export function PackCard({ pack, className, variant = "grid", layoutId }: PackCardProps) {
  const [active, setActive] = useState(false);
  const isFeature = variant === "feature";

  return (
    <Link
      href={`/catalogue/${pack.slug}`}
      data-cursor-label="voir le pack"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      className={cn("block h-full", className)}
    >
      <motion.article
        layout={Boolean(layoutId)}
        layoutId={layoutId}
        exit={layoutId ? { opacity: 0, transition: { duration: 0.22 } } : undefined}
        initial="rest"
        animate={active ? "hover" : "rest"}
        variants={cardVariants}
        className={cn(
          "relative flex h-full flex-col rule-structure bg-nuit",
          isFeature && "md:grid md:grid-cols-12 md:items-stretch"
        )}
      >
        <motion.div
          aria-hidden
          className="absolute top-0 left-0 h-[4px] w-full origin-left"
          style={{ backgroundColor: pack.colorVar }}
          variants={cardNicheRuleVariants}
        />

        <div className={cn("flex flex-1 flex-col p-s5 pt-s6", isFeature && "md:col-span-8 md:p-s7")}>
          <p className="text-label text-fumee">{pack.ref}</p>
          <h3 className={cn("text-card-title mt-s2", isFeature && "text-section-title")}>{pack.nom}</h3>
          <p className={cn("text-body-tight mt-s3 text-fumee", isFeature && "text-intro max-w-[52ch]")}>
            {pack.resume}
          </p>

          <dl className="rule-t-secondaire mt-s5 grid grid-cols-2 gap-s3 pt-s4 md:grid-cols-3">
            <div>
              <dt className="text-label text-fumee">Usines</dt>
              <dd className="text-data mt-s1">{formatNumber(pack.usines)}</dd>
            </div>
            <div>
              <dt className="text-label text-fumee">MOQ</dt>
              <dd className="text-data mt-s1">
                {formatNumber(pack.moq)} {pack.moqUnite}
              </dd>
            </div>
            <div className="col-span-2 md:col-span-1">
              <dt className="text-label text-fumee">Pays</dt>
              <dd className="text-data mt-s1">{pack.pays.length}</dd>
            </div>
          </dl>
        </div>

        <div
          className={cn(
            "flex items-end justify-between gap-s3 p-s5 pt-0 md:pt-s5",
            isFeature && "md:col-span-4 md:items-center md:justify-end md:border-l-0 rule-t-secondaire md:pt-s7 md:pb-s7"
          )}
        >
          <p className="text-label text-fumee md:hidden">Voir le pack</p>
          <div
            className={cn(
              "h-[1.18em] overflow-hidden text-right",
              isFeature ? "text-section-title" : "text-card-title"
            )}
          >
            <motion.div variants={cardPriceVariants}>
              <span className="block">
                {pack.prixBarre && (
                  <span className="text-body-tight mr-s2 text-fumee line-through">
                    {formatPrice(pack.prixBarre)}
                  </span>
                )}
                {formatPrice(pack.prix)}
              </span>
              <span className="block text-matcha">{formatPrice(pack.prix)}</span>
            </motion.div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
