import type { Metadata, Viewport } from "next";
import "@fontsource/rubik/cyrillic-800.css";
import "@fontsource/rubik/latin-800.css";
import "@fontsource/rubik/cyrillic-900.css";
import "@fontsource/rubik/latin-900.css";
import "@fontsource/nunito/cyrillic-600.css";
import "@fontsource/nunito/latin-600.css";
import "@fontsource/nunito/cyrillic-700.css";
import "@fontsource/nunito/latin-700.css";
import "@fontsource/nunito/cyrillic-800.css";
import "@fontsource/nunito/latin-800.css";
import "@fontsource/nunito/cyrillic-900.css";
import "@fontsource/nunito/latin-900.css";
import { ContactRail } from "@/components/contact-rail";
import { CookieNote } from "@/components/cookie-note";
import { JsonLd } from "@/components/json-ld";
import { LeadProvider } from "@/components/lead-provider";
import { Metrika } from "@/components/metrika";
import { MobileDock } from "@/components/mobile-dock";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { UtmCapture } from "@/components/utm-capture";
import { site, siteUrl } from "@/lib/content";
import { businessJsonLd } from "@/lib/schema";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ушу и акробатика для детей с 3 лет в СЗАО — Veni Vidi Vici",
    template: "%s — Veni Vidi Vici",
  },
  description:
    "Ушу, акробатика и брейкданс для детей и айкидо, ушу для взрослых в Москве, СЗАО. Клуб Veni Vidi Vici, пр-т Маршала Жукова, 51. Абонемент 9 000 ₽.",
  applicationName: "Veni Vidi Vici",
  openGraph: {
    siteName: "Veni Vidi Vici",
    locale: "ru_RU",
    type: "website",
  },
  verification: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION
    ? { yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: "#FFF3C9",
  width: "device-width",
  initialScale: 1,
};

const contacts = {
  phoneDisplay: site.phoneDisplay,
  phoneTel: site.phoneTel,
  whatsapp: site.whatsapp,
  telegram: site.telegram,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        <a href="#content" className="skip-link">
          К содержанию
        </a>
        <LeadProvider contacts={contacts} thankYou={site.thankYou}>
          <SiteHeader />
          <main id="content">{children}</main>
          <SiteFooter />
          <MobileDock />
          <ContactRail />
          <CookieNote />
        </LeadProvider>
        <JsonLd data={businessJsonLd()} />
        <Metrika />
        <UtmCapture />
      </body>
    </html>
  );
}
