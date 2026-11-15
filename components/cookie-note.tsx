"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

const storageKey = "vvv-cookie";
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function dismissed() {
  return sessionStorage.getItem(storageKey) === "1";
}

function dismiss() {
  sessionStorage.setItem(storageKey, "1");
  listeners.forEach((listener) => listener());
}

export function CookieNote() {
  const closed = useSyncExternalStore(subscribe, dismissed, () => true);
  if (closed) return null;

  return (
    <div className="fixed bottom-24 left-3 z-30 max-w-sm rounded-rate border-[3px] border-ink bg-white p-3 text-sm shadow-rate md:bottom-4">
      <p>
        Сайт запоминает UTM-метки и использует Яндекс Метрику. Подробности в{" "}
        <Link href="/privacy" className="text-blue underline">
          политике
        </Link>
        .
      </p>
      <button type="button" className="mt-2 min-h-11 font-black" onClick={dismiss}>
        Понятно
      </button>
    </div>
  );
}
