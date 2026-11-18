import type { Metadata } from "next";
import { DirectionView } from "@/components/direction-view";
import { directions } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: directions.group3.title,
  description: directions.group3.description,
  path: "/group-3plus",
});

export default function Group3Page() {
  return <DirectionView direction="group3" />;
}
