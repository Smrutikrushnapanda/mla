"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Map, Users } from "lucide-react"

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
import { Switch } from "@/components/ui/switch"
import { useThemeStore } from "@/store/useThemeStore"

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

const constituencyTypes = ["Urban", "Rural", "Semi-Urban"]

export default function AddConstituencyPage() {
  const { theme } = useThemeStore()
  const [form, setForm] = useState({
    name: "",
    district: "",
    state: "",
    type: "",
    voters: "",
    mlaName: "",
    mlaParty: "",
    assemblyNumber: "",
    reservedFor: "",
    active: true,
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
    if (!form.name || !form.district || !form.state || !form.type) {
      alert("Please fill all required fields")
      return
    }

    if (form.voters && isNaN(Number(form.voters))) {
      alert("Number of voters must be a valid number")
      return
    }

    if (form.assemblyNumber && isNaN(Number(form.assemblyNumber))) {
      alert("Assembly number must be a valid number")
      return
    }

    // API CALL - Create constituency in MLA Connect system
    const payload = {
      ...form,
      voters: form.voters ? parseInt(form.voters) : undefined,
      assemblyNumber: form.assemblyNumber ? parseInt(form.assemblyNumber) : undefined,
      createdAt: new Date().toISOString(),
    }

    console.log("Constituency Payload:", payload)
    alert("Constituency created successfully in MLA Connect system")
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
            <Map className="h-6 w-6 text-indigo-600" />
          </div>

          <div>
            <h1 
              className="text-2xl font-bold"
              style={{ color: theme.textPrimary }}
            >
              Add New Constituency
            </h1>
            <p 
              className="text-sm"
              style={{ color: theme.textSecondary }}
            >
              Create a new constituency for electoral information management
            </p>
          </div>
        </div>

        {/* RIGHT: BACK BUTTON */}
        <Link href="/admin/constituency">
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
            <Map className="h-5 w-5 text-indigo-600" />
            Constituency Information
          </CardTitle>
          <p 
            className="text-sm mt-1"
            style={{ color: theme.textSecondary }}
          >
            Configure constituency details and electoral information
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
                <Map className="h-4 w-4" />
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label 
                    htmlFor="name"
                    style={{ color: theme.textPrimary }}
                  >
                    Constituency Name *
                  </Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter constituency name"
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
                    htmlFor="assemblyNumber"
                    style={{ color: theme.textPrimary }}
                  >
                    Assembly Constituency Number
                  </Label>
                  <Input
                    id="assemblyNumber"
                    type="number"
                    value={form.assemblyNumber}
                    onChange={handleChange}
                    placeholder="e.g., 147"
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
                    htmlFor="district"
                    style={{ color: theme.textPrimary }}
                  >
                    District *
                  </Label>
                  <Input
                    id="district"
                    value={form.district}
                    onChange={handleChange}
                    placeholder="Enter district name"
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
                    htmlFor="state"
                    style={{ color: theme.textPrimary }}
                  >
                    State *
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setForm((prev) => ({ ...prev, state: value }))
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
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label 
                    htmlFor="type"
                    style={{ color: theme.textPrimary }}
                  >
                    Constituency Type *
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setForm((prev) => ({ ...prev, type: value }))
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
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent
                      style={{
                        backgroundColor: theme.cardBackground,
                        borderColor: theme.cardBorder,
                        color: theme.textPrimary,
                      }}
                    >
                      {constituencyTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label 
                    htmlFor="reservedFor"
                    style={{ color: theme.textPrimary }}
                  >
                    Reserved For
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setForm((prev) => ({ ...prev, reservedFor: value }))
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
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent
                      style={{
                        backgroundColor: theme.cardBackground,
                        borderColor: theme.cardBorder,
                        color: theme.textPrimary,
                      }}
                    >
                      <SelectItem value="General">General</SelectItem>
                      <SelectItem value="SC">SC (Scheduled Caste)</SelectItem>
                      <SelectItem value="ST">ST (Scheduled Tribe)</SelectItem>
                      <SelectItem value="OBC">OBC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* ELECTORAL INFORMATION */}
            <div 
              className="space-y-4 pt-6 border-t"
              style={{ borderColor: theme.border }}
            >
              <h3 
                className="text-sm font-semibold flex items-center gap-2"
                style={{ color: theme.textSecondary }}
              >
                <Users className="h-4 w-4" />
                Electoral Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <div className="space-y-2">
                  <Label 
                    htmlFor="voters"
                    style={{ color: theme.textPrimary }}
                  >
                    Number of Registered Voters
                  </Label>
                  <Input
                    id="voters"
                    type="number"
                    value={form.voters}
                    onChange={handleChange}
                    placeholder="e.g., 185000"
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
                    Total number of registered voters in this constituency
                  </p>
                </div>
              </div>
            </div>

            {/* CURRENT REPRESENTATIVE */}
            <div 
              className="space-y-4 pt-6 border-t"
              style={{ borderColor: theme.border }}
            >
              <h3 
                className="text-sm font-semibold"
                style={{ color: theme.textSecondary }}
              >
                Current Representative (MLA)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label 
                    htmlFor="mlaName"
                    style={{ color: theme.textPrimary }}
                  >
                    MLA Name
                  </Label>
                  <Input
                    id="mlaName"
                    value={form.mlaName}
                    onChange={handleChange}
                    placeholder="Enter current MLA name"
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: theme.input.border,
                      color: theme.input.text,
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label 
                    htmlFor="mlaParty"
                    style={{ color: theme.textPrimary }}
                  >
                    Political Party
                  </Label>
                  <Input
                    id="mlaParty"
                    value={form.mlaParty}
                    onChange={handleChange}
                    placeholder="Enter political party"
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
                Constituency Status
              </h3>
              
              <div className="flex items-center space-x-3">
                <Switch
                  id="active"
                  checked={form.active}
                  onCheckedChange={(checked) =>
                    setForm((prev) => ({ ...prev, active: checked }))
                  }
                />
                <Label 
                  htmlFor="active"
                  style={{ color: theme.textPrimary }}
                  className="cursor-pointer"
                >
                  Active Constituency
                </Label>
                <p 
                  className="text-xs ml-2"
                  style={{ color: theme.textTertiary }}
                >
                  {form.active ? "Constituency is active and visible" : "Constituency is inactive"}
                </p>
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
                placeholder="Add any additional information about the constituency..."
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
                * Required fields must be filled
              </p>
              <div className="flex gap-3">
                <Link href="/admin/define-constituencies">
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
                  Create Constituency
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}