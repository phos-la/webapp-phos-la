import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";

const cormorant = localFont({
  src: "../../public/fonts/CormorantGaramond-VariableFont_wght.ttf",
  variable: "--font-cormorant",
  weight: "300 700",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PHOS Wellness — Ketamine Healing Clinic of Los Angeles",
  description:
    "Ketamine-assisted therapy in a private Los Angeles practice. Six sessions over three weeks, one clinician, guided from the first breath to integration.",
  openGraph: {
    title: "PHOS Wellness — Ketamine Healing Clinic of Los Angeles",
    description:
      "Ketamine-assisted therapy in a private Los Angeles practice. Six sessions over three weeks, one clinician, guided from the first breath to integration.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
