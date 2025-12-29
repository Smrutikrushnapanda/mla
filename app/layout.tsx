import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import ThemeGuard from "@/ThemeGuard"
import { Toaster } from "sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "MLA Connect",
  description: "A comprehensive digital platform for MLA constituency management, enabling efficient communication between elected representatives and citizens through project tracking, grievance management, polls, appointments, and community engagement tools.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeGuard>
          <Toaster position="top-right" />
          {children}
        </ThemeGuard>
      </body>
    </html>
  )
}
