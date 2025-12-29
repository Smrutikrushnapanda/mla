"use client"

import { ActivityAreaChart } from "@/components/admin-dashboard/charts/activity-area-chart"
import { GrievancesBarChart } from "@/components/admin-dashboard/charts/grievances-bar-chart"
import { ManageProjectsTable } from "@/components/user-dashboard/Grievance/Tables/manage-projects-table"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Users, FileText, UserCheck, TrendingUp, Activity, Clock, Check, CircleCheck } from "lucide-react"
import { useThemeStore } from "@/store/useThemeStore"

export default function CitizenDashboardPage() {
  const { theme } = useThemeStore()

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card
          className="shadow-lg border-l-4"
          style={{
            backgroundColor: theme.cardBackground,
            borderTop: `1px solid ${theme.cardBorder}`,
            borderRight: `1px solid ${theme.cardBorder}`,
            borderBottom: `1px solid ${theme.cardBorder}`,
            borderLeftColor: '#3b82f6',
            borderLeftWidth: '4px',
            borderLeftStyle: 'solid'
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle
              className="text-sm font-medium"
              style={{ color: theme.textSecondary }}
            >
              Total Grievance
            </CardTitle>
            <Users className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div
              className="text-3xl font-bold"
              style={{ color: theme.textPrimary }}
            >
              1,250
            </div>
            <p
              className="text-xs mt-1"
              style={{ color: theme.textTertiary }}
            >
              <span className="text-green-600 font-medium">+10%</span> this month
            </p>
          </CardContent>
        </Card>

        <Card
          className="shadow-lg border-l-4"
          style={{
            backgroundColor: theme.cardBackground,
            borderTop: `1px solid ${theme.cardBorder}`,
            borderRight: `1px solid ${theme.cardBorder}`,
            borderBottom: `1px solid ${theme.cardBorder}`,
            borderLeftColor: '#a855f7',
            borderLeftWidth: '4px',
            borderLeftStyle: 'solid'
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle
              className="text-sm font-medium"
              style={{ color: theme.textSecondary }}
            >
              Pending Grievances
            </CardTitle>
            <FileText className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div
              className="text-3xl font-bold"
              style={{ color: theme.textPrimary }}
            >
              150
            </div>
            <p
              className="text-xs mt-1"
              style={{ color: theme.textTertiary }}
            >
              <span className="text-red-600 font-medium">-5%</span> pending this month
            </p>
          </CardContent>
        </Card>
        <Card
          className="shadow-lg border-l-4"
          style={{
            backgroundColor: theme.cardBackground,
            borderTop: `1px solid ${theme.cardBorder}`,
            borderRight: `1px solid ${theme.cardBorder}`,
            borderBottom: `1px solid ${theme.cardBorder}`,
            borderLeftColor: '#22c55e',
            borderLeftWidth: '4px',
            borderLeftStyle: 'solid'
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle
              className="text-sm font-medium"
              style={{ color: theme.textSecondary }}
            >
              Resolved Grievances
            </CardTitle>
            <CircleCheck className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div
              className="text-3xl font-bold"
              style={{ color: theme.textPrimary }}
            >
              500
            </div>
            <p
              className="text-xs mt-1"
              style={{ color: theme.textTertiary }}
            >
              <span className="text-green-600 font-medium">+30%</span> resolved this month
            </p>
          </CardContent>
        </Card>


      </div>


      <div className="grid gap-6 lg:grid-cols-2">
        <GrievancesBarChart />
        <ActivityAreaChart />
      </div>

      <div>
        <ManageProjectsTable tableName="Grievances" />
      </div>
    </div>
  )
}