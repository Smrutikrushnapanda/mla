// app/(protected)/mla/user-management/page.tsx
"use client"

import { UsersTable } from "@/components/mla-dashboard/user-manage/table/users-table"
import { Button } from "@/components/ui/button"
import {ArrowRight} from "lucide-react"
import Link from "next/link"
import { useThemeStore } from "@/store/useThemeStore"

export default function UserManagementPage() {
  const { theme } = useThemeStore()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 
            className="text-3xl font-bold"
            style={{ color: theme.textPrimary }}
          >
            User Management
          </h1>
          <p 
            className="mt-1"
            style={{ color: theme.textSecondary }}
          >
            Manage citizens and staff members in Korei Constituency
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Link href="/mla/AddStaff">
            <Button 
                        className="flex items-center gap-2"
                        style={{
                          background: theme.buttonPrimary.bg,
                          color: theme.buttonPrimary.text,
                        }}
                      >
              <ArrowRight className="mr-2 h-4 w-4" />
              Add Staff
            </Button>
          </Link>
        </div>
      </div>

      <UsersTable />
    </div>
  )
}