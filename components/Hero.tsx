import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { EnsoMark } from "@/components/EnsoMark";
import { RevealText } from "@/components/RevealText";
import { nicheList } from "@/lib/packs";

/** Titre en deux registres : lignes en capitales Archivo (constat), puis une
 * seule ligne d'accent en Instrument Serif italique matcha minuscule — la
 * seule occurrence de cette police sur le site (voir tokens.css). */
export function Hero() {
  return (
    <div className="relative mx-auto max-w-[1400px] px-s5 pt-s8 xl:px-s7">
      <div aria-hidden className="lamp-glow" />
      <EnsoMark className="pointer-events-none absolute -top-s9 -right-s9 hidden opacity-[0.35] md:block" />
      <h1>
        <RevealText as="span" className="text-display block" lines={["Le sourcing,", "déjà fait."]} />
        <RevealText as="span" className="text-display-serif mt-s3 block" lines={["déjà vérifié."]} />
      </h1>

      <p className="text-intro mt-s6">
        Des packs de listes de fournisseurs d&apos;usines vérifiés par niche : contacts directs, MOQ négocié,
        délais constatés, prix indicatifs et retours de marques.
      </p>

      <div className="mt-s6 flex flex-wrap gap-s3">
        {nicheList.map((n) => (
          <Badge key={n.slug} label={n.nom} colorVar={n.colorVar} />
        ))}
      </div>

      <div className="mt-s7 flex flex-wrap gap-s4">
        <Button href="/catalogue">Voir le catalogue</Button>
        <Button href="#methode" variant="secondary">
          La méthode
        </Button>
      </div>
    </div>
  );
}
