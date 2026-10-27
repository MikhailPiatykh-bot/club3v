import { TelegramIcon, WhatsappIcon } from "@/components/icons";
import { TrackLink } from "@/components/track-link";
import { site } from "@/lib/content";

const iconClass =
  "grid h-11 w-11 place-items-center rounded-full border-[2.5px] border-ink bg-white text-ink shadow-icon";

export function MessengerLinks({ channel = false, className = "", compact = false }: { channel?: boolean; className?: string; compact?: boolean }) {
  const buttonClass = compact
    ? "grid h-10 w-10 place-items-center rounded-full border-[2.5px] border-ink bg-white text-ink shadow-icon"
    : iconClass;
  const items = channel
    ? [
        site.channels.telegram ? { href: site.channels.telegram, label: "Канал в Telegram", goal: "telegram_channel_click", mark: "TG" } : null,
        site.channels.max ? { href: site.channels.max, label: "Канал в MAX", goal: "max_channel_click", mark: "MAX" } : null,
        site.channels.vk ? { href: site.channels.vk, label: "ВКонтакте", goal: "vk_click", mark: "VK" } : null,
      ]
    : [
        { href: site.whatsapp, label: "WhatsApp", goal: "whatsapp_click", mark: "WA" },
        { href: site.telegram, label: "Telegram", goal: "telegram_click", mark: "TG" },
        site.max ? { href: site.max, label: "MAX", goal: "max_click", mark: "MAX" } : null,
      ];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {items.filter(Boolean).map((item) =>
        item ? (
          <TrackLink key={item.goal + item.href} href={item.href} goal={item.goal} target="_blank" rel="noopener noreferrer" className={buttonClass} aria-label={item.label} title={item.label}>
            {item.mark === "WA" ? <WhatsappIcon className="h-5 w-5 text-[#25D366]" /> : null}
            {item.mark === "TG" ? <TelegramIcon className="h-5 w-5 text-[#2AABEE]" /> : null}
            {item.mark === "MAX" ? <span className="text-[10px] font-black">MAX</span> : null}
            {item.mark === "VK" ? <span className="text-[11px] font-black">VK</span> : null}
          </TrackLink>
        ) : null,
      )}
    </div>
  );
}
