"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { Plus, Search, Filter, MessageSquare } from "lucide-react"
import { useThemeStore } from "@/store/useThemeStore"
import { motion, AnimatePresence } from "framer-motion"
import AllQuestionsTab from "./Components/AllQuestionsTab"
import MyQuestionsTab from "./Components/MyQuestionsTab"
import ArchivedQuestionsTab from "./Components/ArchivedQuestionsTab"
import AskQuestionModal from "./Components/AskQuestionModal"
import { VoiceQuestion } from "./types"
import { Button } from "@/components/ui/button"

export default function MyVoicePage() {
  const { theme } = useThemeStore()
  const [tab, setTab] = useState<"all" | "mine" | "archived">("all")
  const [showAskModal, setShowAskModal] = useState(false)

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  // Sample questions data
  const [questions, setQuestions] = useState<VoiceQuestion[]>([
    {
      id: 1,
      category: "Local Development",
      type: "text",
      content: "When will the road construction near sector 5 begin? The road has been in poor condition for months.",
      constituency: "Ward 12",
      createdAt: new Date(),
      votes: 42,
      status: "active",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      userName: "John Doe"
    },
    {
      id: 2,
      category: "Government Scheme",
      type: "audio",
      content: "How can senior citizens apply for the new pension scheme? I need detailed information about the process.",
      mediaUrl: "/sample-audio.mp3",
      duration: 45,
      constituency: "Ward 8",
      createdAt: new Date(Date.now() - 86400000),
      votes: 88,
      status: "addressed",
      response: "Application portal will open next month. Please visit the government website with your Aadhaar and bank details. We'll also have help desks at local community centers.",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      userName: "Sarah Johnson"
    },
    {
      id: 3,
      category: "Health Services",
      type: "video",
      content: "Request for more doctors in the local health center. The current staff is overworked and waiting times are too long.",
      mediaUrl: "/sample-video.mp4",
      duration: 120,
      constituency: "Ward 3",
      createdAt: new Date(Date.now() - 172800000),
      votes: 156,
      status: "active",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      userName: "Mike Wilson"
    },
    {
      id: 4,
      category: "Education",
      type: "text",
      content: "When will the new school building construction start? The temporary classrooms are not suitable for proper education.",
      constituency: "Ward 15",
      createdAt: new Date(Date.now() - 259200000),
      votes: 24,
      status: "archived",
      response: "Construction has been delayed due to funding issues. We're actively seeking alternative funding sources.",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      userName: "Emma Brown"
    },
    {
      id: 5,
      category: "Infrastructure",
      type: "text",
      content: "Street lights are not working in several areas of our ward. This poses safety concerns for residents.",
      constituency: "Ward 7",
      createdAt: new Date(Date.now() - 345600000),
      votes: 67,
      status: "active",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
      userName: "Robert Chen",
      isMine: true
    },
    {
      id: 6,
      category: "Social Welfare",
      type: "audio",
      content: "Are there any employment programs for youth in our constituency? Many graduates are struggling to find jobs.",
      mediaUrl: "/sample-audio2.mp3",
      duration: 60,
      constituency: "Ward 9",
      createdAt: new Date(Date.now() - 432000000),
      votes: 92,
      status: "addressed",
      response: "Yes, we have a new youth employment initiative starting next quarter. Visit the employment office for details.",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
      userName: "Aisha Khan",
      isMine: true
    },
    {
      id: 7,
      category: "Transportation",
      type: "video",
      content: "Public bus frequency needs to be increased during peak hours. Current schedule is insufficient.",
      mediaUrl: "/sample-video2.mp4",
      duration: 90,
      constituency: "Ward 4",
      createdAt: new Date(Date.now() - 518400000),
      votes: 143,
      status: "active",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      userName: "David Miller"
    },
    {
      id: 8,
      category: "Environment",
      type: "text",
      content: "Waste management system needs improvement. Garbage collection is irregular in many areas.",
      constituency: "Ward 11",
      createdAt: new Date(Date.now() - 604800000),
      votes: 78,
      status: "addressed",
      response: "New waste management contracts have been signed. Regular collection will start from next month.",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
      userName: "Lisa Wang"
    },
    {
      id: 9,
      category: "Water Supply",
      type: "audio",
      content: "Water supply issues in summer months need urgent attention. Many households face water shortage.",
      mediaUrl: "/sample-audio3.mp3",
      duration: 75,
      constituency: "Ward 6",
      createdAt: new Date(Date.now() - 691200000),
      votes: 112,
      status: "active",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
      userName: "James Taylor"
    },
    {
      id: 10,
      category: "Public Safety",
      type: "text",
      content: "Need more police patrols in residential areas during night hours for better security.",
      constituency: "Ward 2",
      createdAt: new Date(Date.now() - 777600000),
      votes: 89,
      status: "archived",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
      userName: "Maria Garcia"
    },
    {
      id: 11,
      category: "Health Services",
      type: "text",
      content: "Request for regular health checkup camps for senior citizens in the community.",
      constituency: "Ward 13",
      createdAt: new Date(Date.now() - 864000000),
      votes: 56,
      status: "active",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom",
      userName: "Tom Anderson"
    },
    {
      id: 12,
      category: "Education",
      type: "video",
      content: "Digital infrastructure needed in government schools for better education quality.",
      mediaUrl: "/sample-video3.mp4",
      duration: 110,
      constituency: "Ward 5",
      createdAt: new Date(Date.now() - 950400000),
      votes: 134,
      status: "addressed",
      response: "Digital education initiative has been approved. Implementation will begin in the next academic year.",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
      userName: "Sophia Lee"
    },
  ])

  // Get unique categories for filter dropdown
  const categories = Array.from(new Set(questions.map(q => q.category)))

  // Dark theme detection
  const darkMode = theme.background?.includes('#111') || theme.background?.includes('#000') ||
    theme.textPrimary?.includes('#fff') || theme.textPrimary?.includes('#f8fafc')

  // Handle vote
  const handleVote = (id: number) => {
    setQuestions(prev => prev.map(q =>
      q.id === id ? { ...q, votes: q.votes + 1 } : q
    ))
  }

  // Add new question
  const addQuestion = (newQuestion: Omit<VoiceQuestion, "id" | "createdAt" | "votes" | "status">) => {
    const questionObj: VoiceQuestion = {
      id: Date.now(),
      ...newQuestion,
      createdAt: new Date(),
      votes: 0,
      status: "active",
      isMine: true
    }
    setQuestions([questionObj, ...questions])
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("")
    setCategoryFilter("all")
    setTypeFilter("all")
  }

  return (
    <div
      className="min-h-screen p-4 md:p-6 space-y-6 transition-colors duration-200"
      style={{
        backgroundColor: theme.background || (darkMode ? '#0f172a' : '#f8fafc'),
        color: theme.textPrimary || (darkMode ? '#f8fafc' : '#0f172a')
      }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1
            className="text-2xl md:text-3xl font-bold"
            style={{ color: theme.textPrimary || (darkMode ? '#f8fafc' : '#0f172a') }}
          >
            My Voice
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: theme.textTertiary || (darkMode ? '#94a3b8' : '#64748b') }}
          >
            Connect directly with your MLA - Ask questions via text, audio, or video
          </p>
        </div>
        <Button
          onClick={() => setShowAskModal(true)}
          className="flex items-center gap-2 hover:opacity-90 transition-opacity"
          style={{
            background: theme.buttonPrimary?.bg || theme.primary || (darkMode ? '#3b82f6' : '#2563eb'),
            color: theme.buttonPrimary?.text || "white"
          }}
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Ask a Question</span>
          <span className="sm:hidden">Ask</span>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          className="rounded-lg border p-4 md:p-6 transition-colors duration-200"
          style={{
            backgroundColor: theme.cardBackground || (darkMode ? '#1e293b' : '#ffffff'),
            borderColor: theme.border || (darkMode ? '#334155' : '#e2e8f0'),
          }}
        >
          <p
            className="text-sm font-medium"
            style={{ color: theme.textSecondary || (darkMode ? '#cbd5e1' : '#475569') }}
          >
            Total Questions
          </p>
          <p
            className="text-2xl md:text-3xl font-bold mt-2"
            style={{ color: theme.textPrimary || (darkMode ? '#f8fafc' : '#0f172a') }}
          >
            {questions.length}
          </p>
        </div>
        <div
          className="rounded-lg border p-4 md:p-6 transition-colors duration-200"
          style={{
            backgroundColor: theme.cardBackground || (darkMode ? '#1e293b' : '#ffffff'),
            borderColor: theme.border || (darkMode ? '#334155' : '#e2e8f0'),
          }}
        >
          <p
            className="text-sm font-medium"
            style={{ color: theme.textSecondary || (darkMode ? '#cbd5e1' : '#475569') }}
          >
            Answered
          </p>
          <p
            className="text-2xl md:text-3xl font-bold mt-2"
            style={{ color: theme.textPrimary || (darkMode ? '#f8fafc' : '#0f172a') }}
          >
            {questions.filter(q => q.status === "addressed").length}
          </p>
        </div>
        <div
          className="rounded-lg border p-4 md:p-6 transition-colors duration-200"
          style={{
            backgroundColor: theme.cardBackground || (darkMode ? '#1e293b' : '#ffffff'),
            borderColor: theme.border || (darkMode ? '#334155' : '#e2e8f0'),
          }}
        >
          <p
            className="text-sm font-medium"
            style={{ color: theme.textSecondary || (darkMode ? '#cbd5e1' : '#475569') }}
          >
            Your Questions
          </p>
          <p
            className="text-2xl md:text-3xl font-bold mt-2"
            style={{ color: theme.textPrimary || (darkMode ? '#f8fafc' : '#0f172a') }}
          >
            {questions.filter(q => q.isMine).length}
          </p>
        </div>
        <div
          className="rounded-lg border p-4 md:p-6 transition-colors duration-200"
          style={{
            backgroundColor: theme.cardBackground || (darkMode ? '#1e293b' : '#ffffff'),
            borderColor: theme.border || (darkMode ? '#334155' : '#e2e8f0'),
          }}
        >
          <p
            className="text-sm font-medium"
            style={{ color: theme.textSecondary || (darkMode ? '#cbd5e1' : '#475569') }}
          >
            Active
          </p>
          <p
            className="text-2xl md:text-3xl font-bold mt-2"
            style={{ color: theme.textPrimary || (darkMode ? '#f8fafc' : '#0f172a') }}
          >
            {questions.filter(q => q.status === "active").length}
          </p>
        </div>
      </div>

      {/* Tabs and Filters */}
      <div className="space-y-4">
        {/* Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div
            className="inline-flex rounded-lg border p-1 transition-colors duration-200"
            style={{ borderColor: theme.border || (darkMode ? '#334155' : '#e2e8f0') }}
          >
            {(["all", "mine", "archived"] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 md:px-6 py-2 md:py-2.5 rounded-md transition-all duration-200 ${tab === t ? "font-semibold" : "hover:opacity-80"
                  }`}
                style={{
                  backgroundColor: tab === t
                    ? theme.primary || (darkMode ? '#3b82f6' : '#2563eb')
                    : "transparent",
                  color: tab === t
                    ? "white"
                    : theme.textSecondary || (darkMode ? '#cbd5e1' : '#475569'),
                }}
              >
                <span className="hidden sm:inline">
                  {t === "all" && "All Questions"}
                  {t === "mine" && "My Questions"}
                  {t === "archived" && "Archived"}
                </span>
                <span className="sm:hidden">
                  {t === "all" && "All"}
                  {t === "mine" && "Mine"}
                  {t === "archived" && "Archived"}
                </span>
              </button>
            ))}
          </div>

          <div
            className="flex items-center gap-2 text-sm"
            style={{ color: theme.textTertiary || (darkMode ? '#94a3b8' : '#64748b') }}
          >
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Share your voice in multiple formats</span>
            <span className="sm:hidden">Multiple formats</span>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <SearchFilterBar
          theme={theme}
          darkMode={darkMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          categories={categories}
          clearFilters={clearFilters}
        />
      </div>

      {/* Tab Content */}
      {tab === "all" && (
        <AllQuestionsTab
          questions={questions}
          theme={theme}
          darkMode={darkMode}
          searchQuery={searchQuery}
          categoryFilter={categoryFilter}
          typeFilter={typeFilter}
          onVote={handleVote}
          onAskQuestion={() => setShowAskModal(true)}
        />
      )}

      {tab === "mine" && (
        <MyQuestionsTab
          questions={questions}
          theme={theme}
          darkMode={darkMode}
          searchQuery={searchQuery}
          categoryFilter={categoryFilter}
          typeFilter={typeFilter}
          onVote={handleVote}
          onAskQuestion={() => setShowAskModal(true)}
        />
      )}

      {tab === "archived" && (
        <ArchivedQuestionsTab
          questions={questions}
          theme={theme}
          darkMode={darkMode}
          searchQuery={searchQuery}
          categoryFilter={categoryFilter}
          typeFilter={typeFilter}
          onVote={handleVote}
          onAskQuestion={() => setShowAskModal(true)}
        />
      )}

      {/* Ask Question Modal */}
      <AnimatePresence>
        {showAskModal && (
          <AskQuestionModal
            theme={theme}
            darkMode={darkMode}
            onClose={() => setShowAskModal(false)}
            onSubmit={addQuestion}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// Search Filter Bar Component
interface SearchFilterBarProps {
  theme: any
  darkMode: boolean
  searchQuery: string
  setSearchQuery: (query: string) => void
  categoryFilter: string
  setCategoryFilter: (filter: string) => void
  typeFilter: string
  setTypeFilter: (filter: string) => void
  categories: string[]
  clearFilters: () => void
}

function SearchFilterBar({
  theme,
  darkMode,
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  typeFilter,
  setTypeFilter,
  categories,
  clearFilters
}: SearchFilterBarProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      {/* Search */}
      <div className="relative md:col-span-2 lg:col-span-1">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
          style={{ color: theme.textTertiary || (darkMode ? '#94a3b8' : '#64748b') }}
        />
        <input
          type="text"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200"
          style={{
            backgroundColor: theme.inputBackground || theme.cardBackground || (darkMode ? '#1e293b' : '#ffffff'),
            borderColor: theme.border || (darkMode ? '#334155' : '#e2e8f0'),
            color: theme.textPrimary || (darkMode ? '#f8fafc' : '#0f172a'),
            '--tw-ring-color': theme.primary ? `${theme.primary}40` : (darkMode ? '#3b82f640' : '#2563eb40')
          } as any}
        />
      </div>

      {/* Category Filter */}
      <div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 appearance-none"
          style={{
            backgroundColor: theme.inputBackground || theme.cardBackground || (darkMode ? '#1e293b' : '#ffffff'),
            borderColor: theme.border || (darkMode ? '#334155' : '#e2e8f0'),
            color: theme.textPrimary || (darkMode ? '#f8fafc' : '#0f172a'),
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='${darkMode ? '%2394a3b8' : '%2364748b'}' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: 'right 0.5rem center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '1.5em 1.5em',
            paddingRight: '2.5rem',
            '--tw-ring-color': theme.primary ? `${theme.primary}40` : (darkMode ? '#3b82f640' : '#2563eb40')
          } as any}
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Type Filter */}
      <div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 appearance-none"
          style={{
            backgroundColor: theme.inputBackground || theme.cardBackground || (darkMode ? '#1e293b' : '#ffffff'),
            borderColor: theme.border || (darkMode ? '#334155' : '#e2e8f0'),
            color: theme.textPrimary || (darkMode ? '#f8fafc' : '#0f172a'),
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='${darkMode ? '%2394a3b8' : '%2364748b'}' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: 'right 0.5rem center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '1.5em 1.5em',
            paddingRight: '2.5rem',
            '--tw-ring-color': theme.primary ? `${theme.primary}40` : (darkMode ? '#3b82f640' : '#2563eb40')
          } as any}
        >
          <option value="all">All Types</option>
          <option value="text">Text</option>
          <option value="audio">Audio</option>
          <option value="video">Video</option>
        </select>
      </div>

      {/* Clear Filters */}
      <button
        onClick={clearFilters}
        className="px-4 py-2.5 border rounded-lg hover:opacity-80 transition-all duration-200 flex items-center justify-center gap-2"
        style={{
          backgroundColor: theme.cardBackground || (darkMode ? '#1e293b' : '#ffffff'),
          borderColor: theme.border || (darkMode ? '#334155' : '#e2e8f0'),
          color: theme.textSecondary || (darkMode ? '#cbd5e1' : '#475569'),
        }}
      >
        <Filter className="h-4 w-4" />
        <span className="hidden sm:inline">Clear Filters</span>
        <span className="sm:hidden">Clear</span>
      </button>
    </div>
  )
}