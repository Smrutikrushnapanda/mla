// admin-user/tables/columns.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react"
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

export type User = {
  id: number
  name: string
  email: string
  role: "Citizen" | "Staff" | "Admin"
  status: "Active" | "Inactive"
  joinedDate: string
}

// Separate component for Actions to use hooks
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

          <DropdownMenuItem 
            className="cursor-pointer"
            style={{ color: theme.textPrimary }}
          >
            <Eye className="mr-2 h-4 w-4" />
            <span>View</span>
          </DropdownMenuItem>

          <DropdownMenuItem 
            className="cursor-pointer"
            style={{ color: theme.textPrimary }}
          >
            <Edit className="mr-2 h-4 w-4" />
            <span>Edit</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator style={{ backgroundColor: theme.border }} />

          <DropdownMenuItem
            className={`cursor-pointer ${isActive ? "text-red-600 focus:bg-red-50" : "text-green-600 focus:bg-green-50"}`}
          >
            {isActive ? (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Deactivate</span>
              </>
            ) : (
              <>
                <ArrowUpDown className="mr-2 h-4 w-4" />
                <span>Activate</span>
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export const columns: ColumnDef<User>[] = [
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
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 hover:opacity-80 font-medium transition"
        >
          Status
          <ArrowUpDown className="h-4 w-4" />
        </button>
      )
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-md text-white ${
          status === "Active" ? "bg-green-500" : "bg-gray-400"
        }`}>
          {status}
        </span>
      )
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