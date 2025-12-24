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
import { columns, BudgetReport } from "./columns"
import { useThemeStore } from "@/store/useThemeStore"

// Mock data for budget reports
const mockBudgetReports: BudgetReport[] = [
  {
    id: "1",
    department: "Public Works Department",
    category: "Infrastructure",
    totalBudget: 12000000,
    allocated: 12000000,
    spent: 9500000,
    remaining: 2500000,
    utilization: 79,
    status: "On Track",
    fiscalYear: "2024-25",
    lastUpdated: "Mar 20, 2024",
  },
  {
    id: "2",
    department: "Health & Family Welfare",
    category: "Healthcare",
    totalBudget: 8500000,
    allocated: 8500000,
    spent: 7800000,
    remaining: 700000,
    utilization: 92,
    status: "Critical",
    fiscalYear: "2024-25",
    lastUpdated: "Mar 22, 2024",
  },
  {
    id: "3",
    department: "Education Department",
    category: "Education",
    totalBudget: 10000000,
    allocated: 10000000,
    spent: 5500000,
    remaining: 4500000,
    utilization: 55,
    status: "Under Utilized",
    fiscalYear: "2024-25",
    lastUpdated: "Mar 18, 2024",
  },
  {
    id: "4",
    department: "Water Resources",
    category: "Water Supply",
    totalBudget: 6000000,
    allocated: 6000000,
    spent: 6200000,
    remaining: -200000,
    utilization: 103,
    status: "Over Budget",
    fiscalYear: "2024-25",
    lastUpdated: "Mar 25, 2024",
  },
  {
    id: "5",
    department: "Agriculture Department",
    category: "Agriculture",
    totalBudget: 7500000,
    allocated: 7500000,
    spent: 5200000,
    remaining: 2300000,
    utilization: 69,
    status: "On Track",
    fiscalYear: "2024-25",
    lastUpdated: "Mar 15, 2024",
  },
  {
    id: "6",
    department: "Rural Development",
    category: "Infrastructure",
    totalBudget: 5000000,
    allocated: 5000000,
    spent: 3800000,
    remaining: 1200000,
    utilization: 76,
    status: "On Track",
    fiscalYear: "2024-25",
    lastUpdated: "Mar 19, 2024",
  },
  {
    id: "7",
    department: "Primary Health Centers",
    category: "Healthcare",
    totalBudget: 4000000,
    allocated: 4000000,
    spent: 2100000,
    remaining: 1900000,
    utilization: 53,
    status: "Under Utilized",
    fiscalYear: "2024-25",
    lastUpdated: "Mar 10, 2024",
  },
  {
    id: "8",
    department: "School Infrastructure",
    category: "Education",
    totalBudget: 3500000,
    allocated: 3500000,
    spent: 2900000,
    remaining: 600000,
    utilization: 83,
    status: "On Track",
    fiscalYear: "2024-25",
    lastUpdated: "Mar 21, 2024",
  },
  {
    id: "9",
    department: "Drinking Water Supply",
    category: "Water Supply",
    totalBudget: 4500000,
    allocated: 4500000,
    spent: 4100000,
    remaining: 400000,
    utilization: 91,
    status: "Critical",
    fiscalYear: "2024-25",
    lastUpdated: "Mar 23, 2024",
  },
  {
    id: "10",
    department: "General Administration",
    category: "Administration",
    totalBudget: 2000000,
    allocated: 2000000,
    spent: 1500000,
    remaining: 500000,
    utilization: 75,
    status: "On Track",
    fiscalYear: "2024-25",
    lastUpdated: "Mar 17, 2024",
  },
]

export function BudgetReportTable() {
  const { theme } = useThemeStore()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: mockBudgetReports,
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
              placeholder="Search departments..."
              className="pl-10"
              style={{
                backgroundColor: theme.input.bg,
                borderColor: theme.input.border,
                color: theme.input.text,
              }}
            />
          </div>

          {/* Fiscal Year */}
          <Select defaultValue="2024-25">
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
              <SelectItem value="2024-25">FY 2024-25</SelectItem>
              <SelectItem value="2023-24">FY 2023-24</SelectItem>
              <SelectItem value="2022-23">FY 2022-23</SelectItem>
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
              <SelectItem value="administration">Administration</SelectItem>
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
              <SelectItem value="on-track">On Track</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="over-budget">Over Budget</SelectItem>
              <SelectItem value="under-utilized">Under Utilized</SelectItem>
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
            Showing {table.getRowModel().rows.length} of {table.getFilteredRowModel().rows.length} departments
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