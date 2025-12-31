// components/mla-dashboard/manage-category/poll-category/table/columns.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Eye, Edit, Trash2, MoreHorizontal } from "lucide-react"
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
   PollCategory Type
============================ */
export type PollCategory = {
  sl: number
  id: string
  categoryName: string
  description: string
  totalPolls: number
  activePolls: number
  completedPolls: number
  totalVotes: number
  status: "Active" | "Inactive"
  createdDate: string
}

/* ============================
   Actions Cell
============================ */
const ActionsCell = ({ category }: { category: PollCategory }) => {
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
            View Polls
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer">
            <Edit className="mr-2 h-4 w-4" />
            Edit Category
          </DropdownMenuItem>

          <DropdownMenuSeparator style={{ backgroundColor: theme.border }} />

          <DropdownMenuItem
            className="cursor-pointer text-red-600 focus:bg-red-50"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Category
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

/* ============================
   Table Columns
============================ */
export const columns: ColumnDef<PollCategory>[] = [
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

  /* 📊 TOTAL POLLS */
  {
    accessorKey: "totalPolls",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 font-medium"
      >
        Total Polls
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <div className="text-center font-medium">
        {row.getValue("totalPolls")}
      </div>
    ),
  },

  /* 📈 ACTIVE POLLS */
  {
    accessorKey: "activePolls",
    header: "Active",
    cell: ({ row }) => (
      <div className="text-center">
        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-md bg-blue-100 text-blue-800 border border-blue-300">
          {row.getValue("activePolls")}
        </span>
      </div>
    ),
  },

  /* ✅ COMPLETED POLLS */
  {
    accessorKey: "completedPolls",
    header: "Completed",
    cell: ({ row }) => (
      <div className="text-center">
        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-md bg-green-100 text-green-800 border border-green-300">
          {row.getValue("completedPolls")}
        </span>
      </div>
    ),
  },

  /* 🗳 TOTAL VOTES */
  {
    accessorKey: "totalVotes",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 font-medium"
      >
        Total Votes
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const votes = row.getValue("totalVotes") as number
      return (
        <div className="text-center font-medium">
          {votes.toLocaleString("en-IN")}
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

  /* 📅 CREATED DATE */
  {
    accessorKey: "createdDate",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 font-medium"
      >
        Created Date
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdDate"))
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
    cell: ({ row }) => <ActionsCell category={row.original} />,
    enableHiding: false,
  },
]