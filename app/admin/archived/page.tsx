// app/(roles)/admin-user/archived-users/page.tsx
"use client"

import { DataTable } from "../../../components/admin-dashboard/admin-user/tables/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { 
  ArrowUpDown,
  MoreHorizontal,
  Eye,
  ArchiveRestore,
  Trash2
} from "lucide-react"
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
import { toast } from "sonner"

type ArchivedUser = {
  id: number
  name: string
  email: string
  role: "Citizen" | "Staff" | "Admin"
  status: "Active" | "Inactive"
  archivedDate: string
  joinedDate: string
}

// Mock data - only archived users
const archivedUsersData: ArchivedUser[] = [
  { id: 1, name: "Alex Thompson", email: "alex@example.com", role: "Citizen", status: "Inactive", archivedDate: "2024-11-15", joinedDate: "2024-01-10" },
  { id: 2, name: "Jessica Martinez", email: "jessica@example.com", role: "Staff", status: "Inactive", archivedDate: "2024-11-20", joinedDate: "2024-02-14" },
  { id: 3, name: "Christopher Lee", email: "chris@example.com", role: "Admin", status: "Inactive", archivedDate: "2024-11-25", joinedDate: "2024-03-22" },
  { id: 4, name: "Amanda White", email: "amanda@example.com", role: "Citizen", status: "Inactive", archivedDate: "2024-12-01", joinedDate: "2024-04-18" },
  { id: 5, name: "Daniel Harris", email: "daniel@example.com", role: "Staff", status: "Inactive", archivedDate: "2024-12-05", joinedDate: "2024-05-30" },
  { id: 6, name: "Sophia Clark", email: "sophia@example.com", role: "Citizen", status: "Inactive", archivedDate: "2024-12-08", joinedDate: "2024-06-12" },
  { id: 7, name: "Matthew Lewis", email: "matthew@example.com", role: "Staff", status: "Inactive", archivedDate: "2024-12-10", joinedDate: "2024-07-05" },
]

// Actions Cell Component
const ActionsCell = ({ user }: { user: ArchivedUser }) => {
  const { theme } = useThemeStore()

  const handleView = () => {
    console.log("Viewing archived user:", user)
    toast.info(`Viewing ${user.name}`)
  }

  const handleRestore = () => {
    console.log("Restoring user:", user)
    toast.success(`${user.name} has been restored`)
  }

  const handlePermanentDelete = () => {
    console.log("Permanently deleting user:", user)
    toast.error(`${user.name} has been permanently deleted`)
  }

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
          className="border shadow-lg w-48"
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
            onClick={handleView}
            className="cursor-pointer"
            style={{ color: theme.textPrimary }}
          >
            <Eye className="mr-2 h-4 w-4" />
            <span>View Details</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator style={{ backgroundColor: theme.border }} />

          <DropdownMenuItem
            onClick={handleRestore}
            className="cursor-pointer text-blue-600 focus:bg-blue-50 focus:text-blue-700"
          >
            <ArchiveRestore className="mr-2 h-4 w-4" />
            <span>Restore User</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handlePermanentDelete}
            className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Delete Permanently</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

// Column Definitions for Archived Users
const archivedColumns: ColumnDef<ArchivedUser>[] = [
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
  {
    accessorKey: "email",
    header: "Email",
  },
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
        Admin: "bg-red-100 text-red-800 border border-red-300",
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
      return date.toLocaleDateString("en-US", { 
        year: "numeric", 
        month: "short", 
        day: "numeric" 
      })
    },
  },
  {
    accessorKey: "joinedDate",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 hover:opacity-80 font-medium transition"
        >
          Joined Date
          <ArrowUpDown className="h-4 w-4" />
        </button>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("joinedDate"))
      return date.toLocaleDateString("en-US", { 
        year: "numeric", 
        month: "short", 
        day: "numeric" 
      })
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => <ActionsCell user={row.original} />,
  },
]

export default function ArchivedUsersPage() {
  const { theme } = useThemeStore()

  return (
    <div className="h-full w-full p-6">
      <div 
        className="w-full rounded-lg border shadow-lg p-6"
        style={{
          background: theme.cardBackground,
          borderColor: theme.border,
        }}
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 
              className="text-2xl font-bold"
              style={{ color: theme.textPrimary }}
            >
              Archived Users
            </h2>
            <p 
              className="text-sm mt-1"
              style={{ color: theme.textTertiary }}
            >
              Manage and restore archived user accounts
            </p>
          </div>
        </div>

        <DataTable columns={archivedColumns} data={archivedUsersData} />
      </div>
    </div>
  )
}