"use client"

import * as React from "react"
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Search, Calendar } from "lucide-react"
import { columns, ProjectReport } from "./columns"
import { useThemeStore } from "@/store/useThemeStore"

// Mock data for project reports
const mockProjectReports: ProjectReport[] = [
  {
    id: "1",
    projectName: "Village Road Construction - Phase 1",
    category: "Infrastructure",
    constituency: "Korei",
    status: "Completed",
    startDate: "Jan 10, 2024",
    completionDate: "Mar 15, 2024",
    budget: "₹25 Lakhs",
    spent: "₹24.5 Lakhs",
    progress: 100,
    beneficiaries: 5000,
  },
  {
    id: "2",
    projectName: "Primary Health Center Upgrade",
    category: "Healthcare",
    constituency: "Korei",
    status: "In Progress",
    startDate: "Feb 1, 2024",
    completionDate: "Jun 30, 2024",
    budget: "₹40 Lakhs",
    spent: "₹28 Lakhs",
    progress: 70,
    beneficiaries: 8000,
  },
  {
    id: "3",
    projectName: "Government School Building Repair",
    category: "Education",
    constituency: "Korei",
    status: "Delayed",
    startDate: "Dec 15, 2023",
    completionDate: "Apr 30, 2024",
    budget: "₹15 Lakhs",
    spent: "₹8 Lakhs",
    progress: 45,
    beneficiaries: 2000,
  },
  {
    id: "4",
    projectName: "Drinking Water Pipeline Extension",
    category: "Water Supply",
    constituency: "Korei",
    status: "Completed",
    startDate: "Nov 1, 2023",
    completionDate: "Feb 28, 2024",
    budget: "₹30 Lakhs",
    spent: "₹29 Lakhs",
    progress: 100,
    beneficiaries: 6500,
  },
  {
    id: "5",
    projectName: "Community Hall Construction",
    category: "Infrastructure",
    constituency: "Korei",
    status: "In Progress",
    startDate: "Mar 10, 2024",
    completionDate: "Aug 15, 2024",
    budget: "₹50 Lakhs",
    spent: "₹15 Lakhs",
    progress: 30,
    beneficiaries: 10000,
  },
  {
    id: "6",
    projectName: "Agricultural Equipment Distribution",
    category: "Agriculture",
    constituency: "Korei",
    status: "Completed",
    startDate: "Jan 5, 2024",
    completionDate: "Feb 10, 2024",
    budget: "₹20 Lakhs",
    spent: "₹19.8 Lakhs",
    progress: 100,
    beneficiaries: 1500,
  },
  {
    id: "7",
    projectName: "Street Light Installation",
    category: "Infrastructure",
    constituency: "Korei",
    status: "Planned",
    startDate: "May 1, 2024",
    completionDate: "Jul 31, 2024",
    budget: "₹12 Lakhs",
    spent: "₹0",
    progress: 0,
    beneficiaries: 3000,
  },
  {
    id: "8",
    projectName: "Mobile Medical Unit",
    category: "Healthcare",
    constituency: "Korei",
    status: "In Progress",
    startDate: "Feb 15, 2024",
    completionDate: "May 31, 2024",
    budget: "₹35 Lakhs",
    spent: "₹22 Lakhs",
    progress: 65,
    beneficiaries: 12000,
  },
  {
    id: "9",
    projectName: "Computer Lab for High School",
    category: "Education",
    constituency: "Korei",
    status: "Completed",
    startDate: "Dec 1, 2023",
    completionDate: "Jan 31, 2024",
    budget: "₹18 Lakhs",
    spent: "₹17.5 Lakhs",
    progress: 100,
    beneficiaries: 800,
  },
  {
    id: "10",
    projectName: "Irrigation Canal Repair",
    category: "Agriculture",
    constituency: "Korei",
    status: "Delayed",
    startDate: "Jan 20, 2024",
    completionDate: "Apr 20, 2024",
    budget: "₹28 Lakhs",
    spent: "₹12 Lakhs",
    progress: 40,
    beneficiaries: 4000,
  },
]

export function ProjectReportTable() {
  const { theme } = useThemeStore()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: mockProjectReports,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  })

  return (
    <Card
      className="border shadow-lg"
      style={{
        background: theme.cardBackground,
        borderColor: theme.border,
      }}
    >
      <CardContent className="p-6">
        {/* FILTERS ABOVE TABLE */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Search */}
          <div className="relative md:col-span-1">
            <Search 
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
              style={{ color: theme.textTertiary }}
            />
            <Input
              placeholder="Search projects..."
              className="pl-10"
              style={{
                backgroundColor: theme.input.bg,
                borderColor: theme.input.border,
                color: theme.input.text,
              }}
            />
          </div>

          {/* Date Range */}
          <Select defaultValue="all">
            <SelectTrigger
              style={{
                backgroundColor: theme.input.bg,
                borderColor: theme.input.border,
                color: theme.input.text,
              }}
            >
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="current">Current Year</SelectItem>
              <SelectItem value="q1">Q1 2024</SelectItem>
              <SelectItem value="q2">Q2 2024</SelectItem>
              <SelectItem value="q3">Q3 2024</SelectItem>
              <SelectItem value="q4">Q4 2024</SelectItem>
            </SelectContent>
          </Select>

          {/* Category Filter */}
          <Select defaultValue="all">
            <SelectTrigger
              style={{
                backgroundColor: theme.input.bg,
                borderColor: theme.input.border,
                color: theme.input.text,
              }}
            >
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="infrastructure">Infrastructure</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="water">Water Supply</SelectItem>
              <SelectItem value="agriculture">Agriculture</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select defaultValue="all">
            <SelectTrigger
              style={{
                backgroundColor: theme.input.bg,
                borderColor: theme.input.border,
                color: theme.input.text,
              }}
            >
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="delayed">Delayed</SelectItem>
              <SelectItem value="planned">Planned</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* TABLE */}
        <div className="rounded-md border" style={{ borderColor: theme.border }}>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  style={{ borderColor: theme.border }}
                  className="hover:bg-transparent"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      style={{
                        color: theme.textSecondary,
                        backgroundColor: theme.backgroundSecondary,
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    style={{ borderColor: theme.border }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        style={{ color: theme.textPrimary }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                    style={{ color: theme.textSecondary }}
                  >
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* PAGINATION */}
        <div className="flex items-center justify-between pt-4">
          <div className="text-sm" style={{ color: theme.textSecondary }}>
            Showing {table.getRowModel().rows.length} of {table.getFilteredRowModel().rows.length} projects
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              style={{
                borderColor: theme.buttonOutline.border,
                color: theme.buttonOutline.text,
              }}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <div className="text-sm font-medium px-3" style={{ color: theme.textPrimary }}>
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              style={{
                borderColor: theme.buttonOutline.border,
                color: theme.buttonOutline.text,
              }}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}