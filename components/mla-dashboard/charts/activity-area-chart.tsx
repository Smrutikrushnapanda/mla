// activity-area-chart.tsx
"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useThemeStore } from "@/store/useThemeStore"

const data = [
  { day: "Mon", activity: 320 },
  { day: "Tue", activity: 280 },
  { day: "Wed", activity: 350 },
  { day: "Thu", activity: 400 },
  { day: "Fri", activity: 380 },
  { day: "Sat", activity: 260 },
  { day: "Sun", activity: 200 },
]

export function ActivityAreaChart() {
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
          Weekly Activity
        </CardTitle>
      </CardHeader>

      <CardContent className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={theme.border}
              strokeOpacity={0.3} 
            />

            <XAxis 
              dataKey="day"
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
            />

            <defs>
              <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="35%" stopColor="#FF6900" stopOpacity={1} />
                <stop offset="95%" stopColor="#FF6900" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <Area
              type="monotone"
              dataKey="activity"
              stroke="#FF6900"
              fill="url(#activityGradient)"
              strokeWidth={2}
              activeDot={{ r: 6, fill: "#FF6900" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}