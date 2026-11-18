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

function portraitSet(photo: string) {
  return `${photo} 1000w, ${photo.replace(/(\.\w+)$/, "@2x$1")} 1600w`;
}

export function ChampionCards({ items }: { items: ChampionCard[] }) {
  return (
    <ul className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
      {items.map((item, index) => (
        <li key={item.name} className="overflow-hidden rounded-card border-[3px] border-ink bg-white text-ink shadow-card">
          <div className="relative aspect-[4/5] border-b-[3px] border-ink bg-[#14224f]">
            {item.photo ? (
              // Portraits are content files with a fixed frame, not layout images.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.photo}
                srcSet={portraitSet(item.photo)}
                sizes="(min-width: 1024px) 320px, 46vw"
                alt={item.name}
                width={800}
                height={1000}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className={`grid h-full place-items-center font-display text-5xl font-black text-white ${tint[index % tint.length]}`}>
                {initials(item.name)}
              </div>
            )}
            <span className="absolute right-2 top-2 rounded-pill border-2 border-ink bg-white px-2 py-0.5 text-[11px] font-black text-ink">
              {sport[item.direction] ?? item.direction}
            </span>
          </div>
          <div className="p-3 text-ink">
            <h3 className="font-display text-[19px] font-extrabold leading-tight">{item.name}</h3>
            <p className="mt-1 text-[15px] font-bold">{item.rank}</p>
            {item.detail ? <p className="mt-1 text-sm">{item.detail}</p> : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
