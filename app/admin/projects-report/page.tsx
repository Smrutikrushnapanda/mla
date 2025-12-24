"use client"

import { ProjectReportTable } from "@/components/admin-dashboard/projects-report/table/project-report-table"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  FolderKanban,
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  BarChart3,
} from "lucide-react"
import { useThemeStore } from "@/store/useThemeStore"

/* =========================
   SUMMARY CARDS CONFIG
========================= */
const REPORT_STATS = [
  {
    title: "Total Projects",
    value: "48",
    change: "+6 this month",
    icon: FolderKanban,
    iconColor: "text-blue-600",
    iconBg: "rgba(59, 130, 246, 0.1)",
  },
  {
    title: "Completed",
    value: "32",
    change: "66.7% completion rate",
    icon: CheckCircle2,
    iconColor: "text-green-600",
    iconBg: "rgba(34, 197, 94, 0.1)",
  },
  {
    title: "In Progress",
    value: "12",
    change: "25% of total",
    icon: Clock,
    iconColor: "text-orange-600",
    iconBg: "rgba(249, 115, 22, 0.1)",
  },
  {
    title: "Delayed",
    value: "4",
    change: "Needs attention",
    icon: AlertCircle,
    iconColor: "text-red-600",
    iconBg: "rgba(239, 68, 68, 0.1)",
  },
]

/* =========================
   PAGE
========================= */
export default function ProjectsReportPage() {
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
              Project Reports
            </h1>
            <p 
              className="text-sm"
              style={{ color: theme.textSecondary }}
            >
              Track and analyze constituency development projects
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
          Export Report
        </Button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {REPORT_STATS.map((stat, index) => {
          const Icon = stat.icon
          
          return (
            <Card
              key={index}
              className="border shadow-lg hover:shadow-xl transition-shadow p-0"
              style={{ 
                background: theme.cardBackground,
                borderColor: theme.border 
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p 
                      className="text-sm font-medium mb-2"
                      style={{ color: theme.textSecondary }}
                    >
                      {stat.title}
                    </p>
                    <p 
                      className="text-3xl font-bold"
                      style={{ color: theme.textPrimary }}
                    >
                      {stat.value}
                    </p>
                    <p 
                      className="text-xs mt-3"
                      style={{ color: theme.textTertiary }}
                    >
                      {stat.change}
                    </p>
                  </div>

                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: stat.iconBg }}
                  >
                    <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* TABLE WITH INTEGRATED FILTERS */}
      <ProjectReportTable />
    </div>
  )
}