const QUESTIONS = [
  {
    q: "Qu'est-ce que je reçois exactement après l'achat ?",
    a: "Une fiche PDF par usine (contact direct, MOQ négocié, délai constaté, certifications), une grille de prix indicatifs, des modèles de messages de prise de contact et une checklist d'inspection — tout ce qu'il faut pour passer un premier appel préparé.",
  },
  {
    q: "Les usines ont-elles été visitées physiquement ?",
    a: "Chaque usine est vérifiée par appel direct avec un interlocuteur export identifié. Une partie du panel est visitée sur place selon les niches ; le mode de vérification est précisé dans chaque fiche.",
  },
  {
    q: "Le MOQ annoncé est-il garanti ?",
    a: "Le MOQ indiqué est celui négocié et confirmé au moment de la vérification. Les conditions peuvent évoluer d'une commande à l'autre : c'est un point de départ de négociation fiable, pas un contrat.",
  },
  {
    q: "Que se passe-t-il si une usine ne répond plus ?",
    a: "Les carnets sont mis à jour périodiquement. Si une usine sort du panel, elle est retirée à la mise à jour suivante — la date de dernière mise à jour est affichée en en-tête du site.",
  },
  {
    q: "Puis-je acheter un seul carnet ou dois-je prendre le lot complet ?",
    a: "Chaque carnet de niche s'achète indépendamment. Le lot complet regroupe les 8 niches à prix réduit, utile pour une marque multi-catégories ou une agence de sourcing.",
  },
  {
    q: "Le pack fonctionne-t-il pour une toute petite marque, sans historique de commande ?",
    a: "Oui — les usines du panel ont été sélectionnées en partie pour leur capacité à accepter un MOQ réduit, précisément pour permettre un premier lancement sans engager un stock disproportionné.",
  },
  {
    q: "Proposez-vous un remboursement ?",
    a: "Le contenu étant numérique et consultable immédiatement après achat, il n'est pas remboursable une fois la fiche téléchargée. Voir les CGV pour le détail des conditions.",
  },
];

/** Base native <details>/<summary> — fonctionne sans JS. L'attribut `name`
 * partagé impose un seul panneau ouvert à la fois nativement (pas de JS). */
export function Faq() {
  return (
    <div className="rule-t-structure">
      {QUESTIONS.map((item, i) => (
        <details key={item.q} name="faq" className="group rule-b-secondaire">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-s5 py-s5" data-cursor-label="ouvrir">
            <span className="flex gap-s5">
              <span className="text-label text-fumee">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-card-title text-[19px] md:text-[22px]">{item.q}</span>
            </span>
            <span aria-hidden className="text-label shrink-0 pt-s1 text-fumee group-open:hidden">
              +
            </span>
            <span aria-hidden className="text-label shrink-0 pt-s1 text-fumee hidden group-open:inline">
              −
            </span>
          </summary>
          <p className="text-body text-fumee max-w-[65ch] pb-s6 pl-s8">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
