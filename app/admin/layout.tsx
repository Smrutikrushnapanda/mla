"use client"
// AdminLayout.tsx
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "../../components/admin-dashboard/sidebar"
import Header from "../../components/admin-dashboard/header"
import { useThemeStore } from "../../store/useThemeStore" // Adjust path as needed
import { useEffect } from "react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { theme, hydrated } = useThemeStore()

  // Wait for hydration to prevent flash of wrong theme
  useEffect(() => {
    if (hydrated) {
      document.documentElement.style.setProperty('--background', theme.background)
      document.documentElement.style.setProperty('--foreground', theme.foreground)
      // Add other CSS variables as needed
    }
  }, [theme, hydrated])

  // Optionally show loading state while hydrating
  if (!hydrated) {
    return null // or a loading spinner
  }

  return (
    <SidebarProvider>
      <div 
        className="flex min-h-screen w-full"
        style={{ 
          backgroundColor: theme.background,
          color: theme.foreground 
        }}
      >
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main 
            className="flex-1 p-6"
            style={{ backgroundColor: theme.muted || theme.background }}
          >
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}