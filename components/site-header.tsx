"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (isMenuOpen) {
      setIsAnimating(true)
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 800)
      return () => clearTimeout(timer)
    }
  }, [isMenuOpen])

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/about", label: "ABOUT" },
    { href: "/services", label: "SERVICES" },
    { href: "/work", label: "WORK" },
    { href: "/contact", label: "CONTACT" },
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${
          isMenuOpen ? "bg-chart-5 border-background" : "bg-chart-5 border-chart-5/20"
        }`}
      >
        <div className="flex items-center justify-between px-5 md:px-6 lg:px-8 py-3 md:py-4">
          {/* Logo - Left Side */}
          <Link href="/" className="flex-shrink-0 w-3.5">
            <svg
              viewBox="0 0 509.62 741.42"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                d="M7.79,293.31V6.81h260.16c146.28,0,233.88,70.94,233.88,189.2,0,34.68-9.74,63.88-28.11,87.75-27.99,36.36-75.88,51.23-119.99,38.57l-196.15-56.25h97.22c62.2,0,91.11-25.4,91.11-63.94s-28.91-64.82-91.11-64.82h-97.22v466.78h97.22c62.2,0,91.11-24.53,91.11-64.82s-28.91-63.94-91.11-63.94h-97.22l196.15-56.25c44.11-12.64,91.99,2.21,119.99,38.59,18.37,23.85,28.11,53.07,28.11,87.74,0,118.26-87.6,189.2-233.88,189.2H7.79v-441.3h0Z"
                fill="background"
              />
            </svg>
          </Link>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative flex items-center justify-center w-6 h-6 md:w-7 md:h-7 group"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <div className="relative w-5 h-3.5">
              <span
                className={`absolute left-0 h-[1.9px] transition-all duration-700 ease-in-out ${isMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45 w-full bg-background" : "top-0 w-full bg-background group-hover:w-3/5"}`}
              />
              <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 h-[1.9px] transition-all duration-700 ease-in-out ${isMenuOpen ? "w-0 opacity-0 bg-background" : "w-full opacity-100 bg-background group-hover:w-4/5 group-hover:translate-x-1"}`}
              />
              <span
                className={`absolute left-0 h-[1.9px] transition-all duration-700 ease-in-out ${isMenuOpen ? "bottom-1/2 translate-y-1/2 -rotate-45 w-full bg-background" : "bottom-0 w-full bg-background group-hover:w-2/5"}`}
              />
            </div>
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 overflow-hidden ${isAnimating || isMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        {/* Background curtain panels */}
        <div className="absolute inset-0 flex">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`flex-1 bg-chart-5 transition-transform ease-[cubic-bezier(0.76,0,0.24,1)] ${isMenuOpen ? "scale-y-100 origin-bottom" : "scale-y-0 origin-top"}`}
              style={{
                transitionDuration: "1500ms",
                transitionDelay: isMenuOpen ? `${i * 50}ms` : `${(4 - i) * 30}ms`,
              }}
            />
          ))}
        </div>

        {/* Content container */}
        <div className="relative h-full flex flex-col justify-between px-4 md:px-5 lg:px-6 pt-20 pb-8 md:pb-10">
          {/* Main Navigation */}
          <nav className="flex-1 flex items-center">
            <ul className="flex flex-col gap-0">
              {navLinks.map((link, index) => (
                <li key={link.href} className="overflow-hidden">
                  <Link
                    href={link.href}
                    className={`block text-[70px] md:text-[89px] lg:text-[101px] tracking-tight font-regular leading-[0.95] transition-colors duration-100 ease-in-out ${isActive(link.href) ? "text-background" : "text-background/50 hover:text-background"}`}
                    style={{
                      transform: isMenuOpen ? "translateY(0)" : "translateY(120%)",
                      opacity: isMenuOpen ? 1 : 0,
                      transitionDuration: "1500ms",
                      transitionDelay: isMenuOpen ? `${400 + index * 80}ms` : `${(navLinks.length - index) * 40}ms`,
                      transitionProperty: "transform, opacity",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom Section - Social links */}
          <div className="flex items-end justify-end">
            <div
              className="flex items-center gap-2 md:gap-2"
              style={{
                transform: isMenuOpen ? "translateY(0)" : "translateY(100%)",
                opacity: isMenuOpen ? 1 : 0,
                transitionDelay: isMenuOpen ? "1500ms" : "0ms",
              }}
            >
              <a
                href="https://instagram.com/adnanbranding"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-[16px] font-medium tracking-tight"
              >
                Instagram
              </a>
              <a
                href="https://facebook.com/adnanbranding"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-[16px] font-medium tracking-tight"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[40px] md:h-[48px]" />
    </>
  )
}
