// app/(protected)/mla/manage-polls/add/page.tsx
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
import { ArrowLeft, Plus, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AddPollPage() {
  const { theme } = useThemeStore()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    pollTitle: "",
    category: "",
    pollType: "Single Choice",
    description: "",
    targetAudience: "All Citizens",
    startDate: "",
    endDate: "",
    status: "Draft"
  })

  const [pollOptions, setPollOptions] = useState<string[]>(["", ""])
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

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...pollOptions]
    newOptions[index] = value
    setPollOptions(newOptions)
    
    // Clear duplicate error if exists
    if (errors[`option${index}`]) {
      setErrors(prev => ({ ...prev, [`option${index}`]: "" }))
    }
  }

  const addOption = () => {
    if (pollOptions.length < 10) {
      setPollOptions([...pollOptions, ""])
    }
  }

  const removeOption = (index: number) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter((_, i) => i !== index))
      // Clear error for removed option
      const newErrors = { ...errors }
      delete newErrors[`option${index}`]
      setErrors(newErrors)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Poll Title
    if (!formData.pollTitle.trim()) {
      newErrors.pollTitle = "Poll title is required"
    } else if (formData.pollTitle.length < 10) {
      newErrors.pollTitle = "Poll title must be at least 10 characters"
    }

    // Category
    if (!formData.category) {
      newErrors.category = "Category is required"
    }

    // Description
    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    } else if (formData.description.length < 20) {
      newErrors.description = "Description must be at least 20 characters"
    }

    // Start Date
    if (!formData.startDate) {
      newErrors.startDate = "Start date is required"
    }

    // End Date
    if (!formData.endDate) {
      newErrors.endDate = "End date is required"
    } else if (formData.startDate && new Date(formData.endDate) <= new Date(formData.startDate)) {
      newErrors.endDate = "End date must be after start date"
    }

    // Poll Options
    const filledOptions = pollOptions.filter(opt => opt.trim() !== "")
    if (filledOptions.length < 2) {
      newErrors.pollOptions = "At least 2 poll options are required"
    }

    // Check for duplicate options
    const duplicates = new Set<string>()
    pollOptions.forEach((option, index) => {
      if (option.trim()) {
        const trimmedOption = option.trim().toLowerCase()
        if (filledOptions.filter(opt => opt.trim().toLowerCase() === trimmedOption).length > 1) {
          duplicates.add(trimmedOption)
          newErrors[`option${index}`] = "Duplicate option"
        }
      }
    })

    // Check for empty options
    pollOptions.forEach((option, index) => {
      if (!option.trim()) {
        newErrors[`option${index}`] = "Option cannot be empty"
      }
    })

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
      
      const pollData = {
        ...formData,
        options: pollOptions.filter(opt => opt.trim() !== "")
      }
      
      console.log("Poll data:", pollData)
      toast.success("Poll created successfully!")
      router.push("/mla/manage-polls")
    } catch (error) {
      toast.error("Failed to create poll")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/mla/manage-polls">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 
            className="text-3xl font-bold"
            style={{ color: theme.textPrimary }}
          >
            Create New Poll
          </h1>
          <p 
            className="mt-1"
            style={{ color: theme.textSecondary }}
          >
            Get citizen feedback on important constituency matters
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
              Enter the poll details and question
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Poll Title */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="pollTitle" style={{ color: theme.textPrimary }}>
                  Poll Title / Question *
                </Label>
                <Input
                  id="pollTitle"
                  value={formData.pollTitle}
                  onChange={(e) => handleInputChange("pollTitle", e.target.value)}
                  placeholder="e.g., Should we prioritize road development in Badakotha area?"
                  style={{
                    backgroundColor: theme.backgroundSecondary,
                    borderColor: errors.pollTitle ? "#ef4444" : theme.border,
                    color: theme.textPrimary,
                  }}
                />
                {errors.pollTitle && (
                  <p className="text-sm text-red-500">{errors.pollTitle}</p>
                )}
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category" style={{ color: theme.textPrimary }}>
                  Category *
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
                    <SelectItem value="Local Development">Local Development</SelectItem>
                    <SelectItem value="Government Schemes">Government Schemes</SelectItem>
                    <SelectItem value="Public Services">Public Services</SelectItem>
                    <SelectItem value="Legislative Issues">Legislative Issues</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Agriculture & Farming">Agriculture & Farming</SelectItem>
                    <SelectItem value="Women & Child Welfare">Women & Child Welfare</SelectItem>
                    <SelectItem value="Environment & Sanitation">Environment & Sanitation</SelectItem>
                    <SelectItem value="Employment & Livelihood">Employment & Livelihood</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-red-500">{errors.category}</p>
                )}
              </div>

              {/* Poll Type */}
              <div className="space-y-2">
                <Label htmlFor="pollType" style={{ color: theme.textPrimary }}>
                  Poll Type *
                </Label>
                <Select
                  value={formData.pollType}
                  onValueChange={(value) => handleInputChange("pollType", value)}
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
                    <SelectItem value="Single Choice">Single Choice (One answer)</SelectItem>
                    <SelectItem value="Multiple Choice">Multiple Choice (Multiple answers)</SelectItem>
                  </SelectContent>
                </Select>
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
                  placeholder="Provide detailed information about this poll and why citizen input is needed"
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

        {/* Poll Options */}
        <Card
          className="shadow-lg"
          style={{
            backgroundColor: theme.cardBackground,
            borderColor: theme.border,
          }}
        >
          <CardHeader>
            <CardTitle style={{ color: theme.textPrimary }}>
              Poll Options
            </CardTitle>
            <CardDescription style={{ color: theme.textSecondary }}>
              Add options for citizens to vote on (minimum 2, maximum 10)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pollOptions.map((option, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-1 space-y-2">
                  <Label style={{ color: theme.textPrimary }}>
                    Option {index + 1}
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      placeholder={`Enter option ${index + 1}`}
                      style={{
                        backgroundColor: theme.backgroundSecondary,
                        borderColor: errors[`option${index}`] ? "#ef4444" : theme.border,
                        color: theme.textPrimary,
                      }}
                    />
                    {pollOptions.length > 2 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeOption(index)}
                        style={{
                          borderColor: theme.border,
                          color: theme.textPrimary,
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  {errors[`option${index}`] && (
                    <p className="text-sm text-red-500">{errors[`option${index}`]}</p>
                  )}
                </div>
              </div>
            ))}

            {errors.pollOptions && (
              <p className="text-sm text-red-500">{errors.pollOptions}</p>
            )}

            {pollOptions.length < 10 && (
              <Button
                type="button"
                variant="outline"
                onClick={addOption}
                className="w-full"
                style={{
                  borderColor: theme.border,
                  color: theme.textPrimary,
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Option
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Schedule & Settings */}
        <Card
          className="shadow-lg"
          style={{
            backgroundColor: theme.cardBackground,
            borderColor: theme.border,
          }}
        >
          <CardHeader>
            <CardTitle style={{ color: theme.textPrimary }}>
              Schedule & Settings
            </CardTitle>
            <CardDescription style={{ color: theme.textSecondary }}>
              Configure poll timing and audience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              {/* End Date */}
              <div className="space-y-2">
                <Label htmlFor="endDate" style={{ color: theme.textPrimary }}>
                  End Date *
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  style={{
                    backgroundColor: theme.backgroundSecondary,
                    borderColor: errors.endDate ? "#ef4444" : theme.border,
                    color: theme.textPrimary,
                  }}
                />
                {errors.endDate && (
                  <p className="text-sm text-red-500">{errors.endDate}</p>
                )}
              </div>

              {/* Target Audience */}
              <div className="space-y-2">
                <Label htmlFor="targetAudience" style={{ color: theme.textPrimary }}>
                  Target Audience
                </Label>
                <Select
                  value={formData.targetAudience}
                  onValueChange={(value) => handleInputChange("targetAudience", value)}
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
                    <SelectItem value="All Citizens">All Citizens</SelectItem>
                    <SelectItem value="Badakotha GP">Badakotha GP</SelectItem>
                    <SelectItem value="Korei GP">Korei GP</SelectItem>
                    <SelectItem value="Nuagaon GP">Nuagaon GP</SelectItem>
                    <SelectItem value="Hatapada GP">Hatapada GP</SelectItem>
                    <SelectItem value="Youth (18-35)">Youth (18-35)</SelectItem>
                    <SelectItem value="Women">Women</SelectItem>
                    <SelectItem value="Farmers">Farmers</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="status" style={{ color: theme.textPrimary }}>
                  Status
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
                    <SelectItem value="Draft">Draft (Save for later)</SelectItem>
                    <SelectItem value="Scheduled">Scheduled (Publish on start date)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Link href="/mla/manage-polls">
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
            className="flex items-center gap-2"
            style={{
              background: theme.buttonPrimary.bg,
              color: theme.buttonPrimary.text,
            }}
          >
            {isSubmitting ? "Creating Poll..." : "Create Poll"}
          </Button>
        </div>
      </form>
    </div>
  )
}