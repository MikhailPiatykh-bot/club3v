import { DraftMark } from "@/components/draft-mark";
import { PhotoSlot } from "@/components/photo-slot";
import { SignupButton } from "@/components/signup-button";
import { coaches, directionLabel, groupById } from "@/lib/content";
import { buttonClass } from "@/lib/styles";

type Coach = (typeof coaches)[number];

export function CoachCard({ coach }: { coach: Coach }) {
  const groups = coach.groupIds.map((id) => groupById(id)).filter((group) => group !== undefined);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-card">
      <PhotoSlot src={coach.photo} alt={coach.name} width={coach.width} height={coach.height} className="rounded-none" />
      <div className="flex flex-1 flex-col p-4">
        {coach.placeholder && <DraftMark>Данные клуба</DraftMark>}
        <h3 className="mt-2 font-display text-2xl">{coach.name}</h3>
        {coach.title ? <p className="mt-1 text-sm text-ink-soft">{coach.title}</p> : null}
        <ul className="mt-3 space-y-1 text-sm">
          {groups.map((group) => (
            <li key={group.id}>
              {directionLabel(group.direction)} · {group.name}, {group.ages}
            </li>
          ))}
        </ul>
        <p className="mt-2 text-sm text-ink-soft">
          {coach.days}, {coach.time}
        </p>
        <SignupButton
          placement="coach"
          coachId={coach.id}
          coachName={coach.name}
          goal="coach_signup"
          className={`${buttonClass("ghost")} mt-4`}
        >
          Записаться к тренеру
        </SignupButton>
      </div>
    </article>
  );
}
