import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { ScheduleExplorer } from "@/components/schedule-explorer";
import { scheduleDoc, site } from "@/lib/content";
import { scheduleRows } from "@/lib/schedule-rows";
import { breadcrumbJsonLd } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Расписание ушу, акробатики и взрослых групп",
  description: "Расписание детских и взрослых групп клуба Veni Vidi Vici. Пр-т Маршала Жукова, 51, Хорошёво-Мнёвники. Абонемент 9 000 ₽.",
  path: "/schedule",
});

export default function SchedulePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Главная", path: "/" }, { name: "Расписание", path: "/schedule" }])} />
      <header className="border-b-[3px] border-ink bg-white">
        <div className="mx-auto max-w-wrap px-10 py-12 max-md:px-[18px]">
          <Breadcrumbs items={[{ name: "Главная", path: "/" }, { name: "Расписание", path: "/schedule" }]} />
          <h1 className="mt-4 font-display text-h1 font-black">Расписание</h1>
          <p className="mt-3 max-w-2xl">{scheduleDoc.note}</p>
          <p className="mt-2 font-extrabold">{site.address.full}</p>
        </div>
      </header>
      <section className="mx-auto max-w-wrap px-10 py-10 max-md:px-[18px]">
        <Suspense fallback={<p>Загрузка расписания…</p>}>
          <ScheduleExplorer rows={scheduleRows()} />
        </Suspense>
      </section>
    </>
  );
}
