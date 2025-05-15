import { SidebarNav } from './SidebarNav'
import { TopbarNav } from './TopbarNav'

export const DashboardShell = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-screen">
    <aside className="w-64 border-r bg-muted">
      <SidebarNav />
    </aside>
    <div className="flex flex-col flex-1">
      <TopbarNav />
      <main className="p-6 overflow-y-auto flex-1">{children}</main>
    </div>
  </div>
)
