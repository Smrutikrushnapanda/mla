// grievances-bar-chart.tsx
"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useThemeStore } from "@/store/useThemeStore"

const data = [
  { month: "Jan", grievances: 120 },
  { month: "Feb", grievances: 90 },
  { month: "Mar", grievances: 160 },
  { month: "Apr", grievances: 130 },
  { month: "May", grievances: 180 },
  { month: "Jun", grievances: 210 },
]

export function GrievancesBarChart() {
  const { theme } = useThemeStore()

  return (
    <Card 
      className="shadow-lg"
      style={{ 
        background: theme.cardBackground,
        borderColor: theme.border 
      }}
    >
      <CardHeader>
        <CardTitle style={{ color: theme.textPrimary }}>
          Grievances Per Month
        </CardTitle>
      </CardHeader>
      
      <CardContent className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={theme.border}
              strokeOpacity={0.3}
            />

            <XAxis 
              dataKey="month"
              stroke={theme.textSecondary}
              style={{ fontSize: '12px', fill: theme.textSecondary }}
            />
            <YAxis 
              stroke={theme.textSecondary}
              style={{ fontSize: '12px', fill: theme.textSecondary }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: theme.backgroundSecondary,
                border: `1px solid ${theme.border}`,
                borderRadius: '8px',
                color: theme.textPrimary,
              }}
              labelStyle={{ color: theme.textPrimary }}
              cursor={{ fill: theme.backgroundTertiary, opacity: 0.3 }}
            />

            <Bar
              dataKey="grievances"
              fill="#2B7FFF"
              radius={[6, 6, 0, 0]}
              activeBar={{ fill: "#2B7FFF" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}