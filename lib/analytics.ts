export const METRIKA_ID = 105597568;

type Ym = (id: number, method: "reachGoal", goal: string) => void;

export function reachGoal(goal: string) {
  if (typeof window === "undefined") return;
  const ym = (window as Window & { ym?: Ym }).ym;
  ym?.(METRIKA_ID, "reachGoal", goal);
}
