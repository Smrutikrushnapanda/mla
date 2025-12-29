// app/(protected)/mla/manage-category/my-voice-category/page.tsx
"use client"

import { MyVoiceCategoryTable } from "@/components/mla-dashboard/myvoice-category/table/myvoice-table"
import { Button } from "@/components/ui/button"
import { ArrowRight, Plus } from "lucide-react"
import Link from "next/link"
import { useThemeStore } from "@/store/useThemeStore"

export default function MyVoiceCategoryPage() {
  const { theme } = useThemeStore()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 
            className="text-3xl font-bold"
            style={{ color: theme.textPrimary }}
          >
            My Voice Category Management
          </h1>
          <p 
            className="mt-1"
            style={{ color: theme.textSecondary }}
          >
            Manage categories for citizen questions and public voice submissions
          </p>
        </div>
        
        <Link href="/mla/Addmyvoice">
          <Button
            className="flex items-center gap-2"
            style={{
              background: theme.buttonPrimary.bg,
              color: theme.buttonPrimary.text,
            }}
          >
            <ArrowRight className=" h-4 w-4" />
            Add
          </Button>
        </Link>
      </div>

      <MyVoiceCategoryTable />
    </div>
  )
}