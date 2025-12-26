// app/(protected)/mla/public-voice/archived-sessions/page.tsx
"use client"

import { ArchivedSessionsTable } from "@/components/mla-dashboard/archived-sessions/table/archived-sessions-table"
import { useThemeStore } from "@/store/useThemeStore"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Archive, MessageSquare, Calendar, TrendingUp } from "lucide-react"

export default function ArchivedSessionsPage() {
  const { theme } = useThemeStore()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 
            className="text-3xl font-bold"
            style={{ color: theme.textPrimary }}
          >
            Archived Sessions
          </h1>
          <p 
            className="mt-1"
            style={{ color: theme.textSecondary }}
          >
            View past Q&A sessions and MLA responses
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
              Total Sessions
            </CardTitle>
            <Archive className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div 
              className="text-3xl font-bold"
              style={{ color: theme.textPrimary }}
            >
              36
            </div>
            <p 
              className="text-xs mt-1"
              style={{ color: theme.textTertiary }}
            >
              Completed Q&A sessions
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
              Questions Answered
            </CardTitle>
            <MessageSquare className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div 
              className="text-3xl font-bold"
              style={{ color: theme.textPrimary }}
            >
              1,121
            </div>
            <p 
              className="text-xs mt-1"
              style={{ color: theme.textTertiary }}
            >
              Across all sessions
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
              Avg Questions/Session
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div 
              className="text-3xl font-bold"
              style={{ color: theme.textPrimary }}
            >
              31
            </div>
            <p 
              className="text-xs mt-1"
              style={{ color: theme.textTertiary }}
            >
              Questions answered
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
            borderLeftColor: '#8b5cf6',
            borderLeftWidth: '4px',
            borderLeftStyle: 'solid'
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle 
              className="text-sm font-medium"
              style={{ color: theme.textSecondary }}
            >
              Most Recent Session
            </CardTitle>
            <Calendar className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div 
              className="text-xl font-bold"
              style={{ color: theme.textPrimary }}
            >
              Dec 15, 2024
            </div>
            <p 
              className="text-xs mt-1"
              style={{ color: theme.textTertiary }}
            >
              Healthcare & Education
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Archived Sessions Table */}
      <ArchivedSessionsTable />
    </div>
  )
}