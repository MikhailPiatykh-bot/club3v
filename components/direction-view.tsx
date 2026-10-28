import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { FaqList } from "@/components/faq-list";
import { GroupCards } from "@/components/group-cards";
import { PriceCards } from "@/components/price-cards";
import { ScheduleList } from "@/components/schedule-list";
import { directions, faq, scheduleDoc, site, type DirectionId } from "@/lib/content";
import { scheduleRows } from "@/lib/schedule-rows";

const faqIds = ["pro", "age3", "health", "first", "where", "signup"];

const scheduleKey: Record<DirectionId, string> = {
  wushu: "wushu",
  acrobatics: "acrobatics",
  breakdance: "breakdance",
  group3: "group-3plus",
};

export function DirectionView({ direction }: { direction: DirectionId }) {
  const page = directions[direction];
  const questions = faq.filter((item) => faqIds.includes(item.id));

  return (
    <>
      <header className="border-b-[3px] border-ink bg-white">
        <div className="mx-auto w-full max-w-wrap px-10 py-12 max-md:px-[18px]">
          <Breadcrumbs items={[{ name: "Главная", path: "/" }, { name: page.nav, path: page.href }]} />
          <h1 className="mt-4 max-w-4xl font-display text-h1 font-black">{page.h1}</h1>
          <p className="mt-4 max-w-2xl text-lg">{page.lead}</p>
        </div>
      </header>
      <section className="mx-auto w-full max-w-wrap px-10 py-12 max-md:px-[18px]">
        <h2 className="font-display text-h2 font-black">{page.givesTitle}</h2>
        <ul className="mt-5 grid gap-3 md:grid-cols-3">
          {page.gives.map((item) => (
            <li key={item} className="rounded-card border-[3px] border-ink bg-white p-5 text-sm shadow-card-sm">
              {item}
            </li>
          ))}
        </ul>
      </section>
      <section className="bg-white py-12">
        <div className="mx-auto w-full max-w-wrap px-10 max-md:px-[18px]">
          <h2 className="font-display text-3xl font-black">Группы по возрасту</h2>
          <div className="mt-6">
            <GroupCards direction={scheduleKey[direction]} />
          </div>
        </div>
      </section>
      <section className="mx-auto w-full max-w-wrap px-10 py-12 max-md:px-[18px]">
        <h2 className="font-display text-3xl font-black">Расписание</h2>
        <p className="mt-3 text-sm">
          {scheduleDoc.note} Зал: {site.address.street}.
        </p>
        <div className="mt-5">
          <ScheduleList rows={scheduleRows(scheduleKey[direction])} />
        </div>
      </section>
      <section className="bg-blue-mist py-12">
        <div className="mx-auto w-full max-w-wrap px-10 max-md:px-[18px]">
          <h2 className="font-display text-3xl font-black">Цены</h2>
          <div className="mt-6">
            <PriceCards />
          </div>
        </div>
      </section>
      <section className="mx-auto w-full max-w-wrap px-10 py-12 max-md:px-[18px]">
        <h2 className="font-display text-3xl font-black">Коротко о вопросах</h2>
        <div className="mt-6">
          <FaqList items={questions} />
        </div>
      </section>
      <CtaBand direction={scheduleKey[direction]} placement="direction" />
    </>
  );
}
