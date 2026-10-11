import type { Metadata } from "next";
import { Suspense } from "react";
import { JsonLd } from "@/components/json-ld";
import { ScheduleWeek } from "@/components/schedule-week";
import { breadcrumbJsonLd } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Расписание ушу и акробатики",
  description: "Расписание ушу и акробатики в детском клубе Veni Vidi Vici. Пр-т Маршала Жукова, 51, Хорошёво-Мнёвники.",
  path: "/schedule",
});

export default function SchedulePage() {
  return (
    <div className="sp">
      <JsonLd data={breadcrumbJsonLd([{ name: "Главная", path: "/" }, { name: "Расписание", path: "/schedule" }])} />
      <Suspense fallback={<section className="s-hero"><div className="wrap">Загрузка расписания…</div></section>}>
        <ScheduleWeek />
      </Suspense>
    </div>
  );
}
