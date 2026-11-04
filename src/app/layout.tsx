
import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DemoBanner from "@/components/layout/DemoBanner";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500", "600", "700"]
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: {
    default: "UzaDeals — Buy and Sell Businesses in Kenya",
    template: "%s | UzaDeals"
  },
  description:
    "Discover small businesses for sale across Kenya. Explore kiosks, salons, agrovets, M-Pesa shops, car washes and more.",
  applicationName: "UzaDeals",
  keywords: [
    "businesses for sale Kenya",
    "buy a business Kenya",
    "sell a business Kenya",
    "small business marketplace",
    "Kenyan businesses"
  ],
  openGraph: {
    title: "UzaDeals — Buy and Sell Businesses in Kenya",
    description:
      "Find your next business opportunity across Kenya.",
    type: "website",
    locale: "en_KE",
    siteName: "UzaDeals"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jakarta.variable}`}
    >
      <body className="flex min-h-screen flex-col font-sans">
        <Header />

        <DemoBanner />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
