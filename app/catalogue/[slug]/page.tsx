import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PackDetail } from "@/components/PackDetail";
import { getAllSlugs, getPackDetailBySlug } from "@/lib/packs";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/catalogue/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const pack = getPackDetailBySlug(slug);
  if (!pack) return {};
  return {
    title: pack.nom,
    description: pack.resume,
  };
}

export default async function PackDetailPage(props: PageProps<"/catalogue/[slug]">) {
  const { slug } = await props.params;
  const pack = getPackDetailBySlug(slug);
  if (!pack) notFound();

  return <PackDetail pack={pack} />;
}
