"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import InstagramIcon from "./icons/InstagramIcon";
import AnimatedSection from "./AnimatedSection";
import { site } from "@/lib/data";

const items = [
  { label: "Ombré Nailart", src: "/images/gallery/ombre.webp" },
  { label: "French Modellage", src: "/images/gallery/french.webp" },
  { label: "Chrome Design", src: "/images/gallery/chrome.webp" },
  { label: "Babyboomer", src: "/images/gallery/babyboomer.webp" },
  {
    label: "Nailart Stufe 3",
    src: "/images/gallery/nailart-stufe-3.webp",
  },
  {
    label: "Naturnagelverstärkung",
    src: "/images/gallery/naturnagelverstaerkung.webp",
  },
  { label: "Maniküre", src: "/images/gallery/manikuere.webp" },
  { label: "Pediküre", src: "/images/gallery/pedikuere.webp" },
];

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="galerie" className="bg-cream-dark/60 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <p className="script-accent text-3xl text-rose">Galerie</p>
          <h2 className="section-heading mt-1 text-3xl text-plum sm:text-4xl">
            Meine Nagelkunst
          </h2>
          <div className="divider-flourish mx-auto my-6 w-24" />
          <p className="text-base leading-relaxed text-ink/70">
            Eine kleine Auswahl vergangener Arbeiten. Mehr Designs findest du
            auf Instagram.
          </p>
        </AnimatedSection>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item, i) => (
            <AnimatedSection key={item.label} delay={(i % 4) * 0.06}>
              <button
                onClick={() => setActive(i)}
                aria-label={`${item.label} vergrößern`}
                className="group relative block aspect-square w-full overflow-hidden rounded-xl bg-rose-light shadow-sm"
              >
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-plum/75 via-plum/25 to-transparent px-4 pb-4 pt-12 text-left opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="text-sm font-medium tracking-wide text-cream">
                    {item.label}
                  </span>
                </div>
              </button>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-14 text-center" delay={0.1}>
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-plum/30 px-7 py-3.5 text-sm font-medium tracking-wide text-plum transition-all hover:bg-plum hover:text-cream"
          >
            <InstagramIcon className="h-4 w-4" strokeWidth={1.5} />
            Mehr auf Instagram
          </a>
        </AnimatedSection>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-6"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative aspect-square w-full max-w-lg overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={items[active].src}
                alt={items[active].label}
                fill
                sizes="512px"
                className="object-cover"
              />
              <button
                aria-label="Schließen"
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 rounded-full bg-cream/90 p-2 text-plum"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
