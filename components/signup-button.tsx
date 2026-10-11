"use client";

import type { ReactNode } from "react";
import { reachGoal } from "@/lib/analytics";
import { useLead } from "@/components/lead-provider";

export function SignupButton({
  children,
  className,
  direction,
  coachId,
  coachName,
  placement,
  goal,
}: {
  children: ReactNode;
  className?: string;
  direction?: string;
  coachId?: string;
  coachName?: string;
  placement: string;
  goal?: string;
}) {
  const { openLead } = useLead();

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        if (goal) reachGoal(goal);
        openLead({ direction, coachId, coachName, placement });
      }}
    >
      {children}
    </button>
  );
}
