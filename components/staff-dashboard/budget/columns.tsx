// components/mla-dashboard/budget-utilization/table/columns.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Eye, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useThemeStore } from "@/store/useThemeStore"

/* ============================
   BudgetUtilization Type
============================ */
export type BudgetUtilization = {
  sl: number
  id: string
  projectName: string
  category: string
  department: string
  sanctionedBudget: number
  expenditure: number
  balance: number
  utilization: number
  status: "On Track" | "Over Budget" | "Under Utilized" | "Completed"
}

/* ============================
   Actions Cell
============================ */
const ActionsCell = ({ budget }: { budget: BudgetUtilization }) => {
  const { theme } = useThemeStore()

  return (
    <div className="text-right">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="border shadow-lg"
          style={{
            backgroundColor: theme.backgroundSecondary,
            borderColor: theme.border,
            color: theme.textPrimary,
          }}
        >
          <DropdownMenuLabel style={{ color: theme.textPrimary }}>
            Actions
          </DropdownMenuLabel>

          <DropdownMenuItem className="cursor-pointer">
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

/* ============================
   Table Columns
============================ */
export const columns: ColumnDef<BudgetUtilization>[] = [
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

  /* 🆔 PROJECT ID */
  {
    accessorKey: "id",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 font-medium"
      >
        Project ID
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
  },

  /* 📁 PROJECT NAME */
  {
    accessorKey: "projectName",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 font-medium"
      >
        Project Name
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <div className="font-medium max-w-xs truncate" title={row.getValue("projectName")}>
        {row.getValue("projectName")}
      </div>
    ),
  },

  /* 🏷 CATEGORY */
  {
    accessorKey: "category",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 font-medium"
      >
        Category
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
  },

  /* 🏛 DEPARTMENT */
  {
    accessorKey: "department",
    header: "Department",
  },

  /* 💰 SANCTIONED BUDGET */
  {
    accessorKey: "sanctionedBudget",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 font-medium"
      >
        Sanctioned Budget
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const amount = row.getValue("sanctionedBudget") as number
      const lakhs = (amount / 100000).toFixed(2)
      return (
        <div className="font-medium">
          ₹{lakhs} L
        </div>
      )
    },
  },

  /* 💸 EXPENDITURE */
  {
    accessorKey: "expenditure",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 font-medium"
      >
        Expenditure
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const amount = row.getValue("expenditure") as number
      const lakhs = (amount / 100000).toFixed(2)
      return (
        <div className="font-medium">
          ₹{lakhs} L
        </div>
      )
    },
  },

  /* 💵 BALANCE */
  {
    accessorKey: "balance",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 font-medium"
      >
        Balance
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const amount = row.getValue("balance") as number
      const lakhs = (amount / 100000).toFixed(2)
      const isNegative = amount < 0
      return (
        <div className={`font-medium ${isNegative ? 'text-red-600' : ''}`}>
          {isNegative ? '-' : ''}₹{Math.abs(parseFloat(lakhs)).toFixed(2)} L
        </div>
      )
    },
  },

  /* 📊 UTILIZATION */
  {
    accessorKey: "utilization",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 font-medium"
      >
        Utilization %
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const utilization = row.getValue("utilization") as number
      const color = utilization > 100 ? '#ef4444' : utilization >= 70 ? '#22c55e' : utilization >= 40 ? '#3b82f6' : '#f59e0b'
      
      return (
        <div className="w-28">
          <div className="flex items-center gap-2">
            <div 
              className="flex-1 h-2 rounded-full overflow-hidden"
              style={{ backgroundColor: "#e5e7eb" }}
            >
              <div 
                className="h-full rounded-full transition-all"
                style={{ 
                  width: `${Math.min(utilization, 100)}%`,
                  backgroundColor: color
                }}
              />
            </div>
            <span 
              className="text-xs font-medium"
              style={{ color }}
            >
              {utilization}%
            </span>
          </div>
        </div>
      )
    },
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
      const colors = {
        "On Track": "bg-green-500",
        "Over Budget": "bg-red-500",
        "Under Utilized": "bg-orange-500",
        "Completed": "bg-blue-500"
      }
      return (
        <span className={`px-2 py-1 text-xs rounded-md text-white ${colors[status as keyof typeof colors]}`}>
          {status}
        </span>
      )
    },
  },

  /* ⚙ ACTIONS */
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => <ActionsCell budget={row.original} />,
    enableHiding: false,
  },
]