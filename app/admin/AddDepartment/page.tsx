"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Building2, User } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useThemeStore } from "@/store/useThemeStore"

// Available departments
const GOVERNMENT_DEPARTMENTS = [
  "Administration Department",
  "Finance Department",
  "Home Department",
  "Education Department",
  "Health Department",
  "Agriculture Department",
  "Fisheries Department",
  "Animal Husbandry Department",
  "Forest Department",
  "Rural Development Department",
  "Urban Development Department",
  "Housing Department",
  "Panchayati Raj Department",
  "Water Resources Department",
  "Public Works Department",
  "Transport Department",
  "Energy Department",
  "Women & Child Development Department",
  "Social Welfare Department",
  "Tribal Welfare Department",
  "Labour Department",
  "Sports & Youth Department",
  "Industries Department",
  "MSME Department",
  "Handloom & Handicrafts Department",
  "Tourism Department",
  "Food & Civil Supplies Department",
  "Revenue & Disaster Management Department",
  "Culture Department",
  "Information Technology Department",
]

export default function AddDepartment() {
  const { theme } = useThemeStore()
  const [form, setForm] = useState({
    name: "",
    code: "",
    description: "",
    headOfDepartment: "",
    contactEmail: "",
    contactPhone: "",
    active: true,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target
    setForm((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!form.name || !form.code) {
      alert("Please fill all required fields")
      return
    }

    // API CALL - Create department in MLA Connect system
    const payload = {
      ...form,
      createdAt: new Date().toISOString(),
    }

    console.log("Department Payload:", payload)
    alert("Department created successfully in MLA Connect system")
  }

  return (
    <div 
      className="min-h-screen p-6"
      style={{ background: theme.backgroundGradient }}
    >
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        {/* LEFT: ICON + TITLE */}
        <div className="flex items-center gap-3">
          <div 
            className="p-2 rounded-lg"
            style={{ backgroundColor: "rgba(99, 102, 241, 0.1)" }}
          >
            <Building2 className="h-6 w-6 text-indigo-600" />
          </div>

          <div>
            <h1 
              className="text-2xl font-bold"
              style={{ color: theme.textPrimary }}
            >
              Add New Department
            </h1>
            <p 
              className="text-sm"
              style={{ color: theme.textSecondary }}
            >
              Create a new department for work assignment and management
            </p>
          </div>
        </div>

        {/* RIGHT: BACK BUTTON */}
        <Link href="/admin/department">
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
        className="max-w border shadow-lg"
        style={{
          background: theme.cardBackground,
          borderColor: theme.border,
        }}
      >
        <CardHeader 
          className="border-b"
          style={{
            backgroundColor: theme.backgroundSecondary,
            borderColor: theme.border,
          }}
        >
          <CardTitle 
            className="flex items-center gap-2 text-lg"
            style={{ color: theme.textPrimary }}
          >
            <Building2 className="h-5 w-5 text-indigo-600" />
            Department Information
          </CardTitle>
          <p 
            className="text-sm mt-1"
            style={{ color: theme.textSecondary }}
          >
            Configure department details for the MLA Connect platform
          </p>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* BASIC INFORMATION */}
            <div className="space-y-4">
              <h3 
                className="text-sm font-semibold flex items-center gap-2"
                style={{ color: theme.textSecondary }}
              >
                <Building2 className="h-4 w-4" />
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label 
                    htmlFor="name"
                    style={{ color: theme.textPrimary }}
                  >
                    Department Name *
                  </Label>
                  <Select
                    value={form.name}
                    onValueChange={(value) => setForm({ ...form, name: value })}
                  >
                    <SelectTrigger
                      className="h-10 w-full"
                      style={{
                        backgroundColor: theme.input.bg,
                        borderColor: theme.input.placeholder,
                        color: theme.input.text,
                      }}
                    >
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent
                      style={{
                        backgroundColor: theme.cardBackground,
                        borderColor: theme.cardBorder,
                        color: theme.textPrimary,
                      }}
                    >
                      {GOVERNMENT_DEPARTMENTS.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label 
                    htmlFor="code"
                    style={{ color: theme.textPrimary }}
                  >
                    Department Code *
                  </Label>
                  <Input
                    id="code"
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                    placeholder="e.g., PWD"
                    maxLength={5}
                    required
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: theme.input.border,
                      color: theme.input.text,
                    }}
                  />
                  <p 
                    className="text-xs"
                    style={{ color: theme.textTertiary }}
                  >
                    Short code for quick identification (max 5 characters)
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label 
                  htmlFor="description"
                  style={{ color: theme.textPrimary }}
                >
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Brief description of department responsibilities"
                  rows={3}
                  className="resize-none"
                  style={{
                    backgroundColor: theme.input.bg,
                    borderColor: theme.input.border,
                    color: theme.input.text,
                  }}
                />
              </div>
            </div>

            {/* CONTACT INFORMATION */}
            <div 
              className="space-y-4 pt-6 border-t"
              style={{ borderColor: theme.border }}
            >
              <h3 
                className="text-sm font-semibold flex items-center gap-2"
                style={{ color: theme.textSecondary }}
              >
                <User className="h-4 w-4" />
                Contact Information
              </h3>
              
              <div className="space-y-2">
                <Label 
                  htmlFor="headOfDepartment"
                  style={{ color: theme.textPrimary }}
                >
                  Head of Department
                </Label>
                <Input
                  id="headOfDepartment"
                  value={form.headOfDepartment}
                  onChange={handleChange}
                  placeholder="e.g., Rajesh Kumar"
                  style={{
                    backgroundColor: theme.input.bg,
                    borderColor: theme.input.border,
                    color: theme.input.text,
                  }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label 
                    htmlFor="contactEmail"
                    style={{ color: theme.textPrimary }}
                  >
                    Email
                  </Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={form.contactEmail}
                    onChange={handleChange}
                    placeholder="dept@odisha.gov.in"
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: theme.input.border,
                      color: theme.input.text,
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label 
                    htmlFor="contactPhone"
                    style={{ color: theme.textPrimary }}
                  >
                    Phone
                  </Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    value={form.contactPhone}
                    onChange={handleChange}
                    placeholder="+91-9876543210"
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: theme.input.border,
                      color: theme.input.text,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* STATUS */}
            <div 
              className="space-y-4 pt-6 border-t"
              style={{ borderColor: theme.border }}
            >
              <h3 
                className="text-sm font-semibold"
                style={{ color: theme.textSecondary }}
              >
                Department Status
              </h3>
              
              <div className="flex items-center space-x-3 p-4 rounded-md border"
                style={{ 
                  borderColor: theme.border,
                  backgroundColor: theme.backgroundSecondary 
                }}
              >
                <Checkbox
                  id="active"
                  checked={form.active}
                  onCheckedChange={(checked) =>
                    setForm((prev) => ({ ...prev, active: checked as boolean }))
                  }
                />
                <div className="flex-1">
                  <Label 
                    htmlFor="active"
                    style={{ color: theme.textPrimary }}
                    className="cursor-pointer font-medium"
                  >
                    Active Department
                  </Label>
                  <p 
                    className="text-xs mt-1"
                    style={{ color: theme.textTertiary }}
                  >
                    {form.active 
                      ? "Department is active and available for work assignment" 
                      : "Department is inactive and not available"}
                  </p>
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div 
              className="flex justify-between items-center pt-6 border-t"
              style={{ borderColor: theme.border }}
            >
              <p 
                className="text-xs"
                style={{ color: theme.textTertiary }}
              >
                * Required fields must be filled
              </p>
              <div className="flex gap-3">
                <Link href="/admin/department">
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
                  style={{
                    background: theme.buttonPrimary.bg,
                    color: theme.buttonPrimary.text,
                  }}
                >
                  Create Department
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}