import type { Metadata } from "next";
import { RevealText } from "@/components/RevealText";
import { GridLines } from "@/components/GridLines";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Éditeur, hébergement, propriété intellectuelle et données personnelles du site Manufacture.",
};

// TODO: remplacer par les vraies coordonnées légales (éditeur, hébergeur,
// SIRET, directeur de publication, DPO) avant mise en production.
const SECTIONS = [
  {
    title: "Éditeur du site",
    body: "Manufacture — SAS au capital de 1 000 €. Siège social : 12 rue de l'Atelier, 75011 Paris, France. SIRET : 000 000 000 00000. Directeur de la publication : [à compléter]. Contact : contact@manufacture.example.",
  },
  {
    title: "Hébergement",
    body: "Le site est hébergé par [nom de l'hébergeur à compléter], [adresse de l'hébergeur à compléter].",
  },
  {
    title: "Propriété intellectuelle",
    body: "L'ensemble des contenus présents sur ce site (textes, mise en page, système visuel) est la propriété de Manufacture, sauf mention contraire, et ne peut être reproduit sans autorisation préalable.",
  },
  {
    title: "Données personnelles",
    body: "Les données collectées via le formulaire de contact ou lors d'un achat sont utilisées exclusivement pour le traitement de la demande ou de la commande. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données, exerçable à contact@manufacture.example.",
  },
  {
    title: "Cookies",
    body: "Le site n'utilise pas de cookies de suivi publicitaire. Voir la politique de confidentialité pour le détail des cookies techniques éventuellement déposés.",
  },
];

export default function MentionsLegalesPage() {
  return (
    <GridLines className="vignette relative overflow-hidden py-s9">
      <div className="relative z-[2] mx-auto max-w-[900px] px-s5 xl:px-s7">
        <div className="rule-b-secondaire mb-s8 flex flex-wrap items-baseline justify-between gap-s3 pb-s3">
          <p className="text-slug">Annexe — production</p>
          <p className="text-timecode">Hors bobine</p>
        </div>
        <RevealText as="h1" className="text-section-title" lines={["Mentions légales."]} />

        <div className="mt-s9 flex flex-col gap-s8">
          {SECTIONS.map((section) => (
            <section key={section.title} className="rule-t-structure pt-s6">
              <h2 className="text-section-title text-[24px] md:text-[28px]">{section.title}</h2>
              <p className="text-body text-fumee mt-s4 max-w-[65ch]">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </GridLines>
  );
}
