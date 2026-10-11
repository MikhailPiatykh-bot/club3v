import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { GroupCards } from "@/components/group-cards";
import { PriceCards } from "@/components/price-cards";
import { publishedDistricts, site } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedDistricts.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const district = publishedDistricts.find((item) => item.slug === slug);
  if (!district) return {};
  return pageMeta({
    title: district.title,
    description: district.description,
    path: `/rayon/${district.slug}`,
  });
}

export default async function DistrictPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const district = publishedDistricts.find((item) => item.slug === slug);
  if (!district) notFound();

  return (
    <>
      <header className="border-b border-line bg-card">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 md:py-14">
          <Breadcrumbs items={[{ name: "Главная", path: "/" }, { name: district.district, path: `/rayon/${district.slug}` }]} />
          <h1 className="mt-4 max-w-4xl font-display text-3xl leading-tight md:text-4xl">{district.h1}</h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-soft">{district.intro}</p>
          <p className="mt-2 text-sm text-ink-soft">Зал клуба: {site.address.full}.</p>
        </div>
      </header>
      <section className="mx-auto w-full max-w-6xl px-4 py-10">
        <h2 className="font-display text-3xl">Группы</h2>
        <div className="mt-6">
          <GroupCards />
        </div>
      </section>
      <section className="bg-paper-2 py-10">
        <div className="mx-auto w-full max-w-6xl px-4">
          <h2 className="font-display text-3xl">Цены</h2>
          <div className="mt-6">
            <PriceCards />
          </div>
        </div>
      </section>
      <CtaBand placement="direction" />
    </>
  );
}
