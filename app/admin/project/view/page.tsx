"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  Calendar,
  MapPin,
  DollarSign,
  Users,
  Building2,
  Briefcase,
  Clock,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  FileText,
  User,
  Phone,
  Mail,
  Download,
  Share2,
  Printer,
  Target,
  Award,
  Zap,
} from "lucide-react"
import { useThemeStore } from "@/store/useThemeStore"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Project } from "@/components/admin-dashboard/project/table/columns"

// Mock data - In production, fetch from API using the id param
const mockProjects: Project[] = [
  {
    id: "1",
    projectId: "PRJ-2024-001",
    name: "NH-16 Flyover Construction",
    description: "Construction of 2.5 km flyover on NH-16 to reduce traffic congestion",
    category: "Infrastructure",
    department: "Public Works Department",
    budget: 45000000,
    fundingSource: "State Budget",
    status: "In Progress",
    priority: "High",
    startDate: new Date("2024-01-15"),
    expectedEndDate: new Date("2025-06-30"),
    progress: 65,
    location: "NH-16, Patia to Jaydev Vihar",
    constituency: "Bhubaneswar Central",
    beneficiaries: 150000,
    contractor: "L&T Construction Ltd",
    inchargeOfficer: "Er. Rajesh Panda, Executive Engineer",
    remarks: "Project on track. Expected to complete 2 months ahead of schedule.",
  },
  {
    id: "2",
    projectId: "PRJ-2024-002",
    name: "Smart Classroom Initiative",
    description: "Installation of smart classrooms in 50 government schools",
    category: "Education",
    department: "Education Department",
    budget: 12500000,
    fundingSource: "Central Government Scheme",
    status: "In Progress",
    priority: "High",
    startDate: new Date("2024-03-01"),
    expectedEndDate: new Date("2024-12-31"),
    progress: 80,
    location: "50 Schools across constituency",
    constituency: "Bhubaneswar Central",
    beneficiaries: 25000,
    contractor: "Edutech Solutions Pvt Ltd",
    inchargeOfficer: "Mrs. Sunita Mohanty, Deputy Director",
    remarks: "40 schools completed. Remaining 10 schools in progress.",
  },
  {
    id: "3",
    projectId: "PRJ-2024-003",
    name: "Water Supply Pipeline Network",
    description: "Laying of new water supply pipelines in underserved areas",
    category: "Water Supply",
    department: "Water Resources Department",
    budget: 28000000,
    fundingSource: "State Budget",
    status: "Approved",
    priority: "Critical",
    startDate: new Date("2024-11-01"),
    expectedEndDate: new Date("2025-10-31"),
    progress: 15,
    location: "Chandrasekharpur, Nayapalli, Patia",
    constituency: "Bhubaneswar Central",
    beneficiaries: 85000,
    contractor: "To be finalized",
    inchargeOfficer: "Er. Prakash Nayak, Chief Engineer",
    remarks: "Tender process completed. Work order to be issued soon.",
  },
  {
    id: "4",
    projectId: "PRJ-2024-004",
    name: "Community Health Centers Upgrade",
    description: "Modernization of 5 community health centers with new equipment",
    category: "Healthcare",
    department: "Health Department",
    budget: 8500000,
    fundingSource: "Central Government Scheme",
    status: "Completed",
    priority: "High",
    startDate: new Date("2023-10-01"),
    expectedEndDate: new Date("2024-09-30"),
    actualEndDate: new Date("2024-09-15"),
    progress: 100,
    location: "5 CHCs in urban areas",
    constituency: "Bhubaneswar Central",
    beneficiaries: 120000,
    contractor: "Medequip India Pvt Ltd",
    inchargeOfficer: "Dr. Anita Behera, District Health Officer",
    remarks: "Successfully completed. All centers now operational with new equipment.",
  },
  {
    id: "5",
    projectId: "PRJ-2024-005",
    name: "LED Street Light Installation",
    description: "Replacement of conventional street lights with LED lights",
    category: "Infrastructure",
    department: "Urban Development Department",
    budget: 6200000,
    fundingSource: "Municipal Budget",
    status: "In Progress",
    priority: "Medium",
    startDate: new Date("2024-06-01"),
    expectedEndDate: new Date("2025-01-31"),
    progress: 55,
    location: "All major roads in constituency",
    constituency: "Bhubaneswar Central",
    beneficiaries: 200000,
    contractor: "Philips Lighting India",
    inchargeOfficer: "Mr. Bijay Sahoo, Municipal Engineer",
    remarks: "5500 lights installed out of 10000. Good progress.",
  },
  {
    id: "6",
    projectId: "PRJ-2024-006",
    name: "Skill Development Center",
    description: "Establishment of modern skill development center for youth",
    category: "Skill Development",
    department: "Labour Department",
    budget: 15000000,
    fundingSource: "State Budget",
    status: "On Hold",
    priority: "Medium",
    startDate: new Date("2024-04-01"),
    expectedEndDate: new Date("2025-03-31"),
    progress: 30,
    location: "Rasulgarh Industrial Area",
    constituency: "Bhubaneswar Central",
    beneficiaries: 5000,
    contractor: "TATA Skill Academy",
    inchargeOfficer: "Mr. Suresh Kumar, Labour Commissioner",
    remarks: "On hold due to land acquisition issues. Expected to resume in 2 months.",
  },
  {
    id: "7",
    projectId: "PRJ-2024-007",
    name: "Solid Waste Management Plant",
    description: "Modern solid waste processing and recycling facility",
    category: "Sanitation",
    department: "Urban Development Department",
    budget: 75000000,
    fundingSource: "Central Government Scheme",
    status: "Approved",
    priority: "Critical",
    startDate: new Date("2025-01-01"),
    expectedEndDate: new Date("2026-12-31"),
    progress: 5,
    location: "Bhuasuni, Outskirts",
    constituency: "Bhubaneswar Central",
    beneficiaries: 500000,
    contractor: "L&T ECC Division",
    inchargeOfficer: "Er. Madhusudan Patra, Project Director",
    remarks: "Environmental clearances obtained. Pre-construction activities underway.",
  },
  {
    id: "8",
    projectId: "PRJ-2023-008",
    name: "Sports Complex Development",
    description: "Construction of multi-purpose indoor sports complex",
    category: "Sports",
    department: "Sports & Youth Department",
    budget: 35000000,
    fundingSource: "State Budget",
    status: "Completed",
    priority: "Medium",
    startDate: new Date("2023-01-10"),
    expectedEndDate: new Date("2024-06-30"),
    actualEndDate: new Date("2024-06-20"),
    progress: 100,
    location: "Kalinga Stadium Complex",
    constituency: "Bhubaneswar Central",
    beneficiaries: 50000,
    contractor: "Shapoorji Pallonji",
    inchargeOfficer: "Mr. Sanjay Behera, Sports Director",
    remarks: "Inaugurated on June 25, 2024. Hosting state-level tournaments.",
  },
]

export default function ProjectViewPage() {
  const project = mockProjects[0]
  const router = useRouter()
  const { theme, mode } = useThemeStore()
  const isDarkMode = mode === "dark"
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
    return new Date(date).toLocaleDateString("en-GB", options)
  }

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`
    return `₹${amount.toLocaleString("en-IN")}`
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, { bg: string; text: string; icon: any }> = {
      Proposed: { bg: "bg-gray-500", text: "text-white", icon: FileText },
      Approved: { bg: "bg-blue-500", text: "text-white", icon: CheckCircle2 },
      "In Progress": { bg: "bg-orange-500", text: "text-white", icon: Clock },
      Completed: { bg: "bg-green-500", text: "text-white", icon: CheckCircle2 },
      "On Hold": { bg: "bg-red-500", text: "text-white", icon: AlertTriangle },
      Cancelled: { bg: "bg-red-600", text: "text-white", icon: AlertTriangle },
    }
    return colors[status] || colors.Proposed
  }

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      Low: { bg: "bg-green-500", text: "text-white" },
      Medium: { bg: "bg-yellow-500", text: "text-white" },
      High: { bg: "bg-orange-500", text: "text-white" },
      Critical: { bg: "bg-red-600", text: "text-white" },
    }
    return colors[priority] || colors.Medium
  }

  const getProgressColor = (progress: number) => {
    if (progress === 100) return "#10b981"
    if (progress >= 75) return "#3b82f6"
    if (progress >= 50) return "#f59e0b"
    return "#ef4444"
  }

  const statusInfo = getStatusColor(project.status)
  const priorityInfo = getPriorityColor(project.priority)

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    alert("Downloading project details...")
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Project: ${project.name}`,
        text: `Check this project: ${project.description}`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  return (
    <div
      className="min-h-screen p-4 md:p-6 lg:p-8 space-y-6 print:p-0"
      style={{ background: theme.backgroundGradient }}
    >
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => router.back()}
            style={{
              borderColor: theme.border,
              color: isDarkMode ? "#ffffff" : "#000000",
            }}
            className="hover:bg-opacity-20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl md:text-3xl font-bold" style={{ color: theme.textPrimary }}>
                {project.name}
              </h1>
              <Badge
                className={`${statusInfo.bg} ${statusInfo.text} px-3 py-1 font-semibold`}
              >
                {project.status}
              </Badge>
              <Badge
                className={`${priorityInfo.bg} ${priorityInfo.text} px-3 py-1 font-semibold`}
              >
                {project.priority} Priority
              </Badge>
            </div>
            <div className="flex items-center gap-4 mt-2 flex-wrap">
              <p className="text-sm font-mono" style={{ color: theme.textSecondary }}>
                {project.projectId}
              </p>
              <span
                className="text-xs px-3 py-1 rounded-full font-medium"
                style={{
                  backgroundColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                  color: theme.textSecondary,
                }}
              >
                {project.category}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            style={{
              borderColor: theme.border,
              color: isDarkMode ? "#ffffff" : "#000000",
            }}
          >
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            style={{
              borderColor: theme.border,
              color: isDarkMode ? "#ffffff" : "#000000",
            }}
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            style={{
              borderColor: theme.border,
              color: isDarkMode ? "#ffffff" : "#000000",
            }}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <Card
        style={{ background: theme.cardBackground, borderColor: theme.border }}
        className="print:hidden shadow-lg"
      >
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold" style={{ color: theme.textSecondary }}>
              Project Progress
            </span>
            <span className="text-lg font-bold" style={{ color: getProgressColor(project.progress) }}>
              {project.progress}%
            </span>
          </div>
          <div
            className="relative h-4 w-full overflow-hidden rounded-full"
            style={{ backgroundColor: `${theme.border}40` }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${project.progress}%`,
                backgroundColor: getProgressColor(project.progress),
              }}
            />
          </div>
          <div className="flex justify-between mt-3 text-xs" style={{ color: theme.textTertiary }}>
            <span>Started: {formatDate(project.startDate)}</span>
            <span>Expected: {formatDate(project.expectedEndDate)}</span>
            {project.actualEndDate && (
              <span>Completed: {formatDate(project.actualEndDate)}</span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN - MAIN INFO */}
        <div className="lg:col-span-2 space-y-6">
          {/* PROJECT OVERVIEW */}
          <Card
            style={{ background: theme.cardBackground, borderColor: theme.border }}
            className="shadow-lg"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2" style={{ color: theme.textPrimary }}>
                <Briefcase className="h-5 w-5" />
                Project Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Description</Label>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: theme.textPrimary }}>
                  {project.description}
                </p>
              </div>

              <Separator style={{ backgroundColor: theme.border }} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard
                  icon={Building2}
                  label="Department"
                  value={project.department}
                  color="#3b82f6"
                  theme={theme}
                />
                <InfoCard
                  icon={Target}
                  label="Category"
                  value={project.category}
                  color="#8b5cf6"
                  theme={theme}
                />
                <InfoCard
                  icon={MapPin}
                  label="Location"
                  value={project.location}
                  color="#10b981"
                  theme={theme}
                />
                <InfoCard
                  icon={MapPin}
                  label="Constituency"
                  value={project.constituency}
                  color="#f59e0b"
                  theme={theme}
                />
              </div>
            </CardContent>
          </Card>

          {/* FINANCIAL INFORMATION */}
          <Card
            style={{ background: theme.cardBackground, borderColor: theme.border }}
            className="shadow-lg"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2" style={{ color: theme.textPrimary }}>
                <DollarSign className="h-5 w-5" />
                Financial Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded-lg" style={{ backgroundColor: `${theme.primary}15` }}>
                  <p className="text-xs font-medium mb-2" style={{ color: theme.textSecondary }}>
                    Total Budget
                  </p>
                  <p className="text-2xl font-bold" style={{ color: theme.primary }}>
                    {formatCurrency(project.budget)}
                  </p>
                </div>
                <div className="p-4 rounded-lg" style={{ backgroundColor: `${theme.border}20` }}>
                  <p className="text-xs font-medium mb-2" style={{ color: theme.textSecondary }}>
                    Funding Source
                  </p>
                  <p className="text-lg font-semibold" style={{ color: theme.textPrimary }}>
                    {project.fundingSource}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* IMPLEMENTATION DETAILS */}
          {(project.contractor || project.inchargeOfficer) && (
            <Card
              style={{ background: theme.cardBackground, borderColor: theme.border }}
              className="shadow-lg"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ color: theme.textPrimary }}>
                  <Zap className="h-5 w-5" />
                  Implementation Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {project.contractor && (
                  <div>
                    <Label>Contractor</Label>
                    <p className="mt-1 font-medium" style={{ color: theme.textPrimary }}>
                      {project.contractor}
                    </p>
                  </div>
                )}
                {project.inchargeOfficer && (
                  <div>
                    <Label>Incharge Officer</Label>
                    <p className="mt-1 font-medium" style={{ color: theme.textPrimary }}>
                      {project.inchargeOfficer}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* REMARKS */}
          {project.remarks && (
            <Card
              style={{ background: theme.cardBackground, borderColor: theme.border }}
              className="shadow-lg"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ color: theme.textPrimary }}>
                  <FileText className="h-5 w-5" />
                  Remarks & Status Update
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed" style={{ color: theme.textPrimary }}>
                  {project.remarks}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* RIGHT COLUMN - STATS & DETAILS */}
        <div className="space-y-6">
          {/* KEY METRICS */}
          <Card
            style={{ background: theme.cardBackground, borderColor: theme.border }}
            className="shadow-lg"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2" style={{ color: theme.textPrimary }}>
                <TrendingUp className="h-5 w-5" />
                Key Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {project.beneficiaries && (
                <MetricCard
                  icon={Users}
                  label="Beneficiaries"
                  value={project.beneficiaries.toLocaleString("en-IN")}
                  color="#10b981"
                  theme={theme}
                />
              )}
              <MetricCard
                icon={Calendar}
                label="Start Date"
                value={formatDate(project.startDate)}
                color="#3b82f6"
                theme={theme}
              />
              <MetricCard
                icon={Calendar}
                label="Expected End"
                value={formatDate(project.expectedEndDate)}
                color="#f59e0b"
                theme={theme}
              />
              {project.actualEndDate && (
                <MetricCard
                  icon={Award}
                  label="Completed On"
                  value={formatDate(project.actualEndDate)}
                  color="#10b981"
                  theme={theme}
                />
              )}
            </CardContent>
          </Card>

          {/* PROJECT STATUS CARD */}
          <Card
            style={{ background: theme.cardBackground, borderColor: theme.border }}
            className="shadow-lg"
          >
            <CardHeader>
              <CardTitle style={{ color: theme.textPrimary }}>Project Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs font-medium mb-2" style={{ color: theme.textSecondary }}>
                  Current Status
                </p>
                <Badge className={`${statusInfo.bg} ${statusInfo.text} px-3 py-1.5 font-semibold`}>
                  <statusInfo.icon className="h-4 w-4 mr-2" />
                  {project.status}
                </Badge>
              </div>
              <Separator style={{ backgroundColor: theme.border }} />
              <div>
                <p className="text-xs font-medium mb-2" style={{ color: theme.textSecondary }}>
                  Priority Level
                </p>
                <Badge className={`${priorityInfo.bg} ${priorityInfo.text} px-3 py-1.5 font-semibold`}>
                  {project.priority}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore()
  return (
    <p className="text-sm font-semibold mb-1" style={{ color: theme.textSecondary }}>
      {children}
    </p>
  )
}

function InfoCard({
  icon: Icon,
  label,
  value,
  color,
  theme,
}: {
  icon: any
  label: string
  value: string
  color: string
  theme: any
}) {
  return (
    <div className="p-3 rounded-lg border" style={{ borderColor: theme.border }}>
      <div className="flex items-center gap-2 mb-2">
        <div
          className="p-2 rounded-lg"
          style={{ backgroundColor: `${color}20`, color: color }}
        >
          <Icon className="h-4 w-4" />
        </div>
        <p className="text-xs font-medium" style={{ color: theme.textSecondary }}>
          {label}
        </p>
      </div>
      <p className="text-sm font-semibold ml-12" style={{ color: theme.textPrimary }}>
        {value}
      </p>
    </div>
  )
}

function MetricCard({
  icon: Icon,
  label,
  value,
  color,
  theme,
}: {
  icon: any
  label: string
  value: string
  color: string
  theme: any
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: `${color}15` }}>
      <div className="p-2 rounded-lg" style={{ backgroundColor: color, color: "white" }}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <p className="text-xs font-medium" style={{ color: theme.textSecondary }}>
          {label}
        </p>
        <p className="text-sm font-bold mt-1" style={{ color: theme.textPrimary }}>
          {value}
        </p>
      </div>
    </div>
  )
}

