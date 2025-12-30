"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/store/useThemeStore";
import { IndianRupee, TrendingUp, TrendingDown, AlertCircle, Plus } from "lucide-react";
import { BudgetUtilizationTable } from "@/components/mla-dashboard/budget-utilization/table/budget-utilization-table";
import Link from "next/link";

export default function BudgetUtilizationPage() {
  const { theme } = useThemeStore();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold" style={{ color: theme.textPrimary }}>
            Budget Utilization
          </h1>
          <p className="text-sm mt-1" style={{ color: theme.textSecondary }}>
            Monitor budget allocation and expenditure across constituency projects
          </p>
        </div>
       <Link href="/staff/Addbudget">
          <Button
            className="flex items-center gap-2"
            style={{
              background: theme.buttonPrimary.bg,
              color: theme.buttonPrimary.text,
            }}
          >
          <Plus className="mr-2 h-4 w-4" />
          Add Budget
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
              Total Budget Allocated
            </CardTitle>
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <IndianRupee className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: theme.textPrimary }}>
              ₹12.85 Cr
            </div>
            <p className="text-xs mt-1" style={{ color: theme.textTertiary }}>
              Across 32 projects
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
              Total Expenditure
            </CardTitle>
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: theme.textPrimary }}>
              ₹8.42 Cr
            </div>
            <p className="text-xs mt-1" style={{ color: theme.textTertiary }}>
              <span className="text-green-600 font-medium">65.5%</span> utilized
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
              Remaining Balance
            </CardTitle>
            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
              <TrendingDown className="h-5 w-5 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: theme.textPrimary }}>
              ₹4.43 Cr
            </div>
            <p className="text-xs mt-1" style={{ color: theme.textTertiary }}>
              <span className="text-amber-600 font-medium">34.5%</span> remaining
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
            borderLeftColor: '#ef4444',
            borderLeftWidth: '4px',
            borderLeftStyle: 'solid'
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium" style={{ color: theme.textSecondary }}>
              Budget Overrun
            </CardTitle>
            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: theme.textPrimary }}>
              3
            </div>
            <p className="text-xs mt-1" style={{ color: theme.textTertiary }}>
              Projects exceeding budget
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Budget Table */}
      <BudgetUtilizationTable />
    </div>
  );
}