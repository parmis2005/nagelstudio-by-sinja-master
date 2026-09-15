"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { clsx } from "clsx";
import { site } from "@/lib/data";
import { BookingButton } from "./BookingModal";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#leistungen", label: "Leistungen" },
  { href: "#preise", label: "Preise" },
  { href: "#galerie", label: "Galerie" },
  { href: "#ueber-mich", label: "Über mich" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-cream/95 shadow-[0_2px_20px_rgba(43,31,39,0.08)] backdrop-blur-sm"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a
          href="#home"
          className={clsx(
            "section-heading text-xl tracking-wide transition-colors",
            scrolled ? "text-plum" : "text-plum",
          )}
        >
          Nagelstudio <span className="script-accent text-2xl">by Mira</span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-wide text-ink/80 transition-colors hover:text-rose"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={site.phoneHref}
            className="flex items-center gap-2 text-sm font-medium text-ink/80 transition-colors hover:text-rose"
          >
            <Phone className="h-4 w-4" strokeWidth={1.5} />
            {site.phone}
          </a>
          <BookingButton className="rounded-full bg-rose px-5 py-2.5 text-sm font-medium text-cream shadow-sm transition-all hover:bg-rose-dark hover:shadow-md">
            Termin buchen
          </BookingButton>
        </div>

        <button
          aria-label="Menü öffnen"
          className="text-plum lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden bg-cream lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-6 pb-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-nude/30 py-3 text-base font-medium text-ink/80"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={site.phoneHref}
                className="flex items-center gap-2 py-3 text-base font-medium text-ink/80"
              >
                <Phone className="h-4 w-4" strokeWidth={1.5} />
                {site.phone}
              </a>
              <BookingButton
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-rose px-5 py-3 text-center text-sm font-medium text-cream"
              >
                Termin buchen
              </BookingButton>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
