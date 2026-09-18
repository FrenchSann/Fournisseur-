import { PackCard } from "@/components/PackCard";
import type { Pack } from "@/lib/packs";

interface PackGridProps {
  packs: Pack[];
}

/** Grille catalogue : les packs de niche en 3 colonnes, le pack "lot complet"
 * toujours affiché en pleine largeur, hors grille de niche. */
export function PackGrid({ packs }: PackGridProps) {
  const complet = packs.find((p) => p.niche === "complet");
  const nichePacks = packs.filter((p) => p.niche !== "complet");

  if (nichePacks.length === 0 && !complet) {
    return (
      <p className="text-body text-fumee py-s8 text-center">
        Aucun pack ne correspond à cette recherche.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-s6">
      <div className="grid grid-cols-1 gap-s5 sm:grid-cols-2 lg:grid-cols-3">
        {nichePacks.map((pack) => (
          <PackCard key={pack.ref} pack={pack} />
        ))}
      </div>
      {complet && <PackCard pack={complet} variant="feature" />}
    </div>
  );
}
