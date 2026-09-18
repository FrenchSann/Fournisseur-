import { cn } from "@/lib/utils";

interface BadgeProps {
  label: string;
  colorVar?: string;
  className?: string;
  active?: boolean;
}

/** Pastille de niche réutilisée dans l'index du hero, les cartes et les
 * filtres du catalogue. La couleur de niche n'apparaît ici qu'en petite
 * pastille de 6px, jamais en aplat. */
export function Badge({ label, colorVar, className, active }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-s2 rounded-badge rule-secondaire px-s3 py-s1 text-label",
        active ? "bg-creme text-nuit" : "bg-nuit-elevee text-creme",
        className
      )}
    >
      {colorVar && (
        <span
          aria-hidden
          className="inline-block h-[6px] w-[6px] shrink-0 rounded-badge"
          style={{ backgroundColor: colorVar }}
        />
      )}
      {label}
    </span>
  );
}
