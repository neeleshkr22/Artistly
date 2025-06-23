import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Navigation } from "@/components/navigation"
import { ThemeProvider } from "@/contexts/theme-context"
import { PageTransition } from "@/components/page-transition"
import { generateSEO } from "@/lib/seo"
import { ThemeScript } from "@/components/theme-script"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

// Generate comprehensive SEO metadata
export const metadata: Metadata = generateSEO({
  title: "Artistly - Performing Artist Booking Platform",
  description:
    "Connect event planners with talented performing artists. Browse singers, dancers, speakers, and DJs for your next event.",
  keywords: [
    "artist booking",
    "event planning",
    "performers",
    "entertainment",
    "musicians",
    "dancers",
    "speakers",
    "DJs",
  ],
  url: "https://artistly.com",
})

interface RootLayoutProps {
  children: React.ReactNode
}

/**
 * Root layout component with theme support and SEO optimization
 * Provides global navigation, theme context, and page transitions
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <ThemeScript />
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#667eea" />
        <meta name="color-scheme" content="light dark" />

        {/* Viewport meta tag for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className={`${inter.className} antialiased transition-colors duration-300`}>
        <ThemeProvider defaultTheme="system" storageKey="artistly-theme">
          <div className="relative min-h-screen bg-background text-foreground">
            <Navigation />
            <PageTransition>
              <main className="min-h-screen">{children}</main>
            </PageTransition>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
