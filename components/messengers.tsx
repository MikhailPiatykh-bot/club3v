import type { ReactNode } from "react";
import { MaxIcon, PhoneIcon, TelegramIcon, WhatsappIcon } from "@/components/icons";
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
            {item.mark === "MAX" ? <MaxIcon className="h-5 w-5" /> : null}
            {item.mark === "VK" ? <span className="text-[11px] font-black">VK</span> : null}
          </TrackLink>
        ) : null,
      )}
    </div>
  );
}

const headerIconClass =
  "grid h-10 w-10 place-items-center rounded-full border-[2.5px] border-ink bg-white text-ink shadow-icon max-[639px]:h-9 max-[639px]:w-9";

function SocialGroup({ lines, children }: { lines: [string, string]; children: ReactNode }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-right text-[11px] font-extrabold leading-[1.05]">
        {lines[0]}
        <br />
        {lines[1]}
      </span>
      {children}
    </div>
  );
}

function HeaderRule() {
  return <span className="mx-0.5 h-10 w-px shrink-0 bg-ink" aria-hidden="true" />;
}

export function HeaderSocial() {
  const channels = [
    {
      href: site.channels.max,
      label: "Канал в MAX",
      goal: "max_channel_click",
      icon: <MaxIcon className="h-5 w-5" />,
    },
    {
      href: site.channels.telegram,
      label: "Канал в Telegram",
      goal: "telegram_channel_click",
      icon: <TelegramIcon className="h-5 w-5 text-[#2AABEE]" />,
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
      <SocialGroup lines={["Наши", "каналы"]}>
        <div className="flex items-center gap-1.5">
          {channels.map((item) => (
            <TrackLink
              key={item.label}
              href={item.href || "/#channels"}
              goal={item.href ? item.goal : undefined}
              target={item.href ? "_blank" : undefined}
              rel={item.href ? "noopener noreferrer" : undefined}
              className={headerIconClass}
              aria-label={item.label}
              title={item.label}
            >
              {item.icon}
            </TrackLink>
          ))}
        </div>
      </SocialGroup>
      <div className="flex items-center gap-2">
        <HeaderRule />
        <SocialGroup lines={["Написать", "нам"]}>
          <MessengerLinks compact className="gap-1.5 [&_a]:h-10 [&_a]:w-10" />
        </SocialGroup>
      </div>
      <div className="flex items-center gap-2">
        <HeaderRule />
        <TrackLink href={`tel:${site.phoneTel}`} goal="phone_click" className="inline-flex items-center gap-1.5 whitespace-nowrap font-display text-[15px] font-black text-ink" aria-label={`Позвонить ${site.phoneDisplay}`}>
          <span className={headerIconClass}>
            <PhoneIcon className="h-5 w-5" />
          </span>
          {site.phoneDisplay}
        </TrackLink>
      </div>
    </div>
  );
}
