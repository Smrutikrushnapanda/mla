"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowLeft, UserPlus, Shield } from "lucide-react"

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

export default function AddUserPage() {
  const { theme } = useThemeStore()
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    aadhaarNumber: "",
    voterIdNumber: "",
    constituency: "",
    pinCode: "",
    role: "",
    department: "",
    accessLevel: "",
    password: "",
    confirmPassword: "",
    notes: "",
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
    if (!form.name || !form.email || !form.phone || !form.role) {
      alert("Please fill all required fields")
      return
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match")
      return
    }

    if (form.phone && !/^[0-9]{10}$/.test(form.phone)) {
      alert("Please enter a valid 10-digit phone number")
      return
    }

    if (form.aadhaarNumber && !/^[0-9]{12}$/.test(form.aadhaarNumber)) {
      alert("Please enter a valid 12-digit Aadhaar number")
      return
    }

    // API CALL - Create user in MLA Connect system
    const payload = {
      ...form,
      createdAt: new Date().toISOString(),
      status: "active",
    }

    console.log("User Payload:", payload)
    alert("User created successfully in MLA Connect system")
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
            <UserPlus className="h-6 w-6 text-indigo-600" />
          </div>

          <div>
            <h1 
              className="text-2xl font-bold"
              style={{ color: theme.textPrimary }}
            >
              Add New Admin User
            </h1>
            <p 
              className="text-sm"
              style={{ color: theme.textSecondary }}
            >
              Create a new admin/staff user for MLA Connect App
            </p>
          </div>
        </div>

        {/* RIGHT: BACK BUTTON */}
        <Link href="/admin/users">
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
            <Shield className="h-5 w-5 text-indigo-600" />
            Admin User Information
          </CardTitle>
          <p 
            className="text-sm mt-1"
            style={{ color: theme.textSecondary }}
          >
            Configure user role and access permissions for the MLA Connect platform
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
                      backgroundColor: theme.input.bg,
                      borderColor: theme.input.border,
                      color: theme.input.text,
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
                    placeholder="admin@mlaconnect.gov.in"
                    required
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: theme.input.border,
                      color: theme.input.text,
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
                    Mobile Number (OTP Verification) *
                  </Label>
                  <Input
                    id="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    maxLength={10}
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
                    Used for OTP-based login
                  </p>
                </div>

                <div className="space-y-2">
                  <Label 
                    htmlFor="aadhaarNumber"
                    style={{ color: theme.textPrimary }}
                  >
                    Aadhaar Number (Optional)
                  </Label>
                  <Input
                    id="aadhaarNumber"
                    value={form.aadhaarNumber}
                    onChange={handleChange}
                    placeholder="12-digit Aadhaar number"
                    maxLength={12}
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: theme.input.border,
                      color: theme.input.text,
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label 
                    htmlFor="voterIdNumber"
                    style={{ color: theme.textPrimary }}
                  >
                    Voter ID (Optional)
                  </Label>
                  <Input
                    id="voterIdNumber"
                    value={form.voterIdNumber}
                    onChange={handleChange}
                    placeholder="Voter ID number"
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: theme.input.border,
                      color: theme.input.text,
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label 
                    htmlFor="pinCode"
                    style={{ color: theme.textPrimary }}
                  >
                    PIN Code
                  </Label>
                  <Input
                    id="pinCode"
                    value={form.pinCode}
                    onChange={handleChange}
                    placeholder="Area PIN code"
                    maxLength={6}
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: theme.input.border,
                      color: theme.input.text,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* ROLE & PERMISSIONS */}
            <div 
              className="space-y-4 pt-6 border-t"
              style={{ borderColor: theme.border }}
            >
              <h3 
                className="text-sm font-semibold"
                style={{ color: theme.textSecondary }}
              >
                Role & Access Permissions
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label style={{ color: theme.textPrimary }}>
                    User Role *
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setForm((prev) => ({ ...prev, role: value }))
                    }
                    required
                  >
                    <SelectTrigger 
                      className="h-10 w-full"
                      style={{
                        backgroundColor: theme.input.bg,
                        borderColor: theme.input.border,
                        color: theme.input.text,
                      }}
                    >
                      <SelectValue placeholder="Select user role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="super_admin">Super Admin</SelectItem>
                      <SelectItem value="mla">MLA</SelectItem>
                      <SelectItem value="mla_staff">MLA Staff</SelectItem>
                    </SelectContent>
                  </Select>
                  <p 
                    className="text-xs"
                    style={{ color: theme.textTertiary }}
                  >
                    Defines user's authority level in the system
                  </p>
                </div>

                <div className="space-y-2">
                  <Label style={{ color: theme.textPrimary }}>
                    Access Level *
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setForm((prev) => ({ ...prev, accessLevel: value }))
                    }
                    required
                  >
                    <SelectTrigger 
                      className="h-10 w-full"
                      style={{
                        backgroundColor: theme.input.bg,
                        borderColor: theme.input.border,
                        color: theme.input.text,
                      }}
                    >
                      <SelectValue placeholder="Select access level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full_access">Full Access & Broadcast Authority</SelectItem>
                      <SelectItem value="manage_operations">Manage Operations</SelectItem>
                      <SelectItem value="view_only">View Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label style={{ color: theme.textPrimary }}>
                    Department Assignment
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setForm((prev) => ({ ...prev, department: value }))
                    }
                  >
                    <SelectTrigger 
                      className="h-10 w-full"
                      style={{
                        backgroundColor: theme.input.bg,
                        borderColor: theme.input.border,
                        color: theme.input.text,
                      }}
                    >
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grievance">Grievance Redressal</SelectItem>
                      <SelectItem value="events">Events & Meetings</SelectItem>
                      <SelectItem value="milestones">Work Milestones</SelectItem>
                      <SelectItem value="appointments">Appointment Management</SelectItem>
                      <SelectItem value="polls">Polling Analysis</SelectItem>
                      <SelectItem value="media">Media Connect</SelectItem>
                      <SelectItem value="all">All Departments</SelectItem>
                    </SelectContent>
                  </Select>
                  <p 
                    className="text-xs"
                    style={{ color: theme.textTertiary }}
                  >
                    Module access for this user
                  </p>
                </div>

                <div className="space-y-2">
                  <Label 
                    htmlFor="constituency"
                    style={{ color: theme.textPrimary }}
                  >
                    Constituency
                  </Label>
                  <Input
                    id="constituency"
                    value={form.constituency}
                    onChange={handleChange}
                    placeholder="Enter constituency name"
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: theme.input.border,
                      color: theme.input.text,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* SECURITY */}
            <div 
              className="space-y-4 pt-6 border-t"
              style={{ borderColor: theme.border }}
            >
              <h3 
                className="text-sm font-semibold"
                style={{ color: theme.textSecondary }}
              >
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
                    placeholder="Create strong password"
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
                    Minimum 8 characters, include letters and numbers
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
                    placeholder="Re-enter password"
                    required
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: theme.input.border,
                      color: theme.input.text,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* NOTES */}
            <div 
              className="space-y-2 pt-6 border-t"
              style={{ borderColor: theme.border }}
            >
              <Label 
                htmlFor="notes"
                style={{ color: theme.textPrimary }}
              >
                Additional Notes
              </Label>
              <textarea
                id="notes"
                value={form.notes}
                onChange={handleChange}
                className="w-full min-h-[100px] p-3 border rounded-md text-sm"
                placeholder="Special instructions, responsibilities, or remarks..."
                style={{
                  backgroundColor: theme.input.bg,
                  borderColor: theme.input.border,
                  color: theme.input.text,
                }}
              />
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
                * User will receive OTP on mobile for first login
              </p>
              <div className="flex gap-3">
                <Link href="/admin/users">
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
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}