// components/mla-dashboard/budget-utilization/table/data-table.tsx
"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useThemeStore } from "@/store/useThemeStore"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const { theme } = useThemeStore()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center gap-4 flex-wrap">
        <Input
          placeholder="Search by project name..."
          value={(table.getColumn("projectName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("projectName")?.setFilterValue(event.target.value)
          }
          className="max-w-xs"
          style={{
            backgroundColor: theme.backgroundSecondary,
            borderColor: theme.border,
            color: theme.textPrimary,
          }}
        />

        <Select
          value={(table.getColumn("category")?.getFilterValue() as string) ?? "all"}
          onValueChange={(value) =>
            table.getColumn("category")?.setFilterValue(value === "all" ? "" : value)
          }
        >
          <SelectTrigger 
            className="w-[220px]"
            style={{
              backgroundColor: theme.backgroundSecondary,
              borderColor: theme.border,
              color: theme.textPrimary,
            }}
          >
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent
            style={{
              backgroundColor: theme.backgroundSecondary,
              borderColor: theme.border,
            }}
          >
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Road Infrastructure">Road Infrastructure</SelectItem>
            <SelectItem value="Water Supply & Sanitation">Water Supply & Sanitation</SelectItem>
            <SelectItem value="Primary Health Centers">Primary Health Centers</SelectItem>
            <SelectItem value="School Infrastructure">School Infrastructure</SelectItem>
            <SelectItem value="Street Lighting">Street Lighting</SelectItem>
            <SelectItem value="Irrigation Projects">Irrigation Projects</SelectItem>
            <SelectItem value="Agricultural Support">Agricultural Support</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={(table.getColumn("status")?.getFilterValue() as string) ?? "all"}
          onValueChange={(value) =>
            table.getColumn("status")?.setFilterValue(value === "all" ? "" : value)
          }
        >
          <SelectTrigger 
            className="w-[180px]"
            style={{
              backgroundColor: theme.backgroundSecondary,
              borderColor: theme.border,
              color: theme.textPrimary,
            }}
          >
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent
            style={{
              backgroundColor: theme.backgroundSecondary,
              borderColor: theme.border,
            }}
          >
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="On Track">On Track</SelectItem>
            <SelectItem value="Over Budget">Over Budget</SelectItem>
            <SelectItem value="Under Utilized">Under Utilized</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-md border overflow-x-auto" style={{ borderColor: theme.border }}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow 
                key={headerGroup.id}
                style={{ borderColor: theme.border }}
              >
                {headerGroup.headers.map((header) => (
                  <TableHead 
                    key={header.id}
                    style={{ color: theme.textSecondary }}
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
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
                  No budget data found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div 
          className="text-sm"
          style={{ color: theme.textSecondary }}
        >
          Showing {table.getFilteredRowModel().rows.length} of {data.length} projects
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}

            style={{
              backgroundColor: theme.cardBackground,
              borderColor: theme.border,
              color: theme.textPrimary,
            }}
          >
            Previous
          </Button>
          <div className="flex items-center gap-1">
            <span className="text-sm" style={{ color: theme.textSecondary }}>
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            style={{
              backgroundColor: theme.cardBackground,
              borderColor: theme.border,
              color: theme.textPrimary,
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}