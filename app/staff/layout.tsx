"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { MLAStaffSidebar } from "@/components/staff-dashboard/layout/sidebar"
import Header from "@/components/staff-dashboard/layout/header"
import { useThemeStore } from "../../store/useThemeStore"
import { useEffect } from "react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { theme, hydrated } = useThemeStore()

  useEffect(() => {
    if (hydrated) {
      document.documentElement.style.setProperty('--background', theme.background)
      document.documentElement.style.setProperty('--foreground', theme.foreground)
    }
  }, [theme, hydrated])

  if (!hydrated) {
    return null 
  }

  return (
    <SidebarProvider>
        <div 
          className="flex min-h-screen w-full overflow-x-hidden"
          style={{ 
            backgroundColor: theme.background,
            color: theme.foreground 
          }}
        >
          <MLAStaffSidebar />
    
          <div className="flex flex-1 flex-col overflow-x-hidden">
            <Header />
    
            <main
              className="flex-1 p-6 overflow-x-hidden"
              style={{ backgroundColor: theme.muted || theme.background }}
            >
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
  )
}