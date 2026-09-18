// Données du catalogue Manufacture.
// Les 9 packs (référence, niche, usines, MOQ, prix, pays) sont les données
// d'exemple fournies pour construire le catalogue — à remplacer par
// l'export du back-office une fois la vérification terrain réalisée
// (voir README.md, section "Brancher un CMS").
//
// TODO: remplacer par les vraies données — noms d'usines, contacts,
// avis clients et chiffres agrégés globaux (voir chiffresCles ci-dessous
// et chaque champ marqué "exemple: true").

export type NicheSlug =
  | "maroquinerie"
  | "bagagerie"
  | "jouets"
  | "cosmetique"
  | "textile"
  | "bijouterie"
  | "mobilier"
  | "electronique";

export interface Pack {
  ref: string;
  slug: string;
  niche: NicheSlug | "complet";
  nom: string;
  colorVar: string;
  usines: number;
  moq: number;
  moqUnite: string;
  prix: number;
  prixBarre?: number;
  pays: string[];
  resume: string;
}

export interface FicheUsine {
  nom: string;
  pays: string;
  moq: string;
  delai: string;
  certifs: string[];
}

export interface PrixIndicatif {
  produit: string;
  prixUnitaire: string;
  quantite: string;
}

export interface EtapeDelai {
  etape: string;
  duree: string;
}

export interface RetourMarque {
  citation: string;
  marque: string;
  exemple: true;
}

export interface ModeleMessage {
  objet: string;
  corps: string;
}

export interface LigneComparaison {
  critere: string;
  soiMeme: string;
  pack: string;
}

export interface PackDetailContent extends Pack {
  description: string;
  blocs: {
    fichesUsine: FicheUsine[];
    moqNegocie: string;
    prixIndicatifs: PrixIndicatif[];
    delais: EtapeDelai[];
    certifications: string[];
    retoursMarques: RetourMarque[];
    modelesMessages: ModeleMessage[];
    grilleComparaison: LigneComparaison[];
    checklistInspection: string[];
  };
  extraitFicheUsine: {
    avantContact: string;
    apresContact: string;
  };
  ficheTechnique: {
    contactsParPack: number;
    moqMedian: number;
    delaiMoyen: string;
    usinesEcartees: number;
  };
}

export const nicheList: { slug: NicheSlug; nom: string; colorVar: string }[] = [
  { slug: "maroquinerie", nom: "Maroquinerie & petit cuir", colorVar: "var(--color-niche-maroquinerie)" },
  { slug: "bagagerie", nom: "Sacs & bagagerie", colorVar: "var(--color-niche-bagagerie)" },
  { slug: "jouets", nom: "Jouets & éveil", colorVar: "var(--color-niche-jouets)" },
  { slug: "cosmetique", nom: "Cosmétique & parfum", colorVar: "var(--color-niche-cosmetique)" },
  { slug: "textile", nom: "Textile & prêt-à-porter", colorVar: "var(--color-niche-textile)" },
  { slug: "bijouterie", nom: "Bijouterie", colorVar: "var(--color-niche-bijouterie)" },
  { slug: "mobilier", nom: "Mobilier & déco", colorVar: "var(--color-niche-mobilier)" },
  { slug: "electronique", nom: "Électronique & accessoires", colorVar: "var(--color-niche-electronique)" },
];

export const packs: Pack[] = [
  {
    ref: "MNF-01",
    slug: "maroquinerie-petit-cuir",
    niche: "maroquinerie",
    nom: "Maroquinerie & petit cuir",
    colorVar: "var(--color-niche-maroquinerie)",
    usines: 38,
    moq: 30,
    moqUnite: "pièces",
    prix: 89,
    pays: ["Italie", "Espagne", "Portugal", "Turquie", "Inde"],
    resume: "38 usines de maroquinerie et petit cuir, MOQ à partir de 30 pièces, 5 pays sourcés.",
  },
  {
    ref: "MNF-02",
    slug: "sacs-bagagerie",
    niche: "bagagerie",
    nom: "Sacs & bagagerie",
    colorVar: "var(--color-niche-bagagerie)",
    usines: 31,
    moq: 100,
    moqUnite: "pièces",
    prix: 69,
    pays: ["Chine", "Vietnam", "Inde", "Portugal"],
    resume: "31 usines de sacs et bagagerie, MOQ à partir de 100 pièces, 4 pays sourcés.",
  },
  {
    ref: "MNF-03",
    slug: "jouets-eveil",
    niche: "jouets",
    nom: "Jouets & éveil",
    colorVar: "var(--color-niche-jouets)",
    usines: 27,
    moq: 300,
    moqUnite: "pièces",
    prix: 49,
    pays: ["Chine", "Pologne", "Portugal"],
    resume: "27 usines de jouets et éveil, MOQ à partir de 300 pièces, conformité EN71 vérifiée.",
  },
  {
    ref: "MNF-04",
    slug: "cosmetique-parfum",
    niche: "cosmetique",
    nom: "Cosmétique & parfum",
    colorVar: "var(--color-niche-cosmetique)",
    usines: 34,
    moq: 500,
    moqUnite: "pièces",
    prix: 79,
    pays: ["France", "Italie", "Corée", "Espagne"],
    resume: "34 usines de cosmétique et parfum, MOQ à partir de 500 pièces, façonniers ISO 22716.",
  },
  {
    ref: "MNF-05",
    slug: "textile-pret-a-porter",
    niche: "textile",
    nom: "Textile & prêt-à-porter",
    colorVar: "var(--color-niche-textile)",
    usines: 42,
    moq: 50,
    moqUnite: "pièces",
    prix: 69,
    pays: ["Portugal", "Turquie", "Tunisie", "Inde"],
    resume: "42 usines de textile et prêt-à-porter, MOQ à partir de 50 pièces, petites séries acceptées.",
  },
  {
    ref: "MNF-06",
    slug: "bijouterie",
    niche: "bijouterie",
    nom: "Bijouterie",
    colorVar: "var(--color-niche-bijouterie)",
    usines: 29,
    moq: 50,
    moqUnite: "pièces",
    prix: 59,
    pays: ["Italie", "Inde", "Thaïlande", "Turquie"],
    resume: "29 usines de bijouterie, MOQ à partir de 50 pièces, dont plaqué or et argent 925.",
  },
  {
    ref: "MNF-07",
    slug: "mobilier-deco",
    niche: "mobilier",
    nom: "Mobilier & déco",
    colorVar: "var(--color-niche-mobilier)",
    usines: 26,
    moq: 20,
    moqUnite: "pièces",
    prix: 59,
    pays: ["Pologne", "Portugal", "Vietnam", "Indonésie"],
    resume: "26 usines de mobilier et déco, MOQ à partir de 20 pièces, bois certifié FSC disponible.",
  },
  {
    ref: "MNF-08",
    slug: "electronique-accessoires",
    niche: "electronique",
    nom: "Électronique & accessoires",
    colorVar: "var(--color-niche-electronique)",
    usines: 33,
    moq: 500,
    moqUnite: "pièces",
    prix: 59,
    pays: ["Chine", "Taïwan", "Corée"],
    resume: "33 usines d'électronique et accessoires, MOQ à partir de 500 pièces, CE et RoHS vérifiés.",
  },
  {
    ref: "MNF-00",
    slug: "lot-complet",
    niche: "complet",
    nom: "Lot complet — 8 carnets",
    colorVar: "var(--color-bleu)",
    usines: 260,
    moq: 20,
    moqUnite: "pièces",
    prix: 249,
    prixBarre: 532,
    pays: ["Italie", "Espagne", "Portugal", "Turquie", "Inde", "Chine", "Vietnam", "Pologne", "France", "Corée", "Tunisie", "Thaïlande", "Indonésie", "Taïwan"],
    resume: "Les 8 carnets de niche réunis — 260 usines, 14 pays, un seul achat.",
  },
];

export function getAllSlugs() {
  return packs.map((p) => p.slug);
}

export function getPackBySlug(slug: string) {
  return packs.find((p) => p.slug === slug);
}

interface FilterOptions {
  niche?: NicheSlug | "all";
  search?: string;
  maxPrice?: number;
}

export function filterPacks({ niche, search, maxPrice }: FilterOptions) {
  return packs.filter((p) => {
    if (p.niche === "complet") return true;
    if (niche && niche !== "all" && p.niche !== niche) return false;
    if (maxPrice && p.prix > maxPrice) return false;
    if (search) {
      const q = search.trim().toLowerCase();
      if (q && !p.nom.toLowerCase().includes(q) && !p.pays.some((c) => c.toLowerCase().includes(q))) {
        return false;
      }
    }
    return true;
  });
}

// TODO: remplacer par les vraies données
export const chiffresCles = {
  usinesContactees: 142,
  niches: 8,
  usinesEcartees: 61,
  tauxReponse72h: 96,
};

// TODO: remplacer par de vrais avis clients une fois les premiers packs vendus
export const avis: { citation: string; role: string; exemple: true }[] = [
  {
    citation: "j'ai gagné trois semaines de recherche à l'aveugle pour le prix d'un déjeuner d'affaires.",
    role: "fondatrice, marque de maroquinerie, 40 salariés",
    exemple: true,
  },
  {
    citation: "les MOQ annoncés étaient les vrais MOQ. pas de mauvaise surprise au premier appel.",
    role: "e-commerçant, accessoires bijouterie",
    exemple: true,
  },
  {
    citation: "la checklist d'inspection à elle seule valait le prix du pack.",
    role: "co-fondateur, marque DNVB textile",
    exemple: true,
  },
];

const detailBase: Record<string, Omit<PackDetailContent, keyof Pack>> = {
  maroquinerie: {
    description:
      "38 usines de maroquinerie et petit cuir sélectionnées en Italie, Espagne, Portugal, Turquie et Inde, capables de produire à partir de 30 pièces. Chaque fiche indique le MOQ réel négocié, le délai moyen constaté et les certifications tannerie vérifiées par appel.",
    blocs: {
      fichesUsine: [
        { nom: "Atelier Conceria Toscana", pays: "Italie", moq: "30 pièces", delai: "21 jours", certifs: ["LWG", "REACH"] },
        { nom: "Curtidos Del Sur", pays: "Espagne", moq: "50 pièces", delai: "24 jours", certifs: ["REACH", "ISO 9001"] },
        { nom: "Manufactura do Vale", pays: "Portugal", moq: "40 pièces", delai: "19 jours", certifs: ["LWG"] },
        { nom: "Anadolu Deri", pays: "Turquie", moq: "60 pièces", delai: "27 jours", certifs: ["REACH", "ISO 9001"] },
      ],
      moqNegocie: "30 pièces par référence (contre 100 à 150 pièces demandées en moyenne au premier contact non préparé).",
      prixIndicatifs: [
        { produit: "Petite maroquinerie (porte-cartes, porte-monnaie)", prixUnitaire: "8 à 14 €", quantite: "dès 30 pièces" },
        { produit: "Sac à main cuir pleine fleur", prixUnitaire: "32 à 58 €", quantite: "dès 50 pièces" },
        { produit: "Ceinture cuir", prixUnitaire: "6 à 11 €", quantite: "dès 100 pièces" },
      ],
      delais: [
        { etape: "Échantillon de confirmation", duree: "7 à 10 jours" },
        { etape: "Validation cuir et coloris", duree: "3 à 5 jours" },
        { etape: "Production série", duree: "14 à 21 jours" },
        { etape: "Contrôle qualité + transport EU", duree: "5 à 12 jours" },
      ],
      certifications: ["LWG (tannerie)", "REACH", "ISO 9001"],
      retoursMarques: [
        { citation: "le tannage était exactement celui promis à l'échantillon, sans écart de teinte à la série.", marque: "marque de petite maroquinerie, Paris", exemple: true },
        { citation: "négocier un MOQ à 30 au lieu de 150 a changé notre trésorerie de lancement.", marque: "créatrice indépendante, ceintures", exemple: true },
      ],
      modelesMessages: [
        {
          objet: "Demande de devis — petite maroquinerie, MOQ et délais",
          corps: "Bonjour, nous développons une gamme de petite maroquinerie en cuir pleine fleur. Pouvez-vous nous indiquer votre MOQ par référence, votre délai de production hors échantillon, et les certifications tannerie disponibles (LWG, REACH) ? Nous pouvons envoyer les fiches techniques et le cahier des charges dès votre retour.",
        },
        {
          objet: "Relance — échantillon petite maroquinerie",
          corps: "Bonjour, nous n'avons pas de retour depuis l'envoi de l'échantillon il y a 10 jours. Pouvez-vous confirmer la réception et nous donner une date de validation ? Nous restons disponibles pour ajuster le cahier des charges si besoin.",
        },
      ],
      grilleComparaison: [
        { critere: "Trouver des usines répondant sous 72h", soiMeme: "12 à 20h de recherche et relances", pack: "liste déjà triée, contacts vérifiés" },
        { critere: "Vérifier la certification tannerie", soiMeme: "appels un par un, langue variable", pack: "certifications déjà confirmées par appel" },
        { critere: "Négocier un MOQ raisonnable", soiMeme: "rapport de force défavorable en 1er contact", pack: "MOQ déjà négocié et documenté" },
        { critere: "Temps total avant premier devis fiable", soiMeme: "3 à 4 semaines", pack: "moins de 48h" },
      ],
      checklistInspection: [
        "Vérifier l'absence de craquelures et l'homogénéité de la teinture sur le cuir",
        "Contrôler la régularité des piqûres et l'alignement des coutures",
        "Tester la solidité des fermetures (zips, boucles, fermoirs)",
        "Vérifier l'odeur du cuir (absence de traitement chimique excessif)",
        "Contrôler le grammage et l'épaisseur annoncés contre l'échantillon validé",
        "Demander le certificat REACH à jour sur le lot livré, pas seulement sur l'échantillon",
      ],
    },
    extraitFicheUsine: {
      avantContact: "Atelier Conceria Toscana — Toscane, Italie. MOQ 30 pièces, délai moyen 21 jours, certifié LWG et REACH.",
      apresContact: "Interlocuteur direct côté export, ligne et adresse vérifiées par appel le mois dernier. Grille tarifaire dégressive et conditions de paiement détaillées dans la fiche PDF fournie après achat.",
    },
    ficheTechnique: { contactsParPack: 47, moqMedian: 30, delaiMoyen: "21 jours", usinesEcartees: 9 },
  },

  bagagerie: {
    description:
      "31 usines de sacs et bagagerie en Chine, Vietnam, Inde et au Portugal, retenues pour leur capacité à tenir un MOQ de 100 pièces sans dégrader la qualité de finition. Utile pour un premier lancement de collection de sacs sans immobiliser un stock disproportionné.",
    blocs: {
      fichesUsine: [
        { nom: "Guangdong Bag Works", pays: "Chine", moq: "100 pièces", delai: "30 jours", certifs: ["BSCI", "ISO 9001"] },
        { nom: "Song Hong Leather Goods", pays: "Vietnam", moq: "150 pièces", delai: "32 jours", certifs: ["BSCI"] },
        { nom: "Jaipur Bagworks", pays: "Inde", moq: "120 pièces", delai: "28 jours", certifs: ["REACH"] },
        { nom: "Oficina do Norte", pays: "Portugal", moq: "80 pièces", delai: "24 jours", certifs: ["ISO 9001", "REACH"] },
      ],
      moqNegocie: "100 pièces par référence et coloris (contre 300 à 500 demandées habituellement en Asie sur ce segment).",
      prixIndicatifs: [
        { produit: "Sac à dos toile enduite", prixUnitaire: "11 à 19 €", quantite: "dès 100 pièces" },
        { produit: "Sac cabas cuir PU", prixUnitaire: "9 à 15 €", quantite: "dès 150 pièces" },
        { produit: "Pochette de voyage", prixUnitaire: "4 à 7 €", quantite: "dès 200 pièces" },
      ],
      delais: [
        { etape: "Échantillon de confirmation", duree: "10 à 14 jours" },
        { etape: "Validation matières et quincaillerie", duree: "5 à 7 jours" },
        { etape: "Production série", duree: "25 à 32 jours" },
        { etape: "Contrôle qualité + transport maritime", duree: "20 à 35 jours" },
      ],
      certifications: ["BSCI", "ISO 9001", "REACH"],
      retoursMarques: [
        { citation: "on a évité deux usines qui n'auraient jamais tenu nos délais de saison.", marque: "marque de sacs, lancement 2025", exemple: true },
        { citation: "le Portugal n'était pas sur notre radar au départ, c'est devenu notre fournisseur principal.", marque: "e-commerçant bagagerie", exemple: true },
      ],
      modelesMessages: [
        {
          objet: "Demande de devis — sacs, MOQ 100 pièces",
          corps: "Bonjour, nous lançons une collection de sacs et cherchons un fournisseur capable de produire à partir de 100 pièces par référence. Pouvez-vous nous communiquer votre MOQ exact, votre délai de production et vos certifications (BSCI, ISO 9001) ? Nous joignons notre cahier des charges.",
        },
        {
          objet: "Relance — devis bagagerie",
          corps: "Bonjour, pourriez-vous nous indiquer où en est l'étude de notre demande envoyée la semaine dernière ? Nous avons un calendrier de lancement serré et souhaitons confirmer un partenaire sous 10 jours.",
        },
      ],
      grilleComparaison: [
        { critere: "Identifier des usines sous le MOQ standard du secteur", soiMeme: "recherche longue, beaucoup de refus", pack: "usines déjà triées sous 150 pièces" },
        { critere: "Comparer les délais de production réels", soiMeme: "estimations optimistes non vérifiées", pack: "délais moyens constatés, pas annoncés" },
        { critere: "Éviter les usines en sous-traitance non déclarée", soiMeme: "difficile à détecter à distance", pack: "usines visitées ou appelées directement" },
        { critere: "Temps total avant premier devis fiable", soiMeme: "3 à 5 semaines", pack: "moins de 48h" },
      ],
      checklistInspection: [
        "Vérifier les coutures aux points de tension (anses, fond du sac)",
        "Tester la résistance des fermetures éclair sur 50 cycles d'ouverture",
        "Contrôler l'alignement et la solidité de la quincaillerie (boucles, mousquetons)",
        "Vérifier l'étanchéité des matières enduites si annoncée",
        "Contrôler le poids réel du sac contre la fiche technique",
        "Demander un rapport BSCI à jour, pas seulement l'attestation d'inscription",
      ],
    },
    extraitFicheUsine: {
      avantContact: "Oficina do Norte — Porto, Portugal. MOQ 80 pièces, délai moyen 24 jours, certifiée ISO 9001 et REACH.",
      apresContact: "Contact export direct confirmé par appel, réactif en français. Tarifs dégressifs à partir de 300 pièces détaillés dans la fiche PDF fournie après achat.",
    },
    ficheTechnique: { contactsParPack: 38, moqMedian: 100, delaiMoyen: "28 jours", usinesEcartees: 7 },
  },

  jouets: {
    description:
      "27 usines de jouets et articles d'éveil en Chine, Pologne et au Portugal, toutes vérifiées sur la conformité EN71 avant intégration au pack. Pensé pour des marques qui ne peuvent pas se permettre une non-conformité sur un produit destiné aux enfants.",
    blocs: {
      fichesUsine: [
        { nom: "Ningbo Little Makers", pays: "Chine", moq: "300 pièces", delai: "35 jours", certifs: ["EN71", "CE", "ISO 8124"] },
        { nom: "Zabawki Karpaty", pays: "Pologne", moq: "250 pièces", delai: "30 jours", certifs: ["EN71", "CE"] },
        { nom: "Oficina Madeira Brincar", pays: "Portugal", moq: "200 pièces", delai: "28 jours", certifs: ["EN71", "CE", "FSC"] },
      ],
      moqNegocie: "300 pièces par référence (300 à 600 étant la norme du secteur sur du jouet en bois ou textile).",
      prixIndicatifs: [
        { produit: "Jouet en bois (empilable, tirette)", prixUnitaire: "3,50 à 6 €", quantite: "dès 300 pièces" },
        { produit: "Peluche premier âge", prixUnitaire: "4 à 7 €", quantite: "dès 500 pièces" },
        { produit: "Coffret éveil sensoriel", prixUnitaire: "6 à 10 €", quantite: "dès 300 pièces" },
      ],
      delais: [
        { etape: "Échantillon + tests labo EN71", duree: "14 à 18 jours" },
        { etape: "Validation matières et peintures", duree: "5 à 7 jours" },
        { etape: "Production série", duree: "28 à 35 jours" },
        { etape: "Contrôle qualité + transport", duree: "20 à 35 jours" },
      ],
      certifications: ["EN71 (parties 1, 2, 3)", "CE", "ISO 8124"],
      retoursMarques: [
        { citation: "les tests EN71 étaient déjà en cours quand on a contacté l'usine, ça nous a fait gagner un mois.", marque: "marque de jouets en bois, DNVB", exemple: true },
        { citation: "sans la checklist on serait passés à côté d'un défaut de peinture non conforme.", marque: "boutique de puériculture en ligne", exemple: true },
      ],
      modelesMessages: [
        {
          objet: "Demande de devis — jouets bois, conformité EN71",
          corps: "Bonjour, nous développons une gamme de jouets en bois pour enfants et recherchons un fournisseur avec certification EN71 à jour. Pouvez-vous nous transmettre vos derniers rapports de test, votre MOQ et votre délai de production ?",
        },
        {
          objet: "Relance — rapports de tests EN71",
          corps: "Bonjour, nous souhaiterions recevoir les rapports de tests EN71 les plus récents avant de valider la commande d'échantillon. Pouvez-vous nous les transmettre cette semaine ?",
        },
      ],
      grilleComparaison: [
        { critere: "Vérifier la conformité EN71 avant de contacter", soiMeme: "impossible à distance sans expertise", pack: "conformité déjà vérifiée par appel" },
        { critere: "Obtenir les rapports de tests labo", soiMeme: "usines réticentes à les fournir en 1er échange", pack: "rapports déjà demandés et référencés" },
        { critere: "Éviter les usines produisant hors norme jouet", soiMeme: "risque réel de non-conformité", pack: "usines déjà écartées si non conformes" },
        { critere: "Temps total avant premier devis fiable", soiMeme: "4 à 6 semaines", pack: "moins de 48h" },
      ],
      checklistInspection: [
        "Vérifier l'absence de petites pièces détachables sur les produits 0-3 ans",
        "Contrôler la solidité des fixations (yeux de peluche, roues, charnières)",
        "Demander le rapport de test de migration des peintures et vernis",
        "Vérifier l'absence d'arêtes ou de bavures sur le bois",
        "Contrôler l'étiquetage réglementaire (âge, avertissements, marquage CE)",
        "Tester la résistance du produit à une chute d'un mètre",
      ],
    },
    extraitFicheUsine: {
      avantContact: "Zabawki Karpaty — sud de la Pologne. MOQ 250 pièces, délai moyen 30 jours, certifiée EN71 et CE.",
      apresContact: "Contact qualité joignable en anglais, rapports de tests 2025 vérifiés par appel. Grille tarifaire par palier de quantité détaillée dans la fiche PDF fournie après achat.",
    },
    ficheTechnique: { contactsParPack: 33, moqMedian: 300, delaiMoyen: "35 jours", usinesEcartees: 6 },
  },

  cosmetique: {
    description:
      "34 façonniers cosmétique et parfum en France, Italie, Corée et Espagne, sélectionnés pour leur agrément ISO 22716 et leur capacité à produire de petites séries en marque propre. Couvre soins visage, corps et parfumerie.",
    blocs: {
      fichesUsine: [
        { nom: "Façonnier Provence Cosmétiques", pays: "France", moq: "500 pièces", delai: "26 jours", certifs: ["ISO 22716", "GMP"] },
        { nom: "Laboratorio Lombardia Beauty", pays: "Italie", moq: "600 pièces", delai: "24 jours", certifs: ["ISO 22716"] },
        { nom: "Seoul Beauty Lab", pays: "Corée", moq: "1000 pièces", delai: "35 jours", certifs: ["ISO 22716", "GMP"] },
        { nom: "Cosmética Levante", pays: "Espagne", moq: "500 pièces", delai: "22 jours", certifs: ["ISO 22716", "REACH"] },
      ],
      moqNegocie: "500 pièces par référence (1000 à 3000 étant courant en façonnage cosmétique classique).",
      prixIndicatifs: [
        { produit: "Crème visage 50 ml, formule stock", prixUnitaire: "3,80 à 6,50 €", quantite: "dès 500 pièces" },
        { produit: "Sérum 30 ml, formule sur-mesure", prixUnitaire: "5 à 9 €", quantite: "dès 1000 pièces" },
        { produit: "Savon solide surgras", prixUnitaire: "1,20 à 2,10 €", quantite: "dès 1000 pièces" },
      ],
      delais: [
        { etape: "Sélection formule (stock ou sur-mesure)", duree: "5 à 15 jours" },
        { etape: "Échantillon + stabilité accélérée", duree: "14 à 21 jours" },
        { etape: "Dossier information produit (DIP)", duree: "10 à 20 jours" },
        { etape: "Production série + conditionnement", duree: "20 à 30 jours" },
      ],
      certifications: ["ISO 22716", "GMP cosmétique", "Cosmos Organic (sur demande)"],
      retoursMarques: [
        { citation: "on ne savait pas qu'un DIP était obligatoire avant mise sur le marché, la fiche nous l'a évité en oubli coûteux.", marque: "marque de skincare indépendante", exemple: true },
        { citation: "le façonnier coréen tenait des délais qu'aucun comparateur en ligne n'affichait.", marque: "marque de parfumerie de niche", exemple: true },
      ],
      modelesMessages: [
        {
          objet: "Demande de devis — façonnage cosmétique, formule stock",
          corps: "Bonjour, nous recherchons un façonnier pour une gamme de soins visage en formule stock ou légèrement adaptée. Pouvez-vous nous indiquer votre MOQ par référence, votre délai de production et si vous prenez en charge la constitution du DIP ?",
        },
        {
          objet: "Relance — dossier stabilité produit",
          corps: "Bonjour, pourriez-vous nous transmettre le rapport de stabilité accélérée de l'échantillon envoyé le mois dernier ? Nous en avons besoin pour finaliser notre dossier réglementaire.",
        },
      ],
      grilleComparaison: [
        { critere: "Comprendre les obligations réglementaires (DIP, CPNP)", soiMeme: "recherche juridique dispersée", pack: "processus déjà expliqué par façonnier" },
        { critere: "Comparer formule stock vs sur-mesure", soiMeme: "arbitrage difficile sans expérience", pack: "options déjà détaillées par façonnier" },
        { critere: "Vérifier l'agrément ISO 22716", soiMeme: "vérification manuelle longue", pack: "agrément déjà confirmé" },
        { critere: "Temps total avant premier devis fiable", soiMeme: "4 à 6 semaines", pack: "moins de 48h" },
      ],
      checklistInspection: [
        "Vérifier la cohérence de la texture et de l'odeur entre échantillon et série",
        "Contrôler l'étanchéité du conditionnement (pompe, flacon, tube)",
        "Demander le rapport de stabilité accélérée et le test de compatibilité contenant/contenu",
        "Vérifier la lisibilité et la conformité de l'étiquetage réglementaire (INCI, PAO)",
        "Contrôler le lot et la date de fabrication sur le conditionnement",
        "Demander le Dossier d'Information Produit (DIP) avant mise en vente",
      ],
    },
    extraitFicheUsine: {
      avantContact: "Cosmética Levante — région de Valence, Espagne. MOQ 500 pièces, délai moyen 22 jours, certifiée ISO 22716 et REACH.",
      apresContact: "Responsable formulation joignable directement, accompagnement DIP confirmé par appel. Grille tarifaire par formule détaillée dans la fiche PDF fournie après achat.",
    },
    ficheTechnique: { contactsParPack: 42, moqMedian: 500, delaiMoyen: "24 jours", usinesEcartees: 8 },
  },

  textile: {
    description:
      "42 usines de textile et prêt-à-porter au Portugal, en Turquie, Tunisie et Inde, retenues pour leur capacité à produire de petites séries (dès 50 pièces) sans sacrifier la qualité de finition — le principal point de friction des jeunes marques textiles.",
    blocs: {
      fichesUsine: [
        { nom: "Confeção Vale do Ave", pays: "Portugal", moq: "50 pièces", delai: "22 jours", certifs: ["OEKO-TEX", "BSCI"] },
        { nom: "Ege Tekstil", pays: "Turquie", moq: "80 pièces", delai: "26 jours", certifs: ["OEKO-TEX", "ISO 9001"] },
        { nom: "Manufacture Sahel Textile", pays: "Tunisie", moq: "60 pièces", delai: "24 jours", certifs: ["BSCI"] },
        { nom: "Tirupur Knitworks", pays: "Inde", moq: "100 pièces", delai: "30 jours", certifs: ["OEKO-TEX", "GOTS (sur demande)"] },
      ],
      moqNegocie: "50 pièces par référence et coloris (150 à 300 étant la norme en confection classique).",
      prixIndicatifs: [
        { produit: "T-shirt coton biologique", prixUnitaire: "4,50 à 7 €", quantite: "dès 50 pièces" },
        { produit: "Sweat molleton", prixUnitaire: "9 à 14 €", quantite: "dès 80 pièces" },
        { produit: "Chemise coton", prixUnitaire: "8 à 13 €", quantite: "dès 100 pièces" },
      ],
      delais: [
        { etape: "Patronage + échantillon", duree: "10 à 15 jours" },
        { etape: "Validation matière et coloris", duree: "5 à 8 jours" },
        { etape: "Production série", duree: "18 à 26 jours" },
        { etape: "Contrôle qualité + transport EU", duree: "5 à 15 jours" },
      ],
      certifications: ["OEKO-TEX Standard 100", "GOTS (sur demande)", "BSCI"],
      retoursMarques: [
        { citation: "50 pièces au lieu de 300 nous a permis de tester trois coloris avant d'engager la série.", marque: "marque de prêt-à-porter, lancement", exemple: true },
        { citation: "le contrôle qualité recommandé a détecté un écart de grammage qu'on n'aurait pas vu à l'œil.", marque: "e-commerçant textile", exemple: true },
      ],
      modelesMessages: [
        {
          objet: "Demande de devis — confection textile, MOQ 50 pièces",
          corps: "Bonjour, nous lançons une collection de prêt-à-porter et recherchons un atelier de confection acceptant un MOQ de 50 pièces par référence. Pouvez-vous nous indiquer vos délais de production et vos certifications (OEKO-TEX, BSCI) ?",
        },
        {
          objet: "Relance — validation patronage",
          corps: "Bonjour, avez-vous pu valider le patronage envoyé la semaine dernière ? Nous souhaitons lancer l'échantillon dès que possible pour tenir notre calendrier de collection.",
        },
      ],
      grilleComparaison: [
        { critere: "Trouver un atelier sous 100 pièces de MOQ", soiMeme: "beaucoup de refus, recherche longue", pack: "ateliers déjà triés sous 100 pièces" },
        { critere: "Comparer les certifications matière", soiMeme: "vérification manuelle par usine", pack: "certifications déjà listées" },
        { critere: "Estimer un prix de revient réaliste", soiMeme: "devis dispersés, difficiles à comparer", pack: "grille de prix indicative déjà fournie" },
        { critere: "Temps total avant premier devis fiable", soiMeme: "3 à 5 semaines", pack: "moins de 48h" },
      ],
      checklistInspection: [
        "Vérifier le grammage du tissu contre la fiche technique validée",
        "Contrôler la solidité des coutures et des surpiqûres",
        "Vérifier l'alignement des motifs et rayures sur les coutures latérales",
        "Tester la tenue de la couleur au lavage (si annoncé)",
        "Contrôler les mesures du vêtement contre le tableau de gradation",
        "Vérifier l'étiquetage de composition et d'entretien",
      ],
    },
    extraitFicheUsine: {
      avantContact: "Confeção Vale do Ave — nord du Portugal. MOQ 50 pièces, délai moyen 22 jours, certifiée OEKO-TEX et BSCI.",
      apresContact: "Responsable production joignable en français, capacité de petite série confirmée par appel. Grille tarifaire par palier détaillée dans la fiche PDF fournie après achat.",
    },
    ficheTechnique: { contactsParPack: 52, moqMedian: 50, delaiMoyen: "26 jours", usinesEcartees: 10 },
  },

  bijouterie: {
    description:
      "29 usines de bijouterie en Italie, Inde, Thaïlande et Turquie, du plaqué or à l'argent 925, retenues pour leur capacité à produire dès 50 pièces avec un contrôle sérieux des alliages et du placage — un point de contrôle qualité souvent négligé sur ce segment.",
    blocs: {
      fichesUsine: [
        { nom: "Oreficeria Vicenza", pays: "Italie", moq: "50 pièces", delai: "18 jours", certifs: ["ISO 9001", "REACH"] },
        { nom: "Jaipur Silver Works", pays: "Inde", moq: "80 pièces", delai: "22 jours", certifs: ["REACH"] },
        { nom: "Bangkok Gem & Metal", pays: "Thaïlande", moq: "100 pièces", delai: "24 jours", certifs: ["ISO 9001"] },
        { nom: "İstanbul Takı Atölyesi", pays: "Turquie", moq: "60 pièces", delai: "20 jours", certifs: ["REACH"] },
      ],
      moqNegocie: "50 pièces par référence (150 à 200 étant courant sur du plaqué or standard).",
      prixIndicatifs: [
        { produit: "Collier plaqué or 18 carats", prixUnitaire: "4 à 8 €", quantite: "dès 50 pièces" },
        { produit: "Bague argent 925", prixUnitaire: "5 à 9 €", quantite: "dès 80 pièces" },
        { produit: "Boucles d'oreilles acier inoxydable", prixUnitaire: "2,50 à 5 €", quantite: "dès 100 pièces" },
      ],
      delais: [
        { etape: "Échantillon + contrôle alliage", duree: "8 à 12 jours" },
        { etape: "Validation placage et finition", duree: "3 à 5 jours" },
        { etape: "Production série", duree: "15 à 22 jours" },
        { etape: "Contrôle qualité + transport", duree: "5 à 15 jours" },
      ],
      certifications: ["REACH (teneur en nickel)", "ISO 9001"],
      retoursMarques: [
        { citation: "le test de teneur en nickel nous a évité un rappel de gamme potentiel.", marque: "marque de bijouterie fantaisie", exemple: true },
        { citation: "on a enfin pu comparer plaqué or 2 microns et 3 microns avec des vrais chiffres.", marque: "créatrice de bijoux en ligne", exemple: true },
      ],
      modelesMessages: [
        {
          objet: "Demande de devis — bijoux plaqué or, MOQ et épaisseur de placage",
          corps: "Bonjour, nous développons une gamme de bijoux en plaqué or et souhaiterions connaître votre MOQ par référence, l'épaisseur de placage proposée (en microns) et vos résultats de test REACH sur la teneur en nickel.",
        },
        {
          objet: "Relance — rapport de test nickel",
          corps: "Bonjour, pourriez-vous nous transmettre le rapport de test REACH sur la teneur en nickel de l'échantillon envoyé ? C'est indispensable avant validation de la commande.",
        },
      ],
      grilleComparaison: [
        { critere: "Comparer les épaisseurs de placage entre usines", soiMeme: "information rarement donnée spontanément", pack: "épaisseurs déjà demandées et comparées" },
        { critere: "Vérifier la conformité REACH nickel", soiMeme: "test à faire réaliser soi-même", pack: "résultats déjà vérifiés par appel" },
        { critere: "Trouver un MOQ compatible avec un test de collection", soiMeme: "MOQ standard souvent trop élevé", pack: "usines déjà triées sous 100 pièces" },
        { critere: "Temps total avant premier devis fiable", soiMeme: "3 à 4 semaines", pack: "moins de 48h" },
      ],
      checklistInspection: [
        "Vérifier l'épaisseur de placage annoncée par test ou certificat",
        "Contrôler la solidité des fermoirs et attaches après 50 manipulations",
        "Vérifier l'absence d'oxydation prématurée sur un échantillon exposé 48h à l'air libre",
        "Contrôler la régularité du polissage et l'absence de bavures de moulage",
        "Demander le rapport REACH sur la teneur en nickel du lot livré",
        "Vérifier la conformité du conditionnement individuel (anti-rayure, anti-oxydation)",
      ],
    },
    extraitFicheUsine: {
      avantContact: "İstanbul Takı Atölyesi — Istanbul, Turquie. MOQ 60 pièces, délai moyen 20 jours, conforme REACH.",
      apresContact: "Contact atelier joignable en anglais, test nickel du dernier lot vérifié par appel. Grille tarifaire par épaisseur de placage détaillée dans la fiche PDF fournie après achat.",
    },
    ficheTechnique: { contactsParPack: 36, moqMedian: 50, delaiMoyen: "19 jours", usinesEcartees: 7 },
  },

  mobilier: {
    description:
      "26 usines de mobilier et déco en Pologne, au Portugal, Vietnam et en Indonésie, du bois certifié FSC au mobilier léger, retenues pour tenir un MOQ de 20 pièces — un format rare sur ce segment habituellement pensé pour de gros volumes.",
    blocs: {
      fichesUsine: [
        { nom: "Stolarnia Mazury", pays: "Pologne", moq: "20 pièces", delai: "28 jours", certifs: ["FSC", "ISO 9001"] },
        { nom: "Marcenaria Serra", pays: "Portugal", moq: "25 pièces", delai: "26 jours", certifs: ["FSC"] },
        { nom: "Hanoi Woodcraft", pays: "Vietnam", moq: "50 pièces", delai: "35 jours", certifs: ["FSC", "ISO 9001"] },
        { nom: "Java Furniture Works", pays: "Indonésie", moq: "40 pièces", delai: "38 jours", certifs: ["FSC"] },
      ],
      moqNegocie: "20 pièces par référence (100 à 300 étant la norme en mobilier de série).",
      prixIndicatifs: [
        { produit: "Chaise bois massif", prixUnitaire: "22 à 38 €", quantite: "dès 20 pièces" },
        { produit: "Étagère murale", prixUnitaire: "9 à 16 €", quantite: "dès 40 pièces" },
        { produit: "Objet déco (vase, bougeoir bois)", prixUnitaire: "3 à 6 €", quantite: "dès 50 pièces" },
      ],
      delais: [
        { etape: "Échantillon + validation essence de bois", duree: "10 à 15 jours" },
        { etape: "Validation finition et assemblage", duree: "5 à 8 jours" },
        { etape: "Production série", duree: "22 à 38 jours" },
        { etape: "Contrôle qualité + transport (fret groupé conseillé)", duree: "20 à 45 jours" },
      ],
      certifications: ["FSC (bois)", "EN 12520", "ISO 9001"],
      retoursMarques: [
        { citation: "on a pu tester une petite série avant d'investir dans un container complet.", marque: "marque de mobilier déco, DNVB", exemple: true },
        { citation: "le certificat FSC était réel et traçable, pas juste un logo sur le site.", marque: "boutique déco en ligne", exemple: true },
      ],
      modelesMessages: [
        {
          objet: "Demande de devis — mobilier bois, MOQ 20 pièces",
          corps: "Bonjour, nous développons une gamme de mobilier léger en bois et recherchons un atelier acceptant un MOQ de 20 pièces par référence. Pouvez-vous nous indiquer votre délai de production, l'essence de bois disponible et si votre bois est certifié FSC ?",
        },
        {
          objet: "Relance — certificat FSC et essence de bois",
          corps: "Bonjour, pourriez-vous nous transmettre votre certificat FSC à jour ainsi qu'un échantillon de l'essence de bois proposée avant que nous validions la commande ?",
        },
      ],
      grilleComparaison: [
        { critere: "Trouver un atelier sous 50 pièces de MOQ", soiMeme: "la plupart exigent 100 pièces ou plus", pack: "ateliers déjà triés sous 50 pièces" },
        { critere: "Vérifier la traçabilité FSC réelle", soiMeme: "difficile à vérifier à distance", pack: "certificats déjà vérifiés par appel" },
        { critere: "Estimer le coût de transport (volumineux)", soiMeme: "souvent découvert trop tard", pack: "fret groupé conseillé dans la fiche" },
        { critere: "Temps total avant premier devis fiable", soiMeme: "4 à 6 semaines", pack: "moins de 48h" },
      ],
      checklistInspection: [
        "Vérifier la stabilité et l'absence de jeu sur les assemblages",
        "Contrôler l'humidité résiduelle du bois (risque de fissure au transport)",
        "Vérifier la régularité du ponçage et de la finition (vernis, huile, cire)",
        "Tester la charge maximale annoncée sur un échantillon",
        "Vérifier le certificat FSC correspond bien au lot livré",
        "Contrôler l'emballage anti-choc pour le transport longue distance",
      ],
    },
    extraitFicheUsine: {
      avantContact: "Stolarnia Mazury — nord-est de la Pologne. MOQ 20 pièces, délai moyen 28 jours, certifiée FSC et ISO 9001.",
      apresContact: "Contact atelier joignable en anglais, traçabilité FSC vérifiée par appel avec numéro de certificat. Grille tarifaire par essence de bois détaillée dans la fiche PDF fournie après achat.",
    },
    ficheTechnique: { contactsParPack: 32, moqMedian: 20, delaiMoyen: "32 jours", usinesEcartees: 6 },
  },

  electronique: {
    description:
      "33 usines d'électronique et accessoires en Chine, à Taïwan et en Corée, toutes vérifiées CE et RoHS avant intégration au pack. Pensé pour des marques qui veulent éviter une non-conformité coûteuse à l'entrée sur le marché européen.",
    blocs: {
      fichesUsine: [
        { nom: "Shenzhen Accessory Tech", pays: "Chine", moq: "500 pièces", delai: "28 jours", certifs: ["CE", "RoHS"] },
        { nom: "Dongguan Smart Parts", pays: "Chine", moq: "1000 pièces", delai: "32 jours", certifs: ["CE", "RoHS", "FCC"] },
        { nom: "Taipei Circuit Works", pays: "Taïwan", moq: "500 pièces", delai: "26 jours", certifs: ["CE", "RoHS"] },
        { nom: "Incheon Electronics Lab", pays: "Corée", moq: "800 pièces", delai: "30 jours", certifs: ["CE", "RoHS"] },
      ],
      moqNegocie: "500 pièces par référence (1000 à 2000 étant la norme sur ce segment).",
      prixIndicatifs: [
        { produit: "Écouteurs sans fil, chipset standard", prixUnitaire: "6 à 11 €", quantite: "dès 500 pièces" },
        { produit: "Chargeur rapide USB-C 30W", prixUnitaire: "3,50 à 6 €", quantite: "dès 1000 pièces" },
        { produit: "Enceinte portable Bluetooth", prixUnitaire: "8 à 14 €", quantite: "dès 500 pièces" },
      ],
      delais: [
        { etape: "Échantillon + tests de conformité", duree: "12 à 18 jours" },
        { etape: "Validation firmware / branding", duree: "5 à 10 jours" },
        { etape: "Production série", duree: "22 à 32 jours" },
        { etape: "Contrôle qualité + transport", duree: "20 à 35 jours" },
      ],
      certifications: ["CE", "RoHS", "FCC (export États-Unis)"],
      retoursMarques: [
        { citation: "le certificat CE fourni au premier échange était un faux grossier — sans vérification, on l'aurait découvert à la douane.", marque: "marque d'accessoires tech, DNVB", exemple: true },
        { citation: "on a pu comparer trois chipsets Bluetooth avant de choisir, avec des chiffres réels.", marque: "e-commerçant électronique", exemple: true },
      ],
      modelesMessages: [
        {
          objet: "Demande de devis — accessoires électroniques, conformité CE/RoHS",
          corps: "Bonjour, nous recherchons un fournisseur pour une gamme d'accessoires électroniques destinés au marché européen. Pouvez-vous nous transmettre vos certificats CE et RoHS à jour, votre MOQ et votre délai de production ?",
        },
        {
          objet: "Relance — vérification certificat CE",
          corps: "Bonjour, pourriez-vous nous transmettre le rapport de test CE original (avec numéro de laboratoire) plutôt que l'attestation seule ? Nous devons le vérifier avant de valider la commande.",
        },
      ],
      grilleComparaison: [
        { critere: "Vérifier l'authenticité d'un certificat CE", soiMeme: "quasi impossible sans expertise", pack: "certificats vérifiés auprès du laboratoire" },
        { critere: "Comparer les chipsets et composants proposés", soiMeme: "informations techniques dispersées", pack: "comparatif déjà réalisé par produit" },
        { critere: "Anticiper la conformité RoHS", soiMeme: "souvent découvert après commande", pack: "conformité vérifiée avant intégration au pack" },
        { critere: "Temps total avant premier devis fiable", soiMeme: "4 à 6 semaines", pack: "moins de 48h" },
      ],
      checklistInspection: [
        "Vérifier le numéro de rapport de test CE auprès du laboratoire émetteur",
        "Tester l'autonomie réelle contre l'autonomie annoncée",
        "Contrôler la stabilité de la connexion Bluetooth/Wi-Fi sur un échantillon",
        "Vérifier la conformité RoHS des composants internes (pas seulement du boîtier)",
        "Contrôler la résistance du boîtier à une chute d'un mètre",
        "Vérifier la présence du marquage CE et RoHS sur le produit et l'emballage",
      ],
    },
    extraitFicheUsine: {
      avantContact: "Taipei Circuit Works — Taïwan. MOQ 500 pièces, délai moyen 26 jours, certifiée CE et RoHS.",
      apresContact: "Contact qualité joignable en anglais, numéro de rapport de test CE vérifié auprès du laboratoire émetteur. Grille tarifaire par volume détaillée dans la fiche PDF fournie après achat.",
    },
    ficheTechnique: { contactsParPack: 45, moqMedian: 500, delaiMoyen: "30 jours", usinesEcartees: 8 },
  },
};

function buildComplet(): Omit<PackDetailContent, keyof Pack> {
  return {
    description:
      "Les 8 carnets de niche réunis en un seul achat : 260 usines, 14 pays, la totalité du travail de vérification déjà fait. Le format recommandé pour une marque multi-catégories ou une agence qui sourcerait pour plusieurs clients.",
    blocs: {
      fichesUsine: [
        { nom: "Accès aux 260 fiches usine des 8 carnets", pays: "14 pays", moq: "dès 20 pièces selon niche", delai: "18 à 38 jours selon niche", certifs: ["Certifications vérifiées par niche"] },
      ],
      moqNegocie: "MOQ propre à chaque niche, de 20 à 500 pièces selon le secteur — voir le détail dans chacun des 8 carnets.",
      prixIndicatifs: [
        { produit: "Accès à la totalité des grilles de prix indicatifs des 8 carnets", prixUnitaire: "voir détail par carnet", quantite: "toutes quantités MOQ" },
      ],
      delais: [
        { etape: "Délais spécifiques à chacune des 8 niches", duree: "18 à 38 jours selon niche" },
      ],
      certifications: ["LWG", "OEKO-TEX", "EN71", "ISO 22716", "REACH", "FSC", "CE", "RoHS", "BSCI", "ISO 9001"],
      retoursMarques: [
        { citation: "on sourçait pour plusieurs clients dans des secteurs différents, le lot complet nous a évité d'acheter huit fois.", marque: "agence de sourcing indépendante", exemple: true },
        { citation: "même en ne lançant qu'une seule niche au départ, avoir les sept autres en réserve a servi plus vite que prévu.", marque: "fondatrice multi-marques", exemple: true },
      ],
      modelesMessages: [
        {
          objet: "Modèles de messages fournis dans chacun des 8 carnets",
          corps: "Chaque carnet contient ses propres modèles de prise de contact et de relance, adaptés au vocabulaire et aux exigences réglementaires de sa niche.",
        },
      ],
      grilleComparaison: [
        { critere: "Acheter les 8 carnets séparément", soiMeme: "532 € au total", pack: "249 € en lot complet" },
        { critere: "Temps de recherche pour 8 niches", soiMeme: "plusieurs mois à temps partiel", pack: "accès immédiat aux 260 fiches" },
        { critere: "Cohérence méthodologique entre niches", soiMeme: "dépend de 8 recherches indépendantes", pack: "même méthode de vérification partout" },
      ],
      checklistInspection: [
        "Chaque carnet contient sa propre checklist d'inspection adaptée à sa niche",
        "Voir le détail dans la fiche de chacun des 8 packs individuels",
      ],
    },
    extraitFicheUsine: {
      avantContact: "Accès à l'intégralité des 260 fiches usine réparties sur les 8 niches, 14 pays.",
      apresContact: "Chaque fiche individuelle suit le même format que dans les carnets par niche : contact vérifié par appel, grille tarifaire et conditions détaillées dans le PDF fourni après achat.",
    },
    ficheTechnique: { contactsParPack: 325, moqMedian: 20, delaiMoyen: "18 à 38 jours selon niche", usinesEcartees: 61 },
  };
}

const packDetails: Record<string, PackDetailContent> = Object.fromEntries(
  packs.map((pack) => {
    const extra = pack.niche === "complet" ? buildComplet() : detailBase[pack.niche];
    return [pack.slug, { ...pack, ...extra }];
  })
);

export function getPackDetailBySlug(slug: string): PackDetailContent | undefined {
  return packDetails[slug];
}
