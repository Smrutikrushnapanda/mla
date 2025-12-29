"use client";

import { useState, useEffect } from "react";
import { Briefcase, CheckCircle2, Clock, AlertTriangle, TrendingUp, Filter, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useThemeStore } from "@/store/useThemeStore";
import { ProjectTable } from "@/components/admin-dashboard/project/table/project-table";
import { Project } from "@/components/admin-dashboard/project/table/columns";

// Mock projects data
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
];

export default function ProjectPage() {
  const { theme } = useThemeStore();
  const router = useRouter();
  const [projects] = useState<Project[]>(mockProjects);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(mockProjects);
  
  // Filters
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");

  // Statistics
  const stats = {
    total: projects.length,
    inProgress: projects.filter((p) => p.status === "In Progress").length,
    completed: projects.filter((p) => p.status === "Completed").length,
    onHold: projects.filter((p) => p.status === "On Hold").length,
    totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
  };

  // Apply filters automatically
  useEffect(() => {
    let filtered = projects;

    if (statusFilter !== "all") {
      filtered = filtered.filter((p) => p.status === statusFilter);
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((p) => p.category === categoryFilter);
    }

    if (departmentFilter !== "all") {
      filtered = filtered.filter((p) => p.department === departmentFilter);
    }

    setFilteredProjects(filtered);
  }, [statusFilter, categoryFilter, departmentFilter, projects]);

  const resetFilters = () => {
    setStatusFilter("all");
    setCategoryFilter("all");
    setDepartmentFilter("all");
  };

  const handleUpdateStatus = (projectId: string, newStatus: Project['status']) => {
    const updatedProjects = projects.map((p) =>
      p.id === projectId
        ? {
            ...p,
            status: newStatus,
            actualEndDate: newStatus === "Completed" ? new Date() : p.actualEndDate,
            progress: newStatus === "Completed" ? 100 : p.progress,
          }
        : p
    );
    
    let filtered = updatedProjects;
    if (statusFilter !== "all") {
      filtered = filtered.filter((p) => p.status === statusFilter);
    }
    if (categoryFilter !== "all") {
      filtered = filtered.filter((p) => p.category === categoryFilter);
    }
    if (departmentFilter !== "all") {
      filtered = filtered.filter((p) => p.department === departmentFilter);
    }
    setFilteredProjects(filtered);
  };

  const handleEdit = (project: Project) => {
    console.log("Edit project:", project);
    // Navigate to edit page or open edit dialog
  };

  const openViewDialog = (project: Project) => {
    router.push(`/admin/project/view/${project.id}`);
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`
    return `₹${amount.toLocaleString('en-IN')}`
  }

  const uniqueCategories = Array.from(new Set(projects.map((p) => p.category)));
  const uniqueDepartments = Array.from(new Set(projects.map((p) => p.department)));

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1
              className="text-xl md:text-2xl font-bold transition-colors"
              style={{ color: theme.textPrimary }}
            >
              Project Management
            </h1>
            <p
              className="text-xs md:text-sm mt-1 transition-colors"
              style={{ color: theme.textSecondary }}
            >
              Track and monitor constituency development projects
            </p>
          </div>

          <Link href="/admin/AddProjects">
            <Button
              className="gap-2 transition-all duration-200 hover:scale-105 border-0"
              style={{
                background: theme.buttonPrimary.bg,
                color: theme.buttonPrimary.text,
              }}
            >
              <Plus className="h-4 w-4" />
              Add Project
            </Button>
          </Link>
        </div>

        {/* STATISTICS CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {[
            { label: "Total", value: stats.total, icon: Briefcase, color: "#3b82f6" },
            { label: "In Progress", value: stats.inProgress, icon: Clock, color: "#f59e0b" },
            { label: "Completed", value: stats.completed, icon: CheckCircle2, color: "#10b981" },
            { label: "On Hold", value: stats.onHold, icon: AlertTriangle, color: "#ef4444" },
            { label: "Budget", value: formatCurrency(stats.totalBudget), icon: TrendingUp, color: "#8b5cf6", isText: true },
          ].map((stat, index) => (
            <Card
              key={index}
              className="transition-all duration-200 hover:shadow-lg border py-0"
              style={{
                backgroundColor: theme.cardBackground,
                borderColor: theme.cardBorder,
              }}
            >
              <CardContent className="p-3 md:p- lg:p-6">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <p
                      className="text-xs md:text-sm font-medium transition-colors"
                      style={{ color: theme.textSecondary }}
                    >
                      {stat.label}
                    </p>
                    <div
                      className="h-8 w-8 md:h-10 md:w-10 rounded-full flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: `${stat.color}20`,
                      }}
                    >
                      <stat.icon className="h-4 w-4 md:h-5 md:w-5" style={{ color: stat.color }} />
                    </div>
                  </div>
                  <p
                    className="text-lg md:text-2xl lg:text-3xl font-bold transition-colors wrap-break-word"
                    style={{ color: theme.textPrimary }}
                  >
                    {stat.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FILTERS */}
        <Card
          className="border"
          style={{
            backgroundColor: theme.cardBackground,
            borderColor: theme.cardBorder,
          }}
        >
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-4 w-4 md:h-5 md:w-5" style={{ color: theme.textSecondary }} />
              <h3 className="text-sm md:text-base font-semibold" style={{ color: theme.textPrimary }}>
                Filters
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
              <div className="lg:col-span-2">
                <Label className="text-xs md:text-sm mb-2 block" style={{ color: theme.textPrimary }}>
                  Status
                </Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger
                    className="w-full"
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: theme.input.border,
                      color: theme.input.text,
                    }}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      backgroundColor: theme.cardBackground,
                      borderColor: theme.cardBorder,
                    }}
                  >
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Proposed">Proposed</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="On Hold">On Hold</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="lg:col-span-2">
                <Label className="text-xs md:text-sm mb-2 block" style={{ color: theme.textPrimary }}>
                  Category
                </Label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger
                    className="w-full"
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: theme.input.border,
                      color: theme.input.text,
                    }}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      backgroundColor: theme.cardBackground,
                      borderColor: theme.cardBorder,
                    }}
                  >
                    <SelectItem value="all">All Categories</SelectItem>
                    {uniqueCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="lg:col-span-2">
                <Label className="text-xs md:text-sm mb-2 block" style={{ color: theme.textPrimary }}>
                  Department
                </Label>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger
                    className="w-full"
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: theme.input.border,
                      color: theme.input.text,
                    }}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      backgroundColor: theme.cardBackground,
                      borderColor: theme.cardBorder,
                    }}
                  >
                    <SelectItem value="all">All Departments</SelectItem>
                    {uniqueDepartments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end lg:col-span-1">
                <Button
                  onClick={resetFilters}
                  variant="outline"
                  className="w-full text-xs md:text-sm"
                  style={{
                    borderColor: theme.border,
                    color: theme.textPrimary,
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* PROJECTS TABLE */}
        <ProjectTable
          data={filteredProjects}
          onView={openViewDialog}
          onEdit={handleEdit}
          onUpdateStatus={handleUpdateStatus}
        />

      </div>
    </div>
  );
}