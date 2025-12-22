"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Eye, Edit, Power, PowerOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useThemeStore } from "@/store/useThemeStore"
export type Scheme = {
  id: string
  name: string
  code: string
  description?: string
  department: string
  beneficiaryType: string[]
  eligibilityCriteria?: string
  benefits?: string
  documents: string[]
  applicationProcess?: string
  launchDate?: Date
  endDate?: Date
  active: boolean
}

// Separate component for Actions to use hooks
const ActionsCell = ({ 
  scheme, 
  onEdit, 
  onView,
  onToggleActive 
}: { 
  scheme: Scheme
  onEdit: (scheme: Scheme) => void
  onView: (scheme: Scheme) => void
  onToggleActive: (schemeId: string) => void
}) => {
  const { theme } = useThemeStore()
  const isActive = scheme.active

  return (
    <div className="flex items-center justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-5 w-5" />
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
            className="cursor-pointer"
            style={{ color: theme.textPrimary }}
            onClick={() => onView(scheme)}
          >
            <Eye className="mr-2 h-4 w-4" />
            <span>View</span>
          </DropdownMenuItem>

          <DropdownMenuItem 
            className="cursor-pointer"
            style={{ color: theme.textPrimary }}
            onClick={() => onEdit(scheme)}
          >
            <Edit className="mr-2 h-4 w-4" />
            <span>Edit</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator style={{ backgroundColor: theme.border }} />

          <DropdownMenuItem
            className={`cursor-pointer ${isActive ? "text-orange-600 focus:bg-orange-50" : "text-green-600 focus:bg-green-50"}`}
            onClick={() => onToggleActive(scheme.id)}
          >
            {isActive ? (
              <>
                <PowerOff className="mr-2 h-4 w-4" />
                <span>Deactivate</span>
              </>
            ) : (
              <>
                <Power className="mr-2 h-4 w-4" />
                <span>Activate</span>
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export const createColumns = (
  onEdit: (scheme: Scheme) => void,
  onView: (scheme: Scheme) => void,
  onToggleActive: (schemeId: string) => void
): ColumnDef<Scheme>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 hover:opacity-80 font-medium transition"
        >
          Scheme Name
          <ArrowUpDown className="h-4 w-4" />
        </button>
      )
    },
    cell: ({ row }) => {
      const { theme } = useThemeStore()
      const description = row.original.description
      
      return (
        <div>
          <span className="font-medium" style={{ color: theme.textPrimary }}>
            {row.getValue("name")}
          </span>
          {description && (
            <p className="text-xs mt-1" style={{ color: theme.textSecondary }}>
              {description.substring(0, 60)}...
            </p>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "code",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 hover:opacity-80 font-medium transition"
        >
          Code
          <ArrowUpDown className="h-4 w-4" />
        </button>
      )
    },
    cell: ({ row }) => {
      const { theme } = useThemeStore()
      return (
        <Badge
          variant="outline"
          className="font-mono"
          style={{
            borderColor: theme.cardBorder,
            color: theme.textPrimary,
          }}
        >
          {row.getValue("code")}
        </Badge>
      )
    },
  },
  {
    accessorKey: "department",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 hover:opacity-80 font-medium transition"
        >
          Department
          <ArrowUpDown className="h-4 w-4" />
        </button>
      )
    },
    cell: ({ row }) => {
      const { theme } = useThemeStore()
      return (
        <span className="text-sm" style={{ color: theme.textSecondary }}>
          {row.getValue("department")}
        </span>
      )
    },
  },
  {
    accessorKey: "beneficiaryType",
    header: "Beneficiary",
    cell: ({ row }) => {
      const { theme } = useThemeStore()
      const beneficiaryType = row.getValue("beneficiaryType") as string[]
      
      return (
        <div className="flex flex-wrap gap-1">
          {beneficiaryType.slice(0, 2).map((type) => (
            <Badge
              key={type}
              variant="secondary"
              className="text-xs"
              style={{
                backgroundColor: `${theme.buttonPrimary.bg}20`,
                color: theme.textPrimary,
              }}
            >
              {type}
            </Badge>
          ))}
          {beneficiaryType.length > 2 && (
            <Badge
              variant="secondary"
              className="text-xs"
              style={{
                backgroundColor: `${theme.buttonPrimary.bg}20`,
                color: theme.textPrimary,
              }}
            >
              +{beneficiaryType.length - 2}
            </Badge>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "launchDate",
    header: "Launch Date",
    cell: ({ row }) => {
      const { theme } = useThemeStore()
      const date = row.getValue("launchDate") as Date | undefined
      
      // Format date without date-fns
      const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = { 
          day: '2-digit', 
          month: 'short', 
          year: 'numeric' 
        }
        return new Date(date).toLocaleDateString('en-GB', options)
      }
      
      return (
        <span className="text-sm" style={{ color: theme.textSecondary }}>
          {date ? formatDate(date) : "—"}
        </span>
      )
    },
  },
  {
    accessorKey: "active",
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
      const active = row.getValue("active") as boolean
      return (
        <Badge
          className="font-medium px-3 py-1 rounded-md border-0"
          style={{
            backgroundColor: active ? "#10b981" : "#6b7280",
            color: "#ffffff",
          }}
        >
          {active ? "Active" : "Inactive"}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => (
      <ActionsCell 
        scheme={row.original} 
        onEdit={onEdit}
        onView={onView}
        onToggleActive={onToggleActive}
      />
    ),
  },
]