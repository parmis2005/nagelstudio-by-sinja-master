import Image from "next/image";
import AnimatedSection from "./AnimatedSection";
import Counter from "./Counter";
import { site, stats } from "@/lib/data";

export default function Welcome() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <AnimatedSection className="relative">
          <div className="relative aspect-[4/5] max-w-md overflow-hidden rounded-[2rem] shadow-xl">
            <Image
              src="/images/welcome-nails.webp"
              alt="Elegante roséfarbene Gelmodellage auf cremefarbenem Leinen"
              fill
              sizes="(min-width: 1024px) 448px, 80vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-plum/10 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-8 -right-4 h-40 w-40 overflow-hidden rounded-full border-8 border-cream shadow-xl sm:-right-8 sm:h-48 sm:w-48">
            <Image
              src="/images/studio-detail.webp"
              alt="Stilvoll eingerichteter Maniküreplatz im Nagelstudio"
              fill
              sizes="192px"
              className="object-cover"
            />
          </div>
          <div className="absolute -left-6 -top-6 hidden h-24 w-24 items-center justify-center rounded-full bg-rose-light sm:flex">
            <Image
              src="/images/profile-mira-avatar.webp"
              alt="Mira Hoffmann"
              width={72}
              height={72}
              className="rounded-full border-4 border-cream object-cover"
            />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <p className="script-accent text-3xl text-rose">Willkommen bei</p>
          <h2 className="section-heading mt-1 text-3xl text-plum sm:text-4xl">
            {site.name}
          </h2>
          <div className="divider-flourish my-6 w-24" />
          <p className="text-base leading-relaxed text-ink/80">
            In meinem kleinen Studio in Beispielstadt dreht sich alles um schöne,
            gesunde Nägel. Ob klassische Maniküre, stabile Naturnagelverstärkung
            oder ausgefallene Nailart – ich nehme mir Zeit für jedes Detail und
            arbeite ausschließlich mit hochwertigen Produkten.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink/80">
            Persönliche Beratung, saubere Handarbeit und ein gemütliches
            Ambiente – damit du dich rundum wohlfühlst und mit strahlenden
            Händen nach Hause gehst.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="section-heading text-3xl text-rose">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-xs leading-snug text-ink/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <a
            href="#ueber-mich"
            className="mt-10 inline-block border-b-2 border-rose pb-1 text-sm font-medium tracking-wide text-plum transition-colors hover:text-rose"
          >
            Mehr über mich
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
