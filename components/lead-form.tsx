"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { MessengerLinks } from "@/components/messengers";
import { readUtm, submitLead } from "@/components/submit-lead";
import { TrackLink } from "@/components/track-link";
import { reachGoal } from "@/lib/analytics";
import { camps, formOptions, site } from "@/lib/content";
import { leadGoal, type Audience, type LeadKind } from "@/lib/lead";

type Child = { age: string; direction: string };
type Contacts = { phoneDisplay: string; phoneTel: string; whatsapp: string; telegram: string };

const field = "min-h-11 rounded-2xl border-[2.5px] border-ink bg-white px-3 text-base font-semibold";

function adultDirection(direction?: string) {
  return direction === "aikido" || direction === "wushu-adult";
}

export function LeadForm({
  contacts,
  thankYou,
  placement,
  direction,
  coachId,
  coachName,
  source = "form",
  kind = "enroll",
  audience,
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
  kind?: LeadKind;
  audience?: Audience;
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

  const initialAudience: Audience = audience ?? (kind === "waitlist" || adultDirection(direction) ? "adult" : "child");
  const [who, setWho] = useState<Audience>(initialAudience);
  const [parentName, setParentName] = useState("");
  const [phone, setPhone] = useState("");
  const [messenger, setMessenger] = useState("");
  const [consent, setConsent] = useState(false);
  const [fax, setFax] = useState("");
  const [comment, setComment] = useState("");
  const [adultDir, setAdultDir] = useState(adultDirection(direction) ? direction ?? "aikido" : direction === "wushu-adult" || kind === "waitlist" ? "wushu-adult" : "aikido");
  const [children, setChildren] = useState<Child[]>([{ age: "", direction: adultDirection(direction) ? "" : direction ?? "" }]);
  const [chinaWho, setChinaWho] = useState("adult");
  const [chinaCount, setChinaCount] = useState("1");
  const [chinaInterest, setChinaInterest] = useState("general");
  const [activity, setActivity] = useState("");
  const [when, setWhen] = useState("");
  const [duration, setDuration] = useState("");
  const [count, setCount] = useState("");
  const [shift, setShift] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);

  const childFlow = (kind === "enroll" || kind === "coach" || kind === "camp") && who === "child";
  const title =
    kind === "waitlist" ? "Лист ожидания" : kind === "rent" ? "Заявка на аренду" : kind === "china" ? "Запись на сборы" : kind === "camp" ? "Запись в лагерь" : coachName ? "Запись к тренеру" : "Записаться";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (parentName.trim().length < 2) {
      setError(who === "adult" || kind === "rent" ? "Напишите имя." : "Напишите имя родителя.");
      return;
    }
    if (childFlow && children.some((child) => !child.age || !child.direction)) {
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
    const payloadAudience: Audience = kind === "waitlist" || kind === "rent" ? "adult" : who;
    try {
      await submitLead(
        {
          parentName,
          phone,
          messenger,
          consent,
          coachId,
          source,
          placement,
          page: pathname,
          utm: readUtm(),
          fax,
          renderedAt: renderedAt.current,
          kind: kind === "coach" ? "coach" : kind,
          audience: payloadAudience,
          direction: childFlow ? undefined : kind === "waitlist" ? "wushu-adult" : adultDir,
          children: childFlow ? children : [],
          comment,
          details: {
            ...(kind === "china" ? { who: chinaWho, count: chinaCount, interest: chinaInterest } : {}),
            ...(kind === "rent" ? { activity, when, duration, count } : {}),
            ...(kind === "camp" && shift ? { shift } : {}),
          },
        },
        source === "quiz" ? "quiz_submit" : "lead_submit",
      );
      reachGoal(leadGoal({ kind, audience: payloadAudience, source }));
      setDone(true);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Не удалось отправить заявку.");
    } finally {
      setPending(false);
    }
  }

  function updateChild(index: number, patch: Partial<Child>) {
    setChildren((current) => current.map((child, childIndex) => (childIndex === index ? { ...child, ...patch } : child)));
  }

  if (done) {
    const text = kind === "waitlist" ? site.thanks.waitlist : kind === "rent" ? site.thanks.rent : thankYou;
    return (
      <div>
        <h2 id={headingId} className="font-display text-3xl font-black leading-tight">
          {text}
        </h2>
        <div className="mt-5 flex flex-wrap gap-2">
          <TrackLink href={contacts.whatsapp} goal="whatsapp_click" className="font-black text-blue underline" target="_blank" rel="noopener noreferrer">
            WhatsApp
          </TrackLink>
          <TrackLink href={contacts.telegram} goal="telegram_click" className="font-black text-blue underline" target="_blank" rel="noopener noreferrer">
            Telegram
          </TrackLink>
          {site.max ? (
            <TrackLink href={site.max} goal="max_click" className="font-black text-blue underline" target="_blank" rel="noopener noreferrer">
              MAX
            </TrackLink>
          ) : null}
        </div>
        <div className="mt-4">
          <p className="text-sm font-extrabold">Каналы клуба</p>
          <MessengerLinks channel className="mt-2" />
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative">
      <div className="flex items-start justify-between gap-4">
        <h2 id={headingId} className="font-display text-3xl font-black leading-tight">
          {title}
        </h2>
        {onClose ? (
          <button type="button" onClick={onClose} className="min-h-11 rounded-full px-3 text-sm font-extrabold" aria-label="Закрыть">
            Закрыть
          </button>
        ) : null}
      </div>
      {kind === "waitlist" ? <p className="mt-2 text-sm">Группа набирается. Запишитесь, и мы свяжемся, когда назовём даты старта.</p> : null}
      {coachName ? <p className="mt-2 text-sm">Тренер в заявке: {coachName}</p> : null}

      <div className="hp" aria-hidden="true">
        <label>
          Факс
          <input value={fax} onChange={(event) => setFax(event.target.value)} tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-5 grid gap-4">
        {kind === "enroll" || kind === "coach" ? (
          <fieldset>
            <legend className="text-sm font-extrabold">Кто будет заниматься</legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {(["child", "adult"] as const).map((value) => (
                <button key={value} type="button" className={`min-h-11 rounded-btn border-[2.5px] border-ink font-black ${who === value ? "bg-sun" : "bg-white"}`} onClick={() => setWho(value)}>
                  {value === "child" ? "Ребёнок" : "Взрослый"}
                </button>
              ))}
            </div>
          </fieldset>
        ) : null}

        <label className="grid gap-1 text-sm font-extrabold" htmlFor={`${reactId}-name`}>
          {kind === "rent" ? "Имя или организация" : who === "adult" || kind === "waitlist" || kind === "china" ? "Имя" : "Имя родителя"}
          <input id={`${reactId}-name`} value={parentName} onChange={(event) => setParentName(event.target.value)} autoComplete="name" className={field} />
        </label>
        <label className="grid gap-1 text-sm font-extrabold" htmlFor={`${reactId}-phone`}>
          Телефон
          <input id={`${reactId}-phone`} value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" inputMode="tel" className={field} />
        </label>

        {childFlow
          ? children.map((child, index) => (
              <fieldset key={`${reactId}-child-${index}`} className="grid gap-3 rounded-card border-[3px] border-ink p-3">
                <legend className="px-1 text-sm font-extrabold">Ребёнок {children.length > 1 ? index + 1 : ""}</legend>
                <label className="grid gap-1 text-sm font-extrabold">
                  Возраст
                  <select value={child.age} onChange={(event) => updateChild(index, { age: event.target.value })} className={field}>
                    <option value="">Выберите возраст</option>
                    {(kind === "camp" ? formOptions.campAges : formOptions.ages).map((age) => (
                      <option key={age}>{age}</option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-1 text-sm font-extrabold">
                  Направление
                  <select value={child.direction} onChange={(event) => updateChild(index, { direction: event.target.value })} className={field}>
                    <option value="">Выберите направление</option>
                    {formOptions.directions.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </label>
                {children.length > 1 ? (
                  <button type="button" className="justify-self-start text-sm font-extrabold text-blue underline" onClick={() => setChildren((current) => current.filter((_, childIndex) => childIndex !== index))}>
                    Убрать ребёнка
                  </button>
                ) : null}
              </fieldset>
            ))
          : null}

        {childFlow && kind !== "camp" && children.length < 4 ? (
          <button type="button" className="justify-self-start text-sm font-extrabold text-blue underline" onClick={() => setChildren((current) => [...current, { age: "", direction: direction && !adultDirection(direction) ? direction : "" }])}>
            Добавить ещё ребёнка
          </button>
        ) : null}

        {(kind === "enroll" || kind === "coach") && who === "adult" ? (
          <label className="grid gap-1 text-sm font-extrabold">
            Направление
            <select value={adultDir} onChange={(event) => setAdultDir(event.target.value)} className={field}>
              {formOptions.adultDirections.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        {kind === "waitlist" ? (
          <label className="grid gap-1 text-sm font-extrabold">
            Комментарий
            <textarea value={comment} onChange={(event) => setComment(event.target.value)} className={field} rows={3} placeholder="Удобные дни, опыт" />
          </label>
        ) : null}

        {kind === "china" ? (
          <>
            <label className="grid gap-1 text-sm font-extrabold">
              Кто едет
              <select value={chinaWho} onChange={(event) => setChinaWho(event.target.value)} className={field}>
                {formOptions.chinaWho.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-1 text-sm font-extrabold">
              Число участников
              <input value={chinaCount} onChange={(event) => setChinaCount(event.target.value)} className={field} inputMode="numeric" />
            </label>
            <label className="grid gap-1 text-sm font-extrabold">
              Интерес
              <select value={chinaInterest} onChange={(event) => setChinaInterest(event.target.value)} className={field}>
                {formOptions.chinaInterest.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
          </>
        ) : null}

        {kind === "camp" ? (
          <label className="grid gap-1 text-sm font-extrabold">
            Смена
            <select value={shift} onChange={(event) => setShift(event.target.value)} className={field}>
              <option value="">Смены клуб ещё не назвал</option>
              {camps.shifts.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        {kind === "rent" ? (
          <>
            <label className="grid gap-1 text-sm font-extrabold">
              Вид занятия
              <input value={activity} onChange={(event) => setActivity(event.target.value)} className={field} />
            </label>
            <label className="grid gap-1 text-sm font-extrabold">
              Дата и время
              <input value={when} onChange={(event) => setWhen(event.target.value)} className={field} placeholder="или постоянно, вечерние часы" />
            </label>
            <label className="grid gap-1 text-sm font-extrabold">
              Длительность
              <input value={duration} onChange={(event) => setDuration(event.target.value)} className={field} />
            </label>
            <label className="grid gap-1 text-sm font-extrabold">
              Число занимающихся
              <input value={count} onChange={(event) => setCount(event.target.value)} className={field} />
            </label>
            <label className="grid gap-1 text-sm font-extrabold">
              Комментарий
              <textarea value={comment} onChange={(event) => setComment(event.target.value)} className={field} rows={3} />
            </label>
          </>
        ) : null}

        <fieldset>
          <legend className="text-sm font-extrabold">Куда удобнее ответить</legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {formOptions.messengers.map((item) => (
              <label key={item.id} className={`flex min-h-11 cursor-pointer items-center justify-center rounded-btn border-[2.5px] border-ink px-3 text-sm font-black ${messenger === item.id ? "bg-sun" : "bg-white"}`}>
                <input type="radio" name={`${reactId}-messenger`} value={item.id} checked={messenger === item.id} onChange={() => setMessenger(item.id)} className="sr-only" />
                {item.label}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="flex items-start gap-3 text-sm leading-snug">
          <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-1 h-5 w-5" />
          <span>
            {who === "adult" || kind === "rent" || kind === "waitlist" ? "Даю согласие на обработку моих персональных данных" : "Даю согласие на обработку персональных данных заявителя и ребёнка"}{" "}
            (
            <a href="/consent" className="text-blue underline">
              согласие
            </a>
            ,{" "}
            <a href="/privacy" className="text-blue underline">
              политика
            </a>
            ). Текст согласия ещё пришлёт юрист.
          </span>
        </label>

        {error ? (
          <p role="alert" className="text-sm font-extrabold text-pink">
            {error}
          </p>
        ) : null}
        <button type="submit" className="h-14 rounded-btn border-[2.5px] border-ink bg-orange font-black text-ink shadow-btn-main" disabled={pending}>
          {pending ? "Отправляем…" : "Отправить заявку"}
        </button>
      </div>
    </form>
  );
}
