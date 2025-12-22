"use client";

import { useState } from "react";
import { Plus, FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useThemeStore } from "@/store/useThemeStore";
import { SchemeTable } from "@/components/admin-dashboard/Scheme/table/scheme-table";
import { Scheme } from "@/components/admin-dashboard/Scheme/table/columns";

// Helper function to format dates
const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric' 
  }
  return new Date(date).toLocaleDateString('en-GB', options)
}

// Mock schemes data
const mockSchemes: Scheme[] = [
  {
    id: "0",
    name: "Subhadra Yojana",
    code: "SUBHADRA-2025",
    description:
      "Direct financial assistance to women of Odisha to support household welfare and economic empowerment",
    department: "Women & Child Development Department",
    beneficiaryType: ["Women", "Housewives", "Female Heads of Household"],
    eligibilityCriteria:
      "Adult women residents of Odisha belonging to eligible household categories as notified by the state government",
    benefits: "Annual cash assistance directly transferred to the beneficiary’s bank account",
    documents: ["Aadhar Card", "Residential Proof", "Bank Account Details", "Ration Card (if applicable)"],
    applicationProcess:
      "Enrollment through online portal, Gram Panchayat/ULB camps and designated assistance centres; verification by local officials",
    launchDate: new Date("2025-04-01"),
    active: true,
  },
  {
    id: "1",
    name: "CM Kisan Yojana (Odisha)",
    code: "CMKISAN-2025",
    description:
      "Financial support to small, marginal and landless farming households in Odisha, aligned with PM-KISAN benefits",
    department: "Agriculture Department",
    beneficiaryType: ["Farmers", "Small Farmers", "Landless Agricultural Workers"],
    eligibilityCriteria:
      "Small and marginal farmers and landless agricultural households registered in Odisha as per state agriculture records",
    benefits: "₹4,000 per year per eligible farmer household in addition to central PM-KISAN benefits",
    documents: ["Aadhar Card", "Land Records (if applicable)", "Bank Account Details"],
    applicationProcess:
      "Automatic selection from verified farmer database, with provision to apply/update details through block-level agriculture office or online portal",
    launchDate: new Date("2024-09-01"),
    active: true,
  },
  {
    id: "2",
    name: "Ayushman Bharat – Odisha Health Assurance",
    code: "AB-OHA-2025",
    description:
      "Cashless health insurance coverage for poor and vulnerable families in Odisha under Ayushman Bharat convergence",
    department: "Health Department",
    beneficiaryType: ["Poor Families", "Low-Income Households"],
    eligibilityCriteria:
      "Families listed in National Food Security Act / SECC list or identified as economically vulnerable under state norms",
    benefits: "Cashless treatment coverage up to ₹10 lakh per family per year at empanelled hospitals",
    documents: ["Aadhar Card", "Ration Card", "Family Photo", "Health Card (if issued)"],
    applicationProcess:
      "Automatic enrollment of eligible families; Ayushman/State health cards distributed through camps and health facilities",
    launchDate: new Date("2024-10-01"),
    active: true,
  },
  {
    id: "3",
    name: "Enhanced Madhu Babu Pension (2025)",
    code: "MBPY-ENH-2025",
    description:
      "Enhanced social security pension for elderly, widows and persons with disabilities under revised BJP government norms",
    department: "Social Welfare Department",
    beneficiaryType: ["Senior Citizens", "Widows", "Persons with Disabilities"],
    eligibilityCriteria:
      "Age 60+ for old age pension, widows aged 18–60, and persons with at least 40% disability as per state guidelines",
    benefits: "₹1,000–₹3,500 per month depending on age and disability category",
    documents: ["Aadhar Card", "Age Proof", "Disability Certificate (if applicable)", "Bank Account"],
    applicationProcess:
      "Apply through Gram Panchayat/ULB or online portal; existing beneficiaries upgraded automatically to revised pension rates",
    launchDate: new Date("2025-01-01"),
    active: true,
  },
  {
    id: "4",
    name: "Nirman Shramik Samman Pension",
    code: "NSSP-2025",
    description:
      "Pension and social security support scheme for registered construction and building workers",
    department: "Labour Department",
    beneficiaryType: ["Construction Workers", "Labour"],
    eligibilityCriteria:
      "Registered construction and building workers aged 60 years and above with minimum years of contribution as per board norms",
    benefits: "₹1,000–₹1,500 per month pension plus accidental death and disability cover",
    documents: ["Labour Card", "Aadhar Card", "Age Proof", "Bank Account"],
    applicationProcess:
      "Apply through District Labour Office, Common Service Centre or online labour welfare portal",
    launchDate: new Date("2024-11-01"),
    active: true,
  },
  {
    id: "5",
    name: "Antyodaya Gruha Yojana (Odisha)",
    code: "AGY-2025",
    description:
      "Housing assistance for low-income rural households not covered under PM Awas Yojana – Gramin",
    department: "Rural Development Department",
    beneficiaryType: ["Rural Poor", "Homeless"],
    eligibilityCriteria:
      "Kutcha or homeless families in rural areas who are not included in PMAY-G permanent waitlist and meet state poverty criteria",
    benefits: "Financial assistance up to ₹1.50 lakh for construction of pucca house",
    documents: ["Aadhar Card", "Income Certificate", "Socio-Economic Survey ID", "Bank Account"],
    applicationProcess:
      "Beneficiaries identified through Gram Sabha; applications processed via Gram Panchayat and block office",
    launchDate: new Date("2024-07-15"),
    endDate: new Date("2027-03-31"),
    active: true,
  },
  {
    id: "6",
    name: "Pre-Matric Scholarship for SC/ST (Revised)",
    code: "PMS-SCST-2025",
    description:
      "Central–state assisted pre-matric scholarship for SC/ST students of classes 9 and 10 in Odisha",
    department: "Tribal Welfare Department",
    beneficiaryType: ["Students", "SC/ST Students"],
    eligibilityCriteria:
      "SC/ST students in class 9–10 with family income less than ₹2.50 lakh per annum and regular attendance",
    benefits:
      "Day scholars: ₹300–400 per month, Hostellers: ₹800–1,000 per month, plus reimbursement of compulsory fees",
    documents: ["Caste Certificate", "Income Certificate", "Aadhar Card", "Bank Account", "School ID"],
    applicationProcess:
      "Apply online through National Scholarship Portal; verification by school and district welfare office",
    launchDate: new Date("2025-06-01"),
    active: true,
  },
];


export default function SchemePage() {
  const { theme } = useThemeStore();
  const [schemes, setSchemes] = useState<Scheme[]>(mockSchemes);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);

  // Statistics
  const stats = {
    total: schemes.length,
    active: schemes.filter((s) => s.active).length,
    inactive: schemes.filter((s) => !s.active).length,
  };

  const handleToggleActive = (schemeId: string) => {
    setSchemes((prev) =>
      prev.map((s) => (s.id === schemeId ? { ...s, active: !s.active } : s))
    );
  };

  const openEditDialog = (scheme: Scheme) => {
    // Navigate to edit page or open edit dialog
    console.log("Edit scheme:", scheme);
  };

  const openViewDialog = (scheme: Scheme) => {
    setSelectedScheme(scheme);
    setIsViewDialogOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-2xl font-bold transition-colors"
            style={{ color: theme.textPrimary }}
          >
            Scheme Master
          </h1>
          <p
            className="text-sm mt-1 transition-colors"
            style={{ color: theme.textSecondary }}
          >
            Manage government welfare schemes and programs
          </p>
        </div>

        <Link href="/admin/AddScheme">
          <Button
            className="gap-2 transition-all duration-200 hover:scale-105 border-0"
            style={{
              background: theme.buttonPrimary.bg,
              color: theme.buttonPrimary.text,
            }}
          >
            <Plus className="h-4 w-4" />
            Add Scheme
          </Button>
        </Link>
      </div>

      {/* STATISTICS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Schemes", value: stats.total, color: "#3b82f6" },
          { label: "Active", value: stats.active, color: "#10b981" },
          { label: "Inactive", value: stats.inactive, color: "#f59e0b" },
        ].map((stat, index) => (
          <Card
            key={index}
            className="transition-all duration-200 hover:shadow-lg border py-0"
            style={{
              backgroundColor: theme.cardBackground,
              borderColor: theme.cardBorder,
            }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-sm font-medium transition-colors"
                    style={{ color: theme.textSecondary }}
                  >
                    {stat.label}
                  </p>
                  <p
                    className="text-3xl font-bold mt-2 transition-colors"
                    style={{ color: theme.textPrimary }}
                  >
                    {stat.value}
                  </p>
                </div>
                <div
                  className="h-12 w-12 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: `${stat.color}20`,
                  }}
                >
                  <FileText className="h-6 w-6" style={{ color: stat.color }} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* SCHEMES TABLE */}
      <SchemeTable
        data={schemes}
        onEdit={openEditDialog}
        onView={openViewDialog}
        onToggleActive={handleToggleActive}
      />

      {/* VIEW SCHEME DIALOG */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent
          className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto border"
          style={{
            backgroundColor: theme.cardBackground,
            borderColor: theme.cardBorder,
          }}
        >
          <DialogHeader>
            <DialogTitle style={{ color: theme.textPrimary }}>
              Scheme Details
            </DialogTitle>
            <DialogDescription style={{ color: theme.textSecondary }}>
              Complete information about this government scheme
            </DialogDescription>
          </DialogHeader>

          {selectedScheme && (
            <div className="grid gap-4 py-4">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                    Scheme Name
                  </Label>
                  <p className="mt-1 font-semibold" style={{ color: theme.textPrimary }}>
                    {selectedScheme.name}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                    Code
                  </Label>
                  <p className="mt-1">
                    <Badge
                      variant="outline"
                      className="font-mono"
                      style={{
                        borderColor: theme.cardBorder,
                        color: theme.textPrimary,
                      }}
                    >
                      {selectedScheme.code}
                    </Badge>
                  </p>
                </div>
              </div>

              {selectedScheme.description && (
                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                    Description
                  </Label>
                  <p className="mt-1" style={{ color: theme.textPrimary }}>
                    {selectedScheme.description}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                    Department
                  </Label>
                  <p className="mt-1 font-semibold" style={{ color: theme.textPrimary }}>
                    {selectedScheme.department}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                    Status
                  </Label>
                  <p className="mt-1">
                    <Badge
                      style={{
                        backgroundColor: selectedScheme.active ? "#10b981" : "#6b7280",
                        color: "#ffffff",
                      }}
                    >
                      {selectedScheme.active ? "Active" : "Inactive"}
                    </Badge>
                  </p>
                </div>
              </div>

              {/* Beneficiary Types */}
              <div>
                <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                  Beneficiary Types
                </Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedScheme.beneficiaryType.map((type) => (
                    <Badge
                      key={type}
                      variant="secondary"
                      style={{
                        backgroundColor: `${theme.buttonPrimary.bg}20`,
                        color: theme.textPrimary,
                      }}
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Eligibility */}
              {selectedScheme.eligibilityCriteria && (
                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                    Eligibility Criteria
                  </Label>
                  <p className="mt-1 text-sm" style={{ color: theme.textPrimary }}>
                    {selectedScheme.eligibilityCriteria}
                  </p>
                </div>
              )}

              {/* Benefits */}
              {selectedScheme.benefits && (
                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                    Benefits
                  </Label>
                  <p className="mt-1 text-sm font-semibold" style={{ color: theme.textPrimary }}>
                    {selectedScheme.benefits}
                  </p>
                </div>
              )}

              {/* Documents */}
              <div>
                <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                  Required Documents
                </Label>
                <ul className="mt-2 list-disc list-inside space-y-1">
                  {selectedScheme.documents.map((doc, index) => (
                    <li key={index} className="text-sm" style={{ color: theme.textPrimary }}>
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Application Process */}
              {selectedScheme.applicationProcess && (
                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                    How to Apply
                  </Label>
                  <p className="mt-1 text-sm" style={{ color: theme.textPrimary }}>
                    {selectedScheme.applicationProcess}
                  </p>
                </div>
              )}

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                    Launch Date
                  </Label>
                  <p className="mt-1 text-sm" style={{ color: theme.textPrimary }}>
                    {selectedScheme.launchDate 
                      ? formatDate(selectedScheme.launchDate)
                      : "—"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                    End Date
                  </Label>
                  <p className="mt-1 text-sm" style={{ color: theme.textPrimary }}>
                    {selectedScheme.endDate 
                      ? formatDate(selectedScheme.endDate)
                      : "Ongoing"}
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsViewDialogOpen(false);
                setSelectedScheme(null);
              }}
              style={{
                borderColor: theme.buttonOutline.border,
                color: theme.buttonOutline.text,
                backgroundColor: "transparent",
              }}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}