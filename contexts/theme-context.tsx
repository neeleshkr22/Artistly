"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark" | "system"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: "light" | "dark"
  mounted: boolean
}

/**
 * Theme context for managing application-wide theme state
 * Supports light, dark, and system preference themes
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

/**
 * Theme provider component that manages theme state and persistence
 * @param children - Child components to wrap
 * @param defaultTheme - Default theme to use (defaults to 'system')
 * @param storageKey - localStorage key for theme persistence
 */
export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "artistly-theme",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light")
  const [mounted, setMounted] = useState(false)

  // Handle mounting to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)

    // Load theme from localStorage on mount
    try {
      const storedTheme = localStorage.getItem(storageKey) as Theme
      if (storedTheme && ["light", "dark", "system"].includes(storedTheme)) {
        setTheme(storedTheme)
      }
    } catch (error) {
      console.warn("Failed to load theme from localStorage:", error)
    }
  }, [storageKey])

  useEffect(() => {
    if (!mounted) return

    const root = window.document.documentElement

    // Remove existing theme classes
    root.classList.remove("light", "dark")

    let systemTheme: "light" | "dark" = "light"

    // Determine system theme preference
    if (theme === "system") {
      try {
        systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      } catch (error) {
        console.warn("Failed to detect system theme:", error)
        systemTheme = "light"
      }
    }

    const activeTheme = theme === "system" ? systemTheme : theme

    // Apply theme class to root element
    root.classList.add(activeTheme)
    setResolvedTheme(activeTheme)

    // Set data attribute for CSS targeting
    root.setAttribute("data-theme", activeTheme)

    // Persist theme to localStorage
    try {
      localStorage.setItem(storageKey, theme)
    } catch (error) {
      console.warn("Failed to save theme to localStorage:", error)
    }
  }, [theme, storageKey, mounted])

  // Listen for system theme changes
  useEffect(() => {
    if (!mounted) return

    let mediaQuery: MediaQueryList

    try {
      mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

      const handleChange = () => {
        if (theme === "system") {
          const systemTheme = mediaQuery.matches ? "dark" : "light"
          setResolvedTheme(systemTheme)
          const root = document.documentElement
          root.classList.remove("light", "dark")
          root.classList.add(systemTheme)
          root.setAttribute("data-theme", systemTheme)
        }
      }

      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    } catch (error) {
      console.warn("Failed to set up system theme listener:", error)
    }
  }, [theme, mounted])

  const value = {
    theme,
    setTheme,
    resolvedTheme,
    mounted,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

/**
 * Hook to access theme context
 * @returns Theme context value with current theme and setter
 * @throws Error if used outside ThemeProvider
 */
export function useTheme() {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
}
