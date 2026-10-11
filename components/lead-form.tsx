"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import formOptions from "@/content/form.json";
import { PhoneIcon, TelegramIcon, WhatsappIcon } from "@/components/icons";
import { TrackLink } from "@/components/track-link";
import { readUtm, submitLead } from "@/components/submit-lead";
import { buttonClass } from "@/lib/styles";

type Child = { age: string; direction: string };

type Contacts = {
  phoneDisplay: string;
  phoneTel: string;
  whatsapp: string;
  telegram: string;
};

export function LeadForm({
  contacts,
  thankYou,
  placement,
  direction,
  coachId,
  coachName,
  source = "form",
  titleId,
  onClose,
}: {
  contacts: Contacts;
  thankYou: string;
  placement: string;
  direction?: string;
  coachId?: string;
  coachName?: string;
  source?: "form" | "quiz";
  titleId?: string;
  onClose?: () => void;
}) {
  const reactId = useId();
  const headingId = titleId ?? reactId;
  const pathname = usePathname();
  const renderedAt = useRef(0);
  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);
  const [parentName, setParentName] = useState("");
  const [phone, setPhone] = useState("");
  const [messenger, setMessenger] = useState("");
  const [consent, setConsent] = useState(false);
  const [fax, setFax] = useState("");
  const [children, setChildren] = useState<Child[]>([{ age: "", direction: direction ?? "" }]);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);

  function updateChild(index: number, patch: Partial<Child>) {
    setChildren((current) => current.map((child, childIndex) => (childIndex === index ? { ...child, ...patch } : child)));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (parentName.trim().length < 2) {
      setError("Напишите имя родителя.");
      return;
    }
    if (children.some((child) => !child.age || !child.direction)) {
      setError("Укажите возраст и направление для каждого ребёнка.");
      return;
    }
    if (!messenger) {
      setError("Выберите, как с вами связаться.");
      return;
    }
    if (!consent) {
      setError("Нужно согласие на обработку персональных данных.");
      return;
    }

    setPending(true);
    try {
      await submitLead(
        {
          parentName,
          phone,
          messenger,
          children,
          consent,
          coachId,
          source,
          placement,
          page: pathname,
          utm: readUtm(),
          fax,
          renderedAt: renderedAt.current,
        },
        source === "quiz" ? "quiz_submit" : "lead_submit",
      );
      setDone(true);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Не удалось отправить заявку.");
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return (
      <div>
        <h2 id={headingId} className="font-display text-3xl leading-tight">
          {thankYou}
        </h2>
        <p className="mt-3 text-ink-soft">Если удобнее, напишите сами — администратор на связи.</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <TrackLink href={contacts.whatsapp} goal="whatsapp_click" className={buttonClass()} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </TrackLink>
          <TrackLink href={contacts.telegram} goal="telegram_click" className={buttonClass("ghost")} target="_blank" rel="noopener noreferrer">
            Telegram
          </TrackLink>
          <TrackLink href={`tel:${contacts.phoneTel}`} goal="phone_click" className={buttonClass("ghost")}>
            {contacts.phoneDisplay}
          </TrackLink>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative">
      <div className="flex items-start justify-between gap-4">
        <h2 id={headingId} className="font-display text-3xl leading-tight">
          {coachName ? "Запись к тренеру" : "Запись на пробное"}
        </h2>
        {onClose && (
          <button type="button" onClick={onClose} className="min-h-11 rounded-full px-3 text-sm text-ink-soft hover:text-ink" aria-label="Закрыть">
            Закрыть
          </button>
        )}
      </div>
      {coachName && <p className="mt-2 text-sm text-ink-soft">Тренер в заявке: {coachName}</p>}
      <p className="mt-2 text-sm text-ink-soft">Администратор перезвонит и подтвердит группу.</p>

      <div className="hp" aria-hidden="true">
        <label>
          Факс
          <input value={fax} onChange={(event) => setFax(event.target.value)} tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-5 grid gap-4">
        <label className="grid gap-1 text-sm font-medium" htmlFor={`${reactId}-name`}>
          Имя родителя
          <input
            id={`${reactId}-name`}
            value={parentName}
            onChange={(event) => setParentName(event.target.value)}
            autoComplete="name"
            className="min-h-11 rounded-2xl border border-line bg-white px-3 text-base font-normal"
          />
        </label>
        <label className="grid gap-1 text-sm font-medium" htmlFor={`${reactId}-phone`}>
          Телефон
          <input
            id={`${reactId}-phone`}
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            autoComplete="tel"
            inputMode="tel"
            className="min-h-11 rounded-2xl border border-line bg-white px-3 text-base font-normal"
          />
        </label>

        {children.map((child, index) => (
          <fieldset key={`${reactId}-child-${index}`} className="grid gap-3 rounded-2xl border border-line p-3">
            <legend className="px-1 text-sm font-medium">Ребёнок {children.length > 1 ? index + 1 : ""}</legend>
            <label className="grid gap-1 text-sm" htmlFor={`${reactId}-age-${index}`}>
              Возраст
              <select
                id={`${reactId}-age-${index}`}
                value={child.age}
                onChange={(event) => updateChild(index, { age: event.target.value })}
                className="min-h-11 rounded-2xl border border-line bg-white px-3 text-base"
              >
                <option value="">Выберите возраст</option>
                {formOptions.ages.map((age) => (
                  <option key={age} value={age}>
                    {age}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-1 text-sm" htmlFor={`${reactId}-direction-${index}`}>
              Направление
              <select
                id={`${reactId}-direction-${index}`}
                value={child.direction}
                onChange={(event) => updateChild(index, { direction: event.target.value })}
                className="min-h-11 rounded-2xl border border-line bg-white px-3 text-base"
              >
                <option value="">Выберите направление</option>
                {formOptions.directions.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
            {children.length > 1 && (
              <button
                type="button"
                className="justify-self-start text-sm text-cinnabar underline-offset-2 hover:underline"
                onClick={() => setChildren((current) => current.filter((_, childIndex) => childIndex !== index))}
              >
                Убрать ребёнка
              </button>
            )}
          </fieldset>
        ))}

        {children.length < 4 && (
          <button
            type="button"
            className="justify-self-start text-sm font-semibold text-cinnabar underline-offset-2 hover:underline"
            onClick={() => setChildren((current) => [...current, { age: "", direction: direction ?? "" }])}
          >
            Добавить ещё ребёнка
          </button>
        )}

        <fieldset>
          <legend className="text-sm font-medium">Куда удобнее ответить</legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            {formOptions.messengers.map((item) => (
              <label
                key={item.id}
                className={`flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-2xl border px-3 text-sm ${messenger === item.id ? "border-ink bg-ink text-paper" : "border-line bg-white"}`}
              >
                <input
                  type="radio"
                  name={`${reactId}-messenger`}
                  value={item.id}
                  checked={messenger === item.id}
                  onChange={() => setMessenger(item.id)}
                  className="sr-only"
                />
                {item.id === "whatsapp" && <WhatsappIcon className="h-4 w-4" />}
                {item.id === "telegram" && <TelegramIcon className="h-4 w-4" />}
                {item.id === "call" && <PhoneIcon className="h-4 w-4" />}
                {item.label}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="flex items-start gap-3 text-sm leading-snug">
          <input
            type="checkbox"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            className="mt-1 h-4 w-4"
          />
          <span>
            Даю{" "}
            <a href="/consent" className="underline underline-offset-2" onClick={(event) => event.stopPropagation()}>
              согласие на обработку персональных данных
            </a>{" "}
            и ознакомился с{" "}
            <a href="/privacy" className="underline underline-offset-2" onClick={(event) => event.stopPropagation()}>
              политикой
            </a>
            .
          </span>
        </label>

        {error && (
          <p role="alert" className="text-sm text-cinnabar">
            {error}
          </p>
        )}

        <button type="submit" className={buttonClass()} disabled={pending}>
          {pending ? "Отправляем…" : "Отправить заявку"}
        </button>
        <noscript>
          <p className="text-sm text-ink-soft">Чтобы отправить заявку, включите JavaScript или позвоните {contacts.phoneDisplay}.</p>
        </noscript>
      </div>
    </form>
  );
}
