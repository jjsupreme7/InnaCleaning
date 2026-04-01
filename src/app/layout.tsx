import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyBookButton from "@/components/layout/StickyBookButton";

const dmSans = localFont({
  variable: "--font-body",
  src: "./fonts/Geist-Regular.ttf",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

const cormorant = localFont({
  variable: "--font-heading",
  src: [
    {
      path: "./fonts/Georgia.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Georgia-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/Georgia-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Georgia-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const metadata: Metadata = {
  title: "Inna Cleaning | Professional Home Cleaning in Seattle",
  description:
    "Reliable, detailed, and personally delivered home cleaning services in the greater Seattle area. Get your free quote today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyBookButton />
      </body>
    </html>
  );
}
