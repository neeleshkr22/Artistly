"use client"

import { motion } from "framer-motion"
import { Loader2, Music } from "lucide-react"

interface LoadingProps {
  /** Loading message to display */
  message?: string
  /** Size variant for the loading spinner */
  size?: "sm" | "md" | "lg"
  /** Whether to show the full page overlay */
  fullPage?: boolean
}

/**
 * Animated loading component with Framer Motion
 * Supports different sizes and can be used as full page overlay
 */
export function Loading({ message = "Loading...", size = "md", fullPage = false }: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  const containerClasses = fullPage
    ? "fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
    : "flex items-center justify-center p-8"

  return (
    <motion.div
      className={containerClasses}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex flex-col items-center space-y-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Loader2 className={`${sizeClasses[size]} text-primary`} />
        </motion.div>

        <motion.div
          className="flex items-center space-x-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Music className="h-5 w-5 text-primary" />
          <p className="text-sm text-muted-foreground">{message}</p>
        </motion.div>
      </div>
    </motion.div>
  )
}

/**
 * Skeleton loading component for content placeholders
 */
export function SkeletonCard() {
  return (
    <motion.div
      className="bg-card rounded-lg p-6 space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="animate-pulse space-y-4">
        <div className="bg-muted h-48 rounded-lg" />
        <div className="space-y-2">
          <div className="bg-muted h-4 rounded w-3/4" />
          <div className="bg-muted h-4 rounded w-1/2" />
        </div>
        <div className="flex space-x-2">
          <div className="bg-muted h-8 rounded w-20" />
          <div className="bg-muted h-8 rounded w-16" />
        </div>
      </div>
    </motion.div>
  )
}
