import type { Metadata } from "next";
import { RevealText } from "@/components/RevealText";
import { GridLines } from "@/components/GridLines";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description: "Conditions générales de vente des packs de listes de fournisseurs Manufacture.",
};

// TODO: faire relire par un juriste avant mise en production — contenu
// d'exemple structurant les sections attendues, pas un texte contractuel valide.
const SECTIONS = [
  {
    title: "Objet",
    body: "Les présentes conditions régissent la vente des packs numériques Manufacture (listes de fournisseurs d'usines vérifiés) proposés sur ce site, à l'exclusion de toute autre condition.",
  },
  {
    title: "Produits et contenu",
    body: "Chaque pack donne accès à une fiche PDF par usine, une grille de prix indicatifs, des modèles de messages et une checklist d'inspection, tels que décrits sur la fiche produit au moment de l'achat.",
  },
  {
    title: "Prix et paiement",
    body: "Les prix sont indiqués en euros, toutes taxes comprises. Le paiement est exigible immédiatement à la commande, par les moyens proposés en caisse.",
  },
  {
    title: "Livraison du contenu",
    body: "Le contenu numérique est mis à disposition immédiatement après confirmation du paiement, par téléchargement depuis un lien envoyé à l'adresse e-mail fournie à la commande.",
  },
  {
    title: "Droit de rétractation",
    body: "Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne peut être exercé pour un contenu numérique non fourni sur support matériel dont l'exécution a commencé avec l'accord du consommateur, qui reconnaît alors renoncer à son droit de rétractation dès le téléchargement.",
  },
  {
    title: "Responsabilité",
    body: "Les informations fournies (MOQ, délais, prix indicatifs) reflètent l'état constaté au moment de la vérification et sont fournies à titre indicatif. Manufacture ne saurait être tenu responsable des conditions finales négociées entre l'acheteur et une usine tierce.",
  },
  {
    title: "Droit applicable",
    body: "Les présentes conditions sont soumises au droit français. Tout litige relève, à défaut de résolution amiable, des juridictions compétentes.",
  },
];

export default function CgvPage() {
  return (
    <GridLines className="vignette relative overflow-hidden py-s9">
      <div className="relative z-[2] mx-auto max-w-[900px] px-s5 xl:px-s7">
        <div className="rule-b-secondaire mb-s8 flex flex-wrap items-baseline justify-between gap-s3 pb-s3">
          <p className="text-slug">Annexe — contrat</p>
          <p className="text-timecode">Hors bobine</p>
        </div>
        <RevealText as="h1" className="text-section-title" lines={["Conditions générales de vente."]} />

        <div className="mt-s9 flex flex-col gap-s8">
          {SECTIONS.map((section, i) => (
            <section key={section.title} className="rule-t-structure pt-s6">
              <p className="text-label text-fumee">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="text-section-title mt-s2 text-[24px] md:text-[28px]">{section.title}</h2>
              <p className="text-body text-fumee mt-s4 max-w-[65ch]">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </GridLines>
  );
}
