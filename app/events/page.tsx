import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { DraftMark } from "@/components/draft-mark";
import { events } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Соревнования, лагерь и сборы",
  description: "Соревнования, аттестации, летний лагерь и сборы в Китае детского клуба Veni Vidi Vici.",
  path: "/events",
});

export default function EventsPage() {
  return (
    <>
      <header className="border-b border-line bg-card">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 md:py-14">
          <Breadcrumbs items={[{ name: "Главная", path: "/" }, { name: "События", path: "/events" }]} />
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight">Соревнования, аттестации, лагерь и Китай</h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-soft">
            Это часть жизни клуба, не обязательный экзамен для записи. Даты клуб публикует здесь, когда они известны.
          </p>
        </div>
      </header>
      <div className="mx-auto w-full max-w-6xl space-y-4 px-4 py-10">
        {events.map((item) => (
          <article key={item.id} id={item.id} className="rounded-3xl border border-line bg-card p-6">
            <DraftMark />
            <h2 className="mt-3 font-display text-3xl">{item.title}</h2>
            <p className="mt-3 max-w-2xl text-ink-soft">{item.text}</p>
            <p className="mt-3 text-sm text-ink-soft">{item.details}</p>
          </article>
        ))}
      </div>
      <CtaBand placement="events" />
    </>
  );
}
