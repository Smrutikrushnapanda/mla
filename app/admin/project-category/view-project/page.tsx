"use client";

import { useState } from "react";
import React from "react";
import {
  ArrowLeft,
  Folder,
  Shield,
  Calendar,
  BarChart3,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Share2,
  Printer,
  ChevronDown,
  TrendingUp,
  DollarSign,
  MapPin,
  Target,
  FileText,
  MoreVertical,
  Filter,
  Search,
  Edit,
  Mail,
  Phone,
  Globe,
  Building,
} from "lucide-react";
import { useThemeStore } from "@/store/useThemeStore";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

// Mock projects data for Water Supply category
const mockProjects = [
  {
    id: 5,
    name: "Water Treatment Plant",
    description: "New water treatment facility for clean drinking water",
    category: "Water Supply",
    area: "Central Area",
    budget: 12000000,
    status: "In Progress",
    startDate: "2024-04-01",
    endDate: "2025-09-30",
    progress: 35,
    color: "#06b6d4",
    grievances: 8,
    resolvedGrievances: 5,
  },
  {
    id: 9,
    name: "Pipeline Network Upgrade",
    description: "Modernization of existing water pipeline network",
    category: "Water Supply",
    area: "North District",
    budget: 8500000,
    status: "In Progress",
    startDate: "2024-03-15",
    endDate: "2024-12-31",
    progress: 65,
    color: "#06b6d4",
    grievances: 12,
    resolvedGrievances: 10,
  },
  {
    id: 10,
    name: "Borewell Installation",
    description: "Installation of new borewells in rural areas",
    category: "Water Supply",
    area: "West Region",
    budget: 4500000,
    status: "Planning",
    startDate: "2024-06-01",
    endDate: "2024-11-30",
    progress: 20,
    color: "#06b6d4",
    grievances: 3,
    resolvedGrievances: 1,
  },
  {
    id: 11,
    name: "Water Tank Construction",
    description: "Construction of overhead water storage tanks",
    category: "Water Supply",
    area: "South District",
    budget: 6500000,
    status: "Completed",
    startDate: "2023-08-01",
    endDate: "2024-02-28",
    progress: 100,
    color: "#06b6d4",
    grievances: 6,
    resolvedGrievances: 6,
  },
];

export default function ProjectCategoryDetailPage() {
  const { theme, mode } = useThemeStore();
  const isDarkMode = mode === "dark";
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const category = {
    id: "CAT-2025-004",
    name: "Water Supply",
    status: "Active",
    department: "Public Works Department",
    createdAt: "10 Jan 2025",
    updatedAt: "15 Jan 2025",
    description:
      "This category covers all projects and grievances related to water distribution, supply maintenance, leakage control, pressure issues, and drinking water quality.",
    supervisor: "John Anderson",
    contactEmail: "water-dept@example.com",
    phone: "+1 (555) 123-4567",

    stats: {
      totalProjects: 42,
      activeProjects: 18,
      completedProjects: 12,
      totalBudget: "$45,200,000",
      avgCompletionRate: "78%",
      resolvedGrievances: 96,
      pendingGrievances: 14,
      avgResolutionTime: "4.2 days",
      satisfactionRate: "92%",
    },

    timeline: [
      {
        date: "10 Jan 2025",
        action: "Category Created",
        actor: "Admin",
        icon: Folder,
      },
      {
        date: "12 Jan 2025",
        action: "Department Assigned",
        actor: "MLA Office",
        icon: Users,
      },
      {
        date: "13 Jan 2025",
        action: "Supervisor Assigned",
        actor: "Admin",
        icon: Shield,
      },
      {
        date: "15 Jan 2025",
        action: "Status Set to Active",
        actor: "System",
        icon: CheckCircle,
      },
    ],

    recentGrievances: [
      {
        id: "GRV-2025-0002",
        title: "Low water pressure in Sector 5",
        status: "In Progress",
        date: "2 days ago",
      },
      {
        id: "GRV-2025-0011",
        title: "Pipeline leakage near Main Street",
        status: "Resolved",
        date: "1 week ago",
      },
      {
        id: "GRV-2025-0025",
        title: "Water contamination complaint",
        status: "Under Review",
        date: "3 days ago",
      },
      {
        id: "GRV-2025-0031",
        title: "Irregular water supply timing",
        status: "Resolved",
        date: "2 weeks ago",
      },
    ],

    departments: [
      "Public Works",
      "Health Department",
      "Municipal Corporation",
      "Quality Control",
    ],
  };

  const filteredProjects = mockProjects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statusColor =
    category.status === "Active"
      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      : category.status === "Inactive"
        ? "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
        : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "Planning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "Resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "Under Review":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const handlePrint = () => window.print();
  const handleDownload = () => alert("Downloading category details…");
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied!");
  };

  const handleProjectClick = (projectId: number) => {
    router.push(`/projects/${projectId}`);
  };

  return (
    <div
      className="min-h-screen p-4 md:p-6 space-y-6 print:p-0"
      style={{ background: theme.backgroundGradient }}
    >
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 print:hidden">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Button
            variant="outline"
            onClick={() => router.back()}
            style={{
              borderColor: theme.border,
              color: isDarkMode ? "#fff" : "#000",
            }}
          >
            <ArrowLeft
              className="h-4 w-4 mr-2"
              style={{ color: isDarkMode ? "#fff" : "#000" }}
            />
            Back
          </Button>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div
                className="p-2 rounded-lg w-fit"
                style={{ backgroundColor: theme.primary + "20" }}
              >
                <Folder
                  className="h-6 w-6"
                  style={{ color: isDarkMode ? "white" : "black" }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h1
                  className="text-xl sm:text-2xl font-bold line-clamp-2"
                  style={{ color: theme.textPrimary }}
                >
                  {category.name}
                </h1>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1">
                  <p
                    className="text-xs sm:text-sm font-mono whitespace-nowrap"
                    style={{ color: theme.textSecondary }}
                  >
                    {category.id}
                  </p>
                  <Badge className={statusColor}>{category.status}</Badge>
                  <span
                    className="text-xs sm:text-sm whitespace-nowrap"
                    style={{ color: theme.textSecondary }}
                  >
                    {category.department}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:self-start">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            style={{
              borderColor: theme.border,
              color: isDarkMode ? "#fff" : "#000",
            }}
          >
            <Printer
              className="h-4 w-4 mr-2"
              style={{ color: isDarkMode ? "#fff" : "#000" }}
            />
            Print
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            style={{
              borderColor: theme.border,
              color: isDarkMode ? "#fff" : "#000",
            }}
          >
            <Download
              className="h-4 w-4 mr-2"
              style={{ color: isDarkMode ? "#fff" : "#000" }}
            />
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            style={{
              borderColor: theme.border,
              color: isDarkMode ? "#fff" : "#000",
            }}
          >
            <Share2
              className="h-4 w-4 mr-2"
              style={{ color: isDarkMode ? "#fff" : "#000" }}
            />
            Share
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                style={{
                  backgroundColor: theme.primary,
                  color: "white"
                }}
              >
                Manage
                <ChevronDown
                  className="h-4 w-4 ml-2"
                  style={{ color: "white" }}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <CheckCircle
                  className="h-4 w-4 mr-2"
                  style={{ color: theme.textSecondary }}
                />
                <span style={{ color: theme.textPrimary }}>Set Active</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <AlertCircle
                  className="h-4 w-4 mr-2"
                  style={{ color: theme.textSecondary }}
                />
                <span style={{ color: theme.textPrimary }}>Set Inactive</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Users
                  className="h-4 w-4 mr-2"
                  style={{ color: theme.textSecondary }}
                />
                <span style={{ color: theme.textPrimary }}>Assign Team</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit
                  className="h-4 w-4 mr-2"
                  style={{ color: theme.textSecondary }}
                />
                <span style={{ color: theme.textPrimary }}>Edit Category</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* QUICK STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickStat
          title="Total Projects"
          value={category.stats.totalProjects}
          icon={
            <Folder
              className={`h-5 w-5 text-${isDarkMode ? "white" : "black"}`}
            />
          }
          change="+12%"
          color="blue"
        />
        <QuickStat
          title="Active Projects"
          value={category.stats.activeProjects}
          icon={
            <Target
              className={`h-5 w-5 text-${isDarkMode ? "white" : "black"}`}
            />
          }
          change="+5%"
          color="green"
        />
        <QuickStat
          title="Total Budget"
          value={category.stats.totalBudget}
          icon={
            <DollarSign
              className={`h-5 w-5 text-${isDarkMode ? "white" : "black"}`}
            />
          }
          change="+8%"
          color="purple"
        />
        <QuickStat
          title="Satisfaction Rate"
          value={category.stats.satisfactionRate}
          icon={
            <BarChart3
              className={`h-5 w-5 text-${isDarkMode ? "white" : "black"}`}
            />
          }
          change="+3%"
          color="orange"
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          {/* PROJECTS TABLE */}
          <Card
            style={{
              background: theme.cardBackground,
              borderColor: theme.border,
            }}
          >
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle style={{ color: theme.textPrimary }}>
                  Projects in this Category
                </CardTitle>
                <CardDescription style={{ color: theme.textSecondary }}>
                  {filteredProjects.length} projects found
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
                    style={{ color: theme.textSecondary }}
                  />
                  <Input
                    placeholder="Search projects..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      background: theme.inputBackground,
                      borderColor: theme.border,
                      color: theme.textPrimary,
                    }}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <div className="min-w-full inline-block align-middle">
                <Table>
                  <TableHeader>
                    <TableRow style={{ background: theme.tableHeaderBackground }}>
                      <TableHead style={{ color: theme.textSecondary }}>
                        Project Name
                      </TableHead>
                      <TableHead style={{ color: theme.textSecondary }}>
                        Area
                      </TableHead>
                      <TableHead style={{ color: theme.textSecondary }}>
                        Budget
                      </TableHead>
                      <TableHead style={{ color: theme.textSecondary }}>
                        Status
                      </TableHead>
                      <TableHead style={{ color: theme.textSecondary }}>
                        Progress
                      </TableHead>
                      <TableHead
                        style={{ color: theme.textSecondary }}
                      ></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProjects.map((project) => (
                      <TableRow
                        key={project.id}
                        className="cursor-pointer hover:bg-opacity-50"
                        style={{
                          background: theme.tableRowBackground,
                          borderColor: theme.border,
                        }}
                        onClick={() => handleProjectClick(project.id)}
                      >
                        <TableCell className="min-w-[250px]">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-2 h-8 rounded-full flex-shrink-0"
                              style={{ backgroundColor: project.color }}
                            />
                            <div className="min-w-0">
                              <p
                                style={{ color: theme.textPrimary }}
                                className="font-medium truncate"
                              >
                                {project.name}
                              </p>
                              <p
                                className="text-xs line-clamp-2"
                                style={{ color: theme.textSecondary }}
                              >
                                {project.description.substring(0, 50)}...
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell style={{ color: theme.textPrimary }} className="min-w-[150px]">
                          <div className="flex items-center gap-2">
                            <MapPin
                              className="h-4 w-4 flex-shrink-0"
                              style={{ color: theme.textSecondary }}
                            />
                            <span className="truncate">{project.area}</span>
                          </div>
                        </TableCell>
                        <TableCell style={{ color: theme.textPrimary }} className="min-w-[120px]">
                          ${project.budget.toLocaleString()}
                        </TableCell>
                        <TableCell className="min-w-[120px]">
                          <Badge className={getStatusColor(project.status)}>
                            {project.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="min-w-[150px]">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span style={{ color: theme.textPrimary }}>
                                {project.progress}%
                              </span>
                            </div>
                            <Progress value={project.progress} className="h-2" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                style={{ color: theme.textSecondary }}
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>
                                <span style={{ color: theme.textPrimary }}>
                                  View Details
                                </span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <span style={{ color: theme.textPrimary }}>
                                  Edit Project
                                </span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <span style={{ color: theme.textPrimary }}>
                                  Generate Report
                                </span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* RECENT GRIEVANCES */}
          <Card
            style={{
              background: theme.cardBackground,
              borderColor: theme.border,
            }}
          >
            <CardHeader>
              <CardTitle style={{ color: theme.textPrimary }}>
                Recent Grievances
              </CardTitle>
              <CardDescription style={{ color: theme.textSecondary }}>
                Latest complaints and issues reported
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {category.recentGrievances.map((grievance, index) => (
                  <div
                    key={grievance.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg border"
                    style={{
                      borderColor: theme.border,
                      background: theme.cardBackground,
                    }}
                  >
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <div
                        className="flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0"
                        style={{ backgroundColor: theme.primary + "20" }}
                      >
                        <FileText
                          className={`h-5 w-5 text-${isDarkMode ? "white" : "black"}`}
                          style={{ color: theme.primary }}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p
                          style={{ color: theme.textPrimary }}
                          className="font-medium truncate"
                        >
                          {grievance.title}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1">
                          <span
                            className="text-xs sm:text-sm"
                            style={{ color: theme.textSecondary }}
                          >
                            {grievance.id}
                          </span>
                          <span
                            className="text-xs px-2 py-1 rounded-full whitespace-nowrap"
                            style={{
                              background: isDarkMode ? "#374151" : "#f3f4f6",
                              color: theme.textSecondary,
                            }}
                          >
                            {grievance.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(grievance.status)} flex-shrink-0`}>
                      {grievance.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* CATEGORY INFO */}
          <Card
            style={{
              background: theme.cardBackground,
              borderColor: theme.border,
            }}
          >
            <CardHeader>
              <CardTitle style={{ color: theme.textPrimary }}>
                Category Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <InfoItem
                label="Category Name"
                value={category.name}
                icon={<Folder className="h-4 w-4" />}
              />
              <InfoItem
                label="Department"
                value={category.department}
                icon={<Building className="h-4 w-4" />}
              />
              <InfoItem
                label="Supervisor"
                value={category.supervisor}
                icon={<Shield className="h-4 w-4" />}
              />
              <InfoItem
                label="Contact Email"
                value={category.contactEmail}
                icon={<Mail className="h-4 w-4" />}
              />
              <InfoItem
                label="Phone"
                value={category.phone}
                icon={<Phone className="h-4 w-4" />}
              />
              <Separator />
              <div>
                <p
                  className="text-sm mb-2"
                  style={{ color: theme.textSecondary }}
                >
                  Description
                </p>
                <p style={{ color: theme.textPrimary }}>
                  {category.description}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* TIMELINE */}
          <Card
            style={{
              background: theme.cardBackground,
              borderColor: theme.border,
            }}
          >
            <CardHeader>
              <CardTitle style={{ color: theme.textPrimary }}>
                Activity Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {category.timeline.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: theme.primary + "20" }}
                      >
                        {item.icon && (
                          <item.icon
                            className={`h-4 w-4 text-${isDarkMode ? "white" : "black"}`}
                            style={{ color: theme.primary }}
                          />
                        )}
                      </div>
                      {index < category.timeline.length - 1 && (
                        <div
                          className="w-0.5 h-8 mt-2"
                          style={{ backgroundColor: theme.border }}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <p
                        style={{ color: theme.textPrimary }}
                        className="font-medium"
                      >
                        {item.action}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <p
                          className="text-sm"
                          style={{ color: theme.textSecondary }}
                        >
                          by {item.actor}
                        </p>
                        <p
                          className="text-sm"
                          style={{ color: theme.textSecondary }}
                        >
                          {item.date}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* RELATED DEPARTMENTS */}
          <Card
            style={{
              background: theme.cardBackground,
              borderColor: theme.border,
            }}
          >
            <CardHeader>
              <CardTitle style={{ color: theme.textPrimary }}>
                Related Departments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.departments.map((dept, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-3 p-3 rounded-lg border"
                    style={{ borderColor: theme.border }}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: theme.primary + "20" }}
                      >
                        <Users
                          className={`h-4 w-4 text-${isDarkMode ? "white" : "black"}`}
                          style={{ color: theme.primary }}
                        />
                      </div>
                      <span style={{ color: theme.textPrimary }} className="truncate">{dept}</span>
                    </div>
                    <Button
                      variant="ghost"
                      className="flex-shrink-0"
                      size="sm"
                      style={{ color: theme.primary }}
                    >
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

function QuickStat({
  title,
  value,
  icon,
  change,
  color,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change: string;
  color: string;
}) {
  const { theme, mode } = useThemeStore();
  const isDarkMode = mode === "dark";
  const isPositive = change.startsWith("+");

  const iconColor = isDarkMode ? theme.primary : theme.primary;

  return (
    <Card
      style={{ background: theme.cardBackground, borderColor: theme.border }}
    >
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm" style={{ color: theme.textSecondary }}>
              {title}
            </p>
            <p
              className="text-2xl font-bold mt-2"
              style={{ color: theme.textPrimary }}
            >
              {value}
            </p>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp
                className={`h-4 w-4 ${isPositive ? "text-green-500" : "text-red-500"
                  }`}
              />
              <span
                className={`text-sm ${isPositive ? "text-green-500" : "text-red-500"
                  }`}
              >
                {change}
              </span>
              <span className="text-sm" style={{ color: theme.textSecondary }}>
                from last month
              </span>
            </div>
          </div>
          <div
            className="p-3 rounded-full"
            style={{ backgroundColor: theme.primary + "20" }}
          >
            {React.cloneElement(icon as React.ReactElement, {
              style: { color: iconColor },
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function InfoItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  const { theme } = useThemeStore();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
      <div className="flex items-center gap-3">
        <div style={{ color: theme.textSecondary }} className="flex-shrink-0">
          {React.cloneElement(icon as React.ReactElement, {
            style: { color: theme.textSecondary },
          })}
        </div>
        <span className="text-sm" style={{ color: theme.textSecondary }}>
          {label}
        </span>
      </div>
      <span style={{ color: theme.textPrimary }} className="font-medium text-sm sm:text-base break-words text-left sm:text-right">
        {value}
      </span>
    </div>
  );
}
