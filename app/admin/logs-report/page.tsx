"use client"

import { LogsReportTable } from "@/components/admin-dashboard/logs-report/table/logs-report-table"
import { Button } from "@/components/ui/button"
import { Download, BarChart3 } from "lucide-react"
import { useThemeStore } from "@/store/useThemeStore"

/* =========================
   PAGE
========================= */
export default function LogsReportPage() {
  const { theme } = useThemeStore()

  return (
    <div 
      className="min-h-screen p-6 space-y-6"
      style={{ background: theme.backgroundGradient }}
    >
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div 
            className="p-2 rounded-lg"
            style={{ backgroundColor: "rgba(99, 102, 241, 0.1)" }}
          >
            <BarChart3 className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h1 
              className="text-3xl font-bold"
              style={{ color: theme.textPrimary }}
            >
              System Logs
            </h1>
            <p 
              className="text-sm"
              style={{ color: theme.textSecondary }}
            >
              Monitor system activities and user actions
            </p>
          </div>
        </div>

        <Button 
          variant="outline"
          style={{
            borderColor: theme.buttonOutline.border,
            color: theme.buttonOutline.text,
          }}
        >
          <Download className="h-4 w-4 mr-2" />
          Export Logs
        </Button>
      </div>

      {/* TABLE WITH INTEGRATED FILTERS */}
      <LogsReportTable />
    </div>
  )
}