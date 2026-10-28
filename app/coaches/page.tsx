import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CoachCard } from "@/components/coach-card";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { PhotoSlot } from "@/components/photo-slot";
import { coaches, site } from "@/lib/content";
import { founderJsonLd } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Тренеры",
  description: "Тренеры детского клуба ушу и акробатики Veni Vidi Vici на пр-те Маршала Жукова, 51.",
  path: "/coaches",
});

export default function CoachesPage() {
  return (
    <>
      <JsonLd data={founderJsonLd()} />
      <header className="border-b border-line bg-card">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 md:py-14">
          <Breadcrumbs items={[{ name: "Главная", path: "/" }, { name: "Тренеры", path: "/coaches" }]} />
          <h1 className="mt-4 font-display text-4xl leading-tight">Тренеры</h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-soft">
            Запись к тренеру подставляет его имя в заявку.
          </p>
        </div>
      </header>
      <section className="mx-auto grid w-full max-w-6xl items-center gap-6 px-4 py-10 md:grid-cols-[16rem_1fr]">
        <PhotoSlot
          src={site.founder.photo}
          alt={site.founder.photoAlt}
          width={site.founder.width}
          height={site.founder.height}
          label="Фото основателя"
          className="rounded-3xl"
        />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cinnabar">{site.founder.role}</p>
          <h2 className="mt-2 font-display text-3xl">{site.founder.name}</h2>
          {site.founder.quote ? <p className="mt-3 text-ink-soft">{site.founder.quote}</p> : null}
        </div>
      </section>
      <section className="mx-auto w-full max-w-6xl px-4 pb-12">
        <div className="grid gap-3 md:grid-cols-2">
          {coaches.filter((coach) => coach.id !== "founder").map((coach) => (
            <CoachCard key={coach.id} coach={coach} />
          ))}
        </div>
      </section>
      <CtaBand placement="coach" />
    </>
  );
}
