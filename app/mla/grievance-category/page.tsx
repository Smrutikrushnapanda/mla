// app/(protected)/mla/grievance-category/page.tsx
"use client"

import { GrievanceCategoryTable } from "@/components/mla-dashboard/grievance-category/table/grievance-table"
import { useThemeStore } from "@/store/useThemeStore"

export default function GrievanceCategoryPage() {
  const { theme } = useThemeStore()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 
            className="text-3xl font-bold"
            style={{ color: theme.textPrimary }}
          >
            Grievance Categories
          </h1>
          <p 
            className="mt-1"
            style={{ color: theme.textSecondary }}
          >
            View and manage grievance categories for Korei Constituency
          </p>
        </div>
      </div>

      <GrievanceCategoryTable />
    </div>
  )
}