// admin-user/tables/data-table.tsx
"use client"

import { useState } from "react"
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
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [globalFilter, setGlobalFilter] = useState("")

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  })

  return (
    <div className="space-y-4">
      {/* Search Bar and Column Visibility */}
      <div className="flex items-center justify-between">
        <div className="relative max-w-lg">
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
            style={{ color: theme.textTertiary }}
          />
          <input
            type="text"
            placeholder="Search by name, email, or role..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition"
            style={{
              backgroundColor: theme.input.bg,
              borderColor: theme.input.border,
              color: theme.input.text,
            }}
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="ml-auto"
              style={{
                borderColor: theme.border,
                backgroundColor: theme.backgroundSecondary,
                color: theme.textPrimary,
              }}
            >
              Columns
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end"
            className="border shadow-lg"
            style={{
              backgroundColor: theme.backgroundSecondary,
              borderColor: theme.border,
            }}
          >
            <DropdownMenuLabel style={{ color: theme.textPrimary }}>
              Toggle columns
            </DropdownMenuLabel>
            <DropdownMenuSeparator style={{ backgroundColor: theme.border }} />
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                    style={{ color: theme.textPrimary }}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div 
        className="overflow-x-auto rounded-md border"
        style={{ borderColor: theme.border }}
      >
        <table className="w-full">
          <thead 
            className="border-b"
            style={{ 
              backgroundColor: theme.backgroundSecondary,
              borderColor: theme.border 
            }}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th 
                    key={header.id} 
                    className="px-6 py-3 text-left text-sm font-medium"
                    style={{ color: theme.textSecondary }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody 
            className="divide-y"
            style={{ 
              backgroundColor: theme.background,
              borderColor: theme.border 
            }}
          >
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr 
                  key={row.id} 
                  className="transition-colors"
                  style={{
                    backgroundColor: theme.background,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = theme.backgroundSecondary
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = theme.background
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td 
                      key={cell.id} 
                      className="px-6 py-4 text-sm"
                      style={{ color: theme.textPrimary }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan={columns.length} 
                  className="px-6 py-12 text-center text-sm"
                  style={{ color: theme.textTertiary }}
                >
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div 
          className="text-sm"
          style={{ color: theme.textSecondary }}
        >
          Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{" "}
          of {table.getFilteredRowModel().rows.length} entries
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="p-2 rounded-md border hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            style={{
              borderColor: theme.border,
              backgroundColor: theme.backgroundSecondary,
              color: theme.textPrimary,
            }}
          >
            <ChevronsLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="p-2 rounded-md border hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            style={{
              borderColor: theme.border,
              backgroundColor: theme.backgroundSecondary,
              color: theme.textPrimary,
            }}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          
          <span 
            className="text-sm font-medium px-2"
            style={{ color: theme.textPrimary }}
          >
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="p-2 rounded-md border hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            style={{
              borderColor: theme.border,
              backgroundColor: theme.backgroundSecondary,
              color: theme.textPrimary,
            }}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="p-2 rounded-md border hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            style={{
              borderColor: theme.border,
              backgroundColor: theme.backgroundSecondary,
              color: theme.textPrimary,
            }}
          >
            <ChevronsRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}