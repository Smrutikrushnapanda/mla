// app/(protected)/mla/manage-polls/page.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { useThemeStore } from "@/store/useThemeStore"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AllPollsTable } from "@/components/mla-dashboard/manage-polls/all-polls/table/all-polls-table"
import { PublishActionsTable } from "@/components/mla-dashboard/manage-polls/publish-actions/publish-actions-table"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BarChart3, CheckCircle2, Clock, Users } from "lucide-react"

export default function ManagePollsPage() {
  const { theme } = useThemeStore()
  const [activeTab, setActiveTab] = useState("all-polls")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 
            className="text-3xl font-bold"
            style={{ color: theme.textPrimary }}
          >
            Manage Polls
          </h1>
          <p 
            className="mt-1"
            style={{ color: theme.textSecondary }}
          >
            Create polls, track citizen votes, and publish action plans
          </p>
        </div>
        
        <Link href="/mla/Addmanage-polls">
          <Button
            className="flex items-center gap-2"
            style={{
              background: theme.buttonPrimary.bg,
              color: theme.buttonPrimary.text,
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create New Poll
          </Button>
        </Link>
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
              Total Polls
            </CardTitle>
            <BarChart3 className="h-5 w-5 text-blue-500" />
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
              All time polls created
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
              Active Polls
            </CardTitle>
            <Clock className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div 
              className="text-3xl font-bold"
              style={{ color: theme.textPrimary }}
            >
              12
            </div>
            <p 
              className="text-xs mt-1"
              style={{ color: theme.textTertiary }}
            >
              Currently running
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
              Total Votes
            </CardTitle>
            <Users className="h-5 w-5 text-orange-500" />
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
              Citizen participation
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
              Actions Published
            </CardTitle>
            <CheckCircle2 className="h-5 w-5 text-purple-500" />
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
              Based on poll results
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList
    className="grid w-full max-w-md grid-cols-2 h-auto p-0 bg-transparent"
    style={{
      backgroundColor: "transparent",
      borderBottom: `2px solid ${theme.border}`,
    }}
  >
    <TabsTrigger
      value="all-polls"
      className="relative rounded-none data-[state=active]:bg-transparent data-[state=inactive]:bg-transparent"
      style={{
        color:
          activeTab === "all-polls"
            ? theme.input.focusBorder
            : theme.textSecondary,
        backgroundColor: "transparent",
        borderBottom:
          activeTab === "all-polls"
            ? `3px solid ${theme.input.focusBorder}`
            : "3px solid transparent",
        paddingBottom: "12px",
        paddingTop: "12px",
        fontWeight: activeTab === "all-polls" ? "600" : "500",
      }}
    >
      All Polls
    </TabsTrigger>

    <TabsTrigger
      value="publish-actions"
      className="relative rounded-none data-[state=active]:bg-transparent data-[state=inactive]:bg-transparent"
      style={{
        color:
          activeTab === "publish-actions"
            ? theme.input.focusBorder
            : theme.textSecondary,
        backgroundColor: "transparent",
        borderBottom:
          activeTab === "publish-actions"
            ? `3px solid ${theme.input.focusBorder}`
            : "3px solid transparent",
        paddingBottom: "12px",
        paddingTop: "12px",
        fontWeight: activeTab === "publish-actions" ? "600" : "500",
      }}
    >
      Publish Actions
    </TabsTrigger>
  </TabsList>

  <TabsContent value="all-polls" className="mt-6">
    <AllPollsTable />
  </TabsContent>

  <TabsContent value="publish-actions" className="mt-6">
    <PublishActionsTable />
  </TabsContent>
</Tabs>

    </div>
  )
}