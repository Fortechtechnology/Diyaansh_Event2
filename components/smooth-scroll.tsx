"use client"

import { useEffect } from "react"

export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return

    document.querySelectorAll('a[href^="/#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const href = this.getAttribute("href")
        if (href) {
          const id = href.split("/#")[1]
          const targetElement = document.getElementById(id)
          if (targetElement) {
            const headerOffset = 80 // Adjust this value if your fixed header height changes
            const elementPosition = targetElement.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            })
          }
        }
      })
    })

    // Clean up event listeners on component unmount
    return () => {
      if (typeof window !== "undefined") {
        document.querySelectorAll('a[href^="/#"]').forEach((anchor) => {
          anchor.removeEventListener("click", () => {}) // Remove specific listener if possible, or re-add on mount
        })
      }
    }
  }, [])

  return null // This component doesn't render anything visible
}
