"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Music, Menu, X } from "lucide-react"
import { gsap } from "gsap"

interface NavItem {
  href: string
  label: string
  description?: string
}

/**
 * Main navigation component with responsive design and theme support
 * Features smooth animations, accessibility support, and mobile menu
 */
export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  // Navigation items with descriptions for better accessibility
  const navItems: NavItem[] = [
    {
      href: "/",
      label: "Home",
      description: "Return to homepage",
    },
    {
      href: "/artists",
      label: "Browse Artists",
      description: "Discover talented performers",
    },
    {
      href: "/onboard",
      label: "Join as Artist",
      description: "Apply to become a featured artist",
    },
    {
      href: "/dashboard",
      label: "Dashboard",
      description: "Manage applications and bookings",
    },
  ]

  // Handle mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  // Initialize navigation animations on mount
  useEffect(() => {
    if (!mounted) return

    if (navRef.current && logoRef.current) {
      // Animate navigation slide down
      gsap.fromTo(navRef.current, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })

      // Animate logo with bounce effect
      gsap.fromTo(
        logoRef.current,
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 1, ease: "back.out(1.7)", delay: 0.3 },
      )
    }
  }, [mounted])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <motion.nav
      ref={navRef}
      className="bg-background/95 backdrop-blur-md shadow-sm border-b sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group" aria-label="Artistly homepage">
              <motion.div
                ref={logoRef}
                className="gradient-bg-1 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Music className="h-6 w-6 text-white" aria-hidden="true" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Artistly
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                <Link
                  href={item.href}
                  className={`text-sm font-medium transition-all duration-300 hover:text-primary hover:scale-105 relative ${
                    pathname === item.href ? "text-primary" : "text-muted-foreground"
                  }`}
                  aria-label={item.description}
                >
                  {item.label}
                  {pathname === item.href && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      layoutId="activeTab"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}

            <div className="flex items-center space-x-2">
              {mounted && <ThemeToggle />}
              <Button
                asChild
                className="gradient-bg-1 hover:scale-105 transition-transform duration-300 shadow-lg"
                aria-label="Get started with Artistly"
              >
                <Link href="/onboard">Get Started</Link>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {mounted && <ThemeToggle />}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="hover:scale-110 transition-transform duration-300"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden bg-background/95 backdrop-blur-md border-t"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={`block px-3 py-2 text-base font-medium transition-all duration-300 hover:text-primary hover:bg-accent rounded-lg ${
                        pathname === item.href ? "text-primary bg-accent" : "text-muted-foreground"
                      }`}
                      onClick={() => setIsOpen(false)}
                      aria-label={item.description}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  className="px-3 py-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                >
                  <Button asChild className="w-full gradient-bg-1 hover:scale-105 transition-transform duration-300">
                    <Link href="/onboard">Get Started</Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
