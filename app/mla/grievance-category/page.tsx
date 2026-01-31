// app/(protected)/mla/grievance-category/page.tsx
"use client"

import { GrievanceCategoryTable } from "@/components/mla-dashboard/grievance-category/table/grievance-table"
import { Button } from "@/components/ui/button"
import { useThemeStore } from "@/store/useThemeStore"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

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
        <Link href="/mla/Add-project-category">
          <Button
            className="flex items-center gap-2"
            style={{
              background: theme.buttonPrimary.bg,
              color: theme.buttonPrimary.text,
            }}
          >
            <ArrowRight className="mr-2 h-4 w-4" />
            Add
          </Button>
        </Link>
      </div>

      <GrievanceCategoryTable />
    </div>
  )
}