import Link from "next/link";

const CREDITS: { role: string; entries: { label: string; href: string }[] }[] = [
  {
    role: "Au catalogue",
    entries: [
      { label: "Les huit carnets", href: "/catalogue" },
      { label: "Le lot complet", href: "/catalogue/lot-complet" },
    ],
  },
  {
    role: "À la méthode",
    entries: [
      { label: "Comment on vérifie", href: "/#scene-01" },
      { label: "Trois étapes", href: "/#scene-03" },
      { label: "Questions fréquentes", href: "/#scene-06" },
    ],
  },
  {
    role: "Production",
    entries: [
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "Conditions de vente", href: "/cgv" },
      { label: "Contact", href: "mailto:contact@manufacture.example" },
    ],
  },
];

/**
 * Générique de fin — les liens du site présentés comme un carton de
 * crédits : rôle à gauche, intervenants à droite. La marque ferme le film
 * comme un logo de studio, tronquée par le cadre.
 */
export function Footer() {
  return (
    <footer className="rule-t-structure vignette relative overflow-hidden">
      <div className="relative z-[2] mx-auto max-w-[1400px] px-s5 pt-s9 xl:px-s7">
        <div className="rule-b-secondaire flex flex-wrap items-baseline justify-between gap-s3 pb-s3">
          <p className="text-slug">Générique de fin</p>
          <p className="text-timecode">00:12:48:00</p>
        </div>

        <div className="mt-s9 flex flex-col gap-s7">
          {CREDITS.map((credit) => (
            <div
              key={credit.role}
              className="grid grid-cols-1 gap-s3 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-s7"
            >
              <p className="text-slug md:pt-s1 md:text-right">{credit.role}</p>
              <ul className="flex flex-col gap-s2">
                {credit.entries.map((entry) => (
                  <li key={entry.label}>
                    <Link
                      href={entry.href}
                      className="text-body-tight hover:text-matcha transition-colors duration-[var(--d-fast)]"
                    >
                      {entry.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-s10 overflow-hidden" aria-hidden>
          <p
            className="text-creme font-archivo leading-none whitespace-nowrap uppercase"
            style={{
              fontSize: "clamp(72px, 16vw, 260px)",
              fontWeight: 900,
              fontVariationSettings: "'wdth' 125",
              letterSpacing: "-0.035em",
            }}
          >
            Manufacture
          </p>
        </div>

        <div className="rule-t-secondaire text-slug flex flex-col gap-s3 py-s5 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Manufacture — tous droits réservés</span>
          <span className="text-timecode">Fin de bobine</span>
        </div>
      </div>
    </footer>
  );
}
