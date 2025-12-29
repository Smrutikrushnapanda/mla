"use client";

import { useRouter } from "next/navigation";
import { 
  ArrowLeft, Calendar, MapPin, Users, Clock, Building2, 
  IndianRupee, Target, FileText, CheckCircle2, XCircle, 
  AlertCircle, TrendingUp, Briefcase, User, Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useThemeStore } from "@/store/useThemeStore";

const mockProject = {
  projectId: "PRJ-PROP-2024-001",
  name: "Rural Road Connectivity Improvement",
  description: "Upgrade 15 km of rural roads connecting 8 villages to improve agricultural transport and access to markets",
  category: "Infrastructure",
  department: "Public Works Department",
  requestedBudget: 18500000,
  fundingSource: "State Budget",
  status: "Pending Review",
  priority: "High",
  submittedDate: new Date("2024-12-15"),
  submittedBy: "PWD Division Officer - Rural",
  location: "Villages: Balakati, Khurda, Jatni area",
  constituency: "Bhubaneswar Central",
  estimatedBeneficiaries: 35000,
  expectedDuration: "12 months",
  proposedContractor: "To be tendered",
  justification: "Current road conditions severely impact agricultural transport during monsoon. Improved connectivity will boost rural economy.",
};

export default function ProjectDetailPage() {
  const router = useRouter();
  const { theme } = useThemeStore();
  const project = mockProject;

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const statusColors: Record<string, { bg: string; light: string; icon: any }> = {
    "Pending Review": { bg: "#6b7280", light: "#f3f4f6", icon: Clock },
    "Under Review": { bg: "#f59e0b", light: "#fef3c7", icon: FileText },
    "Approved": { bg: "#10b981", light: "#d1fae5", icon: CheckCircle2 },
    "Rejected": { bg: "#ef4444", light: "#fee2e2", icon: XCircle },
    "Revision Requested": { bg: "#3b82f6", light: "#dbeafe", icon: AlertCircle },
  };

  const priorityColors: Record<string, { bg: string; gradient: string }> = {
    Low: { bg: "#10b981", gradient: "from-emerald-500 to-green-600" },
    Medium: { bg: "#f59e0b", gradient: "from-amber-500 to-orange-600" },
    High: { bg: "#ef4444", gradient: "from-red-500 to-rose-600" },
    Critical: { bg: "#dc2626", gradient: "from-red-600 to-red-800" },
  };

  const categoryColors: Record<string, string> = {
    Infrastructure: "from-blue-500 to-cyan-600",
    Healthcare: "from-pink-500 to-rose-600",
    Education: "from-purple-500 to-indigo-600",
    "Water Supply": "from-teal-500 to-emerald-600",
    "Skill Development": "from-orange-500 to-amber-600",
    "Urban Development": "from-violet-500 to-purple-600",
  };

  const StatusIcon = statusColors[project.status].icon;
  const statusColor = statusColors[project.status];
  const priorityColor = priorityColors[project.priority];

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: theme.background }}>
      {/* Header */}
      <div className="border-b" style={{ backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Button 
            variant="ghost" 
            onClick={() => router.back()}
            className="mb-4"
            style={{ color: theme.textPrimary }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Approvals
          </Button>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <Badge className="mb-3" style={{ backgroundColor: statusColor.bg, color: "#ffffff" }}>
                {project.projectId}
              </Badge>
              <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: theme.textPrimary }}>
                {project.name}
              </h1>
              <p className="text-sm md:text-base mb-3" style={{ color: theme.textSecondary }}>
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge style={{ backgroundColor: statusColor.bg, color: "#ffffff" }}>
                  {project.status}
                </Badge>
                <Badge style={{ backgroundColor: priorityColor.bg, color: "#ffffff" }}>
                  {project.priority}
                </Badge>
                <Badge variant="outline" style={{ borderColor: theme.cardBorder, color: theme.textPrimary }}>
                  {project.category}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card style={{ backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <IndianRupee className="h-4 w-4 text-blue-600" />
                <p className="text-xs font-medium" style={{ color: theme.textSecondary }}>Budget</p>
              </div>
              <p className="text-lg font-bold" style={{ color: theme.textPrimary }}>
                {formatCurrency(project.requestedBudget)}
              </p>
            </CardContent>
          </Card>

          <Card style={{ backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-emerald-600" />
                <p className="text-xs font-medium" style={{ color: theme.textSecondary }}>Beneficiaries</p>
              </div>
              <p className="text-lg font-bold" style={{ color: theme.textPrimary }}>
                {project.estimatedBeneficiaries?.toLocaleString('en-IN')}
              </p>
            </CardContent>
          </Card>

          <Card style={{ backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-amber-600" />
                <p className="text-xs font-medium" style={{ color: theme.textSecondary }}>Duration</p>
              </div>
              <p className="text-lg font-bold" style={{ color: theme.textPrimary }}>
                {project.expectedDuration}
              </p>
            </CardContent>
          </Card>

          <Card style={{ backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <User className="h-4 w-4 text-purple-600" />
                <p className="text-xs font-medium" style={{ color: theme.textSecondary }}>Submitted By</p>
              </div>
              <p className="text-sm font-semibold truncate" style={{ color: theme.textPrimary }}>
                {project.submittedBy}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Project Information */}
          <Card style={{ backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }}>
            <CardContent className="p-6">
              <h2 className="text-lg font-bold mb-4" style={{ color: theme.textPrimary }}>
                Project Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs font-medium mb-1" style={{ color: theme.textSecondary }}>Department</p>
                  <p className="text-sm font-semibold" style={{ color: theme.textPrimary }}>{project.department}</p>
                </div>
                <div>
                  <p className="text-xs font-medium mb-1" style={{ color: theme.textSecondary }}>Location</p>
                  <p className="text-sm font-semibold" style={{ color: theme.textPrimary }}>{project.location}</p>
                </div>
                <div>
                  <p className="text-xs font-medium mb-1" style={{ color: theme.textSecondary }}>Constituency</p>
                  <p className="text-sm font-semibold" style={{ color: theme.textPrimary }}>{project.constituency}</p>
                </div>
                <div>
                  <p className="text-xs font-medium mb-1" style={{ color: theme.textSecondary }}>Funding Source</p>
                  <p className="text-sm font-semibold" style={{ color: theme.textPrimary }}>{project.fundingSource}</p>
                </div>
                <div>
                  <p className="text-xs font-medium mb-1" style={{ color: theme.textSecondary }}>Contractor</p>
                  <p className="text-sm font-semibold" style={{ color: theme.textPrimary }}>{project.proposedContractor}</p>
                </div>
                <div>
                  <p className="text-xs font-medium mb-1" style={{ color: theme.textSecondary }}>Submitted Date</p>
                  <p className="text-sm font-semibold" style={{ color: theme.textPrimary }}>{formatDate(project.submittedDate)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Justification */}
          <Card style={{ backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }}>
            <CardContent className="p-6">
              <h2 className="text-lg font-bold mb-3" style={{ color: theme.textPrimary }}>
                Project Justification
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                {project.justification}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Approve
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <FileText className="mr-2 h-4 w-4" />
            Request Revision
          </Button>
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            <XCircle className="mr-2 h-4 w-4" />
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
}
