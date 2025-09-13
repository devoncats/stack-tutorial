import type { Metadata } from "next";
import { site } from "@/config/site";

export const seoMetadata: Metadata = {
  title: {
    default: site.name,
    template: `%s - ${site.name}`,
  },
  description: site.description,
  manifest: "site.webmanifest",
  keywords: ["Kirlee", "Stack", "Tutorial"],
  authors: [{ name: site.creator }],
  creator: site.creator,
  metadataBase: new URL(site.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    title: site.name,
    images: [site.ogImage],
    description: site.description,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: [site.ogImage],
    creator: site.creator,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};
