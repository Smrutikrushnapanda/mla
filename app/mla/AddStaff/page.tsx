// app/(protected)/mla/user-management/add-staff/page.tsx
"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowLeft, UserPlus, Shield, Briefcase, Plus } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useThemeStore } from "@/store/useThemeStore"

export default function AddStaffPage() {
  const { theme } = useThemeStore()
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
    role: "",
    village: "",
    gpName: "",
    status: "Active",
    password: "",
    confirmPassword: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showNewRoleInput, setShowNewRoleInput] = useState(false)
  const [newRole, setNewRole] = useState("")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, value } = e.target
    setForm((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Basic validation
    if (!form.name || !form.email || !form.phone || !form.designation || !form.department || !form.role) {
      alert("Please fill all required fields")
      setIsSubmitting(false)
      return
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match")
      setIsSubmitting(false)
      return
    }

    if (form.phone && !/^[0-9]{10}$/.test(form.phone)) {
      alert("Please enter a valid 10-digit phone number")
      setIsSubmitting(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      console.log("Staff data to submit:", form)
      alert("Staff member added successfully!")
      // Reset form
      setForm({
        name: "",
        email: "",
        phone: "",
        designation: "",
        department: "",
        role: "",
        village: "",
        gpName: "",
        status: "Active",
        password: "",
        confirmPassword: "",
      })
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen p-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        {/* LEFT: ICON + TITLE */}
        <div className="flex items-center gap-3">
          <div 
            className="p-2 rounded-lg"
            style={{ backgroundColor: "rgba(99, 102, 241, 0.1)" }}
          >
            <UserPlus className="h-6 w-6 text-indigo-600" />
          </div>

          <div>
            <h1 
              className="text-2xl font-bold"
              style={{ color: theme.textPrimary }}
            >
              Add New Staff Member
            </h1>
            <p 
              className="text-sm"
              style={{ color: theme.textSecondary }}
            >
              Add a new staff member to MLA team
            </p>
          </div>
        </div>

        {/* RIGHT: BACK BUTTON */}
        <Link href="/mla/user-manage">
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

      {/* FORM CARD */}
      <Card 
        className="max-w mx-auto border shadow-lg"
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
            <Briefcase className="h-5 w-5 text-indigo-600" />
            Staff Member Details
          </CardTitle>
          <p 
            className="text-sm mt-1"
            style={{ color: theme.textSecondary }}
          >
            Fill in the details to add a new staff member to the MLA office
          </p>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* PERSONAL INFORMATION */}
            <div className="space-y-4">
              <h3 
                className="text-sm font-semibold flex items-center gap-2"
                style={{ color: theme.textSecondary }}
              >
                <UserPlus className="h-4 w-4" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label 
                    htmlFor="name"
                    style={{ color: theme.textPrimary }}
                  >
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    required
                    style={{
                      backgroundColor: theme.backgroundSecondary,
                      borderColor: theme.border,
                      color: theme.textPrimary,
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label 
                    htmlFor="email"
                    style={{ color: theme.textPrimary }}
                  >
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="staff@example.com"
                    required
                    style={{
                      backgroundColor: theme.backgroundSecondary,
                      borderColor: theme.border,
                      color: theme.textPrimary,
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label 
                    htmlFor="phone"
                    style={{ color: theme.textPrimary }}
                  >
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="10-digit phone number"
                    maxLength={10}
                    required
                    style={{
                      backgroundColor: theme.backgroundSecondary,
                      borderColor: theme.border,
                      color: theme.textPrimary,
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label style={{ color: theme.textPrimary }}>
                    Designation *
                  </Label>
                  <Select
                    value={form.designation}
                    onValueChange={(value) => handleSelectChange("designation", value)}
                    required
                  >
                    <SelectTrigger 
                      style={{
                        backgroundColor: theme.input.bg,
                        borderColor: theme.border,
                        color: theme.textPrimary,
                      }}
                    >
                      <SelectValue placeholder="Select designation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Personal Assistant">Personal Assistant</SelectItem>
                      <SelectItem value="Secretary">Secretary</SelectItem>
                      <SelectItem value="Office Manager">Office Manager</SelectItem>
                      <SelectItem value="Field Officer">Field Officer</SelectItem>
                      <SelectItem value="Data Entry Operator">Data Entry Operator</SelectItem>
                      <SelectItem value="Communication Officer">Communication Officer</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* JOB INFORMATION */}
            <div 
              className="space-y-4 pt-6 border-t"
              style={{ borderColor: theme.border }}
            >
              <h3 
                className="text-sm font-semibold"
                style={{ color: theme.textSecondary }}
              >
                Job Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label style={{ color: theme.textPrimary }}>
                    Department *
                  </Label>
                  <Select
                    value={form.department}
                    onValueChange={(value) => handleSelectChange("department", value)}
                    required
                  >
                    <SelectTrigger 
                      style={{
                        backgroundColor: theme.input.bg,
                        borderColor: theme.border,
                        color: theme.textPrimary,
                      }}
                    >
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Grievance Cell">Grievance Cell</SelectItem>
                      <SelectItem value="Public Relations">Public Relations</SelectItem>
                      <SelectItem value="Administration">Administration</SelectItem>
                      <SelectItem value="Field Operations">Field Operations</SelectItem>
                      <SelectItem value="IT Support">IT Support</SelectItem>
                      <SelectItem value="Accounts">Accounts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label style={{ color: theme.textPrimary }}>
                    Role *
                  </Label>
                  <div className="flex gap-2">
                    <Select
                      value={form.role}
                      onValueChange={(value) => handleSelectChange("role", value)}
                      required
                    >
                      <SelectTrigger 
                        style={{
                          backgroundColor: theme.input.bg,
                          borderColor: theme.border,
                          color: theme.textPrimary,
                        }}
                      >
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="staff">MlA Representative Staff</SelectItem>
                        <SelectItem value="field_officer">Field Officer</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      className="flex items-center justify-center px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                      onClick={() => setShowNewRoleInput(true)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {showNewRoleInput && (
                    <div className="flex gap-2 mt-2">
                      <Input
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        placeholder="Enter new role"
                        style={{
                          backgroundColor: theme.backgroundSecondary,
                          borderColor: theme.border,
                          color: theme.textPrimary,
                        }}
                      />
                      <Button
                        type="button"
                        className="bg-green-600 hover:bg-green-700 text-white px-3"
                        onClick={() => {
                          if (newRole.trim()) {
                            handleSelectChange("role", newRole.trim())
                            setNewRole("")
                            setShowNewRoleInput(false)
                          }
                        }}
                      >
                        Add
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="px-3"
                        onClick={() => {
                          setNewRole("")
                          setShowNewRoleInput(false)
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label style={{ color: theme.textPrimary }}>
                    Village Assignment
                  </Label>
                  <Select
                    value={form.village}
                    onValueChange={(value) => handleSelectChange("village", value)}
                  >
                    <SelectTrigger 
                      style={{
                        backgroundColor: theme.input.bg,
                        borderColor: theme.border,
                        color: theme.textPrimary,
                      }}
                    >
                      <SelectValue placeholder="Select village (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Badakotha">Badakotha</SelectItem>
                      <SelectItem value="Korei Market">Korei Market</SelectItem>
                      <SelectItem value="Nuagaon">Nuagaon</SelectItem>
                      <SelectItem value="Hatapada">Hatapada</SelectItem>
                      <SelectItem value="Jharbandh">Jharbandh</SelectItem>
                      <SelectItem value="Bansapal">Bansapal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label style={{ color: theme.textPrimary }}>
                    Gram Panchayat
                  </Label>
                  <Select
                    value={form.gpName}
                    onValueChange={(value) => handleSelectChange("gpName", value)}
                  >
                    <SelectTrigger 
                      style={{
                        backgroundColor: theme.input.bg,
                        borderColor: theme.border,
                        color: theme.textPrimary,
                      }}
                    >
                      <SelectValue placeholder="Select GP (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Badakotha GP">Badakotha GP</SelectItem>
                      <SelectItem value="Korei GP">Korei GP</SelectItem>
                      <SelectItem value="Nuagaon GP">Nuagaon GP</SelectItem>
                      <SelectItem value="Hatapada GP">Hatapada GP</SelectItem>
                      <SelectItem value="Jharbandh GP">Jharbandh GP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label style={{ color: theme.textPrimary }}>
                  Status
                </Label>
                <Select
                  value={form.status}
                  onValueChange={(value) => handleSelectChange("status", value)}
                >
                  <SelectTrigger 
                    className="w-full md:w-1/2"
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: theme.input.bg,
                      color: theme.textPrimary,
                    }}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="On Leave">On Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* SECURITY CREDENTIALS */}
            <div 
              className="space-y-4 pt-6 border-t"
              style={{ borderColor: theme.border }}
            >
              <h3 
                className="text-sm font-semibold flex items-center gap-2"
                style={{ color: theme.textSecondary }}
              >
                <Shield className="h-4 w-4" />
                Security Credentials
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label 
                    htmlFor="password"
                    style={{ color: theme.textPrimary }}
                  >
                    Password *
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Create password"
                    required
                    style={{
                      backgroundColor: theme.backgroundSecondary,
                      borderColor: theme.border,
                      color: theme.textPrimary,
                    }}
                  />
                  <p 
                    className="text-xs"
                    style={{ color: theme.textTertiary }}
                  >
                    Minimum 6 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label 
                    htmlFor="confirmPassword"
                    style={{ color: theme.textPrimary }}
                  >
                    Confirm Password *
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    required
                    style={{
                      backgroundColor: theme.backgroundSecondary,
                      borderColor: theme.border,
                      color: theme.textPrimary,
                    }}
                  />
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
                * Required fields
              </p>
              <div className="flex gap-3">
                <Link href="/mla/user-management">
                  <Button 
                    variant="outline"
                    type="button"
                    style={{
                      borderColor: theme.danger,
                      color: theme.danger,
                    }}
                  >
                    Cancel
                  </Button>
                </Link>
                <Button 
                        className="flex items-center gap-2"
                        style={{
                          background: theme.buttonPrimary.bg,
                          color: theme.buttonPrimary.text,
                        }}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding Staff..." : "Add Staff Member"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}