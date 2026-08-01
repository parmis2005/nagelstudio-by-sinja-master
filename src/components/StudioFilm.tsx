import Image from "next/image";
import AnimatedSection from "./AnimatedSection";
import { site } from "@/lib/data";

export default function StudioFilm() {
  return (
    <section className="overflow-hidden bg-rose-light py-20 text-ink lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1.35fr_0.65fr] lg:px-10">
        <AnimatedSection className="relative">
          <div className="absolute -left-16 -top-16 h-44 w-44 rounded-full border border-rose/30" />
          <div className="absolute -bottom-10 right-8 h-24 w-24 rounded-full bg-rose/20 blur-2xl" />

          <div className="relative aspect-video overflow-hidden rounded-[2rem] border border-ink/10 bg-ink shadow-2xl shadow-ink/20">
            <video
              className="h-full w-full object-cover motion-reduce:hidden"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/images/studio-film-poster.jpg"
              aria-label="Filmische Einblicke in Nagelstudio und Nailart"
            >
              <source
                src="/videos/sinja-studio-film.webm"
                type="video/webm"
              />
              <source src="/videos/sinja-studio-film.mp4" type="video/mp4" />
              Dein Browser unterstützt die Videowiedergabe nicht.
            </video>
            <Image
              src="/images/studio-film-poster.jpg"
              alt="Stilvoller Arbeitsplatz im Nagelstudio"
              fill
              sizes="(min-width: 1024px) 760px, 100vw"
              className="hidden object-cover motion-reduce:block"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink/35 via-transparent to-rose/10" />

            <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-full border border-cream/20 bg-ink/45 px-4 py-2 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-rose" />
              </span>
              <span className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-cream/90">
                Studiofilm
              </span>
            </div>
          </div>

          <p className="section-heading absolute -bottom-5 right-5 hidden rotate-[-3deg] rounded-full bg-plum px-6 py-3 text-sm tracking-wide text-cream shadow-lg sm:block">
            Handwerk. Ruhe. Detail.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.12}>
          <p className="script-accent text-3xl text-rose-dark">
            Ein Gefühl für Details
          </p>
          <h2 className="section-heading mt-2 text-3xl leading-tight sm:text-4xl lg:text-5xl">
            Schönheit entsteht nicht nebenbei.
          </h2>
          <div className="my-7 h-px w-20 bg-gradient-to-r from-gold to-transparent" />
          <p className="text-base leading-relaxed text-ink/70">
            Jede Modellage entsteht in Ruhe, mit einem sicheren Blick für Form,
            Farbe und feine Details. Das Ergebnis: Nägel, die zu dir passen –
            nicht einfach nur zum nächsten Trend.
          </p>

          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-plum px-6 py-3.5 text-sm font-medium tracking-wide text-cream transition-all hover:-translate-y-0.5 hover:bg-plum-light hover:shadow-xl"
          >
            Deinen Termin reservieren
            <span aria-hidden className="text-lg leading-none">
              ↗
            </span>
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
