import { SignupButton } from "@/components/signup-button";

export function CtaBand({
  direction,
  placement,
  kind = "enroll",
  audience = "child",
}: {
  direction?: string;
  placement: string;
  kind?: "enroll" | "waitlist" | "camp" | "china" | "rent" | "coach";
  audience?: "child" | "adult";
}) {
  return (
    <section className="bg-blue-mist">
      <div className="mx-auto flex w-full max-w-wrap flex-col gap-5 px-10 py-12 max-md:px-[18px] md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-display text-3xl font-black">Месяц с гарантией</h2>
          <p className="mt-2 max-w-xl">Абонемент 9 000 ₽. Если не подойдёт, вернём деньги за первый месяц.</p>
        </div>
        <SignupButton placement={placement} direction={direction} kind={kind} audience={audience} className="inline-flex h-14 items-center justify-center rounded-btn border-[2.5px] border-ink bg-orange px-6 font-black text-ink shadow-btn-main">
          Записаться
        </SignupButton>
      </div>
    </section>
  );
}
