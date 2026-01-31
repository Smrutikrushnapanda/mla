"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useThemeStore } from "@/store/useThemeStore"
import { toast } from "sonner"
import { ArrowLeft, MapPin } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AddStatePage() {
  const { theme } = useThemeStore()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    stateName: "",
    stateCode: "",
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

    if (!formData.stateName) {
      newErrors.stateName = "State name is required"
    } else if (formData.stateName.length < 2) {
      newErrors.stateName = "State name must be at least 2 characters"
    }

    if (!formData.stateCode) {
      newErrors.stateCode = "State code is required"
    } else if (formData.stateCode.length !== 2) {
      newErrors.stateCode = "State code must be exactly 2 characters"
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
      console.log("State data:", formData)
      toast.success("State added successfully!")
      router.push("/admin/districts")
    } catch (error) {
      toast.error("Failed to add state")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div 
            className="p-2 rounded-lg"
            style={{ backgroundColor: "rgba(99, 102, 241, 0.1)" }}
          >
            <MapPin className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h1 
              className="text-3xl font-bold"
              style={{ color: theme.textPrimary }}
            >
              Add New State
            </h1>
            <p 
              className="mt-1"
              style={{ color: theme.textSecondary }}
            >
              Create a new state for district management
            </p>
          </div>
        </div>
        
        <Link href="/admin/districts">
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
        <Card
          className="shadow-lg"
          style={{
            backgroundColor: theme.cardBackground,
            borderColor: theme.border,
          }}
        >
          <CardHeader>
            <CardTitle style={{ color: theme.textPrimary }}>
              State Information
            </CardTitle>
            <CardDescription style={{ color: theme.textSecondary }}>
              Enter the basic state details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* State Name */}
              <div className="space-y-2">
                <Label htmlFor="stateName" style={{ color: theme.textPrimary }}>
                  State Name *
                </Label>
                <Input
                  id="stateName"
                  type="text"
                  value={formData.stateName}
                  onChange={(e) => handleInputChange("stateName", e.target.value)}
                  placeholder="e.g., Odisha, Maharashtra"
                  style={{
                    backgroundColor: theme.input.bg,
                    borderColor: errors.stateName ? "#ef4444" : theme.border,
                    color: theme.textPrimary,
                  }}
                />
                {errors.stateName && (
                  <p className="text-sm text-red-500">{errors.stateName}</p>
                )}
              </div>

              {/* State Code */}
              <div className="space-y-2">
                <Label htmlFor="stateCode" style={{ color: theme.textPrimary }}>
                  State Code *
                </Label>
                <Input
                  id="stateCode"
                  type="text"
                  value={formData.stateCode}
                  onChange={(e) => handleInputChange("stateCode", e.target.value.toUpperCase())}
                  placeholder="e.g., OR, MH"
                  maxLength={2}
                  style={{
                    backgroundColor: theme.input.bg,
                    borderColor: errors.stateCode ? "#ef4444" : theme.border,
                    color: theme.textPrimary,
                  }}
                />
                {errors.stateCode && (
                  <p className="text-sm text-red-500">{errors.stateCode}</p>
                )}
                <p className="text-xs" style={{ color: theme.textTertiary }}>
                  2-letter state code for identification
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Link href="/admin/districts">
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
            {isSubmitting ? "Adding State..." : "Add State"}
          </Button>
        </div>
      </form>
    </div>
  )
}