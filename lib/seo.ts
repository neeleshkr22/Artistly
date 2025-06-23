import type { Metadata } from "next"

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: "website" | "article" | "profile"
}

/**
 * Generates comprehensive SEO metadata for pages
 * @param props - SEO configuration object
 * @returns Next.js Metadata object with OpenGraph, Twitter, and structured data
 */
export function generateSEO({
  title = "Artistly - Performing Artist Booking Platform",
  description = "Connect event planners with talented performing artists. Browse singers, dancers, speakers, and DJs for your next event.",
  keywords = ["artist booking", "event planning", "performers", "entertainment", "musicians", "dancers"],
  image = "/og-image.jpg",
  url = "https://artistly.com",
  type = "website",
}: SEOProps = {}): Metadata {
  const fullTitle = title.includes("Artistly") ? title : `${title} | Artistly`

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: "Artistly Team" }],
    creator: "Artistly",
    publisher: "Artistly",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type,
      locale: "en_US",
      url,
      title: fullTitle,
      description,
      siteName: "Artistly",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: "@artistly",
    },
    alternates: {
      canonical: url,
    },
    verification: {
      google: "your-google-verification-code",
      yandex: "your-yandex-verification-code",
    },
  }
}

/**
 * Generates structured data for artist profiles
 * @param artist - Artist data object
 * @returns JSON-LD structured data
 */
export function generateArtistStructuredData(artist: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: artist.name,
    description: artist.bio,
    image: artist.image,
    jobTitle: artist.category.join(", "),
    address: {
      "@type": "PostalAddress",
      addressLocality: artist.location,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: artist.rating,
      reviewCount: artist.reviews,
    },
  }
}
