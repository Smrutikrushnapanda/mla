"use client"

import { useState } from "react"
import { ArrowLeft, User, Phone, Mail, MapPin, FileText, ImageIcon, Calendar, Shield, Download, Share2, Printer, AlertCircle, CheckCircle, Clock, MessageSquare, Paperclip, ChevronDown, ChevronUp, Eye, ZoomIn } from "lucide-react"
import { useThemeStore } from "@/store/useThemeStore"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function GrievanceDetailPage() {
  const { theme, mode } = useThemeStore() // Changed from isDarkMode to mode
  const isDarkMode = mode === "dark" // Added this line
  const router = useRouter()
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("details")

  // FIXED: Tab color function - uses isDarkMode
  const getTabColor = (tabName: string) => {
    if (activeTab === tabName) {
      return isDarkMode ? "#60a5fa" : "#2563eb" // Active tab: Bright blue
    }
    return isDarkMode ? "#9ca3af" : "#6b7280" // Inactive tab: Gray
  }

  // 🔹 Enhanced MOCK DATA
  const grievance = {
    grievanceNumber: "GRV-2025-0002",
    status: "In Progress",
    priority: "High",
    createdAt: "12 Jan 2025, 02:15 PM",
    updatedAt: "14 Jan 2025, 10:30 AM",
    actionDate: "15 Jan 2025, 11:00 AM",
    resolutionDeadline: "20 Jan 2025",
    progress: 60,

    citizen: {
      name: "Sita Devi",
      mobile: "9123456780",
      email: "sita@example.com",
      constituency: "East Constituency",
      ward: "Ward 12",
      address: "Near Water Tank, Gandhi Nagar, Ward 12",
      aadhaar: "XXXX-XXXX-5678",
      previousGrievances: 3,
    },

    grievanceDetails: {
      title: "Irregular water supply with low pressure issues",
      category: "Water Supply",
      subCategory: "Irregular Supply",
      department: "Public Works Department",
      description: `Water supply has been very irregular for the past two weeks. Residents are facing serious issues with daily chores. The water pressure is extremely low during peak hours (7-9 AM and 6-8 PM), making it difficult to fill overhead tanks. Additionally, the water appears slightly muddy on occasions.

The issue started after the maintenance work on the main pipeline near Gandhi Chowk. Multiple complaints from neighbors have been registered but no concrete action has been taken yet.

We request immediate inspection and resolution of this issue as it's affecting over 50 households in our area.`,
      attachments: {
        images: [
          "https://images.unsplash.com/photo-1566404791232-af9fe0ae42b1?w=800&q=80",
          "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800&q=80",
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
        ],
        documents: ["complaint_letter.pdf", "water_bill.pdf"],
      },
    },

    timeline: [
      { date: "12 Jan, 02:15 PM", action: "Grievance Registered", status: "completed", actor: "System" },
      { date: "12 Jan, 04:30 PM", action: "Forwarded to PWD", status: "completed", actor: "Admin Officer" },
      { date: "13 Jan, 10:00 AM", action: "Field Inspection Assigned", status: "completed", actor: "PWD Dept" },
      { date: "14 Jan, 02:00 PM", action: "Inspection Completed", status: "completed", actor: "Field Staff" },
      { date: "Today, 11:00 AM", action: "Work Order Issued", status: "in-progress", actor: "PWD Dept" },
      { date: "18 Jan, 09:00 AM", action: "Resolution Expected", status: "pending", actor: "System" },
    ],

    admin: {
      assignedTo: "Rajesh Kumar (Field Staff)",
      department: "Public Works Department",
      officerContact: "9876543210",
      lastUpdatedBy: "Admin Officer",
      remarks: "Pipeline repair work order has been issued. Expected completion in 2 days.",
    },

    similarGrievances: [
      { id: "GRV-2025-0001", title: "Water leakage in main pipeline", status: "Resolved" },
      { id: "GRV-2024-0123", title: "Low water pressure issue", status: "In Progress" },
      { id: "GRV-2024-0115", title: "Water contamination complaint", status: "Resolved" },
    ],
  }

  const statusColors: Record<string, string> = {
    "Resolved": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    "In Progress": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    "Pending": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    "Closed": "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
  }

  const priorityColors: Record<string, string> = {
    "High": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    "Medium": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
    "Low": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  }

  const handleDownload = () => {
    alert("Downloading grievance details...")
  }

  const handlePrint = () => {
    window.print()
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Grievance: ${grievance.grievanceNumber}`,
        text: `Check this grievance: ${grievance.grievanceDetails.title}`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  const handleUpdateStatus = (newStatus: string) => {
    alert(`Status updated to: ${newStatus}`)
  }

  return (
    <div
      className="min-h-screen p-4 md:p-6 space-y-6 print:p-0"
      style={{ background: theme.backgroundGradient }}
    >
      {/* HEADER WITH ACTIONS - FIXED BUTTON COLORS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => router.back()}
            style={{
              borderColor: theme.border,
              color: isDarkMode ? "#ffffff" : "#000000", // FIXED: Direct color values
            }}
            className="hover:bg-opacity-20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div>
            <div className="flex items-center gap-3">
              <h1
                className="text-2xl font-bold"
                style={{ color: theme.textPrimary }}
              >
                Grievance Details
              </h1>
              <div className="flex gap-2">
                <Badge className={statusColors[grievance.status]}>
                  {grievance.status}
                </Badge>
                <Badge className={priorityColors[grievance.priority]}>
                  {grievance.priority} Priority
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-1">
              <p className="text-sm font-mono" style={{ color: theme.textSecondary }}>
                {grievance.grievanceNumber}
              </p>
              <span className="text-xs px-2 py-1 rounded-full" style={{ 
                backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                color: theme.textSecondary
              }}>
                {grievance.grievanceDetails.category}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            style={{
              borderColor: theme.border,
              color: isDarkMode ? "#ffffff" : "#000000", // FIXED: Direct color values
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
              color: isDarkMode ? "#ffffff" : "#000000", // FIXED: Direct color values
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
              color: isDarkMode ? "#ffffff" : "#000000", // FIXED: Direct color values
            }}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="default"
                size="sm"
                style={{
                  backgroundColor: theme.primary,
                  color: isDarkMode ? "white" : "black",
                }}
              >
                Update Status
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className={isDarkMode ? "bg-gray-900 text-white border-gray-700" : " bg-black text-white"}>
              <DropdownMenuItem 
                onClick={() => handleUpdateStatus("In Progress")}
                className={isDarkMode ? "hover:bg-gray-800 focus:bg-gray-800" : ""}
              >
                <Clock className="h-4 w-4 mr-2" />
                Mark as In Progress
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleUpdateStatus("Resolved")}
                className={isDarkMode ? "hover:bg-gray-800 focus:bg-gray-800" : ""}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark as Resolved
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleUpdateStatus("Pending")}
                className={isDarkMode ? "hover:bg-gray-800 focus:bg-gray-800" : ""}
              >
                <AlertCircle className="h-4 w-4 mr-2" />
                Mark as Pending
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <Card style={{ background: theme.cardBackground, borderColor: theme.border }} className="print:hidden">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium" style={{ color: theme.textSecondary }}>
              Resolution Progress
            </span>
            <span className="text-sm font-bold" style={{ color: theme.primary }}>
              {grievance.progress}%
            </span>
          </div>
          <Progress value={grievance.progress} className="h-2" style={{ backgroundColor: `${theme.border}40` }} />
          <div className="flex justify-between mt-2">
            <span className="text-xs" style={{ color: theme.textTertiary }}>Created: {grievance.createdAt}</span>
            <span className="text-xs" style={{ color: theme.textTertiary }}>Deadline: {grievance.resolutionDeadline}</span>
          </div>
        </CardContent>
      </Card>

      {/* TABS NAVIGATION - FIXED STYLING */}
      <div className="print:hidden">
        <div className="border-b" style={{ borderColor: theme.border }}>
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab("details")}
              className={`px-4 py-3 text-sm font-medium transition-all duration-200 relative flex items-center gap-2 ${
                activeTab === "details" 
                  ? "font-semibold" 
                  : "hover:opacity-80"
              }`}
              style={{
                color: getTabColor("details"), // Uses getTabColor function
              }}
            >
              <FileText className="h-4 w-4" />
              Details
              {activeTab === "details" && (
                <>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: getTabColor("details") }} />
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 rounded-full" style={{ backgroundColor: getTabColor("details") }} />
                </>
              )}
            </button>
            <button
              onClick={() => setActiveTab("timeline")}
              className={`px-4 py-3 text-sm font-medium transition-all duration-200 relative flex items-center gap-2 ${
                activeTab === "timeline" 
                  ? "font-semibold" 
                  : "hover:opacity-80"
              }`}
              style={{
                color: getTabColor("timeline"), // Uses getTabColor function
              }}
            >
              <Calendar className="h-4 w-4" />
              Timeline
              {activeTab === "timeline" && (
                <>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: getTabColor("timeline") }} />
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 rounded-full" style={{ backgroundColor: getTabColor("timeline") }} />
                </>
              )}
            </button>
            <button
              onClick={() => setActiveTab("attachments")}
              className={`px-4 py-3 text-sm font-medium transition-all duration-200 relative flex items-center gap-2 ${
                activeTab === "attachments" 
                  ? "font-semibold" 
                  : "hover:opacity-80"
              }`}
              style={{
                color: getTabColor("attachments"), // Uses getTabColor function
              }}
            >
              <Paperclip className="h-4 w-4" />
              Attachments
              {activeTab === "attachments" && (
                <>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: getTabColor("attachments") }} />
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-0.5 rounded-full" style={{ backgroundColor: getTabColor("attachments") }} />
                </>
              )}
            </button>
            <button
              onClick={() => setActiveTab("related")}
              className={`px-4 py-3 text-sm font-medium transition-all duration-200 relative flex items-center gap-2 ${
                activeTab === "related" 
                  ? "font-semibold" 
                  : "hover:opacity-80"
              }`}
              style={{
                color: getTabColor("related"), // Uses getTabColor function
              }}
            >
              <AlertCircle className="h-4 w-4" />
              Related Cases
              {activeTab === "related" && (
                <>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: getTabColor("related") }} />
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-0.5 rounded-full" style={{ backgroundColor: getTabColor("related") }} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* DETAILS TAB */}
        {activeTab === "details" && (
          <div className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* LEFT COLUMN */}
              <div className="space-y-6 lg:col-span-2">
                {/* GRIEVANCE INFO */}
                <Card style={{ background: theme.cardBackground, borderColor: theme.border }}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2" style={{ color: theme.textPrimary }}>
                      <FileText className="h-5 w-5" />
                      Grievance Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Title</Label>
                        <Value>{grievance.grievanceDetails.title}</Value>
                      </div>
                      <div>
                        <Label>Category</Label>
                        <Value>{grievance.grievanceDetails.category}</Value>
                      </div>
                      <div>
                        <Label>Sub-Category</Label>
                        <Value>{grievance.grievanceDetails.subCategory}</Value>
                      </div>
                      <div>
                        <Label>Department</Label>
                        <Value>{grievance.grievanceDetails.department}</Value>
                      </div>
                    </div>

                    <Separator style={{ backgroundColor: theme.border }} />

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label>Description</Label>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                          style={{ color: theme.textTertiary }}
                        >
                          {isDescriptionExpanded ? (
                            <>
                              Show Less <ChevronUp className="h-4 w-4 ml-1" />
                            </>
                          ) : (
                            <>
                              Show More <ChevronDown className="h-4 w-4 ml-1" />
                            </>
                          )}
                        </Button>
                      </div>
                      <p
                        className={`text-sm leading-relaxed ${isDescriptionExpanded ? "" : "line-clamp-3"}`}
                        style={{ color: theme.textPrimary }}
                      >
                        {grievance.grievanceDetails.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* IMAGES PREVIEW */}
                <Card style={{ background: theme.cardBackground, borderColor: theme.border }}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2" style={{ color: theme.textPrimary }}>
                      <ImageIcon className="h-5 w-5" />
                      Uploaded Images ({grievance.grievanceDetails.attachments.images.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {grievance.grievanceDetails.attachments.images.map((img, i) => (
                        <div
                          key={i}
                          className="relative group cursor-pointer rounded-lg overflow-hidden border"
                          style={{ borderColor: theme.border }}
                          onClick={() => setSelectedImage(img)}
                        >
                          <div className="aspect-video relative">
                            <Image
                              src={img}
                              alt={`Grievance evidence ${i + 1}`}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-200"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200" />
                          </div>
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button size="icon" variant="secondary" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-6">
                {/* CITIZEN INFO */}
                <Card style={{ background: theme.cardBackground, borderColor: theme.border }}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2" style={{ color: theme.textPrimary }}>
                      <User className="h-5 w-5" />
                      Citizen Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <Info icon={User} label="Name" value={grievance.citizen.name} />
                    <Info icon={Phone} label="Mobile" value={grievance.citizen.mobile} />
                    <Info icon={Mail} label="Email" value={grievance.citizen.email} />
                    <Info icon={MapPin} label="Constituency" value={grievance.citizen.constituency} />
                    <Info icon={MapPin} label="Ward" value={grievance.citizen.ward} />
                    <Info icon={Shield} label="Aadhaar" value={grievance.citizen.aadhaar} />
                    <div className="pt-2 border-t" style={{ borderColor: theme.border }}>
                      <Info icon={AlertCircle} label="Previous Grievances" value={grievance.citizen.previousGrievances.toString()} />
                    </div>
                  </CardContent>
                </Card>

                {/* ADMIN INFO */}
                <Card style={{ background: theme.cardBackground, borderColor: theme.border }}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2" style={{ color: theme.textPrimary }}>
                      <Shield className="h-5 w-5" />
                      Administrative Info
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <Info icon={Calendar} label="Created On" value={grievance.createdAt} />
                    <Info icon={Calendar} label="Updated On" value={grievance.updatedAt} />
                    <Info icon={Calendar} label="Action Date" value={grievance.actionDate} />
                    <Info icon={User} label="Assigned To" value={grievance.admin.assignedTo} />
                    <Info icon={Shield} label="Department" value={grievance.admin.department} />
                    <Info icon={Phone} label="Officer Contact" value={grievance.admin.officerContact} />
                    <div className="pt-2 border-t" style={{ borderColor: theme.border }}>
                      <div className="flex items-start gap-2">
                        <MessageSquare className="h-4 w-4 mt-0.5" style={{ color: theme.textTertiary }} />
                        <div>
                          <p className="text-xs" style={{ color: theme.textSecondary }}>
                            Remarks
                          </p>
                          <p style={{ color: theme.textPrimary }} className="text-sm">
                            {grievance.admin.remarks}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* TIMELINE TAB */}
        {activeTab === "timeline" && (
          <div className="space-y-6 mt-6">
            <Card style={{ background: theme.cardBackground, borderColor: theme.border }}>
              <CardContent className="pt-6">
                <div className="relative">
                  {grievance.timeline.map((item, index) => (
                    <div key={index} className="flex gap-4 pb-6 last:pb-0">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${item.status === "completed" ? "bg-green-500" : item.status === "in-progress" ? "bg-blue-500 animate-pulse" : "bg-gray-300 dark:bg-gray-600"}`} />
                        {index < grievance.timeline.length - 1 && (
                          <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700 mt-3" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <p style={{ color: theme.textPrimary }} className="font-medium">
                            {item.action}
                          </p>
                          <span className="text-sm" style={{ color: theme.textSecondary }}>
                            {item.date}
                          </span>
                        </div>
                        <p className="text-sm mt-1" style={{ color: theme.textTertiary }}>
                          By: {item.actor}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ATTACHMENTS TAB */}
        {activeTab === "attachments" && (
          <div className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card style={{ background: theme.cardBackground, borderColor: theme.border }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2" style={{ color: theme.textPrimary }}>
                    <ImageIcon className="h-5 w-5" />
                    Images ({grievance.grievanceDetails.attachments.images.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {grievance.grievanceDetails.attachments.images.map((img, i) => (
                      <div key={i} className="relative aspect-square rounded-lg overflow-hidden border group cursor-pointer" style={{ borderColor: theme.border }}>
                        <Image
                          src={img}
                          alt={`Evidence ${i + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center">
                          <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card style={{ background: theme.cardBackground, borderColor: theme.border }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2" style={{ color: theme.textPrimary }}>
                    <FileText className="h-5 w-5" />
                    Documents ({grievance.grievanceDetails.attachments.documents.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {grievance.grievanceDetails.attachments.documents.map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border" style={{ 
                      borderColor: theme.border, 
                      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)' 
                    }}>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded" style={{ backgroundColor: `${theme.primary}20` }}>
                          <FileText className="h-5 w-5" style={{ color: theme.primary }} />
                        </div>
                        <div>
                          <p style={{ color: theme.textPrimary }} className="font-medium">
                            {doc}
                          </p>
                          <p className="text-xs" style={{ color: theme.textTertiary }}>
                            PDF Document • 1.2 MB
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" style={{ color: isDarkMode ? "#ffffff" : "#000000" }}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* RELATED CASES TAB */}
        {activeTab === "related" && (
          <div className="space-y-6 mt-6">
            <Card style={{ background: theme.cardBackground, borderColor: theme.border }}>
              <CardHeader>
                <CardTitle style={{ color: theme.textPrimary }}>Similar Grievances</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {grievance.similarGrievances.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border" style={{ 
                      borderColor: theme.border,
                      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)' 
                    }}>
                      <div>
                        <p style={{ color: theme.textPrimary }} className="font-medium">
                          {item.title}
                        </p>
                        <p className="text-sm" style={{ color: theme.textSecondary }}>
                          {item.id}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={statusColors[item.status]}>{item.status}</Badge>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => router.push(`/grievances/${item.id}`)}
                          style={{ color: isDarkMode ? "#ffffff" : "#000000" }}
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* IMAGE MODAL */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-4xl max-h-[90vh]">
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-10 right-0 text-white hover:bg-white/20"
              onClick={() => setSelectedImage(null)}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <Image
              src={selectedImage}
              alt="Enlarged view"
              width={1200}
              height={800}
              className="rounded-lg object-contain max-h-[80vh]"
            />
          </div>
        </div>
      )}

      {/* PRINT VIEW */}
      <div className="hidden print:block">
        <PrintView grievance={grievance} />
      </div>
    </div>
  )
}

function Info({
  icon: Icon,
  label,
  value,
}: {
  icon: any
  label: string
  value: string
}) {
  const { theme } = useThemeStore()
  
  return (
    <div className="flex items-start gap-2">
      <Icon className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: theme.textTertiary }} />
      <div className="min-w-0">
        <p className="text-xs font-medium" style={{ color: theme.textSecondary }}>
          {label}
        </p>
        <p style={{ color: theme.textPrimary }} className="truncate">{value}</p>
      </div>
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore()
  
  return (
    <p className="text-sm font-medium mb-1" style={{ color: theme.textSecondary }}>
      {children}
    </p>
  )
}

function Value({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore()
  
  return (
    <p style={{ color: theme.textPrimary }} className="text-sm">
      {children}
    </p>
  )
}

function PrintView({ grievance }: { grievance: any }) {
  return (
    <div className="p-8 space-y-6">
      <div className="text-center border-b pb-4">
        <h1 className="text-2xl font-bold">Grievance Details</h1>
        <div className="flex justify-center gap-4 mt-2">
          <p className="text-sm font-mono">{grievance.grievanceNumber}</p>
          <span className="text-sm px-2 py-1 rounded-full bg-gray-100">
            {grievance.grievanceDetails.category}
          </span>
          <span className="text-sm px-2 py-1 rounded-full bg-yellow-100">
            {grievance.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="font-bold text-lg mb-3">Grievance Information</h2>
          <p><strong>Title:</strong> {grievance.grievanceDetails.title}</p>
          <p><strong>Category:</strong> {grievance.grievanceDetails.category}</p>
          <p><strong>Description:</strong> {grievance.grievanceDetails.description}</p>
        </div>

        <div>
          <h2 className="font-bold text-lg mb-3">Citizen Details</h2>
          <p><strong>Name:</strong> {grievance.citizen.name}</p>
          <p><strong>Mobile:</strong> {grievance.citizen.mobile}</p>
          <p><strong>Address:</strong> {grievance.citizen.address}</p>
        </div>
      </div>

      <div>
        <h2 className="font-bold text-lg mb-3">Timeline</h2>
        {grievance.timeline.map((item: any, index: number) => (
          <div key={index} className="flex gap-4 mb-2">
            <span className="text-sm min-w-24">{item.date}</span>
            <span>{item.action}</span>
          </div>
        ))}
      </div>

      <div className="text-xs text-gray-500 mt-8 pt-4 border-t">
        <p>Generated on: {new Date().toLocaleDateString()}</p>
        <p>This is an official document of the Grievance Redressal System</p>
      </div>
    </div>
  )
}