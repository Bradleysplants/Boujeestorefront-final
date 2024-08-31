import { Metadata } from "next"
import "styles/globals.css"
import { SpeedInsights } from "@vercel/speed-insights/next"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

if (!process.env.NEXT_PUBLIC_BASE_URL) {
  console.warn("NEXT_PUBLIC_BASE_URL is not set. Using the default localhost URL.")
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Your Site Title",
  description: "Your site description goes here",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#ffffff",
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <head>
        <meta charSet="UTF-8" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={BASE_URL} />
        <meta property="og:title" content="Your Site Title" />
        <meta property="og:description" content="Your site description goes here" />
        <meta property="og:image" content="/path/to/image.jpg" />
        <link rel="preload" href="/path/to/critical.css" as="style" />
        <link rel="preload" href="/path/to/font.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        <SpeedInsights />
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
