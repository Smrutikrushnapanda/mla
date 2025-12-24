// app/(roles)/admin-user/my-voice/components/QuestionCard.tsx
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mic, Video, MessageSquare, ThumbsUp, CheckCircle, Archive, User, Play, Pause } from "lucide-react"
import { VoiceQuestion } from "../types"

interface QuestionCardProps {
  question: VoiceQuestion | null | undefined
  theme: any
  darkMode: boolean
  formatDate: (date: Date) => string
  onVote: (id: number) => void
}

export default function QuestionCard({
  question,
  theme,
  darkMode,
  formatDate,
  onVote
}: QuestionCardProps) {
  const [showFullContent, setShowFullContent] = useState(false)
  const [isPlayingMedia, setIsPlayingMedia] = useState(false)

  // Early return if question is undefined or null
  if (!question) {
    return (
      <div className="rounded-lg border overflow-hidden transition-all duration-200"
        style={{
          backgroundColor: theme.cardBackground || (darkMode ? '#1e293b' : '#ffffff'),
          borderColor: theme.border || (darkMode ? '#334155' : '#e2e8f0'),
        }}>
        <div className="p-4 md:p-6">
          <div className="flex items-center justify-center h-40">
            <p style={{ color: theme.textTertiary || (darkMode ? '#94a3b8' : '#64748b') }}>
              Question not available
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Provide default values for optional properties
  const safeQuestion = {
    ...question,
    userAvatar: question.userAvatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=User",
    userName: question.userName || "Anonymous User",
    content: question.content || "No content available",
    category: question.category || "Uncategorized",
    constituency: question.constituency || "Unknown",
    status: question.status || "active",
    type: question.type || "text",
    votes: question.votes || 0,
    createdAt: question.createdAt || new Date(),
    isMine: question.isMine || false
  }

  const getMediaIcon = () => {
    switch (safeQuestion.type) {
      case "audio": return <Mic className="h-4 w-4" />
      case "video": return <Video className="h-4 w-4" />
      default: return <MessageSquare className="h-4 w-4" />
    }
  }

  const getMediaColor = () => {
    switch (safeQuestion.type) {
      case "audio": return darkMode ? "bg-purple-600" : "bg-purple-500"
      case "video": return darkMode ? "bg-red-600" : "bg-red-500"
      default: return darkMode ? "bg-blue-600" : "bg-blue-500"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "addressed": return darkMode ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-600"
      case "archived": return darkMode ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-600"
      default: return darkMode ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "addressed": return <CheckCircle className="h-3 w-3" />
      case "archived": return <Archive className="h-3 w-3" />
      default: return null
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-lg border overflow-hidden hover:shadow-lg transition-all duration-200"
      style={{
        backgroundColor: theme.cardBackground || (darkMode ? '#1e293b' : '#ffffff'),
        borderColor: theme.border || (darkMode ? '#334155' : '#e2e8f0'),
      }}
    >
      <div className="p-4 md:p-6">
        {/* Header with User Info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full overflow-hidden"
            style={{ backgroundColor: darkMode ? '#334155' : '#e2e8f0' }}>
            {safeQuestion.userAvatar ? (
              <img
                src={safeQuestion.userAvatar}
                alt={safeQuestion.userName || "User"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if image fails to load
                  (e.target as HTMLImageElement).style.display = 'none'
                }}
              />
            ) : null}
            <div className="w-full h-full flex items-center justify-center">
              <User className="h-5 w-5"
                style={{ color: darkMode ? '#94a3b8' : '#64748b' }}
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="font-medium flex items-center gap-2 flex-wrap"
              style={{ color: theme.textPrimary || (darkMode ? '#f8fafc' : '#0f172a') }}>
              {safeQuestion.userName}
              {safeQuestion.isMine && (
                <span
                  className="text-xs px-1.5 py-0.5 rounded"
                  style={{
                    backgroundColor: theme.primary ? `${theme.primary}20` : (darkMode ? '#3b82f620' : '#2563eb20'),
                    color: theme.primary || (darkMode ? '#60a5fa' : '#2563eb')
                  }}
                >
                  You
                </span>
              )}
            </div>
            <div
              className="text-xs flex items-center gap-2 flex-wrap"
              style={{ color: theme.textTertiary || (darkMode ? '#94a3b8' : '#64748b') }}
            >
              <span>{formatDate(safeQuestion.createdAt)}</span>
              <span>•</span>
              <span>{safeQuestion.constituency}</span>
            </div>
          </div>
          <div className={`p-2 rounded-full ${getMediaColor()} text-white`}>
            {getMediaIcon()}
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span
            className="text-xs px-2 py-1 rounded"
            style={{
              backgroundColor: theme.primary ? `${theme.primary}15` : (darkMode ? '#3b82f620' : '#2563eb20'),
              color: theme.primary || (darkMode ? '#60a5fa' : '#2563eb')
            }}
          >
            {safeQuestion.category}
          </span>
          {safeQuestion.status !== "active" && (
            <span className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${getStatusColor(safeQuestion.status)}`}>
              {getStatusIcon(safeQuestion.status)}
              {safeQuestion.status === "addressed" ? "Addressed" : "Archived"}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="mb-4">
          <p
            className={`${showFullContent ? '' : 'line-clamp-2'} break-words`}
            style={{ color: theme.textPrimary || (darkMode ? '#f8fafc' : '#0f172a') }}
          >
            {safeQuestion.content}
          </p>
          {safeQuestion.content.length > 100 && (
            <button
              onClick={() => setShowFullContent(!showFullContent)}
              className="text-sm mt-1 hover:opacity-80 transition-opacity"
              style={{ color: theme.primary || (darkMode ? '#60a5fa' : '#2563eb') }}
            >
              {showFullContent ? "Show less" : "Read more"}
            </button>
          )}
        </div>

        {/* Media Preview */}
        {safeQuestion.type === "audio" && safeQuestion.mediaUrl && (
          <div
            className="mb-4 p-3 rounded-lg transition-colors duration-200"
            style={{
              backgroundColor: darkMode ? '#0f172a' : '#f0f9ff',
              borderColor: theme.border || (darkMode ? '#334155' : '#e2e8f0'),
              borderWidth: '1px'
            }}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlayingMedia(!isPlayingMedia)}
                className="p-2 rounded-full transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: theme.primary || (darkMode ? '#3b82f6' : '#2563eb'),
                  color: "white"
                }}
              >
                {isPlayingMedia ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
              <div className="flex-1">
                <div
                  className="text-sm font-medium"
                  style={{ color: theme.textPrimary || (darkMode ? '#f8fafc' : '#0f172a') }}
                >
                  Audio Message
                </div>
                <div
                  className="text-xs"
                  style={{ color: theme.textTertiary || (darkMode ? '#94a3b8' : '#64748b') }}
                >
                  {safeQuestion.duration ? `${safeQuestion.duration} seconds` : "Click to play"}
                </div>
              </div>
            </div>
          </div>
        )}

        {safeQuestion.type === "video" && safeQuestion.mediaUrl && (
          <div className="mb-4 rounded-lg overflow-hidden border transition-colors duration-200"
            style={{ borderColor: theme.border || (darkMode ? '#334155' : '#e2e8f0') }}>
            <div className="relative aspect-video bg-gray-900">
              <video
                key={safeQuestion.mediaUrl}
                src={safeQuestion.mediaUrl}
                className="w-full h-full object-cover"
                controls
                preload="metadata"
                playsInline
                poster={darkMode ? "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225' viewBox='0 0 400 225'%3E%3Crect width='400' height='225' fill='%231e293b'/%3E%3Cpath d='M150 100l70 40-70 40z' fill='%234b5563'/%3E%3C/svg%3E" : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225' viewBox='0 0 400 225'%3E%3Crect width='400' height='225' fill='%23f1f5f9'/%3E%3Cpath d='M150 100l70 40-70 40z' fill='%2394a3b8'/%3E%3C/svg%3E"}
              />
            </div>
          </div>
        )}

        {/* MLA Response */}
        {safeQuestion.response && (
          <div
            className="mb-4 p-4 rounded-lg transition-colors duration-200"
            style={{
              backgroundColor: darkMode ? '#064e3b20' : '#d1fae5',
              borderLeft: `4px solid ${darkMode ? '#10b981' : '#059669'}`,
            }}
          >
            <div className="flex items-start gap-2">
              <CheckCircle
                className="h-5 w-5 mt-0.5 flex-shrink-0"
                style={{ color: darkMode ? '#10b981' : '#059669' }}
              />
              <div>
                <div
                  className="font-medium text-sm mb-1"
                  style={{ color: darkMode ? '#10b981' : '#059669' }}
                >
                  MLA Response
                </div>
                <p
                  className="text-sm"
                  style={{ color: darkMode ? '#d1f5e9' : '#065f46' }}
                >
                  {safeQuestion.response}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t transition-colors duration-200">
          <button
            onClick={() => onVote(safeQuestion.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:opacity-80 transition-all duration-200 active:scale-95"
            style={{
              backgroundColor: theme.primary ? `${theme.primary}15` : (darkMode ? '#3b82f620' : '#2563eb20'),
              color: theme.primary || (darkMode ? '#60a5fa' : '#2563eb')
            }}
          >
            <ThumbsUp className="h-4 w-4" />
            <span className="font-medium">{safeQuestion.votes} votes</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              className="text-sm px-3 py-1.5 rounded-lg hover:opacity-80 transition-all duration-200 active:scale-95"
              style={{
                backgroundColor: darkMode ? '#334155' : '#f1f5f9',
                color: theme.textSecondary || (darkMode ? '#cbd5e1' : '#475569'),
              }}
            >
              Share
            </button>
            <button
              className="text-sm px-3 py-1.5 rounded-lg hover:opacity-80 transition-all duration-200 active:scale-95"
              style={{
                backgroundColor: darkMode ? '#334155' : '#f1f5f9',
                color: theme.textSecondary || (darkMode ? '#cbd5e1' : '#475569'),
              }}
            >
              Comment
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}