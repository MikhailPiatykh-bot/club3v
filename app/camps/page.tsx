import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SignupButton } from "@/components/signup-button";
import { camps } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Детские спортивные лагеря",
  description: "Летний лагерь Vazuza sports camp клуба Veni Vidi Vici для детей с 6 до 16 лет. Даты смен клуб ещё назовёт.",
  path: "/camps",
});

export default function CampsPage() {
  return (
    <>
      <header className="border-b-[3px] border-ink bg-white">
        <div className="mx-auto max-w-wrap px-10 py-12 max-md:px-[18px]">
          <Breadcrumbs items={[{ name: "Главная", path: "/" }, { name: "Лагеря", path: "/camps" }]} />
          <div className="mt-6 grid items-center gap-8 lg:grid-cols-[1fr_1.05fr]">
            <div>
              <h1 className="font-display text-h1 font-black">{camps.title}</h1>
              <p className="mt-4 max-w-2xl">
                {camps.name}. Возраст {camps.ages}. {camps.place}.
              </p>
              <p className="mt-3 font-extrabold">{camps.shifts.length ? null : "Набор откроется"}</p>
              <SignupButton kind="camp" audience="child" placement="camp" className="mt-6 inline-flex h-14 items-center rounded-btn border-[2.5px] border-ink bg-orange px-5 font-black text-ink shadow-btn-main">
                Записаться в лагерь
              </SignupButton>
            </div>
            {camps.photos[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={camps.photos[0].src}
                alt={camps.photos[0].alt}
                width={1200}
                height={900}
                className="aspect-[4/3] w-full rounded-photo border-4 border-ink object-cover shadow-photo"
              />
            ) : null}
          </div>
        </div>
      </header>
      {camps.photos.length > 1 ? (
        <section className="mx-auto max-w-wrap px-10 py-12 max-md:px-[18px]">
          <h2 className="font-display text-3xl font-black">Фото прошлых смен</h2>
          <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
            {camps.photos.slice(1).map((photo) => (
              <li key={photo.src} className="overflow-hidden rounded-card border-[3px] border-ink bg-white shadow-card-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.src} alt={photo.alt} width={1200} height={900} className="aspect-[4/3] w-full object-cover" />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      <section className="mx-auto max-w-wrap px-10 py-12 max-md:px-[18px]">
        <h2 className="font-display text-3xl font-black">Почему мы</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-3">
          {camps.facts.map((fact) => (
            <li key={fact.label} className="rounded-card border-[3px] border-ink bg-white p-4 shadow-card-sm">
              <b className="font-display text-3xl">{fact.value}</b>
              <p>{fact.label}</p>
              {fact.confirm ? <span className="ph">подтвердить актуальность</span> : null}
            </li>
          ))}
        </ul>
        <ul className="mt-6 grid gap-2">
          {camps.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <a href={camps.vk} className="mt-4 inline-flex min-h-11 items-center font-black text-blue underline" target="_blank" rel="noopener noreferrer">
          Группа лагеря ВКонтакте
        </a>
      </section>
    </>
  );
}
