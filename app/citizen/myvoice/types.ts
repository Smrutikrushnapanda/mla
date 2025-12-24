// app/(roles)/admin-user/my-voice/types.ts
export type VoiceQuestion = {
  id: number
  category: string
  type: "text" | "audio" | "video"
  content: string
  mediaUrl?: string
  duration?: number
  constituency: string
  createdAt: Date
  votes: number
  status: "active" | "addressed" | "archived"
  response?: string
  userAvatar?: string
  userName?: string
  isMine?: boolean
}