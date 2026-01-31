// app/(protected)/mla/budget-utilization/add/page.tsx
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

export default function AddBudgetAllocationPage() {
  const { theme } = useThemeStore()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    financialYear: "",
    totalAllocation: "",
    fundSource: "MPLADS",
    allocationDate: "",
    category: "",
    project: "",
    remarks: "",
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.financialYear) {
      newErrors.financialYear = "Financial year is required"
    }

    if (!formData.totalAllocation) {
      newErrors.totalAllocation = "Total allocation amount is required"
    } else {
      const amount = parseFloat(formData.totalAllocation)
      if (isNaN(amount)) {
        newErrors.totalAllocation = "Please enter a valid number"
      } else if (amount <= 0) {
        newErrors.totalAllocation = "Amount must be greater than zero"
      }
    }

    if (!formData.fundSource) {
      newErrors.fundSource = "Fund source is required"
    }

    if (!formData.allocationDate) {
      newErrors.allocationDate = "Allocation date is required"
    }

    if (!formData.project) {
      newErrors.project = "Project is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const formatAmountDisplay = (amount: string) => {
    if (!amount) return "₹0"
    
    const numAmount = parseFloat(amount)
    if (isNaN(numAmount)) return "Invalid amount"
    
    // Format with commas for thousands
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(numAmount)
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
      console.log("Budget Allocation data:", formData)
      toast.success("Budget allocation added successfully!")
      router.push("/mla/budget-utilization")
    } catch (error) {
      toast.error("Failed to add budget allocation")
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
            Add Budget Allocation
          </h1>
          <p 
            className="mt-1"
            style={{ color: theme.textSecondary }}
          >
            Allocate annual constituency development fund
          </p>
        </div>
        
        <Link href="/mla/budget-utilization">
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
        {/* Budget Details */}
        <Card
          className="shadow-lg"
          style={{
            backgroundColor: theme.cardBackground,
            borderColor: theme.border,
          }}
        >
          <CardHeader>
            <CardTitle style={{ color: theme.textPrimary }}>
              Budget Details
            </CardTitle>
            <CardDescription style={{ color: theme.textSecondary }}>
              Enter the annual budget allocation details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Financial Year */}
              <div className="space-y-2">
                <Label htmlFor="financialYear" style={{ color: theme.textPrimary }}>
                  Financial Year *
                </Label>
                <Select
                  value={formData.financialYear}
                  onValueChange={(value) => handleInputChange("financialYear", value)}
                >
                  <SelectTrigger
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: errors.financialYear ? "#ef4444" : theme.border,
                      color: theme.textPrimary,
                    }}
                  >
                    <SelectValue placeholder="Select financial year" />
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: theme.border,
                    }}
                  >
                    <SelectItem value="2024-2025">2024-2025</SelectItem>
                    <SelectItem value="2025-2026">2025-2026</SelectItem>
                    <SelectItem value="2026-2027">2026-2027</SelectItem>
                    <SelectItem value="2027-2028">2027-2028</SelectItem>
                  </SelectContent>
                </Select>
                {errors.financialYear && (
                  <p className="text-sm text-red-500">{errors.financialYear}</p>
                )}
              </div>

              {/* Total Allocation */}
              <div className="space-y-2">
                <Label htmlFor="totalAllocation" style={{ color: theme.textPrimary }}>
                  Total Allocation Amount *
                </Label>
                <Input
                  id="totalAllocation"
                  type="text"
                  value={formData.totalAllocation}
                  onChange={(e) => handleInputChange("totalAllocation", e.target.value)}
                  placeholder="e.g., 5000000 or 5.00"
                  style={{
                    backgroundColor: theme.input.bg,
                    borderColor: errors.totalAllocation ? "#ef4444" : theme.border,
                    color: theme.textPrimary,
                  }}
                />
                {errors.totalAllocation && (
                  <p className="text-sm text-red-500">{errors.totalAllocation}</p>
                )}
                <p 
                  className="text-xs"
                  style={{ color: theme.textTertiary }}
                >
                  Enter amount in your preferred currency (e.g., 5000000 or 5.00)
                </p>
              </div>

              {/* Fund Source */}
              <div className="space-y-2">
                <Label htmlFor="fundSource" style={{ color: theme.textPrimary }}>
                  Fund Source *
                </Label>
                <Select
                  value={formData.fundSource}
                  onValueChange={(value) => handleInputChange("fundSource", value)}
                >
                  <SelectTrigger
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: errors.fundSource ? "#ef4444" : theme.border,
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
                    <SelectItem value="MPLADS">MPLADS (MP Local Area Development Scheme)</SelectItem>
                    <SelectItem value="MLALADS">MLALADS (MLA Local Area Development Scheme)</SelectItem>
                    <SelectItem value="State Budget">State Budget Allocation</SelectItem>
                    <SelectItem value="Central Government">Central Government Grant</SelectItem>
                    <SelectItem value="Special Fund">Special Development Fund</SelectItem>
                    <SelectItem value="Other">Other Source</SelectItem>
                  </SelectContent>
                </Select>
                {errors.fundSource && (
                  <p className="text-sm text-red-500">{errors.fundSource}</p>
                )}
              </div>

              {/* Allocation Date */}
              <div className="space-y-2">
                <Label htmlFor="allocationDate" style={{ color: theme.textPrimary }}>
                  Allocation Date *
                </Label>
                <Input
                  id="allocationDate"
                  type="date"
                  value={formData.allocationDate}
                  onChange={(e) => handleInputChange("allocationDate", e.target.value)}
                  style={{
                    backgroundColor: theme.input.bg,
                    borderColor: errors.allocationDate ? "#ef4444" : theme.border,
                    color: theme.textPrimary,
                  }}
                />
                {errors.allocationDate && (
                  <p className="text-sm text-red-500">{errors.allocationDate}</p>
                )}
              </div>

              {/* Project */}
              <div className="space-y-2">
                <Label htmlFor="project" style={{ color: theme.textPrimary }}>
                  Project *
                </Label>
                <Select
                  value={formData.project}
                  onValueChange={(value) => handleInputChange("project", value)}
                >
                  <SelectTrigger
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: errors.project ? "#ef4444" : theme.border,
                      color: theme.textPrimary,
                    }}
                  >
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: theme.border,
                    }}
                  >
                    <SelectItem value="Road Development Project">Road Development Project</SelectItem>
                    <SelectItem value="School Infrastructure">School Infrastructure</SelectItem>
                    <SelectItem value="Healthcare Center">Healthcare Center</SelectItem>
                    <SelectItem value="Water Supply System">Water Supply System</SelectItem>
                    <SelectItem value="Community Hall">Community Hall</SelectItem>
                    <SelectItem value="Agricultural Support">Agricultural Support</SelectItem>
                    <SelectItem value="Digital Infrastructure">Digital Infrastructure</SelectItem>
                  </SelectContent>
                </Select>
                {errors.project && (
                  <p className="text-sm text-red-500">{errors.project}</p>
                )}
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category" style={{ color: theme.textPrimary }}>
                  Primary Category (Optional)
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleInputChange("category", value)}
                >
                  <SelectTrigger
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: theme.border,
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
                    <SelectItem value="Infrastructure">Infrastructure Development</SelectItem>
                    <SelectItem value="Healthcare">Healthcare Facilities</SelectItem>
                    <SelectItem value="Education">Education Infrastructure</SelectItem>
                    <SelectItem value="Agriculture">Agricultural Support</SelectItem>
                    <SelectItem value="Water & Sanitation">Water & Sanitation</SelectItem>
                    <SelectItem value="All">All Categories</SelectItem>
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
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Remarks */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="remarks" style={{ color: theme.textPrimary }}>
                  Remarks / Notes (Optional)
                </Label>
                <Textarea
                  id="remarks"
                  value={formData.remarks}
                  onChange={(e) => handleInputChange("remarks", e.target.value)}
                  placeholder="Enter any additional notes or remarks"
                  rows={4}
                  style={{
                    backgroundColor: theme.input.bg,
                    borderColor: theme.border,
                    color: theme.textPrimary,
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Card */}
        <Card
          className="shadow-lg"
          style={{
            backgroundColor: theme.cardBackground,
            borderColor: theme.border,
          }}
        >
          <CardHeader>
            <CardTitle style={{ color: theme.textPrimary }}>
              Allocation Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                className="p-4 rounded-lg"
                style={{ backgroundColor: theme.input.bg }}
              >
                <p 
                  className="text-sm"
                  style={{ color: theme.textSecondary }}
                >
                  Financial Year
                </p>
                <p 
                  className="text-xl font-bold mt-1"
                  style={{ color: theme.textPrimary }}
                >
                  {formData.financialYear || "Not Selected"}
                </p>
              </div>

              <div 
                className="p-4 rounded-lg"
                style={{ backgroundColor: theme.input.bg }}
              >
                <p 
                  className="text-sm"
                  style={{ color: theme.textSecondary }}
                >
                  Total Allocation
                </p>
                <p 
                  className="text-xl font-bold mt-1"
                  style={{ color: theme.textPrimary }}
                >
                  {formData.totalAllocation ? `₹${formatAmountDisplay(formData.totalAllocation)}` : "₹0"}
                </p>
              </div>

              <div 
                className="p-4 rounded-lg"
                style={{ backgroundColor: theme.input.bg }}
              >
                <p 
                  className="text-sm"
                  style={{ color: theme.textSecondary }}
                >
                  Selected Project
                </p>
                <p 
                  className="text-xl font-bold mt-1"
                  style={{ color: theme.textPrimary }}
                >
                  {formData.project || "Not Selected"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Link href="/mla/budget-utilization">
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
            {isSubmitting ? "Adding Allocation..." : "Add Allocation"}
          </Button>
        </div>
      </form>
    </div>
  )
}