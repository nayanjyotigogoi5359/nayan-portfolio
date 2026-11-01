import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import CursorFX from "@/components/CursorFX";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.scss";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nayan Gogoi — Software, Design & AI/ML",
  description:
    "The portfolio of Nayan Gogoi, a BCA student in Assam building a foundation in software engineering through web projects, visual design and small-business experiments.",
  applicationName: "Nayan Portfolio",
  creator: "Nayan Gogoi",
  openGraph: {
    title: "Nayan Gogoi — Curious by nature. Built to create.",
    description:
      "Web development, visual design and experiments at the intersection of technology and local business.",
    type: "website",
    siteName: "Nayan Portfolio",
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    title: "Nayan Gogoi — Portfolio",
    description: "Software, design and AI/ML — learning by building.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#090B10",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <SmoothScroll />
        <CursorFX />
        {children}
      </body>
    </html>
  );
}
