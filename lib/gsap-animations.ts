import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export const initializeGSAP = () => {
  if (typeof window === "undefined") return

  // Fade in animation
  gsap.utils.toArray(".gsap-fade-in").forEach((element: any) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    )
  })

  // Slide from left
  gsap.utils.toArray(".gsap-slide-left").forEach((element: any) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        x: -50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    )
  })

  // Slide from right
  gsap.utils.toArray(".gsap-slide-right").forEach((element: any) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        x: 50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    )
  })

  // Scale in animation
  gsap.utils.toArray(".gsap-scale-in").forEach((element: any) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    )
  })

  // Rotate in animation
  gsap.utils.toArray(".gsap-rotate-in").forEach((element: any) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        rotation: -10,
        scale: 0.9,
      },
      {
        opacity: 1,
        rotation: 0,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    )
  })
}

export const animateHeroElements = () => {
  if (typeof window === "undefined") return

  const tl = gsap.timeline()

  tl.fromTo(
    ".hero-title",
    {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "power3.out",
    },
  )
    .fromTo(
      ".hero-subtitle",
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.5",
    )
    .fromTo(
      ".hero-buttons",
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.3",
    )

  // Floating animation for hero elements
  gsap.to(".floating-element", {
    y: -20,
    duration: 3,
    ease: "power1.inOut",
    yoyo: true,
    repeat: -1,
  })
}

export const animateCardHover = (element: HTMLElement) => {
  gsap.to(element, {
    scale: 1.05,
    y: -10,
    duration: 0.3,
    ease: "power2.out",
  })
}

export const animateCardLeave = (element: HTMLElement) => {
  gsap.to(element, {
    scale: 1,
    y: 0,
    duration: 0.3,
    ease: "power2.out",
  })
}

export const staggerAnimation = (selector: string, delay = 0.1) => {
  gsap.fromTo(
    selector,
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: delay,
      scrollTrigger: {
        trigger: selector,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    },
  )
}
