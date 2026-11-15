import Link from "next/link";
import { SignupButton } from "@/components/signup-button";
import { TrackLink } from "@/components/track-link";
import { eventsDoc, sectionLabel, upcomingEvents, type ClubEvent } from "@/lib/content";

const tint: Record<string, string> = {
  sun: "bg-tint-sun",
  mint: "bg-tint-mint",
  pink: "bg-tint-pink",
  blue: "bg-tint-blue",
};

const typeName: Record<string, string> = {
  tournament: "турнир",
  camp: "сборы",
  seminar: "семинар",
  festival: "фестиваль",
};

function CalendarList({ items, empty }: { items: ClubEvent[]; empty: string }) {
  if (!items.length) {
    return <p className="mt-4 rounded-2xl border-2 border-dashed border-ink/40 bg-white/80 p-4 font-extrabold">{empty}</p>;
  }

  return (
    <ul className="mt-4 grid gap-2">
      {items.map((item) => (
        <li key={item.id} className="rounded-2xl border-[2.5px] border-ink bg-white p-3">
          <TrackLink href={item.link ?? "/events"} goal="calendar_event" className="font-display text-lg font-extrabold underline">
            {item.title}
          </TrackLink>
          <p className="text-sm">
            {item.dateText}
            {item.place ? ` · ${item.place}` : ""} · {typeName[item.type] ?? item.type}
          </p>
        </li>
      ))}
    </ul>
  );
}

export function HomeEvents() {
  const home = eventsDoc.home;
  const next = upcomingEvents().slice(0, 3);

  return (
    <section id="events" className="border-y-[3px] border-ink bg-white py-24 max-md:py-14">
      <div className="mx-auto max-w-wrap px-10 max-md:px-[18px]">
        <p className="inline-flex rounded-pill bg-ink px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-white">{sectionLabel("progress")}</p>
        <h2 className="mt-4 font-display text-h2 font-black">
          {home.title}
          <br />
          <span className="text-pink">{home.accent}</span>
        </h2>
        <ol className="mt-5 flex flex-wrap items-center gap-2">
          {home.path.map((step, index) => (
            <li key={step} className="flex items-center gap-2">
              <span className="rounded-pill border-[2.5px] border-ink bg-cream px-3 py-1 text-sm font-extrabold">{step}</span>
              {index < home.path.length - 1 ? <span aria-hidden="true">→</span> : null}
            </li>
          ))}
        </ol>
        <div className="mt-8 grid items-stretch gap-[22px] lg:grid-cols-2">
          {home.cards.map((card) => (
            <article key={card.id} className={`flex flex-col rounded-card border-[3px] border-ink p-5 shadow-card max-md:shadow-card-sm ${tint[card.tint] ?? "bg-white"}`}>
              <span className="grid h-[34px] w-[34px] place-items-center rounded-full bg-ink text-sm font-black text-white">{card.number}</span>
              <h3 className="mt-4 font-display text-[28px] font-black leading-none">{card.title}</h3>
              <p className="mt-3 text-[15px] text-ink-3">{card.text}</p>
              {card.id === "calendar" ? <CalendarList items={next} empty={home.emptyCalendar} /> : null}
              {card.examples?.length ? (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {card.examples.map((example) => (
                    <li key={example} className="rounded-pill border-2 border-ink bg-white px-3 py-1 text-sm font-extrabold">
                      {example}
                    </li>
                  ))}
                </ul>
              ) : null}
              {card.examplesNote ? (
                <p className="mt-3 text-sm">
                  <span className="ph">{card.examplesNote}</span>
                </p>
              ) : null}
              {card.photoLabel ? (
                <div className="stripes mt-4 grid min-h-24 place-items-center rounded-2xl border-[3px] border-ink px-4 text-center text-xs font-black text-white">
                  {card.photoLabel}
                </div>
              ) : null}
              {card.trips?.length ? (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {card.trips.map((trip) => (
                    <div key={trip.title} className="flex flex-col rounded-2xl border-[2.5px] border-ink bg-white p-3">
                      <h4 className="font-display text-lg font-extrabold">{trip.title}</h4>
                      <p className="mt-1 text-sm">{trip.text}</p>
                      {trip.ageNote ? (
                        <p className="mt-2 text-sm">
                          <span className="ph">{trip.ageNote}</span>
                        </p>
                      ) : null}
                      <Link href={trip.href} className="mt-2 inline-flex min-h-11 items-center font-black text-blue underline">
                        {trip.link} →
                      </Link>
                      <SignupButton
                        kind={trip.signup === "camp" ? "camp" : "china"}
                        audience={trip.signup === "camp" ? "child" : undefined}
                        placement={trip.signup === "camp" ? "camp" : "china"}
                        className="mt-auto inline-flex h-11 items-center justify-center rounded-btn border-[2.5px] border-ink bg-orange px-3 text-sm font-black text-ink shadow-btn-main"
                      >
                        {trip.signupLabel}
                      </SignupButton>
                    </div>
                  ))}
                </div>
              ) : null}
              {card.href && card.link ? (
                <TrackLink href={card.href} goal={card.goal} className="mt-auto inline-flex min-h-11 items-center pt-4 font-black text-blue underline">
                  {card.link} →
                </TrackLink>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
