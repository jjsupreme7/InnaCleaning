import type { Metadata } from "next";
import { Assistant } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyBookButton from "@/components/layout/StickyBookButton";

const assistant = Assistant({
  variable: "--font-assistant",
  subsets: ["latin"],
  weight: ["400", "700"],
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
    <html lang="en" className={`${assistant.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyBookButton />
      </body>
    </html>
  );
}
