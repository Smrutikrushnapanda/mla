// app/(protected)/mla/user-management/archived/page.tsx
"use client"

import { ArchivedUsersTable } from "@/components/mla-dashboard/archived-user/table/archived-table"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useThemeStore } from "@/store/useThemeStore"

export default function ArchivedUsersPage() {
  const { theme } = useThemeStore()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/mla/user-management">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 
            className="text-3xl font-bold"
            style={{ color: theme.textPrimary }}
          >
            Archived Users
          </h1>
          <p 
            className="mt-1"
            style={{ color: theme.textSecondary }}
          >
            View and restore archived users
          </p>
        </div>
      </div>

      <ArchivedUsersTable />
    </div>
  )
}