"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

interface Project {
  id: string
  title: string
  category: string
  industry: string
  image: string
  slug: string
  tags?: string[]
}

const allProjects: Project[] = [
  {
    id: "1",
    title: "lOZ!NR",
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

interface WorkThumbnailsProps {
  filteredProjects: Project[]
}

export function WorkThumbnails({ filteredProjects }: WorkThumbnailsProps) {
  const [, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-12 md:py-16 lg:py-20 px-3 md:px-6 lg:px-8">
      <style>{`
        .work-thumbnail-image {
          position: relative;
          overflow: hidden;
        }

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-full mx-auto overflow-hidden">
        {filteredProjects.map((project, index) => (
          <ThumbnailCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}

function ThumbnailCard({ project, index }: { project: any; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const clickTextLetters = "click on it".split("")

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group overflow-hidden cursor-pointer flex flex-col"
      onClick={() => (window.location.href = `/gallery/${project.slug}`)}
    >
      <motion.div className="w-full overflow-hidden relative transition-all duration-100 aspect-16-10 work-thumbnail-image">
        <motion.img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover"
          animate={{ scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
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
      </motion.div>
    </motion.div>
  )
}

export { allProjects }
