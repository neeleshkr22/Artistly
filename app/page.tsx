"use client"

import { useEffect, useRef, useState, useCallback, useMemo } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Music, Users, Calendar, Star } from "lucide-react"
import { ParticleBackground } from "@/components/particle-background"
import { StaggerContainer, StaggerItem } from "@/components/page-transition"
import { initializeGSAP, animateHeroElements } from "@/lib/gsap-animations"

interface CategoryData {
  title: string
  description: string
  icon: typeof Music
  count: string
  image: string
  gradient: string
}

/**
 * Homepage component with SEO optimization and performance enhancements
 * Features hero section, category showcase, and call-to-action sections
 */
export default function HomePage() {
  // State for tracking component mount and interactions
  const [isLoaded, setIsLoaded] = useState(false)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  // Memoized category data to prevent unnecessary re-renders
  const categories: CategoryData[] = useMemo(
    () => [
      {
        title: "Singers",
        description: "Professional vocalists for any event",
        icon: Music,
        count: "150+ Artists",
        image: "/placeholder.svg?height=200&width=300",
        gradient: "gradient-bg-1",
      },
      {
        title: "Dancers",
        description: "Choreographers and dance performers",
        icon: Users,
        count: "80+ Artists",
        image: "/placeholder.svg?height=200&width=300",
        gradient: "gradient-bg-2",
      },
      {
        title: "Speakers",
        description: "Keynote speakers and motivational coaches",
        icon: Calendar,
        count: "60+ Artists",
        image: "/placeholder.svg?height=200&width=300",
        gradient: "gradient-bg-3",
      },
      {
        title: "DJs",
        description: "Professional DJs and music producers",
        icon: Star,
        count: "90+ Artists",
        image: "/placeholder.svg?height=200&width=300",
        gradient: "gradient-bg-4",
      },
    ],
    [],
  )

  // Initialize animations and set loaded state
  useEffect(() => {
    const timer = setTimeout(() => {
      initializeGSAP()
      animateHeroElements()
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  /**
   * Handles card hover animation with performance optimization
   */
  const handleCardHover = useCallback((index: number) => {
    const card = cardRefs.current[index]
    if (card) {
      card.style.transform = "scale(1.05) translateY(-10px)"
      card.style.transition = "transform 0.3s ease-out"
    }
  }, [])

  /**
   * Handles card leave animation
   */
  const handleCardLeave = useCallback((index: number) => {
    const card = cardRefs.current[index]
    if (card) {
      card.style.transform = "scale(1) translateY(0)"
    }
  }, [])

  return (
    <>
      {/* SEO: Structured data for homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Artistly",
            description: "Performing Artist Booking Platform",
            url: "https://artistly.com",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://artistly.com/artists?search={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative gradient-bg-animated text-white overflow-hidden">
          <ParticleBackground />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <motion.h1
                className="hero-title text-4xl md:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Connect with Amazing
                <motion.span
                  className="block text-yellow-300 floating-element"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.3,ease: "easeInOut" }}
                >
                  Performing Artists
                </motion.span>
              </motion.h1>

              <motion.p
                className="hero-subtitle text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                The premier platform for event planners to discover and book talented performers for unforgettable
                experiences.
              </motion.p>

              <motion.div
                className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
                >
                  <Link href="/artists" aria-label="Browse available artists">
                    Browse Artists
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-600 transform hover:scale-105 transition-all duration-300"
                >
                  <Link href="/onboard" aria-label="Apply to join as an artist">
                    Join as Artist
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Decorative floating elements */}
          <div className="absolute top-20 left-10 floating-element">
            <div className="w-20 h-20 bg-white/10 rounded-full blur-xl" aria-hidden="true"></div>
          </div>
          <div className="absolute bottom-20 right-10 floating-element" style={{ animationDelay: "2s" }}>
            <div className="w-32 h-32 bg-yellow-300/20 rounded-full blur-xl" aria-hidden="true"></div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-r from-purple-100/20 to-blue-100/20 dark:from-purple-900/20 dark:to-blue-900/20"
            aria-hidden="true"
          ></div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Explore Artist Categories</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Find the perfect performer for your event from our diverse range of talented artists
              </p>
            </motion.div>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <StaggerItem key={category.title}>
                  <Card
                    ref={(el) => (cardRefs.current[index] = el)}
                    className="hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden border-0 shadow-lg bg-card"
                    onMouseEnter={() => handleCardHover(index)}
                    onMouseLeave={() => handleCardLeave(index)}
                  >
                    <CardHeader className="text-center p-0">
                      <div className={`relative overflow-hidden ${category.gradient} p-6`}>
                        <div className="absolute inset-0 bg-black/20" aria-hidden="true"></div>
                        <div className="relative z-10">
                          <category.icon
                            className="h-12 w-12 text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                            aria-hidden="true"
                          />
                          <CardTitle className="text-white text-xl mb-2">{category.title}</CardTitle>
                          <p className="text-white/90 text-sm">{category.count}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 bg-card">
                      <CardDescription className="text-muted-foreground mb-4">{category.description}</CardDescription>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full group-hover:bg-purple-600 group-hover:text-white transition-all duration-300"
                      >
                        <Link
                          href={`/artists?category=${category.title.toLowerCase()}`}
                          aria-label={`View ${category.title.toLowerCase()} artists`}
                        >
                          View Artists
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/20 relative">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose Artistly?</h2>
            </motion.div>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: "Verified Artists",
                  description: "All artists are professionally vetted and verified for quality assurance.",
                  gradient: "gradient-bg-1",
                },
                {
                  icon: Calendar,
                  title: "Easy Booking",
                  description: "Streamlined booking process with instant quotes and availability.",
                  gradient: "gradient-bg-2",
                },
                {
                  icon: Star,
                  title: "Quality Guaranteed",
                  description: "Rated and reviewed by event planners for consistent quality.",
                  gradient: "gradient-bg-3",
                },
              ].map((feature, index) => (
                <StaggerItem key={feature.title} className="text-center">
                  <div
                    className={`${feature.gradient} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                  >
                    <feature.icon className="h-8 w-8 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* CTA Section */}
        <section className="gradient-bg-hero text-white py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20" aria-hidden="true"></div>
          <ParticleBackground />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Ready to Find Your Perfect Artist?
            </motion.h2>
            <motion.p
              className="text-xl mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Join thousands of event planners who trust Artistly for their entertainment needs.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Button
                asChild
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <Link href="/artists" aria-label="Start browsing artists">
                  Start Browsing
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
