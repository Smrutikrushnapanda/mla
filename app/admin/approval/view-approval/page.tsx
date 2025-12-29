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
      {/* Hero Header */}
      <div 
        className={`relative bg-gradient-to-br ${categoryColors[project.category] || "from-blue-500 to-purple-600"} text-white overflow-hidden`}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <Button 
            variant="ghost" 
            onClick={() => router.back()}
            className="mb-6 text-white hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Approvals
          </Button>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <Badge className="mb-4 text-xs sm:text-sm px-3 py-1 bg-white/20 backdrop-blur-sm border-white/30">
                {project.projectId}
              </Badge>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 leading-tight">
                {project.name}
              </h1>
              <p className="text-base sm:text-lg text-white/90 max-w-3xl leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <StatusIcon className="h-6 w-6" />
                    <span className="text-sm font-medium">Status</span>
                  </div>
                  <p className="text-xl font-bold">{project.status}</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="h-6 w-6" />
                    <span className="text-sm font-medium">Priority</span>
                  </div>
                  <p className="text-xl font-bold">{project.priority}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card 
            className="border-l-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            style={{ 
              backgroundColor: theme.cardBackground,
              borderLeftColor: "#3b82f6"
            }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <IndianRupee className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <p className="text-sm font-medium mb-1" style={{ color: theme.textSecondary }}>
                Requested Budget
              </p>
              <p className="text-2xl font-bold" style={{ color: theme.textPrimary }}>
                {formatCurrency(project.requestedBudget)}
              </p>
            </CardContent>
          </Card>

          <Card 
            className="border-l-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            style={{ 
              backgroundColor: theme.cardBackground,
              borderLeftColor: "#10b981"
            }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
              <p className="text-sm font-medium mb-1" style={{ color: theme.textSecondary }}>
                Beneficiaries
              </p>
              <p className="text-2xl font-bold" style={{ color: theme.textPrimary }}>
                {project.estimatedBeneficiaries?.toLocaleString('en-IN')}
              </p>
            </CardContent>
          </Card>

          <Card 
            className="border-l-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            style={{ 
              backgroundColor: theme.cardBackground,
              borderLeftColor: "#f59e0b"
            }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
              </div>
              <p className="text-sm font-medium mb-1" style={{ color: theme.textSecondary }}>
                Duration
              </p>
              <p className="text-2xl font-bold" style={{ color: theme.textPrimary }}>
                {project.expectedDuration}
              </p>
            </CardContent>
          </Card>

          <Card 
            className="border-l-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            style={{ 
              backgroundColor: theme.cardBackground,
              borderLeftColor: "#8b5cf6"
            }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="h-12 w-12 rounded-full bg-violet-100 flex items-center justify-center">
                  <Target className="h-6 w-6 text-violet-600" />
                </div>
              </div>
              <p className="text-sm font-medium mb-1" style={{ color: theme.textSecondary }}>
                Category
              </p>
              <p className="text-xl font-bold" style={{ color: theme.textPrimary }}>
                {project.category}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Information */}
            <Card 
              className="border hover:shadow-lg transition-shadow"
              style={{ 
                backgroundColor: theme.cardBackground,
                borderColor: theme.cardBorder
              }}
            >
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ color: theme.textPrimary }}>
                  <FileText className="h-5 w-5" />
                  Project Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Building2 className="h-4 w-4" style={{ color: theme.textSecondary }} />
                        <p className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                          Department
                        </p>
                      </div>
                      <p className="text-base font-semibold pl-6" style={{ color: theme.textPrimary }}>
                        {project.department}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4" style={{ color: theme.textSecondary }} />
                        <p className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                          Location
                        </p>
                      </div>
                      <p className="text-base font-semibold pl-6" style={{ color: theme.textPrimary }}>
                        {project.location}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4" style={{ color: theme.textSecondary }} />
                        <p className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                          Constituency
                        </p>
                      </div>
                      <p className="text-base font-semibold pl-6" style={{ color: theme.textPrimary }}>
                        {project.constituency}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4" style={{ color: theme.textSecondary }} />
                        <p className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                          Funding Source
                        </p>
                      </div>
                      <p className="text-base font-semibold pl-6" style={{ color: theme.textPrimary }}>
                        {project.fundingSource}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="h-4 w-4" style={{ color: theme.textSecondary }} />
                        <p className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                          Proposed Contractor
                        </p>
                      </div>
                      <p className="text-base font-semibold pl-6" style={{ color: theme.textPrimary }}>
                        {project.proposedContractor}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4" style={{ color: theme.textSecondary }} />
                        <p className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                          Submitted Date
                        </p>
                      </div>
                      <p className="text-base font-semibold pl-6" style={{ color: theme.textPrimary }}>
                        {formatDate(project.submittedDate)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Justification */}
            <Card 
              className="border hover:shadow-lg transition-shadow"
              style={{ 
                backgroundColor: theme.cardBackground,
                borderColor: theme.cardBorder
              }}
            >
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: theme.textPrimary }}>
                  <AlertCircle className="h-5 w-5" />
                  Project Justification
                </h2>
                <div 
                  className="p-4 rounded-lg border-l-4"
                  style={{ 
                    backgroundColor: theme.backgroundSecondary,
                    borderLeftColor: "#3b82f6"
                  }}
                >
                  <p className="text-base leading-relaxed" style={{ color: theme.textPrimary }}>
                    {project.justification}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <Card 
              className="border-2 hover:shadow-xl transition-all"
              style={{ 
                backgroundColor: theme.cardBackground,
                borderColor: statusColor.bg
              }}
            >
              <CardContent className="p-6">
                <div 
                  className="h-16 w-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: statusColor.light }}
                >
                  <StatusIcon className="h-8 w-8" style={{ color: statusColor.bg }} />
                </div>
                <h3 className="text-center text-lg font-bold mb-2" style={{ color: theme.textPrimary }}>
                  Current Status
                </h3>
                <Badge 
                  className="w-full justify-center py-2 text-sm font-semibold"
                  style={{ 
                    backgroundColor: statusColor.bg,
                    color: "#ffffff"
                  }}
                >
                  {project.status}
                </Badge>
              </CardContent>
            </Card>

            {/* Priority Card */}
            <Card 
              className={`border-2 hover:shadow-xl transition-all bg-gradient-to-br ${priorityColor.gradient} text-white`}
            >
              <CardContent className="p-6">
                <div className="h-16 w-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-white/20 backdrop-blur-sm">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="text-center text-lg font-bold mb-2">
                  Priority Level
                </h3>
                <p className="text-center text-2xl font-bold">
                  {project.priority}
                </p>
                <Progress value={75} className="mt-4 h-2 bg-white/30" />
              </CardContent>
            </Card>

            {/* Submission Details */}
            <Card 
              className="border hover:shadow-lg transition-shadow"
              style={{ 
                backgroundColor: theme.cardBackground,
                borderColor: theme.cardBorder
              }}
            >
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: theme.textPrimary }}>
                  <User className="h-5 w-5" />
                  Submission Details
                </h3>
                <Separator className="mb-4" style={{ backgroundColor: theme.border }} />
                
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-medium mb-1" style={{ color: theme.textSecondary }}>
                      Submitted By
                    </p>
                    <p className="text-sm font-semibold" style={{ color: theme.textPrimary }}>
                      {project.submittedBy}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium mb-1" style={{ color: theme.textSecondary }}>
                      Submission Date
                    </p>
                    <p className="text-sm font-semibold" style={{ color: theme.textPrimary }}>
                      {formatDate(project.submittedDate)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Impact Metrics */}
            <Card 
              className="border hover:shadow-lg transition-shadow bg-gradient-to-br from-purple-50 to-pink-50"
              style={{ 
                borderColor: theme.cardBorder
              }}
            >
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-purple-900">
                  <TrendingUp className="h-5 w-5" />
                  Impact Metrics
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-purple-700">Beneficiaries</span>
                    <span className="text-lg font-bold text-purple-900">
                      {project.estimatedBeneficiaries?.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <Progress 
                    value={Math.min((project.estimatedBeneficiaries || 0) / 1000, 100)} 
                    className="h-2"
                  />

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm font-medium text-purple-700">Budget Efficiency</span>
                    <span className="text-lg font-bold text-purple-900">
                      ₹{Math.round((project.requestedBudget / (project.estimatedBeneficiaries || 1)))}/person
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <Card 
          className="mt-8 border-2"
          style={{ 
            backgroundColor: theme.cardBackground,
            borderColor: theme.cardBorder
          }}
        >
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-4" style={{ color: theme.textPrimary }}>
              Review Actions
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-green-600 hover:bg-green-700 text-white flex-1 sm:flex-none">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Approve Project
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white flex-1 sm:flex-none">
                <FileText className="mr-2 h-4 w-4" />
                Request Revision
              </Button>
              <Button className="bg-red-600 hover:bg-red-700 text-white flex-1 sm:flex-none">
                <XCircle className="mr-2 h-4 w-4" />
                Reject Project
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
