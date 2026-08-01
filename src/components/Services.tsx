import { Droplet, Gem, Hand, Sparkle } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { services } from "@/lib/data";

const icons = [Gem, Droplet, Sparkle, Hand];

export default function Services() {
  return (
    <section id="leistungen" className="bg-cream-dark/60 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <p className="script-accent text-3xl text-rose">Meine Leistungen</p>
          <h2 className="section-heading mt-1 text-3xl text-plum sm:text-4xl">
            Für schöne Hände & Füße
          </h2>
          <div className="divider-flourish mx-auto my-6 w-24" />
          <p className="text-base leading-relaxed text-ink/70">
            Ein kleiner Überblick über mein Angebot – die vollständige
            Preisliste mit allen Größen und Leistungen findest du weiter
            unten.
          </p>
        </AnimatedSection>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = icons[i % icons.length];
            return (
              <AnimatedSection key={service.title} delay={i * 0.08}>
                <div className="group h-full rounded-2xl border border-nude/30 bg-cream p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-light transition-colors group-hover:bg-rose">
                    <Icon
                      className="h-7 w-7 text-rose transition-colors group-hover:text-cream"
                      strokeWidth={1.25}
                    />
                  </div>
                  <h3 className="section-heading mt-6 text-xl text-plum">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">
                    {service.description}
                  </p>
                  <p className="mt-4 text-sm font-medium tracking-wide text-rose">
                    {service.priceFrom}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection className="mt-14 text-center" delay={0.2}>
          <a
            href="#preise"
            className="rounded-full bg-plum px-7 py-3.5 text-sm font-medium tracking-wide text-cream transition-all hover:bg-plum-light"
          >
            Zur vollständigen Preisliste
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
