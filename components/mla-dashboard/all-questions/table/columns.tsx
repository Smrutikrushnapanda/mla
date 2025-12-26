// components/mla-dashboard/public-voice/all-questions/table/columns.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Eye, MessageCircle, MoreHorizontal } from "lucide-react"
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

export type Question = {
  sl: number
  id: string
  citizenName: string
  question: string
  category: string
  format: "Text" | "Audio" | "Video"
  votes: number
  submittedDate: string
  status: "Pending" | "Answered"
}

const ActionsCell = ({ question }: { question: Question }) => {
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
            View Question
          </DropdownMenuItem>

          {question.status === "Pending" && (
            <DropdownMenuItem className="cursor-pointer text-green-600">
              <MessageCircle className="mr-2 h-4 w-4" />
              Answer Question
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator style={{ backgroundColor: theme.border }} />

          <DropdownMenuItem className="cursor-pointer">
            <Eye className="mr-2 h-4 w-4" />
            View Citizen Profile
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export const columns: ColumnDef<Question>[] = [
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
        Question ID
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
  },
  {
    accessorKey: "citizenName",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 font-medium"
      >
        Citizen Name
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <div className="font-medium">
        {row.getValue("citizenName")}
      </div>
    ),
  },
  {
    accessorKey: "question",
    header: "Question",
    cell: ({ row }) => {
      const question = row.getValue("question") as string
      return (
        <div className="max-w-md truncate" title={question}>
          {question}
        </div>
      )
    },
  },
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
  {
    accessorKey: "format",
    header: "Format",
    cell: ({ row }) => {
      const format = row.getValue("format") as string
      const colors = {
        Text: "bg-blue-100 text-blue-800 border border-blue-300",
        Audio: "bg-purple-100 text-purple-800 border border-purple-300",
        Video: "bg-green-100 text-green-800 border border-green-300"
      }
      return (
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-md ${colors[format as keyof typeof colors]}`}>
          {format}
        </span>
      )
    },
  },
  {
    accessorKey: "votes",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 font-medium"
      >
        Votes
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <div className="text-center font-bold text-purple-600">
        {(row.getValue("votes") as number).toLocaleString("en-IN")}
      </div>
    ),
  },
  {
    accessorKey: "submittedDate",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 font-medium"
      >
        Submitted On
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("submittedDate"))
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
        Pending: "bg-orange-500",
        Answered: "bg-green-500"
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
    cell: ({ row }) => <ActionsCell question={row.original} />,
    enableHiding: false,
  },
]