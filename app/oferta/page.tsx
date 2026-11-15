import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LegalDoc } from "@/components/legal-doc";
import { oferta } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: oferta.title,
  description: oferta.description,
  path: "/oferta",
  noindex: oferta.draft,
});

export default function OfertaPage() {
  return (
    <>
      <div className="mx-auto w-full max-w-3xl px-4 pt-8">
        <Breadcrumbs items={[{ name: "Главная", path: "/" }, { name: "Оферта", path: "/oferta" }]} />
      </div>
      <LegalDoc title={oferta.title} draft={oferta.draft} blocks={oferta.blocks} />
    </>
  );
}
