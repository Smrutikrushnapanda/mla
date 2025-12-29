"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useThemeStore } from "@/store/useThemeStore";
import {
  Building2,
  IndianRupee,
  FileText,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
  MapPin,
  MessageSquare,
  Target,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ActivityAreaChart } from "@/components/mla-dashboard/charts/activity-area-chart";
import { GrievancesBarChart } from "@/components/mla-dashboard/charts/grievances-bar-chart";

const mockData = {
  projects: {
    total: 45,
    planning: 12,
    inProgress: 18,
    completed: 15,
    totalBudget: 125000000,
    utilized: 78000000,
  },
  grievances: {
    total: 234,
    forwarded: 45,
    pending: 89,
    resolved: 100,
  },
  events: {
    upcoming: 8,
    thisMonth: 12,
    attendance: 85,
  },
  appointments: {
    pending: 23,
    today: 5,
    thisWeek: 18,
  },
  areaWiseProjects: [
    { area: "Zone A", projects: 12, budget: 35000000 },
    { area: "Zone B", projects: 15, budget: 42000000 },
    { area: "Zone C", projects: 10, budget: 28000000 },
    { area: "Zone D", projects: 8, budget: 20000000 },
  ],
  recentGrievances: [
    { id: "GRV-2024-001", category: "Infrastructure", status: "Pending", area: "Zone A" },
    { id: "GRV-2024-002", category: "Water Supply", status: "In Progress", area: "Zone B" },
    { id: "GRV-2024-003", category: "Healthcare", status: "Resolved", area: "Zone C" },
  ],
};

export default function StaffDashboard() {
  const { theme } = useThemeStore();

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  const utilizationPercent = (mockData.projects.utilized / mockData.projects.totalBudget) * 100;

  return (
    <div className="space-y-6">
      {/* Top Stats Grid - 6 Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
            <CardTitle className="text-sm font-medium" style={{ color: theme.textSecondary }}>
              Total Projects
            </CardTitle>
            <Building2 className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: theme.textPrimary }}>
              {mockData.projects.total}
            </div>
            <p className="text-xs mt-1" style={{ color: theme.textTertiary }}>
              <span className="text-blue-600 font-medium">{mockData.projects.inProgress}</span> in progress
            </p>
          </CardContent>
        </Card>

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
            <CardTitle className="text-sm font-medium" style={{ color: theme.textSecondary }}>
              Budget Utilized
            </CardTitle>
            <IndianRupee className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: theme.textPrimary }}>
              {formatCurrency(mockData.projects.utilized)}
            </div>
            <p className="text-xs mt-1" style={{ color: theme.textTertiary }}>
              <span className="text-green-600 font-medium">{utilizationPercent.toFixed(0)}%</span> of total budget
            </p>
          </CardContent>
        </Card>

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
            <CardTitle className="text-sm font-medium" style={{ color: theme.textSecondary }}>
              Pending Grievances
            </CardTitle>
            <AlertCircle className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: theme.textPrimary }}>
              {mockData.grievances.pending}
            </div>
            <p className="text-xs mt-1" style={{ color: theme.textTertiary }}>
              <span className="text-orange-600 font-medium">{mockData.grievances.forwarded}</span> forwarded to me
            </p>
          </CardContent>
        </Card>

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
            <CardTitle className="text-sm font-medium" style={{ color: theme.textSecondary }}>
              Resolved This Month
            </CardTitle>
            <CheckCircle2 className="h-5 w-5 text-cyan-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: theme.textPrimary }}>
              {mockData.grievances.resolved}
            </div>
            <p className="text-xs mt-1" style={{ color: theme.textTertiary }}>
              Total: <span className="font-medium">{mockData.grievances.total}</span> grievances
            </p>
          </CardContent>
        </Card>

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
            <CardTitle className="text-sm font-medium" style={{ color: theme.textSecondary }}>
              Upcoming Events
            </CardTitle>
            <Calendar className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: theme.textPrimary }}>
              {mockData.events.upcoming}
            </div>
            <p className="text-xs mt-1" style={{ color: theme.textTertiary }}>
              <span className="text-purple-600 font-medium">{mockData.events.thisMonth}</span> this month
            </p>
          </CardContent>
        </Card>

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
            <CardTitle className="text-sm font-medium" style={{ color: theme.textSecondary }}>
              Pending Appointments
            </CardTitle>
            <Clock className="h-5 w-5 text-pink-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: theme.textPrimary }}>
              {mockData.appointments.pending}
            </div>
            <p className="text-xs mt-1" style={{ color: theme.textTertiary }}>
              <span className="text-pink-600 font-medium">{mockData.appointments.today}</span> today
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <GrievancesBarChart />
        <ActivityAreaChart />
      </div>

      {/* Area-wise Projects */}
      <Card style={{ backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }}>
        <CardContent className="p-6">
          <h3 className="text-lg font-bold mb-4" style={{ color: theme.textPrimary }}>
            Area-wise Project Distribution
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockData.areaWiseProjects.map((area, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border"
                style={{ backgroundColor: theme.backgroundSecondary, borderColor: theme.border }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <span className="font-semibold" style={{ color: theme.textPrimary }}>
                    {area.area}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: theme.textSecondary }}>
                      Projects
                    </span>
                    <span className="text-sm font-bold" style={{ color: theme.textPrimary }}>
                      {area.projects}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: theme.textSecondary }}>
                      Budget
                    </span>
                    <span className="text-sm font-bold text-emerald-600">
                      {formatCurrency(area.budget)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Grievances */}
      <Card style={{ backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }}>
        <CardContent className="p-6">
          <h3 className="text-lg font-bold mb-4" style={{ color: theme.textPrimary }}>
            Recent Grievances
          </h3>
          <div className="space-y-3">
            {mockData.recentGrievances.map((grievance, index) => (
              <div
                key={index}
                className="p-3 rounded-lg border"
                style={{ backgroundColor: theme.backgroundSecondary, borderColor: theme.border }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold" style={{ color: theme.textPrimary }}>
                    {grievance.id}
                  </span>
                  <Badge
                    className={
                      grievance.status === "Resolved"
                        ? "bg-emerald-100 text-emerald-700"
                        : grievance.status === "In Progress"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-amber-100 text-amber-700"
                    }
                  >
                    {grievance.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs" style={{ color: theme.textSecondary }}>
                  <span>{grievance.category}</span>
                  <span>{grievance.area}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
