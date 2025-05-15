// Placeholder for useTheme hook
import { useState, useEffect } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    // Logic to detect and set theme
  }, [])

  return { theme, setTheme }
}
