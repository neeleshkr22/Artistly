"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  element: HTMLDivElement
}

export function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const particleCount = 50
    const particles: Particle[] = []

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.className = "particle"

      const size = Math.random() * 4 + 2
      const x = Math.random() * container.offsetWidth
      const y = Math.random() * container.offsetHeight

      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      particle.style.left = `${x}px`
      particle.style.top = `${y}px`

      container.appendChild(particle)

      particles.push({
        x,
        y,
        size,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        element: particle,
      })
    }

    particlesRef.current = particles

    // Animate particles
    const animateParticles = () => {
      particles.forEach((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x > container.offsetWidth) particle.x = 0
        if (particle.x < 0) particle.x = container.offsetWidth
        if (particle.y > container.offsetHeight) particle.y = 0
        if (particle.y < 0) particle.y = container.offsetHeight

        particle.element.style.left = `${particle.x}px`
        particle.element.style.top = `${particle.y}px`
      })

      requestAnimationFrame(animateParticles)
    }

    animateParticles()

    // Cleanup
    return () => {
      particles.forEach((particle) => {
        if (particle.element.parentNode) {
          particle.element.parentNode.removeChild(particle.element)
        }
      })
    }
  }, [])

  return <div ref={containerRef} className="particles-bg" />
}
