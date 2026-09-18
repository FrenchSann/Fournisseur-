# Manufacture

Site vitrine e-commerce pour Manufacture, qui vend des packs de listes de fournisseurs d'usines vérifiés, organisés par niche. Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion.

## Démarrer

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # build de production (vérifie aussi les types)
npm run start   # sert le build de production
```

## Structure

```
/app
  layout.tsx        racine — polices, header/footer, curseur custom
  template.tsx       transition de page (volet d'encre), remonté à chaque navigation
  page.tsx            page d'accueil (toutes les sections)
  fonts.ts             chargement Archivo / Instrument Serif / IBM Plex Mono
  /catalogue
    page.tsx            catalogue (toolbar + grille)
    /[slug]/page.tsx     fiche produit (generateStaticParams sur les 9 packs)
    /[slug]/not-found.tsx
/components           un composant par responsabilité (voir liste ci-dessous)
/lib
  packs.ts              données du catalogue (9 packs, types, contenu détail)
  animations.ts          constantes de timing + variants Framer Motion partagés
  utils.ts                cn(), formatPrice(), formatNumber()
/styles
  tokens.css              source de vérité du système visuel (couleurs, espacement,
                           typographie, ombres, traits, durées/easings, grain, marquee)
/public
  grain.svg               texture de grain (overlay, mix-blend-mode: multiply)
```

## Direction artistique — "le site comme un film"

Le site se lit comme un film en six scènes : `ColdOpen` (plan d'ouverture letterboxé), `Scene` (unité de base — numéro, slug line de scénario, timecode, chiffre géant en filigrane qui dérive au scroll), `TitleCard` (intertitre plein cadre entre deux actes), et un `Footer` en générique de fin. L'en-tête affiche une tête de lecture : la position de scroll y devient un timecode.

Les primitives visuelles correspondantes vivent dans `styles/tokens.css` : `.letterbox` / `.letterbox-safe` (barres cinémascope + zone sûre), `.vignette`, `.light-pool`, `.film-perfs`, `.text-slug`, `.text-timecode`, `.text-title-card`, `.text-scene-number`, `.enso-moon`.

Deux règles d'ordre à ne pas casser :

- **`.vignette::after` est en `z-index: 1`, le contenu en `z-2`.** Une vignette qui passe au-dessus du texte fait tomber le contraste sous le seuil AA.
- **`.text-slug` impose sa couleur (fumée).** Sur un fond clair (bandeau inversé), la surcharger explicitement, sinon le contraste tombe à 2,6:1.

## Système visuel

> ⚠️ **Ne pas retirer `--spacing: 4px` du bloc `@theme`.** Le système remet à zéro l'échelle Tailwind par défaut (`--spacing-*: initial`) pour n'autoriser que les 11 paliers `s1`…`s11`. Mais cette remise à zéro efface aussi la variable de base `--spacing`, dont dérivent des utilitaires courants (`inset-0`, `top-0`, `p-0`…) : sans elle, ils produisent un `calc()` invalide et sont **silencieusement supprimés**, ce qui fait tomber à 0×0 tous les calques décoratifs en position absolue. Fixée à 4px, toute valeur numérique reste sur la grille de 4 du système.

Tout token brut (couleur, espacement, rayon, ombre, durée, breakpoint) vit dans `styles/tokens.css`, consommé par Tailwind via le bloc `@theme` (v4, CSS-first — les palettes/espacements par défaut de Tailwind sont explicitement désactivés via `--color-*: initial` etc.). Les durées/easings Framer Motion sont redéclarées en constantes TypeScript dans `lib/animations.ts` — **si les timings changent dans `tokens.css`, les reporter aussi dans `animations.ts`**, les deux fichiers ne partagent pas de source commune (Framer Motion attend des nombres JS, pas des `var()` CSS).

## Données d'exemple — à remplacer

Toutes les données métier vivent dans `lib/packs.ts` et sont marquées par des commentaires `// TODO: remplacer par les vraies données` :

- `packs` — les 9 packs (référence, niche, usines, MOQ, prix, pays)
- `packDetails` (généré depuis `detailBase` / `buildComplet`) — fiches usine, prix indicatifs, délais, certifications, retours de marques, modèles de messages, grille de comparaison, checklist d'inspection
- `chiffresCles` — chiffres agrégés affichés en preuve sociale (usines contactées, usines écartées, taux de réponse)
- `avis` — témoignages (chaque entrée porte un champ `exemple: true`, tout comme `retoursMarques` dans les fiches détail)

## Brancher un CMS headless

Le site est actuellement statique (`generateStaticParams` pré-rend les 9 pages produit au build). Pour brancher un CMS headless (Sanity, Contentful, Storyblok, ou un simple back-office maison exposant une API) :

1. **Remplacer `lib/packs.ts` par des appels réseau.** Les fonctions exportées (`getAllSlugs`, `getPackBySlug`, `getPackDetailBySlug`, `filterPacks`, `chiffresCles`, `avis`) sont le seul point de contact entre les données et les composants — aucun composant n'importe directement le tableau `packs`. Il suffit de transformer ces fonctions en fonctions `async` qui interrogent le CMS et retournent la même forme de données (types `Pack` / `PackDetailContent` déjà définis dans ce fichier — les garder comme contrat, que la source soit un tableau en dur ou une API).
2. **`generateStaticParams`** (`app/catalogue/[slug]/page.tsx`) doit alors `await` l'appel réseau qui liste les slugs.
3. **Revalidation** : pour un contenu qui change sans nouveau build, ajouter `export const revalidate = 3600` (ISR) sur les pages concernées, ou passer les fetchs du CMS par `fetch(url, { next: { revalidate: 3600 } })` si le CMS est interrogé via HTTP.
4. **Webhooks** : si le CMS supporte les webhooks de publication, préférer `revalidatePath`/`revalidateTag` (route handler dédiée, ex. `app/api/revalidate/route.ts`) à un ISR à intervalle fixe, pour une mise à jour immédiate à la publication.
5. **Champs `exemple: true`** (`avis`, `retoursMarques`) : une fois de vrais retours clients disponibles, supprimer ce champ (ou le piloter depuis le CMS) et retirer la mention "— exemple" dans `Testimonials.tsx` / `PackDetail.tsx`.

## Contraintes transverses (déjà vérifiées)

- Fonctionne sans JavaScript : contenu visible en SSR, filtres catalogue via formulaire `GET` natif, FAQ en `<details>/<summary>`, curseur custom jamais posé statiquement.
- `prefers-reduced-motion: reduce` : toutes les durées retombent à 0 (`tokens.css`), le volet de transition de page et le curseur custom se désactivent entièrement.
- Focus clavier visible partout (`:focus-visible`, contour bleu 2px), navigation FAQ au clavier native.
- Un seul `<h1>` par page, hiérarchie de titres cohérente.
