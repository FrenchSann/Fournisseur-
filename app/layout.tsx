import type { Metadata } from "next";
import { archivo, instrumentSerif, plexMono } from "./fonts";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { FilmBackdrop } from "@/components/FilmBackdrop";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Manufacture — listes de fournisseurs d'usines vérifiés",
    template: "%s · Manufacture",
  },
  description:
    "Des packs de listes de fournisseurs d'usines vérifiés par niche : contacts, MOQ, délais, prix indicatifs et retours d'expérience. Le travail de sourcing déjà fait.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${archivo.variable} ${instrumentSerif.variable} ${plexMono.variable} h-full`}
    >
      {/* Pas de fond sur <body> : il masquerait le calque de projection,
          qui est en z-index négatif (la couleur de base est portée par
          <html>, voir globals.css). */}
      <body className="flex min-h-full flex-col text-creme antialiased">
        {/* Sans JS, les lignes de RevealText restent visibles : Framer Motion
            applique son état "hidden" (translateY 112%) via un style inline
            uniquement lorsque JS s'exécute ; cette règle neutralise ce style
            pour les navigateurs sans JavaScript. */}
        <noscript>
          <style>{`.reveal-line-inner{transform:none !important;}`}</style>
        </noscript>

        <FilmBackdrop />
        <div aria-hidden className="grain-layer" />
        <CustomCursor />

        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
