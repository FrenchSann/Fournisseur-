import type { Metadata } from "next";
import { RevealText } from "@/components/RevealText";
import { CatalogueClient } from "@/components/CatalogueClient";
import type { NicheSlug } from "@/lib/packs";

export const metadata: Metadata = {
  title: "Catalogue",
  description:
    "Les 8 carnets de fournisseurs vérifiés par niche, et le lot complet. Filtrez par niche, prix et pays.",
};

export default async function CataloguePage(props: PageProps<"/catalogue">) {
  const searchParams = await props.searchParams;
  const q = typeof searchParams.q === "string" ? searchParams.q : undefined;
  const niche = typeof searchParams.niche === "string" ? (searchParams.niche as NicheSlug | "all") : "all";
  const maxPrice = typeof searchParams.maxPrice === "string" ? Number(searchParams.maxPrice) : undefined;

  return (
    <section className="vignette light-pool relative overflow-hidden py-s9">
      <div className="relative z-[2] mx-auto max-w-[1400px] px-s5 xl:px-s7">
        <div className="rule-b-secondaire flex flex-wrap items-baseline justify-between gap-s3 pb-s3">
          <p className="text-slug">Int. archives — jour</p>
          <p className="text-timecode">Bobine 4 / 6</p>
        </div>

        <RevealText as="h1" className="text-title-card mt-s8" lines={["Le catalogue."]} />
        <p className="text-intro mt-s6">
          Huit carnets de fournisseurs vérifiés, un par niche, et un lot complet. Chaque pack indique le
          nombre d&apos;usines, le MOQ, le prix indicatif et les pays sourcés.
        </p>

        <div className="mt-s9">
          <CatalogueClient initialQ={q} initialNiche={niche} initialMaxPrice={maxPrice} />
        </div>
      </div>
    </section>
  );
}
