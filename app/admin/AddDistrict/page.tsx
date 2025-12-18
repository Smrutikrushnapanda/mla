"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowLeft, MapPin, Map } from "lucide-react"

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

export default function AddDistrictPage() {
  const { theme } = useThemeStore()
  const [form, setForm] = useState({
    name: "",
    state: "",
    constituencies: "",
    population: "",
    area: "",
    headquarters: "",
    pinCode: "",
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
    if (!form.name || !form.state) {
      alert("Please fill all required fields")
      return
    }

    if (form.constituencies && isNaN(Number(form.constituencies))) {
      alert("Constituencies must be a valid number")
      return
    }

    // API CALL - Create district in MLA Connect system
    const payload = {
      ...form,
      constituencies: form.constituencies ? parseInt(form.constituencies) : 0,
      createdAt: new Date().toISOString(),
    }

    console.log("District Payload:", payload)
    alert("District created successfully in MLA Connect system")
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
              Create a new district for constituency & citizen mapping
            </p>
          </div>
        </div>

        {/* RIGHT: BACK BUTTON */}
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
            District Information
          </CardTitle>
          <p 
            className="text-sm mt-1"
            style={{ color: theme.textSecondary }}
          >
            Configure district details for the MLA Connect platform
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
                <MapPin className="h-4 w-4" />
                Basic Information
              </h3>
              
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
                    htmlFor="headquarters"
                    style={{ color: theme.textPrimary }}
                  >
                    District Headquarters
                  </Label>
                  <Input
                    id="headquarters"
                    value={form.headquarters}
                    onChange={handleChange}
                    placeholder="Enter headquarters city"
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
                    placeholder="Enter PIN code"
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

            {/* STATISTICAL INFORMATION */}
            <div 
              className="space-y-4 pt-6 border-t"
              style={{ borderColor: theme.border }}
            >
              <h3 
                className="text-sm font-semibold"
                style={{ color: theme.textSecondary }}
              >
                Statistical Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label 
                    htmlFor="constituencies"
                    style={{ color: theme.textPrimary }}
                  >
                    Number of Constituencies
                  </Label>
                  <Input
                    id="constituencies"
                    type="number"
                    value={form.constituencies}
                    onChange={handleChange}
                    placeholder="0"
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
                    Total assembly constituencies in district
                  </p>
                </div>

                <div className="space-y-2">
                  <Label 
                    htmlFor="population"
                    style={{ color: theme.textPrimary }}
                  >
                    Population
                  </Label>
                  <Input
                    id="population"
                    value={form.population}
                    onChange={handleChange}
                    placeholder="e.g., 2.25M"
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
                    Total population count
                  </p>
                </div>

                <div className="space-y-2">
                  <Label 
                    htmlFor="area"
                    style={{ color: theme.textPrimary }}
                  >
                    Area (km²)
                  </Label>
                  <Input
                    id="area"
                    value={form.area}
                    onChange={handleChange}
                    placeholder="e.g., 2,813 km²"
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
                    Total geographical area
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
                District Status
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
                  Active District
                </Label>
                <p 
                  className="text-xs ml-2"
                  style={{ color: theme.textTertiary }}
                >
                  {form.active ? "District is active and visible" : "District is inactive"}
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
                placeholder="Add any additional information about the district..."
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
                <Link href="/admin/define-districts">
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
                  Create District
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}