// app/(protected)/mla/manage-category/poll-category/page.tsx
"use client"

import { PollCategoryTable } from "@/components/mla-dashboard/poll-category/table/poll-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { useThemeStore } from "@/store/useThemeStore"

export default function PollCategoryPage() {
  const { theme } = useThemeStore()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 
            className="text-3xl font-bold"
            style={{ color: theme.textPrimary }}
          >
            Poll Category Management
          </h1>
          <p 
            className="mt-1"
            style={{ color: theme.textSecondary }}
          >
            Manage poll categories for citizen engagement in Korei Constituency
          </p>
        </div>
        
        <Link href="/mla/Add-poll-category">
          <Button
            className="flex items-center gap-2"
            style={{
              background: theme.buttonPrimary.bg,
              color: theme.buttonPrimary.text,
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Poll Category
          </Button>
        </Link>
      </div>

      <PollCategoryTable />
    </div>
  )
}