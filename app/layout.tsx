import type { Metadata } from "next";
import { Geist, Geist_Mono, Caprasimo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caprasimo = Caprasimo({
  variable: "--font-caprasimo",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Hello Computer - The Done-for-You AI Agency",
  description: "Transform your business with AI-powered growth marketing, creative engines, and seamless technical integration. Expert human guidance meets cutting-edge AI technology.",
  keywords: "AI agency, AI marketing, marketing automation, AI content creation, technical integration, business growth",
  openGraph: {
    title: "Hello Computer - The Done-for-You AI Agency",
    description: "Transform your business with AI-powered growth marketing, creative engines, and seamless technical integration.",
    url: "https://hellocomputer.ai",
    siteName: "Hello Computer",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hello Computer - AI Agency",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hello Computer - The Done-for-You AI Agency",
    description: "Transform your business with AI-powered growth marketing, creative engines, and seamless technical integration.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${caprasimo.variable} antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
