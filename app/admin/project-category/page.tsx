// app/(roles)/admin-user/manage-projects/page.tsx
"use client"

import { useState } from "react"
import { Plus, FolderKanban, Clock, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useThemeStore } from "@/store/useThemeStore"
import { ManageProjectsTable } from "@/components/admin-dashboard/manage-projects/table/manage-projects-table"
import { useRouter } from "next/navigation"

const mockProjects = [
  {
    id: "1",
    name: "Road Construction",
    category: "Infrastructure",
    status: "In Progress",
    state: "Odisha",
    district: "Khordha",
    constituency: "Bhubaneswar Central",
  },
  {
    id: "2",
    name: "School Building",
    category: "Education",
    status: "Completed",
    state: "Odisha",
    district: "Puri",
    constituency: "Puri",
  },
  {
    id: "3",
    name: "Water Supply",
    category: "Infrastructure",
    status: "Planning",
    state: "Odisha",
    district: "Cuttack",
    constituency: "Cuttack Sadar",
  },
  {
    id: "4",
    name: "Healthcare Center",
    category: "Healthcare",
    status: "In Progress",
    state: "Odisha",
    district: "Jajpur",
    constituency: "Korei",
  },
];

const states = ["Odisha", "Maharashtra", "Karnataka"];
const allDistricts = [
  { name: "Khordha", state: "Odisha" },
  { name: "Puri", state: "Odisha" },
  { name: "Cuttack", state: "Odisha" },
  { name: "Ganjam", state: "Odisha" },
  { name: "Jajpur", state: "Odisha" },
];
const allConstituencies = [
  { name: "Bhubaneswar Central", district: "Khordha" },
  { name: "Puri", district: "Puri" },
  { name: "Cuttack Sadar", district: "Cuttack" },
  { name: "Berhampur", district: "Ganjam" },
  { name: "Korei", district: "Jajpur" },
];

export default function ManageProjectsPage() {
  const { theme } = useThemeStore()
  const router = useRouter()
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedConstituency, setSelectedConstituency] = useState<string>("");
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
  const [showTable, setShowTable] = useState(false);

  const handleStateChange = (value: string) => {
    setSelectedState(value);
    setSelectedDistrict("");
    setSelectedConstituency("");
  };

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
    setSelectedConstituency("");
  };

  // Get filtered districts based on selected state
  const availableDistricts = selectedState && selectedState !== "all" 
    ? allDistricts.filter(d => d.state === selectedState)
    : [];

  // Get filtered constituencies based on selected district
  const availableConstituencies = selectedDistrict && selectedDistrict !== "all"
    ? allConstituencies.filter(c => c.district === selectedDistrict)
    : [];

  const handleSubmitFilter = () => {
    let filtered = mockProjects;
    
    if (selectedState && selectedState !== "all") {
      filtered = filtered.filter(project => project.state === selectedState);
    }
    if (selectedDistrict && selectedDistrict !== "all") {
      filtered = filtered.filter(project => project.district === selectedDistrict);
    }
    if (selectedConstituency && selectedConstituency !== "all") {
      filtered = filtered.filter(project => project.constituency === selectedConstituency);
    }
    
    setFilteredProjects(filtered);
    setShowTable(true);
  };

  // Statistics based on filtered data
  const dataToUse = showTable ? filteredProjects : mockProjects;
  const stats = [
    {
      title: "Total Projects",
      value: dataToUse.length.toString(),
      icon: FolderKanban,
      description: "All projects",
      color: "bg-blue-500",
    },
    {
      title: "In Progress",
      value: dataToUse.filter(p => p.status === "In Progress").length.toString(),
      icon: Clock,
      description: "Active projects",
      color: "bg-orange-500",
    },
    {
      title: "Completed",
      value: dataToUse.filter(p => p.status === "Completed").length.toString(),
      icon: CheckCircle2,
      description: "Finished projects",
      color: "bg-green-500",
    },
  ]

  return (
    <div className="h-full w-full p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 
            className="text-3xl font-bold"
            style={{ color: theme.textPrimary }}
          >
            Manage Projects
          </h1>
          <p 
            className="text-sm mt-1"
            style={{ color: theme.textTertiary }}
          >
            Create, track, and manage development projects across your constituency
          </p>
        </div>
        <Button
          onClick={() => router.push('/admin/AddProjects')}
          className="flex items-center gap-2 hover:opacity-90 transition-opacity"
          style={{
            background: theme.buttonPrimary.bg,
            color: "white",
          }}
        >
          <Plus className="h-4 w-4" />
          Add Project
        </Button>
      </div>

      {/* FILTERS */}
      <Card
        className="shadow-lg"
        style={{
          backgroundColor: theme.cardBackground,
          borderColor: theme.border,
        }}
      >
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="space-y-2">
              <Label style={{ color: theme.textPrimary }}>State</Label>
              <Select value={selectedState} onValueChange={handleStateChange}>
                <SelectTrigger style={{
                  backgroundColor: theme.input.bg,
                  borderColor: theme.input.border,
                  color: theme.input.text,
                }}>
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent style={{
                  backgroundColor: theme.cardBackground,
                  borderColor: theme.cardBorder,
                  color: theme.textPrimary,
                }}>
                  <SelectItem value="all">All States</SelectItem>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label style={{ color: theme.textPrimary }}>District</Label>
              <Select 
                value={selectedDistrict} 
                onValueChange={handleDistrictChange}
                disabled={!selectedState || selectedState === "all"}
              >
                <SelectTrigger style={{
                  backgroundColor: theme.input.bg,
                  borderColor: theme.input.border,
                  color: theme.input.text,
                }}>
                  <SelectValue placeholder="Select District" />
                </SelectTrigger>
                <SelectContent style={{
                  backgroundColor: theme.cardBackground,
                  borderColor: theme.cardBorder,
                  color: theme.textPrimary,
                }}>
                  <SelectItem value="all">All Districts</SelectItem>
                  {availableDistricts.map((district) => (
                    <SelectItem key={district.name} value={district.name}>{district.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label style={{ color: theme.textPrimary }}>Constituency</Label>
              <Select 
                value={selectedConstituency} 
                onValueChange={setSelectedConstituency}
                disabled={!selectedDistrict || selectedDistrict === "all"}
              >
                <SelectTrigger style={{
                  backgroundColor: theme.input.bg,
                  borderColor: theme.input.border,
                  color: theme.input.text,
                }}>
                  <SelectValue placeholder="Select Constituency" />
                </SelectTrigger>
                <SelectContent style={{
                  backgroundColor: theme.cardBackground,
                  borderColor: theme.cardBorder,
                  color: theme.textPrimary,
                }}>
                  <SelectItem value="all">All Constituencies</SelectItem>
                  {availableConstituencies.map((constituency) => (
                    <SelectItem key={constituency.name} value={constituency.name}>{constituency.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button
              onClick={handleSubmitFilter}
              style={{
                background: theme.buttonPrimary.bg,
                color: theme.buttonPrimary.text,
              }}
            >
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow"
            style={{
              backgroundColor: theme.cardBackground,
              borderColor: theme.border,
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p 
                  className="text-sm font-medium"
                  style={{ color: theme.textSecondary }}
                >
                  {stat.title}
                </p>
                <p 
                  className="text-3xl font-bold mt-2"
                  style={{ color: theme.textPrimary }}
                >
                  {stat.value}
                </p>
                <p 
                  className="text-xs mt-1"
                  style={{ color: theme.textTertiary }}
                >
                  {stat.description}
                </p>
              </div>
              <div
                className={`${stat.color} p-3 rounded-lg`}
                style={{ opacity: 0.9 }}
              >
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Projects Table */}
      {showTable && (
        <ManageProjectsTable 
          data={filteredProjects}
        />
      )}
    </div>
  )
}