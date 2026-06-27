import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, Special_Elite } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Distressed typewriter face for stamp / "CLASSIFIED" badge elements only.
const specialElite = Special_Elite({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-stamp",
  display: "swap",
});

export const metadata: Metadata = {
  title: "🚨 The Crime of the Semicentennial",
  description:
    "You are formally summoned to an emergency, in-person backyard murder mystery celebrating America's 250th birthday. RSVP, pick your suspect, and bring your best alibi.",
  openGraph: {
    title: "🚨 The Crime of the Semicentennial",
    description:
      "An in-person satirical murder mystery for America's 250th. July 12, 2026 — RSVP inside.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1B2A4A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${specialElite.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
