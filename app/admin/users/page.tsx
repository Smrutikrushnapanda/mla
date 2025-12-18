// admin-users/page.tsx
"use client"

import { UsersDataTable } from "@/components/admin-user/tables/users-table"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Users,
  UserCheck,
  UserX,
  TrendingUp,
  Download,
  Search,
} from "lucide-react"
import Link from "next/link"
import { useThemeStore } from "../../../store/useThemeStore"

/* =========================
   SUMMARY CARD CONFIG
========================= */
const USER_STATS = [
  {
    title: "Total Users",
    value: "1,250",
    icon: Users,
    iconColor: "text-blue-600",
    iconBg: "rgba(59, 130, 246, 0.1)",
    footer: (theme: any) => (
      <div className="flex items-center gap-1 mt-2">
        <TrendingUp className="h-4 w-4 text-green-500" />
        <span className="text-sm text-green-600 font-medium">+12.5%</span>
        <span className="text-sm" style={{ color: theme.textTertiary }}>
          from last month
        </span>
      </div>
    ),
  },
  {
    title: "Active Users",
    value: "1,120",
    icon: UserCheck,
    iconColor: "text-green-600",
    iconBg: "rgba(34, 197, 94, 0.1)",
    footer: (theme: any) => (
      <Badge 
        className="mt-2 text-green-800 hover:bg-green-100"
        style={{ backgroundColor: "rgba(34, 197, 94, 0.1)" }}
      >
        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
        89.6% Active rate
      </Badge>
    ),
  },
  {
    title: "Inactive Users",
    value: "130",
    icon: UserX,
    iconColor: "text-gray-600",
    iconBg: "rgba(107, 114, 128, 0.1)",
    footer: (theme: any) => (
      <p className="text-sm mt-2" style={{ color: theme.textTertiary }}>
        10.4% of total users
      </p>
    ),
  },
  {
    title: "Avg. Sessions",
    value: "4.2",
    icon: TrendingUp,
    iconColor: "text-indigo-600",
    iconBg: "rgba(99, 102, 241, 0.1)",
    footer: (theme: any) => (
      <div 
        className="w-full rounded-full h-1.5 mt-3"
        style={{ backgroundColor: theme.backgroundTertiary }}
      >
        <div className="bg-indigo-600 h-1.5 rounded-full w-3/4"></div>
      </div>
    ),
  },
]

/* =========================
   PAGE
========================= */
export default function AdminUsersPage() {
  const { theme } = useThemeStore()

  return (
    <div 
      className="min-h-screen p-6 space-y-8"
      style={{ background: theme.backgroundGradient }}
    >
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div 
            className="p-2 rounded-lg"
            style={{ backgroundColor: "rgba(99, 102, 241, 0.1)" }}
          >
            <Users className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h1 
              className="text-3xl font-bold"
              style={{ color: theme.textPrimary }}
            >
              User Management
            </h1>
            <p 
              className="text-sm"
              style={{ color: theme.textSecondary }}
            >
              Manage all registered users
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button 
            variant="outline"
            style={{
              borderColor: theme.buttonOutline.border,
              color: theme.buttonOutline.text,
            }}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Link href="/admin/AddUser">
            <Button 
              style={{
                background: theme.buttonPrimary.bg,
                color: theme.buttonPrimary.text,
              }}
              className="hover:opacity-90 transition"
            >
              Add User
            </Button>
          </Link>
        </div>
      </div>

      {/* FILTER SECTION */}
      <Card 
        className="border shadow-lg"
        style={{ 
          background: theme.cardBackground,
          borderColor: theme.border 
        }}
      >
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative md:col-span-2">
              <Search 
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                style={{ color: theme.textTertiary }}
              />
              <Input
                placeholder="Search by name or email"
                className="pl-10"
                style={{
                  backgroundColor: theme.input.bg,
                  borderColor: theme.input.border,
                  color: theme.input.text,
                }}
              />
            </div>

            {/* Role Filter */}
            <Select>
              <SelectTrigger
                style={{
                  backgroundColor: theme.input.bg,
                  borderColor: theme.input.border,
                  color: theme.input.text,
                }}
              >
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select>
              <SelectTrigger
                style={{
                  backgroundColor: theme.input.bg,
                  borderColor: theme.input.border,
                  color: theme.input.text,
                }}
              >
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* SUMMARY CARDS */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {USER_STATS.map((item, index) => {
          const Icon = item.icon
          return (
            <Card
              key={index}
              className="border shadow-lg hover:shadow-xl transition-shadow  py-0"
              style={{ 
                background: theme.cardBackground,
                borderColor: theme.border 
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p 
                      className="text-sm"
                      style={{ color: theme.textSecondary }}
                    >
                      {item.title}
                    </p>
                    <p 
                      className="text-3xl font-bold mt-2"
                      style={{ color: theme.textPrimary }}
                    >
                      {item.value}
                    </p>
                    {item.footer(theme)}
                  </div>

                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: item.iconBg }}
                  >
                    <Icon className={`h-6 w-6 ${item.iconColor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* TABLE */}
      <UsersDataTable />

      {/* FOOTER */}
      <div 
        className="flex justify-between text-sm pt-4 border-t"
        style={{ 
          color: theme.textSecondary,
          borderColor: theme.border 
        }}
      >
        <span>
          Showing <b style={{ color: theme.textPrimary }}>1-20</b> of{" "}
          <b style={{ color: theme.textPrimary }}>1,250</b> users
        </span>

        <div className="flex gap-4">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Active
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            Inactive
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
            Admin
          </span>
        </div>
      </div>
    </div>
  )
}