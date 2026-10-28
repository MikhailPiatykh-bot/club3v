import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ChampionCards } from "@/components/champion-cards";
import { SignupButton } from "@/components/signup-button";
import { championsDoc } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Зал славы",
  description: "Наши чемпионы клуба Veni Vidi Vici. Имена и фото публикуются только с согласия.",
  path: "/champions",
});

export default function ChampionsPage() {
  const cards = championsDoc.items.filter((item) => item.consent);

  return (
    <>
      <header className="border-b-[3px] border-ink bg-white">
        <div className="mx-auto max-w-wrap px-10 py-12 max-md:px-[18px]">
          <Breadcrumbs items={[{ name: "Главная", path: "/" }, { name: "Зал славы", path: "/champions" }]} />
          <h1 className="mt-4 font-display text-h1 font-black">Наши чемпионы</h1>
          <p className="mt-4 max-w-2xl">{championsDoc.note}</p>
        </div>
      </header>
      <section className="mx-auto max-w-wrap px-10 py-12 max-md:px-[18px]">
        {championsDoc.summaryConfirmed ? (
          <ul className="mt-6 flex flex-wrap gap-2">
            {championsDoc.summary.map((item) => (
              <li key={item.label} className="rounded-pill border-[2.5px] border-ink bg-white px-3 py-1 text-sm font-extrabold">
                {item.count} · {item.label}
              </li>
            ))}
          </ul>
        ) : (
          <p>
            <span className="ph">Счётчики со старого сайта, без публикации имён: {championsDoc.summary.map((item) => `${item.count} · ${item.label}`).join("; ")}.</span>
          </p>
        )}
        {cards.length === 0 ? <p className="mt-4">Карточек с согласием на публикацию пока нет.</p> : <ChampionCards items={cards} />}
        <p className="mt-6 text-sm">
          Чтобы убрать запись, напишите на почту клуба. Срок удаления согласует юрист.
        </p>
        <SignupButton placement="champions" className="mt-6 inline-flex h-14 items-center rounded-btn border-[2.5px] border-ink bg-orange px-5 font-black text-ink shadow-btn-main">
          Записаться
        </SignupButton>
      </section>
    </>
  );
}
