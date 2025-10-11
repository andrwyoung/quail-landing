import type { Metadata } from "next";
import { Literata, Mulish } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Toaster } from "sonner";
import UserHook from "@/components/user-hook";
import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
});

const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quail – Memory Optimized Reader",
  description:
    "Most reading is forgotten within 24 hours. Quail is the world’s first memory-optimized reader designed to help you retain more of what you read.",
  keywords: [
    "incremental reading",
    "memory optimization",
    "knowledge retention",
    "spaced repetition",
    "reading app",
  ],
  authors: [{ name: "Quail Team" }],
  openGraph: {
    title: "Quail – Memory Optimized Reader",
    description:
      "Stop forgetting what you read. Quail is a reader built to help knowledge stick.",
    url: "https://quailreader.com",
    siteName: "Quail",
    // images: [
    //   {
    //     url: "/og-image.png",
    //     width: 1200,
    //     height: 630,
    //     alt: "Quail – Memory Optimized Reader",
    //   },
    // ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quail – Memory Optimized Reader",
    description:
      "Most reading is forgotten within 24 hours. Quail helps you keep it.",
    // images: ["/og-image.png"],
    // creator: "@yourhandle",
  },
  icons: {
    icon: "/favicon.ico",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mulish.variable} ${literata.variable} antialiased `}>
        <Analytics />
        <UserHook />
        <Toaster />

        {children}
      </body>
    </html>
  );
}
