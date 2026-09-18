import { ColdOpen } from "@/components/ColdOpen";
import { Scene } from "@/components/Scene";
import { TitleCard } from "@/components/TitleCard";
import { Band } from "@/components/Band";
import { ProofStats } from "@/components/ProofStats";
import { Testimonials } from "@/components/Testimonials";
import { Steps } from "@/components/Steps";
import { PackGrid } from "@/components/PackGrid";
import { Comparison } from "@/components/Comparison";
import { Faq } from "@/components/Faq";
import { Reassurance } from "@/components/Reassurance";
import { Button } from "@/components/Button";
import { packs, nicheList } from "@/lib/packs";

const TICKER = [
  "8 niches vérifiées",
  "142 usines contactées",
  "MOQ négocié",
  "délais constatés",
  "certifications vérifiées",
  "contacts directs",
];

const BEST_SELLERS = [
  "textile-pret-a-porter",
  "maroquinerie-petit-cuir",
  "cosmetique-parfum",
  "electronique-accessoires",
  "lot-complet",
];

export default function HomePage() {
  const bestSellers = BEST_SELLERS.map((slug) => packs.find((p) => p.slug === slug)).filter(
    (p) => p !== undefined
  );
  const nicheNames = nicheList.map((n) => n.nom);

  return (
    <>
      <ColdOpen />

      <Band items={TICKER} />

      <Scene
        id="scene-01"
        number="01"
        slug="Int. bureau — 03:14"
        timecode="00:01:07:12"
        title="Ce n'est pas une base de contacts, c'est un travail déjà fait."
      >
        <ProofStats />
      </Scene>

      <Scene
        id="scene-02"
        number="02"
        slug="Int. comptoir — nuit"
        timecode="00:03:22:04"
        title="Ce qu'en disent les marques qui l'ont testé."
        elevated
      >
        <Testimonials />
      </Scene>

      <Scene
        id="scene-03"
        number="03"
        slug="Int. atelier — aube"
        timecode="00:05:41:18"
        title="Trois étapes, pas de raccourci."
      >
        <Steps />
      </Scene>

      <TitleCard
        kicker="Bobine 4 — les pièces"
        lines={["Huit carnets."]}
        accent="un seul geste."
      />

      <Scene
        id="scene-04"
        number="04"
        slug="Int. archives — jour"
        timecode="00:07:03:09"
        title="Les packs les plus demandés."
      >
        <div className="flex flex-col gap-s8">
          <PackGrid packs={bestSellers} />
          <div>
            <Button href="/catalogue" variant="secondary" cursorLabel="entrer">
              Tout le catalogue
            </Button>
          </div>
        </div>
      </Scene>

      <Band items={nicheNames} reverse inverted />

      <Scene
        id="scene-05"
        number="05"
        slug="Montage parallèle — sans / avec"
        timecode="00:09:16:22"
        title="Sans le pack, avec le pack."
        elevated
      >
        <Comparison />
      </Scene>

      <Scene
        id="scene-06"
        number="06"
        slug="Int. salle d'attente — jour"
        timecode="00:11:02:06"
        title="Questions fréquentes."
      >
        <Faq />
      </Scene>

      <Scene
        number="07"
        slug="Ext. quai de chargement — aube"
        timecode="00:12:31:00"
        title="Avant de lancer la production."
      >
        <Reassurance />
      </Scene>
    </>
  );
}
