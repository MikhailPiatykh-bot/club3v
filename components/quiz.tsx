"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import formOptions from "@/content/form.json";
import { TrackLink } from "@/components/track-link";
import { readUtm, submitLead } from "@/components/submit-lead";
import { buttonClass } from "@/lib/styles";

type Contacts = {
  phoneDisplay: string;
  phoneTel: string;
  whatsapp: string;
  telegram: string;
};

export function Quiz({ contacts, thankYou }: { contacts: Contacts; thankYou: string }) {
  const pathname = usePathname();
  const renderedAt = useRef(0);
  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);
  const [step, setStep] = useState(0);
  const [age, setAge] = useState("");
  const [direction, setDirection] = useState("");
  const [parentName, setParentName] = useState("");
  const [phone, setPhone] = useState("");
  const [messenger, setMessenger] = useState("call");
  const [consent, setConsent] = useState(false);
  const [fax, setFax] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent) {
      setError("Нужно согласие на обработку персональных данных.");
      return;
    }
    setPending(true);
    setError("");
    try {
      await submitLead(
        {
          parentName,
          phone,
          messenger,
          children: [{ age, direction }],
          consent,
          source: "quiz",
          placement: "quiz",
          page: pathname,
          utm: readUtm(),
          fax,
          renderedAt: renderedAt.current,
        },
        "quiz_submit",
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
      <div className="rounded-3xl bg-card p-5 text-ink">
        <h3 className="font-display text-2xl">{thankYou}</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          <TrackLink href={contacts.whatsapp} goal="whatsapp_click" className={buttonClass()} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </TrackLink>
          <TrackLink href={contacts.telegram} goal="telegram_click" className={buttonClass("ghost")} target="_blank" rel="noopener noreferrer">
            Telegram
          </TrackLink>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-card p-5 text-ink">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cinnabar">Шаг {step + 1} из 3</p>
      {step === 0 && (
        <div>
          <h3 className="mt-2 font-display text-2xl">Сколько лет ребёнку?</h3>
          <div className="mt-4 grid gap-2">
            {formOptions.quizAges.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={age === item.label}
                className={`min-h-11 rounded-2xl border px-4 text-left ${age === item.label ? "border-ink bg-ink text-paper" : "border-line"}`}
                onClick={() => {
                  setAge(item.label);
                  setStep(1);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
      {step === 1 && (
        <div>
          <h3 className="mt-2 font-display text-2xl">Какое направление ближе?</h3>
          <div className="mt-4 grid gap-2">
            {formOptions.directions.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={direction === item.id}
                className={`min-h-11 rounded-2xl border px-4 text-left ${direction === item.id ? "border-ink bg-ink text-paper" : "border-line"}`}
                onClick={() => {
                  setDirection(item.id);
                  setStep(2);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button type="button" className="mt-4 text-sm underline-offset-2 hover:underline" onClick={() => setStep(0)}>
            Назад
          </button>
        </div>
      )}
      {step === 2 && (
        <form onSubmit={onSubmit} noValidate className="relative">
          <h3 className="mt-2 font-display text-2xl">Куда перезвонить?</h3>
          <p className="mt-2 text-sm text-ink-soft">
            {age}, {formOptions.directions.find((item) => item.id === direction)?.label}. Администратор подтвердит группу.
          </p>
          <div className="hp" aria-hidden="true">
            <label>
              Факс
              <input value={fax} onChange={(event) => setFax(event.target.value)} tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <div className="mt-4 grid gap-3">
            <label className="grid gap-1 text-sm font-medium">
              Имя родителя
              <input value={parentName} onChange={(event) => setParentName(event.target.value)} autoComplete="name" className="min-h-11 rounded-2xl border border-line bg-white px-3 text-base font-normal" />
            </label>
            <label className="grid gap-1 text-sm font-medium">
              Телефон
              <input value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" inputMode="tel" className="min-h-11 rounded-2xl border border-line bg-white px-3 text-base font-normal" />
            </label>
            <fieldset>
              <legend className="text-sm font-medium">Как связаться</legend>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {formOptions.messengers.map((item) => (
                  <label key={item.id} className={`flex min-h-11 items-center justify-center rounded-2xl border text-sm ${messenger === item.id ? "border-ink bg-ink text-paper" : "border-line"}`}>
                    <input type="radio" name="quiz-messenger" value={item.id} checked={messenger === item.id} onChange={() => setMessenger(item.id)} className="sr-only" />
                    {item.label}
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="flex items-start gap-3 text-sm">
              <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-1 h-4 w-4" />
              <span>
                Даю <a href="/consent" className="underline underline-offset-2">согласие</a> и ознакомился с <a href="/privacy" className="underline underline-offset-2">политикой</a>.
              </span>
            </label>
            {error && <p role="alert" className="text-sm text-cinnabar">{error}</p>}
            <button type="submit" className={buttonClass()} disabled={pending}>
              {pending ? "Отправляем…" : "Подобрать группу"}
            </button>
            <button type="button" className="text-sm underline-offset-2 hover:underline" onClick={() => setStep(1)}>
              Назад
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
