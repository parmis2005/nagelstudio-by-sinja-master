import type { Metadata } from "next";
import { Yeseva_One, Caveat, Poppins } from "next/font/google";
import "./globals.css";

const yeseva = Yeseva_One({
  variable: "--font-yeseva",
  weight: "400",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nagelstudio by Sinja | Nieukerk",
  description:
    "Nagelstudio by Sinja in Nieukerk (Kerken): Nagelmodellage, Naturnagelverstärkung, Nailart, Maniküre & Pediküre. Jetzt online Termin buchen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${yeseva.variable} ${caveat.variable} ${poppins.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-cream text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
