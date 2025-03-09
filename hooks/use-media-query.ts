"use client"

import { useEffect, useState } from "react"

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Check if window is available (client-side)
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query)

      // Initial check
      if (media.matches !== matches) {
        setMatches(media.matches)
      }

      // Add listener for subsequent changes
      const listener = () => setMatches(media.matches)

      // Use the modern API if available
      if (media.addEventListener) {
        media.addEventListener("change", listener)
        return () => media.removeEventListener("change", listener)
      } else {
        // Fallback for older browsers
        media.addListener(listener)
        return () => media.removeListener(listener)
      }
    }
  }, [matches, query])

  // Return false on the server, the initial value
  return mounted ? matches : false
}

