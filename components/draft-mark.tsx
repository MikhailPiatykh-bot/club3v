export function DraftMark({ children = "Уточняется" }: { children?: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-gold-soft px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-gold">
      {children}
    </span>
  );
}
