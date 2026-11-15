"use client";

import { useState } from "react";

export function FaqList({ items }: { items: { id: string; question: string; answer: string }[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="divide-y divide-line rounded-3xl border border-line bg-card">
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                className="flex min-h-14 w-full items-center justify-between gap-4 px-4 py-3 text-left text-base font-semibold"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : item.id)}
              >
                {item.question}
                <span aria-hidden="true" className="text-cinnabar">
                  {isOpen ? "–" : "+"}
                </span>
              </button>
            </h3>
            <p hidden={!isOpen} className="px-4 pb-4 text-sm leading-relaxed text-ink-soft">
              {item.answer}
            </p>
          </div>
        );
      })}
    </div>
  );
}
