import { cn } from "@/lib/utils";

interface BandProps {
  items: string[];
  reverse?: boolean;
  inverted?: boolean;
}

/**
 * Bande de pellicule — défilement continu (34s, CSS pur, pas de JS), bordée
 * de perforations 35 mm. Contenu dupliqué pour une boucle sans coupure.
 * Purement décoratif : les mêmes informations existent ailleurs dans le
 * contenu réel de la page.
 */
export function Band({ items, reverse, inverted }: BandProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "rule-t-structure rule-b-structure overflow-hidden",
        inverted ? "bg-creme text-nuit" : "bg-nuit-elevee text-creme"
      )}
    >
      <div className={cn("film-perfs h-[6px] w-full", inverted && "opacity-30")} />

      <div className={cn("marquee-track py-s4", reverse && "marquee-track-reverse")}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {items.map((item, i) => (
              <span
                key={i}
                className={cn(
                  "text-slug mx-s5 flex shrink-0 items-center whitespace-nowrap",
                  // .text-slug impose color:fumee — illisible sur le fond clair
                  // du bandeau inversé (2,58:1). On force l'encre sombre ici.
                  inverted && "text-nuit"
                )}
              >
                {item}
                <span className={cn("ml-s5", inverted ? "text-nuit/40" : "text-matcha/70")}>✳</span>
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className={cn("film-perfs h-[6px] w-full", inverted && "opacity-30")} />
    </div>
  );
}
