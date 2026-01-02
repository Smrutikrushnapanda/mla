// components/mla-dashboard/budget-utilization/table/budget-utilization-table.tsx
"use client"

import { DataTable } from "./data-table"
import { columns, type BudgetUtilization } from "./columns"
import { useThemeStore } from "@/store/useThemeStore"

const data: BudgetUtilization[] = [
  {
    sl: 1,
    id: "PRJ-2024-001",
    projectName: "Road Construction from Badakotha to Korei Market",
    category: "Road Infrastructure",
    department: "Public Works",
    sanctionedBudget: 8000000, // ₹80 Lakhs
    expenditure: 6400000, // ₹64 Lakhs
    balance: 1600000, // ₹16 Lakhs
    utilization: 80,
    status: "On Track",
  },
  {
    sl: 2,
    id: "PRJ-2024-002",
    projectName: "Installation of LED Street Lights in Nuagaon",
    category: "Street Lighting",
    department: "Rural Development",
    sanctionedBudget: 2500000, // ₹25 Lakhs
    expenditure: 2500000, // ₹25 Lakhs
    balance: 0,
    utilization: 100,
    status: "Completed",
  },
  {
    sl: 3,
    id: "PRJ-2024-003",
    projectName: "Primary Health Center Renovation - Hatapada",
    category: "Primary Health Centers",
    department: "Health & Family Welfare",
    sanctionedBudget: 11500000, // ₹1.15 Cr
    expenditure: 5750000, // ₹57.5 Lakhs
    balance: 5750000, // ₹57.5 Lakhs
    utilization: 50,
    status: "On Track",
  },
  {
    sl: 4,
    id: "PRJ-2024-004",
    projectName: "Irrigation Canal Development - Jharbandh",
    category: "Irrigation Projects",
    department: "Water Resources",
    sanctionedBudget: 14000000, // ₹1.4 Cr
    expenditure: 4200000, // ₹42 Lakhs
    balance: 9800000, // ₹98 Lakhs
    utilization: 30,
    status: "Under Utilized",
  },
  {
    sl: 5,
    id: "PRJ-2024-005",
    projectName: "School Building Construction - Bansapal",
    category: "School Infrastructure",
    department: "Education",
    sanctionedBudget: 17500000, // ₹1.75 Cr
    expenditure: 0,
    balance: 17500000, // ₹1.75 Cr
    utilization: 0,
    status: "Under Utilized",
  },
  {
    sl: 6,
    id: "PRJ-2024-006",
    projectName: "Water Supply Pipeline - Telkoi",
    category: "Water Supply & Sanitation",
    department: "Water Resources",
    sanctionedBudget: 9000000, // ₹90 Lakhs
    expenditure: 9500000, // ₹95 Lakhs
    balance: -500000, // -₹5 Lakhs
    utilization: 106,
    status: "Over Budget",
  },
  {
    sl: 7,
    id: "PRJ-2024-007",
    projectName: "Agricultural Equipment Distribution",
    category: "Agricultural Support",
    department: "Agriculture",
    sanctionedBudget: 4500000, // ₹45 Lakhs
    expenditure: 4500000, // ₹45 Lakhs
    balance: 0,
    utilization: 100,
    status: "Completed",
  },
  {
    sl: 8,
    id: "PRJ-2024-008",
    projectName: "Bridge Construction over River - Korei Market",
    category: "Road Infrastructure",
    department: "Public Works",
    sanctionedBudget: 24000000, // ₹2.4 Cr
    expenditure: 25200000, // ₹2.52 Cr
    balance: -1200000, // -₹12 Lakhs
    utilization: 105,
    status: "Over Budget",
  },
  {
    sl: 9,
    id: "PRJ-2024-009",
    projectName: "Community Hall Construction - Badakotha",
    category: "School Infrastructure",
    department: "Rural Development",
    sanctionedBudget: 5800000,
    expenditure: 2900000,
    balance: 2900000,
    utilization: 50,
    status: "On Track",
  },
  {
    sl: 10,
    id: "PRJ-2024-010",
    projectName: "Drainage System Improvement - Nuagaon",
    category: "Water Supply & Sanitation",
    department: "Public Works",
    sanctionedBudget: 7200000,
    expenditure: 3600000,
    balance: 3600000,
    utilization: 50,
    status: "On Track",
  },
  {
    sl: 11,
    id: "PRJ-2024-011",
    projectName: "Solar Panel Installation - Schools",
    category: "School Infrastructure",
    department: "Education",
    sanctionedBudget: 3500000,
    expenditure: 3500000,
    balance: 0,
    utilization: 100,
    status: "Completed",
  },
  {
    sl: 12,
    id: "PRJ-2024-012",
    projectName: "Veterinary Hospital Upgrade - Jharbandh",
    category: "Primary Health Centers",
    department: "Health & Family Welfare",
    sanctionedBudget: 5200000,
    expenditure: 1040000,
    balance: 4160000,
    utilization: 20,
    status: "Under Utilized",
  },
  {
    sl: 13,
    id: "PRJ-2024-013",
    projectName: "Sports Complex Development - Bansapal",
    category: "School Infrastructure",
    department: "Rural Development",
    sanctionedBudget: 11500000,
    expenditure: 0,
    balance: 11500000,
    utilization: 0,
    status: "Under Utilized",
  },
  {
    sl: 14,
    id: "PRJ-2024-014",
    projectName: "Market Yard Modernization - Ghasipura",
    category: "Agricultural Support",
    department: "Agriculture",
    sanctionedBudget: 7800000,
    expenditure: 5460000,
    balance: 2340000,
    utilization: 70,
    status: "On Track",
  },
  {
    sl: 15,
    id: "PRJ-2024-015",
    projectName: "Public Library Construction - Hatapada",
    category: "School Infrastructure",
    department: "Education",
    sanctionedBudget: 3800000,
    expenditure: 1900000,
    balance: 1900000,
    utilization: 50,
    status: "On Track",
  },
]

export function BudgetUtilizationTable() {
  const { theme } = useThemeStore()

  return (
    <div 
      className="w-full rounded-lg border shadow-lg p-6"
      style={{
        background: theme.cardBackground,
        borderColor: theme.border,
      }}
    >
      <DataTable columns={columns} data={data} />
    </div>
  )
}