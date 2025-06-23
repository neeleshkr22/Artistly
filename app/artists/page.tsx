"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Star, MapPin, Filter } from "lucide-react"
import Image from "next/image"
import artistsData from "@/data/artists.json"
import { initializeGSAP, staggerAnimation } from "@/lib/gsap-animations"

interface Artist {
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

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>(artistsData)
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>(artistsData)
  const [filters, setFilters] = useState({
    category: "All Categories",
    location: "All Locations",
    priceRange: "All Prices",
    search: "",
  })

  const categories = [
    "Singer",
    "DJ",
    "Dancer",
    "Speaker",
    "Performer",
    "Choreographer",
    "Producer",
    "MC",
    "Motivational Coach",
    "Songwriter",
  ]
  const locations = ["New York, NY", "Los Angeles, CA", "Miami, FL", "Chicago, IL", "Austin, TX", "Nashville, TN"]
  const priceRanges = ["$250-600", "$300-800", "$400-900", "$500-1000", "$600-1200", "$1000-2500"]

  useEffect(() => {
    let filtered = artists

    if (filters.category !== "All Categories") {
      filtered = filtered.filter((artist) =>
        artist.category.some((cat) => cat.toLowerCase().includes(filters.category.toLowerCase())),
      )
    }

    if (filters.location !== "All Locations") {
      filtered = filtered.filter((artist) => artist.location.toLowerCase().includes(filters.location.toLowerCase()))
    }

    if (filters.priceRange !== "All Prices") {
      filtered = filtered.filter((artist) => artist.priceRange === filters.priceRange)
    }

    if (filters.search) {
      filtered = filtered.filter(
        (artist) =>
          artist.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          artist.bio.toLowerCase().includes(filters.search.toLowerCase()) ||
          artist.category.some((cat) => cat.toLowerCase().includes(filters.search.toLowerCase())),
      )
    }

    setFilteredArtists(filtered)
  }, [filters, artists])

  useEffect(() => {
    initializeGSAP()
    staggerAnimation(".artist-card", 0.1)
  }, [filteredArtists])

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      category: "All Categories",
      location: "All Locations",
      priceRange: "All Prices",
      search: "",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Browse Artists</h1>
          <p className="text-lg text-muted-foreground">Discover talented performers for your next event</p>
        </div>

        {/* Filters */}
        <div className="bg-card/80 backdrop-blur-md p-6 rounded-lg shadow-lg border border-border mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold">Filters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Search</label>
              <Input
                placeholder="Search artists..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <Select value={filters.location} onValueChange={(value) => handleFilterChange("location", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <Select value={filters.priceRange} onValueChange={(value) => handleFilterChange("priceRange", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Prices" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button variant="outline" onClick={clearFilters}>
            Clear All Filters
          </Button>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredArtists.length} of {artists.length} artists
          </p>
        </div>

        {/* Artist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtists.map((artist) => (
            <Card
              key={artist.id}
              className="artist-card hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-card/90 backdrop-blur-sm border-0 shadow-lg"
            >
              <CardHeader className="p-0">
                <div className="relative">
                  <Image
                    src={artist.image || "/placeholder.svg"}
                    alt={artist.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white text-gray-900">{artist.priceRange}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-xl">{artist.name}</CardTitle>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{artist.rating}</span>
                    <span className="text-sm text-gray-500">({artist.reviews})</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-3">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{artist.location}</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {artist.category.map((cat) => (
                    <Badge key={cat} variant="secondary" className="text-xs">
                      {cat}
                    </Badge>
                  ))}
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{artist.bio}</p>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Button className="flex-1">Ask for Quote</Button>
                  <Button variant="outline" className="flex-1">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredArtists.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">No artists found matching your criteria.</p>
            <Button onClick={clearFilters}>Clear Filters</Button>
          </div>
        )}
      </div>
    </div>
  )
}
