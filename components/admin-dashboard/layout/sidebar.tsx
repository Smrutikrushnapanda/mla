// components/admin-dashboard/sidebar.tsx
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
  Shield,
  Map,
  MapPin,
  Building,
  FolderTree,
  Target,
  Briefcase,
  DollarSign,
  GitBranch,
  Database,
  Bell,
  Lock,
  FileBarChart,
  UserCheck,
  Activity,
  Layers,
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
  submenu?: {
    id: string;
    label: string;
    href: string;
    icon?: any;
  }[];
}

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  href?: string;
  badge?: string;
  submenu?: SubMenuItem[];
}

export function AppSidebar() {
  const pathname = usePathname();
  const { theme, isDarkMode } = useThemeStore();
  const { state } = useSidebar();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const menuItems: MenuItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      href: "/admin/dashboard",
    },
    {
      id: "master",
      label: "Master",
      icon: Database,
      submenu: [
        {
          id: "location-master",
          label: "Location",
          href: "/admin/districts",
          icon: Map,
          submenu: [
            {
              id: "district",
              label: "District",
              href: "/admin/districts",
              icon: MapPin,
            },
            // {
            //   id: "block",
            //   label: "Block",
            //   href: "/admin/master/location/block",
            //   icon: Layers,
            // },
            {
              id: "constituency",
              label: "Constituency",
              href: "/admin/constituency",
              icon: Building,
            },
          ],
        },
        {
          id: "role-user-master",
          label: "Role & User Master",
          href: "/admin/roles",
          icon: Users,
        },
        {
          id: "category-master",
          label: "Category Master",
          href: "/admin/project-category",
          icon: FolderTree,
        },
        {
          id: "department-master",
          label: "Department Master",
          href: "/admin/department",
          icon: Briefcase,
        },
        {
          id: "scheme-master",
          label: "Scheme Master",
          href: "/admin/scheme",
          icon: Target,
        },
      ],
    },
    {
      id: "workflow",
      label: "Workflow",
      icon: GitBranch,
      submenu: [
        {
          id: "grievance-workflow",
          label: "Grievance Workflow",
          href: "/admin/grievance",
          icon: FileText,
        },
        {
          id: "project-workflow",
          label: "Project Workflow",
          href: "/admin/project",
          icon: Briefcase,
        },
        {
          id: "approval-workflow",
          label: "Approval Workflow",
          href: "/admin/approval",
          icon: Shield,
        },
      ],
    },
    {
      id: "reports",
      label: "Reports",
      icon: FileBarChart,
      submenu: [
        {
          id: "user-reports",
          label: "User Reports",
          href: "/admin/user-report",
          icon: UserCheck,
        },
        {
          id: "project-reports",
          label: "Project Reports",
          href: "/admin/projects-report",
          icon: Briefcase,
        },
        {
          id: "grievance-reports",
          label: "Grievance Reports",
          href: "/admin/grievances-report",
          icon: FileText,
        },
        {
          id: "budget-reports",
          label: "Budget Reports",
          href: "/admin/budget-report",
          icon: DollarSign,
        },
        {
          id: "log-reports",
          label: "Log Reports",
          href: "/admin/logs-report",
          icon: Activity,
        },
      ],
    },

    {
      id: "configuration",
      label: "Configuration",
      icon: Settings,
      submenu: [
        {
          id: "app-settings",
          label: "App Settings",
          href: "/admin/settings",
          icon: Settings,
        },
        {
          id: "notification",
          label: "Notification",
          href: "/admin/configuration/notification",
          icon: Bell,
        },
        {
          id: "security",
          label: "Security",
          href: "/admin/configuration/security",
          icon: Lock,
        },
      ],
    },
  ];

  const toggleMenu = (menuId: string) => {
    setOpenMenu((prev) => (prev === menuId ? null : menuId));
    setOpenSubMenu(null);
  };

  const toggleSubMenu = (subMenuId: string) => {
    setOpenSubMenu((prev) => (prev === subMenuId ? null : subMenuId));
  };

  const isSubmenuActive = (submenu: SubMenuItem[]) => {
    return submenu?.some((item) => {
      if (pathname === item.href) return true;
      if (item.submenu) {
        return item.submenu.some((subItem) => pathname === subItem.href);
      }
      return false;
    });
  };

  const isSubMenuItemActive = (item: SubMenuItem) => {
    if (pathname === item.href) return true;
    if (item.submenu) {
      return item.submenu.some((subItem) => pathname === subItem.href);
    }
    return false;
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
      {/* Simple Global Styles */}
      <style jsx global>{`
        [data-sidebar] [data-sidebar-menu-button] {
          background: transparent !important;
        }
        [data-sidebar] [data-sidebar-menu-button]:hover {
          background: transparent !important;
        }
        /* Dashboard specific padding */
        [data-menu-id="dashboard"] {
          padding-left: 20px !important;
        }
          

        [data-sidebar]:not([data-state="collapsed"])
          [data-menu-id="dashboard"]
          svg {
          width: 20px !important;
          height: 20px !important;
        }
        [data-sidebar][data-state="collapsed"] [data-menu-id="dashboard"] svg {
          width: 10px !important;
          height: 10px !important;
        }
        [data-sidebar] [data-sidebar-menu-sub-button] {
          background: transparent !important;
        }
        [data-sidebar] [data-sidebar-menu-sub-button]:hover {
          background: transparent !important;
        }

        /* Tooltip styling */
        [data-sidebar] [role="tooltip"] {
          background-color: ${isDarkMode ? "#1f2937" : "#ffffff"} !important;
          color: ${isDarkMode ? "#ffffff" : "#000000"} !important;
          border: 1px solid ${isDarkMode ? "#374151" : "#e5e7eb"} !important;
        }

        /* Scrollbar */
        [data-sidebar] ::-webkit-scrollbar {
          width: 4px;
        }
        [data-sidebar] ::-webkit-scrollbar-track {
          background: transparent;
        }
        [data-sidebar] ::-webkit-scrollbar-thumb {
          background: ${isDarkMode
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
            <span className="text-lg font-bold text-white">SA</span>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold text-white">MLA Connect</span>
            <span
              className="text-xs"
              style={{ color: "rgba(255, 255, 255, 0.8)" }}
            >
              Super Admin Panel
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
                          data-menu-id="dashboard"
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
                            const isSubActive = isSubMenuItemActive(subItem);
                            const isSubHovered = hoveredItem === subItem.id;
                            const SubIcon = subItem.icon;
                            const hasNestedSubmenu =
                              subItem.submenu && subItem.submenu.length > 0;
                            const isSubOpen =
                              hasNestedSubmenu && openSubMenu === subItem.id;

                            if (hasNestedSubmenu) {
                              return (
                                <Collapsible
                                  key={subItem.id}
                                  open={isSubOpen}
                                  onOpenChange={() => toggleSubMenu(subItem.id)}
                                >
                                  <SidebarMenuSubItem>
                                    <CollapsibleTrigger asChild>
                                      <SidebarMenuSubButton
                                        isActive={isSubActive}
                                        className="transition-all duration-200 mb-1"
                                      >
                                        <div
                                          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg relative overflow-hidden cursor-pointer"
                                          onMouseEnter={() =>
                                            setHoveredItem(subItem.id)
                                          }
                                          onMouseLeave={() =>
                                            setHoveredItem(null)
                                          }
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
                                          <span className="flex-1 font-medium text-sm">
                                            {subItem.label}
                                          </span>
                                          <ChevronDown
                                            size={14}
                                            className="flex-shrink-0 transition-transform duration-200"
                                            color={
                                              isSubActive
                                                ? "#ffffff"
                                                : theme.textTertiary
                                            }
                                            style={{
                                              transform: isSubOpen
                                                ? "rotate(180deg)"
                                                : "rotate(0deg)",
                                            }}
                                          />
                                        </div>
                                      </SidebarMenuSubButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                      <SidebarMenuSub className="ml-4 mt-1 mb-1">
                                        {subItem.submenu?.map((nestedItem) => {
                                          const isNestedActive =
                                            pathname === nestedItem.href;
                                          const isNestedHovered =
                                            hoveredItem === nestedItem.id;
                                          const NestedIcon = nestedItem.icon;

                                          return (
                                            <SidebarMenuSubItem
                                              key={nestedItem.id}
                                            >
                                              <SidebarMenuSubButton
                                                asChild
                                                isActive={isNestedActive}
                                                className="transition-all duration-200 mb-1"
                                              >
                                                <Link
                                                  href={nestedItem.href}
                                                  className="flex items-center gap-2 w-full px-3 py-1.5 rounded-lg relative overflow-hidden"
                                                  onMouseEnter={() =>
                                                    setHoveredItem(
                                                      nestedItem.id
                                                    )
                                                  }
                                                  onMouseLeave={() =>
                                                    setHoveredItem(null)
                                                  }
                                                  style={{
                                                    backgroundColor:
                                                      isNestedActive
                                                        ? theme.highlightSecondary
                                                        : isNestedHovered
                                                        ? theme.sidebarSubmenuHover
                                                        : "transparent",
                                                    color: isNestedActive
                                                      ? "#ffffff"
                                                      : theme.textTertiary,
                                                  }}
                                                >
                                                  {isNestedActive && (
                                                    <div
                                                      className="absolute left-0 top-0 bottom-0 w-0.5 rounded-r-full"
                                                      style={{
                                                        backgroundColor:
                                                          "#ffffff",
                                                        opacity: 0.6,
                                                      }}
                                                    />
                                                  )}
                                                  {NestedIcon && (
                                                    <NestedIcon
                                                      size={14}
                                                      className="flex-shrink-0"
                                                      color={
                                                        isNestedActive
                                                          ? "#ffffff"
                                                          : theme.textTertiary
                                                      }
                                                    />
                                                  )}
                                                  <span className="font-medium text-xs">
                                                    {nestedItem.label}
                                                  </span>
                                                </Link>
                                              </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                          );
                                        })}
                                      </SidebarMenuSub>
                                    </CollapsibleContent>
                                  </SidebarMenuSubItem>
                                </Collapsible>
                              );
                            }

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
                                    <span className="font-medium text-sm">
                                      {subItem.label}
                                    </span>
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
