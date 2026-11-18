export function buttonClass(variant: "primary" | "light" | "ghost" | "ghostLight" | "pine" = "primary") {
  const base =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-btn border-[2.5px] border-ink px-5 py-2.5 text-center text-sm font-black transition duration-150 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-blue disabled:cursor-not-allowed disabled:opacity-60";
  const variants = {
    primary: "bg-orange text-ink shadow-btn-main hover:translate-y-1 hover:shadow-[0_2px_0_#B7410A]",
    light: "bg-white text-ink shadow-btn-alt",
    ghost: "bg-white text-ink shadow-btn-alt",
    ghostLight: "border-white bg-transparent text-white shadow-on-ink",
    pine: "border-ink bg-blue text-white shadow-btn-alt",
  };
  return `${base} ${variants[variant]}`;
}
