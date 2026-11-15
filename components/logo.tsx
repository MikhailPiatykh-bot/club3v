import Link from "next/link";

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const mark = tone === "light" ? "#f3eee6" : "#922820";
  const ink = tone === "light" ? "#f3eee6" : "#1c1412";

  return (
    <Link href="/" className="flex items-center gap-2.5 rounded-full" aria-label="Veni Vidi Vici, на главную">
      <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
        <circle cx="18" cy="18" r="16" fill="none" stroke={mark} strokeWidth="1.5" />
        <circle cx="18" cy="18" r="12.5" fill="none" stroke={mark} strokeWidth="1" />
        <text x="18" y="22" textAnchor="middle" fontSize="9" fontFamily="ui-sans-serif, sans-serif" fill={ink} fontWeight="700">
          3V
        </text>
      </svg>
      <span className="leading-tight">
        <span className={`block whitespace-nowrap font-display text-[13px] font-medium tracking-wide ${tone === "light" ? "text-paper" : "text-ink"}`}>
          Veni Vidi Vici
        </span>
        <span className={`block text-[11px] ${tone === "light" ? "text-paper/70" : "text-ink-soft"}`}>детский клуб</span>
      </span>
    </Link>
  );
}
