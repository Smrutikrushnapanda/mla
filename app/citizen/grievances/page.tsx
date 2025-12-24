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
import { ManageProjectsTable } from "@/components/user-dashboard/Grievance/Tables/manage-projects-table"
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
      title: "Total Grievances",
      value: "24",
      icon: FolderKanban,
      description: "All Grievances",
      color: "bg-blue-500",
    },
    {
      title: "Pending",
      value: "12",
      icon: Clock,
      description: "Pending Grievances",
      color: "bg-orange-500",
    },
    {
      title: "Resolved",
      value: "8",
      icon: CheckCircle2,
      description: "Grievances Resolved",
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
            Manage Grievances
          </h1>
          <p 
            className="text-sm mt-1"
            style={{ color: theme.textTertiary }}
          >
            Create, track, and manage grievances.
          </p>
        </div>
        <Button
          onClick={() => router.push('/citizen/AddGrievances')}
          className="flex items-center gap-2 hover:opacity-90 transition-opacity"
          style={{
            background: theme.buttonPrimary.bg,
            color: "white",
          }}
        >
          <Plus className="h-4 w-4" />
          Add Grievance
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
   

      {/* Projects Table */}
      <ManageProjectsTable />
    </div>
  )
}