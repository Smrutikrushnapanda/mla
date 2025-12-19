// app/(roles)/admin-user/manage-projects/add/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Calendar,
  MapPin,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useThemeStore } from "@/store/useThemeStore";
import { toast } from "sonner";

export default function AddProjectPage() {
  const { theme } = useThemeStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    status: "Planning",
    area: "",
    budget: "",
    startDate: "",
    endDate: "",
    contractorName: "",
    contractorContact: "",
    projectManager: "",
    priority: "Medium",
    fundingSource: "",
    milestones: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    category: "",
    area: "",
    budget: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    if (errors[id as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      description: "",
      category: "",
      area: "",
      budget: "",
      startDate: "",
      endDate: "",
    };
    let isValid = true;

    if (!form.name || form.name.length < 3) {
      newErrors.name = "Project name must be at least 3 characters";
      isValid = false;
    }

    if (!form.description || form.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
      isValid = false;
    }

    if (!form.category) {
      newErrors.category = "Please select a category";
      isValid = false;
    }

    if (!form.area) {
      newErrors.area = "Please enter project area";
      isValid = false;
    }

    if (!form.budget || parseFloat(form.budget) <= 0) {
      newErrors.budget = "Please enter a valid budget";
      isValid = false;
    }

    if (!form.startDate) {
      newErrors.startDate = "Please select start date";
      isValid = false;
    }

    if (!form.endDate) {
      newErrors.endDate = "Please select end date";
      isValid = false;
    }

    if (form.startDate && form.endDate && form.startDate > form.endDate) {
      newErrors.endDate = "End date must be after start date";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create project payload
      const payload = {
        ...form,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        progress: 0,
        documents: [],
        assignedStaff: [],
      };

      console.log("Project Payload:", payload);
      toast.success("Project created successfully!");

      // Redirect to projects list
      window.location.href = "/admin-user/manage-projects";
    } catch (error) {
      toast.error("Failed to create project");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen p-6"
      style={{ background: theme.backgroundGradient }}
    >
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        {/* LEFT: ICON + TITLE */}
        <div className="flex items-center gap-3">
          <div
            className="p-2 rounded-lg"
            style={{ backgroundColor: "rgba(34, 197, 94, 0.1)" }}
          >
            <Building2 className="h-6 w-6 text-green-600" />
          </div>

          <div>
            <h1
              className="text-2xl font-bold"
              style={{ color: theme.textPrimary }}
            >
              Add New Project
            </h1>
            <p className="text-sm" style={{ color: theme.textSecondary }}>
              Create a new development project for your constituency
            </p>
          </div>
        </div>

        {/* RIGHT: BACK BUTTON */}
        <Link href="/admin/project-category">
          <Button
            className="flex items-center gap-2"
            style={{
              background: theme.buttonPrimary.bg,
              color: theme.buttonPrimary.text,
            }}
          >
            <ArrowLeft className="h-4 w-4" />
            BACK
          </Button>
        </Link>
      </div>

      {/* FORM CARD */}
      <Card
        className="max-w-6xl mx-auto border shadow-lg"
        style={{
          background: theme.cardBackground,
          borderColor: theme.border,
        }}
      >
        <CardHeader
          className="border-b"
          style={{
            backgroundColor: theme.backgroundSecondary,
            borderColor: theme.border,
          }}
        >
          <CardTitle
            className="flex items-center gap-2 text-lg"
            style={{ color: theme.textPrimary }}
          >
            <Building2 className="h-5 w-5 text-green-600" />
            Project Information
          </CardTitle>
          <p className="text-sm mt-1" style={{ color: theme.textSecondary }}>
            Fill in the details for the new development project
          </p>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* PROJECT BASIC INFO */}
            <div className="space-y-4">
              <h3
                className="text-sm font-semibold flex items-center gap-2"
                style={{ color: theme.textSecondary }}
              >
                <Building2 className="h-4 w-4" />
                Basic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" style={{ color: theme.textPrimary }}>
                    Project Name *
                  </Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g., New Highway Construction"
                    required
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: errors.name ? "#ef4444" : theme.input.border,
                      color: theme.input.text,
                    }}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label style={{ color: theme.textPrimary }}>Category *</Label>
                  <Select
                    onValueChange={(value) =>
                      setForm((prev) => ({ ...prev, category: value }))
                    }
                    required
                  >
                    <SelectTrigger
                      className="h-10 w-full"
                      style={{
                        backgroundColor: theme.input.bg,
                        borderColor: errors.category ? "#ef4444" : theme.input.border,
                        color: theme.input.text,
                      }}
                    >
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent
                      style={{
                        backgroundColor: theme.backgroundSecondary,
                        borderColor: theme.border,
                      }}
                    >
                      <SelectItem value="Infrastructure" style={{ color: theme.textPrimary }}>
                        Infrastructure
                      </SelectItem>
                      <SelectItem value="Education" style={{ color: theme.textPrimary }}>
                        Education
                      </SelectItem>
                      <SelectItem value="Healthcare" style={{ color: theme.textPrimary }}>
                        Healthcare
                      </SelectItem>
                      <SelectItem value="Agriculture" style={{ color: theme.textPrimary }}>
                        Agriculture
                      </SelectItem>
                      <SelectItem value="Water Supply" style={{ color: theme.textPrimary }}>
                        Water Supply
                      </SelectItem>
                      <SelectItem value="Environment" style={{ color: theme.textPrimary }}>
                        Environment
                      </SelectItem>
                      <SelectItem value="Transportation" style={{ color: theme.textPrimary }}>
                        Transportation
                      </SelectItem>
                      <SelectItem value="Housing" style={{ color: theme.textPrimary }}>
                        Housing
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-red-500">{errors.category}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  style={{ color: theme.textPrimary }}
                >
                  Description *
                </Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the project details, objectives, and scope..."
                  rows={4}
                  required
                  style={{
                    backgroundColor: theme.input.bg,
                    borderColor: errors.description
                      ? "#ef4444"
                      : theme.input.border,
                    color: theme.input.text,
                  }}
                />
                {errors.description && (
                  <p className="text-sm text-red-500">{errors.description}</p>
                )}
                <p className="text-xs" style={{ color: theme.textTertiary }}>
                  Provide detailed information about the project
                </p>
              </div>
            </div>

            {/* LOCATION & BUDGET */}
            <div
              className="space-y-4 pt-6 border-t"
              style={{ borderColor: theme.border }}
            >
              <h3
                className="text-sm font-semibold flex items-center gap-2"
                style={{ color: theme.textSecondary }}
              >
                <MapPin className="h-4 w-4" />
                Location & Budget
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="area" style={{ color: theme.textPrimary }}>
                    Area/Location *
                  </Label>
                  <Input
                    id="area"
                    value={form.area}
                    onChange={handleChange}
                    placeholder="e.g., North District, Ward 5"
                    required
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: errors.area ? "#ef4444" : theme.input.border,
                      color: theme.input.text,
                    }}
                  />
                  {errors.area && (
                    <p className="text-sm text-red-500">{errors.area}</p>
                  )}
                  <p className="text-xs" style={{ color: theme.textTertiary }}>
                    Specify the exact location or constituency area
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget" style={{ color: theme.textPrimary }}>
                    Budget (₹) *
                  </Label>
                  <Input
                    id="budget"
                    type="number"
                    value={form.budget}
                    onChange={handleChange}
                    placeholder="e.g., 5000000"
                    required
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: errors.budget
                        ? "#ef4444"
                        : theme.input.border,
                      color: theme.input.text,
                    }}
                  />
                  {errors.budget && (
                    <p className="text-sm text-red-500">{errors.budget}</p>
                  )}
                  <p className="text-xs" style={{ color: theme.textTertiary }}>
                    Total allocated budget for the project
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label style={{ color: theme.textPrimary }}>
                    Funding Source
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setForm((prev) => ({ ...prev, fundingSource: value }))
                    }
                  >
                    <SelectTrigger
                      className="h-10 w-full"
                      style={{
                        backgroundColor: theme.input.bg,
                        borderColor: theme.input.border,
                        color: theme.input.text,
                      }}
                    >
                      <SelectValue placeholder="Select funding source" />
                    </SelectTrigger>
                    <SelectContent
                      style={{
                        backgroundColor: theme.backgroundSecondary,
                        borderColor: theme.border,
                      }}
                    >
                      <SelectItem value="state_govt" style={{ color: theme.textPrimary }}>
                        State Government
                      </SelectItem>
                      <SelectItem value="central_govt" style={{ color: theme.textPrimary }}>
                        Central Government
                      </SelectItem>
                      <SelectItem value="local_funds" style={{ color: theme.textPrimary }}>
                        Local Funds
                      </SelectItem>
                      <SelectItem value="mla_funds" style={{ color: theme.textPrimary }}>
                        MLA Funds
                      </SelectItem>
                      <SelectItem value="private" style={{ color: theme.textPrimary }}>
                        Private Partnership
                      </SelectItem>
                      <SelectItem value="mixed" style={{ color: theme.textPrimary }}>
                        Mixed Funding
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label style={{ color: theme.textPrimary }}>
                    Priority Level
                  </Label>
                  <Select
                    value={form.priority}
                    onValueChange={(value) =>
                      setForm((prev) => ({ ...prev, priority: value }))
                    }
                  >
                    <SelectTrigger
                      className="h-10 w-full"
                      style={{
                        backgroundColor: theme.input.bg,
                        borderColor: theme.input.border,
                        color: theme.input.text,
                      }}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent
                      style={{
                        backgroundColor: theme.backgroundSecondary,
                        borderColor: theme.border,
                      }}
                    >
                      <SelectItem value="High" style={{ color: theme.textPrimary }}>
                        High Priority
                      </SelectItem>
                      <SelectItem value="Medium" style={{ color: theme.textPrimary }}>
                        Medium Priority
                      </SelectItem>
                      <SelectItem value="Low" style={{ color: theme.textPrimary }}>
                        Low Priority
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* TIMELINE */}
            <div
              className="space-y-4 pt-6 border-t"
              style={{ borderColor: theme.border }}
            >
              <h3
                className="text-sm font-semibold flex items-center gap-2"
                style={{ color: theme.textSecondary }}
              >
                <Calendar className="h-4 w-4" />
                Project Timeline
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="startDate"
                    style={{ color: theme.textPrimary }}
                  >
                    Start Date *
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={form.startDate}
                    onChange={handleChange}
                    required
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: errors.startDate
                        ? "#ef4444"
                        : theme.input.border,
                      color: theme.input.text,
                    }}
                  />
                  {errors.startDate && (
                    <p className="text-sm text-red-500">{errors.startDate}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate" style={{ color: theme.textPrimary }}>
                    End Date *
                  </Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={form.endDate}
                    onChange={handleChange}
                    required
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: errors.endDate
                        ? "#ef4444"
                        : theme.input.border,
                      color: theme.input.text,
                    }}
                  />
                  {errors.endDate && (
                    <p className="text-sm text-red-500">{errors.endDate}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="milestones"
                  style={{ color: theme.textPrimary }}
                >
                  Key Milestones (Optional)
                </Label>
                <Textarea
                  id="milestones"
                  value={form.milestones}
                  onChange={handleChange}
                  placeholder="List key project milestones with target dates..."
                  rows={3}
                  style={{
                    backgroundColor: theme.input.bg,
                    borderColor: theme.input.border,
                    color: theme.input.text,
                  }}
                />
                <p className="text-xs" style={{ color: theme.textTertiary }}>
                  Separate milestones with commas or bullet points
                </p>
              </div>
            </div>

            {/* PROJECT TEAM */}
            <div
              className="space-y-4 pt-6 border-t"
              style={{ borderColor: theme.border }}
            >
              <h3
                className="text-sm font-semibold"
                style={{ color: theme.textSecondary }}
              >
                Project Team & Status
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="projectManager"
                    style={{ color: theme.textPrimary }}
                  >
                    Project Manager
                  </Label>
                  <Input
                    id="projectManager"
                    value={form.projectManager}
                    onChange={handleChange}
                    placeholder="Name of project manager"
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: theme.input.border,
                      color: theme.input.text,
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label style={{ color: theme.textPrimary }}>Status *</Label>
                  <Select
                    value={form.status}
                    onValueChange={(value) =>
                      setForm((prev) => ({ ...prev, status: value }))
                    }
                  >
                    <SelectTrigger
                      className="h-10 w-full"
                      style={{
                        backgroundColor: theme.input.bg,
                        borderColor: theme.input.border,
                        color: theme.input.text,
                      }}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent
                      style={{
                        backgroundColor: theme.backgroundSecondary,
                        borderColor: theme.border,
                      }}
                    >
                      <SelectItem value="Planning" style={{ color: theme.textPrimary }}>
                        Planning
                      </SelectItem>
                      <SelectItem value="Approval Pending" style={{ color: theme.textPrimary }}>
                        Approval Pending
                      </SelectItem>
                      <SelectItem value="In Progress" style={{ color: theme.textPrimary }}>
                        In Progress
                      </SelectItem>
                      <SelectItem value="On Hold" style={{ color: theme.textPrimary }}>
                        On Hold
                      </SelectItem>
                      <SelectItem value="Completed" style={{ color: theme.textPrimary }}>
                        Completed
                      </SelectItem>
                      <SelectItem value="Cancelled" style={{ color: theme.textPrimary }}>
                        Cancelled
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="contractorName"
                    style={{ color: theme.textPrimary }}
                  >
                    Contractor Name
                  </Label>
                  <Input
                    id="contractorName"
                    value={form.contractorName}
                    onChange={handleChange}
                    placeholder="Contractor/Company name"
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: theme.input.border,
                      color: theme.input.text,
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="contractorContact"
                    style={{ color: theme.textPrimary }}
                  >
                    Contractor Contact
                  </Label>
                  <Input
                    id="contractorContact"
                    value={form.contractorContact}
                    onChange={handleChange}
                    placeholder="Contractor phone/email"
                    style={{
                      backgroundColor: theme.input.bg,
                      borderColor: theme.input.border,
                      color: theme.input.text,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div
              className="flex justify-between items-center pt-6 border-t"
              style={{ borderColor: theme.border }}
            >
              <p className="text-xs" style={{ color: theme.textTertiary }}>
                * Required fields must be filled
              </p>
              <div className="flex gap-3">
                <Link href="/admin-user/manage-projects">
                  <Button
                    variant="outline"
                    disabled={isSubmitting}
                    style={{
                      borderColor: theme.border,
                      color: theme.textPrimary,
                    }}
                  >
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    background: theme.buttonPrimary.bg,
                    color: theme.buttonPrimary.text,
                  }}
                >
                  {isSubmitting ? "Creating..." : "Create Project"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}