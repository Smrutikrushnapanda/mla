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
import { Users, FileText, UserCheck, TrendingUp, Activity, Clock } from "lucide-react"
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
              Total Users
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
              <span className="text-green-600 font-medium">+12%</span> from last month
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
              Total Grievances
            </CardTitle>
            <FileText className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div 
              className="text-3xl font-bold"
              style={{ color: theme.textPrimary }}
            >
              320
            </div>
            <p 
              className="text-xs mt-1"
              style={{ color: theme.textTertiary }}
            >
              <span className="text-orange-600 font-medium">45</span> pending resolution
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
            borderLeftColor: '#991b1b',
            borderLeftWidth: '4px',
            borderLeftStyle: 'solid'
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle 
              className="text-sm font-medium"
              style={{ color: theme.textSecondary }}
            >
              Active Staff
            </CardTitle>
            <UserCheck className="h-5 w-5 text-red-800" />
          </CardHeader>
          <CardContent>
            <div 
              className="text-3xl font-bold"
              style={{ color: theme.textPrimary }}
            >
              48
            </div>
            <p 
              className="text-xs mt-1"
              style={{ color: theme.textTertiary }}
            >
              <span className="text-red-800 font-medium">38</span> online now
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats Row */}
      <div className="grid gap-4 md:grid-cols-3">
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
              Resolution Rate
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div 
              className="text-2xl font-bold"
              style={{ color: theme.textPrimary }}
            >
              85.3%
            </div>
            <div 
              className="mt-2 h-2 w-full rounded-full overflow-hidden"
              style={{ backgroundColor: theme.backgroundTertiary }}
            >
              <div className="h-full bg-green-500 rounded-full" style={{ width: '85.3%' }} />
            </div>
          </CardContent>
        </Card>

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
              Avg Response Time
            </CardTitle>
            <Clock className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div 
              className="text-2xl font-bold"
              style={{ color: theme.textPrimary }}
            >
              2.4 hrs
            </div>
            <p 
              className="text-xs mt-1"
              style={{ color: theme.textTertiary }}
            >
              <span className="text-green-600 font-medium">-0.5 hrs</span> improvement
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
            borderLeftColor: '#6b21a8',
            borderLeftWidth: '4px',
            borderLeftStyle: 'solid'
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle 
              className="text-sm font-medium"
              style={{ color: theme.textSecondary }}
            >
              System Status
            </CardTitle>
            <Activity className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">Operational</div>
            <p 
              className="text-xs mt-1"
              style={{ color: theme.textTertiary }}
            >
              All systems running smoothly
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <GrievancesBarChart />
        <ActivityAreaChart />
      </div>

      <div>
        <ManageProjectsTable />
      </div>
    </div>
  )
}