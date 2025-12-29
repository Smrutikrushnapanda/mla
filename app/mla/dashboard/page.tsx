"use client"

import { ActivityAreaChart } from "@/components/mla-dashboard/charts/activity-area-chart"
import { GrievancesBarChart } from "@/components/mla-dashboard/charts/grievances-bar-chart"
import { RecentGrievancesTable } from "@/components/mla-dashboard/dashboard/table/recent-grievances-table"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Users, FileText, CheckCircle2, Clock, TrendingUp, AlertCircle, Target, MessageSquare, Award, BarChart, IndianRupee, TrendingDown } from "lucide-react"
import { useThemeStore } from "@/store/useThemeStore"

export default function MLADashboardPage() {
  const { theme } = useThemeStore()

  return (
    <div className="space-y-6">
      {/* Top Stats Grid - 6 Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Card 1 */}
        <Card 
          className="shadow-lg border-l-4 hover:shadow-xl transition-shadow duration-300"
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
              Total Citizens
            </CardTitle>
            <Users className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div 
              className="text-3xl font-bold"
              style={{ color: theme.textPrimary }}
            >
              45,328
            </div>
            <p 
              className="text-xs mt-1"
              style={{ color: theme.textTertiary }}
            >
              Korei Constituency
            </p>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card 
          className="shadow-lg border-l-4 hover:shadow-xl transition-shadow duration-300"
          style={{ 
            backgroundColor: theme.cardBackground,
            borderTop: `1px solid ${theme.cardBorder}`,
            borderRight: `1px solid ${theme.cardBorder}`,
            borderBottom: `1px solid ${theme.cardBorder}`,
            borderLeftColor: '#f59e0b',
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
            <AlertCircle className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div 
              className="text-3xl font-bold"
              style={{ color: theme.textPrimary }}
            >
              127
            </div>
            <p 
              className="text-xs mt-1"
              style={{ color: theme.textTertiary }}
            >
              <span className="text-red-600 font-medium">23</span> critical
            </p>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card 
          className="shadow-lg border-l-4 hover:shadow-xl transition-shadow duration-300"
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
              Resolved This Month
            </CardTitle>
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div 
              className="text-3xl font-bold"
              style={{ color: theme.textPrimary }}
            >
              284
            </div>
            <p 
              className="text-xs mt-1"
              style={{ color: theme.textTertiary }}
            >
              <span className="text-green-600 font-medium">+18%</span> from last month
            </p>
          </CardContent>
        </Card>

        {/* Card 4 - Total Budget Allocated (Replacing Active Projects) */}
        <Card 
          className="shadow-lg border-l-4 hover:shadow-xl transition-shadow duration-300"
          style={{ 
            backgroundColor: theme.cardBackground,
            borderTop: `1px solid ${theme.cardBorder}`,
            borderRight: `1px solid ${theme.cardBorder}`,
            borderBottom: `1px solid ${theme.cardBorder}`,
            borderLeftColor: '#06b6d4',
            borderLeftWidth: '4px',
            borderLeftStyle: 'solid'
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle 
              className="text-sm font-medium"
              style={{ color: theme.textSecondary }}
            >
              Total Budget Allocated
            </CardTitle>
            <IndianRupee className="h-5 w-5 text-cyan-500" />
          </CardHeader>
          <CardContent>
            <div 
              className="text-3xl font-bold"
              style={{ color: theme.textPrimary }}
            >
              ₹12.85 Cr
            </div>
            <p 
              className="text-xs mt-1"
              style={{ color: theme.textTertiary }}
            >
              Across 32 projects
            </p>
          </CardContent>
        </Card>

        {/* Card 5 - Total Expenditure (Replacing Monthly Engagement) */}
        <Card 
          className="shadow-lg border-l-4 hover:shadow-xl transition-shadow duration-300"
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
              Total Expenditure
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div 
              className="text-3xl font-bold"
              style={{ color: theme.textPrimary }}
            >
              ₹8.42 Cr
            </div>
            <p 
              className="text-xs mt-1"
              style={{ color: theme.textTertiary }}
            >
              Balance: <span className="font-medium" style={{ color: theme.textSecondary }}>₹4.43 Cr</span>
            </p>
          </CardContent>
        </Card>

        {/* Card 6 - Staff Members */}
        <Card 
          className="shadow-lg border-l-4 hover:shadow-xl transition-shadow duration-300"
          style={{ 
            backgroundColor: theme.cardBackground,
            borderTop: `1px solid ${theme.cardBorder}`,
            borderRight: `1px solid ${theme.cardBorder}`,
            borderBottom: `1px solid ${theme.cardBorder}`,
            borderLeftColor: '#ec4899',
            borderLeftWidth: '4px',
            borderLeftStyle: 'solid'
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle 
              className="text-sm font-medium"
              style={{ color: theme.textSecondary }}
            >
              Staff Members
            </CardTitle>
            <Users className="h-5 w-5 text-pink-500" />
          </CardHeader>
          <CardContent>
            <div 
              className="text-2xl font-bold"
              style={{ color: theme.textPrimary }}
            >
              18
            </div>
            <p 
              className="text-xs mt-1"
              style={{ color: theme.textTertiary }}
            >
              <span className="text-pink-600 font-medium">16</span> online now
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <GrievancesBarChart />
        <ActivityAreaChart />
      </div>

      {/* Recent Grievances Table */}
      <div>
        <RecentGrievancesTable />
      </div>
    </div>
  )
}