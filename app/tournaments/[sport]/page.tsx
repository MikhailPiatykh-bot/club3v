import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { events, eventsDoc } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

const pages = {
  wushu: {
    title: "Турниры по ушу",
    description: "Турниры по ушу клуба Veni Vidi Vici. Год дат из старого календаря клуб ещё подтвердит.",
    empty: "Расписание турниров по ушу уточняется.",
  },
  acrobatics: {
    title: "Турниры по акробатике",
    description: "Турниры по акробатике клуба Veni Vidi Vici. Расписание клуб ещё назовёт.",
    empty: "Расписание турниров по акробатике уточняется.",
  },
} as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ sport: "wushu" }, { sport: "acrobatics" }];
}

export async function generateMetadata({ params }: { params: Promise<{ sport: string }> }): Promise<Metadata> {
  const { sport } = await params;
  const page = pages[sport as keyof typeof pages];
  if (!page) return {};
  return pageMeta({ title: page.title, description: page.description, path: `/tournaments/${sport}` });
}

export default async function TournamentPage({ params }: { params: Promise<{ sport: string }> }) {
  const { sport } = await params;
  const page = pages[sport as keyof typeof pages];
  if (!page) notFound();

  const items = events.filter((item) => item.type === "tournament" && item.direction === sport && !item.stale);
  const past = eventsDoc.competitionCaptions.filter((caption) =>
    sport === "acrobatics" ? /акробат|acro|акро-/i.test(caption) : /ушу|беларус/i.test(caption),
  );

  return (
    <>
      <header className="border-b-[3px] border-ink bg-white">
        <div className="mx-auto max-w-wrap px-10 py-12 max-md:px-[18px]">
          <Breadcrumbs items={[{ name: "Главная", path: "/" }, { name: page.title, path: `/tournaments/${sport}` }]} />
          <h1 className="mt-4 font-display text-h1 font-black">{page.title}</h1>
          <p className="mt-4 max-w-2xl">
            {items.length ? "Даты ниже взяты из старого календаря. Год клуб ещё подтвердит, поэтому на главной они не стоят как ближайшие." : page.empty}
          </p>
        </div>
      </header>
      {items.length ? (
        <section className="mx-auto max-w-wrap px-10 py-12 max-md:px-[18px]">
          <ul className="grid gap-3">
            {items.map((item) => (
              <li key={item.id} className="rounded-card border-[3px] border-ink bg-white p-4">
                <b className="font-display text-2xl">{item.title}</b>
                <p className="mt-1 text-sm">
                  {item.dateText}
                  {item.place ? ` · ${item.place}` : ""}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {past.length ? (
        <section className="mx-auto max-w-wrap px-10 pb-12 max-md:px-[18px]">
          <h2 className="font-display text-3xl font-black">Как это было</h2>
          <ul className="mt-4 grid gap-2">
            {past.map((caption) => (
              <li key={caption} className="rounded-card border-[3px] border-ink bg-cream p-3">
                {caption}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}
