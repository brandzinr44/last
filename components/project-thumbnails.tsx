"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useScrollHeight } from "@/hooks/use-scroll-height"

interface Project {
  id: string
  title: string
  category: string
  image: string
  slug: string
  tags?: string[]
}

const projects: Project[] = [
  {
    id: "1",
    title: "Lozinr",
    category: "Logo & Branding",
    industry: "DESIGN",
    image: "https://dbz3qkxac4rgq1sq.public.blob.vercel-storage.com/Lozinr-01.jpg",
    slug: "lozinr",
    tags: ["Agency", "Branding", "Creative"],
  },
  {
    id: "2",
    title: "Luvena",
    category: "Logo & Branding",
    industry: "FOOD & BEVERAGE",
    image: "https://bq45eawil9xlp5ci.public.blob.vercel-storage.com/Luvena01.jpg",
    slug: "luvena",
    tags: ["Pizza", "Food", "Packaging"],
  },
  {
    id: "3",
    title: "Rijq",
    category: "Food & Bakery",
    industry: "BAKERY",
    image: "https://q4bkxvdmgiqmmhbe.public.blob.vercel-storage.com/Frame%201.jpg",
    slug: "rijq",
    tags: ["Food", "Bakery", "Branding"],
  },
  {
    id: "4",
    title: "Cnyf",
    category: "Crypto",
    industry: "CRYPTO",
    image: "https://guxjkdyjeyrscewv.public.blob.vercel-storage.com/Frame%208.jpg",
    slug: "cnyf",
    tags: ["Crypto", "Wallet", "Money"],
  },
]

const handleProjectClick = (slug: string) => {
  console.log(`[v0] Navigating to project: ${slug}`)
  window.location.href = `/gallery/${slug}`
}

export function ProjectThumbnails() {
  const [visibleProjects, setVisibleProjects] = useState<boolean[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const projectRefsArray = useRef<(HTMLDivElement | null)[]>([])

  const imageHeight = useScrollHeight({
    minHeight: 500,
    maxHeight: 550,
    scrollMultiplier: 0.3,
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = projectRefsArray.current.indexOf(entry.target as HTMLDivElement)
          if (index !== -1) {
            setVisibleProjects((prev) => {
              const newVisible = [...prev]
              newVisible[index] = true
              return newVisible
            })
            observer.unobserve(entry.target)
          }
        }
      })
    }, observerOptions)

    projectRefsArray.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  if (isLoading) {
    return (
      <section className="py-12 md:py-16 lg:py-20 px-3 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 max-w-full mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="w-full h-[400px] md:h-[500px] bg-gray-800 rounded-lg mb-4"></div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 md:py-16 lg:py-20 px-3 md:px-6 lg:px-8">
      <style>{`
        /* Overlay hidden completely by default, positioned below with translateY */
        .thumbnail-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: white;
          z-index: 10;
          transform: translateY(100%);
          transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 2rem;
          overflow: hidden;
        }

        .group:hover .thumbnail-overlay {
          transform: translateY(0);
        }

        /* Footer nav-style text animation with dual-layer letter swap */
        .overlay-text-container {
          position: relative;
          display: inline-flex;
          overflow: hidden;
          height: 1.2em;
        }

        .overlay-text-layer {
          display: inline-flex;
        }

        .overlay-text-layer-primary {
          position: relative;
        }

        .overlay-text-layer-secondary {
          position: absolute;
          top: 0;
          left: 0;
        }

        .overlay-text-letter {
          display: inline-block;
          transition: transform 0.3s ease;
        }

        .overlay-text-layer-primary .overlay-text-letter {
          transform: translateY(0);
        }

        .overlay-text-layer-secondary .overlay-text-letter {
          transform: translateY(-100%);
        }

        /* Trigger animation after 1s delay on hover */
        .group:hover .overlay-text-layer-primary .overlay-text-letter {
          animation: swapLetterDown 0.3s ease forwards;
          animation-delay: calc(1s + var(--letter-delay, 0s));
        }

        .group:hover .overlay-text-layer-secondary .overlay-text-letter {
          animation: swapLetterUp 0.3s ease forwards;
          animation-delay: calc(1s + var(--letter-delay, 0s));
        }

        @keyframes swapLetterDown {
          0% { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }

        @keyframes swapLetterUp {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(0); }
        }

        /* Fixed text size to 14px for all devices */
        .overlay-click-text {
          font-size: 14px;
          font-weight: 400;
          color: #000;
          line-height: 1.2;
        }
      `}</style>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 max-w-full mx-auto overflow-hidden">
        {projects.map((project, index) => {
          const cardVisible = visibleProjects[index] || false
          const clickTextLetters = "click on it".split("")

          return (
            <Link href={`/gallery/${project.slug}`} key={project.id}>
              <div
                ref={(el) => {
                  projectRefsArray.current[index] = el
                }}
                className={`group overflow-hidden transition-all duration-100 transform flex flex-col cursor-pointer thumbnail-slide-up`}
                style={{ transitionDelay: `${index * 100}ms`, animationDelay: `${index * 100}ms` }}
              >
                <div className="w-full overflow-hidden relative transition-all duration-100 aspect-16-10">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="thumbnail-overlay">
                    <div className="overlay-click-text">
                      <div className="overlay-text-container">
                        <div className="overlay-text-layer overlay-text-layer-primary">
                          {clickTextLetters.map((letter, idx) => (
                            <span
                              key={idx}
                              className="overlay-text-letter"
                              style={{ "--letter-delay": `${idx * 0.03}s` } as React.CSSProperties}
                            >
                              {letter === " " ? "\u00A0" : letter}
                            </span>
                          ))}
                        </div>
                        <div className="overlay-text-layer overlay-text-layer-secondary">
                          {clickTextLetters.map((letter, idx) => (
                            <span
                              key={idx}
                              className="overlay-text-letter"
                              style={{ "--letter-delay": `${idx * 0.03}s` } as React.CSSProperties}
                            >
                              {letter === " " ? "\u00A0" : letter}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
