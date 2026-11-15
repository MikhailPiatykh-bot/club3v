import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { EventsBoard } from "@/components/events-board";
import { eventsDoc } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Мероприятия клуба",
  description: "Календарь, соревнования и аттестации клуба Veni Vidi Vici. Пр-т Маршала Жукова, 51.",
  path: "/events",
});

export default function EventsPage() {
  return (
    <>
      <header className="border-b-[3px] border-ink bg-white">
        <div className="mx-auto max-w-wrap px-10 py-12 max-md:px-[18px]">
          <Breadcrumbs items={[{ name: "Главная", path: "/" }, { name: "Мероприятия", path: "/events" }]} />
          <p className="mt-4 inline-flex rounded-pill bg-ink px-3 py-1 text-xs font-extrabold uppercase tracking-[0.16em] text-white">01 / МЕРОПРИЯТИЯ</p>
          <h1 className="mt-4 font-display text-h1 font-black">Мероприятия клуба</h1>
          <p className="mt-3 max-w-2xl">Даты со старого календаря без года в «Ближайшие» не попадают. Год каждой даты клуб ещё подтвердит.</p>
        </div>
      </header>
      <EventsBoard items={eventsDoc.items} captions={eventsDoc.competitionCaptions} lead={eventsDoc.competitionsLead} certification={eventsDoc.certificationVisible} />
    </>
  );
}
