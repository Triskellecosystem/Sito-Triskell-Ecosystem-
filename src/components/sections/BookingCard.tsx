"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/** Mini scheda di prenotazione interattiva: scegli giorno e orario, il pulsante (pulsante) porta ai contatti. */
export function BookingCard() {
  const { booking, href } = site.cta;
  const [day, setDay] = useState(3);
  const [time, setTime] = useState(2);

  const pill = (on: boolean) =>
    cn(
      "rounded-xl border px-3 py-2.5 font-display text-[0.9375rem] font-semibold transition-[background-color,border-color,color,box-shadow] duration-[var(--dur-base)] ease-out-expo",
      on
        ? "border-gold-300 bg-gold-300/15 text-gold-100 shadow-[0_0_24px_-6px_rgb(247_200_92/0.7)]"
        : "border-line-strong bg-night/40 text-fg-2 hover:border-gold-300/60 hover:text-fg",
    );

  return (
    <div className="relative mx-auto w-full max-w-md rounded-card border border-gold-400/40 bg-[linear-gradient(165deg,var(--color-surface-2),var(--color-night-raised))] p-5 shadow-glow-gold sm:p-6">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl border border-gold-400/50 bg-gold-300/10 text-gold-300">
          <Icon name="calendar" className="h-5 w-5" strokeWidth={1.7} />
        </span>
        <div>
          <p className="font-display text-[1.0625rem] font-semibold leading-tight text-fg">{booking.title}</p>
          <p className="mt-0.5 text-[0.8125rem] text-fg-2">{booking.note}</p>
        </div>
      </div>

      <fieldset className="mt-5">
        <legend className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-fg-3">{booking.daysLabel}</legend>
        <div className="grid grid-cols-5 gap-2">
          {booking.days.map((d, i) => (
            <button key={d} type="button" aria-pressed={day === i} onClick={() => setDay(i)} className={pill(day === i)}>
              {d}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-4">
        <legend className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-fg-3">{booking.timesLabel}</legend>
        <div className="grid grid-cols-4 gap-2">
          {booking.times.map((t, i) => (
            <button key={t} type="button" aria-pressed={time === i} onClick={() => setTime(i)} className={pill(time === i)}>
              {t}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 flex justify-center">
        <Button href={`${href}?giorno=${encodeURIComponent(booking.days[day] ?? "")}&ora=${encodeURIComponent(booking.times[time] ?? "")}`} size="lg" icon="arrow-right" pulse className="w-full" aria-live="polite">
          {booking.confirm} {booking.days[day]} · {booking.times[time]}
        </Button>
      </div>
    </div>
  );
}
