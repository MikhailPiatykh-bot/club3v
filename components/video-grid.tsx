"use client";

import { useState } from "react";

type VideoItem = {
  id: string;
  title: string;
  caption: string;
  duration: string | null;
  src: string;
  poster: string | null;
};

export function VideoGrid({ items }: { items: VideoItem[] }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <ul className="flex snap-x gap-3 overflow-x-auto pb-2">
      {items.map((item) => {
        const opened = active === item.id;
        return (
          <li key={item.id} className="w-[72%] shrink-0 snap-start sm:w-64">
            <article className="overflow-hidden rounded-3xl border border-line bg-card">
              <div className="relative aspect-[9/16] bg-ink text-paper">
                {item.poster && !opened && (
                  // Poster is a content path, not a layout image. Native img keeps the slot simple until a file exists.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.poster} alt="" className="h-full w-full object-cover" />
                )}
                {opened && item.src && isFile(item.src) && (
                  <video className="h-full w-full" controls preload="none" poster={item.poster ?? undefined}>
                    <source src={item.src} />
                  </video>
                )}
                {opened && item.src && !isFile(item.src) && (
                  <iframe title={item.title} src={item.src} className="h-full w-full" loading="lazy" />
                )}
                {opened && !item.src && (
                  <p className="grid h-full place-items-center px-4 text-center text-sm">Ролик добавит клуб. На пробном можно посмотреть зал.</p>
                )}
                {!opened && (
                  <button type="button" className="absolute inset-0 grid place-items-center" onClick={() => setActive(item.id)} aria-label={`Смотреть: ${item.title}`}>
                    <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-ink">Смотреть</span>
                  </button>
                )}
                <span className="absolute bottom-3 left-3 rounded-full bg-ink/80 px-2 py-1 text-[11px] text-paper">
                  {item.duration ?? "длина уточняется"}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-display text-lg">{item.title}</h3>
                <p className="mt-1 text-sm text-ink-soft">{item.caption}</p>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}

function isFile(src: string) {
  return /\.(mp4|webm|ogg)(\?|$)/i.test(src);
}
