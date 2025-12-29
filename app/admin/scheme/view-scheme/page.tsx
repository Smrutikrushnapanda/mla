"use client"

import { ArrowLeft, FileText, Calendar, Building, Users, Shield, Printer, Share2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useThemeStore } from "@/store/useThemeStore"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

/* ---------------- MOCK SCHEME (same shape as your table) ---------------- */

const scheme = {
  name: "Subhadra Yojana",
  code: "SUBHADRA-2025",
  description:
    "Direct financial assistance to women of Odisha to support household welfare and economic empowerment",
  department: "Women & Child Development Department",
  beneficiaryType: ["Women", "Housewives", "Female Heads of Household"],
  eligibilityCriteria:
    "Adult women residents of Odisha belonging to eligible household categories as notified by the state government",
  benefits:
    "Annual cash assistance directly transferred to the beneficiary’s bank account",
  documents: [
    "Aadhar Card",
    "Residential Proof",
    "Bank Account Details",
    "Ration Card (if applicable)",
  ],
  applicationProcess:
    "Enrollment through online portal, Gram Panchayat/ULB camps and designated assistance centres; verification by local officials",
  launchDate: "01 Apr 2025",
  endDate: "Ongoing",
  active: true,
}

/* ---------------- PAGE ---------------- */

export default function SchemeDetailPage() {
  const router = useRouter()
  const { theme, mode } = useThemeStore()
  const isDarkMode = mode === "dark"

  return (
    <div
      className="min-h-screen p-4 md:p-6 space-y-6"
      style={{ background: theme.backgroundGradient }}
    >
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => router.back()}
            style={{
              borderColor: theme.border,
              color: isDarkMode ? "#fff" : "#000",
            }}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div>
            <h1 className="text-2xl font-bold" style={{ color: theme.textPrimary }}>
              Scheme Details
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="font-mono text-sm" style={{ color: theme.textSecondary }}>
                {scheme.code}
              </span>
              <Badge
                style={{
                  backgroundColor: scheme.active ? "#10b981" : "#6b7280",
                  color: "white",
                }}
              >
                {scheme.active ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            style={{ borderColor: theme.border, color: isDarkMode ? "#fff" : "#000" }}
            onClick={() => window.print()}
          >
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button
            variant="outline"
            style={{ borderColor: theme.border, color: isDarkMode ? "#fff" : "#000" }}
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
              alert("Link copied!")
            }}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          {/* OVERVIEW */}
          <Card style={{ background: theme.cardBackground, borderColor: theme.border }}>
            <CardHeader>
              <CardTitle style={{ color: theme.textPrimary }} className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Scheme Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                  Scheme Name
                </p>
                <p style={{ color: theme.textPrimary }} className="font-semibold">
                  {scheme.name}
                </p>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                  Description
                </p>
                <p style={{ color: theme.textPrimary }}>{scheme.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* ELIGIBILITY & BENEFITS */}
          <Card style={{ background: theme.cardBackground, borderColor: theme.border }}>
            <CardHeader>
              <CardTitle style={{ color: theme.textPrimary }} className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Eligibility & Benefits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                  Eligibility Criteria
                </p>
                <p style={{ color: theme.textPrimary }}>{scheme.eligibilityCriteria}</p>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                  Benefits
                </p>
                <p style={{ color: theme.textPrimary }} className="font-semibold">
                  {scheme.benefits}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* APPLICATION PROCESS */}
          <Card style={{ background: theme.cardBackground, borderColor: theme.border }}>
            <CardHeader>
              <CardTitle style={{ color: theme.textPrimary }} className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Application Process
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p style={{ color: theme.textPrimary }}>{scheme.applicationProcess}</p>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* META */}
          <Card style={{ background: theme.cardBackground, borderColor: theme.border }}>
            <CardHeader>
              <CardTitle style={{ color: theme.textPrimary }}>
                Scheme Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <Info label="Department" value={scheme.department} />
              <Info label="Launch Date" value={scheme.launchDate} />
              <Info label="End Date" value={scheme.endDate} />
            </CardContent>
          </Card>

          {/* BENEFICIARIES */}
          <Card style={{ background: theme.cardBackground, borderColor: theme.border }}>
            <CardHeader>
              <CardTitle style={{ color: theme.textPrimary }}>
                Beneficiary Types
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {scheme.beneficiaryType.map((b) => (
                <Badge
                  key={b}
                  style={{
                    backgroundColor: `${theme.buttonPrimary.bg}20`,
                    color: theme.textPrimary,
                  }}
                >
                  {b}
                </Badge>
              ))}
            </CardContent>
          </Card>

          {/* DOCUMENTS */}
          <Card style={{ background: theme.cardBackground, borderColor: theme.border }}>
            <CardHeader>
              <CardTitle style={{ color: theme.textPrimary }}>
                Required Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                {scheme.documents.map((doc) => (
                  <li key={doc} style={{ color: theme.textPrimary }}>
                    {doc}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

/* ---------------- SMALL COMPONENT ---------------- */

function Info({ label, value }: { label: string; value: string }) {
  const { theme } = useThemeStore()
  return (
    <div className="flex items-center justify-between">
      <span style={{ color: theme.textSecondary }}>{label}</span>
      <span style={{ color: theme.textPrimary }} className="font-medium">
        {value}
      </span>
    </div>
  )
}
