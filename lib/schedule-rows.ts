import { directionLabel, groupById, lessons, type DirectionId } from "@/lib/content";

export type ScheduleRow = {
  id: string;
  directionId: DirectionId;
  direction: string;
  name: string;
  ages: string;
  days: string;
  time: string;
};

function asDirection(value: string): DirectionId | null {
  if (value === "wushu" || value === "acrobatics") return value;
  return null;
}

export function scheduleRows(directionId?: DirectionId): ScheduleRow[] {
  return lessons.flatMap((lesson) => {
    const group = groupById(lesson.groupId);
    const direction = group ? asDirection(group.direction) : null;
    if (!group || !direction) return [];
    if (directionId && direction !== directionId) return [];
    return [
      {
        id: lesson.id,
        directionId: direction,
        direction: directionLabel(direction),
        name: group.name,
        ages: group.ages,
        days: lesson.days,
        time: lesson.time,
      },
    ];
  });
}
