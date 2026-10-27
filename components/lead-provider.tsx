"use client";

import { createContext, useContext, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { LeadForm } from "@/components/lead-form";

type LeadRequest = {
  direction?: string;
  coachId?: string;
  coachName?: string;
  placement: string;
  kind?: "enroll" | "waitlist" | "camp" | "china" | "rent" | "coach";
  audience?: "child" | "adult";
};

type Contacts = {
  phoneDisplay: string;
  phoneTel: string;
  whatsapp: string;
  telegram: string;
};

const LeadContext = createContext<{ openLead: (request: LeadRequest) => void } | null>(null);

export function useLead() {
  const context = useContext(LeadContext);
  if (!context) throw new Error("Форма заявки не подключена");
  return context;
}

export function LeadProvider({
  children,
  contacts,
  thankYou,
}: {
  children: ReactNode;
  contacts: Contacts;
  thankYou: string;
}) {
  const [request, setRequest] = useState<LeadRequest | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (request && !dialog.open) dialog.showModal();
    if (!request && dialog.open) dialog.close();
    document.body.classList.toggle("scroll-lock", Boolean(request));
    return () => document.body.classList.remove("scroll-lock");
  }, [request]);

  return (
    <LeadContext.Provider value={{ openLead: setRequest }}>
      {children}
      <dialog ref={dialogRef} aria-labelledby={titleId} onClose={() => setRequest(null)}>
        <div className="h-full max-h-[100dvh] overflow-y-auto bg-card p-5 text-ink sm:max-h-[calc(100dvh-1.5rem)] sm:rounded-3xl sm:p-6">
          {request && (
            <LeadForm
              key={`${request.placement}-${request.kind ?? ""}-${request.audience ?? ""}-${request.coachId ?? ""}-${request.direction ?? ""}`}
              contacts={contacts}
              thankYou={thankYou}
              placement={request.placement}
              direction={request.direction}
              coachId={request.coachId}
              coachName={request.coachName}
              kind={request.kind}
              audience={request.audience}
              titleId={titleId}
              onClose={() => setRequest(null)}
            />
          )}
        </div>
      </dialog>
    </LeadContext.Provider>
  );
}
