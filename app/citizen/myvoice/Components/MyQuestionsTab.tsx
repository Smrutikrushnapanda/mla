// app/(roles)/admin-user/my-voice/components/MyQuestionsTab.tsx
"use client"

import { useMemo, useState } from "react"
import { MessageSquare } from "lucide-react"
import QuestionCard from "./QuestionCard"
import Pagination from "./Pagination"
import { VoiceQuestion } from "../types"

interface MyQuestionsTabProps {
  questions: VoiceQuestion[]
  theme: any
  darkMode: boolean
  searchQuery: string
  categoryFilter: string
  typeFilter: string
  onVote: (id: number) => void
  onAskQuestion: () => void
}

export default function MyQuestionsTab({
  questions,
  theme,
  darkMode,
  searchQuery,
  categoryFilter,
  typeFilter,
  onVote,
  onAskQuestion
}: MyQuestionsTabProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Filter questions - only show user's questions
  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      if (!q.isMine) return false
      
      // Search filter
      if (searchQuery && !q.content.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !q.category.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !q.constituency.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }
      
      // Category filter
      if (categoryFilter !== "all" && q.category !== categoryFilter) return false
      
      // Type filter
      if (typeFilter !== "all" && q.type !== typeFilter) return false
      
      return true
    })
  }, [questions, searchQuery, categoryFilter, typeFilter])

  // Calculate pagination
  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentQuestions = filteredQuestions.slice(startIndex, endIndex)

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Yesterday"
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      {/* Results Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <p 
          className="text-sm"
          style={{ color: theme.textTertiary || (darkMode ? '#94a3b8' : '#64748b') }}
        >
          Showing {currentQuestions.length} of {filteredQuestions.length} questions
          {searchQuery && ` for "${searchQuery}"`}
        </p>
        <p 
          className="text-sm"
          style={{ color: theme.textTertiary || (darkMode ? '#94a3b8' : '#64748b') }}
        >
          Page {currentPage} of {totalPages}
        </p>
      </div>

      {/* Questions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {currentQuestions.length > 0 ? (
          currentQuestions.map(q => (
            <QuestionCard 
              key={q.id}
              question={q}
              theme={theme}
              darkMode={darkMode}
              formatDate={formatDate}
              onVote={onVote}
            />
          ))
        ) : (
          <div 
            className="col-span-full text-center py-12 md:py-16 rounded-lg border transition-colors duration-200"
            style={{ 
              backgroundColor: theme.cardBackground || (darkMode ? '#1e293b' : '#ffffff'),
              borderColor: theme.border || (darkMode ? '#334155' : '#e2e8f0'),
            }}
          >
            <MessageSquare 
              className="h-12 w-12 md:h-16 md:w-16 mx-auto mb-4" 
              style={{ color: theme.textTertiary || (darkMode ? '#475569' : '#94a3b8') }} 
            />
            <h3 
              className="text-lg font-semibold mb-2"
              style={{ color: theme.textPrimary || (darkMode ? '#f8fafc' : '#0f172a') }}
            >
              You haven't asked any questions yet
            </h3>
            <p 
              className="text-sm mb-6 max-w-md mx-auto"
              style={{ color: theme.textTertiary || (darkMode ? '#94a3b8' : '#64748b') }}
            >
              Start engaging with your MLA by asking your first question
            </p>
            <button
              onClick={onAskQuestion}
              className="px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{ 
                background: theme.primary || (darkMode ? '#3b82f6' : '#2563eb'), 
                color: "white" 
              }}
            >
              Ask Your First Question
            </button>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredQuestions.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          theme={theme}
          darkMode={darkMode}
        />
      )}
    </div>
  )
}