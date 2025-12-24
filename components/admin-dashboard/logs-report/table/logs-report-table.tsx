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
import { columns, LogReport } from "./columns"
import { useThemeStore } from "@/store/useThemeStore"

// Mock data for log reports
const mockLogReports: LogReport[] = [
  {
    id: "1",
    timestamp: "Mar 25, 2024 10:30 AM",
    userName: "Anita Roy",
    userRole: "Admin",
    action: "User Created",
    module: "Users",
    ipAddress: "192.168.1.45",
    status: "Success",
    description: "Created new user account for Rajesh Kumar",
  },
  {
    id: "2",
    timestamp: "Mar 25, 2024 10:25 AM",
    userName: "Priya Patel",
    userRole: "MLA Staff",
    action: "Grievance Updated",
    module: "Grievances",
    ipAddress: "192.168.1.78",
    status: "Success",
    description: "Updated status of grievance GRV-2024-042 to Resolved",
  },
  {
    id: "3",
    timestamp: "Mar 25, 2024 10:20 AM",
    userName: "System",
    userRole: "Admin",
    action: "Backup Completed",
    module: "System",
    ipAddress: "127.0.0.1",
    status: "Success",
    description: "Daily automated database backup completed successfully",
  },
  {
    id: "4",
    timestamp: "Mar 25, 2024 10:15 AM",
    userName: "Suresh Babu",
    userRole: "MLA",
    action: "Project Approved",
    module: "Projects",
    ipAddress: "192.168.1.92",
    status: "Success",
    description: "Approved project PRJ-2024-015 for Rural Road Construction",
  },
  {
    id: "5",
    timestamp: "Mar 25, 2024 10:10 AM",
    userName: "Vikram Reddy",
    userRole: "Citizen",
    action: "Login Failed",
    module: "Auth",
    ipAddress: "103.45.78.120",
    status: "Failed",
    description: "Failed login attempt - Invalid credentials",
  },
  {
    id: "6",
    timestamp: "Mar 25, 2024 10:05 AM",
    userName: "Lakshmi Devi",
    userRole: "Citizen",
    action: "Scheme Applied",
    module: "Schemes",
    ipAddress: "103.45.78.98",
    status: "Success",
    description: "Applied for KALIA scheme - Application ID: APP-2024-567",
  },
  {
    id: "7",
    timestamp: "Mar 25, 2024 10:00 AM",
    userName: "Anita Roy",
    userRole: "Admin",
    action: "Budget Updated",
    module: "Budget",
    ipAddress: "192.168.1.45",
    status: "Success",
    description: "Updated budget allocation for Health Department",
  },
  {
    id: "8",
    timestamp: "Mar 25, 2024 09:55 AM",
    userName: "System",
    userRole: "Admin",
    action: "Email Service",
    module: "System",
    ipAddress: "127.0.0.1",
    status: "Warning",
    description: "Email service queue processing delayed - 15 pending emails",
  },
  {
    id: "9",
    timestamp: "Mar 25, 2024 09:50 AM",
    userName: "Ramesh Patnaik",
    userRole: "Citizen",
    action: "Grievance Submitted",
    module: "Grievances",
    ipAddress: "103.45.78.156",
    status: "Success",
    description: "Submitted new grievance regarding water supply issue",
  },
  {
    id: "10",
    timestamp: "Mar 25, 2024 09:45 AM",
    userName: "Priya Patel",
    userRole: "MLA Staff",
    action: "User Updated",
    module: "Users",
    ipAddress: "192.168.1.78",
    status: "Success",
    description: "Updated profile information for Amit Singh",
  },
  {
    id: "11",
    timestamp: "Mar 25, 2024 09:40 AM",
    userName: "Unknown User",
    userRole: "Citizen",
    action: "Login Failed",
    module: "Auth",
    ipAddress: "45.123.67.89",
    status: "Failed",
    description: "Multiple failed login attempts detected - Account locked",
  },
  {
    id: "12",
    timestamp: "Mar 25, 2024 09:35 AM",
    userName: "Suresh Babu",
    userRole: "MLA",
    action: "Report Generated",
    module: "System",
    ipAddress: "192.168.1.92",
    status: "Success",
    description: "Generated monthly constituency report for March 2024",
  },
  {
    id: "13",
    timestamp: "Mar 25, 2024 09:30 AM",
    userName: "Meena Das",
    userRole: "Citizen",
    action: "Profile Updated",
    module: "Users",
    ipAddress: "103.45.78.201",
    status: "Success",
    description: "Updated contact information and address details",
  },
  {
    id: "14",
    timestamp: "Mar 25, 2024 09:25 AM",
    userName: "Anita Roy",
    userRole: "Admin",
    action: "Project Deleted",
    module: "Projects",
    ipAddress: "192.168.1.45",
    status: "Success",
    description: "Deleted cancelled project PRJ-2024-008",
  },
  {
    id: "15",
    timestamp: "Mar 25, 2024 09:20 AM",
    userName: "System",
    userRole: "Admin",
    action: "Database Cleanup",
    module: "System",
    ipAddress: "127.0.0.1",
    status: "Success",
    description: "Cleaned up old temporary files and expired sessions",
  },
]

export function LogsReportTable() {
  const { theme } = useThemeStore()
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "timestamp", desc: true } // Default sort by timestamp descending
  ])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: mockLogReports,
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
        pageSize: 15,
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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          {/* Search */}
          <div className="relative md:col-span-2">
            <Search 
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
              style={{ color: theme.textTertiary }}
            />
            <Input
              placeholder="Search logs..."
              className="pl-10"
              style={{
                backgroundColor: theme.input.bg,
                borderColor: theme.input.border,
                color: theme.input.text,
              }}
            />
          </div>

          {/* Date Range */}
          <Select defaultValue="today">
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
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>

          {/* Module Filter */}
          <Select defaultValue="all">
            <SelectTrigger
              style={{
                backgroundColor: theme.input.bg,
                borderColor: theme.input.border,
                color: theme.input.text,
              }}
            >
              <SelectValue placeholder="All Modules" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Modules</SelectItem>
              <SelectItem value="users">Users</SelectItem>
              <SelectItem value="grievances">Grievances</SelectItem>
              <SelectItem value="projects">Projects</SelectItem>
              <SelectItem value="budget">Budget</SelectItem>
              <SelectItem value="schemes">Schemes</SelectItem>
              <SelectItem value="auth">Auth</SelectItem>
              <SelectItem value="system">System</SelectItem>
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
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
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
            Showing {table.getRowModel().rows.length} of {table.getFilteredRowModel().rows.length} logs
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