// components/mla-dashboard/user-manage/archived/columns.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, RotateCcw, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { useThemeStore } from "@/store/useThemeStore"

export type ArchivedUser = {
  sl: number
  id: string
  name: string
  email: string
  phone: string
  role: "Citizen" | "Staff"
  designation?: string
  village?: string
  gpName?: string
  archivedDate: string
  archivedBy: string
  reason: string
}

const ActionsCell = ({ user }: { user: ArchivedUser }) => {
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
          
          <DropdownMenuItem 
            className="cursor-pointer"
            style={{ color: theme.textPrimary }}
          >
            <Eye className="mr-2 h-4 w-4" />
            <span>View Details</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator style={{ backgroundColor: theme.border }} />

          <DropdownMenuItem
            className="cursor-pointer text-green-600 focus:bg-green-50"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            <span>Restore User</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export const columns: ColumnDef<ArchivedUser>[] = [
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

  /* 🆔 USER ID */
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 hover:opacity-80 font-medium transition"
        >
          User ID
          <ArrowUpDown className="h-4 w-4" />
        </button>
      )
    },
  },

  /* 👤 NAME */
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 hover:opacity-80 font-medium transition"
        >
          Name
          <ArrowUpDown className="h-4 w-4" />
        </button>
      )
    },
  },

  /* 📧 EMAIL */
  {
    accessorKey: "email",
    header: "Email",
  },

  /* 📱 PHONE */
  {
    accessorKey: "phone",
    header: "Phone",
  },

  /* 👥 ROLE */
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 hover:opacity-80 font-medium transition"
        >
          Role
          <ArrowUpDown className="h-4 w-4" />
        </button>
      )
    },
    cell: ({ row }) => {
      const role = row.getValue("role") as string
      const colors = {
        Staff: "bg-blue-100 text-blue-800 border border-blue-300",
        Citizen: "bg-gray-100 text-gray-800 border border-gray-300"
      }
      return (
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-md ${colors[role as keyof typeof colors]}`}>
          {role}
        </span>
      )
    },
  },

  /* 🏷 DESIGNATION */
  {
    accessorKey: "designation",
    header: "Designation",
    cell: ({ row }) => {
      const designation = row.getValue("designation") as string | undefined
      return designation || "-"
    },
  },

  /* 🏠 VILLAGE */
  {
    accessorKey: "village",
    header: "Village/Area",
    cell: ({ row }) => {
      const village = row.getValue("village") as string | undefined
      return village || "-"
    },
  },

  /* 📦 ARCHIVE STATUS BADGE */
  {
    id: "archiveStatus",
    header: "Status",
    cell: () => {
      return (
        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-md text-white bg-orange-500">
          Archived
        </span>
      )
    },
    enableSorting: false,
  },

  /* 📅 ARCHIVED DATE */
  {
    accessorKey: "archivedDate",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 hover:opacity-80 font-medium transition"
        >
          Archived Date
          <ArrowUpDown className="h-4 w-4" />
        </button>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("archivedDate"))
      return date.toLocaleDateString("en-IN", { 
        day: "2-digit",
        month: "short", 
        year: "numeric" 
      })
    },
  },

  /* 👤 ARCHIVED BY */
  {
    accessorKey: "archivedBy",
    header: "Archived By",
  },

  /* 📝 REASON */
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => {
      const reason = row.getValue("reason") as string
      return (
        <div className="max-w-xs truncate" title={reason}>
          {reason}
        </div>
      )
    },
  },

  /* ⚙ ACTIONS */
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => <ActionsCell user={row.original} />,
  },
]