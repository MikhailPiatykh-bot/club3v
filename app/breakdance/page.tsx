import type { Metadata } from "next";
import { DirectionView } from "@/components/direction-view";
import { directions } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: directions.breakdance.title,
  description: directions.breakdance.description,
  path: "/breakdance",
});

export default function BreakdancePage() {
  return <DirectionView direction="breakdance" />;
}
