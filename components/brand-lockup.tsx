import Image from "next/image";
import Link from "next/link";

export function BrandLockup({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="brand">
      <Image src="/logo_club3v.png" alt="" width={56} height={56} priority />
      <div>
        <b>Veni Vidi Vici</b>
        {compact ? (
          <span>Детский спортивный клуб · CLUB3V</span>
        ) : (
          <>
            <span className="sl">Детский спортивный клуб · CLUB3V</span>
            <span className="ss">CLUB3V · детский клуб</span>
          </>
        )}
      </div>
    </Link>
  );
}
