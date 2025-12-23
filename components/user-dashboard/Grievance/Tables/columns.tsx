import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Eye, Forward } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

/* ✅ DEFINE TYPE HERE */
export type Grievance = {
  grievanceNumber: string
  userName: string
  mobileNumber: string
  categoryName: string
  blockName: string
  priority: "Low" | "Medium" | "High"
  status: "Open" | "In Progress" | "Resolved"
  assignedTo: string
  createdAt: string
}

export const columns: ColumnDef<Grievance>[] = [
  {
    accessorKey: "grievanceNumber",
    header: "Grievance ID",
    cell: ({ row }) => (
      <span className="font-semibold whitespace-nowrap">
        {row.getValue("grievanceNumber")}
      </span>
    ),
  },
  {
    accessorKey: "userName",
    header: "Citizen Name",
  },
  {
    accessorKey: "mobileNumber",
    header: "Mobile",
  },
  {
    accessorKey: "categoryName",
    header: "Category",
  },
  {
    accessorKey: "blockName",
    header: "Block",
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 font-medium"
      >
        Priority
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const priority = row.getValue("priority") as string
      const colors: Record<string, string> = {
        Low: "bg-green-100 text-green-700",
        Medium: "bg-yellow-100 text-yellow-700",
        High: "bg-red-100 text-red-700",
      }
      return <Badge className={colors[priority]}>{priority}</Badge>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="secondary">
        {row.getValue("status")}
      </Badge>
    ),
  },
  {
    accessorKey: "assignedTo",
    header: "Assigned To",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 font-medium"
      >
        Created On
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"))
      return (
        <span className="whitespace-nowrap">
          {date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      )
    },
  },
  {
    id: "action",
    header: "Action",
    enableHiding: false,
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">Action</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Eye className="mr-2 h-4 w-4" /> View
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Forward className="mr-2 h-4 w-4" /> Forward
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]
