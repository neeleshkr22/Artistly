import type { GetStaticProps, GetServerSideProps } from "next"
import artistsData from "@/data/artists.json"

export interface Artist {
  id: number
  name: string
  category: string[]
  priceRange: string
  location: string
  bio: string
  languages: string[]
  image: string
  rating: number
  reviews: number
}

/**
 * Simulates API delay for realistic data fetching
 * @param ms - Milliseconds to delay
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Fetches all artists with optional filtering
 * @param filters - Optional filters to apply
 * @returns Promise resolving to filtered artists array
 */
export async function fetchArtists(filters?: {
  category?: string
  location?: string
  priceRange?: string
  search?: string
}): Promise<Artist[]> {
  // Simulate API call delay
  await delay(500)

  let artists = [...artistsData] as Artist[]

  if (filters) {
    const { category, location, priceRange, search } = filters

    if (category && category !== "All Categories") {
      artists = artists.filter((artist) =>
        artist.category.some((cat) => cat.toLowerCase().includes(category.toLowerCase())),
      )
    }

    if (location && location !== "All Locations") {
      artists = artists.filter((artist) => artist.location.toLowerCase().includes(location.toLowerCase()))
    }

    if (priceRange && priceRange !== "All Prices") {
      artists = artists.filter((artist) => artist.priceRange === priceRange)
    }

    if (search) {
      artists = artists.filter(
        (artist) =>
          artist.name.toLowerCase().includes(search.toLowerCase()) ||
          artist.bio.toLowerCase().includes(search.toLowerCase()) ||
          artist.category.some((cat) => cat.toLowerCase().includes(search.toLowerCase())),
      )
    }
  }

  return artists
}

/**
 * Fetches a single artist by ID
 * @param id - Artist ID to fetch
 * @returns Promise resolving to artist or null if not found
 */
export async function fetchArtistById(id: number): Promise<Artist | null> {
  await delay(300)

  const artist = artistsData.find((a) => a.id === id)
  return artist ? ({ ...artist } as Artist) : null
}

/**
 * GetStaticProps function for artists listing page
 * Pre-renders page with all artists at build time
 */
export const getArtistsStaticProps: GetStaticProps = async () => {
  try {
    const artists = await fetchArtists()

    return {
      props: {
        artists,
        categories: ["Singer", "DJ", "Dancer", "Speaker", "Performer"],
        locations: ["New York, NY", "Los Angeles, CA", "Miami, FL"],
        priceRanges: ["$250-600", "$500-1000", "$1000-2500"],
      },
      // Revalidate every hour
      revalidate: 3600,
    }
  } catch (error) {
    console.error("Error fetching artists:", error)

    return {
      props: {
        artists: [],
        categories: [],
        locations: [],
        priceRanges: [],
      },
      revalidate: 60, // Retry more frequently on error
    }
  }
}

/**
 * GetServerSideProps function for dynamic artist pages
 * Fetches artist data on each request for real-time data
 */
export const getArtistServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!

  try {
    const artist = await fetchArtistById(Number(id))

    if (!artist) {
      return {
        notFound: true,
      }
    }

    return {
      props: {
        artist,
      },
    }
  } catch (error) {
    console.error("Error fetching artist:", error)

    return {
      notFound: true,
    }
  }
}
