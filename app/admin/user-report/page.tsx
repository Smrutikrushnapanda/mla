"use client"

import { UserReportTable } from "@/components/admin-dashboard/user-report/table/user-report-table"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Users,
  TrendingUp,
  Activity,
  TrendingDown,
  Download,
  BarChart3,
} from "lucide-react"
import { useThemeStore } from "@/store/useThemeStore"

/* =========================
   SUMMARY CARDS CONFIG
========================= */
const REPORT_STATS = [
  {
    title: "Total Registered",
    value: "1,250",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    iconColor: "text-blue-600",
    iconBg: "rgba(59, 130, 246, 0.1)",
  },
  {
    title: "Active Users",
    value: "1,120",
    change: "+8.3%",
    trend: "up",
    icon: Activity,
    iconColor: "text-green-600",
    iconBg: "rgba(34, 197, 94, 0.1)",
  },
  {
    title: "New This Month",
    value: "142",
    change: "+5.2%",
    trend: "up",
    icon: TrendingUp,
    iconColor: "text-purple-600",
    iconBg: "rgba(147, 51, 234, 0.1)",
  },
  {
    title: "Churn Rate",
    value: "3.2%",
    change: "-1.1%",
    trend: "down",
    icon: TrendingDown,
    iconColor: "text-orange-600",
    iconBg: "rgba(249, 115, 22, 0.1)",
  },
]

/* =========================
   PAGE
========================= */
export default function UserReportPage() {
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
              User Reports
            </h1>
            <p 
              className="text-sm"
              style={{ color: theme.textSecondary }}
            >
              Analytics and insights on user behavior
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

      {/* SUMMARY CARDS - DATA ONLY */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {REPORT_STATS.map((stat, index) => {
          const Icon = stat.icon
          const isPositive = stat.trend === "up"
          const TrendIcon = isPositive ? TrendingUp : TrendingDown
          
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
                    <div 
                      className={`inline-flex items-center gap-1 mt-3 px-2 py-1 rounded-full text-xs font-medium ${
                        isPositive ? "text-green-700" : "text-orange-700"
                      }`}
                      style={{ 
                        backgroundColor: isPositive 
                          ? "rgba(34, 197, 94, 0.1)" 
                          : "rgba(249, 115, 22, 0.1)" 
                      }}
                    >
                      <TrendIcon className="h-3 w-3" />
                      {stat.change}
                    </div>
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
      <UserReportTable />
    </div>
  )
}