"use client";

import { useState } from "react";

export function MapEmbed({ widgetUrl, mapsUrl }: { widgetUrl: string; mapsUrl: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-paper-2">
      <div className="aspect-video">
        {open ? (
          <iframe title="Карта: проспект Маршала Жукова, 51" src={widgetUrl} className="h-full w-full" loading="lazy" />
        ) : (
          <button type="button" className="grid h-full w-full place-items-center px-6 text-center" onClick={() => setOpen(true)}>
            <span>
              <span className="block font-display text-2xl text-ink">Показать карту</span>
              <span className="mt-2 block text-sm text-ink-soft">пр-т Маршала Жукова, 51</span>
            </span>
          </button>
        )}
      </div>
      <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="block px-4 py-3 text-sm font-semibold underline-offset-2 hover:underline">
        Открыть в Яндекс Картах
      </a>
    </div>
  );
}
