// app/(protected)/mla/public-voice/all-questions/page.tsx
"use client"

import { AllQuestionsTable } from "@/components/mla-dashboard/all-questions/table/all-questions-table"
import { useThemeStore } from "@/store/useThemeStore"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MessageSquare, ThumbsUp, Clock, CheckCircle2 } from "lucide-react"

export default function AllQuestionsPage() {
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
            All Questions
          </h1>
          <p 
            className="mt-1"
            style={{ color: theme.textSecondary }}
          >
            Answer trending questions submitted by citizens
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
              Total Questions
            </CardTitle>
            <MessageSquare className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div 
              className="text-3xl font-bold"
              style={{ color: theme.textPrimary }}
            >
              1,248
            </div>
            <p 
              className="text-xs mt-1"
              style={{ color: theme.textTertiary }}
            >
              Submitted by citizens
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
              Pending Answers
            </CardTitle>
            <Clock className="h-5 w-5 text-orange-500" />
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
              Awaiting response
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
              Top Voted
            </CardTitle>
            <ThumbsUp className="h-5 w-5 text-purple-500" />
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
              High priority questions
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
              Answered
            </CardTitle>
            <CheckCircle2 className="h-5 w-5 text-green-500" />
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
              <span className="text-green-600 font-medium">89.8%</span> response rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Questions Table */}
      <AllQuestionsTable />
    </div>
  )
}