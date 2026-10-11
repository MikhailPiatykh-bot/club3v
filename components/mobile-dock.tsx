"use client";

import { TgIcon, WaIcon } from "@/components/mock-icons";
import { TrackLink } from "@/components/track-link";

export function MobileDock({ whatsapp, telegram }: { whatsapp: string; telegram: string }) {
  return (
    <div className="sticky-msg mobile-dock">
      <TrackLink href={whatsapp} goal="whatsapp_click" target="_blank" rel="noopener noreferrer" className="wa">
        <WaIcon />
        WhatsApp
      </TrackLink>
      <TrackLink href={telegram} goal="telegram_click" target="_blank" rel="noopener noreferrer" className="tg">
        <TgIcon />
        Telegram
      </TrackLink>
    </div>
  );
}
