// components/mla-dashboard/sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
} from "@/components/ui/sidebar";

import {
  Home,
  Users,
  FileText,
  Settings,
  ChevronDown,
  MessageSquare,
  Calendar,
  BarChart3,
  ClipboardList,
  UserCheck,
  Building2,
  FolderTree,
  DollarSign,
  Image,
  CheckCircle2,
  Activity,
  ArrowDownToLine,
  ArrowUpFromLine,
  Plus,
  HelpCircle,
  Archive,
  CalendarDays,
  Clock,
  CalendarClock,
  CalendarCheck,
  Share2,
  Twitter,
  Facebook,
  Instagram,
  TrendingUp,
  Flag,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useThemeStore } from "@/store/useThemeStore";
import { useSidebar } from "@/components/ui/sidebar";

interface SubMenuItem {
  id: string;
  label: string;
  href: string;
  icon?: any;
  badge?: string;
}

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  href?: string;
  badge?: string;
  submenu?: SubMenuItem[];
}


export function MLASidebar() {
  const pathname = usePathname();
  const { theme, mode } = useThemeStore();
  const { state } = useSidebar();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const menuItems: MenuItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      href: "/mla/dashboard",
    },
        {
      id: "project",
      label: "Project",
      icon: Building2,
      submenu: [
        {
          id: "manage-projects",
          label: "Manage Projects",
          href: "/mla/project-management",
          icon: ClipboardList,
        },
        {
          id: "budget-utilization",
          label: "Budget Utilization",
          href: "/mla/budget-utilization",
          icon: DollarSign,
        },
      ],
    },
       
        {
      id: "grievance",
      label: "Grievance",
      icon: FileText,
      submenu: [
        {
          id: "all-grievances",
          label: "All Grievances",
          href: "/mla/grievance-management",
          icon: ClipboardList,
        }
      ],
    },
     {
      id: "manage-category",
      label: "Manage Category",
      icon: FolderTree,
      submenu: [
        {
          id: "project-category",
          label: "Project Category",
          href: "/mla/project-category",
          icon: Building2,
        },
        {
          id: "grievance-category",
          label: "Grievance Category",
          href: "/mla/grievance-category",
          icon: FileText,
        },
        {
          id: "poll-category",
          label: "Poll Category",
          href: "/mla/poll-category",
          icon: BarChart3,
        },
        // {
        //   id: "myvoice-category",
        //   label: "My Voice Category",
        //   href: "/mla/myvoice-category",
        //   icon: MessageSquare,
        // },
      ],
    },
    {
      id: "user-management",
      label: "User Management",
      icon: Users,
      submenu: [
        {
          id: "manage-users",
          label: "Manage Users",
          href: "/mla/user-manage",
          icon: UserCheck,
        },
        {
          id: "archived-users",
          label: "Archived Users",
          href: "/mla/archive-user",
          icon: Archive,
        },
      ],
    },
    
    {
      id: "manage-polls",
      label: "Manage Polls",
      icon: BarChart3,
      submenu: [
        {
          id: "polls",
          label: "Manage Polls",
          href: "/mla/manage-polls",
          icon: Plus,
        },
        // {
        //   id: "publish-action",
        //   label: "Publish Action",
        //   href: "/mla/publish-action",
        //   icon: CheckCircle2,
        // },
      ],
    },
    // {
    //   id: "public-voice",
    //   label: "Public Voice",
    //   icon: MessageSquare,
    //   submenu: [
    //     {
    //       id: "all-questions",
    //       label: "All Questions",
    //       href: "/mla/all-questions",
    //       icon: HelpCircle,
    //     },
    //     {
    //       id: "archived-sessions",
    //       label: "Archived Sessions",
    //       href: "/mla/archived-sessions",
    //       icon: Archive,
    //     },
    //   ],
    // },
    {
      id: "events-meetings",
      label: "Events & Meetings",
      icon: Calendar,
      submenu: [
        {
          id: "manage-events",
          label: "Manage Events",
          href: "/mla/manage-event",
          icon: CalendarDays,
        },
        {
          id: "attendance-matrix",
          label: "Attendance Matrix",
          href: "/mla/attendance",
          icon: UserCheck,
        },
        {
          id: "post-event-media",
          label: "Post-Event Media",
          href: "/mla/media",
          icon: Image,
        },
      ],
    },
    // {
    //   id: "appointment-booking",
    //   label: "Appointment Booking",
    //   icon: CalendarClock,
    //   submenu: [
    //     {
    //       id: "slot-management",
    //       label: "Slot Management",
    //       href: "/mla/slots",
    //       icon: Clock,
    //     },
    //     {
    //       id: "manage-appointments",
    //       label: "Manage Appointments",
    //       href: "/mla/manage",
    //       icon: CalendarCheck,
    //     },
    //   ],
    // },
    {
      id: "social-media",
      label: "Social Media",
      icon: Share2,
      submenu: [
        {
          id: "twitter",
          label: "Twitter",
          href: "/mla/twitter",
          icon: Twitter,
        },
        {
          id: "facebook",
          label: "Facebook",
          href: "/mla/facebook",
          icon: Facebook,
        },
        {
          id: "instagram",
          label: "Instagram",
          href: "/mla/instagram",
          icon: Instagram,
        },
        {
          id: "engagement-tracking",
          label: "Engagement Tracking",
          href: "/mla/engagement",
          icon: TrendingUp,
        },
      ],
    },
  ];

  const toggleMenu = (menuId: string) => {
    setOpenMenu((prev) => (prev === menuId ? null : menuId));
  };

  const isSubmenuActive = (submenu: SubMenuItem[]) => {
    return submenu?.some((item) => pathname === item.href);
  };

  const isCollapsed = state === "collapsed";

  return (
    <Sidebar
      collapsible="icon"
      className="border-r"
      style={{
        backgroundColor: theme.backgroundSecondary,
        borderColor: theme.border,
      }}
    >
      {/* Global Styles */}
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

        /* Tooltip styling */
        [data-sidebar] [role="tooltip"] {
          background-color: ${mode === "dark" ? "#1f2937" : "#ffffff"} !important;
          color: ${mode === "dark" ? "#ffffff" : "#000000"} !important;
          border: 1px solid ${mode === "dark" ? "#374151" : "#e5e7eb"} !important;
        }

        /* Scrollbar */
        [data-sidebar] ::-webkit-scrollbar {
          width: 4px;
        }
        [data-sidebar] ::-webkit-scrollbar-track {
          background: transparent;
        }
        [data-sidebar] ::-webkit-scrollbar-thumb {
          background: ${mode === "dark"
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(0, 0, 0, 0.1)"};
          border-radius: 2px;
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
            style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
          >
            <Flag className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold text-white">MLA Connect</span>
            <span
              className="text-xs"
              style={{ color: "rgba(255, 255, 255, 0.8)" }}
            >
              MLA Panel
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
          style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
        >
          <Flag className="h-5 w-5 text-white" />
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
              const isActive = pathname === item.href;
              const hasSubmenu = item.submenu && item.submenu.length > 0;
              const submenuActive = hasSubmenu && isSubmenuActive(item.submenu);
              const isOpen = hasSubmenu && openMenu === item.id;
              const isHovered = hoveredItem === item.id;
              const isLastItem = index === menuItems.length - 1;

              // Simple link (no submenu)
              if (!hasSubmenu) {
                return (
                  <div key={item.id}>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.label}
                        className="transition-all duration-200 mb-1 mx-2"
                      >
                        <Link
                          href={item.href!}
                          className={`flex items-center w-full rounded-lg relative overflow-hidden ${
                            isCollapsed
                              ? "justify-center px-2 py-2.5"
                              : "gap-3 px-3 py-2.5"
                          }`}
                          onMouseEnter={() => setHoveredItem(item.id)}
                          onMouseLeave={() => setHoveredItem(null)}
                          style={{
                            backgroundColor: isActive
                              ? theme.highlight
                              : isHovered
                              ? theme.sidebarHover
                              : "transparent",
                            color: isActive ? "#ffffff" : theme.textPrimary,
                          }}
                        >
                          {isActive && (
                            <div
                              className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full"
                              style={{ backgroundColor: "#ffffff" }}
                            />
                          )}
                          <item.icon
                            size={isCollapsed ? 18 : 20}
                            className="flex-shrink-0"
                            color={isActive ? "#ffffff" : theme.textSecondary}
                          />
                          {!isCollapsed && (
                            <>
                              <span className="flex-1 font-semibold">
                                {item.label}
                              </span>
                              {item.badge && (
                                <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-semibold text-white">
                                  {item.badge}
                                </span>
                              )}
                            </>
                          )}
                          {isCollapsed && item.badge && (
                            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    {!isLastItem && (
                      <div
                        className="mx-4 my-2 h-px"
                        style={{ backgroundColor: theme.border, opacity: 0.5 }}
                      />
                    )}
                  </div>
                );
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
                          href={item.submenu?.[0]?.href || "#"}
                          className="flex items-center justify-center w-full px-2 py-2.5 relative rounded-lg overflow-hidden"
                          onMouseEnter={() => setHoveredItem(item.id)}
                          onMouseLeave={() => setHoveredItem(null)}
                          style={{
                            backgroundColor: submenuActive
                              ? theme.highlight
                              : isHovered
                              ? theme.sidebarHover
                              : "transparent",
                            color: submenuActive
                              ? "#ffffff"
                              : theme.textPrimary,
                          }}
                        >
                          <item.icon
                            size={18}
                            className="flex-shrink-0"
                            color={
                              submenuActive ? "#ffffff" : theme.textSecondary
                            }
                          />
                          {item.badge && (
                            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    {!isLastItem && (
                      <div
                        className="mx-4 my-2 h-px"
                        style={{ backgroundColor: theme.border, opacity: 0.5 }}
                      />
                    )}
                  </div>
                );
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
                                : "transparent",
                              color: submenuActive
                                ? "#ffffff"
                                : theme.textPrimary,
                            }}
                          >
                            {submenuActive && (
                              <div
                                className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full"
                                style={{ backgroundColor: "#ffffff" }}
                              />
                            )}
                            <item.icon
                              size={20}
                              className="flex-shrink-0"
                              color={
                                submenuActive ? "#ffffff" : theme.textSecondary
                              }
                            />
                            <span className="flex-1 font-semibold">
                              {item.label}
                            </span>
                            {item.badge && (
                              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-semibold text-white">
                                {item.badge}
                              </span>
                            )}
                            <ChevronDown
                              size={16}
                              className="flex-shrink-0 transition-transform duration-200"
                              color={
                                submenuActive ? "#ffffff" : theme.textSecondary
                              }
                              style={{
                                transform: isOpen
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                              }}
                            />
                          </div>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub className="ml-4 mr-2 mt-1 mb-2">
                          {item.submenu?.map((subItem) => {
                            const isSubActive = pathname === subItem.href;
                            const isSubHovered = hoveredItem === subItem.id;
                            const SubIcon = subItem.icon;

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
                                    onMouseEnter={() =>
                                      setHoveredItem(subItem.id)
                                    }
                                    onMouseLeave={() => setHoveredItem(null)}
                                    style={{
                                      backgroundColor: isSubActive
                                        ? theme.highlightSecondary
                                        : isSubHovered
                                        ? theme.sidebarSubmenuHover
                                        : "transparent",
                                      color: isSubActive
                                        ? "#ffffff"
                                        : theme.textSecondary,
                                    }}
                                  >
                                    {isSubActive && (
                                      <div
                                        className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full"
                                        style={{
                                          backgroundColor: "#ffffff",
                                          opacity: 0.8,
                                        }}
                                      />
                                    )}
                                    {SubIcon && (
                                      <SubIcon
                                        size={16}
                                        className="flex-shrink-0"
                                        color={
                                          isSubActive
                                            ? "#ffffff"
                                            : theme.textTertiary
                                        }
                                      />
                                    )}
                                    <span className="font-medium text-sm flex-1">
                                      {subItem.label}
                                    </span>
                                    {subItem.badge && (
                                      <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-semibold text-white">
                                        {subItem.badge}
                                      </span>
                                    )}
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>

                  {!isLastItem && (
                    <div
                      className="mx-4 my-2 h-px"
                      style={{ backgroundColor: theme.border, opacity: 0.5 }}
                    />
                  )}
                </div>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}