import { DraftMark } from "@/components/draft-mark";

type Block = { type: string; text?: string; items?: string[] };

export function LegalDoc({
  title,
  draft,
  blocks,
}: {
  title: string;
  draft: boolean;
  blocks: Block[];
}) {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 md:py-14">
      {draft && (
        <p className="mb-4">
          <DraftMark>Текст готовит юрист</DraftMark>
        </p>
      )}
      <h1 className="font-display text-4xl leading-tight">{title}</h1>
      <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink-soft">
        {blocks.map((block, index) => {
          if (block.type === "h2" && block.text) {
            return (
              <h2 key={index} className="pt-4 font-display text-2xl text-ink">
                {block.text}
              </h2>
            );
          }
          if (block.type === "ul" && block.items) {
            return (
              <ul key={index} className="list-disc space-y-2 pl-5">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          }
          return <p key={index}>{block.text}</p>;
        })}
      </div>
    </article>
  );
}
