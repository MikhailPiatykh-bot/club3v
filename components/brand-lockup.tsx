import Image from "next/image";
import Link from "next/link";

export function BrandLockup() {
  return (
    <Link href="/" className="flex items-center gap-2 text-ink">
      <span className="grid h-[58px] w-[58px] place-items-center overflow-hidden rounded-full bg-white max-md:h-[46px] max-md:w-[46px]">
        <Image src="/logo_club3v.png" alt="" width={56} height={56} priority className="h-14 w-14 max-md:h-10 max-md:w-10" />
      </span>
      <span className="font-display text-lg font-black leading-none">Veni Vidi Vici</span>
    </Link>
  );
}
