// app/(protected)/mla/AddProject/page.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useThemeStore } from "@/store/useThemeStore"
import { toast } from "sonner"
import { ArrowLeft, Upload, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AddProjectPage() {
  const { theme } = useThemeStore()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [attachments, setAttachments] = useState<File[]>([])
  
  const [formData, setFormData] = useState({
    projectName: "",
    category: "",
    department: "",
    description: "",
    location: "",
    gpName: "",
    estimatedBudget: "",
    sanctionedBudget: "",
    startDate: "",
    expectedEndDate: "",
    beneficiaries: "",
    status: "Planned",
    priority: "Medium",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setAttachments(prev => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.projectName.trim()) {
      newErrors.projectName = "Project name is required"
    }
    if (!formData.category) {
      newErrors.category = "Category is required"
    }
    if (!formData.department) {
      newErrors.department = "Department is required"
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }
    if (!formData.location.trim()) {
      newErrors.location = "Location is required"
    }
    if (!formData.estimatedBudget) {
      newErrors.estimatedBudget = "Estimated budget is required"
    }
    if (!formData.startDate) {
      newErrors.startDate = "Start date is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Project data:", formData)
      console.log("Attachments:", attachments)
      toast.success("Project added successfully!")
      router.push("/mla/project-management")
    } catch (error) {
      toast.error("Failed to add project")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/mla/project-management">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 
            className="text-3xl font-bold"
            style={{ color: theme.textPrimary }}
          >
            Add New Project
          </h1>
          <p 
            className="mt-1"
            style={{ color: theme.textSecondary }}
          >
            Create a new project for Korei Constituency
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card
          className="shadow-lg"
          style={{
            backgroundColor: theme.cardBackground,
            borderColor: theme.border,
          }}
        >
          <CardHeader>
            <CardTitle style={{ color: theme.textPrimary }}>
              Basic Information
            </CardTitle>
            <CardDescription style={{ color: theme.textSecondary }}>
              Enter the basic details of the project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Project Name */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="projectName" style={{ color: theme.textPrimary }}>
                  Project Name *
                </Label>
                <Input
                  id="projectName"
                  value={formData.projectName}
                  onChange={(e) => handleInputChange("projectName", e.target.value)}
                  placeholder="e.g., Road Construction in Badakotha"
                  style={{
                    backgroundColor: theme.backgroundSecondary,
                    borderColor: errors.projectName ? "#ef4444" : theme.border,
                    color: theme.textPrimary,
                  }}
                />
                {errors.projectName && (
                  <p className="text-sm text-red-500">{errors.projectName}</p>
                )}
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category" style={{ color: theme.textPrimary }}>
                  Project Category *
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleInputChange("category", value)}
                >
                 <SelectTrigger
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: errors.category ? "#ef4444" : theme.border,
                      color: theme.textPrimary,
                    }}
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: theme.border,
                    }}
                  >
                    <SelectItem value="Road Infrastructure">Road Infrastructure</SelectItem>
                    <SelectItem value="Water Supply & Sanitation">Water Supply & Sanitation</SelectItem>
                    <SelectItem value="Primary Health Centers">Primary Health Centers</SelectItem>
                    <SelectItem value="School Infrastructure">School Infrastructure</SelectItem>
                    <SelectItem value="Street Lighting">Street Lighting</SelectItem>
                    <SelectItem value="Irrigation Projects">Irrigation Projects</SelectItem>
                    <SelectItem value="Agricultural Support">Agricultural Support</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-red-500">{errors.category}</p>
                )}
              </div>

              {/* Department */}
              <div className="space-y-2">
                <Label htmlFor="department" style={{ color: theme.textPrimary }}>
                  Department *
                </Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => handleInputChange("department", value)}
                >
                 <SelectTrigger
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: errors.department ? "#ef4444" : theme.border,
                      color: theme.textPrimary,
                    }}
                  >
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: theme.border,
                    }}
                  >
                    <SelectItem value="Rural Development">Rural Development</SelectItem>
                    <SelectItem value="Public Works">Public Works</SelectItem>
                    <SelectItem value="Health & Family Welfare">Health & Family Welfare</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Water Resources">Water Resources</SelectItem>
                    <SelectItem value="Agriculture">Agriculture</SelectItem>
                  </SelectContent>
                </Select>
                {errors.department && (
                  <p className="text-sm text-red-500">{errors.department}</p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description" style={{ color: theme.textPrimary }}>
                  Project Description *
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Enter detailed project description"
                  rows={4}
                  style={{
                    backgroundColor: theme.backgroundSecondary,
                    borderColor: errors.description ? "#ef4444" : theme.border,
                    color: theme.textPrimary,
                  }}
                />
                {errors.description && (
                  <p className="text-sm text-red-500">{errors.description}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location Details */}
        <Card
          className="shadow-lg"
          style={{
            backgroundColor: theme.cardBackground,
            borderColor: theme.border,
          }}
        >
          <CardHeader>
            <CardTitle style={{ color: theme.textPrimary }}>
              Location Details
            </CardTitle>
            <CardDescription style={{ color: theme.textSecondary }}>
              Specify where the project will be implemented
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" style={{ color: theme.textPrimary }}>
                  Village/Area *
                </Label>
                <Select
                  value={formData.location}
                  onValueChange={(value) => handleInputChange("location", value)}
                >
                 <SelectTrigger
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: errors.location ? "#ef4444" : theme.border,
                      color: theme.textPrimary,
                    }}
                  >
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: theme.border,
                    }}
                  >
                    <SelectItem value="Badakotha">Badakotha</SelectItem>
                    <SelectItem value="Korei Market">Korei Market</SelectItem>
                    <SelectItem value="Nuagaon">Nuagaon</SelectItem>
                    <SelectItem value="Hatapada">Hatapada</SelectItem>
                    <SelectItem value="Jharbandh">Jharbandh</SelectItem>
                    <SelectItem value="Bansapal">Bansapal</SelectItem>
                    <SelectItem value="Telkoi">Telkoi</SelectItem>
                    <SelectItem value="Ghasipura">Ghasipura</SelectItem>
                  </SelectContent>
                </Select>
                {errors.location && (
                  <p className="text-sm text-red-500">{errors.location}</p>
                )}
              </div>

              {/* GP Name */}
              <div className="space-y-2">
                <Label htmlFor="gpName" style={{ color: theme.textPrimary }}>
                  Gram Panchayat
                </Label>
                <Select
                  value={formData.gpName}
                  onValueChange={(value) => handleInputChange("gpName", value)}
                >
                 <SelectTrigger
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: theme.border,
                      color: theme.textPrimary,
                    }}
                  >
                    <SelectValue placeholder="Select GP" />
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: theme.border,
                    }}
                  >
                    <SelectItem value="Badakotha GP">Badakotha GP</SelectItem>
                    <SelectItem value="Korei GP">Korei GP</SelectItem>
                    <SelectItem value="Nuagaon GP">Nuagaon GP</SelectItem>
                    <SelectItem value="Hatapada GP">Hatapada GP</SelectItem>
                    <SelectItem value="Jharbandh GP">Jharbandh GP</SelectItem>
                    <SelectItem value="Bansapal GP">Bansapal GP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Budget & Timeline */}
        <Card
          className="shadow-lg"
          style={{
            backgroundColor: theme.cardBackground,
            borderColor: theme.border,
          }}
        >
          <CardHeader>
            <CardTitle style={{ color: theme.textPrimary }}>
              Budget & Timeline
            </CardTitle>
            <CardDescription style={{ color: theme.textSecondary }}>
              Financial and time-related information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Estimated Budget */}
              <div className="space-y-2">
                <Label htmlFor="estimatedBudget" style={{ color: theme.textPrimary }}>
                  Estimated Budget (₹) *
                </Label>
                <Input
                  id="estimatedBudget"
                  type="number"
                  value={formData.estimatedBudget}
                  onChange={(e) => handleInputChange("estimatedBudget", e.target.value)}
                  placeholder="e.g., 5000000"
                  style={{
                    backgroundColor: theme.backgroundSecondary,
                    borderColor: errors.estimatedBudget ? "#ef4444" : theme.border,
                    color: theme.textPrimary,
                  }}
                />
                {errors.estimatedBudget && (
                  <p className="text-sm text-red-500">{errors.estimatedBudget}</p>
                )}
              </div>

              {/* Sanctioned Budget */}
              <div className="space-y-2">
                <Label htmlFor="sanctionedBudget" style={{ color: theme.textPrimary }}>
                  Sanctioned Budget (₹)
                </Label>
                <Input
                  id="sanctionedBudget"
                  type="number"
                  value={formData.sanctionedBudget}
                  onChange={(e) => handleInputChange("sanctionedBudget", e.target.value)}
                  placeholder="e.g., 4500000"
                  style={{
                    backgroundColor: theme.backgroundSecondary,
                    borderColor: theme.border,
                    color: theme.textPrimary,
                  }}
                />
              </div>

              {/* Start Date */}
              <div className="space-y-2">
                <Label htmlFor="startDate" style={{ color: theme.textPrimary }}>
                  Start Date *
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                  style={{
                    backgroundColor: theme.backgroundSecondary,
                    borderColor: errors.startDate ? "#ef4444" : theme.border,
                    color: theme.textPrimary,
                  }}
                />
                {errors.startDate && (
                  <p className="text-sm text-red-500">{errors.startDate}</p>
                )}
              </div>

              {/* Expected End Date */}
              <div className="space-y-2">
                <Label htmlFor="expectedEndDate" style={{ color: theme.textPrimary }}>
                  Expected End Date
                </Label>
                <Input
                  id="expectedEndDate"
                  type="date"
                  value={formData.expectedEndDate}
                  onChange={(e) => handleInputChange("expectedEndDate", e.target.value)}
                  style={{
                    backgroundColor: theme.backgroundSecondary,
                    borderColor: theme.border,
                    color: theme.textPrimary,
                  }}
                />
              </div>

              {/* Beneficiaries */}
              <div className="space-y-2">
                <Label htmlFor="beneficiaries" style={{ color: theme.textPrimary }}>
                  Number of Beneficiaries
                </Label>
                <Input
                  id="beneficiaries"
                  type="number"
                  value={formData.beneficiaries}
                  onChange={(e) => handleInputChange("beneficiaries", e.target.value)}
                  placeholder="e.g., 500"
                  style={{
                    backgroundColor: theme.backgroundSecondary,
                    borderColor: theme.border,
                    color: theme.textPrimary,
                  }}
                />
              </div>

              {/* Priority */}
              <div className="space-y-2">
                <Label htmlFor="priority" style={{ color: theme.textPrimary }}>
                  Priority
                </Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => handleInputChange("priority", value)}
                >
                 <SelectTrigger
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: theme.border,
                      color: theme.textPrimary,
                    }}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: theme.border,
                    }}
                  >
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="status" style={{ color: theme.textPrimary }}>
                  Project Status
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleInputChange("status", value)}
                >
                 <SelectTrigger
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: theme.border,
                      color: theme.textPrimary,
                    }}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: theme.border,
                    }}
                  >
                    <SelectItem value="Planned">Planned</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="On Hold">On Hold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attachments */}
        <Card
          className="shadow-lg"
          style={{
            backgroundColor: theme.cardBackground,
            borderColor: theme.border,
          }}
        >
          <CardHeader>
            <CardTitle style={{ color: theme.textPrimary }}>
              Attachments
            </CardTitle>
            <CardDescription style={{ color: theme.textSecondary }}>
              Upload relevant documents (proposals, estimates, etc.)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="attachments" style={{ color: theme.textPrimary }}>
                Upload Files
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="attachments"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("attachments")?.click()}
                  style={{ background: theme.success ,color:theme.textPrimary}}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Choose Files
                </Button>
              </div>

              {/* File List */}
              {attachments.length > 0 && (
                <div className="mt-4 space-y-2">
                  {attachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-md border"
                      style={{
                        backgroundColor: theme.backgroundSecondary,
                        borderColor: theme.border,
                      }}
                    >
                      <span 
                        className="text-sm truncate"
                        style={{ color: theme.textPrimary }}
                      >
                        {file.name}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Link href="/mla/project-category">
            <Button type="button" variant="outline" style={{
              background: theme.danger,
              color: theme.textPrimary,
            }}>
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={isSubmitting}style={{
              background: theme.buttonPrimary.bg,
              color: theme.buttonPrimary.text,
            }}>
            {isSubmitting ? "Adding Project..." : "Add Project"}
          </Button>
        </div>
      </form>
    </div>
  )
}