"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { readUtm, submitLead } from "@/components/submit-lead";
import { formOptions, site } from "@/lib/content";
import { reachGoal } from "@/lib/analytics";
import { leadGoal } from "@/lib/lead";

export function Quiz() {
  const pathname = usePathname();
  const renderedAt = useRef(0);
  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);
  const [step, setStep] = useState(0);
  const [who, setWho] = useState<"child" | "adult">("child");
  const [age, setAge] = useState(formOptions.quizAges[0]?.label ?? "");
  const [direction, setDirection] = useState(formOptions.directions[0]?.id ?? "wushu");
  const [adultDir, setAdultDir] = useState(formOptions.adultDirections[0]?.id ?? "aikido");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [messenger, setMessenger] = useState("");
  const [consent, setConsent] = useState(false);
  const [fax, setFax] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);

  const steps = who === "adult" ? ["Кто", "Направление", "Контакты"] : ["Кто", "Возраст", "Направление", "Контакты"];
  const last = steps.length - 1;

  async function finish() {
    setError("");
    if (name.trim().length < 2 || !phone || !messenger || !consent) {
      setError("Заполните имя, телефон, мессенджер и согласие.");
      return;
    }
    setPending(true);
    try {
      await submitLead(
        {
          parentName: name,
          phone,
          messenger,
          consent,
          source: "quiz",
          placement: "quiz",
          page: pathname,
          utm: readUtm(),
          fax,
          renderedAt: renderedAt.current,
          kind: "enroll",
          audience: who,
          direction: who === "adult" ? adultDir : undefined,
          children: who === "child" ? [{ age, direction }] : [],
        },
        "quiz_submit",
      );
      reachGoal(leadGoal({ kind: "enroll", audience: who, source: "quiz" }));
      setDone(true);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Не удалось отправить заявку.");
    } finally {
      setPending(false);
    }
  }

  if (done) return <p className="font-display text-3xl font-black">{site.thankYou}</p>;

  return (
    <form
      className="rounded-card border-[3px] border-ink bg-white p-6 shadow-card"
      onSubmit={(event) => {
        event.preventDefault();
        if (step < last) setStep(step + 1);
        else void finish();
      }}
    >
      <p className="text-sm font-extrabold text-pink">
        Шаг {step + 1} из {steps.length}. {steps[step]}
      </p>
      <div className="hp" aria-hidden="true">
        <input value={fax} onChange={(event) => setFax(event.target.value)} tabIndex={-1} autoComplete="off" />
      </div>
      {step === 0 ? (
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <Option on={who === "child"} onClick={() => setWho("child")}>
            Ребёнок
          </Option>
          <Option on={who === "adult"} onClick={() => setWho("adult")}>
            Взрослый
          </Option>
        </div>
      ) : null}
      {who === "child" && step === 1 ? (
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {formOptions.quizAges.map((item) => (
            <Option key={item.id} on={age === item.label} onClick={() => setAge(item.label)}>
              {item.label}
            </Option>
          ))}
        </div>
      ) : null}
      {((who === "child" && step === 2) || (who === "adult" && step === 1)) && (
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {(who === "adult" ? formOptions.adultDirections : formOptions.directions).map((item) => (
            <Option key={item.id} on={(who === "adult" ? adultDir : direction) === item.id} onClick={() => (who === "adult" ? setAdultDir(item.id) : setDirection(item.id))}>
              {item.label}
            </Option>
          ))}
        </div>
      )}
      {step === last ? (
        <div className="mt-4 grid gap-3">
          <input value={name} onChange={(event) => setName(event.target.value)} placeholder={who === "adult" ? "Имя" : "Имя родителя"} className="min-h-11 rounded-2xl border-[2.5px] border-ink px-3" autoComplete="name" />
          <input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Телефон" className="min-h-11 rounded-2xl border-[2.5px] border-ink px-3" autoComplete="tel" inputMode="tel" />
          <div className="grid gap-2 sm:grid-cols-2">
            {formOptions.messengers.map((item) => (
              <Option key={item.id} on={messenger === item.id} onClick={() => setMessenger(item.id)}>
                {item.label}
              </Option>
            ))}
          </div>
          <label className="flex gap-3 text-sm">
            <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-1 h-5 w-5" />
            <span>
              Согласие на обработку данных,{" "}
              <a className="text-blue underline" href="/consent">
                текст
              </a>{" "}
              и{" "}
              <a className="text-blue underline" href="/privacy">
                политика
              </a>
              .
            </span>
          </label>
        </div>
      ) : null}
      {error ? <p className="mt-3 text-sm font-extrabold text-pink">{error}</p> : null}
      <div className="mt-4 flex gap-2">
        <button type="button" className="h-12 flex-1 rounded-btn border-[2.5px] border-ink bg-white font-black shadow-btn-alt" disabled={step === 0} onClick={() => setStep((value) => Math.max(0, value - 1))}>
          Назад
        </button>
        <button type="submit" className="h-12 flex-1 rounded-btn border-[2.5px] border-ink bg-orange font-black shadow-btn-main" disabled={pending}>
          {step === last ? "Отправить" : "Дальше"}
        </button>
      </div>
    </form>
  );
}

function Option({ children, on, onClick }: { children: string; on: boolean; onClick: () => void }) {
  return (
    <button type="button" className={`min-h-11 rounded-btn border-[2.5px] border-ink px-3 font-black ${on ? "bg-sun" : "bg-white"}`} onClick={onClick}>
      {children}
    </button>
  );
}
