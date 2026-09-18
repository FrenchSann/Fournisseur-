import { nicheList, type NicheSlug } from "@/lib/packs";

interface NicheFilterProps {
  defaultValue?: NicheSlug | "all";
}

/** Select natif — fonctionne sans JS via soumission GET du formulaire. */
export function NicheFilter({ defaultValue = "all" }: NicheFilterProps) {
  return (
    <div className="flex flex-col gap-s2">
      <label htmlFor="niche" className="text-label text-fumee">
        Niche
      </label>
      <select id="niche" name="niche" defaultValue={defaultValue} className="input-select w-full">
        <option value="all">Toutes les niches</option>
        {nicheList.map((n) => (
          <option key={n.slug} value={n.slug}>
            {n.nom}
          </option>
        ))}
      </select>
    </div>
  );
}
