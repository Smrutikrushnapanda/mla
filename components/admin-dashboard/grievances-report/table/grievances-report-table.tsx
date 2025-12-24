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
import { columns, GrievanceReport } from "./columns"
import { useThemeStore } from "@/store/useThemeStore"

// Mock data for grievance reports
const mockGrievanceReports: GrievanceReport[] = [
  {
    id: "1",
    grievanceId: "GRV-2024-001",
    citizenName: "Rajesh Kumar",
    category: "Infrastructure",
    subject: "Road repair needed near village square",
    priority: "High",
    status: "Resolved",
    submittedDate: "Mar 10, 2024",
    resolvedDate: "Mar 25, 2024",
    assignedTo: "PWD Officer",
    constituency: "Korei",
  },
  {
    id: "2",
    grievanceId: "GRV-2024-002",
    citizenName: "Priya Patel",
    category: "Healthcare",
    subject: "Medicine shortage at primary health center",
    priority: "High",
    status: "In Progress",
    submittedDate: "Mar 15, 2024",
    resolvedDate: null,
    assignedTo: "Health Officer",
    constituency: "Korei",
  },
  {
    id: "3",
    grievanceId: "GRV-2024-003",
    citizenName: "Amit Singh",
    category: "Water Supply",
    subject: "Water supply disruption for 3 days",
    priority: "High",
    status: "Resolved",
    submittedDate: "Feb 20, 2024",
    resolvedDate: "Feb 23, 2024",
    assignedTo: "Water Works",
    constituency: "Korei",
  },
  {
    id: "4",
    grievanceId: "GRV-2024-004",
    citizenName: "Sunita Sharma",
    category: "Education",
    subject: "Teacher shortage in government school",
    priority: "Medium",
    status: "In Progress",
    submittedDate: "Mar 12, 2024",
    resolvedDate: null,
    assignedTo: "Education Dept",
    constituency: "Korei",
  },
  {
    id: "5",
    grievanceId: "GRV-2024-005",
    citizenName: "Vikram Reddy",
    category: "Electricity",
    subject: "Frequent power cuts in residential area",
    priority: "Medium",
    status: "Pending",
    submittedDate: "Mar 18, 2024",
    resolvedDate: null,
    assignedTo: "Electrical Dept",
    constituency: "Korei",
  },
  {
    id: "6",
    grievanceId: "GRV-2024-006",
    citizenName: "Lakshmi Devi",
    category: "Infrastructure",
    subject: "Street lights not working",
    priority: "Low",
    status: "Resolved",
    submittedDate: "Feb 28, 2024",
    resolvedDate: "Mar 5, 2024",
    assignedTo: "Municipal Corp",
    constituency: "Korei",
  },
  {
    id: "7",
    grievanceId: "GRV-2024-007",
    citizenName: "Suresh Babu",
    category: "Healthcare",
    subject: "Ambulance service not available",
    priority: "High",
    status: "In Progress",
    submittedDate: "Mar 20, 2024",
    resolvedDate: null,
    assignedTo: "Health Officer",
    constituency: "Korei",
  },
  {
    id: "8",
    grievanceId: "GRV-2024-008",
    citizenName: "Anita Roy",
    category: "Water Supply",
    subject: "Contaminated water supply reported",
    priority: "High",
    status: "Resolved",
    submittedDate: "Mar 8, 2024",
    resolvedDate: "Mar 12, 2024",
    assignedTo: "Water Works",
    constituency: "Korei",
  },
  {
    id: "9",
    grievanceId: "GRV-2024-009",
    citizenName: "Ramesh Patnaik",
    category: "Other",
    subject: "Stray animal menace in locality",
    priority: "Low",
    status: "Pending",
    submittedDate: "Mar 22, 2024",
    resolvedDate: null,
    assignedTo: "Municipal Corp",
    constituency: "Korei",
  },
  {
    id: "10",
    grievanceId: "GRV-2024-010",
    citizenName: "Meena Das",
    category: "Education",
    subject: "School building in poor condition",
    priority: "Medium",
    status: "In Progress",
    submittedDate: "Mar 5, 2024",
    resolvedDate: null,
    assignedTo: "Education Dept",
    constituency: "Korei",
  },
  {
    id: "11",
    grievanceId: "GRV-2024-011",
    citizenName: "Kiran Kumar",
    category: "Infrastructure",
    subject: "Drainage blockage causing flooding",
    priority: "High",
    status: "Resolved",
    submittedDate: "Feb 15, 2024",
    resolvedDate: "Feb 20, 2024",
    assignedTo: "PWD Officer",
    constituency: "Korei",
  },
  {
    id: "12",
    grievanceId: "GRV-2024-012",
    citizenName: "Sanjay Mishra",
    category: "Electricity",
    subject: "New electricity connection delay",
    priority: "Low",
    status: "Rejected",
    submittedDate: "Mar 1, 2024",
    resolvedDate: "Mar 10, 2024",
    assignedTo: "Electrical Dept",
    constituency: "Korei",
  },
]

export function GrievancesReportTable() {
  const { theme } = useThemeStore()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: mockGrievanceReports,
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
      className="border shadow-lg "
      style={{
        background: theme.cardBackground,
        borderColor: theme.border,
      }}
    >
      <CardContent className="p-6">
        {/* FILTERS ABOVE TABLE */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          {/* Search */}
          <div className="relative md:col-span-1">
            <Search 
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
              style={{ color: theme.textTertiary }}
            />
            <Input
              placeholder="Search grievances..."
              className="pl-10"
              style={{
                backgroundColor: theme.input.bg,
                borderColor: theme.input.border,
                color: theme.input.text,
              }}
            />
          </div>

          {/* Date Range */}
          <Select defaultValue="30days">
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
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
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
              <SelectItem value="electricity">Electricity</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>

          {/* Priority Filter */}
          <Select defaultValue="all">
            <SelectTrigger
              style={{
                backgroundColor: theme.input.bg,
                borderColor: theme.input.border,
                color: theme.input.text,
              }}
            >
              <SelectValue placeholder="All Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
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
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
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
            Showing {table.getRowModel().rows.length} of {table.getFilteredRowModel().rows.length} grievances
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