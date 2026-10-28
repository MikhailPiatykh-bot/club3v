import { MessengerLinks } from "@/components/messengers";

export function ContactRail() {
  return (
    <div className="fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 min-[1560px]:block">
      <MessengerLinks className="flex-col" />
    </div>
  );
}
