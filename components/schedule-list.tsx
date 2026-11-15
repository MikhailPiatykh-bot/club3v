import type { ScheduleRow } from "@/lib/schedule-rows";

export function ScheduleList({ rows }: { rows: ScheduleRow[] }) {
  return (
    <ul className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-card">
      {rows.map((row) => (
        <li key={row.id} className="grid gap-1 px-4 py-3 sm:grid-cols-[8rem_1fr_auto] sm:items-center">
          <span className="text-sm font-semibold text-cinnabar">{row.direction}</span>
          <span>
            {row.name}, {row.ages}
          </span>
          <span className="text-sm text-ink-soft">
            {row.days}, {row.time}
          </span>
        </li>
      ))}
    </ul>
  );
}
