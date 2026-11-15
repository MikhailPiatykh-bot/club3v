import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Клубная аттестация",
  description: "Клубная аттестация Veni Vidi Vici: переход на следующую ступень по ушу и акробатике. Ближайшую дату клуб опубликует на этой странице.",
  path: "/certification",
});

export default function CertificationPage() {
  return (
    <>
      <header className="border-b-[3px] border-ink bg-white">
        <div className="mx-auto max-w-wrap px-10 py-12 max-md:px-[18px]">
          <Breadcrumbs items={[{ name: "Главная", path: "/" }, { name: "Клубная аттестация", path: "/certification" }]} />
          <h1 className="mt-4 font-display text-h1 font-black">Клубная аттестация</h1>
          <p className="mt-4 max-w-2xl">
            Аттестация — это переход на следующую ступень. Ребёнок показывает то, что уже умеет на тренировках, и получает следующую ступень.
          </p>
          <p className="mt-3 max-w-2xl">Ближайшую дату клуб опубликует на этой странице.</p>
          <Link href="/#progress" className="mt-6 inline-flex min-h-11 items-center font-black text-blue underline">
            Как устроены ступени
          </Link>
        </div>
      </header>
    </>
  );
}
