import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navigation } from "@/components/common";

// PERF FIX: Orbitron & Rajdhani loaded via next/font instead of @import inside CSS.
// CSS @import blocks rendering; next/font preloads fonts with zero render-blocking.
import { Orbitron, Rajdhani } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-orbitron",
  display: "swap",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bitwise Security - Professional Penetration Testing",
  description:
    "Expert cybersecurity services including web application pentesting, Active Directory security, Azure audits, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${rajdhani.variable}`}>
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
