"use client"
import { Users, Settings, LogOut, Search, Bell, ChevronDown, Moon, Sun, X } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { useThemeStore } from "@/store/useThemeStore"

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { mode, theme, toggleTheme } = useThemeStore()
  const [notifications] = useState([
    { id: 1, text: "New user registration", time: "2 min ago", unread: true },
    { id: 2, text: "Server update completed", time: "1 hour ago", unread: true },
    { id: 3, text: "Backup successful", time: "3 hours ago", unread: true },
  ])

  const unreadCount = notifications.filter(n => n.unread).length

  const handleCloseSearch = () => {
    setIsSearchOpen(false)
    setSearchQuery("")
  }

  return (
    <header 
      className="sticky top-0 z-50 shadow flex h-16 items-center gap-4 border-b backdrop-blur px-4 md:px-6"
      style={{
        background: theme.background,
        borderColor: theme.border,
      }}
    >
      {/* Mobile Menu + Sidebar Trigger */}
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-2" />
      </div>
      
      {/* Title - Hide when search is open on mobile */}
      {!isSearchOpen && (
        <div className="flex flex-1 items-center gap-4">
          <h1 
            className="text-lg md:text-xl font-semibold"
            style={{ color: theme.textPrimary }}
          >
            Admin Dashboard
          </h1>
        </div>
      )}

      {/* Search Bar - Expandable on mobile */}
      {isSearchOpen ? (
        <div 
          className="absolute left-0 right-0 top-0 flex h-16 items-center gap-2 px-4 sm:relative sm:left-auto sm:right-auto sm:flex-1"
          style={{ background: theme.background }}
        >
          <div className="flex items-center gap-2 flex-1 max-w-2xl mx-auto">
            <Search className="h-4 w-4" style={{ color: theme.textSecondary }} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm outline-none rounded-lg px-3 py-2"
              style={{ 
                color: theme.textPrimary,
                borderWidth: '1px',
                borderColor: theme.border,
                width: '100%'
              }}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  handleCloseSearch()
                }
              }}
            />
            <button
              onClick={handleCloseSearch}
              className="flex h-9 w-9 items-center justify-center rounded-lg transition-all hover:shadow-sm active:scale-95"
              style={{ 
                borderWidth: '1px',
                borderColor: theme.border,
                background: theme.background 
              }}
              aria-label="Close search"
            >
              <X className="h-4 w-4" style={{ color: theme.textSecondary }} />
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Right side actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg transition-all hover:shadow-sm active:scale-95"
              style={{ 
                borderWidth: '1px',
                borderColor: theme.border,
                background: theme.background 
              }}
              aria-label="Search"
            >
              <Search className="h-4 w-4" style={{ color: theme.textPrimary }} />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg transition-all hover:shadow-sm active:scale-95"
              style={{ 
                borderWidth: "1px",
                borderColor: theme.border,
                background: theme.backgroundSecondary,
              }}
              aria-label="Toggle theme"
            >
              {mode === "dark" ? (
                <Sun className="h-4 w-4" style={{ color: theme.highlight }} />
              ) : (
                <Moon className="h-4 w-4" style={{ color: theme.highlight }} />
              )}
            </button>

            {/* Notifications Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button 
                  className="relative flex h-9 w-9 items-center justify-center rounded-lg transition-all hover:shadow-sm active:scale-95"
                  style={{ 
                    borderWidth: '1px',
                    borderColor: theme.border,
                    background: theme.background 
                  }}
                  aria-label={`Notifications (${unreadCount} unread)`}
                >
                  <Bell className="h-4 w-4" style={{ color: theme.textPrimary }} />
                  {unreadCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-80 shadow-lg"
                style={{ 
                  background: theme.cardBackground,
                  borderColor: theme.border,
                  color: theme.textPrimary 
                }}
              >
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span>Notifications</span>
                  {unreadCount > 0 && (
                    <span className="text-xs font-normal" style={{ color: theme.textSecondary }}>
                      {unreadCount} unread
                    </span>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator style={{ background: theme.border }} />
                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.map((notification) => (
                    <DropdownMenuItem key={notification.id} className="flex flex-col items-start gap-1 p-3">
                      <div className="flex items-center gap-2 w-full">
                        {notification.unread && (
                          <div className="h-2 w-2 rounded-full" style={{ background: theme.highlight }} />
                        )}
                        <span className="text-sm flex-1">{notification.text}</span>
                      </div>
                      <span className="text-xs ml-4" style={{ color: theme.textSecondary }}>
                        {notification.time}
                      </span>
                    </DropdownMenuItem>
                  ))}
                </div>
                <DropdownMenuSeparator style={{ background: theme.border }} />
                <DropdownMenuItem 
                  className="justify-center text-sm"
                  style={{ color: theme.highlight }}
                >
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button 
                  className="flex items-center gap-2 rounded-lg px-3 py-1.5 transition-all hover:shadow-sm active:scale-95"
                  style={{ 
                    borderWidth: '1px',
                    borderColor: theme.border,
                    background: theme.background 
                  }}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 text-xs font-semibold text-white shadow-md">
                    JD
                  </div>
                  <div className="hidden md:flex flex-col items-start">
                    <span className="text-sm font-medium leading-none" style={{ color: theme.textPrimary }}>
                      John Doe
                    </span>
                    <span className="text-xs" style={{ color: theme.textSecondary }}>
                      Admin
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" style={{ color: theme.textSecondary }} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-56 shadow-lg"
                style={{ 
                  background: theme.cardBackground,
                  borderColor: theme.border,
                  color: theme.textPrimary 
                }}
              >
                <DropdownMenuLabel>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">John Doe</span>
                    <span className="text-xs font-normal" style={{ color: theme.textSecondary }}>
                      john.doe@admin.com
                    </span>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 rounded-full h-1.5" style={{ background: theme.backgroundSecondary }}>
                        <div className="h-full rounded-full w-3/4" style={{ background: theme.buttonPrimary.bg }} />
                      </div>
                      <span className="text-xs" style={{ color: theme.textSecondary }}>75% complete</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator style={{ background: theme.border }} />
                <DropdownMenuItem className="cursor-pointer">
                  <Users className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer sm:hidden"
                  onClick={toggleTheme}
                >
                  {mode === 'dark' ? (
                    <Sun className="mr-2 h-4 w-4" />
                  ) : (
                    <Moon className="mr-2 h-4 w-4" />
                  )}
                  Theme
                </DropdownMenuItem>
                <DropdownMenuSeparator style={{ background: theme.border }} />
                <DropdownMenuItem className="text-red-600 cursor-pointer focus:text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      )}
    </header>
  )
}