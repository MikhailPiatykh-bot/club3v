import Link from "next/link";
import { ChampionCards } from "@/components/champion-cards";
import { FaqList } from "@/components/faq-list";
import { HomeSchedule } from "@/components/home-schedule";
import { MapEmbed } from "@/components/map-embed";
import { MessengerLinks } from "@/components/messengers";
import { Quiz } from "@/components/quiz";
import { SignupButton } from "@/components/signup-button";
import { TrackLink } from "@/components/track-link";
import { VideoGrid } from "@/components/video-grid";
import {
  ageGroups,
  belts,
  championsDoc,
  faq,
  coaches,
  comparison,
  directions,
  lessonPlan,
  motivation,
  offer,
  prices,
  reviewsDoc,
  sectionLabel,
  site,
  stats,
  upcomingEvents,
  videos,
} from "@/lib/content";
import { formatRub, largeFamilyPrice } from "@/lib/money";
import { scheduleRows } from "@/lib/schedule-rows";

const tint: Record<string, string> = {
  sun: "bg-tint-sun",
  mint: "bg-tint-mint",
  pink: "bg-tint-pink",
  blue: "bg-tint-blue",
};

const directionCards = [directions.wushu, directions.acrobatics, directions.breakdance, directions.group3];

export function HomeView() {
  const family = largeFamilyPrice(prices.subscription, prices.largeFamilyDiscountPercent);
  const rows = scheduleRows();
  const nextEvents = upcomingEvents();
  const featured = championsDoc.items.filter((item) => item.featured && item.consent);
  const motivationOn = motivation.effortPatches || motivation.yearEndUniform;
  const yandexItems = reviewsDoc.yandex.items.filter((item) => item.visible);

  return (
    <div className="pb-24 md:pb-0">
      <section className="relative overflow-hidden bg-cream">
        <div className="pointer-events-none absolute -left-20 bottom-0 h-[420px] w-[420px] rounded-full bg-[#FFE17A] max-md:hidden" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-16 -top-10 h-[360px] w-[360px] rounded-full bg-blue-pale max-md:hidden" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-wrap items-center gap-8 px-6 py-16 max-md:px-[18px] max-md:py-10 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] xl:px-10">
          <div className="min-w-0">
            <p className="inline-flex rounded-pill bg-pink px-3.5 py-1.5 text-[12px] font-extrabold uppercase tracking-[0.12em] text-white">{site.hero.kicker}</p>
            <h1 className="mt-4 max-w-full font-display text-h1 font-black text-ink">
              Ушу и акробатика для детей <span className="marker text-pink">с 3 лет в СЗАО</span>
            </h1>
            <p className="mt-4 max-w-xl text-[19px] font-bold max-md:text-base">{site.hero.subtitle}</p>
            <Link href="/adults" className="mt-3 inline-flex min-h-11 items-center font-extrabold text-blue underline">
              {site.hero.adults}
              {"\u00A0→"}
            </Link>
            <div className="mt-5 flex w-fit max-w-xl flex-wrap items-center gap-3 rounded-rate border-[3px] border-ink bg-white p-3 shadow-rate">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#FC3F1D] font-black text-white">Я</span>
              <span>
                <b>
                  <span className="ph">оценка X,X</span> · {reviewsDoc.yandex.countLabel} отзывов
                </b>
                <span className="mt-1 block text-sm">Мест в группах: <span className="ph">число подтвердит клуб</span></span>
              </span>
            </div>
          </div>
          <div className="relative">
            <div className="stripes grid min-h-64 rotate-3 place-items-center rounded-photo border-4 border-ink p-6 text-center font-black text-white shadow-photo max-md:min-h-[170px] max-md:rotate-0 max-md:rounded-[26px] max-md:shadow-card">
              {site.hero.mediaAlt}
            </div>
            <article className="relative z-10 -mt-10 rounded-offer border-[3px] border-ink bg-white p-6 shadow-offer max-md:mt-4 xl:-ml-8 xl:max-w-[430px]">
              <p className="text-[11.5px] font-extrabold uppercase tracking-[0.14em] text-pink">{offer.eyebrow}</p>
              <h2 className="mt-2 font-display text-[38px] font-black leading-none max-md:text-[30px]">{offer.title}</h2>
              <p className="mt-3 text-base text-ink-2">{offer.text}</p>
              <ul className="mt-4 grid gap-2 text-[15px] font-bold">
                {offer.bullets.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full bg-mint text-xs font-black text-ink">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <SignupButton placement="hero" className="mt-4 flex h-14 w-full items-center justify-center rounded-btn border-[2.5px] border-ink bg-orange font-black text-ink shadow-btn-main">
                {offer.cta}
              </SignupButton>
              <Link href={offer.guaranteeHref} className="mt-3 inline-flex min-h-11 items-center font-extrabold text-blue underline">
                {offer.guaranteeLabel}
              </Link>
              <p className="mt-2 text-sm">
                <span className="ph">{offer.conditionsNote}</span>
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="why" className="mx-auto max-w-wrap px-10 py-24 max-md:px-[18px] max-md:py-14">
        <p className="inline-flex rounded-pill bg-ink px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-white">{sectionLabel("tasks")}</p>
        <h2 className="mt-4 max-w-3xl font-display text-h2 font-black">{site.why.title}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {site.why.cards.map((card) => (
            <article key={card.problem} className="rounded-card border-[3px] border-ink bg-white p-6 shadow-card">
              <h3 className="font-display text-2xl font-black">{card.problem}</h3>
              <p className="mt-2 text-ink-2">{card.help}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 max-w-3xl font-bold">{site.why.summary}</p>
        <h3 className="mt-10 font-display text-3xl font-black">{comparison.title}</h3>
        <p className="mt-2">
          <span className="ph">{comparison.note}</span>
        </p>
        <div className="mt-4 grid gap-3 md:hidden">
          {comparison.pairs.map((pair) => (
            <article key={pair.usual} className="rounded-card border-[3px] border-ink bg-white p-4">
              <p className="text-sm text-ink-soft">Обычно: {pair.usual}</p>
              <p className="mt-1 font-extrabold">У нас: {pair.ours}</p>
              {pair.confirm ? <span className="ph">подтвердить</span> : null}
            </article>
          ))}
        </div>
        <table className="mt-4 hidden w-full border-separate border-spacing-0 overflow-hidden rounded-card border-[3px] border-ink bg-white md:table">
          <thead>
            <tr className="bg-ink text-left text-white">
              <th className="p-4">Обычная секция</th>
              <th className="p-4">Veni Vidi Vici</th>
            </tr>
          </thead>
          <tbody>
            {comparison.pairs.map((pair) => (
              <tr key={pair.usual} className="border-t border-ink/20">
                <td className="border-t border-ink/15 p-4">{pair.usual}</td>
                <td className="border-t border-ink/15 p-4 font-extrabold">
                  {pair.ours} {pair.confirm ? <span className="ph">подтвердить</span> : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section id="dir" className="bg-white py-24 max-md:py-14">
        <div className="mx-auto max-w-wrap px-10 max-md:px-[18px]">
          <p className="inline-flex rounded-pill bg-ink px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-white">{sectionLabel("directions")}</p>
          <h2 className="mt-4 font-display text-h2 font-black">Направления</h2>
          <h3 className="mt-8 font-display text-3xl font-black">Детям</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {directionCards.map((card) => (
              <article key={card.href} className="rounded-card border-[3px] border-ink bg-cream p-5 shadow-card">
                <div className="stripes mb-4 grid h-36 place-items-center rounded-2xl text-center text-sm font-black text-white">Фото даст клуб</div>
                <h3 className="font-display text-2xl font-black">{card.nav}</h3>
                <p className="mt-2 text-sm">{card.card}</p>
                <p className="mt-2 text-sm font-extrabold">{card.ages}</p>
                <Link href={card.href} className="mt-3 inline-flex min-h-11 items-center font-black text-blue underline">
                  Подробнее
                </Link>
              </article>
            ))}
          </div>
          <h3 className="mt-10 font-display text-3xl font-black">Взрослым</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <article className="rounded-card border-[3px] border-ink bg-white p-5 shadow-card">
              <h3 className="font-display text-2xl font-black">Айкидо</h3>
              <p className="mt-2">Группа по выходным. Дни и цену клуб ещё назовёт.</p>
              <Link href="/adults#aikido" className="mt-3 inline-flex min-h-11 items-center font-black text-blue underline">
                Подробнее
              </Link>
            </article>
            <article className="rounded-card border-[3px] border-ink bg-white p-5 shadow-card">
              <span className="rounded-pill border-2 border-ink bg-sun px-2 py-0.5 text-xs font-black">Идёт набор</span>
              <h3 className="mt-2 font-display text-2xl font-black">Ушу для взрослых</h3>
              <p className="mt-2">Предварительная запись, пока нет даты старта.</p>
              <SignupButton kind="waitlist" audience="adult" direction="wushu-adult" placement="direction" className="mt-3 inline-flex h-12 items-center rounded-btn border-[2.5px] border-ink bg-orange px-4 font-black text-ink shadow-btn-main">
                Записаться в группу
              </SignupButton>
            </article>
          </div>
        </div>
      </section>

      <section className="border-y-[3px] border-ink bg-white py-24 max-md:py-14">
        <div className="mx-auto max-w-wrap px-10 max-md:px-[18px]">
          <p className="inline-flex rounded-pill bg-ink px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-white">{sectionLabel("ages")}</p>
          <h2 className="mt-4 font-display text-h2 font-black">
            Своя программа
            <br />
            <span className="text-pink">для каждого возраста.</span>
          </h2>
          <p className="mt-3 max-w-2xl text-sm">
            <span className="ph">{ageGroups.note}</span>
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {ageGroups.items.map((card) => (
              <article key={card.id} className={`flex min-h-[420px] flex-col rounded-card border-[3px] border-ink p-6 shadow-card max-md:shadow-card-sm ${tint[card.tint]}`}>
                <span className="grid h-[34px] w-[34px] place-items-center rounded-full bg-ink text-sm font-black text-white">{card.number}</span>
                <p className="mt-4 font-display text-[52px] font-black leading-none max-md:text-[42px]">{card.ages}</p>
                <p className="mt-1 text-sm">
                  <span className="ph">{card.agesNote}</span>
                </p>
                <h3 className="mt-4 font-display text-[22px] font-extrabold">{card.title}</h3>
                <p className="mt-2 text-[14.5px] text-ink-3">{card.text}</p>
                <div className="mt-auto border-t-2 border-dashed border-ink/40 pt-3 text-sm font-extrabold">
                  Занятие <span className="ph">N мин</span> · группа <span className="ph">N человек</span>
                  <Link href={card.scheduleHref} className="mt-2 block text-blue underline">
                    Расписание этой группы →
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <Link href="/adults" className="mt-6 inline-flex min-h-11 items-center font-black text-blue underline">
            Взрослым: айкидо и ушу, идёт набор →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-wrap px-10 py-24 max-md:px-[18px] max-md:py-14">
        <p className="inline-flex rounded-pill bg-ink px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-white">{sectionLabel("lessons")}</p>
        <h2 className="mt-4 font-display text-h2 font-black">Как проходит занятие</h2>
        <p className="mt-2">
          <span className="ph">Состав и минуты клуб ещё подтвердит.</span>
        </p>
        <ol className="mt-6 grid gap-3 md:grid-cols-4">
          {lessonPlan.parts.map((part) => (
            <li key={part.id} className="rounded-card border-[3px] border-ink bg-white p-4 shadow-card-sm">
              <b>{part.title}</b>
              <p className="text-sm">
                <span className="ph">{part.minutes ? `${part.minutes} мин` : "N мин"}</span>
              </p>
            </li>
          ))}
        </ol>
        <h3 className="mt-10 font-display text-3xl font-black">Как проходит первая тренировка</h3>
        <ol className="mt-4 grid gap-3 md:grid-cols-4">
          {lessonPlan.first.map((step, index) => (
            <li key={step} className="rounded-card border-[3px] border-ink bg-cream p-4">
              <span className="font-display text-2xl font-black">{index + 1}</span>
              <p className="mt-2 font-extrabold">{step}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 font-bold">{lessonPlan.firstNote}</p>
        <SignupButton placement="direction" className="mt-4 inline-flex h-14 items-center rounded-btn border-[2.5px] border-ink bg-orange px-6 font-black text-ink shadow-btn-main">
          Записаться
        </SignupButton>
      </section>

      <section className="bg-blue-mist py-24 max-md:py-14">
        <div className="mx-auto max-w-wrap px-10 max-md:px-[18px]">
          <p className="inline-flex rounded-pill bg-ink px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-white">{sectionLabel("progress")}</p>
          <h2 className="mt-4 font-display text-h2 font-black">Видимый прогресс</h2>
          <p className="mt-2">
            <span className="ph">{belts.note}</span>
          </p>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <BeltList title="Ушу" items={belts.wushu} />
            <BeltList title="Акробатика" items={belts.acrobatics} />
          </div>
        </div>
      </section>

      <section className="bg-ink py-24 text-white max-md:py-14">
        <div className="mx-auto max-w-wrap px-10 max-md:px-[18px]">
          <p className="inline-flex rounded-pill bg-sun px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-ink">{sectionLabel("progress")}</p>
          <div className="mt-4 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <h2 className="font-display text-h2 font-black text-white">
              Наши чемпионы
              <br />
              <span className="text-sun">растут в клубе.</span>
            </h2>
            <p className="text-[#D6D8F5]">{championsDoc.note}</p>
          </div>
          {featured.length ? (
            <ChampionCards items={featured} />
          ) : (
            <p className="mt-6">
              <span className="ph">Карточки появятся, когда будут согласия на имя и фото.</span>
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <SignupButton placement="champions" className="inline-flex h-14 items-center rounded-btn border-[2.5px] border-ink bg-orange px-6 font-black text-ink shadow-btn-main">
              Записаться
            </SignupButton>
            <Link href="/champions" className="inline-flex h-14 items-center rounded-btn border-[2.5px] border-white px-6 font-black text-white shadow-on-ink">
              Весь зал славы
            </Link>
          </div>
        </div>
      </section>

      {motivationOn ? (
        <section className="mx-auto max-w-wrap px-10 py-16 max-md:px-[18px]">
          <h2 className="font-display text-3xl font-black">Ещё мотивация</h2>
          {motivation.effortPatches ? <p className="mt-3">{motivation.patchesText}</p> : null}
          {motivation.yearEndUniform ? <p className="mt-3">{motivation.uniformText}</p> : null}
        </section>
      ) : null}

      <section className="mx-auto max-w-wrap px-10 py-24 max-md:px-[18px] max-md:py-14">
        <p className="inline-flex rounded-pill bg-ink px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-white">{sectionLabel("coaches")}</p>
        <h2 className="mt-4 font-display text-h2 font-black">
          Люди, которые помогают
          <br />
          <span className="text-pink">полюбить спорт.</span>
        </h2>
        <p className="mt-4 max-w-xl text-ink-2">{coaches.length ? "Тренеры клуба «Veni Vidi Vici»: внимание к каждому ребёнку, посильная нагрузка и интерес к занятиям." : null}</p>
        <article className="mt-8 max-w-xl rounded-card border-[3px] border-ink bg-white p-5 shadow-card">
          <h3 className="font-display text-2xl font-black">{site.founder.name}</h3>
          <p>{site.founder.role}</p>
          <p className="mt-2 text-sm">
            <span className="ph">Фото, регалии и цитата ещё не присланы.</span>
          </p>
        </article>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {coaches.map((coach) => (
            <article key={coach.id} className="overflow-hidden rounded-card border-[3px] border-ink bg-white shadow-card">
              <div className="grid aspect-[3/4] place-items-center bg-blue text-center font-black text-white">Силуэт · единый фон</div>
              <div className="border-t-[3px] border-ink p-4">
                <h3 className="font-display text-xl font-extrabold">{coach.name}</h3>
                <p className="mt-1 text-sm">{coach.title}</p>
                <p className="mt-2 text-sm font-extrabold">
                  {coach.audience === "adult" ? "Взрослые" : "Дети"} · {coach.days} · {coach.time}
                </p>
                <SignupButton
                  placement="coach"
                  kind={coach.direction === "wushu-adult" ? "waitlist" : "coach"}
                  audience={coach.audience === "adult" ? "adult" : "child"}
                  direction={coach.direction}
                  coachId={coach.id}
                  coachName={coach.name}
                  goal="coach_signup"
                  className="mt-3 flex h-12 w-full items-center justify-center rounded-btn border-[2.5px] border-ink bg-white font-black shadow-btn-alt"
                >
                  Записаться к тренеру
                </SignupButton>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="price" className="bg-white py-24 max-md:py-14">
        <div className="mx-auto max-w-wrap px-10 max-md:px-[18px]">
          <p className="inline-flex rounded-pill bg-ink px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-white">{sectionLabel("prices")}</p>
          <h2 className="mt-4 font-display text-h2 font-black">Клуб в цифрах</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <li key={item.label} className="rounded-card border-[3px] border-ink bg-cream p-4 shadow-card-sm">
                <b className="font-display text-3xl font-black">{item.value}</b>
                <p>{item.label}</p>
              </li>
            ))}
          </ul>
          <h3 className="mt-10 font-display text-3xl font-black">Цены</h3>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <article className="rounded-card border-[3px] border-ink bg-sun p-6 shadow-card">
              <h3 className="font-display text-3xl font-black">{prices.subscriptionCard.title}</h3>
              <p className="mt-2 font-display text-5xl font-black">{formatRub(prices.subscription)}</p>
              <p className="mt-2">{prices.subscriptionCard.note}</p>
              <p className="mt-2 font-extrabold">
                Многодетным −{prices.largeFamilyDiscountPercent}%: {formatRub(family)}
              </p>
              <p className="mt-2 text-sm">{prices.seatsNote}</p>
            </article>
            <article className="rounded-card border-[3px] border-ink bg-white p-6 shadow-card">
              <h3 className="font-display text-2xl font-black">Взрослым</h3>
              <p className="mt-2">{prices.adultsNote}</p>
              <p className="mt-3">
                <span className="ph">{prices.friend.title}: {prices.friend.note}</span>
              </p>
            </article>
          </div>
          <h3 className="mt-10 font-display text-3xl font-black">Расписание</h3>
          <div className="mt-4">
            <HomeSchedule rows={rows} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-wrap px-10 py-24 max-md:px-[18px] max-md:py-14">
        <p className="inline-flex rounded-pill bg-ink px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-white">{sectionLabel("progress")}</p>
        <h2 className="mt-4 font-display text-h2 font-black">Мероприятия, сборы и лагеря</h2>
        <p className="mt-2">Соревнования, потом лагерь, потом сборы в Китае.</p>
        <h3 className="mt-6 font-display text-2xl font-black">Ближайшие мероприятия</h3>
        {nextEvents.length ? (
          <ul className="mt-3 grid gap-3">
            {nextEvents.slice(0, 3).map((item) => (
              <li key={item.id} className="rounded-card border-[3px] border-ink bg-white p-4">
                {item.dateText} · {item.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3">Расписание турниров уточняется.</p>
        )}
        <TrackLink href="/events" goal="calendar_all" className="mt-3 inline-flex min-h-11 items-center font-black text-blue underline">
          Весь календарь
        </TrackLink>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <article className="rounded-card border-[3px] border-ink bg-white p-5 shadow-card">
            <h3 className="font-display text-2xl font-black">Сборы в Китае</h3>
            <p className="mt-2">Набор на следующие сборы. Даты клуб ещё назовёт.</p>
            <Link href="/china-camp" className="mt-3 inline-flex min-h-11 items-center font-black text-blue underline">
              Подробнее
            </Link>
            <SignupButton kind="china" placement="china" className="mt-3 inline-flex h-12 items-center rounded-btn border-[2.5px] border-ink bg-orange px-4 font-black text-ink shadow-btn-main">
              Записаться на сборы
            </SignupButton>
          </article>
          <article className="rounded-card border-[3px] border-ink bg-white p-5 shadow-card">
            <h3 className="font-display text-2xl font-black">Детские спортивные лагеря</h3>
            <p className="mt-2">Набор откроется, когда клуб назовёт смены.</p>
            <Link href="/camps" className="mt-3 inline-flex min-h-11 items-center font-black text-blue underline">
              Подробнее
            </Link>
            <SignupButton kind="camp" audience="child" placement="camp" className="mt-3 inline-flex h-12 items-center rounded-btn border-[2.5px] border-ink bg-orange px-4 font-black text-ink shadow-btn-main">
              Записаться в лагерь
            </SignupButton>
          </article>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-wrap px-10 max-md:px-[18px]">
          <h2 className="font-display text-h2 font-black">Видео</h2>
          <div className="mt-6">
            <VideoGrid items={videos} />
          </div>
        </div>
      </section>

      <section id="rev" className="bg-blue-mist py-24 max-md:py-14">
        <div className="mx-auto max-w-wrap px-10 max-md:px-[18px]">
          <p className="inline-flex rounded-pill bg-ink px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-white">{sectionLabel("trust")}</p>
          <h2 className="mt-4 font-display text-h2 font-black">Отзывы</h2>
          <a href={reviewsDoc.yandex.url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-3 rounded-rate border-[3px] border-ink bg-white p-4 shadow-rate">
            <span className="grid h-12 w-12 place-items-center rounded-lg bg-[#FC3F1D] font-black text-white">Я</span>
            <span>
              <b className="font-display text-3xl">{reviewsDoc.yandex.countLabel}</b>
              <span className="block text-sm">отзывов на Яндекс Картах · оценка <span className="ph">X,X</span></span>
            </span>
          </a>
          {yandexItems.length ? null : (
            <p className="mt-4">
              <span className="ph">Слайдер включится, когда Михаил выберет отзывы: имя, дата, оценка, текст и ссылка на Яндекс. Выдуманные отзывы не публикуем.</span>
            </p>
          )}
          <a href={reviewsDoc.yandex.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center font-black text-blue underline">
            Все отзывы на Яндекс Картах
          </a>
          <div className="mt-10 max-w-3xl">
            <h2 className="font-display text-3xl font-black">Наши каналы</h2>
            <p className="mt-2">Новости клуба, расписание турниров, фото и видео с тренировок.</p>
            {site.channels.telegram || site.channels.max ? <MessengerLinks channel className="mt-4" /> : <p className="mt-3"><span className="ph">Ссылки на Telegram-канал и канал в MAX клуб ещё пришлёт. Карточки скрыты, пока ссылок нет.</span></p>}
            <a href={site.channels.vk} className="mt-3 inline-flex min-h-11 items-center font-black text-blue underline" target="_blank" rel="noopener noreferrer">
              ВКонтакте
            </a>
          </div>
        </div>
      </section>

      <section id="quiz" className="mx-auto grid max-w-wrap gap-8 px-10 py-24 max-md:px-[18px] max-md:py-14 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-h2 font-black">Подберём группу</h2>
          <p className="mt-3">Четыре шага: для кого, возраст, направление, контакты. Для взрослого возраст ребёнка не спрашиваем.</p>
        </div>
        <Quiz />
      </section>

      <section className="mx-auto max-w-wrap px-10 pb-16 max-md:px-[18px]">
        <h2 className="font-display text-h2 font-black">Вопросы</h2>
        <div className="mt-6">
          <FaqList items={faq} />
        </div>
      </section>

      <section className="bg-blue-mist px-10 py-16 max-md:px-[18px]">
        <div className="relative mx-auto max-w-wrap overflow-hidden rounded-cta border-4 border-ink bg-blue p-10 text-white shadow-cta max-md:rounded-[30px] max-md:p-6 max-md:shadow-card">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-deep" aria-hidden="true" />
          <p className="relative inline-flex rounded-pill bg-sun px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-ink">{sectionLabel("start")}</p>
          <div className="relative mt-4 grid items-end gap-6 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 className="font-display text-[clamp(2.375rem,1.6rem+2.4vw,4.75rem)] font-black leading-[1.04] text-white">
                {offer.finalTitleLead}
                <br />
                <span className="text-sun">{offer.finalTitleAccent}</span>
              </h2>
              <p className="mt-4 max-w-xl text-[#EEF2FF]">{offer.finalText}</p>
            </div>
            <SignupButton placement="footer" className="inline-flex h-16 items-center rounded-btn border-[3px] border-ink bg-sun px-6 font-black uppercase text-ink shadow-[0_6px_0_#1D1A5E]">
              Записаться →
            </SignupButton>
          </div>
        </div>
      </section>

      <section id="cont" className="mx-auto grid max-w-wrap gap-8 px-10 py-16 max-md:px-[18px] lg:grid-cols-2">
        <div>
          <h2 className="font-display text-h2 font-black">Контакты</h2>
          <p className="mt-3 font-extrabold">{site.address.full}</p>
          <TrackLink href={`tel:${site.phoneTel}`} goal="phone_click" className="mt-2 inline-flex font-display text-2xl font-black">
            {site.phoneDisplay}
          </TrackLink>
          <MessengerLinks className="mt-4" />
          <ul className="mt-4 grid gap-2 text-sm">
            {site.metro.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </div>
        <MapEmbed widgetUrl={site.mapWidgetUrl} mapsUrl={site.mapsUrl} />
      </section>
    </div>
  );
}

function BeltList({ title, items }: { title: string; items: { id: string; name: string; result: string }[] }) {
  return (
    <div>
      <h3 className="font-display text-2xl font-black">{title}</h3>
      <ol className="mt-3 grid gap-2">
        {items.map((item) => (
          <li key={item.id} className="rounded-card border-[3px] border-ink bg-white p-3">
            <b>{item.name}</b>
            <p className="text-sm">{item.result}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
