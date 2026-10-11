import type { Metadata } from "next";
import { DirectionView } from "@/components/direction-view";
import { directions } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: directions.acrobatics.title,
  description: directions.acrobatics.description,
  path: "/acrobatics",
});

export default function AcrobaticsPage() {
  return <DirectionView direction="acrobatics" />;
}
