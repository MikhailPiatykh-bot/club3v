import Link from "next/link";
import { buttonClass } from "@/lib/styles";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-20">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cinnabar">404</p>
      <h1 className="mt-3 font-display text-4xl">Такой страницы нет</h1>
      <p className="mt-3 max-w-xl text-ink-soft">Проверьте адрес или откройте расписание, цены и контакты.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/" className={buttonClass()}>
          На главную
        </Link>
        <Link href="/schedule" className={buttonClass("ghost")}>
          Расписание
        </Link>
        <Link href="/contacts" className={buttonClass("ghost")}>
          Контакты
        </Link>
      </div>
    </div>
  );
}
