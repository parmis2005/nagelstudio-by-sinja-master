"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { clsx } from "clsx";
import { site } from "@/lib/data";
import InstagramIcon from "./icons/InstagramIcon";
import { BookingButton } from "./BookingModal";

type Side = "left" | "right";

const slides: {
  badge: string;
  heading: string[];
  text: string;
  personSide: Side;
  photo: string;
  focus: string;
}[] = [
  {
    badge: "Nagelmodellage",
    heading: ["Stil", "Modellage"],
    text: "Modellage in Gel & Acryl – individuell auf deine Wunschform abgestimmt.",
    personSide: "right",
    photo: "/images/hero-hand.png",
    focus: "18% 45%",
  },
  {
    badge: "Nailart",
    heading: ["Kreativ", "Künstlerisch", "Elegant"],
    text: "Von dezent bis auffällig: kreative Designs für jeden Anlass.",
    personSide: "left",
    photo: "/images/hero-face.png",
    focus: "30% 40%",
  },
];

const AUTOPLAY_MS = 6000;

// Hand-drawn "scribble circle" instead of a geometric ring — two overlapping
// wobbly, brush-like strokes, generated as SVG paths (no image asset needed).
// Spins constantly regardless of slide changes, matching the reference's
// .spin-circle (25s linear infinite, never resets).
const RING_OUTER =
  "M187.60,100.00 C186.43,112.75 181.67,125.45 175.93,136.57 C170.19,147.68 162.43,157.86 153.18,166.68 C143.93,175.50 132.67,185.76 120.42,189.48 C108.17,193.21 92.08,192.66 79.68,189.03 C67.28,185.40 55.15,176.50 46.02,167.69 C36.89,158.88 30.54,147.45 24.90,136.17 C19.25,124.89 13.49,112.70 12.15,100.00 C10.81,87.30 11.59,71.71 16.86,59.96 C22.13,48.21 33.08,36.62 43.79,29.52 C54.50,22.41 68.65,19.27 81.14,17.35 C93.62,15.43 106.22,15.94 118.72,17.99 C131.21,20.04 145.40,22.64 156.11,29.65 C166.81,36.66 177.71,48.32 182.96,60.05 C188.21,71.77 188.77,87.25 187.60,100.00 Z";
const RING_INNER =
  "M179.97,100.00 C180.62,114.43 177.30,132.89 169.29,144.53 C161.28,156.17 145.26,164.70 131.90,169.85 C118.54,175.00 102.59,177.69 89.16,175.42 C75.72,173.14 62.14,165.06 51.30,156.20 C40.47,147.34 29.14,135.48 24.16,122.27 C19.17,109.06 17.38,90.58 21.40,76.92 C25.43,63.26 37.02,49.28 48.28,40.32 C59.54,31.35 75.27,24.31 88.95,23.16 C102.64,22.01 117.65,27.63 130.40,33.43 C143.15,39.23 157.18,46.85 165.44,57.95 C173.70,69.04 179.33,85.57 179.97,100.00 Z";

function RotatingRing() {
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 200 200"
      animate={{ rotate: 360 }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2"
    >
      <path
        d={RING_OUTER}
        fill="none"
        stroke="var(--color-cream)"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d={RING_INNER}
        fill="none"
        stroke="var(--color-cream)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.55"
      />
    </motion.svg>
  );
}

function PersonCutout({
  index,
  side,
  photo,
  focus,
}: {
  index: number;
  side: Side;
  photo: string;
  focus: string;
}) {
  return (
    <div className="relative mx-auto aspect-[4/5] h-[52vh] max-h-[680px] w-auto lg:h-[74vh]">
      <RotatingRing />
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: side === "right" ? 120 : -120 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: side === "right" ? -60 : 60 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={photo}
            alt=""
            fill
            sizes="600px"
            className="object-cover"
            style={{ objectPosition: focus }}
            priority={index === 0}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// One continuous base tone throughout — only the diagonal wedge morphs its
// clip-path in and out, so slide 1 reads as flat and slide 2 as split,
// without ever looking like two separate images swapping.
function SlideBackground({ index }: { index: number }) {
  const split = index % 2 === 1;
  return (
    <div className="absolute inset-0 overflow-hidden bg-rose-light">
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-nude"
        initial={false}
        animate={{
          clipPath: split
            ? "polygon(58% 0%, 100% 0%, 100% 100%, 28% 100%)"
            : "polygon(118% 0%, 132% 0%, 132% 100%, 118% 100%)",
        }}
        transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_15%_15%,#fff_0,transparent_35%),radial-gradient(circle_at_85%_85%,#fff_0,transparent_30%)]" />
    </div>
  );
}

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      AUTOPLAY_MS,
    );
    return () => clearInterval(id);
  }, []);

  const slide = slides[index];
  const textSide: Side = slide.personSide === "right" ? "left" : "right";

  return (
    <section
      id="home"
      className="relative flex min-h-[640px] w-full overflow-hidden lg:h-[100svh]"
    >
      <SlideBackground index={index} />

      {/* vertical social rail */}
      <div className="pointer-events-auto absolute left-8 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-5 lg:flex">
        <span className="h-14 w-px bg-plum/30" />
        <a
          href={site.instagramUrl}
          className="text-plum/70 transition-colors hover:text-rose"
          aria-label="Instagram"
        >
          <InstagramIcon className="h-5 w-5" strokeWidth={1.5} />
        </a>
        <span className="h-14 w-px bg-plum/30" />
      </div>

      {/* vertical pagination */}
      <div className="pointer-events-auto absolute right-8 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
        {slides.map((s, i) => (
          <button
            key={s.badge}
            aria-label={`Slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={clsx(
              "rounded-full transition-all",
              i === index ? "h-8 w-2.5 bg-plum" : "h-2.5 w-2.5 bg-plum/30",
            )}
          />
        ))}
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-6 py-8 lg:h-full lg:grid-cols-2 lg:gap-6 lg:px-16 lg:py-0">
        <div
          className={clsx(
            "relative z-10 flex flex-col items-center justify-center pt-16 text-center lg:items-start lg:pt-0 lg:text-left",
            textSide === "right" && "lg:order-2 lg:items-end lg:text-right",
          )}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={clsx(
                "flex flex-col items-center lg:items-start",
                textSide === "right" && "lg:items-end",
              )}
            >
              <span className="script-accent inline-block rounded-md bg-cream px-5 py-2 text-3xl text-ink shadow-sm">
                {slide.badge}
              </span>

              <h1 className="section-heading mt-6 text-5xl leading-[1.05] tracking-wide text-ink sm:text-6xl lg:text-7xl">
                {slide.heading.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>

              <p className="mt-5 max-w-sm text-lg text-ink/70">
                {slide.text}
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
                <BookingButton className="rounded-full bg-rose px-7 py-3.5 text-sm font-medium tracking-wide text-cream shadow-lg transition-all hover:bg-rose-dark hover:shadow-xl">
                  Jetzt Termin buchen
                </BookingButton>
                <a
                  href="#leistungen"
                  className="rounded-full border border-plum/40 px-7 py-3.5 text-sm font-medium tracking-wide text-plum transition-all hover:bg-plum hover:text-cream"
                >
                  Leistungen ansehen
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div
          className={clsx(
            "relative lg:h-full",
            textSide === "right" && "lg:order-1",
          )}
        >
          <div className="relative lg:absolute lg:inset-x-0 lg:bottom-0">
            <PersonCutout
              index={index}
              side={slide.personSide}
              photo={slide.photo}
              focus={slide.focus}
            />
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="animate-float-slow absolute bottom-8 left-1/2 -translate-x-1/2 text-plum/60"
      >
        <ChevronDown className="h-7 w-7" strokeWidth={1.25} />
      </motion.div>
    </section>
  );
}
