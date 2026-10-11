import { DraftMark } from "@/components/draft-mark";
import { directionLabel, groupDetails, groupsDoc, groupsFor, type DirectionId } from "@/lib/content";

export function GroupCards({ direction }: { direction?: DirectionId }) {
  const items = direction ? groupsFor(direction) : groupsDoc.items;

  return (
    <div>
      {groupsDoc.draft && (
        <p className="mb-4 flex flex-wrap items-center gap-2 text-sm text-ink-soft">
          <DraftMark />
          {groupsDoc.note}
        </p>
      )}
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((group) => (
          <li key={group.id} className="rounded-3xl border border-line bg-card p-4">
            {!direction && <p className="text-xs font-semibold uppercase tracking-wide text-cinnabar">{directionLabel(group.direction)}</p>}
            <h3 className="mt-1 font-display text-2xl">{group.name}</h3>
            <p className="mt-1 text-lg">{group.ages}</p>
            <p className="mt-3 text-sm text-ink-soft">{groupDetails(group)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
