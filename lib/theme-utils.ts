import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge Tailwind classes with proper dark mode support
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Theme-aware background classes
 */
export const themeClasses = {
  background: "bg-background",
  card: "bg-card",
  muted: "bg-muted",
  accent: "bg-accent",
  primary: "bg-primary",
  secondary: "bg-secondary",
  destructive: "bg-destructive",

  // Text colors
  foreground: "text-foreground",
  mutedForeground: "text-muted-foreground",
  accentForeground: "text-accent-foreground",
  primaryForeground: "text-primary-foreground",
  secondaryForeground: "text-secondary-foreground",
  destructiveForeground: "text-destructive-foreground",

  // Borders
  border: "border-border",
  input: "border-input",
  ring: "ring-ring",
} as const

/**
 * Helper function to get theme-aware gradient classes
 * @param variant - Gradient variant
 * @returns Theme-aware gradient class
 */
export function getGradientClass(variant: "hero" | "animated" | "1" | "2" | "3" | "4") {
  const baseClass = `gradient-bg-${variant}`
  return baseClass
}

/**
 * Helper function to get theme-aware text classes
 * @param variant - Text variant
 * @returns Theme-aware text classes
 */
export function getTextClass(variant: "heading" | "body" | "muted" | "accent") {
  switch (variant) {
    case "heading":
      return "text-foreground font-bold"
    case "body":
      return "text-foreground"
    case "muted":
      return "text-muted-foreground"
    case "accent":
      return "text-accent-foreground"
    default:
      return "text-foreground"
  }
}
