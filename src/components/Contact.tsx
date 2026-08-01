import { Clock, MapPin, Phone } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { openingHours, site } from "@/lib/data";

export default function Contact() {
  return (
    <section id="kontakt" className="relative overflow-hidden bg-plum py-24 text-cream lg:py-32">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-rose/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <p className="script-accent text-3xl text-rose-light">
            Haben Sie noch Fragen?
          </p>
          <h2 className="section-heading mt-1 text-3xl sm:text-4xl">
            Wir freuen uns auf dich
          </h2>
          <div className="divider-flourish mx-auto my-6 w-24 [&::before]:bg-plum" />
          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-full bg-rose px-8 py-4 text-sm font-medium tracking-wide text-cream shadow-lg transition-all hover:bg-rose-dark hover:shadow-xl"
          >
            Online Termin buchen
          </a>
        </AnimatedSection>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          <AnimatedSection delay={0.05}>
            <div className="flex h-full flex-col gap-4 rounded-2xl bg-cream/10 p-8 backdrop-blur-sm">
              <MapPin className="h-6 w-6 text-rose-light" strokeWidth={1.5} />
              <h3 className="section-heading text-xl">Adresse</h3>
              <p className="text-sm leading-relaxed text-cream/85">
                {site.name}
                <br />
                {site.address.street}
                <br />
                {site.address.zipCity}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="flex h-full flex-col gap-4 rounded-2xl bg-cream/10 p-8 backdrop-blur-sm">
              <Phone className="h-6 w-6 text-rose-light" strokeWidth={1.5} />
              <h3 className="section-heading text-xl">Kontakt</h3>
              <a
                href={site.phoneHref}
                className="text-sm text-cream/85 transition-colors hover:text-rose-light"
              >
                Tel.: {site.phone}
              </a>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-cream/85 transition-colors hover:text-rose-light"
              >
                @nagelstudio_by_sinja
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="flex h-full flex-col gap-4 rounded-2xl bg-cream/10 p-8 backdrop-blur-sm">
              <Clock className="h-6 w-6 text-rose-light" strokeWidth={1.5} />
              <h3 className="section-heading text-xl">Öffnungszeiten</h3>
              <ul className="space-y-1.5 text-sm text-cream/85">
                {openingHours.map((entry) => (
                  <li key={entry.day} className="flex justify-between gap-4">
                    <span>{entry.day}</span>
                    <span
                      className={
                        entry.hours === "geschlossen" ? "text-cream/50" : ""
                      }
                    >
                      {entry.hours}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.2} className="mt-10 overflow-hidden rounded-2xl">
          <iframe
            title="Standort Nagelstudio by Sinja"
            src={site.mapEmbedUrl}
            className="h-80 w-full grayscale"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </AnimatedSection>
      </div>
    </section>
  );
}
