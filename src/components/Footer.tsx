import { Phone } from "lucide-react";
import InstagramIcon from "./icons/InstagramIcon";
import { site } from "@/lib/data";

const links = [
  { href: "#home", label: "Home" },
  { href: "#leistungen", label: "Leistungen" },
  { href: "#preise", label: "Preise" },
  { href: "#galerie", label: "Galerie" },
  { href: "#ueber-mich", label: "Über mich" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink py-14 text-cream/70">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="section-heading text-xl text-cream">
              Nagelstudio <span className="script-accent text-2xl">by Mira</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed">
              {site.address.street}
              <br />
              {site.address.zipCity}
            </p>
            <a
              href={site.instagramUrl}
              className="mt-4 inline-flex items-center gap-2 text-sm transition-colors hover:text-rose-light"
            >
              <InstagramIcon className="h-4 w-4" strokeWidth={1.5} />
              {site.instagramHandle}
            </a>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-cream">
              Navigation
            </p>
            <ul className="space-y-2 text-sm">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-rose-light"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-cream">
              Kontakt
            </p>
            <a
              href={site.phoneHref}
              className="flex items-center gap-2 text-sm transition-colors hover:text-rose-light"
            >
              <Phone className="h-4 w-4" strokeWidth={1.5} />
              {site.phone}
            </a>
            <a
              href={site.bookingUrl}
              className="mt-4 inline-block rounded-full bg-rose px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-rose-dark"
            >
              Termin buchen
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-cream/10 pt-6 text-xs sm:flex-row sm:justify-between">
          <p>
            © {year} {site.name}. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-4">
            <a href="#" className="transition-colors hover:text-rose-light">
              Impressum
            </a>
            <a href="#" className="transition-colors hover:text-rose-light">
              Datenschutz
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
