import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LeadForm } from "@/components/lead-form";
import { MapEmbed } from "@/components/map-embed";
import { PhotoSlot } from "@/components/photo-slot";
import { TrackLink } from "@/components/track-link";
import { site } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { buttonClass } from "@/lib/styles";

export const metadata: Metadata = pageMeta({
  title: "Контакты",
  description: "Адрес клуба Veni Vidi Vici: Москва, Хорошёво-Мнёвники, пр-т Маршала Жукова, 51. Телефон +7 (977) 880-25-71.",
  path: "/contacts",
});

const contacts = {
  phoneDisplay: site.phoneDisplay,
  phoneTel: site.phoneTel,
  whatsapp: site.whatsapp,
  telegram: site.telegram,
};

export default function ContactsPage() {
  return (
    <>
      <header className="border-b border-line bg-card">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 md:py-14">
          <Breadcrumbs items={[{ name: "Главная", path: "/" }, { name: "Контакты", path: "/contacts" }]} />
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight">Контакты клуба в Хорошёво-Мнёвниках</h1>
          <p className="mt-4 text-lg text-ink-soft">{site.address.full}</p>
        </div>
      </header>
      <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl">Как дойти</h2>
          <p className="mt-3 text-ink-soft">{site.metro.lead}</p>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-ink-soft">
            {site.metro.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <TrackLink href={`tel:${site.phoneTel}`} goal="phone_click" className="mt-5 inline-flex text-xl font-semibold">
            {site.phoneDisplay}
          </TrackLink>
          <div className="mt-4 flex flex-wrap gap-2">
            <TrackLink href={site.whatsapp} goal="whatsapp_click" target="_blank" rel="noopener noreferrer" className={buttonClass("ghost")}>
              WhatsApp
            </TrackLink>
            <TrackLink href={site.telegram} goal="telegram_click" target="_blank" rel="noopener noreferrer" className={buttonClass("ghost")}>
              Telegram
            </TrackLink>
          </div>
          <div className="mt-6">
            <PhotoSlot
              src={site.entrance.src}
              alt={site.entrance.alt}
              width={site.entrance.width}
              height={site.entrance.height}
              label="Фото входа добавит клуб"
              className="rounded-3xl"
            />
          </div>
        </div>
        <div className="grid gap-6">
          <MapEmbed widgetUrl={site.mapWidgetUrl} mapsUrl={site.mapsUrl} />
          <div id="zapis" className="rounded-3xl border border-line bg-card p-5">
            <LeadForm contacts={contacts} thankYou={site.thankYou} placement="contacts" />
          </div>
        </div>
      </section>
    </>
  );
}
