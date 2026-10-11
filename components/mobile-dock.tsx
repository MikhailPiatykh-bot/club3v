"use client";

import { TelegramIcon, WhatsappIcon } from "@/components/icons";
import { SignupButton } from "@/components/signup-button";
import { TrackLink } from "@/components/track-link";

export function MobileDock({ whatsapp, telegram }: { whatsapp: string; telegram: string }) {
  return (
    <div className="mobile-dock fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink text-paper md:hidden">
      <div className="grid grid-cols-3">
        <SignupButton placement="dock" className="min-h-14 text-sm font-semibold">
          Записаться
        </SignupButton>
        <TrackLink href={whatsapp} goal="whatsapp_click" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center justify-center gap-2 text-sm font-semibold">
          <WhatsappIcon />
          WhatsApp
        </TrackLink>
        <TrackLink href={telegram} goal="telegram_click" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center justify-center gap-2 text-sm font-semibold">
          <TelegramIcon />
          Telegram
        </TrackLink>
      </div>
    </div>
  );
}
