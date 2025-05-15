import { Home, Settings } from 'lucide-react'
import Link from 'next/link'

export const SidebarNav = () => (
  <nav className="flex flex-col gap-2 p-4">
    <Link href="/dashboard" className="flex items-center gap-2 text-foreground hover:text-accent">
      <Home size={18} /> Dashboard
    </Link>
    <Link href="/dashboard/settings" className="flex items-center gap-2 text-foreground hover:text-accent">
      <Settings size={18} /> Settings
    </Link>
  </nav>
)
