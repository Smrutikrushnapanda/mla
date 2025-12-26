// app/(protected)/mla/manage-category/my-voice-category/add/page.tsx
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
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AddMyVoiceCategoryPage() {
  const { theme } = useThemeStore()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    categoryName: "",
    description: "",
    priority: "Medium",
    allowedFormats: [] as string[],
    autoPublish: "No",
    moderationRequired: "Yes",
    maxQuestionLength: "500",
    status: "Active"
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

  const handleFormatToggle = (format: string) => {
    setFormData(prev => {
      const formats = prev.allowedFormats.includes(format)
        ? prev.allowedFormats.filter(f => f !== format)
        : [...prev.allowedFormats, format]
      return { ...prev, allowedFormats: formats }
    })
    if (errors.allowedFormats) {
      setErrors(prev => ({ ...prev, allowedFormats: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.categoryName.trim()) {
      newErrors.categoryName = "Category name is required"
    } else if (formData.categoryName.length < 3) {
      newErrors.categoryName = "Category name must be at least 3 characters"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    } else if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters"
    }

    if (formData.allowedFormats.length === 0) {
      newErrors.allowedFormats = "At least one format must be selected"
    }

    const maxLength = parseInt(formData.maxQuestionLength)
    if (!formData.maxQuestionLength || maxLength < 100 || maxLength > 1000) {
      newErrors.maxQuestionLength = "Max length must be between 100 and 1000 characters"
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
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Voice Category data:", formData)
      toast.success("Voice category added successfully!")
      router.push("/mla/manage-category/my-voice-category")
    } catch (error) {
      toast.error("Failed to add voice category")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with Back Button on Right */}
      <div className="flex items-center justify-between">
        <div>
          <h1 
            className="text-3xl font-bold"
            style={{ color: theme.textPrimary }}
          >
            Add New Voice Category
          </h1>
          <p 
            className="mt-1"
            style={{ color: theme.textSecondary }}
          >
            Create a new category for citizen questions and feedback
          </p>
        </div>
        
        <Link href="/mla/myvoice-category">
          <Button
            className="flex items-center gap-2"
            style={{
              background: theme.buttonPrimary.bg,
              color: theme.buttonPrimary.text,
            }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
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
              Enter the basic details of the voice category
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Category Name */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="categoryName" style={{ color: theme.textPrimary }}>
                  Category Name *
                </Label>
                <Input
                  id="categoryName"
                  value={formData.categoryName}
                  onChange={(e) => handleInputChange("categoryName", e.target.value)}
                  placeholder="e.g., Local Development, Government Schemes, etc."
                  style={{
                    backgroundColor: theme.backgroundSecondary,
                    borderColor: errors.categoryName ? "#ef4444" : theme.border,
                    color: theme.textPrimary,
                  }}
                />
                {errors.categoryName && (
                  <p className="text-sm text-red-500">{errors.categoryName}</p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description" style={{ color: theme.textPrimary }}>
                  Description *
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Provide details about what type of questions belong to this category"
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

              {/* Priority */}
              <div className="space-y-2">
                <Label htmlFor="priority" style={{ color: theme.textPrimary }}>
                  Priority *
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
                  Status *
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
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submission Settings */}
        <Card
          className="shadow-lg"
          style={{
            backgroundColor: theme.cardBackground,
            borderColor: theme.border,
          }}
        >
          <CardHeader>
            <CardTitle style={{ color: theme.textPrimary }}>
              Submission Settings
            </CardTitle>
            <CardDescription style={{ color: theme.textSecondary }}>
              Configure how citizens can submit questions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-6">
              {/* Allowed Formats */}
              <div className="space-y-3">
                <Label style={{ color: theme.textPrimary }}>
                  Allowed Submission Formats *
                </Label>
                <div className="flex flex-wrap gap-3">
                  {["Text", "Audio", "Video"].map((format) => (
                    <div
                      key={format}
                      onClick={() => handleFormatToggle(format)}
                      className="flex items-center gap-2 px-4 py-2 rounded-md border cursor-pointer transition-all"
                      style={{
                        backgroundColor: formData.allowedFormats.includes(format)
                          ? theme.buttonPrimary.bg
                          : theme.backgroundSecondary,
                        borderColor: formData.allowedFormats.includes(format)
                          ? theme.buttonPrimary.bg
                          : theme.border,
                        color: formData.allowedFormats.includes(format)
                          ? theme.buttonPrimary.text
                          : theme.textPrimary,
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={formData.allowedFormats.includes(format)}
                        onChange={() => {}}
                        className="cursor-pointer"
                      />
                      <span className="font-medium">{format}</span>
                    </div>
                  ))}
                </div>
                {errors.allowedFormats && (
                  <p className="text-sm text-red-500">{errors.allowedFormats}</p>
                )}
                <p 
                  className="text-xs"
                  style={{ color: theme.textTertiary }}
                >
                  Select at least one format. Citizens can submit questions using selected formats.
                </p>
              </div>

              {/* Max Question Length */}
              <div className="space-y-2">
                <Label htmlFor="maxQuestionLength" style={{ color: theme.textPrimary }}>
                  Maximum Question Length (characters) *
                </Label>
                <Input
                  id="maxQuestionLength"
                  type="number"
                  value={formData.maxQuestionLength}
                  onChange={(e) => handleInputChange("maxQuestionLength", e.target.value)}
                  placeholder="e.g., 500"
                  min="100"
                  max="1000"
                  style={{
                    backgroundColor: theme.backgroundSecondary,
                    borderColor: errors.maxQuestionLength ? "#ef4444" : theme.border,
                    color: theme.textPrimary,
                  }}
                />
                {errors.maxQuestionLength && (
                  <p className="text-sm text-red-500">{errors.maxQuestionLength}</p>
                )}
                <p 
                  className="text-xs"
                  style={{ color: theme.textTertiary }}
                >
                  Recommended: 500 characters. Range: 100-1000 characters.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Moderation Settings */}
        <Card
          className="shadow-lg"
          style={{
            backgroundColor: theme.cardBackground,
            borderColor: theme.border,
          }}
        >
          <CardHeader>
            <CardTitle style={{ color: theme.textPrimary }}>
              Moderation Settings
            </CardTitle>
            <CardDescription style={{ color: theme.textSecondary }}>
              Control how questions are reviewed and published
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Moderation Required */}
              <div className="space-y-2">
                <Label htmlFor="moderationRequired" style={{ color: theme.textPrimary }}>
                  Moderation Required
                </Label>
                <Select
                  value={formData.moderationRequired}
                  onValueChange={(value) => handleInputChange("moderationRequired", value)}
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
                    <SelectItem value="Yes">Yes - Review before publishing</SelectItem>
                    <SelectItem value="No">No - Publish immediately</SelectItem>
                  </SelectContent>
                </Select>
                <p 
                  className="text-xs"
                  style={{ color: theme.textTertiary }}
                >
                  If Yes, staff must approve questions before they appear publicly.
                </p>
              </div>

              {/* Auto Publish */}
              <div className="space-y-2">
                <Label htmlFor="autoPublish" style={{ color: theme.textPrimary }}>
                  Auto-Publish to Public
                </Label>
                <Select
                  value={formData.autoPublish}
                  onValueChange={(value) => handleInputChange("autoPublish", value)}
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
                    <SelectItem value="Yes">Yes - Make visible to all</SelectItem>
                    <SelectItem value="No">No - Keep private initially</SelectItem>
                  </SelectContent>
                </Select>
                <p 
                  className="text-xs"
                  style={{ color: theme.textTertiary }}
                >
                  Determines if approved questions are publicly visible for voting.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Link href="/mla/manage-category/my-voice-category">
            <Button 
              type="button" 
              variant="outline" 
              style={{
                background: theme.danger,
                color: theme.textPrimary,
              }}
            >
              Cancel
            </Button>
          </Link>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            style={{
              background: theme.buttonPrimary.bg,
              color: theme.buttonPrimary.text,
            }}
          >
            {isSubmitting ? "Adding Category..." : "Add Category"}
          </Button>
        </div>
      </form>
    </div>
  )
}