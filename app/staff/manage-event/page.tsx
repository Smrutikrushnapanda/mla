// app/(protected)/mla/events-meetings/manage-events/page.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useThemeStore } from "@/store/useThemeStore"
import { EventsTable } from "@/components/mla-dashboard/events/table/event"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Calendar as CalendarIcon, Users, Clock, MapPin } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format } from "date-fns"
import { toast } from "sonner"

export default function ManageEventsPage() {
  const { theme } = useThemeStore()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    type: "",
    description: "",
    expectedAttendees: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Sample event dates (highlight dates with events)
  const eventDates = [
    new Date(2025, 0, 3),
    new Date(2025, 0, 5),
    new Date(2025, 0, 8),
    new Date(2025, 0, 12),
    new Date(2025, 0, 15),
    new Date(2025, 0, 18),
    new Date(2025, 0, 20),
    new Date(2025, 0, 26),
  ]

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    if (date) {
      setFormData(prev => ({ ...prev, date: format(date, "yyyy-MM-dd") }))
      setIsAddDialogOpen(true)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Event title is required"
    }
    if (!formData.date) {
      newErrors.date = "Date is required"
    }
    if (!formData.time.trim()) {
      newErrors.time = "Time is required"
    }
    if (!formData.location.trim()) {
      newErrors.location = "Location is required"
    }
    if (!formData.type) {
      newErrors.type = "Event type is required"
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error("Please fill in all required fields")
      return
    }

    // Here you would submit to API
    console.log("Event data:", formData)
    toast.success("Event scheduled successfully!")
    
    // Reset form
    setFormData({
      title: "",
      date: "",
      time: "",
      location: "",
      type: "",
      description: "",
      expectedAttendees: "",
    })
    setErrors({})
    setIsAddDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 
            className="text-2xl md:text-3xl font-bold"
            style={{ color: theme.textPrimary }}
          >
            MLA Events & Meetings
          </h1>
          <p 
            className="text-sm mt-1"
            style={{ color: theme.textSecondary }}
          >
            Schedule and manage MLA's events, meetings, and public gatherings
          </p>
        </div>
        <Button
          onClick={() => setIsAddDialogOpen(true)}
            className="flex items-center gap-2"
            style={{
              background: theme.buttonPrimary.bg,
              color: theme.buttonPrimary.text,
            }}
          >
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card 
          className="shadow-lg border-l-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          style={{ 
            backgroundColor: theme.cardBackground,
            borderTop: `1px solid ${theme.cardBorder}`,
            borderRight: `1px solid ${theme.cardBorder}`,
            borderBottom: `1px solid ${theme.cardBorder}`,
            borderLeftColor: '#3b82f6',
            borderLeftWidth: '4px',
            borderLeftStyle: 'solid'
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium" style={{ color: theme.textSecondary }}>
              Total Events
            </CardTitle>
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <CalendarIcon className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: theme.textPrimary }}>
              24
            </div>
            <p className="text-xs mt-1" style={{ color: theme.textTertiary }}>
              This month
            </p>
          </CardContent>
        </Card>

        <Card 
          className="shadow-lg border-l-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          style={{ 
            backgroundColor: theme.cardBackground,
            borderTop: `1px solid ${theme.cardBorder}`,
            borderRight: `1px solid ${theme.cardBorder}`,
            borderBottom: `1px solid ${theme.cardBorder}`,
            borderLeftColor: '#22c55e',
            borderLeftWidth: '4px',
            borderLeftStyle: 'solid'
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium" style={{ color: theme.textSecondary }}>
              Upcoming Events
            </CardTitle>
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <Clock className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: theme.textPrimary }}>
              8
            </div>
            <p className="text-xs mt-1" style={{ color: theme.textTertiary }}>
              Next 7 days
            </p>
          </CardContent>
        </Card>

        <Card 
          className="shadow-lg border-l-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          style={{ 
            backgroundColor: theme.cardBackground,
            borderTop: `1px solid ${theme.cardBorder}`,
            borderRight: `1px solid ${theme.cardBorder}`,
            borderBottom: `1px solid ${theme.cardBorder}`,
            borderLeftColor: '#f59e0b',
            borderLeftWidth: '4px',
            borderLeftStyle: 'solid'
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium" style={{ color: theme.textSecondary }}>
              Total Attendees
            </CardTitle>
            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
              <Users className="h-5 w-5 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: theme.textPrimary }}>
              2,450
            </div>
            <p className="text-xs mt-1" style={{ color: theme.textTertiary }}>
              This month
            </p>
          </CardContent>
        </Card>

        <Card 
          className="shadow-lg border-l-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          style={{ 
            backgroundColor: theme.cardBackground,
            borderTop: `1px solid ${theme.cardBorder}`,
            borderRight: `1px solid ${theme.cardBorder}`,
            borderBottom: `1px solid ${theme.cardBorder}`,
            borderLeftColor: '#8b5cf6',
            borderLeftWidth: '4px',
            borderLeftStyle: 'solid'
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium" style={{ color: theme.textSecondary }}>
              Locations Covered
            </CardTitle>
            <div className="h-10 w-10 rounded-full bg-violet-100 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-violet-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold" style={{ color: theme.textPrimary }}>
              12
            </div>
            <p className="text-xs mt-1" style={{ color: theme.textTertiary }}>
              Different villages
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Calendar Card */}
      <Card 
        className="shadow-lg"
        style={{ 
          backgroundColor: theme.cardBackground,
          borderColor: theme.cardBorder,
        }}
      >
        <CardHeader>
          <CardTitle 
            className="flex items-center gap-3"
            style={{ color: theme.textPrimary }}
          >
            <CalendarIcon className="h-5 w-5" />
            Event Calendar
          </CardTitle>
          <p className="text-sm mt-1" style={{ color: theme.textSecondary }}>
            Click on any date to schedule a new event
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-center">
            <div 
              className="p-4 rounded-lg"
              style={{
                backgroundColor: theme.backgroundSecondary,
              }}
            >
              <style jsx global>{`
                .rdp {
                  --rdp-accent-color: ${theme.buttonPrimary.bg} !important;
                  --rdp-background-color: ${theme.buttonPrimary.bg}20 !important;
                  margin: 0;
                }
                .rdp-day_button:hover:not([disabled]) {
                  background-color: ${theme.buttonPrimary.bg}30 !important;
                  transform: scale(1.05);
                  transition: all 0.2s;
                }
                .rdp-day_selected .rdp-day_button {
                  background: ${theme.buttonPrimary.bg} !important;
                  color: ${theme.buttonPrimary.text} !important;
                  font-weight: bold;
                  border-radius: 8px !important;
                }
                .rdp-weekday {
                  color: ${theme.textSecondary};
                  font-weight: 600;
                  font-size: 0.85rem;
                }
                .rdp-day_button {
                  border-radius: 8px;
                  width: 40px !important;
                  height: 40px !important;
                  font-size: 0.95rem;
                  transition: all 0.2s;
                  color: ${theme.textPrimary};
                }
                .rdp-month_caption {
                  color: ${theme.textPrimary};
                  font-size: 1.1rem;
                  font-weight: 700;
                  margin-bottom: 1rem;
                }
                .rdp-nav {
                  gap: 0.5rem;
                }
                .rdp-button_previous, .rdp-button_next {
                  background-color: ${theme.buttonPrimary.bg}15 !important;
                  border-radius: 8px;
                  transition: all 0.2s;
                }
                .rdp-button_previous:hover, .rdp-button_next:hover {
                  background-color: ${theme.buttonPrimary.bg} !important;
                  transform: scale(1.1);
                }
                .rdp-button_previous svg, .rdp-button_next svg {
                  color: ${theme.buttonPrimary.bg};
                }
                .rdp-button_previous:hover svg, .rdp-button_next:hover svg {
                  color: ${theme.buttonPrimary.text};
                }
              `}</style>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                modifiers={{
                  hasEvent: eventDates,
                }}
                modifiersStyles={{
                  hasEvent: {
                    position: 'relative',
                  },
                }}
                modifiersClassNames={{
                  hasEvent: 'has-event-marker'
                }}
              />
              <style jsx global>{`
                .has-event-marker .rdp-day_button::after {
                  content: '';
                  position: absolute;
                  bottom: 2px;
                  left: 50%;
                  transform: translateX(-50%);
                  width: 6px;
                  height: 6px;
                  background: ${theme.buttonPrimary.bg};
                  border-radius: 50%;
                  box-shadow: 0 0 8px ${theme.buttonPrimary.bg};
                }
                .has-event-marker .rdp-day_button {
                  font-weight: 700 !important;
                  color: ${theme.buttonPrimary.bg} !important;
                }
              `}</style>
            </div>
          </div>

          {/* Calendar Legend */}
          <div className="mt-6 flex justify-center gap-6">
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full shadow-lg"
                style={{ backgroundColor: theme.buttonPrimary.bg }}
              />
              <span className="text-sm" style={{ color: theme.textSecondary }}>
                Days with events
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full border-2"
                style={{ borderColor: theme.border }}
              />
              <span className="text-sm" style={{ color: theme.textSecondary }}>
                Available days
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events Table */}
      <EventsTable />

      {/* Add Event Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent 
          className="max-w-2xl max-h-[90vh] overflow-y-auto"
          style={{ 
            backgroundColor: theme.cardBackground,
            borderColor: theme.cardBorder,
          }}
        >
          <DialogHeader>
            <DialogTitle style={{ color: theme.textPrimary }}>
              Schedule MLA Event
            </DialogTitle>
            <DialogDescription style={{ color: theme.textSecondary }}>
              Fill in the details to create a new event for MLA
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Event Title */}
            <div className="space-y-2">
              <Label htmlFor="title" style={{ color: theme.textPrimary }}>
                Event Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="e.g., Constituency Development Meeting"
                style={{
                  backgroundColor: theme.backgroundSecondary,
                  borderColor: errors.title ? "#ef4444" : theme.border,
                  color: theme.textPrimary,
                }}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" style={{ color: theme.textPrimary }}>
                  Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  style={{
                    backgroundColor: theme.backgroundSecondary,
                    borderColor: errors.date ? "#ef4444" : theme.border,
                    color: theme.textPrimary,
                  }}
                />
                {errors.date && (
                  <p className="text-sm text-red-500">{errors.date}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="time" style={{ color: theme.textPrimary }}>
                  Time <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="time"
                  value={formData.time}
                  onChange={(e) => handleChange("time", e.target.value)}
                  placeholder="e.g., 10:00 AM - 12:00 PM"
                  style={{
                    backgroundColor: theme.backgroundSecondary,
                    borderColor: errors.time ? "#ef4444" : theme.border,
                    color: theme.textPrimary,
                  }}
                />
                {errors.time && (
                  <p className="text-sm text-red-500">{errors.time}</p>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" style={{ color: theme.textPrimary }}>
                Location <span className="text-red-500">*</span>
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="e.g., Korei Block Office, Korei"
                style={{
                  backgroundColor: theme.backgroundSecondary,
                  borderColor: errors.location ? "#ef4444" : theme.border,
                  color: theme.textPrimary,
                }}
              />
              {errors.location && (
                <p className="text-sm text-red-500">{errors.location}</p>
              )}
            </div>

            {/* Event Type and Attendees */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type" style={{ color: theme.textPrimary }}>
                  Event Type <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleChange("type", value)}
                >
                  <SelectTrigger
                    style={{
                      backgroundColor: theme.backgroundSecondary,
                      borderColor: errors.type ? "#ef4444" : theme.border,
                      color: theme.textPrimary,
                    }}
                  >
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      backgroundColor: theme.backgroundSecondary,
                      borderColor: theme.border,
                    }}
                  >
                    <SelectItem value="Meeting">Meeting</SelectItem>
                    <SelectItem value="Public Gathering">Public Gathering</SelectItem>
                    <SelectItem value="Constituency Visit">Constituency Visit</SelectItem>
                    <SelectItem value="Government Event">Government Event</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && (
                  <p className="text-sm text-red-500">{errors.type}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="expectedAttendees" style={{ color: theme.textPrimary }}>
                  Expected Attendees
                </Label>
                <Input
                  id="expectedAttendees"
                  type="number"
                  value={formData.expectedAttendees}
                  onChange={(e) => handleChange("expectedAttendees", e.target.value)}
                  placeholder="e.g., 50"
                  style={{
                    backgroundColor: theme.backgroundSecondary,
                    borderColor: theme.border,
                    color: theme.textPrimary,
                  }}
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" style={{ color: theme.textPrimary }}>
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Enter event description and agenda..."
                rows={4}
                style={{
                  backgroundColor: theme.backgroundSecondary,
                  borderColor: errors.description ? "#ef4444" : theme.border,
                  color: theme.textPrimary,
                }}
                className="resize-none"
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
                style={{
                  borderColor: theme.border,
                  color: theme.textPrimary,
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                style={{
                  background: theme.buttonPrimary.bg,
                  color: theme.buttonPrimary.text,
                }}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                Schedule Event
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}