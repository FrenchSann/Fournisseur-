import { Archivo, Instrument_Serif, IBM_Plex_Mono } from "next/font/google";

// Archivo est une police variable ; on demande explicitement à next/font de
// conserver l'axe de largeur (wdth) dans le fichier woff2 servi — par défaut
// next/font/google élague les axes non déclarés. La valeur (400 texte
// courant / 900-125 titres) est ensuite pilotée en CSS via
// font-variation-settings, voir styles/tokens.css (.text-display etc).
export const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo-loader",
  axes: ["wdth"],
  display: "swap",
});

// Une seule graisse/style utilisés dans tout le système : italique, jamais
// deux titres serif italiques dans un même écran (règle appliquée au niveau
// des composants, pas de la police).
export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument-serif-loader",
  display: "swap",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono-loader",
  display: "swap",
});
