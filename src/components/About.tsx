import Image from "next/image";
import InstagramIcon from "./icons/InstagramIcon";
import AnimatedSection from "./AnimatedSection";
import { site } from "@/lib/data";

export default function About() {
  return (
    <section id="ueber-mich" className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <AnimatedSection className="order-2 lg:order-1">
          <p className="script-accent text-3xl text-rose">Über mich</p>
          <h2 className="section-heading mt-1 text-3xl text-plum sm:text-4xl">
            {site.owner}
          </h2>
          <div className="divider-flourish my-6 w-24" />
          <p className="text-base leading-relaxed text-ink/80">
            Ich bin Mira – Nageldesignerin mit Leidenschaft für Handarbeit und
            Details. In meinem Studio in Beispielstadt kümmere ich mich persönlich
            um jede Kundin: von der klassischen Maniküre bis zur
            aufwendigen Nailart.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink/80">
            Mir ist wichtig, dass sich meine Kundinnen wohlfühlen und mit
            gesunden, gepflegten Nägeln nach Hause gehen. Deshalb arbeite ich
            sorgfältig, hygienisch und mit hochwertigen Produkten.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={site.instagramUrl}
              className="inline-flex items-center gap-2 rounded-full bg-rose-light px-5 py-2.5 text-sm font-medium text-plum transition-colors hover:bg-rose hover:text-cream"
            >
              <InstagramIcon className="h-4 w-4" strokeWidth={1.5} />
              {site.instagramHandle}
            </a>
            <a
              href={site.bookingUrl}
              className="border-b-2 border-rose pb-1 text-sm font-medium tracking-wide text-plum transition-colors hover:text-rose"
            >
              Termin buchen
            </a>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="order-1 flex justify-center lg:order-2">
          <div className="relative">
            <div className="h-72 w-72 overflow-hidden rounded-[3rem] border-8 border-cream-dark shadow-xl sm:h-80 sm:w-80">
              <Image
                src="/images/profile-mira-hd.webp"
                alt={site.owner}
                width={320}
                height={320}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="script-accent absolute -bottom-4 -left-4 rounded-full bg-plum px-6 py-3 text-lg text-cream shadow-lg">
              Nageldesignerin
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
