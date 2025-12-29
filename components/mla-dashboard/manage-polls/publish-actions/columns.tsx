// components/mla-dashboard/manage-polls/publish-actions/table/columns.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Eye, Download, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useThemeStore } from "@/store/useThemeStore"

export type PublishAction = {
  sl: number
  id: string
  pollTitle: string
  totalVotes: number
  winningOption: string
  actionTaken: string
  publishedDate: string
  status: "Implemented" | "In Progress" | "Planned"
}

const ActionsCell = ({ action }: { action: PublishAction }) => {
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

          <DropdownMenuItem className="cursor-pointer">
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export const columns: ColumnDef<PublishAction>[] = [
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
  {
    accessorKey: "id",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 font-medium"
      >
        Poll ID
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
  },
  {
    accessorKey: "pollTitle",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 font-medium"
      >
        Poll Title
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <div className="font-medium max-w-md truncate" title={row.getValue("pollTitle")}>
        {row.getValue("pollTitle")}
      </div>
    ),
  },
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
    cell: ({ row }) => (
      <div className="text-center font-medium">
        {(row.getValue("totalVotes") as number).toLocaleString("en-IN")}
      </div>
    ),
  },
  {
    accessorKey: "winningOption",
    header: "Winning Option",
    cell: ({ row }) => (
      <div className="font-medium text-green-700">
        {row.getValue("winningOption")}
      </div>
    ),
  },
  {
    accessorKey: "actionTaken",
    header: "Action Taken",
    cell: ({ row }) => {
      const action = row.getValue("actionTaken") as string
      return (
        <div className="max-w-xs truncate" title={action}>
          {action}
        </div>
      )
    },
  },
  {
    accessorKey: "publishedDate",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 font-medium"
      >
        Published Date
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("publishedDate"))
      return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    },
  },
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
        Implemented: "bg-green-500",
        "In Progress": "bg-blue-500",
        Planned: "bg-orange-500"
      }
      return (
        <span className={`px-2 py-1 text-xs rounded-md text-white ${colors[status as keyof typeof colors]}`}>
          {status}
        </span>
      )
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => <ActionsCell action={row.original} />,
    enableHiding: false,
  },
]