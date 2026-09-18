import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { GridLines } from "@/components/GridLines";
import { RevealText } from "@/components/RevealText";
import { formatNumber, formatPrice } from "@/lib/utils";
import { nicheList, type PackDetailContent } from "@/lib/packs";

interface PackDetailProps {
  pack: PackDetailContent;
}

/** En-tête de plan — numéro de séquence à gauche, titre au centre du cadre. */
function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-s7">
      <div className="rule-b-secondaire flex items-baseline justify-between gap-s3 pb-s3">
        <p className="text-slug">Plan {index}</p>
        <p className="text-timecode">00:{index}:00:00</p>
      </div>
      <h2 className="text-section-title mt-s5">{title}</h2>
    </div>
  );
}

export function PackDetail({ pack }: PackDetailProps) {
  const niche = nicheList.find((n) => n.slug === pack.niche);
  const mailSubject = encodeURIComponent(`Achat — ${pack.ref} ${pack.nom}`);

  return (
    <div>
      {/* Filet supérieur coloré de la page détail (couleur de niche) */}
      <div aria-hidden className="h-[4px] w-full" style={{ backgroundColor: pack.colorVar }} />

      <GridLines className="vignette light-pool relative overflow-hidden py-s9">
        <div className="relative z-[2] mx-auto max-w-[1400px] px-s5 xl:px-s7">
          <div className="rule-b-secondaire mb-s8 flex flex-wrap items-baseline justify-between gap-s3 pb-s3">
            <p className="text-slug">
              Séquence {pack.ref} <span className="mx-s3 opacity-40">/</span> {niche ? niche.nom : "Lot complet"}
            </p>
            <p className="text-timecode">{pack.pays.length} pays au générique</p>
          </div>

          <div className="grid grid-cols-1 gap-s8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-s3">
                {niche && <Badge label={niche.nom} colorVar={niche.colorVar} />}
                <span className="text-slug">{pack.usines} usines au casting</span>
              </div>
              {/* Échelle "section" et non "carton-titre" : les noms de packs
                  sont longs et variables — au-delà, le mot le plus long
                  déborde la colonne et se fait rogner par le masque. */}
              <RevealText as="h1" className="text-section-title mt-s6" lines={[pack.nom]} />
              <p className="text-intro mt-s6">{pack.description}</p>
            </div>

            <aside className="lg:col-span-4">
              <div className="rule-structure sticky top-[96px] flex flex-col gap-s5 p-s6">
                <div>
                  <p className="text-label text-fumee">Prix indicatif</p>
                  <p className="text-price-lg mt-s2">
                    {pack.prixBarre && (
                      <span className="text-body-tight mr-s3 text-fumee line-through">
                        {formatPrice(pack.prixBarre)}
                      </span>
                    )}
                    {formatPrice(pack.prix)}
                  </p>
                </div>
                <dl className="rule-t-secondaire grid grid-cols-2 gap-s4 pt-s5">
                  <div>
                    <dt className="text-label text-fumee">Usines</dt>
                    <dd className="text-data mt-s1">{formatNumber(pack.usines)}</dd>
                  </div>
                  <div>
                    <dt className="text-label text-fumee">MOQ dès</dt>
                    <dd className="text-data mt-s1">
                      {formatNumber(pack.moq)} {pack.moqUnite}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-label text-fumee">Contacts</dt>
                    <dd className="text-data mt-s1">{formatNumber(pack.ficheTechnique.contactsParPack)}</dd>
                  </div>
                  <div>
                    <dt className="text-label text-fumee">Délai moyen</dt>
                    <dd className="text-data mt-s1">{pack.ficheTechnique.delaiMoyen}</dd>
                  </div>
                </dl>
                <Button
                  href={`mailto:contact@manufacture.example?subject=${mailSubject}`}
                  variant="primary"
                  className="mt-s2 w-full"
                  cursorLabel="acheter"
                >
                  Acheter le pack
                </Button>
                <p className="text-label text-fumee">Livraison immédiate — PDF + fiches contact</p>
              </div>
            </aside>
          </div>
        </div>
      </GridLines>

      <section className="rule-t-structure py-s9">
        <div className="mx-auto max-w-[1400px] px-s5 xl:px-s7">
          <SectionHeading index="01" title="Extrait de fiche usine" />
          <div className="grid grid-cols-1 gap-s5 lg:grid-cols-2">
            <div className="rule-structure p-s6">
              <p className="text-label text-fumee">Avant achat</p>
              <p className="text-body mt-s3">{pack.extraitFicheUsine.avantContact}</p>
            </div>
            <div className="rule-structure relative overflow-hidden p-s6">
              <p className="text-label text-fumee">Après achat</p>
              <p aria-hidden className="text-body mt-s3 blur-[5px] select-none">
                {pack.extraitFicheUsine.apresContact}
              </p>
              <div className="absolute inset-0 flex items-center justify-center bg-nuit/40">
                <span className="rule-structure bg-nuit px-s4 py-s2 text-label">Disponible après achat</span>
              </div>
              <span className="sr-only">Contenu réservé aux acheteurs du pack : {pack.extraitFicheUsine.apresContact}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="rule-t-structure py-s9">
        <div className="mx-auto max-w-[1400px] px-s5 xl:px-s7">
          <SectionHeading index="02" title="Fiches usine incluses" />
          <div className="grid grid-cols-1 gap-s4 md:grid-cols-2">
            {pack.blocs.fichesUsine.map((fiche) => (
              <div key={fiche.nom} className="rule-secondaire p-s5">
                <p className="text-card-title text-[20px]">{fiche.nom}</p>
                <dl className="mt-s4 grid grid-cols-3 gap-s3">
                  <div>
                    <dt className="text-label text-fumee">Pays</dt>
                    <dd className="text-data mt-s1">{fiche.pays}</dd>
                  </div>
                  <div>
                    <dt className="text-label text-fumee">MOQ</dt>
                    <dd className="text-data mt-s1">{fiche.moq}</dd>
                  </div>
                  <div>
                    <dt className="text-label text-fumee">Délai</dt>
                    <dd className="text-data mt-s1">{fiche.delai}</dd>
                  </div>
                </dl>
                <div className="mt-s4 flex flex-wrap gap-s2">
                  {fiche.certifs.map((c) => (
                    <Badge key={c} label={c} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-body-tight mt-s6 max-w-[70ch] text-fumee">{pack.blocs.moqNegocie}</p>
        </div>
      </section>

      <section className="rule-t-structure py-s9">
        <div className="mx-auto max-w-[1400px] px-s5 xl:px-s7">
          <SectionHeading index="03" title="Prix indicatifs" />
          <div className="rule-structure overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse">
              <thead>
                <tr className="rule-b-structure text-left">
                  <th className="text-label p-s4 font-normal">Produit</th>
                  <th className="text-label p-s4 font-normal">Prix unitaire</th>
                  <th className="text-label p-s4 font-normal">Quantité</th>
                </tr>
              </thead>
              <tbody>
                {pack.blocs.prixIndicatifs.map((row) => (
                  <tr key={row.produit} className="rule-t-secondaire">
                    <td className="text-body-tight p-s4">{row.produit}</td>
                    <td className="text-data p-s4">{row.prixUnitaire}</td>
                    <td className="text-data p-s4">{row.quantite}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="rule-t-structure py-s9">
        <div className="mx-auto max-w-[1400px] px-s5 xl:px-s7">
          <SectionHeading index="04" title="Délais constatés" />
          <ol className="flex flex-col">
            {pack.blocs.delais.map((etape, i) => (
              <li key={etape.etape} className="rule-t-secondaire grid grid-cols-[auto_1fr_auto] items-center gap-s4 py-s4 first:border-t-0">
                <span className="text-label text-fumee">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-body-tight">{etape.etape}</span>
                <span className="text-data">{etape.duree}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="rule-t-structure py-s9">
        <div className="mx-auto max-w-[1400px] px-s5 xl:px-s7">
          <SectionHeading index="05" title="Certifications vérifiées" />
          <div className="flex flex-wrap gap-s3">
            {pack.blocs.certifications.map((c) => (
              <Badge key={c} label={c} colorVar={pack.colorVar} />
            ))}
          </div>
        </div>
      </section>

      <section className="rule-t-structure py-s9">
        <div className="mx-auto max-w-[1400px] px-s5 xl:px-s7">
          <SectionHeading index="06" title="Retours de marques" />
          <div className="grid grid-cols-1 gap-s6 lg:grid-cols-2">
            {pack.blocs.retoursMarques.map((retour) => (
              <figure key={retour.marque} className="rule-t-secondaire pt-s5">
                <blockquote className="text-intro">« {retour.citation} »</blockquote>
                <figcaption className="text-label text-fumee mt-s4">
                  {retour.marque} <span className="text-fumee">— exemple</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="rule-t-structure py-s9">
        <div className="mx-auto max-w-[1400px] px-s5 xl:px-s7">
          <SectionHeading index="07" title="Modèles de messages fournis" />
          <div className="grid grid-cols-1 gap-s5 lg:grid-cols-2">
            {pack.blocs.modelesMessages.map((modele) => (
              <div key={modele.objet} className="rule-structure p-s6">
                <p className="text-label text-fumee">Objet</p>
                <p className="text-card-title mt-s2 text-[18px]">{modele.objet}</p>
                <p className="text-data rule-t-secondaire mt-s4 pt-s4 leading-relaxed whitespace-pre-line">
                  {modele.corps}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rule-t-structure bg-nuit-elevee py-s9">
        <div className="mx-auto max-w-[1400px] px-s5 xl:px-s7">
          <SectionHeading index="08" title="Sans le pack, avec le pack" />
          <div className="rule-structure overflow-x-auto bg-nuit">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr className="rule-b-structure text-left">
                  <th className="text-label p-s4 font-normal">Critère</th>
                  <th className="text-label p-s4 font-normal">Sans le pack</th>
                  <th className="text-label text-matcha p-s4 font-normal">Avec le pack</th>
                </tr>
              </thead>
              <tbody>
                {pack.blocs.grilleComparaison.map((row) => (
                  <tr key={row.critere} className="rule-t-secondaire">
                    <td className="text-body-tight p-s4">{row.critere}</td>
                    <td className="text-data p-s4 text-fumee line-through decoration-fumee/50">{row.soiMeme}</td>
                    <td className="text-data text-matcha p-s4">{row.pack}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="rule-t-structure py-s9">
        <div className="mx-auto max-w-[1400px] px-s5 xl:px-s7">
          <SectionHeading index="09" title="Checklist d'inspection à réception" />
          <ul className="grid grid-cols-1 gap-s3 md:grid-cols-2">
            {pack.blocs.checklistInspection.map((item, i) => (
              <li key={item} className="rule-secondaire flex gap-s4 p-s4">
                <span className="text-label text-fumee">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-body-tight">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rule-t-structure py-s9">
        <div className="mx-auto max-w-[1400px] px-s5 xl:px-s7 flex flex-col items-start gap-s5">
          <p className="text-section-title max-w-[20ch]">Prêt à passer commande sans y passer trois semaines ?</p>
          <Button
            href={`mailto:contact@manufacture.example?subject=${mailSubject}`}
            variant="primary"
            cursorLabel="acheter"
          >
            Acheter le pack — {formatPrice(pack.prix)}
          </Button>
        </div>
      </section>
    </div>
  );
}
