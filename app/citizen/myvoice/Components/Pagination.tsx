// app/(roles)/admin-user/my-voice/components/Pagination.tsx
"use client"

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  theme: any
  darkMode: boolean
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  theme,
  darkMode
}: PaginationProps) {
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t transition-colors duration-200">
      <div 
        className="text-sm"
        style={{ color: theme.textTertiary || (darkMode ? '#94a3b8' : '#64748b') }}
      >
        Showing {startIndex + 1}-{endIndex} of {totalItems} questions
      </div>
      
      <div className="flex items-center gap-1 sm:gap-2">
        {/* First Page */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-80 transition-all duration-200"
          style={{
            backgroundColor: theme.cardBackground || (darkMode ? '#1e293b' : '#ffffff'),
            borderColor: theme.border || (darkMode ? '#334155' : '#e2e8f0'),
            borderWidth: "1px",
            color: theme.textSecondary || (darkMode ? '#cbd5e1' : '#475569'),
          }}
          aria-label="First page"
        >
          <ChevronsLeft className="h-4 w-4" />
        </button>

        {/* Previous Page */}
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-80 transition-all duration-200"
          style={{
            backgroundColor: theme.cardBackground || (darkMode ? '#1e293b' : '#ffffff'),
            borderColor: theme.border || (darkMode ? '#334155' : '#e2e8f0'),
            borderWidth: "1px",
            color: theme.textSecondary || (darkMode ? '#cbd5e1' : '#475569'),
          }}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum
            if (totalPages <= 5) {
              pageNum = i + 1
            } else if (currentPage <= 3) {
              pageNum = i + 1
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i
            } else {
              pageNum = currentPage - 2 + i
            }

            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`px-3 py-1.5 rounded-lg transition-all duration-200 text-sm ${
                  currentPage === pageNum ? "font-semibold" : "hover:opacity-80"
                }`}
                style={{
                  backgroundColor: currentPage === pageNum 
                    ? theme.primary || (darkMode ? '#3b82f6' : '#2563eb') 
                    : theme.cardBackground || (darkMode ? '#1e293b' : '#ffffff'),
                  borderColor: theme.border || (darkMode ? '#334155' : '#e2e8f0'),
                  borderWidth: "1px",
                  color: currentPage === pageNum 
                    ? "white" 
                    : theme.textSecondary || (darkMode ? '#cbd5e1' : '#475569'),
                }}
              >
                {pageNum}
              </button>
            )
          })}
        </div>

        {/* Next Page */}
        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-80 transition-all duration-200"
          style={{
            backgroundColor: theme.cardBackground || (darkMode ? '#1e293b' : '#ffffff'),
            borderColor: theme.border || (darkMode ? '#334155' : '#e2e8f0'),
            borderWidth: "1px",
            color: theme.textSecondary || (darkMode ? '#cbd5e1' : '#475569'),
          }}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        {/* Last Page */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-80 transition-all duration-200"
          style={{
            backgroundColor: theme.cardBackground || (darkMode ? '#1e293b' : '#ffffff'),
            borderColor: theme.border || (darkMode ? '#334155' : '#e2e8f0'),
            borderWidth: "1px",
            color: theme.textSecondary || (darkMode ? '#cbd5e1' : '#475569'),
          }}
          aria-label="Last page"
        >
          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>

      {/* Items Per Page Selector */}
      <div className="flex items-center gap-2 text-sm">
        <span style={{ color: theme.textTertiary || (darkMode ? '#94a3b8' : '#64748b') }}>Show:</span>
        <select
          value={itemsPerPage}
          onChange={() => {}}
          className="px-2 py-1 border rounded transition-colors duration-200 appearance-none"
          style={{
            backgroundColor: theme.cardBackground || (darkMode ? '#1e293b' : '#ffffff'),
            borderColor: theme.border || (darkMode ? '#334155' : '#e2e8f0'),
            color: theme.textPrimary || (darkMode ? '#f8fafc' : '#0f172a'),
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='${darkMode ? '%2394a3b8' : '%2364748b'}' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: 'right 0.25rem center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '1.25em 1.25em',
            paddingRight: '1.75rem',
          }}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  )
}