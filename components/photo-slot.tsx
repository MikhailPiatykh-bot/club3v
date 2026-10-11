import Image from "next/image";

export function PhotoSlot({
  src,
  alt,
  width,
  height,
  label = "Фото добавит клуб",
  className = "",
  priority = false,
}: {
  src: string | null;
  alt: string;
  width: number;
  height: number;
  label?: string;
  className?: string;
  priority?: boolean;
}) {
  if (!src) {
    return (
      <div
        className={`grid place-items-center bg-paper-2 text-center text-sm text-ink-soft ${className}`}
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <span className="px-4">{label}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      sizes="(min-width: 1024px) 480px, 100vw"
      className={`h-auto w-full object-cover ${className}`}
    />
  );
}
