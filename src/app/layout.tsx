import { Metadata } from "next";
import "styles/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000";

if (!process.env.NEXT_PUBLIC_BASE_URL) {
  console.warn("NEXT_PUBLIC_BASE_URL is not set. Using the default localhost URL.");
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "DeLisa's Boujee Botanical Store - Home of Rare and Exotic Plants",
  description: "Explore DeLisa's Boujee Botanicals, your ultimate destination for rare and exotic plants. Discover a wide range of tropical houseplants curated with care.",
  // Remove viewport and themeColor from here
};

// Move viewport and themeColor to separate exports
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const themeColor = "#ffffff";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <head>
        <meta charSet="UTF-8" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={BASE_URL} />
        <meta property="og:title" content="Delisa&apos;s Boujee Botanical Store" />
        <meta property="og:description" content="Your destination for luxury plants and exclusive care products" />
      </head>
      <body>
        <SpeedInsights />
        <Analytics />
        <main className="relative">{props.children}</main>
      </body>
    </html>
  );
}
