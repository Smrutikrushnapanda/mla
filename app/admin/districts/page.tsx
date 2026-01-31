"use client";

import { useState } from "react";
import { Plus, MapPin } from "lucide-react";
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
import { DistrictTable } from "../../../components/admin-dashboard/district/tables/district-table";
import { District } from "../../../components/admin-dashboard/district/tables/columns";

const mockDistricts: District[] = [
  {
    id: "1",
    name: "Khordha",
    state: "Odisha",
    active: true,
    constituencies: 8,
    population: "2.25M",
    area: "2,813 km²",
  },
  {
    id: "2",
    name: "Cuttack",
    state: "Odisha",
    active: false,
    constituencies: 6,
    population: "2.62M",
    area: "3,932 km²",
  },
  {
    id: "3",
    name: "Puri",
    state: "Odisha",
    active: true,
    constituencies: 5,
    population: "1.70M",
    area: "3,479 km²",
  },
  {
    id: "4",
    name: "Ganjam",
    state: "Odisha",
    active: true,
    constituencies: 9,
    population: "3.53M",
    area: "8,206 km²",
  },
  {
    id: "5",
    name: "Balasore",
    state: "Odisha",
    active: false,
    constituencies: 7,
    population: "2.32M",
    area: "3,706 km²",
  },
  {
    id: "6",
    name: "Sambalpur",
    state: "Odisha",
    active: true,
    constituencies: 4,
    population: "1.04M",
    area: "6,657 km²",
  },
  {
    id: "7",
    name: "Mayurbhanj",
    state: "Odisha",
    active: true,
    constituencies: 8,
    population: "2.52M",
    area: "10,418 km²",
  },
  {
    id: "8",
    name: "Sundargarh",
    state: "Odisha",
    active: false,
    constituencies: 6,
    population: "2.09M",
    area: "9,712 km²",
  },
  {
    id: "9",
    name: "Kendrapara",
    state: "Odisha",
    active: true,
    constituencies: 5,
    population: "1.44M",
    area: "2,644 km²",
  },
  {
    id: "10",
    name: "Bhadrak",
    state: "Odisha",
    active: true,
    constituencies: 4,
    population: "1.51M",
    area: "2,505 km²",
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

export default function DistrictsPage() {
  const { theme } = useThemeStore();
  const [districts, setDistricts] = useState<District[]>(mockDistricts);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    state: "",
    constituencies: "",
    population: "",
    area: "",
    active: true,
  });

  // Statistics
  const stats = {
    total: districts.length,
    active: districts.filter((d) => d.active).length,
    inactive: districts.filter((d) => !d.active).length,
  };

  const handleToggleActive = (districtId: string) => {
    setDistricts((prev) =>
      prev.map((d) => (d.id === districtId ? { ...d, active: !d.active } : d))
    );
  };

  const handleEditDistrict = () => {
    if (!selectedDistrict) return;
    setDistricts((prev) =>
      prev.map((d) =>
        d.id === selectedDistrict.id
          ? {
              ...d,
              name: formData.name,
              state: formData.state,
              constituencies: parseInt(formData.constituencies) || 0,
              population: formData.population,
              area: formData.area,
              active: formData.active,
            }
          : d
      )
    );
    setIsEditDialogOpen(false);
    setSelectedDistrict(null);
    resetForm();
  };

  const openEditDialog = (district: District) => {
    setSelectedDistrict(district);
    setFormData({
      name: district.name,
      state: district.state,
      constituencies: district.constituencies.toString(),
      population: district.population || "",
      area: district.area || "",
      active: district.active,
    });
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (district: District) => {
    setSelectedDistrict(district);
    setIsViewDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      state: "",
      constituencies: "",
      population: "",
      area: "",
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
            Define Districts
          </h1>
          <p
            className="text-sm mt-1 transition-colors"
            style={{ color: theme.textSecondary }}
          >
            Manage districts used for constituency & citizen mapping
          </p>
        </div>

        <div className="flex gap-3">
          <Link href="/admin/AddState">
            <Button
              className="gap-2 transition-all duration-200 hover:scale-105 border-0"
              variant="outline"
              style={{
                borderColor: theme.buttonPrimary.bg,
                color: theme.buttonPrimary.bg,
                backgroundColor: "transparent",
              }}
            >
              <Plus className="h-4 w-4" />
              Add State
            </Button>
          </Link>
          <Link href="/admin/AddDistrict">
            <Button
              className="gap-2 transition-all duration-200 hover:scale-105 border-0"
              style={{
                background: theme.buttonPrimary.bg,
                color: theme.buttonPrimary.text,
              }}
            >
              <Plus className="h-4 w-4" />
              Add District
            </Button>
          </Link>
        </div>
      </div>

      {/* STATISTICS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Districts", value: stats.total, color: "#3b82f6" },
          { label: "Active", value: stats.active, color: "#10b981" },
          { label: "Inactive", value: stats.inactive, color: "#f59e0b" },
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
                  <MapPin className="h-6 w-6" style={{ color: stat.color }} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* DISTRICT TABLE */}
      <DistrictTable
        data={districts}
        onEdit={openEditDialog}
        onView={openViewDialog}
        onToggleActive={handleToggleActive}
      />

      {/* EDIT DISTRICT DIALOG */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent
          className="sm:max-w-[500px] border"
          style={{
            backgroundColor: theme.cardBackground,
            borderColor: theme.cardBorder,
          }}
        >
          <DialogHeader>
            <DialogTitle style={{ color: theme.textPrimary }}>
              Edit District
            </DialogTitle>
            <DialogDescription style={{ color: theme.textSecondary }}>
              Update the district information
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name" style={{ color: theme.textPrimary }}>
                District Name *
              </Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter district name"
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

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-constituencies" style={{ color: theme.textPrimary }}>
                  Constituencies
                </Label>
                <Input
                  id="edit-constituencies"
                  type="number"
                  value={formData.constituencies}
                  onChange={(e) =>
                    setFormData({ ...formData, constituencies: e.target.value })
                  }
                  placeholder="0"
                  className="border"
                  style={{
                    backgroundColor: theme.input.bg,
                    borderColor: theme.input.border,
                    color: theme.input.text,
                  }}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-population" style={{ color: theme.textPrimary }}>
                  Population
                </Label>
                <Input
                  id="edit-population"
                  value={formData.population}
                  onChange={(e) =>
                    setFormData({ ...formData, population: e.target.value })
                  }
                  placeholder="e.g., 2.25M"
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
              <Label htmlFor="edit-area" style={{ color: theme.textPrimary }}>
                Area
              </Label>
              <Input
                id="edit-area"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                placeholder="e.g., 2,813 km²"
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
                Active District
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false);
                setSelectedDistrict(null);
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
              onClick={handleEditDistrict}
              disabled={!formData.name || !formData.state}
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

      {/* VIEW DISTRICT DIALOG */}
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
              District Details
            </DialogTitle>
            <DialogDescription style={{ color: theme.textSecondary }}>
              View complete information about this district
            </DialogDescription>
          </DialogHeader>

          {selectedDistrict && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                    District Name
                  </Label>
                  <p className="mt-1 font-semibold" style={{ color: theme.textPrimary }}>
                    {selectedDistrict.name}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                    State
                  </Label>
                  <p className="mt-1 font-semibold" style={{ color: theme.textPrimary }}>
                    {selectedDistrict.state}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                    Constituencies
                  </Label>
                  <p className="mt-1 font-semibold" style={{ color: theme.textPrimary }}>
                    {selectedDistrict.constituencies}
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
                        backgroundColor: selectedDistrict.active ? "#10b981" : "#6b7280",
                        color: "#ffffff",
                      }}
                    >
                      {selectedDistrict.active ? "Active" : "Inactive"}
                    </span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                    Population
                  </Label>
                  <p className="mt-1 font-semibold" style={{ color: theme.textPrimary }}>
                    {selectedDistrict.population || "—"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                    Area
                  </Label>
                  <p className="mt-1 font-semibold" style={{ color: theme.textPrimary }}>
                    {selectedDistrict.area || "—"}
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsViewDialogOpen(false);
                setSelectedDistrict(null);
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