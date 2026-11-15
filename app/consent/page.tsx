import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LegalDoc } from "@/components/legal-doc";
import { consent } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: consent.title,
  description: consent.description,
  path: "/consent",
});

export default function ConsentPage() {
  return (
    <>
      <div className="mx-auto w-full max-w-3xl px-4 pt-8">
        <Breadcrumbs items={[{ name: "Главная", path: "/" }, { name: "Согласие", path: "/consent" }]} />
      </div>
      <LegalDoc title={consent.title} draft={consent.draft} blocks={consent.blocks} />
    </>
  );
}
