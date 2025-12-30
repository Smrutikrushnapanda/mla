"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useThemeStore } from "@/store/useThemeStore";
import {  BarChart3, CheckCircle2, Clock, FileText, Plus } from "lucide-react";
import { AllPollsTable } from "@/components/mla-dashboard/manage-polls/all-polls/table/all-polls-table";
import { PublishActionsTable } from "@/components/mla-dashboard/manage-polls/publish-actions/publish-actions-table";
import Link from "next/link";

export default function ManagePollsPage() {
  const { theme } = useThemeStore();
  const [activeTab, setActiveTab] = useState("all-polls");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold" style={{ color: theme.textPrimary }}>
            Manage Polls
          </h1>
          <p className="text-sm mt-1" style={{ color: theme.textSecondary }}>
            Create, manage and monitor citizen polls
          </p>
        </div>
        <Link href="/staff/Addmanage-polls">
          <Button
            className="flex items-center gap-2"
            style={{
              background: theme.buttonPrimary.bg,
              color: theme.buttonPrimary.text,
            }}
          >
            <Plus className="h-4 w-4" />
            Add Poll
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card 
          className="shadow-lg border-l-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
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
            <CardTitle className="text-sm font-medium" style={{ color: theme.textSecondary }}>
              Total Polls
            </CardTitle>
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: theme.textPrimary }}>
              11
            </div>
            <p className="text-xs mt-1" style={{ color: theme.textTertiary }}>
              All polls created
            </p>
          </CardContent>
        </Card>

        <Card 
          className="shadow-lg border-l-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
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
            <CardTitle className="text-sm font-medium" style={{ color: theme.textSecondary }}>
              Active Polls
            </CardTitle>
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: theme.textPrimary }}>
              3
            </div>
            <p className="text-xs mt-1" style={{ color: theme.textTertiary }}>
              Currently running
            </p>
          </CardContent>
        </Card>

        <Card 
          className="shadow-lg border-l-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          style={{ 
            backgroundColor: theme.cardBackground,
            borderTop: `1px solid ${theme.cardBorder}`,
            borderRight: `1px solid ${theme.cardBorder}`,
            borderBottom: `1px solid ${theme.cardBorder}`,
            borderLeftColor: '#6b7280',
            borderLeftWidth: '4px',
            borderLeftStyle: 'solid'
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium" style={{ color: theme.textSecondary }}>
              Draft Polls
            </CardTitle>
            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
              <FileText className="h-5 w-5 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: theme.textPrimary }}>
              1
            </div>
            <p className="text-xs mt-1" style={{ color: theme.textTertiary }}>
              Awaiting publish
            </p>
          </CardContent>
        </Card>

        <Card 
          className="shadow-lg border-l-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
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
            <CardTitle className="text-sm font-medium" style={{ color: theme.textSecondary }}>
              Scheduled
            </CardTitle>
            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: theme.textPrimary }}>
              5
            </div>
            <p className="text-xs mt-1" style={{ color: theme.textTertiary }}>
              Future polls
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
              color: activeTab === "all-polls" ? theme.input.focusBorder : theme.textSecondary,
              backgroundColor: "transparent",
              borderBottom: activeTab === "all-polls" ? `3px solid ${theme.input.focusBorder}` : "3px solid transparent",
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
              color: activeTab === "publish-actions" ? theme.input.focusBorder : theme.textSecondary,
              backgroundColor: "transparent",
              borderBottom: activeTab === "publish-actions" ? `3px solid ${theme.input.focusBorder}` : "3px solid transparent",
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
  );
}