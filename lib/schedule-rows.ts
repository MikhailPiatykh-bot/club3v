import { directionLabel, groupById, lessons } from "@/lib/content";

export type ScheduleRow = {
  id: string;
  directionId: string;
  direction: string;
  audience: "child" | "adult";
  tier: string;
  name: string;
  ages: string;
  days: string;
  time: string;
  confirm: boolean;
  recruiting: boolean;
  note: string | null;
  coachId: string | null;
};

export function scheduleRows(directionId?: string): ScheduleRow[] {
  return lessons.flatMap((lesson) => {
    const group = groupById(lesson.groupId);
    if (!group) return [];
    if (directionId && group.direction !== directionId) return [];
    return [
      {
        id: lesson.id,
        directionId: group.direction,
        direction: directionLabel(group.direction),
        audience: group.audience === "adult" ? "adult" : "child",
        tier: group.tier,
        name: group.name,
        ages: group.ages,
        days: lesson.days ?? "дни уточняются",
        time: lesson.time ?? "время уточняется",
        confirm: lesson.confirm,
        recruiting: lesson.recruiting,
        note: lesson.note,
        coachId: null,
      },
    ];
  });
}
