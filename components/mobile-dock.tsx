"use client";

import { useState } from "react";
import { MessengerLinks } from "@/components/messengers";
import { SignupButton } from "@/components/signup-button";
import { site } from "@/lib/content";

export function MobileDock() {
  const [more, setMore] = useState(false);
  const hasMax = Boolean(site.max);

  return (
    <div className="mobile-dock fixed inset-x-0 bottom-0 z-40 border-t-[3px] border-ink bg-white px-3 py-2 md:hidden">
      <div className="flex items-center gap-2">
        <SignupButton placement="dock" className="inline-flex h-12 flex-1 items-center justify-center rounded-btn border-[2.5px] border-ink bg-orange font-black text-ink shadow-btn-main">
          Записаться
        </SignupButton>
        <MessengerLinks className={hasMax && !more ? "[&_a:nth-child(n+3)]:hidden" : ""} />
        {hasMax ? (
          <button type="button" className="h-11 rounded-btn border-[2.5px] border-ink px-3 font-black" onClick={() => setMore((value) => !value)}>
            Ещё
          </button>
        ) : null}
      </div>
    </div>
  );
}
