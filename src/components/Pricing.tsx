"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { clsx } from "clsx";
import AnimatedSection from "./AnimatedSection";
import { priceCategories, site } from "@/lib/data";

export default function Pricing() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="preise" className="mx-auto max-w-4xl px-6 py-24 lg:py-32">
      <AnimatedSection className="mx-auto max-w-2xl text-center">
        <p className="script-accent text-3xl text-rose">Preisliste</p>
        <h2 className="section-heading mt-1 text-3xl text-plum sm:text-4xl">
          Transparent & fair
        </h2>
        <div className="divider-flourish mx-auto my-6 w-24" />
        <p className="text-base leading-relaxed text-ink/70">
          Alle Preise verstehen sich als Richtwerte – je nach Aufwand kann der
          tatsächliche Preis variieren. Die verbindliche Terminplanung und
          Buchung erfolgt über Terminpanda.
        </p>
      </AnimatedSection>

      <div className="mt-14 space-y-4">
        {priceCategories.map((category, index) => {
          const isOpen = openIndex === index;
          return (
            <AnimatedSection key={category.title} delay={index * 0.04}>
              <div className="overflow-hidden rounded-2xl border border-nude/30 bg-cream-dark/40">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="section-heading text-lg text-plum sm:text-xl">
                    {category.title}
                  </span>
                  <ChevronDown
                    className={clsx(
                      "h-5 w-5 shrink-0 text-rose transition-transform duration-300",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <ul className="divide-y divide-nude/20 px-6 pb-6">
                        {category.items.map((item) => (
                          <li
                            key={item.name}
                            className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                          >
                            <div className="sm:max-w-md">
                              <p className="font-medium text-ink">
                                {item.name}
                              </p>
                              {item.detail && (
                                <p className="mt-1 text-sm leading-relaxed text-ink/60">
                                  {item.detail}
                                </p>
                              )}
                              {item.duration && (
                                <p className="mt-1 text-xs uppercase tracking-wide text-rose/80">
                                  {item.duration}
                                </p>
                              )}
                            </div>
                            <p className="whitespace-nowrap text-right font-medium text-plum">
                              {item.prefixAb && (
                                <span className="mr-1 text-xs font-normal text-ink/50">
                                  ab
                                </span>
                              )}
                              {item.price}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>
          );
        })}
      </div>

      <AnimatedSection className="mt-14 text-center" delay={0.1}>
        <a
          href={site.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-rose px-7 py-3.5 text-sm font-medium tracking-wide text-cream shadow-sm transition-all hover:bg-rose-dark hover:shadow-md"
        >
          Jetzt Termin buchen
        </a>
      </AnimatedSection>
    </section>
  );
}
