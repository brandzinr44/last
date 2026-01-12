"use client"

import { useEffect, useRef, useState } from "react"

export function Hero() {
  const [animationKey, setAnimationKey] = useState(0)
  const heroRef = useRef(null)
  const svgRef = useRef(null)
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const checkTheme = () => {
      const htmlElement = document.documentElement
      const isDarkMode = htmlElement.classList.contains("dark")
      setIsDark(isDarkMode)
    }

    checkTheme()

    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimationKey((prev) => prev + 1)

          setTimeout(() => {
            if (svgRef.current) {
              const letters = svgRef.current.querySelectorAll(".letter")
              letters.forEach((letter) => {
                letter.classList.add("animate")
              })
            }
          }, 10)
        }
      },
      { threshold: 0.4 },
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => observer.disconnect()
  }, []) // Removed hasAnimated dependency

  return (
    <section className="w-full bg-background transition-colors duration-300" ref={heroRef}>
      <style>{`
        @keyframes slideUpLetterSmooth {
          0% {
            opacity: 0;
            transform: translateY(100%);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .letter {
          opacity: 0;
        }

        .letter.animate {
          animation: slideUpLetterSmooth 0.8s cubic-bezier(0.33, 0, 0.2, 1) forwards;
        }

        .svg-container {
          transition: filter 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .svg-container.dark-theme {
          filter: none;
        }

        .svg-container.dark-theme:hover {
          filter: none;
        }

        .svg-container.light-theme {
          filter: none;
        }

        .svg-container.light-theme:hover {
          filter: none;
        }
      `}</style>

      {/* Hero SVG Section - Standardized padding to Tailwind scale */}
      <div className="py-24 md:py-24 lg:py-32 flex items-center justify-center overflow-hidden">
        <div className="w-full max-w-full px-3 md:px-6 lg:px-4 overflow-hidden">
          <svg
            ref={svgRef}
            viewBox="0 0 4362.67 1431.74"
            xmlns="http://www.w3.org/2000/svg"
            className={`w-full h-auto svg-container ${isDark ? "dark-theme" : "light-theme"}`}
            preserveAspectRatio="xMidYMid meet"
            key={animationKey}
          >
            <path
              className={`cls-1 letter`}
              d="M35.95,614.29V20.94h156.19v452.04h249.57v141.31H35.95Z"
              fill={isDark ? "#e4e4e7" : "#18181b"}
              style={{ animationDelay: "0.05s" }}
            />
            <path
              className={`cls-1 letter`}
              d="M464.12,316.82c0-172.93,129.3-295.88,293.5-295.88s294.29,122.95,294.29,295.88-129.3,297.47-294.29,297.47-293.5-124.54-293.5-297.47ZM897.23,316.82c0-89.64-49.97-161.82-139.61-161.82s-139.61,72.19-139.61,161.82,49.97,163.41,139.61,163.41,139.61-73.77,139.61-163.41Z"
              fill={isDark ? "#e4e4e7" : "#18181b"}
              style={{ animationDelay: "0.12s" }}
            />
            <path
              className={`cls-1 letter`}
              d="M1088.52,614.29v-124.78l283.45-333.86h-286.75V20.94h478.48v127.26l-285.1,331.38h293.37v134.7h-483.44Z"
              fill={isDark ? "#e4e4e7" : "#18181b"}
              style={{ animationDelay: "0.19s" }}
            />
            <path
              className={`cls-1 letter`}
              d="M1624.82,614.29V20.94h156.19v593.35h-156.19Z"
              fill={isDark ? "#e4e4e7" : "#18181b"}
              style={{ animationDelay: "0.26s" }}
            />
            <path
              className={`cls-1 letter`}
              d="M2003.3,244.06v370.22h-142.96V20.94h167.76l218.99,342.95V20.94h142.97v593.35h-150.41l-236.35-370.22Z"
              fill={isDark ? "#e4e4e7" : "#18181b"}
              style={{ animationDelay: "0.33s" }}
            />
            <path
              className={`cls-1 letter`}
              d="M2469.36,614.29V20.94h242.96c160.32,0,252.05,71.9,252.05,198.33,0,76.03-45.45,138.83-125.61,172.72l145.44,222.3h-185.94l-121.48-197.51h-51.24v197.51h-156.19ZM2625.54,287.86h80.16c69.42,0,101.65-21.49,101.65-68.59s-32.23-69.42-101.65-69.42h-80.16v138.01Z"
              fill={isDark ? "#e4e4e7" : "#18181b"}
              style={{ animationDelay: "0.4s" }}
            />
            <path
              className={`cls-1 letter`}
              d="M281.38,1398.4H35.95v-593.35h238c129.74,0,210.73,57.02,210.73,160.32,0,52.06-27.27,92.56-76.85,122.31,60.33,25.62,94.21,69.42,94.21,132.22,0,111.56-82.64,178.5-220.65,178.5ZM177.26,928.19v102.47h84.29c52.06,0,76.03-19.83,76.03-52.06s-23.96-50.41-76.03-50.41h-84.29ZM177.26,1153.79v121.48h91.73c58.68,0,85.95-23.14,85.95-61.15s-27.27-60.33-85.95-60.33h-91.73Z"
              fill={isDark ? "#e4e4e7" : "#18181b"}
              style={{ animationDelay: "0.47s" }}
            />
            <path
              className={`cls-1 letter`}
              d="M543.33,1398.4v-593.35h242.96c160.32,0,252.05,71.9,252.05,198.33,0,76.03-45.45,138.83-125.61,172.72l145.44,222.3h-185.94l-121.48-197.51h-51.24v197.51h-156.19ZM699.51,1071.98h80.16c69.42,0,101.65-21.49,101.65-68.59s-32.23-69.42-101.65-69.42h-80.16v138.01Z"
              fill={isDark ? "#e4e4e7" : "#18181b"}
              style={{ animationDelay: "0.54s" }}
            />
            <path
              className={`cls-1 letter`}
              d="M1483.18,1288.49h-208.25l-37.19,109.91h-157.84l219.82-593.35h171.06l217.34,593.35h-168.59l-36.36-109.91ZM1317.07,1165.36h125.61l-61.98-188.42-63.63,188.42Z"
              fill={isDark ? "#e4e4e7" : "#18181b"}
              style={{ animationDelay: "0.61s" }}
            />
            <path
              className={`cls-1 letter`}
              d="M1857.5,1028.18v370.22h-142.96v-593.35h167.76l218.99,342.95v-342.95h142.97v593.35h-150.41l-236.35-370.22Z"
              fill={isDark ? "#e4e4e7" : "#18181b"}
              style={{ animationDelay: "0.68s" }}
            />
            <path
              className={`cls-1 letter`}
              d="M2323.56,1398.4v-593.35h231.39c187.59,0,305.76,120.65,305.76,293.37s-122.31,299.98-305.76,299.98h-231.39ZM2479.75,1263.7h66.11c103.3,0,154.53-53.72,154.53-165.28,0-104.95-52.89-158.67-154.53-158.67h-66.11v323.95Z"
              fill={isDark ? "#e4e4e7" : "#18181b"}
              style={{ animationDelay: "0.75s" }}
            />
            <path
              className={`cls-1 letter`}
              d="M2905.3,1398.4v-593.35h156.19v593.35h-156.19Z"
              fill={isDark ? "#e4e4e7" : "#18181b"}
              style={{ animationDelay: "0.82s" }}
            />
            <path
              className={`cls-1 letter`}
              d="M3283.78,1028.18v370.22h-142.96v-593.35h167.76l218.99,342.95v-342.95h142.97v593.35h-150.41l-236.35-370.22Z"
              fill={isDark ? "#e4e4e7" : "#18181b"}
              style={{ animationDelay: "0.89s" }}
            />
            <path
              className={`cls-1 letter`}
              d="M3715.13,1098.42c0-175.19,128.92-305.76,303.29-305.76,148.75,0,258.66,85.95,299.98,218.99h-185.11c-14.88-45.45-58.68-79.33-119-79.33-76.85,0-138.83,53.72-138.83,170.24,0,99.17,48.76,176.02,156.19,176.02,67.76,0,109.91-38.01,127.26-87.6h-142.96v-123.13h309.9c12.39,195.85-105.78,342.95-302.46,342.95-172.72,0-308.24-127.26-308.24-312.38Z"
              fill={isDark ? "#e4e4e7" : "#18181b"}
              style={{ animationDelay: "0.96s" }}
            />
          </svg>
        </div>
      </div>

      

      <div className="px-3 md:px-6 lg:px-8 pb-5 md:pb-5">
        {/* Top row with image and tagline */}
        <div className="flex items-start gap-4 md:gap-6 mb-6 md:mb-8">{/* Placeholder for image and tagline */}</div>

        {/* Large statement text with left indent */}
        <p className="text-chart-3 text-[30px] md:text-4xl lg:text-5xl xl:text-6xl font-medium leading-tight tracking-tighter">
          <span className="inline-block pl-[20%] md:pl-[25%]">Design on the web isn't static anymore.</span> Today's
          brands need energy, personality and meaning. We bring together strategy, design and storytelling to build
          digital experiences that grab attention, move fast and make people feel.
        </p>
      </div>
    </section>
  )
}
