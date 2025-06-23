"use client"

import { useEffect, useState } from "react"
import type { ReactNode } from "react"

interface ClientWrapperProps {
  children: ReactNode
  fallback?: ReactNode
}

/**
 * Client wrapper component to handle SSR/hydration issues
 * Only renders children after component has mounted on client
 */
export function ClientWrapper({ children, fallback = null }: ClientWrapperProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
