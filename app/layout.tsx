import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Arpan K Singh | Reality Architect",
  description:
    "Where impossibility becomes innovation. Transcending conventional boundaries through systematic design and impossible solutions.",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='impossible' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' style='stop-color:%2300E5D3;stop-opacity:1' /><stop offset='50%' style='stop-color:%23FF6B9D;stop-opacity:1' /><stop offset='100%' style='stop-color:%23FFD166;stop-opacity:1' /></linearGradient></defs><polygon points='50,10 90,30 70,70 30,70 10,30' fill='url(%23impossible)' transform='rotate(45 50 50)'/><circle cx='50' cy='50' r='8' fill='%23ffffff'/></svg>",
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
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
