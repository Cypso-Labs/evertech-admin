import "@/css/satoshi.css";
import "@/css/style.css";
import React from "react";
import Providers from "./redux/provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Evertech Admin Dashboard",
  description: "Comprehensive administration panel for Evertech systems",
  keywords: ["dashboard", "admin", "evertech", "management"],
  authors: [{ name: "Cypso Labs", url: "https://www.cypsolabs.com" }],
  creator: "Evertech Team",
  publisher: "Evertech",
  metadataBase: new URL("https://admin.evertech.lk"),
  openGraph: {
    title: "Evertech Admin Dashboard",
    description: "Comprehensive administration panel for Evertech systems",
    url: "https://admin.evertech.lk",
    siteName: "Evertech Admin",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
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
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body suppressHydrationWarning={true}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}