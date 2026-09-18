import { formatPrice } from "@/lib/utils";

const MIN = 49;
const MAX = 249;

interface PriceRangeProps {
  defaultValue?: number;
}

/** <input type="range"> natif, thumb carré (voir .input-range dans
 * tokens.css) — fonctionne sans JS via soumission GET du formulaire. */
export function PriceRange({ defaultValue = MAX }: PriceRangeProps) {
  return (
    <div className="flex flex-col gap-s2">
      <label htmlFor="maxPrice" className="text-label text-fumee">
        Prix max — <span className="text-data">{formatPrice(defaultValue)}</span>
      </label>
      <input
        id="maxPrice"
        name="maxPrice"
        type="range"
        min={MIN}
        max={MAX}
        step={10}
        defaultValue={defaultValue}
        className="input-range mt-s2"
      />
    </div>
  );
}
