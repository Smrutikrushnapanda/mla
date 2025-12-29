// app/(protected)/mla/project-management/page.tsx
"use client"

import { ProjectsTable } from "@/components/mla-dashboard/project-management/table/project-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { useThemeStore } from "@/store/useThemeStore"

export default function ProjectManagementPage() {
  const { theme } = useThemeStore()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 
            className="text-3xl font-bold"
            style={{ color: theme.textPrimary }}
          >
            Project Management
          </h1>
          <p 
            className="mt-1"
            style={{ color: theme.textSecondary }}
          >
            Monitor and manage all development projects in Korei Constituency
          </p>
        </div>
        
        <Link href="/mla/AddProject">
          <Button
            className="flex items-center gap-2"
            style={{
              background: theme.buttonPrimary.bg,
              color: theme.buttonPrimary.text,
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Project
          </Button>
        </Link>
      </div>

      <ProjectsTable />
    </div>
  )
}