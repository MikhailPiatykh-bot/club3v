import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { ScheduleExplorer } from "@/components/schedule-explorer";
import { coaches, directionLabel, groups, lessons, scheduleDoc, site } from "@/lib/content";
import { buildGrid } from "@/lib/schedule-grid";
import { breadcrumbJsonLd } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Расписание ушу, акробатики и взрослых групп",
  description: "Расписание детских и взрослых групп клуба Veni Vidi Vici. Пр-т Маршала Жукова, 51, Хорошёво-Мнёвники. Абонемент 9 000 ₽.",
  path: "/schedule",
});

export default function SchedulePage() {
  const sessions = buildGrid({ lessons, groups, coaches, label: directionLabel });

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Главная", path: "/" }, { name: "Расписание", path: "/schedule" }])} />
      <header className="border-b-[3px] border-ink bg-white">
        <div className="mx-auto max-w-wrap px-10 py-12 max-md:px-[18px] max-md:py-8">
          <Breadcrumbs items={[{ name: "Главная", path: "/" }, { name: "Расписание", path: "/schedule" }]} />
          <h1 className="mt-4 font-display text-h1 font-black">Расписание</h1>
          <p className="mt-3 max-w-2xl">{scheduleDoc.note}</p>
          <p className="mt-3 inline-flex max-w-full flex-wrap items-center gap-x-2 rounded-pill border-[3px] border-ink bg-cream px-4 py-2 font-extrabold shadow-rate">
            {site.address.street}
            <span className="font-bold text-ink-soft">
              {site.address.city}, {site.address.area} · единственный зал
            </span>
          </p>
        </div>
      </header>
      <section className="mx-auto max-w-wrap px-10 py-8 max-md:px-[18px]">
        <Suspense fallback={<p>Загрузка расписания…</p>}>
          <ScheduleExplorer sessions={sessions} phoneDisplay={site.phoneDisplay} phoneTel={site.phoneTel} whatsapp={site.whatsapp} />
        </Suspense>
        <figure className="mt-12">
          <figcaption className="font-display text-2xl font-black">Картинка расписания</figcaption>
          <Image
            src="/schedule/raspisanie_light_1080x1350.png"
            alt="Расписание клуба Veni Vidi Vici: группа 3+ во вторник и четверг 16:20–17:00, брейкданс по средам, ушу и акробатика по возрастам. Суббота выходной."
            width={1080}
            height={1350}
            sizes="(max-width: 760px) 100vw, 720px"
            className="mt-3 h-auto w-full max-w-[720px] rounded-card border-[3px] border-ink shadow-card"
          />
        </figure>
      </section>
    </>
  );
}
