"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight } from "lucide-react"

export function DesktopHeader() {
  const pathname = usePathname()

  const navLinks = [
    { href: "/work", label: "Work" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
  ]

  const socialLinks = [
    { href: "https://instagram.com/adnanbranding", label: "Instagram" },
    { href: "https://facebook.com/adnanbranding", label: "Facebook" },
    { href: "https://youtube.com/adnanbranding", label: "YouTube" },
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <header className="hidden lg:block relative top-0 left-0 right-0 z-50">
      <style>{`
        /* Added underline animation styles for nav and social links */
        .header-nav-link {
          position: relative;
          transition: color 0.3s ease;
        }

        .header-nav-link::after {
          content: '';
          position: absolute;
          bottom: 0px;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: currentColor;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }

        .header-nav-link:hover::after {
          transform: scaleX(1);
        }

        .header-social-link {
          position: relative;
          transition: color 0.3s ease;
        }

        .header-social-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: currentColor;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }

        .header-social-link:hover::after {
          transform: scaleX(1);
        }

        /* Added wave background animation for CTA button */
        .header-cta-button {
          position: relative;
          overflow: hidden;
          z-index: 10;
        }

        .header-cta-button::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 0%;
          background-color: #ff3b00;
          z-index: -1;
          transition: height 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform-origin: bottom;
        }

        .header-cta-button::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 0%;
          background-color: rgba(0, 0, 0, 0.1);
          z-index: -1;
          transition: height 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform-origin: bottom;
        }

        .header-cta-button-text {
          position: relative;
          z-index: 1;
          transition: color 0.4s ease 0.1s;
        }

        .header-cta-button:hover::before {
          height: 100%;
          z-index: -1;
        }

        .header-cta-button:hover::after {
          height: 100%;
          z-index: -1;
        }

        .header-cta-button:hover .header-cta-button-text {
          color: white;
        }
      `}</style>
      <div className="w-full px-10 py-4">
        <div className="flex items-start justify-between gap-8">
          {/* Left: Logo */}
          <Link href="/" className="flex-shrink-0 w-5">
            <svg
              viewBox="0 0 509.62 741.42"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                d="M7.79,293.31V6.81h260.16c146.28,0,233.88,70.94,233.88,189.2,0,34.68-9.74,63.88-28.11,87.75-27.99,36.36-75.88,51.23-119.99,38.57l-196.15-56.25h97.22c62.2,0,91.11-25.4,91.11-63.94s-28.91-64.82-91.11-64.82h-97.22v466.78h97.22c62.2,0,91.11-24.53,91.11-64.82s-28.91-63.94-91.11-63.94h-97.22l196.15-56.25c44.11-12.64,91.99,2.21,119.99,38.59,18.37,23.85,28.11,53.07,28.11,87.74,0,118.26-87.6,189.2-233.88,189.2H7.79v-441.3h0Z"
                fill="currentColor"
              />
            </svg>
          </Link>

          {/* Branding Studio */}
          <div className="text-[14px] font-medium text-chart-5">Branding Studio</div>

          {/* Center: Navigation Links - Stacked */}
          <nav className="flex gap-5">
            <div className="flex flex-col gap-0.7 leading-none">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`header-nav-link text-sm font-medium ${
                    isActive(link.href) ? "text-text-chart-5" : "text-text-chart-5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Right: Social Links - Stacked */}
          <div className="flex flex-col gap-2 leading-none">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="header-social-link text-[14px] font-medium text-chart-5"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Far Right: CTA Button */}
          <Link
            href="/contact"
            className="header-cta-button flex-shrink-0 px-5 py-2 bg-foreground text-background text-[14px] font-medium rounded-none hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <span className="header-cta-button-text">Lets Talk</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </header>
  )
}
