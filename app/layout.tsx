import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { Providers } from "@/components/Providers";
import Script from "next/script";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// This goes in your layout.tsx or page.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://www.ytnotes.online'),
  title: 'YTNotes — AI-powered YouTube video notes',
  description: 'Watch less, learn more — turn YouTube videos into smart, AI-generated notes.',
  keywords: ['youtube notes', 'video summarizer', 'AI notes', 'smart notes', 'study tool', 'productivity', 'YTNotes'],
  authors: [{ name: 'YTNotes Team' }],
  creator: 'YTNotes Team',
  openGraph: {
    type: 'website',
    url: 'https://www.ytnotes.online',
    title: 'YTNotes — AI-powered YouTube video notes',
    description: 'Watch less, learn more — turn YouTube videos into smart, AI-generated notes.',
    siteName: 'YTNotes',
    images: [
      {
        url: 'https://pub-cc78a2555b07407e9175b8ae35f45925.r2.dev/Screenshot%202025-07-06%20182309.png',
        width: 1200,
        height: 630,
        alt: 'YTNotes — AI-powered YouTube video notes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@AmarnathDhumal',
    creator: '@AmarnathDhumal',
    title: 'YTNotes — AI-powered YouTube video notes',
    description: 'Watch less, learn more — turn YouTube videos into smart, AI-generated notes.',
    images: {
      url: 'https://pub-cc78a2555b07407e9175b8ae35f45925.r2.dev/Screenshot%202025-07-06%20182309.png',
      alt: 'YTNotes — AI-powered YouTube video notes',
    },
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
  alternates: {
    canonical: 'https://www.ytnotes.online',
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
