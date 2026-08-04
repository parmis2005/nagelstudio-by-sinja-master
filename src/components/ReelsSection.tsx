import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import InstagramIcon from "./icons/InstagramIcon";
import { site } from "@/lib/data";

export default function ReelsSection() {
  return (
    <section className="relative overflow-hidden bg-cream py-24 lg:py-32">
      <div className="absolute -right-28 top-24 h-72 w-72 rounded-full bg-rose-light/70 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
        <AnimatedSection className="relative mx-auto w-full max-w-[350px] lg:mx-0">
          <div className="absolute -left-7 top-16 hidden h-40 w-px bg-gradient-to-b from-transparent via-gold to-transparent sm:block" />
          <div className="relative aspect-[9/16] overflow-hidden rounded-[2.25rem] border-[10px] border-plum bg-ink shadow-2xl shadow-plum/25">
            <video
              className="h-full w-full object-cover motion-reduce:hidden"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/images/mira-reel-poster.jpg"
              aria-label="Nailart Reel aus dem Studio"
            >
              <source src="/videos/mira-reel-nails.webm" type="video/webm" />
              <source src="/videos/mira-reel-nails.mp4" type="video/mp4" />
              Dein Browser unterstützt die Videowiedergabe nicht.
            </video>
            <Image
              src="/images/mira-reel-poster.jpg"
              alt={`Nailart Reel von ${site.name}`}
              fill
              sizes="350px"
              className="hidden object-cover motion-reduce:block"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/15 via-transparent to-ink/50" />

            <div className="absolute left-5 right-5 top-5 flex items-center justify-between text-cream">
              <div className="flex items-center gap-2 rounded-full bg-ink/25 px-3 py-2 backdrop-blur-md">
                <InstagramIcon className="h-4 w-4" strokeWidth={1.7} />
                <span className="text-[0.62rem] font-medium tracking-wide">
                  {site.instagramHandle}
                </span>
              </div>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cream/15 backdrop-blur-md">
                <Play className="h-3.5 w-3.5 fill-current" />
              </span>
            </div>
          </div>

          <div className="script-accent absolute -bottom-5 -right-5 rotate-3 rounded-full bg-rose px-6 py-3 text-xl text-cream shadow-lg">
            behind the scenes
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.12} className="lg:pl-10">
          <div className="inline-flex items-center gap-3 text-rose">
            <InstagramIcon className="h-5 w-5" strokeWidth={1.5} />
            <span className="text-xs font-semibold uppercase tracking-[0.24em]">
              Studio Reels
            </span>
          </div>
          <h2 className="section-heading mt-5 max-w-2xl text-4xl leading-tight text-plum sm:text-5xl">
            Echte Einblicke. Echte Handarbeit.
          </h2>
          <div className="divider-flourish my-7 w-24" />
          <p className="max-w-xl text-base leading-relaxed text-ink/70">
            Vom ersten Pinselstrich bis zum fertigen Design: In meinen Reels
            zeige ich, wie viel Ruhe, Präzision und Liebe zum Detail in jeder
            Modellage steckt.
          </p>

          <div className="mt-9 grid max-w-xl grid-cols-3 gap-3">
            {[
              "/images/gallery/nailart-stufe-3.webp",
              "/images/gallery/chrome.webp",
              "/images/gallery/babyboomer.webp",
            ].map((src, index) => (
              <a
                key={src}
                href={site.instagramUrl}
                aria-label={`Weitere Nailart auf Instagram ansehen ${index + 1}`}
                className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-rose-light"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="180px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-plum/0 transition-colors group-hover:bg-plum/15" />
              </a>
            ))}
          </div>

          <a
            href={site.instagramUrl}
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-plum px-6 py-3.5 text-sm font-medium tracking-wide text-cream transition-all hover:-translate-y-0.5 hover:bg-plum-light hover:shadow-lg"
          >
            Alle Reels auf Instagram
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
