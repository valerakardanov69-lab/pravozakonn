import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ПравоЗакон — юридические услуги в Минеральных Водах",
    template: "%s | ПравоЗакон",
  },

  description:
    "Юридическая помощь в Минеральных Водах и по всей России. Банкротство физических лиц, списание долгов, консультации юриста для частных лиц и бизнеса.",

  keywords: [
    "юрист Минеральные Воды",
    "юридические услуги Минеральные Воды",
    "банкротство физических лиц",
    "списание долгов",
    "юридическая консультация",
    "юрист онлайн",
    "банкротство по всей России",
  ],
  verification: {
  yandex: "9ee3ca9040cf4284",
},

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "ПравоЗакон — юридические услуги в Минеральных Водах",
    description:
      "Помощь в банкротстве физических лиц, списании долгов и решении юридических вопросов.",
    locale: "ru_RU",
    type: "website",
  },

  alternates: {
    canonical: "https://pravozakonn.vercel.app",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",

    "name": "ПравоЗакон",

    "description":
      "Юридическая помощь в Минеральных Водах и по всей России. Банкротство физических лиц, списание долгов и консультации юриста.",

    "areaServed": [
      {
        "@type": "City",
        "name": "Минеральные Воды"
      },
      {
        "@type": "Country",
        "name": "Россия"
      }
    ],

    "serviceType": [
      "Банкротство физических лиц",
      "Списание долгов",
      "Юридическая консультация",
      "Защита от судебных приставов",
      "Представительство в судах"
    ],

    "url": "https://pravozakonn.vercel.app",

    "telephone": "+79950000417",

    "address": {
      "@type": "PostalAddress",
      "streetAddress": "ул. Терешкова, 26",
      "addressLocality": "Минеральные Воды",
      "addressCountry": "RU"
    },

    "openingHours": [
      "Mo-Fr 09:00-19:00",
      "Sa 10:00-15:00"
    ]
  };


  return (
    <html lang="ru">
      <body className="antialiased">

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        {children}

      </body>
    </html>
  );
}