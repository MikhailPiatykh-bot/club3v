import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Сборы",
  description: "Выездные сборы клуба Veni Vidi Vici: сборы в Китае и детские спортивные лагеря. Даты клуб публикует, когда они известны.",
  path: "/sbory",
});

const cards = [
  {
    href: "/china-camp",
    title: "Сборы в Китае",
    text: "Набор на следующие сборы. Даты и цену клуб ещё назовёт.",
  },
  {
    href: "/camps",
    title: "Детские спортивные лагеря",
    text: "Летние смены на Вазузе. Набор откроется, когда клуб назовёт даты.",
  },
];

export default function CampsHubPage() {
  return (
    <>
      <header className="border-b-[3px] border-ink bg-white">
        <div className="mx-auto max-w-wrap px-10 py-12 max-md:px-[18px]">
          <Breadcrumbs items={[{ name: "Главная", path: "/" }, { name: "Сборы", path: "/sbory" }]} />
          <h1 className="mt-4 font-display text-h1 font-black">Сборы</h1>
          <p className="mt-4 max-w-2xl">Выездные сборы и детский лагерь. Актуальные даты появляются здесь, когда клуб их называет.</p>
        </div>
      </header>
      <section className="mx-auto grid max-w-wrap gap-4 px-10 py-12 max-md:px-[18px] md:grid-cols-2">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="rounded-card border-[3px] border-ink bg-white p-6 shadow-card">
            <h2 className="font-display text-3xl font-black">{card.title}</h2>
            <p className="mt-3">{card.text}</p>
            <span className="mt-4 inline-flex min-h-11 items-center font-black text-blue underline">Подробнее</span>
          </Link>
        ))}
      </section>
    </>
  );
}
