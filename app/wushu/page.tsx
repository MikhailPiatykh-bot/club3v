import type { Metadata } from "next";
import { DirectionView } from "@/components/direction-view";
import { directions } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: directions.wushu.title,
  description: directions.wushu.description,
  path: "/wushu",
});

export default function WushuPage() {
  return <DirectionView direction="wushu" />;
}
