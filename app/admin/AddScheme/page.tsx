"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowLeft, FileText, Users, FileCheck, Calendar } from "lucide-react"

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
import { X } from "lucide-react"

// Government departments
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

// Beneficiary types
const BENEFICIARY_TYPES = [
  "All Citizens",
  "Farmers",
  "Small Farmers",
  "Marginal Farmers",
  "Landless Agricultural Workers",
  "Senior Citizens",
  "Women",
  "Widows",
  "Children",
  "Students",
  "SC/ST Students",
  "OBC Students",
  "Persons with Disabilities",
  "Construction Workers",
  "Labour",
  "Self Help Groups",
  "Below Poverty Line (BPL)",
  "Economically Weaker Section (EWS)",
  "Rural Poor",
  "Urban Poor",
  "Homeless",
  "Unemployed Youth",
  "Artisans",
  "Weavers",
]

// Common required documents
const COMMON_DOCUMENTS = [
  "Aadhar Card",
  "Ration Card",
  "Voter ID Card",
  "PAN Card",
  "Income Certificate",
  "Caste Certificate",
  "Domicile Certificate",
  "Age Proof",
  "Bank Account Details",
  "Passbook Copy",
  "Land Records",
  "Disability Certificate",
  "BPL Card",
  "School/College ID",
  "Mark Sheets",
  "Family Photo",
  "Passport Size Photo",
]

export default function AddScheme() {
  const { theme } = useThemeStore()
  const [form, setForm] = useState({
    name: "",
    code: "",
    description: "",
    department: "",
    beneficiaryType: [] as string[],
    eligibilityCriteria: "",
    benefits: "",
    documents: [] as string[],
    applicationProcess: "",
    launchDate: "",
    endDate: "",
    active: true,
  })

  const [customDocument, setCustomDocument] = useState("")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target
    setForm((prev) => ({ ...prev, [id]: value }))
  }

  const handleBeneficiaryToggle = (type: string) => {
    setForm((prev) => ({
      ...prev,
      beneficiaryType: prev.beneficiaryType.includes(type)
        ? prev.beneficiaryType.filter((t) => t !== type)
        : [...prev.beneficiaryType, type],
    }))
  }

  const handleDocumentToggle = (doc: string) => {
    setForm((prev) => ({
      ...prev,
      documents: prev.documents.includes(doc)
        ? prev.documents.filter((d) => d !== doc)
        : [...prev.documents, doc],
    }))
  }

  const addCustomDocument = () => {
    if (customDocument.trim() && !form.documents.includes(customDocument.trim())) {
      setForm((prev) => ({
        ...prev,
        documents: [...prev.documents, customDocument.trim()],
      }))
      setCustomDocument("")
    }
  }

  const removeDocument = (doc: string) => {
    setForm((prev) => ({
      ...prev,
      documents: prev.documents.filter((d) => d !== doc),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!form.name || !form.code || !form.department) {
      alert("Please fill all required fields")
      return
    }

    if (form.beneficiaryType.length === 0) {
      alert("Please select at least one beneficiary type")
      return
    }

    // API CALL - Create scheme in MLA Connect system
    const payload = {
      ...form,
      launchDate: form.launchDate ? new Date(form.launchDate) : undefined,
      endDate: form.endDate ? new Date(form.endDate) : undefined,
      createdAt: new Date().toISOString(),
    }

    console.log("Scheme Payload:", payload)
    alert("Scheme created successfully in MLA Connect system")
  }

  return (
    <div 
      className="min-h-screen p-6"
      style={{ background: theme.backgroundGradient }}
    >
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div 
            className="p-2 rounded-lg"
            style={{ backgroundColor: "rgba(99, 102, 241, 0.1)" }}
          >
            <FileText className="h-6 w-6 text-indigo-600" />
          </div>

          <div>
            <h1 
              className="text-2xl font-bold"
              style={{ color: theme.textPrimary }}
            >
              Add New Scheme
            </h1>
            <p 
              className="text-sm"
              style={{ color: theme.textSecondary }}
            >
              Create a new government welfare scheme
            </p>
          </div>
        </div>

        <Link href="/admin/scheme">
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
            <FileText className="h-5 w-5 text-indigo-600" />
            Scheme Information
          </CardTitle>
          <p 
            className="text-sm mt-1"
            style={{ color: theme.textSecondary }}
          >
            Configure scheme details for citizen welfare programs
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
                <FileText className="h-4 w-4" />
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label 
                    htmlFor="name"
                    style={{ color: theme.textPrimary }}
                  >
                    Scheme Name *
                  </Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g., SUBHADRA Scheme"
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
                    htmlFor="code"
                    style={{ color: theme.textPrimary }}
                  >
                    Scheme Code *
                  </Label>
                  <Input
                    id="code"
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                    placeholder="e.g., SUBHADRA-2024"
                    maxLength={20}
                    required
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: theme.input.border,
                      color: theme.input.text,
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label 
                  htmlFor="description"
                  style={{ color: theme.textPrimary }}
                >
                  Description *
                </Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Brief description of the scheme and its objectives"
                  rows={3}
                  className="resize-none"
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
                  htmlFor="department"
                  style={{ color: theme.textPrimary }}
                >
                  Managing Department *
                </Label>
                <Select
                  value={form.department}
                  onValueChange={(value) => setForm({ ...form, department: value })}
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
            </div>

            {/* BENEFICIARY INFORMATION */}
            <div 
              className="space-y-4 pt-6 border-t"
              style={{ borderColor: theme.border }}
            >
              <h3 
                className="text-sm font-semibold flex items-center gap-2"
                style={{ color: theme.textSecondary }}
              >
                <Users className="h-4 w-4" />
                Beneficiary Information
              </h3>

              <div className="space-y-2">
                <Label style={{ color: theme.textPrimary }}>
                  Beneficiary Types * (Select all that apply)
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-md border max-h-60 overflow-y-auto"
                  style={{ 
                    borderColor: theme.border,
                    backgroundColor: theme.backgroundSecondary 
                  }}
                >
                  {BENEFICIARY_TYPES.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`beneficiary-${type}`}
                        checked={form.beneficiaryType.includes(type)}
                        onCheckedChange={() => handleBeneficiaryToggle(type)}
                      />
                      <Label
                        htmlFor={`beneficiary-${type}`}
                        className="text-sm font-normal cursor-pointer"
                        style={{ color: theme.textPrimary }}
                      >
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
                {form.beneficiaryType.length > 0 && (
                  <p className="text-xs" style={{ color: theme.textSecondary }}>
                    Selected: {form.beneficiaryType.join(", ")}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label 
                  htmlFor="eligibilityCriteria"
                  style={{ color: theme.textPrimary }}
                >
                  Eligibility Criteria *
                </Label>
                <Textarea
                  id="eligibilityCriteria"
                  value={form.eligibilityCriteria}
                  onChange={handleChange}
                  placeholder="Detailed eligibility criteria (age, income limit, category, etc.)"
                  rows={3}
                  className="resize-none"
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
                  htmlFor="benefits"
                  style={{ color: theme.textPrimary }}
                >
                  Benefits *
                </Label>
                <Textarea
                  id="benefits"
                  value={form.benefits}
                  onChange={handleChange}
                  placeholder="What benefits/assistance will beneficiaries receive (financial, services, etc.)"
                  rows={2}
                  className="resize-none"
                  required
                  style={{
                    backgroundColor: theme.input.bg,
                    borderColor: theme.input.border,
                    color: theme.input.text,
                  }}
                />
              </div>
            </div>

            {/* REQUIRED DOCUMENTS */}
            <div 
              className="space-y-4 pt-6 border-t"
              style={{ borderColor: theme.border }}
            >
              <h3 
                className="text-sm font-semibold flex items-center gap-2"
                style={{ color: theme.textSecondary }}
              >
                <FileCheck className="h-4 w-4" />
                Required Documents
              </h3>

              <div className="space-y-2">
                <Label style={{ color: theme.textPrimary }}>
                  Select Required Documents
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-md border max-h-60 overflow-y-auto"
                  style={{ 
                    borderColor: theme.border,
                    backgroundColor: theme.backgroundSecondary 
                  }}
                >
                  {COMMON_DOCUMENTS.map((doc) => (
                    <div key={doc} className="flex items-center space-x-2">
                      <Checkbox
                        id={`doc-${doc}`}
                        checked={form.documents.includes(doc)}
                        onCheckedChange={() => handleDocumentToggle(doc)}
                      />
                      <Label
                        htmlFor={`doc-${doc}`}
                        className="text-sm font-normal cursor-pointer"
                        style={{ color: theme.textPrimary }}
                      >
                        {doc}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Custom Document */}
              <div className="space-y-2">
                <Label style={{ color: theme.textPrimary }}>
                  Add Custom Document
                </Label>
                <div className="flex gap-2">
                  <Input
                    value={customDocument}
                    onChange={(e) => setCustomDocument(e.target.value)}
                    placeholder="Enter custom document name"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addCustomDocument()
                      }
                    }}
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: theme.input.border,
                      color: theme.input.text,
                    }}
                  />
                  <Button
                    type="button"
                    onClick={addCustomDocument}
                    style={{
                      background: theme.buttonPrimary.bg,
                      color: theme.buttonPrimary.text,
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>

              {/* Selected Documents */}
              {form.documents.length > 0 && (
                <div className="space-y-2">
                  <Label style={{ color: theme.textPrimary }}>
                    Selected Documents ({form.documents.length})
                  </Label>
                  <div className="flex flex-wrap gap-2 p-3 rounded-md border"
                    style={{ 
                      borderColor: theme.border,
                      backgroundColor: theme.backgroundSecondary 
                    }}
                  >
                    {form.documents.map((doc) => (
                      <div
                        key={doc}
                        className="flex items-center gap-1 px-3 py-1 rounded-md text-sm"
                        style={{
                          backgroundColor: theme.cardBackground,
                          color: theme.textPrimary,
                          border: `1px solid ${theme.border}`,
                        }}
                      >
                        <span>{doc}</span>
                        <button
                          type="button"
                          onClick={() => removeDocument(doc)}
                          className="ml-1 hover:opacity-70"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* APPLICATION PROCESS & DATES */}
            <div 
              className="space-y-4 pt-6 border-t"
              style={{ borderColor: theme.border }}
            >
              <h3 
                className="text-sm font-semibold flex items-center gap-2"
                style={{ color: theme.textSecondary }}
              >
                <Calendar className="h-4 w-4" />
                Application & Timeline
              </h3>

              <div className="space-y-2">
                <Label 
                  htmlFor="applicationProcess"
                  style={{ color: theme.textPrimary }}
                >
                  Application Process *
                </Label>
                <Textarea
                  id="applicationProcess"
                  value={form.applicationProcess}
                  onChange={handleChange}
                  placeholder="How can citizens apply for this scheme (online portal, offline, through panchayat, etc.)"
                  rows={3}
                  className="resize-none"
                  required
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
                    htmlFor="launchDate"
                    style={{ color: theme.textPrimary }}
                  >
                    Launch Date
                  </Label>
                  <Input
                    id="launchDate"
                    type="date"
                    value={form.launchDate}
                    onChange={handleChange}
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: theme.input.border,
                      color: theme.input.text,
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label 
                    htmlFor="endDate"
                    style={{ color: theme.textPrimary }}
                  >
                    End Date (Optional)
                  </Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={form.endDate}
                    onChange={handleChange}
                    min={form.launchDate}
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
                    Leave empty if scheme is ongoing
                  </p>
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
                Scheme Status
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
                    Active Scheme
                  </Label>
                  <p 
                    className="text-xs mt-1"
                    style={{ color: theme.textTertiary }}
                  >
                    {form.active 
                      ? "Scheme is active and citizens can apply" 
                      : "Scheme is inactive and not accepting applications"}
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
                <Link href="/admin/scheme">
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
                  Create Scheme
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}