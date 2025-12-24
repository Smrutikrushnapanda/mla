// components/mla-dashboard/grievance-category/table/columns.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

/* ============================
   GrievanceCategory Type
============================ */
export type GrievanceCategory = {
  sl: number
  id: string
  categoryName: string
  description: string
  department: string
  totalGrievances: number
  pendingGrievances: number
  resolvedGrievances: number
  avgResolutionTime: string
  priority: "Low" | "Medium" | "High" | "Critical"
  status: "Active" | "Inactive"
}

/* ============================
   Table Columns
============================ */
export const columns: ColumnDef<GrievanceCategory>[] = [
  /* 🔢 SL COLUMN */
  {
    accessorKey: "sl",
    header: () => <div className="text-center font-medium">SL</div>,
    cell: ({ row }) => (
      <div className="text-center font-medium text-muted-foreground">
        {row.getValue("sl")}
      </div>
    ),
    enableSorting: false,
    size: 60,
  },

  /* 🆔 CATEGORY ID */
  {
    accessorKey: "id",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 font-medium"
      >
        Category ID
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
  },

  /* 📁 CATEGORY NAME */
  {
    accessorKey: "categoryName",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 font-medium"
      >
        Category Name
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <div className="font-medium">
        {row.getValue("categoryName")}
      </div>
    ),
  },

  /* 📝 DESCRIPTION */
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description") as string
      return (
        <div className="max-w-xs truncate" title={description}>
          {description}
        </div>
      )
    },
  },

  /* 🏛 DEPARTMENT */
  {
    accessorKey: "department",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 font-medium"
      >
        Department
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
  },

  /* 📊 TOTAL GRIEVANCES */
  {
    accessorKey: "totalGrievances",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 font-medium"
      >
        Total
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <div className="text-center font-medium">
        {row.getValue("totalGrievances")}
      </div>
    ),
  },

  /* ⏳ PENDING GRIEVANCES */
  {
    accessorKey: "pendingGrievances",
    header: "Pending",
    cell: ({ row }) => (
      <div className="text-center">
        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-md bg-orange-100 text-orange-800 border border-orange-300">
          {row.getValue("pendingGrievances")}
        </span>
      </div>
    ),
  },

  /* ✅ RESOLVED GRIEVANCES */
  {
    accessorKey: "resolvedGrievances",
    header: "Resolved",
    cell: ({ row }) => (
      <div className="text-center">
        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-md bg-green-100 text-green-800 border border-green-300">
          {row.getValue("resolvedGrievances")}
        </span>
      </div>
    ),
  },

  /* ⚡ STATUS */
  {
    accessorKey: "status",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 font-medium"
      >
        Status
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <span
          className={`px-2 py-1 text-xs rounded-md text-white ${
            status === "Active" ? "bg-green-500" : "bg-gray-400"
          }`}
        >
          {status}
        </span>
      )
    },
  },

  /* 👁 VIEW ACTION */
  {
    id: "actions",
    header: () => <div className="text-right">Action</div>,
    cell: () => (
      <div className="text-right">
        <Button variant="ghost" size="sm" className="h-8">
          <Eye className="h-4 w-4" />
        </Button>
      </div>
    ),
    enableHiding: false,
  },
]