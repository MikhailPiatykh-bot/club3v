import dynamic from "next/dynamic";
import Image from "next/image";
import { DraftMark } from "@/components/draft-mark";
import { SignupButton } from "@/components/signup-button";
import { TrackLink } from "@/components/track-link";
import { site } from "@/lib/content";
import { buttonClass } from "@/lib/styles";

const HeroVideo = dynamic(() => import("@/components/hero-video"));

export function Hero() {
  const { hero, address, reviewsCountLabel, mapsUrl } = site;

  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(243 238 230 / 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgb(243 238 230 / 0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-8 px-4 py-8 md:py-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-soft">{address.district}</p>
          <h1 className="mt-3 max-w-3xl font-display text-[1.85rem] leading-[1.12] md:text-5xl">{hero.h1}</h1>
          <p className="mt-4 max-w-xl text-base text-paper/80 md:text-lg">{hero.subtitle}</p>
          <ul className="mt-5 grid gap-2 text-sm text-paper/90">
            {hero.advantages.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cinnabar" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <SignupButton placement="hero" className={buttonClass()}>
              Записаться на пробное
            </SignupButton>
            <p className="max-w-xs text-sm text-paper/75">{hero.trialResult}</p>
          </div>
          <TrackLink
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-white/10 px-3 text-sm"
          >
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-gold-soft" />
            Яндекс Карты · {reviewsCountLabel} отзывов
          </TrackLink>
          <p className="mt-4 text-base font-semibold md:text-sm">{address.street}</p>
          <p className="text-base md:text-sm">Абонемент 9&nbsp;000&nbsp;₽ в месяц</p>
        </div>
        <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/5">
          <HeroMedia />
          <div className="relative flex min-h-80 flex-col justify-between gap-8 p-6">
            <div className="flex items-start justify-between gap-4">
              <p className="font-display text-4xl leading-none">с 3 лет</p>
              <span className="grid h-16 w-16 place-items-center rounded-full border border-white/40 text-xs font-semibold tracking-widest">
                3V
              </span>
            </div>
            <div>
              {!hero.media.image && !hero.media.video && <DraftMark>Фото зала добавит клуб</DraftMark>}
              <p className="mt-3 font-display text-2xl">Ушу и акробатика</p>
              <p className="mt-2 text-sm text-paper/75">{address.full}</p>
              <p className="mt-3 text-lg">9&nbsp;000&nbsp;₽ / мес · многодетным −11%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroMedia() {
  const media = site.hero.media;
  if (media.video) return <HeroVideo src={media.video} poster={media.poster} />;
  if (media.image) {
    return (
      <Image
        src={media.image}
        alt={media.imageAlt}
        width={media.width}
        height={media.height}
        priority
        sizes="(min-width: 1024px) 520px, 100vw"
        className="absolute inset-0 h-full w-full object-cover"
      />
    );
  }
  return null;
}
