"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import formOptions from "@/content/form.json";
import { TrackLink } from "@/components/track-link";
import { readUtm, submitLead } from "@/components/submit-lead";

type Contacts = {
  phoneDisplay: string;
  phoneTel: string;
  whatsapp: string;
  telegram: string;
};

const times = ["Пн · Пт · Вс", "Вт · Чт", "Выходные", "Подберём вместе"];

export function Quiz({ contacts, thankYou }: { contacts: Contacts; thankYou: string }) {
  const pathname = usePathname();
  const renderedAt = useRef(0);
  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);
  const [step, setStep] = useState(0);
  const [age, setAge] = useState(formOptions.quizAges[0]?.label ?? "");
  const [direction, setDirection] = useState("");
  const [time, setTime] = useState("");
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
          preferredTime: time,
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

  const progress = [25, 50, 75, 100][step] ?? 25;
  const titles = ["Сколько лет ребёнку?", "Какое направление ближе?", "Когда удобно заниматься?", "Как с вами связаться?"];

  if (done) {
    return (
      <div>
        <div className="q">{thankYou}</div>
        <p className="lead">Администратор подберёт группу и перезвонит.</p>
        <div className="qnav">
          <TrackLink href={contacts.whatsapp} goal="whatsapp_click" className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
            WhatsApp
          </TrackLink>
          <TrackLink href={contacts.telegram} goal="telegram_click" className="btn btn-red" target="_blank" rel="noopener noreferrer">
            Telegram
          </TrackLink>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="prog">
        <span>Шаг {step + 1} из 4</span>
        <span>{progress}%</span>
      </div>
      <div className="bar">
        <i style={{ width: `${progress}%` }} />
      </div>
      <div className="q">{titles[step]}</div>
      {step === 0 && (
        <div className="opts">
          {formOptions.quizAges.map((item) => (
            <button key={item.id} type="button" className={age === item.label ? "opt sel" : "opt"} aria-pressed={age === item.label} onClick={() => setAge(item.label)}>
              <i />
              {item.label}
            </button>
          ))}
        </div>
      )}
      {step === 1 && (
        <div className="opts">
          {formOptions.directions.map((item) => (
            <button key={item.id} type="button" className={direction === item.id ? "opt sel" : "opt"} aria-pressed={direction === item.id} onClick={() => setDirection(item.id)}>
              <i />
              {item.label}
            </button>
          ))}
        </div>
      )}
      {step === 2 && (
        <div className="opts">
          {times.map((item) => (
            <button key={item} type="button" className={time === item ? "opt sel" : "opt"} aria-pressed={time === item} onClick={() => setTime(item)}>
              <i />
              {item}
            </button>
          ))}
        </div>
      )}
      {step === 3 && (
        <form onSubmit={onSubmit} noValidate className="quiz-fields">
          <div className="hp" aria-hidden="true">
            <label>
              Факс
              <input value={fax} onChange={(event) => setFax(event.target.value)} tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <label>
            <span className="hp">Имя родителя</span>
            <input value={parentName} onChange={(event) => setParentName(event.target.value)} autoComplete="name" placeholder="Имя родителя" aria-label="Имя родителя" />
          </label>
          <label>
            <span className="hp">Телефон</span>
            <input value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" inputMode="tel" placeholder="Телефон" aria-label="Телефон" />
          </label>
          <div className="mess">
            {formOptions.messengers.map((item) => (
              <button key={item.id} type="button" className={messenger === item.id ? "opt sel" : "opt"} aria-pressed={messenger === item.id} onClick={() => setMessenger(item.id)}>
                <i />
                {item.label}
              </button>
            ))}
          </div>
          <label className="consent">
            <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
            <span>
              Даю <a className="ul" href="/consent">согласие</a> и ознакомился с <a className="ul" href="/privacy">политикой</a>.
            </span>
          </label>
          {error && (
            <p role="alert" className="q-error">
              {error}
            </p>
          )}
          <div className="qnav">
            <button type="button" className="btn btn-ghost" onClick={() => setStep(2)}>
              Назад
            </button>
            <button type="submit" className="btn btn-red" disabled={pending}>
              {pending ? "Отправляем…" : "Подобрать группу"}
            </button>
          </div>
        </form>
      )}
      {step < 3 && (
        <div className="qnav">
          <button type="button" className="btn btn-ghost" style={step === 0 ? { opacity: 0.4 } : undefined} disabled={step === 0} onClick={() => setStep((value) => Math.max(0, value - 1))}>
            Назад
          </button>
          <button
            type="button"
            className="btn btn-red"
            onClick={() => {
              if (step === 1 && !direction) {
                setError("Выберите направление.");
                return;
              }
              if (step === 2 && !time) {
                setError("Выберите удобное время.");
                return;
              }
              setError("");
              setStep((value) => value + 1);
            }}
          >
            Далее →
          </button>
        </div>
      )}
      {step < 3 && error && (
        <p role="alert" className="q-error" style={{ marginTop: 12 }}>
          {error}
        </p>
      )}
    </div>
  );
}
