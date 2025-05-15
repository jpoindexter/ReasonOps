// Placeholder content for UnsavedChangesGuard component
import { useEffect } from 'react'

export const UnsavedChangesGuard = () => {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])
  return null
}
