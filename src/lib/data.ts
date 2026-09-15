export const site = {
  name: "Nagelstudio by Mira",
  owner: "Mira Hoffmann",
  tagline: "Handgemachte Nagelkunst mit Liebe zum Detail",
  phone: "01234 567890",
  phoneHref: "tel:+491234567890",
  email: "info@nagelstudio-mira-beispiel.de",
  address: {
    street: "Musterallee 12",
    zipCity: "12345 Beispielstadt",
  },
  instagramHandle: "@studio_mira_beispiel",
  instagramUrl: "#kontakt",
  mapEmbedUrl:
    "https://www.google.com/maps?q=Musterallee+12,+12345+Beispielstadt&output=embed",
};

export const openingHours = [
  { day: "Montag", hours: "17:00 – 22:00" },
  { day: "Dienstag", hours: "17:00 – 18:00" },
  { day: "Mittwoch", hours: "17:00 – 22:00" },
  { day: "Donnerstag", hours: "17:00 – 22:00" },
  { day: "Freitag", hours: "16:30 – 18:00" },
  { day: "Samstag", hours: "08:00 – 15:00" },
  { day: "Sonntag", hours: "geschlossen" },
];

export type PriceItem = {
  name: string;
  price: string;
  prefixAb?: boolean;
  detail?: string;
  duration?: string;
};

export type PriceCategory = {
  title: string;
  items: PriceItem[];
};

export const priceCategories: PriceCategory[] = [
  {
    title: "Neue Nagelmodellage",
    items: [
      {
        name: "Gr. S",
        price: "49,00 €",
        prefixAb: true,
        detail: "bis 0,5 cm",
        duration: "90 Min.",
      },
      {
        name: "Gr. M",
        price: "59,00 €",
        prefixAb: true,
        detail: "0,5–1,5 cm",
        duration: "90 Min.",
      },
      {
        name: "Gr. L",
        price: "69,00 €",
        prefixAb: true,
        detail: "1,5–2,5 cm",
        duration: "120 Min.",
      },
      {
        name: "Gr. XL",
        price: "79,00 €",
        prefixAb: true,
        detail: "2,5–3,5 cm",
        duration: "120 Min.",
      },
    ],
  },
  {
    title: "Auffüllen Nagelmodellage",
    items: [
      {
        name: "Gr. S",
        price: "39,00 €",
        prefixAb: true,
        detail: "bis 0,5 cm",
        duration: "90 Min.",
      },
      {
        name: "Gr. M",
        price: "49,00 €",
        prefixAb: true,
        detail: "0,5–1,5 cm",
        duration: "90 Min.",
      },
      {
        name: "Gr. L",
        price: "59,00 €",
        prefixAb: true,
        detail: "1,5–2,5 cm",
        duration: "90 Min.",
      },
      {
        name: "Gr. XL",
        price: "69,00 €",
        prefixAb: true,
        detail: "2,5–3,5 cm",
        duration: "120 Min.",
      },
    ],
  },
  {
    title: "Naturnagelverstärkung",
    items: [
      {
        name: "Naturnagelverstärkung",
        price: "42,00 €",
        prefixAb: true,
        detail:
          "Der eigene natürliche Nagel wird mit Gel, Acryl oder Acrylgel stabilisiert – ohne Verlängerung. So bricht oder reißt er weniger schnell und wirkt gepflegt. Kombinierbar mit Farbe oder Design.",
        duration: "60 Min.",
      },
    ],
  },
  {
    title: "Pediküre",
    items: [
      {
        name: "Pediküre",
        price: "42,00 €",
        prefixAb: true,
        detail:
          "Fußbad mit Peeling, Nägel schneiden/feilen, Nagelhaut zurückschieben und entfernen, Hornhautentfernung, Pflege",
        duration: "45 Min.",
      },
      {
        name: "Pediküre mit Shellac",
        price: "48,00 €",
        prefixAb: true,
        detail:
          "Fußbad mit Peeling, Nägel schneiden/feilen, Nagelhaut zurückschieben und entfernen, Hornhautentfernung, Shellac, Pflege",
        duration: "60 Min.",
      },
    ],
  },
  {
    title: "Nagel Design",
    items: [
      {
        name: "Stufe 1",
        price: "29,00 €",
        prefixAb: true,
        detail: "1–3 Nägel mit ausgefallenen Designs",
        duration: "20 Min.",
      },
      {
        name: "Stufe 2",
        price: "39,00 €",
        prefixAb: true,
        detail: "4–6 Nägel mit ausgefallenen Designs",
        duration: "30 Min.",
      },
      {
        name: "Stufe 3",
        price: "49,00 €",
        prefixAb: true,
        detail: "7–10 Nägel mit ausgefallenen Designs",
        duration: "40 Min.",
      },
    ],
  },
  {
    title: "Reparatur",
    items: [
      {
        name: "Reparatur (unter 7 Tagen)",
        price: "0,00 €",
        detail:
          "Auf jede Nagelmodellage gibt es 7 Tage Garantie ab dem Behandlungstermin. Materialfehler wie Liftings oder Brüche werden in dieser Zeit kostenlos nachgebessert – bei sachgemäßer Behandlung. Bitte im Garantiefall zeitnah mit Foto melden.",
        duration: "30 Min.",
      },
      {
        name: "Reparatur",
        price: "15,00 €",
        prefixAb: true,
        detail:
          "Nach Ablauf der 7-tägigen Garantiezeit gelten Schäden oder Liftings als normale Abnutzung und werden regulär berechnet.",
        duration: "30 Min.",
      },
    ],
  },
  {
    title: "Maniküre",
    items: [{ name: "Maniküre", price: "32,00 €", duration: "45 Min." }],
  },
];

export type Service = {
  title: string;
  description: string;
  priceFrom: string;
};

export const services: Service[] = [
  {
    title: "Nagelmodellage",
    description:
      "Neue Modellage in vier Größen – von dezent bis auffällig, individuell auf deine Nagelform abgestimmt.",
    priceFrom: "ab 49,00 €",
  },
  {
    title: "Naturnagelverstärkung",
    description:
      "Stabilisierung des eigenen Nagels mit Gel oder Acryl – gepflegtes Aussehen ohne Verlängerung.",
    priceFrom: "ab 42,00 €",
  },
  {
    title: "Nailart & Design",
    description:
      "Von dezent bis verspielt: individuelle Designs in drei Stufen, ganz nach deinem Geschmack.",
    priceFrom: "ab 29,00 €",
  },
  {
    title: "Maniküre & Pediküre",
    description:
      "Klassische Handpflege sowie Fußpflege inklusive Peeling, Nagelhaut- und Hornhautbehandlung.",
    priceFrom: "ab 32,00 €",
  },
];

export const stats = [
  { value: 114, suffix: "+", label: "Designs auf Instagram" },
  { value: 7, suffix: " Tage", label: "Garantie auf Modellagen" },
  { value: 6, suffix: "", label: "Behandlungsarten" },
  { value: 100, suffix: "%", label: "Handarbeit" },
];
