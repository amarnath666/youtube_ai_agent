import type { Metadata } from "next";

export interface RobotsInfo {
  index?: boolean;
  follow?: boolean;
  noindex?: boolean;
  nofollow?: boolean;
  "max-snippet"?: number;
  "max-image-preview"?: string;
  "max-video-preview"?: number;
}

export interface PageMeta {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  twitterCard?: "summary" | "summary_large_image";
}

export const siteConfig = {
  name: "YTNotes",
  title: "YTNotes — AI-powered YouTube video notes",
  description:
    "Watch less, learn more — turn YouTube videos into smart, AI-generated notes.",
  url: process.env.NEXT_PUBLIC_URL || "https://www.ytnotes.online",
  ogImage: "/meta/og-image.png",
  author: {
    name: "YTNotes Team",
    twitter: "@AmarnathDhumal",
    github: "https://github.com/amarnath666",
    linkedin: "https://www.linkedin.com/in/amarnath-dhumal/",
  },
  keywords: [
    "youtube notes",
    "video summarizer",
    "AI notes",
    "smart notes",
    "study tool",
    "productivity",
    "YTNotes",
  ],
};

export const defaultPageMeta: PageMeta = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  ogImage: siteConfig.ogImage,
  twitterCard: "summary_large_image",
};

export function generateMetadata(pathname: string): Metadata {
  const pageMeta = defaultPageMeta;
  
  // Ensure absolute URL for images
  const imageUrl = "https://pub-cc78a2555b07407e9175b8ae35f45925.r2.dev/Screenshot%202025-07-06%20182309.png"

  return {
    metadataBase: new URL(siteConfig.url),
    title: pageMeta.title,
    description: pageMeta.description,
    keywords: pageMeta.keywords?.join(", "),
    authors: [{ name: siteConfig.author.name }],
    creator: siteConfig.author.name,
    openGraph: {
      type: "website",
      url: `${siteConfig.url}${pathname}`,
      title: pageMeta.title,
      description: pageMeta.description,
      siteName: siteConfig.title,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: pageMeta.title,
        },
      ],
    },
    twitter: {
      card: pageMeta.twitterCard || "summary_large_image",
      site: siteConfig.author.twitter,
      creator: siteConfig.author.twitter,
      title: pageMeta.title,
      description: pageMeta.description,
      images: {
        url: imageUrl,
        alt: pageMeta.title,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large" as "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `${siteConfig.url}${pathname}`,
    },
  };
}