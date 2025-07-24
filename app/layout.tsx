import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Arpan K Singh | Solution Artistry",
  description:
    "Product leadership through intentional design. Transforming enterprise complexity into elegant digital experiences that drive measurable impact.",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><radialGradient id='crystal' cx='50%' cy='30%' r='70%'><stop offset='0%' style='stop-color:%23FFD166;stop-opacity:1' /><stop offset='70%' style='stop-color:%23FF6B9D;stop-opacity:0.8' /><stop offset='100%' style='stop-color:%2300E5D3;stop-opacity:0.6' /></radialGradient></defs><polygon points='50,10 70,30 60,60 40,60 30,30' fill='url(%23crystal)' opacity='0.9'/><circle cx='50' cy='35' r='3' fill='%23FFD166'/></svg>",
        type: "image/svg+xml",
      },
    ],
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
