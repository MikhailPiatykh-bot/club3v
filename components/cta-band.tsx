import { SignupButton } from "@/components/signup-button";
import { buttonClass } from "@/lib/styles";

export function CtaBand({ direction, placement }: { direction?: string; placement: string }) {
  return (
    <section className="bg-ink text-paper">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-display text-3xl">Запись на пробное</h2>
          <p className="mt-2 max-w-xl text-paper/75">Тренер оценит физподготовку и подскажет группу.</p>
        </div>
        <SignupButton placement={placement} direction={direction} className={buttonClass()}>
          Записаться на пробное
        </SignupButton>
      </div>
    </section>
  );
}
