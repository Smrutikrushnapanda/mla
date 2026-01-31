"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowLeft, MapPin } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useThemeStore } from "@/store/useThemeStore"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
]

export default function AddDistrict() {
  const { theme } = useThemeStore()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [form, setForm] = useState({
    name: "",
    state: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, value } = e.target
    setForm((prev) => ({ ...prev, [id]: value }))
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!form.name) {
      newErrors.name = "District name is required"
    }

    if (!form.state) {
      newErrors.state = "State is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("District data:", form)
      toast.success("District added successfully!")
      router.push("/admin/districts")
    } catch (error) {
      toast.error("Failed to add district")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
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
              className="text-2xl font-bold"
              style={{ color: theme.textPrimary }}
            >
              Add New District
            </h1>
            <p 
              className="text-sm"
              style={{ color: theme.textSecondary }}
            >
              Create a new district for constituency mapping
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
            BACK
          </Button>
        </Link>
      </div>

      {/* FORM CARD */}
      <Card 
        className="shadow-lg"
        style={{
          background: theme.cardBackground,
          borderColor: theme.border,
        }}
      >
        <CardHeader>
          <CardTitle 
            className="flex items-center gap-2 text-lg"
            style={{ color: theme.textPrimary }}
          >
            <MapPin className="h-5 w-5 text-indigo-600" />
            District Information
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label 
                  htmlFor="name"
                  style={{ color: theme.textPrimary }}
                >
                  District Name *
                </Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g., Khordha"
                  style={{
                    backgroundColor: theme.input.bg,
                    borderColor: errors.name ? "#ef4444" : theme.input.border,
                    color: theme.input.text,
                  }}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label 
                  htmlFor="state"
                  style={{ color: theme.textPrimary }}
                >
                  State *
                </Label>
                <Select
                  value={form.state}
                  onValueChange={(value) => {
                    setForm({ ...form, state: value })
                    if (errors.state) {
                      setErrors(prev => ({ ...prev, state: "" }))
                    }
                  }}
                >
                  <SelectTrigger
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: errors.state ? "#ef4444" : theme.input.border,
                      color: theme.input.text,
                    }}
                  >
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      backgroundColor: theme.cardBackground,
                      borderColor: theme.cardBorder,
                      color: theme.textPrimary,
                    }}
                  >
                    {indianStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.state && (
                  <p className="text-sm text-red-500">{errors.state}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Link href="/admin/districts">
                <Button 
                  variant="outline"
                  style={{
                    borderColor: theme.border,
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
                {isSubmitting ? "Adding District..." : "Add District"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}