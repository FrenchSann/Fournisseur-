interface SearchBarProps {
  defaultValue?: string;
}

/** Champ natif, soumis via le formulaire GET du catalogue — fonctionne sans
 * JS. L'étape 8 du plan y ajoute une interactivité client par-dessus. */
export function SearchBar({ defaultValue }: SearchBarProps) {
  return (
    <div className="flex flex-col gap-s2">
      <label htmlFor="q" className="text-label text-fumee">
        Recherche
      </label>
      <input
        id="q"
        name="q"
        type="search"
        placeholder="niche, pays…"
        defaultValue={defaultValue}
        className="input-text w-full"
      />
    </div>
  );
}
