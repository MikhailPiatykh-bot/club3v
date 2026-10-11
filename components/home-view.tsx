import Link from "next/link";
import { CoachCard } from "@/components/coach-card";
import { DraftMark } from "@/components/draft-mark";
import { FaqList } from "@/components/faq-list";
import { GroupCards } from "@/components/group-cards";
import { Hero } from "@/components/hero";
import { JsonLd } from "@/components/json-ld";
import { MapEmbed } from "@/components/map-embed";
import { PhotoSlot } from "@/components/photo-slot";
import { PriceCards } from "@/components/price-cards";
import { Quiz } from "@/components/quiz";
import { ScheduleList } from "@/components/schedule-list";
import { SignupButton } from "@/components/signup-button";
import { TrackLink } from "@/components/track-link";
import { VideoGrid } from "@/components/video-grid";
import {
  belts,
  coaches,
  coachesDoc,
  events,
  faq,
  reviews,
  scheduleDoc,
  site,
  stats,
  videos,
  videosDoc,
} from "@/lib/content";
import { scheduleRows } from "@/lib/schedule-rows";
import { faqJsonLd, founderJsonLd } from "@/lib/schema";
import { buttonClass } from "@/lib/styles";

const contacts = {
  phoneDisplay: site.phoneDisplay,
  phoneTel: site.phoneTel,
  whatsapp: site.whatsapp,
  telegram: site.telegram,
};

export function HomeView() {
  const path = events.filter((item) => item.id !== "attestation");

  return (
    <>
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd data={founderJsonLd()} />
      <Hero />

      <section id="why" className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
        <h2 className="max-w-2xl font-display text-3xl leading-tight md:text-4xl">{site.why.title}</h2>
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {site.why.cards.map((card) => (
            <li key={card.problem} className="rounded-3xl border border-line bg-card p-5">
              <h3 className="font-display text-xl">{card.problem}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{card.help}</p>
            </li>
          ))}
        </ul>
        <p className="mt-5 max-w-3xl text-ink-soft">{site.why.summary}</p>
      </section>

      <section id="directions" className="mx-auto w-full max-w-6xl px-4 pb-12 md:pb-16">
        <h2 className="font-display text-3xl md:text-4xl">Два направления</h2>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
        <Link href="/wushu" className="flex min-h-64 flex-col justify-between rounded-3xl bg-pine p-6 text-white">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-white/70">с 3 лет</p>
            <h3 className="mt-3 font-display text-4xl">Ушу</h3>
            <p className="mt-3 max-w-sm text-white/85">Традиционное и оздоровительное. Координация, осанка и своя возрастная группа.</p>
          </div>
          <span className="mt-6 text-sm font-semibold">Группы и расписание</span>
        </Link>
        <Link href="/acrobatics" className="flex min-h-64 flex-col justify-between rounded-3xl bg-cinnabar p-6 text-white">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-white/70">с 3 лет</p>
            <h3 className="mt-3 font-display text-4xl">Акробатика</h3>
            <p className="mt-3 max-w-sm text-white/85">Сила, гибкость и координация. Элемент появляется, когда группа к нему готова.</p>
          </div>
          <span className="mt-6 text-sm font-semibold">Группы и расписание</span>
        </Link>
        </div>
      </section>

      <section id="groups" className="bg-paper-2 py-12 md:py-16">
        <div className="mx-auto w-full max-w-6xl px-4">
          <h2 className="font-display text-3xl md:text-4xl">Возрастные группы</h2>
          <div className="mt-6">
            <GroupCards />
          </div>
        </div>
      </section>

      <section id="progress" className="bg-ink py-12 text-paper md:py-16">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-display text-3xl md:text-4xl">Видимый прогресс</h2>
            {belts.draft && <DraftMark />}
          </div>
          <p className="mt-3 max-w-2xl text-paper/75">{belts.note}</p>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <BeltColumn title="Ушу" steps={belts.wushu} />
            <BeltColumn title="Акробатика" steps={belts.acrobatics} />
          </div>
        </div>
      </section>

      <section id="founder" className="mx-auto grid w-full max-w-6xl items-center gap-6 px-4 py-12 md:grid-cols-[16rem_1fr] md:py-16">
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
          <h2 className="mt-2 font-display text-3xl md:text-4xl">{site.founder.name}</h2>
          {site.founder.quote ? (
            <blockquote className="mt-4 text-lg">{site.founder.quote}</blockquote>
          ) : (
            <p className="mt-4 text-ink-soft">Цитату добавит клуб.</p>
          )}
          {site.founder.regalia.length > 0 ? (
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-ink-soft">
              {site.founder.regalia.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-ink-soft">Регалии добавит клуб.</p>
          )}
        </div>
      </section>

      <section id="coaches" className="bg-paper-2 py-12 md:py-16">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-display text-3xl md:text-4xl">Тренеры</h2>
            {coachesDoc.draft && <DraftMark />}
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {coaches.map((coach) => (
              <CoachCard key={coach.id} coach={coach} />
            ))}
          </div>
          <Link href="/coaches" className="mt-4 inline-flex text-sm font-semibold underline-offset-2 hover:underline">
            Все тренеры
          </Link>
        </div>
      </section>

      <section id="stats" className="bg-pine py-12 text-white md:py-16">
        <div className="mx-auto w-full max-w-6xl px-4">
          <h2 className="font-display text-3xl md:text-4xl">Клуб в цифрах</h2>
          <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {stats.map((item) => (
              <li key={item.label} className="rounded-3xl bg-white/10 p-4">
                <p className="font-display text-2xl md:text-3xl">{item.value}</p>
                <p className="mt-2 text-sm text-white/80">{item.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="prices" className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl md:text-4xl">Цены</h2>
          <Link href="/prices" className="text-sm font-semibold underline-offset-2 hover:underline">
            Подробнее
          </Link>
        </div>
        <div className="mt-6">
          <PriceCards />
        </div>
      </section>

      <section id="schedule" className="bg-paper-2 py-12 md:py-16">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-display text-3xl md:text-4xl">Расписание</h2>
            {scheduleDoc.draft && <DraftMark />}
          </div>
          <p className="mt-3 max-w-2xl text-sm text-ink-soft">{scheduleDoc.note}</p>
          <div className="mt-5">
            <ScheduleList rows={scheduleRows()} />
          </div>
          <Link href="/schedule" className="mt-4 inline-flex text-sm font-semibold underline-offset-2 hover:underline">
            Всё расписание
          </Link>
        </div>
      </section>

      <section id="path" className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
        <h2 className="font-display text-3xl md:text-4xl">Путь ребёнка</h2>
        <p className="mt-3 max-w-2xl text-ink-soft">Соревнования, летний лагерь и сборы в Китае. Участие по желанию, даты клуб публикует отдельно.</p>
        <ul className="mt-6 grid gap-3 md:grid-cols-3">
          {path.map((item) => (
            <li key={item.id}>
              <Link href={`/events#${item.id}`} className="block h-full rounded-3xl border border-line bg-card p-5 hover:border-ink/30">
                <h3 className="font-display text-2xl">{item.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{item.text}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="video" className="bg-paper-2 py-12 md:py-16">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-display text-3xl md:text-4xl">Видео</h2>
            {videosDoc.draft && <DraftMark />}
          </div>
          <div className="mt-6">
            <VideoGrid items={videos} />
          </div>
        </div>
      </section>

      <section id="reviews" className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
        <h2 className="font-display text-3xl md:text-4xl">Отзывы родителей</h2>
        <TrackLink href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center rounded-full bg-gold-soft px-4 text-sm font-semibold text-gold">
          Яндекс Карты · {site.reviewsCountLabel} отзывов
        </TrackLink>
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {reviews.map((review) => (
            <li key={review.name} className="rounded-3xl border border-line bg-card p-5">
              <blockquote className="text-sm leading-relaxed">{review.text}</blockquote>
              <p className="mt-3 text-sm font-semibold">{review.name}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="trust" className="bg-paper-2 py-12 md:py-16">
        <div className="mx-auto w-full max-w-6xl px-4">
          <h2 className="font-display text-3xl md:text-4xl">Доверие</h2>
          <ul className="mt-6 grid gap-3 md:grid-cols-3">
            <li className="rounded-3xl bg-card p-5">
              <h3 className="font-display text-xl">Яндекс Карты</h3>
              <p className="mt-2 text-sm text-ink-soft">{site.reviewsCountLabel} отзывов. Ссылку на карточку организации можно заменить в контенте.</p>
            </li>
            <li className="rounded-3xl bg-card p-5">
              <h3 className="font-display text-xl">Свои старты</h3>
              <p className="mt-2 text-sm text-ink-soft">Соревнования, аттестации, летний лагерь и сборы в Китае.</p>
            </li>
            <li className="rounded-3xl bg-card p-5">
              <DraftMark />
              <h3 className="mt-3 font-display text-xl">Награды и членство</h3>
              <p className="mt-2 text-sm text-ink-soft">Федерацию, награды и отметку «Хорошее место» добавим, когда клуб пришлёт подтверждение.</p>
            </li>
          </ul>
        </div>
      </section>

      <section id="quiz" className="bg-pine py-12 text-white md:py-16">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 md:grid-cols-2 md:items-start">
          <div>
            <h2 className="font-display text-3xl md:text-4xl">Подберём группу</h2>
            <p className="mt-3 max-w-md text-white/80">Возраст, направление, имя и телефон. Администратор подтвердит группу и перезвонит.</p>
          </div>
          <Quiz contacts={contacts} thankYou={site.thankYou} />
        </div>
      </section>

      <section id="faq" className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
        <h2 className="font-display text-3xl md:text-4xl">Вопросы родителей</h2>
        <div className="mt-6">
          <FaqList items={faq} />
        </div>
      </section>

      <section id="contacts" className="bg-paper-2 py-12 md:py-16">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl md:text-4xl">Контакты</h2>
            <p className="mt-3 text-ink-soft">{site.address.full}</p>
            <TrackLink href={`tel:${site.phoneTel}`} goal="phone_click" className="mt-3 inline-flex text-lg font-semibold">
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
            <SignupButton placement="contacts" className={`${buttonClass()} mt-4`}>
              Записаться
            </SignupButton>
          </div>
          <MapEmbed widgetUrl={site.mapWidgetUrl} mapsUrl={site.mapsUrl} />
        </div>
      </section>
    </>
  );
}

function BeltColumn({ title, steps }: { title: string; steps: { id: string; name: string; result: string }[] }) {
  return (
    <div>
      <h3 className="font-display text-2xl">{title}</h3>
      <ol className="mt-4 space-y-3">
        {steps.map((step, index) => (
          <li key={step.id} className="grid grid-cols-[2.5rem_1fr] gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-white/30 text-sm">{index + 1}</span>
            <span>
              <span className="block font-semibold">{step.name}</span>
              <span className="mt-1 block text-sm text-paper/70">{step.result}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
