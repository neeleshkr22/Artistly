"use client"

import { Button } from "@/components/ui/button"
import { Sun } from "lucide-react"

/**
 * Skeleton component for theme toggle during SSR
 */
export function ThemeToggleSkeleton() {
  return (
    <Button
      variant="outline"
      size="icon"
      className="relative overflow-hidden transition-all duration-300"
      disabled
      aria-label="Loading theme toggle"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] opacity-50" />
    </Button>
  )
}
