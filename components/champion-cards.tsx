import type { ChampionCard } from "@/lib/content";

const sport: Record<string, string> = {
  wushu: "Ушу",
  acrobatics: "Акробатика",
};

const tint = ["bg-pink", "bg-blue", "bg-mint", "bg-orange"];

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

export function ChampionCards({ items }: { items: ChampionCard[] }) {
  return (
    <ul className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
      {items.map((item, index) => (
        <li key={item.name} className="overflow-hidden rounded-card border-[3px] border-ink bg-white shadow-card">
          <div className="relative aspect-[3/3.6] border-b-[3px] border-ink bg-blue">
            {item.photo ? (
              // Portraits are content files with a fixed frame, not layout images.
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.photo} alt={item.name} width={420} height={560} className="h-full w-full object-cover" />
            ) : (
              <div className={`grid h-full place-items-center font-display text-5xl font-black text-white ${tint[index % tint.length]}`}>
                {initials(item.name)}
              </div>
            )}
            <span className="absolute right-2 top-2 rounded-pill border-2 border-ink bg-white px-2 py-0.5 text-[11px] font-black">
              {sport[item.direction] ?? item.direction}
            </span>
          </div>
          <div className="p-3">
            <h3 className="font-display text-[19px] font-extrabold leading-tight">{item.name}</h3>
            <p className="mt-1 text-[15px] font-bold">{item.rank}</p>
            {item.detail ? <p className="mt-1 text-sm">{item.detail}</p> : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
