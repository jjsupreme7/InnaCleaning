import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyBookButton from "@/components/layout/StickyBookButton";
import Providers from "./providers";

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const SITE_URL = "https://inna-cleaning.vercel.app";
const SITE_NAME = "Inna Cleaning";
const SITE_DESCRIPTION =
  "Reliable, detailed, and personally delivered home cleaning services in the greater Seattle area. Deep cleans, move-in/out, Airbnb turnovers, and recurring maintenance. Get your free quote today.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Professional Home Cleaning in Seattle`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Seattle home cleaning",
    "house cleaning Seattle",
    "deep cleaning Seattle",
    "move-in cleaning",
    "move-out cleaning",
    "Airbnb turnover cleaning",
    "recurring home cleaning",
    "Tacoma cleaning service",
    "Federal Way cleaning",
    "Puyallup cleaning",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Professional Home Cleaning in Seattle`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
    images: [
      {
        url: "/images/clean-interior.jpg",
        width: 1920,
        height: 1275,
        alt: "Sunlit, professionally cleaned living room interior",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Professional Home Cleaning in Seattle`,
    description: SITE_DESCRIPTION,
    images: ["/images/clean-interior.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HouseCleaningService",
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  telephone: "+1-253-215-6068",
  email: "jjgcallen11@gmail.com",
  image: `${SITE_URL}/images/clean-interior.jpg`,
  priceRange: "$$",
  areaServed: [
    { "@type": "City", name: "Seattle" },
    { "@type": "City", name: "Tacoma" },
    { "@type": "City", name: "Kent" },
    { "@type": "City", name: "Federal Way" },
    { "@type": "City", name: "Puyallup" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Seattle",
    addressRegion: "WA",
    addressCountry: "US",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "19:00",
    },
  ],
  sameAs: ["https://instagram.com/INNAS_CLEANING"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Cleaning Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Regular Cleaning" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Deep Cleaning" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Move-In / Move-Out Cleaning" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Airbnb / Short-Term Rental Cleaning" } },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${dmSans.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          // JSON-LD structured data for Google — content is a static server-rendered schema object, not user input
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body className="theme-transition min-h-full flex flex-col font-sans" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <StickyBookButton />
        </Providers>
      </body>
    </html>
  );
}
