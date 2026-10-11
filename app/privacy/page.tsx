import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LegalDoc } from "@/components/legal-doc";
import { privacy } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: privacy.title,
  description: privacy.description,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <div className="mx-auto w-full max-w-3xl px-4 pt-8">
        <Breadcrumbs items={[{ name: "Главная", path: "/" }, { name: "Политика", path: "/privacy" }]} />
      </div>
      <LegalDoc title={privacy.title} draft={privacy.draft} blocks={privacy.blocks} />
    </>
  );
}
