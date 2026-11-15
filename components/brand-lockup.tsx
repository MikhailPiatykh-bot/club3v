import Image from "next/image";
import Link from "next/link";

export function BrandLockup() {
  return (
    <Link href="/" className="flex items-center gap-2 text-ink" aria-label="Veni Vidi Vici, на главную">
      <Image src="/logo_club3v.jpg" alt="" width={960} height={897} priority className="h-16 w-auto max-md:h-12" />
      <span className="whitespace-nowrap font-display text-base font-black leading-none">Veni Vidi Vici</span>
    </Link>
  );
}
