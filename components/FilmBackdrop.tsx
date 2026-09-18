/**
 * Fond de projection — la couche la plus basse du site.
 *
 * Parti pris : le site est un film projeté, et la surface de projection est
 * du matcha fouetté. On ne "décore" pas le fond, on reconstitue une salle :
 * la matière du thé qui tourne encore, le faisceau unique du projecteur, la
 * poussière qui ne brille QUE dans ce faisceau, la rayure de pellicule, et
 * le tremblement de la fenêtre du projecteur.
 *
 * Choix techniques (voir styles/tokens.css) :
 * - Server Component : 0 octet de JS, rien à hydrater, fonctionne sans JS.
 * - Uniquement transform/opacity → composité GPU, aucun repaint.
 * - Le bruit est rendu une fois dans le SVG ; on n'anime jamais le filtre
 *   lui-même (ce qui recalculerait le bruit à chaque image).
 * - Valeurs écrites à la main et volontairement irrégulières : une
 *   distribution régulière se voit immédiatement.
 * - Durées premières entre elles → la boucle ne se referme jamais à l'œil.
 */

// left %, taille px, durée s, retard s, dérive horizontale px, hauteur de montée px
const MOTES: [number, number, number, number, number, number][] = [
  [6, 2, 34, 0, 26, 420],
  [11, 1, 47, 9, -18, 560],
  [17, 2, 29, 4, 34, 380],
  [21, 3, 52, 17, -12, 610],
  [27, 1, 38, 2, 22, 460],
  [31, 2, 61, 24, -30, 700],
  [36, 1, 33, 11, 16, 400],
  [42, 2, 44, 6, -24, 520],
  [46, 1, 56, 29, 12, 640],
  [51, 3, 31, 14, 28, 360],
  [55, 1, 49, 3, -20, 580],
  [60, 2, 37, 21, 18, 440],
  [64, 1, 58, 8, -14, 660],
  [69, 2, 42, 26, 32, 500],
  [73, 1, 35, 12, -26, 410],
  [78, 3, 54, 1, 20, 620],
  [82, 1, 39, 19, -16, 470],
  [86, 2, 63, 7, 24, 720],
  [90, 1, 32, 23, -22, 370],
  [94, 2, 46, 15, 14, 540],
];

// left %, durée s, retard s
const SCRATCHES: [number, number, number][] = [
  [23, 23, 0],
  [67, 31, 11],
  [88, 41, 26],
];

export function FilmBackdrop() {
  return (
    <div aria-hidden className="film-backdrop">
      {/* 1. La matière : deux nappes de matcha en sens contraire */}
      <div className="backdrop-liquid backdrop-liquid--a" />
      <div className="backdrop-liquid backdrop-liquid--b" />

      {/* 2. Le faisceau du projecteur */}
      <div className="backdrop-beam" />

      {/* 3. La poussière, masquée hors du faisceau */}
      <div className="backdrop-motes">
        {MOTES.map(([left, size, duration, delay, driftX, rise], i) => (
          <span
            key={i}
            className="backdrop-mote"
            style={{
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDuration: `${duration}s`,
              animationDelay: `-${delay}s`,
              ["--mote-x" as string]: `${driftX}px`,
              ["--mote-rise" as string]: `${rise}px`,
            }}
          />
        ))}
      </div>

      {/* 4. Rayures dans la fenêtre du projecteur */}
      {SCRATCHES.map(([left, duration, delay], i) => (
        <span
          key={i}
          className="backdrop-scratch"
          style={{
            left: `${left}%`,
            animationDuration: `${duration}s`,
            animationDelay: `-${delay}s`,
          }}
        />
      ))}
    </div>
  );
}
