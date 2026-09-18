"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { SearchBar } from "@/components/SearchBar";
import { NicheFilter } from "@/components/NicheFilter";
import { PriceRange } from "@/components/PriceRange";
import { PackCard } from "@/components/PackCard";
import { Button } from "@/components/Button";
import { filterPacks, type NicheSlug } from "@/lib/packs";

interface CatalogueClientProps {
  initialQ?: string;
  initialNiche: NicheSlug | "all";
  initialMaxPrice?: number;
}

/**
 * Enveloppe client du formulaire + de la grille catalogue.
 * Le rendu initial (props initialQ/initialNiche/initialMaxPrice) reproduit
 * exactement le filtrage déjà fait côté serveur dans app/catalogue/page.tsx
 * (HTML identique = hydratation sûre). Sans JS, le <form method="get"> de
 * la page reste pleinement fonctionnel (rechargement réel) : ce composant
 * ne fait qu'ajouter un filtrage instantané par-dessus, une fois hydraté.
 */
export function CatalogueClient({ initialQ, initialNiche, initialMaxPrice }: CatalogueClientProps) {
  const router = useRouter();
  const [q, setQ] = useState(initialQ ?? "");
  const [niche, setNiche] = useState<NicheSlug | "all">(initialNiche);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(initialMaxPrice);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const results = useMemo(() => filterPacks({ niche, search: q, maxPrice }), [q, niche, maxPrice]);
  const complet = results.find((p) => p.niche === "complet");
  const nichePacks = results.filter((p) => p.niche !== "complet");
  const hasFilters = Boolean(q) || niche !== "all" || Boolean(maxPrice);

  function syncUrl(next: { q: string; niche: NicheSlug | "all"; maxPrice?: number }) {
    const params = new URLSearchParams();
    if (next.q) params.set("q", next.q);
    if (next.niche !== "all") params.set("niche", next.niche);
    if (next.maxPrice) params.set("maxPrice", String(next.maxPrice));
    const qs = params.toString();
    router.replace(qs ? `/catalogue?${qs}` : "/catalogue", { scroll: false });
  }

  function handleChange(e: React.ChangeEvent<HTMLFormElement>) {
    const target = e.target;
    if (target instanceof HTMLInputElement && target.type === "search") return;

    if (target instanceof HTMLSelectElement && target.name === "niche") {
      const value = target.value as NicheSlug | "all";
      setNiche(value);
      syncUrl({ q, niche: value, maxPrice });
    }
    if (target instanceof HTMLInputElement && target.name === "maxPrice") {
      const value = Number(target.value);
      setMaxPrice(value);
      syncUrl({ q, niche, maxPrice: value });
    }
  }

  function handleInput(e: React.FormEvent<HTMLFormElement>) {
    const target = e.target;
    if (target instanceof HTMLInputElement && target.type === "search") {
      const value = target.value;
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        setQ(value);
        syncUrl({ q: value, niche, maxPrice });
      }, 300);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // JS actif : le filtrage est déjà instantané, la navigation réelle est inutile.
    e.preventDefault();
  }

  return (
    <div>
      <form
        method="get"
        onChange={handleChange}
        onInput={handleInput}
        onSubmit={handleSubmit}
        className="rule-structure flex flex-col gap-s5 p-s5 md:flex-row md:items-end md:gap-s6"
      >
        <div className="flex-1">
          <SearchBar defaultValue={initialQ} />
        </div>
        <div className="flex-1">
          <NicheFilter defaultValue={initialNiche} />
        </div>
        <div className="flex-1">
          <PriceRange defaultValue={maxPrice} />
        </div>
        <div className="flex gap-s3">
          <Button type="submit" variant="primary">
            Filtrer
          </Button>
          {hasFilters && (
            <Link href="/catalogue" className="text-label text-fumee hover:text-matcha self-center">
              Réinitialiser
            </Link>
          )}
        </div>
      </form>

      <h2 className="text-label text-fumee mt-s5">
        {results.length} pack{results.length > 1 ? "s" : ""} affiché{results.length > 1 ? "s" : ""}
      </h2>

      <div className="mt-s6 flex flex-col gap-s6">
        {nichePacks.length === 0 && !complet ? (
          <p className="text-body text-fumee py-s8 text-center">Aucun pack ne correspond à cette recherche.</p>
        ) : (
          <motion.div layout className="grid grid-cols-1 gap-s5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {nichePacks.map((pack) => (
                <PackCard key={pack.ref} pack={pack} layoutId={pack.ref} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
        {complet && <PackCard pack={complet} variant="feature" />}
      </div>
    </div>
  );
}
