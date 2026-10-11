import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { FaqList } from "@/components/faq-list";
import { GroupCards } from "@/components/group-cards";
import { PriceCards } from "@/components/price-cards";
import { ScheduleList } from "@/components/schedule-list";
import { directions, faq, scheduleDoc, site, type DirectionId } from "@/lib/content";
import { scheduleRows } from "@/lib/schedule-rows";

const faqIds = ["pro", "age3", "health", "first", "where"];

export function DirectionView({ direction }: { direction: DirectionId }) {
  const page = directions[direction];
  const questions = faq.filter((item) => faqIds.includes(item.id));

  return (
    <>
      <header className="border-b border-line bg-card">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 md:py-14">
          <Breadcrumbs items={[{ name: "Главная", path: "/" }, { name: page.nav, path: `/${direction === "wushu" ? "wushu" : "acrobatics"}` }]} />
          <h1 className="mt-4 max-w-4xl font-display text-3xl leading-tight md:text-4xl">{page.h1}</h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-soft">{page.lead}</p>
        </div>
      </header>
      <section className="mx-auto w-full max-w-6xl px-4 py-12">
        <h2 className="font-display text-3xl">{page.givesTitle}</h2>
        <ul className="mt-5 grid gap-3 md:grid-cols-3">
          {page.gives.map((item) => (
            <li key={item} className="rounded-3xl border border-line bg-card p-5 text-sm leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      </section>
      <section className="bg-paper-2 py-12">
        <div className="mx-auto w-full max-w-6xl px-4">
          <h2 className="font-display text-3xl">Группы по возрасту</h2>
          <div className="mt-6">
            <GroupCards direction={direction} />
          </div>
        </div>
      </section>
      <section className="mx-auto w-full max-w-6xl px-4 py-12">
        <h2 className="font-display text-3xl">Расписание</h2>
        <p className="mt-3 text-sm text-ink-soft">{scheduleDoc.note} Зал: {site.address.street}.</p>
        <div className="mt-5">
          <ScheduleList rows={scheduleRows(direction)} />
        </div>
      </section>
      <section className="bg-paper-2 py-12">
        <div className="mx-auto w-full max-w-6xl px-4">
          <h2 className="font-display text-3xl">Цены</h2>
          <div className="mt-6">
            <PriceCards />
          </div>
        </div>
      </section>
      <section className="mx-auto w-full max-w-6xl px-4 py-12">
        <h2 className="font-display text-3xl">Коротко о вопросах</h2>
        <div className="mt-6">
          <FaqList items={questions} />
        </div>
      </section>
      <CtaBand direction={direction} placement="direction" />
    </>
  );
}
