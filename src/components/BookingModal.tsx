"use client";

import {
  createContext,
  type FormEvent,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  Check,
  Clock,
  Mail,
  MessageSquare,
  Phone,
  User,
  X,
} from "lucide-react";
import { clsx } from "clsx";
import { priceCategories, site } from "@/lib/data";

type BookingContextValue = {
  openBooking: () => void;
};

type BookingDate = {
  value: string;
  weekday: string;
  day: string;
  label: string;
  dayName: string;
};

const BookingContext = createContext<BookingContextValue | null>(null);

const timeSlotsByDay: Record<string, string[]> = {
  Montag: ["17:00", "17:45", "18:30", "19:15", "20:00", "20:45"],
  Dienstag: ["17:00", "17:30"],
  Mittwoch: ["17:00", "17:45", "18:30", "19:15", "20:00", "20:45"],
  Donnerstag: ["17:00", "17:45", "18:30", "19:15", "20:00", "20:45"],
  Freitag: ["16:30", "17:15"],
  Samstag: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00"],
};

const services = priceCategories.flatMap((category) =>
  category.items.map((item) => ({
    ...item,
    category: category.title,
    id: `${category.title}-${item.name}`.toLowerCase().replace(/\s+/g, "-"),
  })),
);

function buildDates(): BookingDate[] {
  const formatter = new Intl.DateTimeFormat("de-DE", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
  });
  const shortWeekday = new Intl.DateTimeFormat("de-DE", { weekday: "short" });
  const dayNumber = new Intl.DateTimeFormat("de-DE", { day: "2-digit" });
  const result: BookingDate[] = [];
  const date = new Date();

  for (let i = 0; result.length < 12 && i < 24; i += 1) {
    const candidate = new Date(date);
    candidate.setDate(date.getDate() + i);
    const dayName = formatter.formatToParts(candidate).find((part) => part.type === "weekday")?.value;
    if (!dayName || !timeSlotsByDay[dayName]) {
      continue;
    }

    result.push({
      value: candidate.toISOString().slice(0, 10),
      weekday: shortWeekday.format(candidate).replace(".", "").toUpperCase(),
      day: dayNumber.format(candidate),
      label: formatter.format(candidate),
      dayName,
    });
  }

  return result;
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <BookingContext.Provider value={{ openBooking: () => setOpen(true) }}>
      {children}
      <BookingDialog open={open} onClose={() => setOpen(false)} />
    </BookingContext.Provider>
  );
}

export function BookingButton({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const booking = useContext(BookingContext);

  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        booking?.openBooking();
      }}
      className={className}
    >
      {children}
    </button>
  );
}

function BookingDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [dates, setDates] = useState<BookingDate[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(priceCategories[0].title);
  const categoryServices = useMemo(
    () => services.filter((service) => service.category === selectedCategory),
    [selectedCategory],
  );
  const [selectedServiceId, setSelectedServiceId] = useState(categoryServices[0]?.id ?? "");
  const [selectedDate, setSelectedDate] = useState("");
  const selectedDateInfo = dates.find((date) => date.value === selectedDate);
  const availableTimes = selectedDateInfo ? timeSlotsByDay[selectedDateInfo.dayName] : [];
  const [selectedTime, setSelectedTime] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const selectedService = services.find((service) => service.id === selectedServiceId);

  useEffect(() => {
    if (!open) {
      return;
    }

    const nextDates = buildDates();
    setDates(nextDates);
    setSelectedDate((current) => current || nextDates[0]?.value || "");
    setSubmitted(false);
  }, [open]);

  useEffect(() => {
    setSelectedServiceId(categoryServices[0]?.id ?? "");
  }, [categoryServices]);

  useEffect(() => {
    if (!availableTimes.includes(selectedTime)) {
      setSelectedTime(availableTimes[0] ?? "");
    }
  }, [availableTimes, selectedTime]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dateLabel = selectedDateInfo?.label ?? selectedDate;
    const body = [
      "Hallo Mira,",
      "",
      "ich möchte gerne einen Termin anfragen:",
      `Leistung: ${selectedService?.category} - ${selectedService?.name}`,
      `Datum: ${dateLabel}`,
      `Uhrzeit: ${selectedTime}`,
      `Name: ${data.get("name")}`,
      `E-Mail: ${data.get("email")}`,
      `Telefon: ${data.get("phone") || "-"}`,
      `Anmerkung: ${data.get("note") || "-"}`,
    ].join("\n");

    setSubmitted(true);
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Terminanfrage")}&body=${encodeURIComponent(body)}`;
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/55 p-3 backdrop-blur-sm sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            className="flex max-h-[92svh] w-full max-w-5xl flex-col overflow-hidden rounded-[1.5rem] bg-cream shadow-2xl"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-nude/25 px-5 py-4 sm:px-7">
              <div>
                <p className="script-accent text-2xl text-rose">Online buchen</p>
                <h2 id="booking-title" className="section-heading text-2xl text-plum sm:text-3xl">
                  Termin anfragen
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Buchungsfenster schließen"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-rose-light text-plum transition-colors hover:bg-rose hover:text-cream"
              >
                <X className="h-5 w-5" strokeWidth={1.8} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
              <div className="space-y-8">
                <section>
                  <StepTitle number="1" label="Leistung wählen" />
                  <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                    {priceCategories.map((category) => (
                      <button
                        key={category.title}
                        type="button"
                        onClick={() => setSelectedCategory(category.title)}
                        className={clsx(
                          "shrink-0 border px-4 py-2.5 text-sm font-medium transition-colors",
                          selectedCategory === category.title
                            ? "border-rose bg-rose text-cream"
                            : "border-nude/30 bg-white/65 text-ink/75 hover:border-rose/60",
                        )}
                      >
                        {category.title}
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {categoryServices.map((service) => (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => setSelectedServiceId(service.id)}
                        className={clsx(
                          "min-h-28 border p-4 text-left transition-colors",
                          selectedServiceId === service.id
                            ? "border-rose bg-rose-light/70"
                            : "border-nude/30 bg-white/70 hover:border-rose/50",
                        )}
                      >
                        <span className="flex items-start justify-between gap-3">
                          <span className="font-medium text-plum">{service.name}</span>
                          <span className="whitespace-nowrap text-sm font-semibold text-rose-dark">
                            {service.prefixAb ? "ab " : ""}
                            {service.price}
                          </span>
                        </span>
                        {service.duration && (
                          <span className="mt-2 flex items-center gap-1.5 text-xs uppercase tracking-wide text-ink/55">
                            <Clock className="h-3.5 w-3.5" strokeWidth={1.6} />
                            {service.duration}
                          </span>
                        )}
                        {service.detail && (
                          <span className="mt-2 line-clamp-2 block text-sm leading-relaxed text-ink/60">
                            {service.detail}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </section>

                <section>
                  <StepTitle icon={<CalendarDays className="h-5 w-5" strokeWidth={1.7} />} number="2" label="Tag wählen" />
                  <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                    {dates.map((date) => (
                      <button
                        key={date.value}
                        type="button"
                        onClick={() => setSelectedDate(date.value)}
                        className={clsx(
                          "grid h-24 w-20 shrink-0 place-items-center border text-center transition-colors",
                          selectedDate === date.value
                            ? "border-rose bg-rose text-cream"
                            : "border-nude/30 bg-white/70 text-ink/70 hover:border-rose/60",
                        )}
                      >
                        <span className="text-xs font-medium tracking-wide">{date.weekday}</span>
                        <span className="section-heading text-2xl">{date.day}</span>
                      </button>
                    ))}
                  </div>
                </section>

                <section>
                  <StepTitle icon={<Clock className="h-5 w-5" strokeWidth={1.7} />} number="3" label="Uhrzeit wählen" />
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {availableTimes.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={clsx(
                          "border px-4 py-3 text-sm font-medium transition-colors",
                          selectedTime === time
                            ? "border-rose bg-rose text-cream"
                            : "border-nude/30 bg-white/70 text-ink/75 hover:border-rose/60",
                        )}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </section>

                <section>
                  <StepTitle number="4" label="Ihre Kontaktdaten" />
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <Field icon={<User />} name="name" placeholder="Ihr Name*" required />
                    <Field icon={<Mail />} name="email" type="email" placeholder="Ihre E-Mail*" required />
                    <Field icon={<Phone />} name="phone" type="tel" placeholder="Telefon" className="sm:col-span-2" />
                    <label className="flex min-h-24 items-start gap-3 border border-nude/30 bg-white/70 px-4 py-4 text-ink/70 focus-within:border-rose">
                      <MessageSquare className="mt-0.5 h-5 w-5 shrink-0 text-rose" strokeWidth={1.6} />
                      <textarea
                        name="note"
                        placeholder="Anmerkungen (optional)"
                        className="min-h-20 w-full resize-y bg-transparent text-sm outline-none placeholder:text-ink/55"
                      />
                    </label>
                  </div>
                </section>
              </div>

              <div className="mt-8 flex flex-col gap-4 border-t border-nude/25 pt-5 lg:flex-row lg:items-center lg:justify-between">
                <p className="text-sm text-ink/65">
                  {selectedService?.category} · {selectedService?.name} · {selectedDateInfo?.label} · {selectedTime}
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  {submitted && (
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-plum">
                      <Check className="h-4 w-4 text-rose" strokeWidth={2} />
                      Anfrage vorbereitet
                    </span>
                  )}
                  <button
                    type="submit"
                    className="rounded-full bg-rose px-7 py-3.5 text-sm font-semibold tracking-[0.18em] text-cream transition-colors hover:bg-rose-dark"
                  >
                    Termin anfragen
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StepTitle({
  icon,
  number,
  label,
}: {
  icon?: ReactNode;
  number: string;
  label: string;
}) {
  return (
    <h3 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-ink">
      {icon ?? <span className="text-rose">{number}.</span>}
      <span>{icon ? `${number}. ${label}` : label}</span>
    </h3>
  );
}

function Field({
  icon,
  className,
  ...props
}: {
  icon: ReactNode;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label
      className={clsx(
        "flex items-center gap-3 border border-nude/30 bg-white/70 px-4 py-4 text-ink/70 focus-within:border-rose",
        className,
      )}
    >
      <span className="text-rose [&>svg]:h-5 [&>svg]:w-5 [&>svg]:stroke-[1.6]">
        {icon}
      </span>
      <input
        {...props}
        className="w-full bg-transparent text-sm outline-none placeholder:text-ink/55"
      />
    </label>
  );
}
