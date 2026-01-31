"use client";

import { useState } from "react";
import { Plus, Map } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useThemeStore } from "@/store/useThemeStore";
import { ConstituencyTable } from "@/components/admin-dashboard/constituency/tables/constituency-table";
import { Constituency } from "../../../components/admin-dashboard/constituency/tables/columns";

const mockConstituencies: Constituency[] = [
  {
    id: "1",
    name: "Bhubaneswar Central",
    district: "Khordha",
    state: "Odisha",
    active: true,
    type: "Urban",
    voters: 185000,
    mlaName: "Ananta Kumar Jena",
  },
  {
    id: "2",
    name: "Bhubaneswar North",
    district: "Khordha",
    state: "Odisha",
    active: true,
    type: "Urban",
    voters: 162000,
    mlaName: "Susanta Kumar Rout",
  },
  {
    id: "3",
    name: "Puri",
    district: "Puri",
    state: "Odisha",
    active: false,
    type: "Urban",
    voters: 178000,
    mlaName: "Jayanta Kumar Sarangi",
  },
  {
    id: "4",
    name: "Brahmagiri",
    district: "Puri",
    state: "Odisha",
    active: true,
    type: "Rural",
    voters: 195000,
    mlaName: "Lalitendu Bidyadhar Mohapatra",
  },
  {
    id: "5",
    name: "Cuttack Sadar",
    district: "Cuttack",
    state: "Odisha",
    active: true,
    type: "Urban",
    voters: 172000,
    mlaName: "Mohammed Moquim",
  },
  {
    id: "6",
    name: "Barabati-Cuttack",
    district: "Cuttack",
    state: "Odisha",
    active: false,
    type: "Urban",
    voters: 168000,
  },
  {
    id: "7",
    name: "Berhampur",
    district: "Ganjam",
    state: "Odisha",
    active: true,
    type: "Urban",
    voters: 191000,
    mlaName: "Bikram Panda",
  },
  {
    id: "8",
    name: "Chhatrapur",
    district: "Ganjam",
    state: "Odisha",
    active: true,
    type: "Semi-Urban",
    voters: 187000,
    mlaName: "Suryamani Baidya",
  },
  {
    id: "9",
    name: "Balasore",
    district: "Balasore",
    state: "Odisha",
    active: true,
    type: "Urban",
    voters: 175000,
    mlaName: "Manas Ranjan Dutta",
  },
  {
    id: "10",
    name: "Jaleswar",
    district: "Balasore",
    state: "Odisha",
    active: false,
    type: "Rural",
    voters: 183000,
  },
  {
    id: "11",
    name: "Sambalpur",
    district: "Sambalpur",
    state: "Odisha",
    active: true,
    type: "Urban",
    voters: 179000,
    mlaName: "Janardan Patel",
  },
  {
    id: "12",
    name: "Rengali",
    district: "Sambalpur",
    state: "Odisha",
    active: true,
    type: "Rural",
    voters: 194000,
    mlaName: "Sudhir Kumar Samal",
  },
];

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const constituencyTypes = ["Urban", "Rural", "Semi-Urban"];

export default function ConstituenciesPage() {
  const { theme } = useThemeStore();
  const [constituencies, setConstituencies] = useState<Constituency[]>(mockConstituencies);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedConstituency, setSelectedConstituency] = useState<Constituency | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    district: "",
    state: "",
    type: "Urban" as "Urban" | "Rural" | "Semi-Urban",
    voters: "",
    mlaName: "",
    active: true,
  });

  // Get unique districts for filter
  const districts = Array.from(new Set(constituencies.map(c => c.district))).sort();

  // Filter constituencies by selected district
  const filteredConstituencies = selectedDistrict && selectedDistrict !== "all"
    ? constituencies.filter(constituency => constituency.district === selectedDistrict)
    : constituencies;

  // Statistics based on filtered data
  const stats = {
    total: filteredConstituencies.length,
    active: filteredConstituencies.filter((c) => c.active).length,
    inactive: filteredConstituencies.filter((c) => !c.active).length,
    urban: filteredConstituencies.filter((c) => c.type === "Urban").length,
  };

  const handleToggleActive = (constituencyId: string) => {
    setConstituencies((prev) =>
      prev.map((c) => (c.id === constituencyId ? { ...c, active: !c.active } : c))
    );
  };

  const handleEditConstituency = () => {
    if (!selectedConstituency) return;
    setConstituencies((prev) =>
      prev.map((c) =>
        c.id === selectedConstituency.id
          ? {
              ...c,
              name: formData.name,
              district: formData.district,
              state: formData.state,
              type: formData.type,
              voters: parseInt(formData.voters) || undefined,
              mlaName: formData.mlaName || undefined,
              active: formData.active,
            }
          : c
      )
    );
    setIsEditDialogOpen(false);
    setSelectedConstituency(null);
    resetForm();
  };

  const openEditDialog = (constituency: Constituency) => {
    setSelectedConstituency(constituency);
    setFormData({
      name: constituency.name,
      district: constituency.district,
      state: constituency.state,
      type: constituency.type,
      voters: constituency.voters?.toString() || "",
      mlaName: constituency.mlaName || "",
      active: constituency.active,
    });
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (constituency: Constituency) => {
    setSelectedConstituency(constituency);
    setIsViewDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      district: "",
      state: "",
      type: "Urban",
      voters: "",
      mlaName: "",
      active: true,
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-2xl font-bold transition-colors"
            style={{ color: theme.textPrimary }}
          >
            Define Constituencies
          </h1>
          <p
            className="text-sm mt-1 transition-colors"
            style={{ color: theme.textSecondary }}
          >
            Manage constituencies and their electoral information
          </p>
        </div>

        <Link href="/admin/AddConstituency">
          <Button
            className="gap-2 transition-all duration-200 hover:scale-105 border-0"
            style={{
              background: theme.buttonPrimary.bg,
              color: theme.buttonPrimary.text,
            }}
          >
            <Plus className="h-4 w-4" />
            Add Constituency
          </Button>
        </Link>
      </div>

      {/* DISTRICT FILTER */}
      <div className="flex items-center gap-4">
        <Label style={{ color: theme.textPrimary }}>Filter by District:</Label>
        <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
          <SelectTrigger className="w-64" style={{
            backgroundColor: theme.input.bg,
            borderColor: theme.input.border,
            color: theme.input.text,
          }}>
            <SelectValue placeholder="All Districts" />
          </SelectTrigger>
          <SelectContent style={{
            backgroundColor: theme.cardBackground,
            borderColor: theme.cardBorder,
            color: theme.textPrimary,
          }}>
            <SelectItem value="all">All Districts</SelectItem>
            {districts.map((district) => (
              <SelectItem key={district} value={district}>
                {district}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* STATISTICS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Constituencies", value: stats.total, color: "#3b82f6" },
          { label: "Active", value: stats.active, color: "#10b981" },
          { label: "Inactive", value: stats.inactive, color: "#f59e0b" },
          { label: "Urban", value: stats.urban, color: "#8b5cf6" },
        ].map((stat, index) => (
          <Card
            key={index}
            className="transition-all duration-200 hover:shadow-lg border py-0"
            style={{
              backgroundColor: theme.cardBackground,
              borderColor: theme.cardBorder,
            }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-sm font-medium transition-colors"
                    style={{ color: theme.textSecondary }}
                  >
                    {stat.label}
                  </p>
                  <p
                    className="text-3xl font-bold mt-2 transition-colors"
                    style={{ color: theme.textPrimary }}
                  >
                    {stat.value}
                  </p>
                </div>
                <div
                  className="h-12 w-12 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: `${stat.color}20`,
                  }}
                >
                  <Map className="h-6 w-6" style={{ color: stat.color }} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CONSTITUENCY TABLE */}
      <ConstituencyTable
        data={filteredConstituencies}
        onEdit={openEditDialog}
        onView={openViewDialog}
        onToggleActive={handleToggleActive}
      />

      {/* EDIT CONSTITUENCY DIALOG */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent
          className="sm:max-w-[600px] border"
          style={{
            backgroundColor: theme.cardBackground,
            borderColor: theme.cardBorder,
          }}
        >
          <DialogHeader>
            <DialogTitle style={{ color: theme.textPrimary }}>
              Edit Constituency
            </DialogTitle>
            <DialogDescription style={{ color: theme.textSecondary }}>
              Update the constituency information
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name" style={{ color: theme.textPrimary }}>
                Constituency Name *
              </Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter constituency name"
                className="border"
                style={{
                  backgroundColor: theme.input.bg,
                  borderColor: theme.input.border,
                  color: theme.input.text,
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-district" style={{ color: theme.textPrimary }}>
                  District *
                </Label>
                <Input
                  id="edit-district"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  placeholder="Enter district"
                  className="border"
                  style={{
                    backgroundColor: theme.input.bg,
                    borderColor: theme.input.border,
                    color: theme.input.text,
                  }}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-state" style={{ color: theme.textPrimary }}>
                  State *
                </Label>
                <Select
                  value={formData.state}
                  onValueChange={(value) => setFormData({ ...formData, state: value })}
                >
                  <SelectTrigger
                    className="border"
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: theme.input.border,
                      color: theme.input.text,
                    }}
                  >
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      backgroundColor: theme.cardBackground,
                      borderColor: theme.cardBorder,
                      color: theme.textPrimary,
                    }}
                  >
                    {indianStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-type" style={{ color: theme.textPrimary }}>
                  Type *
                </Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value as any })}
                >
                  <SelectTrigger
                    className="border"
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: theme.input.border,
                      color: theme.input.text,
                    }}
                  >
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      backgroundColor: theme.cardBackground,
                      borderColor: theme.cardBorder,
                      color: theme.textPrimary,
                    }}
                  >
                    {constituencyTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-voters" style={{ color: theme.textPrimary }}>
                  Number of Voters
                </Label>
                <Input
                  id="edit-voters"
                  type="number"
                  value={formData.voters}
                  onChange={(e) => setFormData({ ...formData, voters: e.target.value })}
                  placeholder="e.g., 185000"
                  className="border"
                  style={{
                    backgroundColor: theme.input.bg,
                    borderColor: theme.input.border,
                    color: theme.input.text,
                  }}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-mlaName" style={{ color: theme.textPrimary }}>
                Current MLA Name
              </Label>
              <Input
                id="edit-mlaName"
                value={formData.mlaName}
                onChange={(e) => setFormData({ ...formData, mlaName: e.target.value })}
                placeholder="Enter MLA name"
                className="border"
                style={{
                  backgroundColor: theme.input.bg,
                  borderColor: theme.input.border,
                  color: theme.input.text,
                }}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="edit-active"
                checked={formData.active}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, active: checked })
                }
              />
              <Label htmlFor="edit-active" style={{ color: theme.textPrimary }}>
                Active Constituency
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false);
                setSelectedConstituency(null);
                resetForm();
              }}
              style={{
                borderColor: theme.buttonOutline.border,
                color: theme.buttonOutline.text,
                backgroundColor: "transparent",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditConstituency}
              disabled={!formData.name || !formData.district || !formData.state}
              className="border-0"
              style={{
                background: theme.buttonPrimary.bg,
                color: theme.buttonPrimary.text,
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* VIEW CONSTITUENCY DIALOG */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent
          className="sm:max-w-[500px] border"
          style={{
            backgroundColor: theme.cardBackground,
            borderColor: theme.cardBorder,
          }}
        >
          <DialogHeader>
            <DialogTitle style={{ color: theme.textPrimary }}>
              Constituency Details
            </DialogTitle>
            <DialogDescription style={{ color: theme.textSecondary }}>
              View complete information about this constituency
            </DialogDescription>
          </DialogHeader>

          {selectedConstituency && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                    Constituency Name
                  </Label>
                  <p className="mt-1 font-semibold" style={{ color: theme.textPrimary }}>
                    {selectedConstituency.name}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                    Type
                  </Label>
                  <p className="mt-1">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-md ${
                        selectedConstituency.type === "Urban"
                          ? "bg-blue-100 text-blue-800 border border-blue-300"
                          : selectedConstituency.type === "Rural"
                          ? "bg-green-100 text-green-800 border border-green-300"
                          : "bg-purple-100 text-purple-800 border border-purple-300"
                      }`}
                    >
                      {selectedConstituency.type}
                    </span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                    District
                  </Label>
                  <p className="mt-1 font-semibold" style={{ color: theme.textPrimary }}>
                    {selectedConstituency.district}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                    State
                  </Label>
                  <p className="mt-1 font-semibold" style={{ color: theme.textPrimary }}>
                    {selectedConstituency.state}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                    Number of Voters
                  </Label>
                  <p className="mt-1 font-semibold" style={{ color: theme.textPrimary }}>
                    {selectedConstituency.voters?.toLocaleString() || "—"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                    Status
                  </Label>
                  <p className="mt-1">
                    <span
                      className="inline-flex px-3 py-1 rounded-md text-sm font-medium"
                      style={{
                        backgroundColor: selectedConstituency.active ? "#10b981" : "#6b7280",
                        color: "#ffffff",
                      }}
                    >
                      {selectedConstituency.active ? "Active" : "Inactive"}
                    </span>
                  </p>
                </div>
              </div>

              <div className="grid gap-2">
                <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                  Current MLA
                </Label>
                <p className="mt-1 font-semibold" style={{ color: theme.textPrimary }}>
                  {selectedConstituency.mlaName || "—"}
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsViewDialogOpen(false);
                setSelectedConstituency(null);
              }}
              style={{
                borderColor: theme.buttonOutline.border,
                color: theme.buttonOutline.text,
                backgroundColor: "transparent",
              }}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}