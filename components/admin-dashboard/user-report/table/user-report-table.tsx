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
import { columns, UserReport } from "./columns"
import { useThemeStore } from "@/store/useThemeStore"

// Simplified mock data
const mockUserReports: UserReport[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    role: "Citizen",
    status: "Active",
    registrationDate: "Jan 15, 2024",
    lastActive: "2 hours ago",
    totalLogins: 45,
    grievances: 8,
    schemes: 3,
    activityTrend: "up",
  },
  {
    id: "2",
    name: "Priya Patel",
    email: "priya.patel@example.com",
    role: "MLA Staff",
    status: "Active",
    registrationDate: "Feb 20, 2024",
    lastActive: "1 day ago",
    totalLogins: 120,
    grievances: 0,
    schemes: 0,
    activityTrend: "up",
  },
  {
    id: "3",
    name: "Amit Singh",
    email: "amit.singh@example.com",
    role: "Citizen",
    status: "Inactive",
    registrationDate: "Dec 10, 2023",
    lastActive: "15 days ago",
    totalLogins: 12,
    grievances: 2,
    schemes: 1,
    activityTrend: "down",
  },
  {
    id: "4",
    name: "Sunita Sharma",
    email: "sunita.sharma@example.com",
    role: "Citizen",
    status: "Active",
    registrationDate: "Mar 5, 2024",
    lastActive: "5 hours ago",
    totalLogins: 67,
    grievances: 12,
    schemes: 5,
    activityTrend: "up",
  },
  {
    id: "5",
    name: "Vikram Reddy",
    email: "vikram.reddy@example.com",
    role: "Citizen",
    status: "Suspended",
    registrationDate: "Jan 8, 2024",
    lastActive: "30 days ago",
    totalLogins: 23,
    grievances: 15,
    schemes: 2,
    activityTrend: "down",
  },
  {
    id: "6",
    name: "Lakshmi Devi",
    email: "lakshmi.devi@example.com",
    role: "Citizen",
    status: "Active",
    registrationDate: "Feb 12, 2024",
    lastActive: "1 hour ago",
    totalLogins: 89,
    grievances: 6,
    schemes: 4,
    activityTrend: "up",
  },
  {
    id: "7",
    name: "Suresh Babu",
    email: "suresh.babu@example.com",
    role: "MLA",
    status: "Active",
    registrationDate: "Jan 1, 2024",
    lastActive: "3 hours ago",
    totalLogins: 156,
    grievances: 0,
    schemes: 0,
    activityTrend: "stable",
  },
  {
    id: "8",
    name: "Anita Roy",
    email: "anita.roy@example.com",
    role: "Admin",
    status: "Active",
    registrationDate: "Jan 5, 2024",
    lastActive: "30 min ago",
    totalLogins: 203,
    grievances: 0,
    schemes: 0,
    activityTrend: "up",
  },
  {
    id: "9",
    name: "Ramesh Patnaik",
    email: "ramesh.patnaik@example.com",
    role: "Citizen",
    status: "Inactive",
    registrationDate: "Nov 20, 2023",
    lastActive: "20 days ago",
    totalLogins: 8,
    grievances: 1,
    schemes: 0,
    activityTrend: "down",
  },
  {
    id: "10",
    name: "Meena Das",
    email: "meena.das@example.com",
    role: "Citizen",
    status: "Active",
    registrationDate: "Mar 10, 2024",
    lastActive: "4 hours ago",
    totalLogins: 34,
    grievances: 4,
    schemes: 2,
    activityTrend: "up",
  },
]

export function UserReportTable() {
  const { theme } = useThemeStore()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: mockUserReports,
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
              placeholder="Search users..."
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
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>

          {/* Role Filter */}
          <Select defaultValue="all">
            <SelectTrigger
              style={{
                backgroundColor: theme.input.bg,
                borderColor: theme.input.border,
                color: theme.input.text,
              }}
            >
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="citizen">Citizen</SelectItem>
              <SelectItem value="mla-staff">MLA Staff</SelectItem>
              <SelectItem value="mla">MLA</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
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
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
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
            Showing {table.getRowModel().rows.length} of {table.getFilteredRowModel().rows.length} users
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