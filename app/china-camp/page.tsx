import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SignupButton } from "@/components/signup-button";
import { chinaCamp } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Сборы в Китае",
  description: "Сборы клуба Veni Vidi Vici в Китае. Актуальные даты клуб публикует, когда они известны. Зал в Москве: пр-т Маршала Жукова, 51.",
  path: "/china-camp",
});

export default function ChinaCampPage() {
  return (
    <>
      <header className="border-b-[3px] border-ink bg-white">
        <div className="mx-auto max-w-wrap px-10 py-12 max-md:px-[18px]">
          <Breadcrumbs items={[{ name: "Главная", path: "/" }, { name: "Сборы в Китае", path: "/china-camp" }]} />
          <h1 className="mt-4 font-display text-h1 font-black">{chinaCamp.liveTitle}</h1>
          <p className="mt-4 max-w-2xl">{chinaCamp.liveText}</p>
          <SignupButton kind="china" placement="china" className="mt-6 inline-flex h-14 items-center rounded-btn border-[2.5px] border-ink bg-orange px-5 font-black text-ink shadow-btn-main">
            Записаться на сборы
          </SignupButton>
        </div>
      </header>
      <section className="mx-auto max-w-wrap px-10 py-12 max-md:px-[18px]">
        <h2 className="font-display text-3xl font-black">Как это было описано на старом сайте</h2>
        <p className="mt-3">
          <span className="ph">
            Даты {chinaCamp.archive.dateText} на странице и {chinaCamp.archive.calendarDateText} в календаре. {chinaCamp.archive.priceNote}
          </span>
        </p>
        <ul className="mt-4 grid gap-2">
          {chinaCamp.archive.points.map((point) => (
            <li key={point} className="rounded-card border-[3px] border-ink bg-white p-3">
              {point}
            </li>
          ))}
        </ul>
        <h2 className="mt-10 font-display text-3xl font-black">Что включено</h2>
        <ul className="mt-3 list-disc pl-5">
          {chinaCamp.included.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h2 className="mt-10 font-display text-3xl font-black">Вопросы</h2>
        <dl className="mt-3 grid gap-3">
          {chinaCamp.faq.map((item) => (
            <div key={item.q}>
              <dt className="font-extrabold">{item.q}</dt>
              <dd>{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
