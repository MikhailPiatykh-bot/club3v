import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SignupButton } from "@/components/signup-button";
import { rent, site } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Аренда спортивного зала в СЗАО",
  description: "Аренда зала клуба Veni Vidi Vici на пр-те Маршала Жукова, 51. Свободное время и цену часа подтверждает администратор.",
  path: "/rent",
});

export default function RentPage() {
  return (
    <>
      <header className="border-b-[3px] border-ink bg-white">
        <div className="mx-auto max-w-wrap px-10 py-12 max-md:px-[18px]">
          <Breadcrumbs items={[{ name: "Главная", path: "/" }, { name: "Аренда зала", path: "/rent" }]} />
          <h1 className="mt-4 font-display text-h1 font-black">{rent.title}</h1>
          <p className="mt-4 font-extrabold">{site.address.full}</p>
          <p className="mt-3">Свободное время уточняйте. Цену часа публикуем после подтверждения, что она относится к этому залу.</p>
          <SignupButton kind="rent" placement="rent" className="mt-6 inline-flex h-14 items-center rounded-btn border-[2.5px] border-ink bg-orange px-5 font-black text-ink shadow-btn-main">
            Узнать свободное время
          </SignupButton>
        </div>
      </header>
      <section className="mx-auto grid max-w-wrap gap-8 px-10 py-12 max-md:px-[18px] md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-black">Зал</h2>
          <p className="mt-3">
            <span className="ph">{rent.areaNote}</span>
          </p>
          <p className="mt-3">{rent.floor}</p>
          <p className="mt-3">
            <span className="ph">На старом сайте час утром и днём стоил {rent.oldDayPrice} ₽, вечер {rent.oldEveningPrice} ₽. Пока не подтверждено, в цену страницы это не ставим.</span>
          </p>
        </div>
        <div>
          <h2 className="font-display text-3xl font-black">Оборудование</h2>
          <ul className="mt-3 list-disc pl-5">
            {rent.equipment.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h2 className="mt-6 font-display text-2xl font-black">Инфраструктура</h2>
          <ul className="mt-3 list-disc pl-5">
            {rent.amenities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h2 className="mt-6 font-display text-2xl font-black">Для каких занятий</h2>
          <p className="mt-3">{rent.activities.join(", ")}.</p>
        </div>
      </section>
    </>
  );
}