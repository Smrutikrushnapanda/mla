// components/admin-dashboard/sidebar.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"

import { 
  Home, 
  Users, 
  FileText, 
  Settings,
  ChevronDown,
  Shield,
  Map,
  MapPin,
  Building,
  Archive,
  FolderTree,
  Target,
  BarChart3,
  MessageSquare,
  FileBarChart,
  Briefcase,
  DollarSign,
  Calendar,
  UserCheck,
  Image,
  Clock,
  Share2,
  Eye
} from "lucide-react"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useThemeStore } from "@/store/useThemeStore"
import { useSidebar } from "@/components/ui/sidebar"

interface MenuItem {
  id: string
  label: string
  icon: any
  href?: string
  badge?: string
  submenu?: {
    id: string
    label: string
    href: string
    icon?: any
  }[]
}

export function AppSidebar() {
  const pathname = usePathname()
  const { theme, isDarkMode } = useThemeStore()
  const { state } = useSidebar()
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const menuItems: MenuItem[] = [
    { 
      id: "dashboard", 
      label: "Dashboard", 
      icon: Home, 
      href: "/admin/dashboard" 
    },

    {
      id: "district",
      label: "Grievance Management",
      icon: Map,
      submenu: [
        { 
          id: "grievance", 
          label: "Grievance", 
          href: "/citizen/grievances", 
          icon: MapPin 
        },
        {
          id: "constituency",
          label: "Constituency",
          href: "/admin/constituency",
          icon: Building,
        },
      ],
    },

    {
      id: "users",
      label: "User Management",
      icon: Users,
      submenu: [
        { 
          id: "manage-roles", 
          label: "Manage Roles", 
          href: "/admin/roles", 
          icon: Shield 
        },
        {
          id: "manage-users",
          label: "Manage Users",
          href: "/admin/users",
          icon: Users,
        },
        {
          id: "archive-users",
          label: "Archive Users",
          href: "/admin/archived",
          icon: Archive,
        },
      ],
    },

    {
      id: "categories",
      label: "Manage Category",
      icon: FolderTree,
      submenu: [
        { 
          id: "project-category", 
          label: "Project Category", 
          href: "/admin/project-category", 
          icon: Target 
        },
        { 
          id: "grievance-category", 
          label: "Grievance Category", 
          href: "/admin/grievances", 
          icon: FileText 
        },
        { 
          id: "poll-category", 
          label: "Poll Category", 
          href: "/admin/polls", 
          icon: BarChart3 
        },
        { 
          id: "myvoice-category", 
          label: "My Voice Category", 
          href: "/admin/myvoice", 
          icon: MessageSquare 
        },
      ],
    },

    {
      id: "reports",
      label: "Report",
      icon: FileBarChart,
      submenu: [
        { 
          id: "project-management", 
          label: "Project Management", 
          href: "/admin/reports/projects", 
          icon: Briefcase 
        },
        {
          id: "grievance",
          label: "Grievance",
          href: "/admin/reports/grievances",
          icon: FileText,
        },
        {
          id: "polls",
          label: "Polls",
          href: "/admin/reports/polls",
          icon: BarChart3,
        },
        {
          id: "my-voice",
          label: "My Voice - Connect with MLA",
          href: "/admin/reports/myvoice",
          icon: MessageSquare,
        },
        {
          id: "events-meetings",
          label: "Events and Meetings",
          href: "/admin/reports/events",
          icon: Calendar,
        },
        {
          id: "appointment-booking",
          label: "Appointment Booking",
          href: "/admin/reports/appointments",
          icon: Clock,
        },
        {
          id: "logs-reports",
          label: "Logs Reports",
          href: "/admin/reports/logs",
          icon: Clock,
        },
      ],
    },

    {
      id: "social-media",
      label: "Social Media Handle",
      icon: Share2,
      submenu: [
        { 
          id: "track-engagement", 
          label: "Track Engagement", 
          href: "/admin/social-media/engagement", 
          icon: Eye 
        },
        {
          id: "view-posts",
          label: "View Posts",
          href: "/admin/social-media/posts",
          icon: Image,
        },
      ],
    },
  ]

  // Toggle menu - only one menu open at a time, can close active menu
  const toggleMenu = (menuId: string) => {
    setOpenMenu(prev => prev === menuId ? null : menuId)
  }

  // Check if any submenu item is active
  const isSubmenuActive = (submenu: MenuItem['submenu']) => {
    return submenu?.some(item => pathname === item.href)
  }

  // Menu open state - controlled by user interaction only
  const getMenuOpenState = (menuId: string) => {
    return openMenu === menuId
  }
  
  const getIconColor = (isActive: boolean) => {
    if (isActive) return '#ffffff'
    return theme.textSecondary
  }
  
  const getSubIconColor = (isActive: boolean) => {
    if (isActive) return '#ffffff'
    return theme.textTertiary
  }

  const isCollapsed = state === "collapsed"

  return (
    <Sidebar 
      collapsible="icon"
      className="border-r"
      style={{
        backgroundColor: theme.backgroundSecondary,
        borderColor: theme.border,
      }}
    >
      {/* Global style override */}
      <style jsx global>{`
        [data-sidebar] [data-sidebar-menu-button] {
          background: transparent !important;
        }
        [data-sidebar] [data-sidebar-menu-button]:hover {
          background: transparent !important;
        }
        [data-sidebar] [data-sidebar-menu-sub-button] {
          background: transparent !important;
        }
        [data-sidebar] [data-sidebar-menu-sub-button]:hover {
          background: transparent !important;
        }
        
        [data-sidebar][data-state="collapsed"] [data-sidebar-menu-button] {
          justify-content: center;
          padding-left: 0;
          padding-right: 0;
        }
        
        [data-sidebar][data-state="collapsed"] [data-sidebar-menu-button] > * {
          margin: 0 auto;
        }
        
        [data-sidebar][data-state="collapsed"] .sidebar-icon {
          width: 22px;
          height: 22px;
        }

        /* Tooltip styling for dark mode */
        [data-sidebar] [role="tooltip"] {
          background-color: ${isDarkMode ? '#1f2937' : '#ffffff'} !important;
          color: ${isDarkMode ? '#ffffff' : '#000000'} !important;
          border: 1px solid ${isDarkMode ? '#374151' : '#e5e7eb'} !important;
        }

        [data-sidebar] [data-state="delayed-open"][data-side] {
          background-color: ${isDarkMode ? '#1f2937' : '#ffffff'} !important;
          color: ${isDarkMode ? '#ffffff' : '#000000'} !important;
          border: 1px solid ${isDarkMode ? '#374151' : '#e5e7eb'} !important;
        }

        /* Custom scrollbar styling - thin and subtle */
        [data-sidebar] ::-webkit-scrollbar {
          width: 4px;
        }

        [data-sidebar] ::-webkit-scrollbar-track {
          background: transparent;
        }

        [data-sidebar] ::-webkit-scrollbar-thumb {
          background: ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
          border-radius: 2px;
        }

        [data-sidebar] ::-webkit-scrollbar-thumb:hover {
          background: ${isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
        }

        /* Firefox scrollbar */
        [data-sidebar] * {
          scrollbar-width: thin;
          scrollbar-color: ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'} transparent;
        }
      `}</style>

      {/* Header - Expanded */}
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
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
          >
            <span className="text-lg font-bold text-white">CA</span>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold text-white">MLA Connect</span>
            <span className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Citizen Admin Panel
            </span>
          </div>
        </div>
      </SidebarHeader>

      {/* Header - Collapsed */}
      <SidebarHeader 
        className="py-4 hidden group-data-[collapsible=icon]:flex items-center justify-center border-b"
        style={{ 
          borderColor: theme.border,
          background: theme.buttonPrimary.bg,
        }}
      >
        <div 
          className="flex h-10 w-10 items-center justify-center rounded-lg backdrop-blur shadow-lg"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
        >
          <span className="text-sm font-bold text-white">SA</span>
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent style={{ backgroundColor: theme.backgroundSecondary }}>
        <SidebarGroup>
          <SidebarGroupLabel 
            className="group-data-[collapsible=icon]:hidden"
            style={{ color: theme.textTertiary }}
          >
            Main Menu
          </SidebarGroupLabel>
          <SidebarMenu>
            {menuItems.map((item, index) => {
              const isActive = pathname === item.href
              const hasSubmenu = item.submenu && item.submenu.length > 0
              const submenuActive = hasSubmenu && isSubmenuActive(item.submenu)
              const isOpen = hasSubmenu && getMenuOpenState(item.id)
              const isHovered = hoveredItem === item.id
              const isLastItem = index === menuItems.length - 1

              // Simple link (no submenu)
              if (!hasSubmenu) {
                return (
                  <div key={item.id}>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        asChild
                        isActive={isActive}
                        tooltip={item.label}
                        className={`transition-all duration-200 mb-1 ${isCollapsed ? 'mx-2' : 'mx-2'}`}
                      >
                        <Link 
                          href={item.href!} 
                          className={`flex items-center w-full rounded-lg relative overflow-hidden ${isCollapsed ? 'justify-center px-2 py-2.5' : 'gap-3 px-3 py-2.5'}`}
                          onMouseEnter={() => setHoveredItem(item.id)}
                          onMouseLeave={() => setHoveredItem(null)}
                          style={{
                            backgroundColor: isActive 
                              ? theme.highlight 
                              : isHovered 
                                ? theme.sidebarHover
                                : 'transparent',
                            color: isActive ? '#ffffff' : theme.textPrimary,
                          }}
                        >
                          {isActive && (
                            <div 
                              className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full"
                              style={{ backgroundColor: '#ffffff' }}
                            />
                          )}
                          <item.icon 
                            className={`flex-shrink-0 ${isCollapsed ? 'sidebar-icon' : 'h-5 w-5'}`}
                            style={{ color: getIconColor(isActive) }}
                          />
                          {!isCollapsed && (
                            <>
                              <span className="flex-1 font-semibold">{item.label}</span>
                              {item.badge && (
                                <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-semibold text-white">
                                  {item.badge}
                                </span>
                              )}
                            </>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    {/* Divider between menu items */}
                    {!isLastItem && (
                      <div 
                        className="mx-4 my-2 h-px"
                        style={{ backgroundColor: theme.border, opacity: 0.5 }}
                      />
                    )}
                  </div>
                )
              }

              // Collapsed state with submenu
              if (isCollapsed) {
                return (
                  <div key={item.id}>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        asChild
                        isActive={submenuActive}
                        tooltip={item.label}
                        className="transition-all duration-200 mx-2 mb-1"
                      >
                        <Link 
                          href={item.submenu?.[0]?.href || '#'} 
                          className="flex items-center justify-center w-full px-2 py-2.5 relative rounded-lg overflow-hidden"
                          onMouseEnter={() => setHoveredItem(item.id)}
                          onMouseLeave={() => setHoveredItem(null)}
                          style={{
                            backgroundColor: submenuActive 
                              ? theme.highlight 
                              : isHovered 
                                ? theme.sidebarHover
                                : 'transparent',
                            color: submenuActive ? '#ffffff' : theme.textPrimary,
                          }}
                        >
                          <item.icon 
                            className="sidebar-icon flex-shrink-0" 
                            style={{ color: getIconColor(submenuActive) }}
                          />
                          {item.badge && (
                            <span 
                              className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white"
                            >
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    {/* Divider between menu items */}
                    {!isLastItem && (
                      <div 
                        className="mx-4 my-2 h-px"
                        style={{ backgroundColor: theme.border, opacity: 0.5 }}
                      />
                    )}
                  </div>
                )
              }

              // Expanded state with submenu
              return (
                <div key={item.id}>
                  <Collapsible
                    open={isOpen}
                    onOpenChange={() => toggleMenu(item.id)}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton 
                          tooltip={item.label}
                          isActive={submenuActive}
                          className="transition-all duration-200 mx-2 mb-1"
                        >
                          <div 
                            className="flex items-center w-full px-3 py-2.5 gap-3 rounded-lg cursor-pointer relative overflow-hidden"
                            onMouseEnter={() => setHoveredItem(item.id)}
                            onMouseLeave={() => setHoveredItem(null)}
                            style={{
                              backgroundColor: submenuActive 
                                ? theme.highlight 
                                : isHovered 
                                  ? theme.sidebarHover
                                  : 'transparent',
                              color: submenuActive ? '#ffffff' : theme.textPrimary,
                            }}
                          >
                            {submenuActive && (
                              <div 
                                className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full"
                                style={{ backgroundColor: '#ffffff' }}
                              />
                            )}
                            <item.icon 
                              className="h-5 w-5 flex-shrink-0" 
                              style={{ color: getIconColor(submenuActive) }}
                            />
                            <span className="flex-1 font-semibold">{item.label}</span>
                            {item.badge && (
                              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-semibold text-white">
                                {item.badge}
                              </span>
                            )}
                            <ChevronDown 
                              className="h-4 w-4 flex-shrink-0 transition-transform duration-200"
                              style={{ 
                                color: getIconColor(submenuActive),
                                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                              }}
                            />
                          </div>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub className="ml-4 mr-2 mt-1 mb-2">
                          {item.submenu?.map((subItem) => {
                            const isSubActive = pathname === subItem.href
                            const isSubHovered = hoveredItem === subItem.id
                            const SubIcon = subItem.icon
                            
                            return (
                              <SidebarMenuSubItem key={subItem.id}>
                                <SidebarMenuSubButton 
                                  asChild
                                  isActive={isSubActive}
                                  className="transition-all duration-200 mb-1"
                                >
                                  <Link 
                                    href={subItem.href} 
                                    className="flex items-center gap-3 w-full px-3 py-2 rounded-lg relative overflow-hidden"
                                    onMouseEnter={() => setHoveredItem(subItem.id)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    style={{
                                      backgroundColor: isSubActive 
                                        ? theme.highlightSecondary 
                                        : isSubHovered 
                                          ? theme.sidebarSubmenuHover
                                          : 'transparent',
                                      color: isSubActive ? '#ffffff' : theme.textSecondary,
                                    }}
                                  >
                                    {isSubActive && (
                                      <div 
                                        className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full"
                                        style={{ backgroundColor: '#ffffff', opacity: 0.8 }}
                                      />
                                    )}
                                    {SubIcon && (
                                      <SubIcon 
                                        className="h-4 w-4 flex-shrink-0" 
                                        style={{ color: getSubIconColor(isSubActive) }}
                                      />
                                    )}
                                    <span className="font-medium text-sm">{subItem.label}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )
                          })}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                  
                  {/* Divider between menu items */}
                  {!isLastItem && (
                    <div 
                      className="mx-4 my-2 h-px"
                      style={{ backgroundColor: theme.border, opacity: 0.5 }}
                    />
                  )}
                </div>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}