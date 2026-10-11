type IconProps = { className?: string };

export function PhoneIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8 4h2l1.2 3.2-1.6 1.1a12 12 0 0 0 5.1 5.1l1.1-1.6L20 13v2a2 2 0 0 1-2.2 2A16 16 0 0 1 4 6.2 2 2 0 0 1 6 4h2Z" strokeLinejoin="round" />
    </svg>
  );
}

export function WhatsappIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12.04 3.5A8.2 8.2 0 0 0 4.3 15.7L3.5 20.5l4.9-.8A8.2 8.2 0 1 0 12.04 3.5Zm4.72 11.6c-.2.56-1.16 1.06-1.62 1.1-.42.04-.94.06-1.52-.1-.35-.1-.8-.26-1.38-.5-2.43-1.05-4-3.5-4.12-3.66-.12-.16-1-1.33-1-2.54s.63-1.8.86-2.05c.22-.24.48-.3.64-.3h.46c.15 0 .34-.05.53.4.2.48.67 1.64.73 1.76.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.31-.36.42-.12.12-.24.24-.1.47.14.24.62 1.02 1.33 1.66.92.82 1.69 1.08 1.93 1.2.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.14 1.14Z" />
    </svg>
  );
}

export function TelegramIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M19.8 5.2 3.9 11.1c-1.1.4-1.1 1 .2 1.3l4.1 1.3 1.6 4.8c.2.6.1.8.7.8.4 0 .6-.2.8-.4l2.3-2.2 4.1 3c.8.4 1.3.2 1.5-.7l2.7-12.6c.3-1.1-.4-1.6-1.1-1.2ZM8.8 13.6l8.3-5.2c.4-.3.8-.1.5.2l-6.9 6.2-.3 3.1-1.6-4.3Z" />
    </svg>
  );
}

export function PinIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" />
      <circle cx="12" cy="11" r="2" />
    </svg>
  );
}
