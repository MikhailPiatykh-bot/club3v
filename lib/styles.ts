export function buttonClass(variant: "primary" | "light" | "ghost" | "ghostLight" | "pine" = "primary") {
  const base =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-center text-sm font-semibold transition duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60";
  const variants = {
    primary: "bg-cinnabar text-white hover:bg-cinnabar-deep focus-visible:outline-cinnabar",
    light: "bg-card text-ink hover:bg-white focus-visible:outline-card",
    ghost: "border border-line bg-card text-ink hover:border-ink/30 focus-visible:outline-cinnabar",
    ghostLight: "border border-white/30 text-white hover:bg-white/10 focus-visible:outline-white",
    pine: "bg-pine text-white hover:bg-pine/90 focus-visible:outline-pine",
  };
  return `${base} ${variants[variant]}`;
}
