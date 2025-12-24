"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { X, MessageSquare, Mic, Video, Upload, AlertCircle, StopCircle, Play, Pause, RotateCcw, Camera } from "lucide-react"
import { VoiceQuestion } from "../types"

interface AskQuestionModalProps {
    theme: any
    darkMode: boolean
    onClose: () => void
    onSubmit: (question: Omit<VoiceQuestion, "id" | "createdAt" | "votes" | "status">) => void
}

export default function AskQuestionModal({ theme, darkMode, onClose, onSubmit }: AskQuestionModalProps) {
    const [questionType, setQuestionType] = useState<"text" | "audio" | "video">("text")
    const [category, setCategory] = useState("")
    const [content, setContent] = useState("")
    const [constituency, setConstituency] = useState("")
    const [mediaFile, setMediaFile] = useState<File | null>(null)
    const [error, setError] = useState("")

    // Recording states
    const [isRecording, setIsRecording] = useState(false)
    const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null)
    const [recordedUrl, setRecordedUrl] = useState<string | null>(null)
    const [recordingTime, setRecordingTime] = useState(0)
    const [showRecorder, setShowRecorder] = useState(false)

    const fileInputRef = useRef<HTMLInputElement>(null)
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const streamRef = useRef<MediaStream | null>(null)
    const chunksRef = useRef<Blob[]>([])
    const videoPreviewRef = useRef<HTMLVideoElement>(null)
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    const categories = [
        "Local Development",
        "Government Scheme",
        "Health Services",
        "Education",
        "Infrastructure",
        "Social Welfare",
        "Transportation",
        "Environment",
        "Water Supply",
        "Public Safety"
    ]

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopStream()
            if (timerRef.current) clearInterval(timerRef.current)
            if (recordedUrl) URL.revokeObjectURL(recordedUrl)
        }
    }, [recordedUrl])

    const stopStream = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop())
            streamRef.current = null
        }
    }

    const startRecording = async () => {
        try {
            setError("")
            chunksRef.current = []

            // Request appropriate media permissions
            const constraints = questionType === "audio"
                ? { audio: true }
                : { audio: true, video: { width: 1280, height: 720 } }

            const stream = await navigator.mediaDevices.getUserMedia(constraints)
            streamRef.current = stream

            // For video, show preview
            if (questionType === "video" && videoPreviewRef.current) {
                videoPreviewRef.current.srcObject = stream
                videoPreviewRef.current.play()
            }

            // Create MediaRecorder
            const mimeType = questionType === "audio"
                ? "audio/webm;codecs=opus"
                : "video/webm;codecs=vp8,opus"

            const mediaRecorder = new MediaRecorder(stream, { mimeType })
            mediaRecorderRef.current = mediaRecorder

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunksRef.current.push(event.data)
                }
            }

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunksRef.current, {
                    type: questionType === "audio" ? "audio/webm" : "video/webm"
                })
                setRecordedBlob(blob)

                // Create URL for preview
                const url = URL.createObjectURL(blob)
                setRecordedUrl(url)

                // For video, update preview src
                if (questionType === "video" && videoPreviewRef.current) {
                    videoPreviewRef.current.srcObject = null
                    videoPreviewRef.current.src = url
                }

                stopStream()
            }

            mediaRecorder.start()
            setIsRecording(true)
            setRecordingTime(0)

            // Start timer
            timerRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1)
            }, 1000)

        } catch (err) {
            console.error("Error starting recording:", err)
            setError(
                questionType === "audio"
                    ? "Unable to access microphone. Please grant permission."
                    : "Unable to access camera/microphone. Please grant permission."
            )
        }
    }

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop()
            setIsRecording(false)
            if (timerRef.current) {
                clearInterval(timerRef.current)
                timerRef.current = null
            }
        }
    }

    const resetRecording = () => {
        setRecordedBlob(null)
        if (recordedUrl) {
            URL.revokeObjectURL(recordedUrl)
            setRecordedUrl(null)
        }
        setRecordingTime(0)
        setShowRecorder(true)
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        // Validation
        if (!category) {
            setError("Please select a category")
            return
        }
        if (!content.trim()) {
            setError("Please enter your question")
            return
        }
        if (!constituency.trim()) {
            setError("Please enter your constituency/ward")
            return
        }

        // Create the question object
        const newQuestion: Omit<VoiceQuestion, "id" | "createdAt" | "votes" | "status"> = {
            type: questionType,
            category,
            content: content.trim(),
            constituency: constituency.trim(),
            userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser",
            userName: "You",
            isMine: true
        }

        // Add media from upload or recording
        const mediaSource = recordedBlob || mediaFile
        if (mediaSource) {
            newQuestion.mediaUrl = recordedUrl || (mediaFile ? URL.createObjectURL(mediaFile) : undefined)
            newQuestion.duration = recordingTime || (questionType === "audio" ? 60 : 120)
        }

        onSubmit(newQuestion)
        onClose()
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            // Validate file type
            if (questionType === "audio" && !file.type.startsWith("audio/")) {
                setError("Please select an audio file")
                return
            }
            if (questionType === "video" && !file.type.startsWith("video/")) {
                setError("Please select a video file")
                return
            }
            setMediaFile(file)
            setError("")
            setShowRecorder(false) // Close recorder if open
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                style={{
                    backgroundColor: theme.cardBackground || (darkMode ? '#1e293b' : '#ffffff'),
                }}
            >
                {/* Header */}
                <div
                    className="flex items-center justify-between p-6 border-b"
                    style={{ borderColor: theme.border || (darkMode ? '#334155' : '#e2e8f0') }}
                >
                    <h2
                        className="text-xl font-bold"
                        style={{ color: theme.textPrimary || (darkMode ? '#f8fafc' : '#0f172a') }}
                    >
                        Ask a Question
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:opacity-80 transition-opacity"
                        style={{
                            backgroundColor: darkMode ? '#334155' : '#f1f5f9',
                            color: theme.textSecondary || (darkMode ? '#cbd5e1' : '#475569'),
                        }}
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Question Type Selection */}
                    <div>
                        <label
                            className="block text-sm font-medium mb-3"
                            style={{ color: theme.textPrimary || (darkMode ? '#f8fafc' : '#0f172a') }}
                        >
                            Question Type
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { type: "text" as const, icon: MessageSquare, label: "Text" },
                                { type: "audio" as const, icon: Mic, label: "Audio" },
                                { type: "video" as const, icon: Video, label: "Video" },
                            ].map(({ type, icon: Icon, label }) => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => {
                                        setQuestionType(type)
                                        setMediaFile(null)
                                        setRecordedBlob(null)
                                        setShowRecorder(false)
                                        if (recordedUrl) URL.revokeObjectURL(recordedUrl)
                                        setRecordedUrl(null)
                                    }}
                                    className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-2 ${questionType === type ? "scale-105" : "hover:scale-102"
                                        }`}
                                    style={{
                                        borderColor: questionType === type
                                            ? theme.primary || (darkMode ? '#3b82f6' : '#2563eb')
                                            : theme.border || (darkMode ? '#334155' : '#e2e8f0'),
                                        backgroundColor: questionType === type
                                            ? theme.primary ? `${theme.primary}15` : (darkMode ? '#3b82f620' : '#2563eb20')
                                            : 'transparent',
                                        color: questionType === type
                                            ? theme.primary || (darkMode ? '#60a5fa' : '#2563eb')
                                            : theme.textSecondary || (darkMode ? '#cbd5e1' : '#475569'),
                                    }}
                                >
                                    <Icon className="h-6 w-6" />
                                    <span className="text-sm font-medium">{label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Category Selection */}
                    <div>
                        <label
                            className="block text-sm font-medium mb-2"
                            style={{ color: theme.textPrimary || (darkMode ? '#f8fafc' : '#0f172a') }}
                        >
                            Category
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 appearance-none"
                            style={{
                                backgroundColor: theme.inputBackground || theme.cardBackground || (darkMode ? '#0f172a' : '#ffffff'),
                                borderColor: theme.border || (darkMode ? '#334155' : '#e2e8f0'),
                                color: theme.textPrimary || (darkMode ? '#f8fafc' : '#0f172a'),
                                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='${darkMode ? '%2394a3b8' : '%2364748b'}' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                                backgroundPosition: 'right 0.5rem center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: '1.5em 1.5em',
                                paddingRight: '2.5rem',
                            }}
                            required
                        >
                            <option value="">Select a category</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Constituency/Ward */}
                    <div>
                        <label
                            className="block text-sm font-medium mb-2"
                            style={{ color: theme.textPrimary || (darkMode ? '#f8fafc' : '#0f172a') }}
                        >
                            Constituency/Ward
                        </label>
                        <input
                            type="text"
                            value={constituency}
                            onChange={(e) => setConstituency(e.target.value)}
                            placeholder="e.g., Ward 12"
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200"
                            style={{
                                backgroundColor: theme.inputBackground || theme.cardBackground || (darkMode ? '#0f172a' : '#ffffff'),
                                borderColor: theme.border || (darkMode ? '#334155' : '#e2e8f0'),
                                color: theme.textPrimary || (darkMode ? '#f8fafc' : '#0f172a'),
                            }}
                            required
                        />
                    </div>

                    {/* Question Content */}
                    <div>
                        <label
                            className="block text-sm font-medium mb-2"
                            style={{ color: theme.textPrimary || (darkMode ? '#f8fafc' : '#0f172a') }}
                        >
                            Your Question
                        </label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Describe your question or concern in detail..."
                            rows={4}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 resize-none"
                            style={{
                                backgroundColor: theme.inputBackground || theme.cardBackground || (darkMode ? '#0f172a' : '#ffffff'),
                                borderColor: theme.border || (darkMode ? '#334155' : '#e2e8f0'),
                                color: theme.textPrimary || (darkMode ? '#f8fafc' : '#0f172a'),
                            }}
                            required
                        />
                    </div>

                    {/* Media Recording/Upload for Audio/Video */}
                    {(questionType === "audio" || questionType === "video") && (
                        <div className="space-y-4">
                            <label
                                className="block text-sm font-medium"
                                style={{ color: theme.textPrimary || (darkMode ? '#f8fafc' : '#0f172a') }}
                            >
                                {questionType === "audio" ? "Audio" : "Video"} Recording/Upload
                            </label>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowRecorder(true)
                                        setMediaFile(null)
                                    }}
                                    className="flex-1 px-4 py-3 border-2 rounded-lg hover:opacity-80 transition-all duration-200 flex items-center justify-center gap-2"
                                    style={{
                                        borderColor: theme.primary || (darkMode ? '#3b82f6' : '#2563eb'),
                                        backgroundColor: showRecorder || recordedBlob
                                            ? (theme.primary ? `${theme.primary}15` : (darkMode ? '#3b82f620' : '#2563eb20'))
                                            : 'transparent',
                                        color: theme.primary || (darkMode ? '#60a5fa' : '#2563eb'),
                                    }}
                                >
                                    {questionType === "audio" ? <Mic className="h-5 w-5" /> : <Camera className="h-5 w-5" />}
                                    <span>Record {questionType === "audio" ? "Audio" : "Video"}</span>
                                </button>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept={questionType === "audio" ? "audio/*" : "video/*"}
                                    onChange={handleFileSelect}
                                    className="hidden"
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex-1 px-4 py-3 border-2 rounded-lg hover:opacity-80 transition-all duration-200 flex items-center justify-center gap-2"
                                    style={{
                                        borderColor: theme.border || (darkMode ? '#334155' : '#e2e8f0'),
                                        color: theme.textSecondary || (darkMode ? '#cbd5e1' : '#475569'),
                                    }}
                                >
                                    <Upload className="h-5 w-5" />
                                    <span>Upload File</span>
                                </button>
                            </div>

                            {/* Recording Interface */}
                            {showRecorder && !recordedBlob && (
                                <div
                                    className="p-6 rounded-lg border-2 space-y-4"
                                    style={{
                                        backgroundColor: darkMode ? '#0f172a' : '#f8fafc',
                                        borderColor: theme.border || (darkMode ? '#334155' : '#e2e8f0'),
                                    }}
                                >
                                    {/* Video Preview */}
                                    {questionType === "video" && (
                                        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                                            <video
                                                ref={videoPreviewRef}
                                                className="w-full h-full object-cover"
                                                muted
                                                playsInline
                                            />
                                        </div>
                                    )}

                                    {/* Recording Timer */}
                                    {isRecording && (
                                        <div className="text-center">
                                            <div
                                                className="text-3xl font-bold font-mono"
                                                style={{ color: theme.primary || (darkMode ? '#60a5fa' : '#2563eb') }}
                                            >
                                                {formatTime(recordingTime)}
                                            </div>
                                            <div className="flex items-center justify-center gap-2 mt-2">
                                                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                                <span
                                                    className="text-sm"
                                                    style={{ color: theme.textSecondary || (darkMode ? '#cbd5e1' : '#475569') }}
                                                >
                                                    Recording...
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Recording Controls */}
                                    <div className="flex justify-center gap-3">
                                        {!isRecording ? (
                                            <button
                                                type="button"
                                                onClick={startRecording}
                                                className="px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-200 flex items-center gap-2 font-medium"
                                                style={{
                                                    background: theme.primary || (darkMode ? '#3b82f6' : '#2563eb'),
                                                    color: "white",
                                                }}
                                            >
                                                {questionType === "audio" ? <Mic className="h-5 w-5" /> : <Camera className="h-5 w-5" />}
                                                <span>Start Recording</span>
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={stopRecording}
                                                className="px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-200 flex items-center gap-2 font-medium bg-red-600 text-white"
                                            >
                                                <StopCircle className="h-5 w-5" />
                                                <span>Stop Recording</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Recorded Preview */}
                            {recordedBlob && (
                                <div
                                    className="p-6 rounded-lg border-2 space-y-4"
                                    style={{
                                        backgroundColor: darkMode ? '#0f172a' : '#f8fafc',
                                        borderColor: theme.primary || (darkMode ? '#3b82f6' : '#2563eb'),
                                    }}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div
                                                className="font-medium"
                                                style={{ color: theme.textPrimary || (darkMode ? '#f8fafc' : '#0f172a') }}
                                            >
                                                {questionType === "audio" ? "Audio" : "Video"} Recorded
                                            </div>
                                            <div
                                                className="text-sm"
                                                style={{ color: theme.textSecondary || (darkMode ? '#cbd5e1' : '#475569') }}
                                            >
                                                Duration: {formatTime(recordingTime)}
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={resetRecording}
                                            className="p-2 rounded-lg hover:opacity-80 transition-opacity"
                                            style={{
                                                backgroundColor: darkMode ? '#334155' : '#f1f5f9',
                                                color: theme.textSecondary || (darkMode ? '#cbd5e1' : '#475569'),
                                            }}
                                        >
                                            <RotateCcw className="h-5 w-5" />
                                        </button>
                                    </div>

                                    {/* Preview Player */}
                                    {questionType === "audio" ? (
                                        <audio
                                            src={recordedUrl || undefined}
                                            controls
                                            className="w-full"
                                            style={{
                                                borderRadius: '0.5rem',
                                            }}
                                        />
                                    ) : (
                                        <video
                                            ref={videoPreviewRef}
                                            src={recordedUrl || undefined}
                                            controls
                                            className="w-full aspect-video bg-black rounded-lg"
                                        />
                                    )}
                                </div>
                            )}

                            {/* Uploaded File Preview */}
                            {mediaFile && (
                                <div
                                    className="p-4 rounded-lg border flex items-center justify-between"
                                    style={{
                                        backgroundColor: darkMode ? '#0f172a' : '#f8fafc',
                                        borderColor: theme.border || (darkMode ? '#334155' : '#e2e8f0'),
                                    }}
                                >
                                    <div className="flex items-center gap-3">
                                        {questionType === "audio" ? <Mic className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                                        <div>
                                            <div
                                                className="text-sm font-medium"
                                                style={{ color: theme.textPrimary || (darkMode ? '#f8fafc' : '#0f172a') }}
                                            >
                                                {mediaFile.name}
                                            </div>
                                            <div
                                                className="text-xs"
                                                style={{ color: theme.textSecondary || (darkMode ? '#cbd5e1' : '#475569') }}
                                            >
                                                {(mediaFile.size / 1024 / 1024).toFixed(2)} MB
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setMediaFile(null)}
                                        className="p-2 rounded-lg hover:opacity-80 transition-opacity"
                                        style={{
                                            backgroundColor: darkMode ? '#334155' : '#f1f5f9',
                                            color: theme.textSecondary || (darkMode ? '#cbd5e1' : '#475569'),
                                        }}
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div
                            className="p-4 rounded-lg flex items-start gap-3"
                            style={{
                                backgroundColor: darkMode ? '#7f1d1d20' : '#fee2e2',
                                borderColor: darkMode ? '#7f1d1d' : '#ef4444',
                                borderWidth: '1px',
                            }}
                        >
                            <AlertCircle
                                className="h-5 w-5 flex-shrink-0 mt-0.5"
                                style={{ color: darkMode ? '#ef4444' : '#dc2626' }}
                            />
                            <p
                                className="text-sm"
                                style={{ color: darkMode ? '#fca5a5' : '#dc2626' }}
                            >
                                {error}
                            </p>
                        </div>
                    )}

                    {/* Submit Buttons */}
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 rounded-lg hover:opacity-80 transition-all duration-200"
                            style={{
                                backgroundColor: darkMode ? '#334155' : '#f1f5f9',
                                color: theme.textSecondary || (darkMode ? '#cbd5e1' : '#475569'),
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-200 font-medium"
                            style={{
                                background: theme.buttonPrimary?.bg || theme.primary || (darkMode ? '#3b82f6' : '#2563eb'),
                                color: theme.buttonPrimary?.text || "white",
                            }}
                        >
                            Submit Question
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    )
}
