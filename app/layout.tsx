import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Arpan K Singh | Transformation Architect",
  description:
    "Transforming complexity into clarity through systematic innovation. Experience the portfolio that redefines digital storytelling.",
  keywords: "UX Designer, Product Designer, System Architect, Innovation, Digital Transformation, Portfolio",
  authors: [{ name: "Arpan K Singh" }],
  creator: "Arpan K Singh",
  openGraph: {
    title: "Arpan K Singh | Transformation Architect",
    description: "Experience the portfolio that redefines digital storytelling through systematic innovation.",
    url: "https://arpanksingh.com",
    siteName: "Arpan K Singh Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arpan K Singh | Transformation Architect",
    description: "Experience the portfolio that redefines digital storytelling through systematic innovation.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' style='stop-color:%2300E5D3;stop-opacity:1' /><stop offset='50%' style='stop-color:%23FF6B9D;stop-opacity:1' /><stop offset='100%' style='stop-color:%23FFD166;stop-opacity:1' /></linearGradient></defs><circle cx='50' cy='50' r='40' fill='url(%23gradient)'/><circle cx='50' cy='50' r='20' fill='%23ffffff'/></svg>",
        type: "image/svg+xml",
      },
    ],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
