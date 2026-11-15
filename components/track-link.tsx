"use client";

import type { AnchorHTMLAttributes } from "react";
import { reachGoal } from "@/lib/analytics";

export function TrackLink({
  goal,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { goal?: string }) {
  return (
    <a
      {...props}
      onClick={(event) => {
        props.onClick?.(event);
        if (goal) reachGoal(goal);
      }}
    >
      {children}
    </a>
  );
}
