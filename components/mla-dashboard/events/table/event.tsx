// components/mla-dashboard/events-meetings/table/events-table.tsx
"use client"

import { DataTable } from "./data-table"
import { columns, type Event } from "./columns"
import { useThemeStore } from "@/store/useThemeStore"

const data: Event[] = [
  {
    sl: 1,
    id: "EVT-2024-001",
    title: "Constituency Development Meeting",
    date: new Date(2025, 0, 5),
    time: "10:00 AM - 12:00 PM",
    location: "Korei Block Office, Korei",
    type: "Meeting",
    description: "Quarterly review of ongoing development projects",
    attendees: 25,
    status: "Scheduled",
  },
  {
    sl: 2,
    id: "EVT-2024-002",
    title: "Public Grievance Redressal Camp",
    date: new Date(2025, 0, 8),
    time: "9:00 AM - 5:00 PM",
    location: "Raghunathpur Panchayat Office",
    type: "Public Gathering",
    description: "Open forum for citizens to submit and discuss grievances",
    attendees: 150,
    status: "Scheduled",
  },
  {
    sl: 3,
    id: "EVT-2024-003",
    title: "Village Visit - Ambagaon",
    date: new Date(2024, 11, 28),
    time: "2:00 PM - 6:00 PM",
    location: "Ambagaon Village, Korei",
    type: "Constituency Visit",
    description: "Community interaction and inspection of village facilities",
    attendees: 75,
    status: "Completed",
  },
  {
    sl: 4,
    id: "EVT-2024-004",
    title: "Republic Day Celebration",
    date: new Date(2025, 0, 26),
    time: "8:00 AM - 11:00 AM",
    location: "Korei Stadium",
    type: "Government Event",
    description: "Republic Day flag hoisting and cultural programs",
    attendees: 500,
    status: "Scheduled",
  },
  {
    sl: 5,
    id: "EVT-2024-005",
    title: "Budget Allocation Discussion",
    date: new Date(2025, 0, 3),
    time: "11:00 AM - 1:00 PM",
    location: "MLA Office, Korei",
    type: "Meeting",
    description: "Discussion on budget allocation for Q1 2025 projects",
    attendees: 12,
    status: "Ongoing",
  },
  {
    sl: 6,
    id: "EVT-2024-006",
    title: "Health Camp - Free Medical Checkup",
    date: new Date(2025, 0, 12),
    time: "9:00 AM - 4:00 PM",
    location: "Kesharpur Community Health Center",
    type: "Public Gathering",
    description: "Free health checkup and medicine distribution",
    attendees: 200,
    status: "Scheduled",
  },
  {
    sl: 7,
    id: "EVT-2024-007",
    title: "Staff Coordination Meeting",
    date: new Date(2024, 11, 25),
    time: "3:00 PM - 5:00 PM",
    location: "MLA Office Conference Room",
    type: "Meeting",
    description: "Monthly staff coordination and task review",
    attendees: 18,
    status: "Completed",
  },
  {
    sl: 8,
    id: "EVT-2024-008",
    title: "Farmer's Welfare Scheme Launch",
    date: new Date(2025, 0, 15),
    time: "10:00 AM - 2:00 PM",
    location: "Korei Agriculture Office",
    type: "Government Event",
    description: "Launch of new agricultural subsidy scheme",
    attendees: 300,
    status: "Scheduled",
  },
  {
    sl: 9,
    id: "EVT-2024-009",
    title: "Women Empowerment Workshop",
    date: new Date(2025, 0, 18),
    time: "10:00 AM - 3:00 PM",
    location: "Community Center, Badakotha",
    type: "Public Gathering",
    description: "Skill development and entrepreneurship training for women",
    attendees: 80,
    status: "Scheduled",
  },
  {
    sl: 10,
    id: "EVT-2024-010",
    title: "School Infrastructure Inspection",
    date: new Date(2025, 0, 20),
    time: "11:00 AM - 4:00 PM",
    location: "Government High School, Nuagaon",
    type: "Constituency Visit",
    description: "Review of ongoing school renovation and facilities",
    attendees: 15,
    status: "Scheduled",
  },
]

export function EventsTable() {
  const { theme } = useThemeStore()

  return (
    <div 
      className="w-full rounded-lg border shadow-lg p-6"
      style={{
        background: theme.cardBackground,
        borderColor: theme.border,
      }}
    >
      <DataTable columns={columns} data={data} />
    </div>
  )
}