export const WEEK = [
  { id: "mon", short: "Пн", name: "Понедельник" },
  { id: "tue", short: "Вт", name: "Вторник" },
  { id: "wed", short: "Ср", name: "Среда" },
  { id: "thu", short: "Чт", name: "Четверг" },
  { id: "fri", short: "Пт", name: "Пятница" },
  { id: "sat", short: "Сб", name: "Суббота" },
  { id: "sun", short: "Вс", name: "Воскресенье" },
] as const;

export type DayId = (typeof WEEK)[number]["id"];

export const SLOTS = [
  { id: "1600", label: "16:00", until: "до 17:00", min: 16 * 60, max: 17 * 60 },
  { id: "1700", label: "17:00", until: "до 18:20", min: 17 * 60, max: 18 * 60 },
  { id: "1820", label: "18:20", until: "до 19:40", min: 18 * 60, max: 19 * 60 + 40 },
  { id: "1940", label: "19:40", until: "до 21:00", min: 19 * 60 + 40, max: 24 * 60 },
] as const;

export type SlotId = (typeof SLOTS)[number]["id"];

const DAY_WORD: Record<string, DayId | "weekend"> = {
  пн: "mon",
  понедельник: "mon",
  вт: "tue",
  вторник: "tue",
  ср: "wed",
  среда: "wed",
  чт: "thu",
  четверг: "thu",
  пт: "fri",
  пятница: "fri",
  сб: "sat",
  суббота: "sat",
  вс: "sun",
  воскресенье: "sun",
  выходные: "weekend",
};

export type LessonInput = {
  id: string;
  groupId: string;
  days: string | null;
  time: string | null;
  confirm: boolean;
  recruiting: boolean;
  note: string | null;
};

export type GroupInput = {
  id: string;
  direction: string;
  audience: string;
  tier: string;
  name: string;
  ages: string;
};

export type CoachInput = {
  id: string;
  name: string;
  placeholder: boolean;
  groupIds: string[];
};

export type GridSession = {
  id: string;
  lessonId: string;
  groupId: string;
  directionId: string;
  direction: string;
  audience: "child" | "adult";
  tier: string;
  name: string;
  ages: string;
  daysLabel: string;
  dayId: DayId | null;
  time: string | null;
  start: number | null;
  slotId: SlotId | null;
  confirm: boolean;
  recruiting: boolean;
  note: string | null;
  coachId: string | null;
  coachName: string | null;
  placed: boolean;
};

export type ScheduleQuery = {
  audience: "all" | "child" | "adult";
  direction: string;
  tier: "all" | "kids" | "junior" | "middle" | "senior" | "adult";
};

const DIRECTION_ORDER = ["group-3plus", "wushu", "acrobatics", "breakdance", "aikido", "wushu-adult"];

export function dayIdsFromLabel(days: string | null): DayId[] {
  if (!days) return [];
  const ids: DayId[] = [];
  for (const token of days.toLowerCase().split(/[,/·]+/)) {
    const hit = DAY_WORD[token.trim()];
    if (hit === "weekend") ids.push("sat", "sun");
    else if (hit) ids.push(hit);
  }
  return [...new Set(ids)];
}

export function splitTimes(time: string | null): string[] {
  if (!time) return [];
  return time
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

function clock(value: string): number | null {
  const match = /(\d{1,2}):(\d{2})/.exec(value);
  if (!match) return null;
  return Number(match[1]) * 60 + Number(match[2]);
}

function rangeEnd(time: string): number | null {
  const matches = [...time.matchAll(/(\d{1,2}):(\d{2})/g)];
  const last = matches.at(-1);
  if (!last) return null;
  return Number(last[1]) * 60 + Number(last[2]);
}

export function slotIdFor(start: number): SlotId {
  return SLOTS.find((slot) => start >= slot.min && start < slot.max)?.id ?? "1940";
}

function coachFor(groupId: string, direction: string, coaches: CoachInput[]) {
  const coach = coaches.find((item) => !item.placeholder && item.groupIds.includes(groupId));
  if (!coach) return { coachId: null, coachName: null };
  const name = coach.name.trim();
  if (name.toLowerCase() === direction.toLowerCase() || name.startsWith("Тренер")) {
    return { coachId: null, coachName: null };
  }
  return { coachId: coach.id, coachName: name };
}

export function buildGrid(input: {
  lessons: LessonInput[];
  groups: GroupInput[];
  coaches: CoachInput[];
  label: (directionId: string) => string;
}): GridSession[] {
  const groups = new Map(input.groups.map((group) => [group.id, group]));
  const sessions: GridSession[] = [];

  for (const lesson of input.lessons) {
    const group = groups.get(lesson.groupId);
    if (!group) continue;
    const direction = input.label(group.direction);
    const coach = coachFor(group.id, direction, input.coaches);
    const base = {
      lessonId: lesson.id,
      groupId: group.id,
      directionId: group.direction,
      direction,
      audience: group.audience === "adult" ? "adult" : "child",
      tier: group.tier,
      name: group.name,
      ages: group.ages,
      daysLabel: lesson.days ?? "дни уточняются",
      confirm: lesson.confirm,
      recruiting: lesson.recruiting,
      note: lesson.note,
      coachId: coach.coachId,
      coachName: coach.coachName,
    } satisfies Omit<GridSession, "id" | "dayId" | "time" | "start" | "slotId" | "placed">;

    const dayIds = dayIdsFromLabel(lesson.days);
    const times = splitTimes(lesson.time).filter((time) => clock(time) !== null);
    if (dayIds.length === 0 || times.length === 0) {
      sessions.push({ ...base, id: lesson.id, dayId: null, time: lesson.time, start: null, slotId: null, placed: false });
      continue;
    }

    for (const dayId of dayIds) {
      for (const time of times) {
        const start = clock(time);
        sessions.push({
          ...base,
          id: `${lesson.id}-${dayId}-${time}`,
          dayId,
          time,
          start,
          slotId: start === null ? null : slotIdFor(start),
          placed: start !== null,
        });
      }
    }
  }

  return sessions;
}

export function matchesFilter(session: GridSession, query: ScheduleQuery) {
  if (query.audience !== "all" && session.audience !== query.audience) return false;
  if (query.direction !== "all" && session.directionId !== query.direction) return false;
  if (query.tier !== "all" && session.tier !== query.tier) return false;
  return true;
}

export function closedDayIds(sessions: GridSession[]): DayId[] {
  const open = new Set(sessions.filter((session) => session.placed).map((session) => session.dayId));
  return WEEK.filter((day) => !open.has(day.id)).map((day) => day.id);
}

export function directionSummaries(sessions: GridSession[]) {
  const grouped = new Map<string, GridSession[]>();
  for (const session of sessions) {
    if (!session.placed || !session.dayId || session.start === null || !session.time) continue;
    const list = grouped.get(session.directionId) ?? [];
    list.push(session);
    grouped.set(session.directionId, list);
  }

  return [...grouped.entries()]
    .sort((left, right) => DIRECTION_ORDER.indexOf(left[0]) - DIRECTION_ORDER.indexOf(right[0]))
    .map(([, items]) => {
      const starts = items.map((item) => item.start ?? 0);
      const ends = items.map((item) => rangeEnd(item.time ?? "") ?? item.start ?? 0);
      const days = WEEK.filter((day) => items.some((item) => item.dayId === day.id)).map((day) => day.short);
      const groups = new Set(items.map((item) => item.groupId)).size;
      return {
        directionId: items[0].directionId,
        direction: items[0].direction,
        days: days.join(" · "),
        time: `${formatClock(Math.min(...starts))}–${formatClock(Math.max(...ends))}`,
        groups,
        groupsLabel: countLabel(groups, "группа", "группы", "групп"),
      };
    });
}

export function countLabel(count: number, one: string, few: string, many: string) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  const word = mod10 === 1 && mod100 !== 11 ? one : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14) ? few : many;
  return `${count} ${word}`;
}

function formatClock(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}:${String(mins).padStart(2, "0")}`;
}
