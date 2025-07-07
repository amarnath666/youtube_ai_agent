import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { Providers } from "@/components/Providers";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YTNotes - AI-powered YouTube notes",
  description: "AI-powered YouTube notes",
  openGraph: {
    title: "YTNotes",
    description: "Watch less, learn more — AI-powered video notes.",
    url: "https://www.ytnotes.online/",
    siteName: "YTNotes",
    images: [
      {
        url: "https://pub-cc78a2555b07407e9175b8ae35f45925.r2.dev/Screenshot%202025-07-06%20182309.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "YTNotes",
    description: "Watch less, learn more — AI-powered video notes.",
    images: ["https://pub-cc78a2555b07407e9175b8ae35f45925.r2.dev/Screenshot%202025-07-06%20182309.png"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          id="razorpay-checkout-js"
          src="https://checkout.razorpay.com/v1/checkout.js"
        />
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {children}
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
