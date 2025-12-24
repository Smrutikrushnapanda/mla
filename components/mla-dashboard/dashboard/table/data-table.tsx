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
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"
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
      {/* Single Search Input */}
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search by citizen name or ID..."
          value={(table.getColumn("citizenName")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            table.getColumn("citizenName")?.setFilterValue(event.target.value)
            table.getColumn("id")?.setFilterValue(event.target.value)
          }}
          className="max-w-sm"
          style={{
            backgroundColor: theme.backgroundSecondary,
            borderColor: theme.border,
            color: theme.textPrimary,
          }}
        />
        
        {/* Rows per page selector */}
        <div className="flex items-center gap-2">
          <span 
            className="text-sm"
            style={{ color: theme.textPrimary }}
          >
            Rows per page:
          </span>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger 
              className="w-20"
              style={{
                backgroundColor: theme.input.bg,
                borderColor: theme.input.bg,
                color: theme.textPrimary,
              }}
            >
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent
              style={{
                backgroundColor: theme.cardBackground,
                borderColor: theme.border,
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem 
                  key={pageSize} 
                  value={`${pageSize}`}
                  style={{ color: theme.textPrimary }}
                >
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
                  style={{ 
                    borderColor: theme.border,
                    backgroundColor: theme.backgroundSecondary,
                  }}
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
                  style={{ 
                    color: theme.textSecondary,
                    backgroundColor: theme.backgroundSecondary,
                  }}
                >
                  No grievances found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Enhanced Pagination */}
      <div className="flex items-center justify-between">
        <div 
          className="text-sm"
          style={{ color: theme.textSecondary }}
        >
          Showing{" "}
          <span className="font-medium" style={{ color: theme.textPrimary }}>
            {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
          </span>{" "}
          to{" "}
          <span className="font-medium" style={{ color: theme.textPrimary }}>
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}
          </span>{" "}
          of{" "}
          <span className="font-medium" style={{ color: theme.textPrimary }}>
            {table.getFilteredRowModel().rows.length}
          </span>{" "}
          results
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center gap-2">
            <span 
              className="text-sm"
              style={{ color: theme.textSecondary }}
            >
              Page
            </span>
            <span 
              className="font-medium"
              style={{ color: theme.textPrimary }}
            >
              {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              style={{
                borderColor: theme.border,
                color: theme.textPrimary,
              }}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              style={{
                borderColor: theme.border,
                color: theme.textPrimary,
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              style={{
                borderColor: theme.border,
                color: theme.textPrimary,
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              style={{
                borderColor: theme.border,
                color: theme.textPrimary,
              }}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}