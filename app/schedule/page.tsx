import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { ScheduleBoard } from "@/components/schedule-board";
import { scheduleDoc, site } from "@/lib/content";
import { scheduleRows } from "@/lib/schedule-rows";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Расписание ушу и акробатики",
  description: "Расписание ушу и акробатики в детском клубе Veni Vidi Vici. Пр-т Маршала Жукова, 51, Хорошёво-Мнёвники.",
  path: "/schedule",
});

export default function SchedulePage() {
  return (
    <>
      <header className="border-b border-line bg-card">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 md:py-14">
          <Breadcrumbs items={[{ name: "Главная", path: "/" }, { name: "Расписание", path: "/schedule" }]} />
          <h1 className="mt-4 font-display text-4xl leading-tight">Расписание</h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-soft">
            Один зал: {site.address.full}. Фильтр по направлению и возрасту.
          </p>
        </div>
      </header>
      <section className="mx-auto w-full max-w-6xl px-4 py-10">
        <ScheduleBoard rows={scheduleRows()} note={scheduleDoc.draft ? scheduleDoc.note : undefined} />
      </section>
      <CtaBand placement="schedule" />
    </>
  );
}
