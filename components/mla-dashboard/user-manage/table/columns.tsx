// components/mla-dashboard/user-manage/table/columns.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Eye, Edit, UserX, UserCheck, MoreHorizontal, Archive } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useThemeStore } from "@/store/useThemeStore"

/* ============================
   User Type
============================ */
export type User = {
  sl: number
  id: string
  name: string
  email: string
  phone: string
  role: "Citizen" | "Staff"
  designation?: string
  village?: string
  gpName?: string
  status: "Active" | "Inactive"
  joinedDate: string
}

/* ============================
   Actions Cell
============================ */
const ActionsCell = ({ user }: { user: User }) => {
  const { theme } = useThemeStore()
  const isActive = user.status === "Active"

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

          {user.role === "Staff" && (
            <DropdownMenuItem className="cursor-pointer">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator style={{ backgroundColor: theme.border }} />

          <DropdownMenuItem
            className={`cursor-pointer ${
              isActive
                ? "text-red-600 focus:bg-red-50"
                : "text-green-600 focus:bg-green-50"
            }`}
          >
            {isActive ? (
              <>
                <UserX className="mr-2 h-4 w-4" />
                Deactivate
              </>
            ) : (
              <>
                <UserCheck className="mr-2 h-4 w-4" />
                Activate
              </>
            )}
          </DropdownMenuItem>

          <DropdownMenuSeparator style={{ backgroundColor: theme.border }} />

          <DropdownMenuItem
            className="cursor-pointer text-orange-600 focus:bg-orange-50"
          >
            <Archive className="mr-2 h-4 w-4" />
            Archive User
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

/* ============================
   Table Columns
============================ */
export const columns: ColumnDef<User>[] = [
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
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 font-medium"
      >
        User ID
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
  },

  /* 👤 NAME */
  {
    accessorKey: "name",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 font-medium"
      >
        Name
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
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
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 font-medium"
      >
        Role
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const role = row.getValue("role") as "Staff" | "Citizen"
      const colors = {
        Staff: "bg-blue-100 text-blue-800 border border-blue-300",
        Citizen: "bg-gray-100 text-gray-800 border border-gray-300",
      }
      return (
        <span className={`px-2 py-1 text-xs rounded-md ${colors[role]}`}>
          {role}
        </span>
      )
    },
  },

  /* 🏷 DESIGNATION */
  {
    accessorKey: "designation",
    header: "Designation",
    cell: ({ row }) => row.getValue("designation") || "-",
  },

  /* 🏠 VILLAGE */
  {
    accessorKey: "village",
    header: "Village / Area",
    cell: ({ row }) => row.getValue("village") || "-",
  },

  /* 🏛 GP */
  {
    accessorKey: "gpName",
    header: "GP / Block",
    cell: ({ row }) => row.getValue("gpName") || "-",
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

  /* 📅 JOINED DATE */
  {
    accessorKey: "joinedDate",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 font-medium"
      >
        Joined Date
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("joinedDate"))
      return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    },
  },

  /* ⚙ ACTIONS */
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => <ActionsCell user={row.original} />,
    enableHiding: false,
  },
]