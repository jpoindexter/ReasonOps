import '@/styles/globals.css'
import { DashboardShell } from '@/shared/layout/DashboardShell'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <DashboardShell>{children}</DashboardShell>
      </body>
    </html>
  )
}
