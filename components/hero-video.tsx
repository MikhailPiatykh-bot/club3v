"use client";

import { useEffect, useState } from "react";

export default function HeroVideo({ src, poster }: { src: string; poster: string | null }) {
  const [desktop, setDesktop] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setDesktop(media.matches);
      setReduce(motion.matches);
    };
    apply();
    media.addEventListener("change", apply);
    motion.addEventListener("change", apply);
    return () => {
      media.removeEventListener("change", apply);
      motion.removeEventListener("change", apply);
    };
  }, []);

  if (!desktop || reduce) {
    return poster ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={poster} alt="" className="h-full w-full object-cover" />
    ) : null;
  }

  return (
    <video className="h-full w-full object-cover" autoPlay muted loop playsInline poster={poster ?? undefined}>
      <source src={src} />
    </video>
  );
}
