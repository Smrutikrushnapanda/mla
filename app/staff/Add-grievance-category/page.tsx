// app/(protected)/staff/Add-grievance-category/page.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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

export default function AddGrievanceCategoryPage() {
  const { theme } = useThemeStore()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    categoryName: "",
    description: "",
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.categoryName) {
      newErrors.categoryName = "Category name is required"
    } else if (formData.categoryName.length < 3) {
      newErrors.categoryName = "Category name must be at least 3 characters"
    }

    if (!formData.description) {
      newErrors.description = "Description is required"
    } else if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters"
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
      console.log("Grievance Category data:", formData)
      toast.success("Grievance category added successfully!")
      router.push("/staff/grievance-category")
    } catch (error) {
      toast.error("Failed to add grievance category")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 
            className="text-3xl font-bold"
            style={{ color: theme.textPrimary }}
          >
            Add Grievance Category
          </h1>
          <p 
            className="mt-1"
            style={{ color: theme.textSecondary }}
          >
            Create a new grievance category for citizen complaints
          </p>
        </div>
        
        <Link href="/staff/grievance-category">
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
        {/* Category Details */}
        <Card
          className="shadow-lg"
          style={{
            backgroundColor: theme.cardBackground,
            borderColor: theme.border,
          }}
        >
          <CardHeader>
            <CardTitle style={{ color: theme.textPrimary }}>
              Category Details
            </CardTitle>
            <CardDescription style={{ color: theme.textSecondary }}>
              Enter the grievance category information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Category Name */}
            <div className="space-y-2">
              <Label htmlFor="categoryName" style={{ color: theme.textPrimary }}>
                Category Name *
              </Label>
              <Input
                id="categoryName"
                type="text"
                value={formData.categoryName}
                onChange={(e) => handleInputChange("categoryName", e.target.value)}
                placeholder="e.g., Infrastructure, Water Supply, Sanitation"
                style={{
                  backgroundColor: theme.input.bg,
                  borderColor: errors.categoryName ? "#ef4444" : theme.border,
                  color: theme.textPrimary,
                }}
              />
              {errors.categoryName && (
                <p className="text-sm text-red-500">{errors.categoryName}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" style={{ color: theme.textPrimary }}>
                Description *
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe the types of grievances this category covers..."
                rows={4}
                style={{
                  backgroundColor: theme.input.bg,
                  borderColor: errors.description ? "#ef4444" : theme.border,
                  color: theme.textPrimary,
                }}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Link href="/staff/grievance-category">
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