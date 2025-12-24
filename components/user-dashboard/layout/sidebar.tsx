"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

import {
  Home,
  Map,
  BarChart3,
  MessageSquare,
  Share2,
} from "lucide-react"

import { useThemeStore } from "@/store/useThemeStore"
import { useSidebar } from "@/components/ui/sidebar"

interface MenuItem {
  id: string
  label: string
  icon: any
  href: string
}

export function AppSidebar() {
  const pathname = usePathname()
  const { theme } = useThemeStore()
  const { state } = useSidebar()

  const isCollapsed = state === "collapsed"

  /* ✅ FLAT MENU (NO DROPDOWNS) */
  const menuItems: MenuItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      href: "/citizen/dashboard",
    },
    {
      id: "grievance",
      label: "Grievance Management",
      icon: Map,
      href: "/citizen/grievances",
    },
    {
      id: "poll",
      label: "Poll",
      icon: BarChart3,
      href: "/citizen/polls",
    },
    {
      id: "myvoice",
      label: "My Voice",
      icon: MessageSquare,
      href: "/citizen/myvoice",
    },
    {
      id: "social",
      label: "Social Media",
      icon: Share2,
      href: "/admin/social-media/posts",
    },
  ]

  return (
    <Sidebar
      collapsible="icon"
      className="border-r"
      style={{
        backgroundColor: theme.backgroundSecondary,
        borderColor: theme.border,
      }}
    >
      {/* HEADER (EXPANDED) */}
      <SidebarHeader
        className="px-4 py-4 group-data-[collapsible=icon]:hidden border-b"
        style={{
          borderColor: theme.border,
          background: theme.buttonPrimary.bg,
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg backdrop-blur shadow-lg"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
          >
            <span className="text-lg font-bold text-white">CA</span>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold text-white">
              Citizen Connect
            </span>
            <span className="text-xs text-white/80">
              Citizen Admin Panel
            </span>
          </div>
        </div>
      </SidebarHeader>

      {/* HEADER (COLLAPSED) */}
      <SidebarHeader
        className="py-4 hidden group-data-[collapsible=icon]:flex items-center justify-center border-b"
        style={{
          borderColor: theme.border,
          background: theme.buttonPrimary.bg,
        }}
      >
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg backdrop-blur shadow-lg"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
        >
          <span className="text-sm font-bold text-white">CA</span>
        </div>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent style={{ backgroundColor: theme.backgroundSecondary }}>
        <SidebarGroup>
          <SidebarGroupLabel
            className="group-data-[collapsible=icon]:hidden"
            style={{ color: theme.textTertiary }}
          >
            Main Menu
          </SidebarGroupLabel>

          <SidebarMenu>
            {menuItems.map((item) => {
              const isActive = pathname === item.href

              return (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={item.label}
                    className="transition-all duration-200 mx-2 mb-1"
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center w-full rounded-lg relative overflow-hidden ${
                        isCollapsed
                          ? "justify-center px-2 py-2.5"
                          : "gap-3 px-3 py-2.5"
                      }`}
                      style={{
                        backgroundColor: isActive
                          ? theme.highlight
                          : "transparent",
                        color: isActive
                          ? "#ffffff"
                          : theme.textPrimary,
                      }}
                    >
                      {isActive && (
                        <div
                          className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full"
                          style={{ backgroundColor: "#ffffff" }}
                        />
                      )}

                      <item.icon
                        className={
                          isCollapsed ? "sidebar-icon" : "h-5 w-5"
                        }
                        style={{
                          color: isActive
                            ? "#ffffff"
                            : theme.textSecondary,
                        }}
                      />

                      {!isCollapsed && (
                        <span className="flex-1 font-semibold">
                          {item.label}
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
