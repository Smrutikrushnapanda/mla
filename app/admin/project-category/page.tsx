// app/(roles)/admin-user/manage-projects/page.tsx
"use client"

import { useState } from "react"
import { Plus, FolderKanban, Clock, CheckCircle2, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useThemeStore } from "@/store/useThemeStore"
import { ManageProjectsTable } from "@/components/manage-projects/table/manage-projects-table"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export default function ManageProjectsPage() {
  const { theme } = useThemeStore()
  const router = useRouter()

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [areaSort, setAreaSort] = useState<string>("none")

  // Statistics
  const stats = [
    {
      title: "Total Projects",
      value: "24",
      icon: FolderKanban,
      description: "All projects",
      color: "bg-blue-500",
    },
    {
      title: "In Progress",
      value: "12",
      icon: Clock,
      description: "Active projects",
      color: "bg-orange-500",
    },
    {
      title: "Completed",
      value: "8",
      icon: CheckCircle2,
      description: "Finished projects",
      color: "bg-green-500",
    },
  ]

  return (
    <div className="h-full w-full p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 
            className="text-3xl font-bold"
            style={{ color: theme.textPrimary }}
          >
            Manage Projects
          </h1>
          <p 
            className="text-sm mt-1"
            style={{ color: theme.textTertiary }}
          >
            Create, track, and manage development projects across your constituency
          </p>
        </div>
        <Button
          onClick={() => router.push('/admin/AddProjects')}
          className="flex items-center gap-2 hover:opacity-90 transition-opacity"
          style={{
            background: theme.buttonPrimary.bg,
            color: "white",
          }}
        >
          <Plus className="h-4 w-4" />
          Add Project
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow"
            style={{
              backgroundColor: theme.cardBackground,
              borderColor: theme.border,
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p 
                  className="text-sm font-medium"
                  style={{ color: theme.textSecondary }}
                >
                  {stat.title}
                </p>
                <p 
                  className="text-3xl font-bold mt-2"
                  style={{ color: theme.textPrimary }}
                >
                  {stat.value}
                </p>
                <p 
                  className="text-xs mt-1"
                  style={{ color: theme.textTertiary }}
                >
                  {stat.description}
                </p>
              </div>
              <div
                className={`${stat.color} p-3 rounded-lg`}
                style={{ opacity: 0.9 }}
              >
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters Section */}
      <div 
        className="rounded-lg border p-6 shadow-sm"
        style={{
          backgroundColor: theme.cardBackground,
          borderColor: theme.border,
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5" style={{ color: theme.primary }} />
          <h2 
            className="text-lg font-semibold"
            style={{ color: theme.textPrimary }}
          >
            Filters & Sorting
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Status Filter */}
          <div className="space-y-2">
            <Label style={{ color: theme.textSecondary }}>
              Filter by Status
            </Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger
                style={{
                  borderColor: theme.border,
                  backgroundColor: theme.backgroundSecondary,
                  color: theme.textPrimary,
                }}
              >
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent
                style={{
                  backgroundColor: theme.backgroundSecondary,
                  borderColor: theme.border,
                }}
              >
                <SelectItem value="all" style={{ color: theme.textPrimary }}>
                  All Status
                </SelectItem>
                <SelectItem value="Planning" style={{ color: theme.textPrimary }}>
                  Planning
                </SelectItem>
                <SelectItem value="In Progress" style={{ color: theme.textPrimary }}>
                  In Progress
                </SelectItem>
                <SelectItem value="Completed" style={{ color: theme.textPrimary }}>
                  Completed
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <Label style={{ color: theme.textSecondary }}>
              Filter by Category
            </Label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger
                style={{
                  borderColor: theme.border,
                  backgroundColor: theme.backgroundSecondary,
                  color: theme.textPrimary,
                }}
              >
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent
                style={{
                  backgroundColor: theme.backgroundSecondary,
                  borderColor: theme.border,
                }}
              >
                <SelectItem value="all" style={{ color: theme.textPrimary }}>
                  All Categories
                </SelectItem>
                <SelectItem value="Infrastructure" style={{ color: theme.textPrimary }}>
                  Infrastructure
                </SelectItem>
                <SelectItem value="Education" style={{ color: theme.textPrimary }}>
                  Education
                </SelectItem>
                <SelectItem value="Healthcare" style={{ color: theme.textPrimary }}>
                  Healthcare
                </SelectItem>
                <SelectItem value="Agriculture" style={{ color: theme.textPrimary }}>
                  Agriculture
                </SelectItem>
                <SelectItem value="Water Supply" style={{ color: theme.textPrimary }}>
                  Water Supply
                </SelectItem>
                <SelectItem value="Environment" style={{ color: theme.textPrimary }}>
                  Environment
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Area Sorting */}
          <div className="space-y-2">
            <Label style={{ color: theme.textSecondary }}>
              Sort by Area
            </Label>
            <Select value={areaSort} onValueChange={setAreaSort}>
              <SelectTrigger
                style={{
                  borderColor: theme.border,
                  backgroundColor: theme.backgroundSecondary,
                  color: theme.textPrimary,
                }}
              >
                <SelectValue placeholder="No Sorting" />
              </SelectTrigger>
              <SelectContent
                style={{
                  backgroundColor: theme.backgroundSecondary,
                  borderColor: theme.border,
                }}
              >
                <SelectItem value="none" style={{ color: theme.textPrimary }}>
                  No Sorting
                </SelectItem>
                <SelectItem value="asc" style={{ color: theme.textPrimary }}>
                  Area: A → Z
                </SelectItem>
                <SelectItem value="desc" style={{ color: theme.textPrimary }}>
                  Area: Z → A
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters Display */}
        {(statusFilter !== "all" || categoryFilter !== "all" || areaSort !== "none") && (
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <span 
              className="text-sm font-medium"
              style={{ color: theme.textSecondary }}
            >
              Active Filters:
            </span>
            {statusFilter !== "all" && (
              <span 
                className="px-3 py-1 text-xs rounded-full"
                style={{
                  backgroundColor: theme.backgroundSecondary,
                  color: theme.textPrimary,
                  border: `1px solid ${theme.border}`,
                }}
              >
                Status: {statusFilter}
              </span>
            )}
            {categoryFilter !== "all" && (
              <span 
                className="px-3 py-1 text-xs rounded-full"
                style={{
                  backgroundColor: theme.backgroundSecondary,
                  color: theme.textPrimary,
                  border: `1px solid ${theme.border}`,
                }}
              >
                Category: {categoryFilter}
              </span>
            )}
            {areaSort !== "none" && (
              <span 
                className="px-3 py-1 text-xs rounded-full"
                style={{
                  backgroundColor: theme.backgroundSecondary,
                  color: theme.textPrimary,
                  border: `1px solid ${theme.border}`,
                }}
              >
                Sorted: {areaSort === "asc" ? "A → Z" : "Z → A"}
              </span>
            )}
            <button
              onClick={() => {
                setStatusFilter("all")
                setCategoryFilter("all")
                setAreaSort("none")
              }}
              className="text-xs underline hover:opacity-80"
              style={{ color: theme.textPrimary }}
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Projects Table */}
      <ManageProjectsTable 
        statusFilter={statusFilter}
        categoryFilter={categoryFilter}
        areaSort={areaSort}
      />
    </div>
  )
}