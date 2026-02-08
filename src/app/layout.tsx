import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PsychRef — Every Reference. Every Episode. Explained.",
  description:
    "The ultimate guide to every pop culture reference in the TV show Psych (2006-2014). Discover movie, TV, music, and celebrity references across all 8 seasons.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        {/* Subtle background pattern */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-psych-green/3 via-transparent to-psych-yellow/2" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-psych-green/3 blur-3xl" />
          <div className="absolute top-0 left-0 h-64 w-64 rounded-full bg-psych-yellow/2 blur-3xl" />
        </div>

        <div className="relative z-10 flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
