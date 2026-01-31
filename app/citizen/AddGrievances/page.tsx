// app/(roles)/admin-user/manage-projects/add/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeft, Building2 } from "lucide-react";
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

export default function AddGrievancePage() {
  const { theme } = useThemeStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ✅ UPDATED DATA MODEL */
  const [form, setForm] = useState({
    userName: "",
    mobileNumber: "",
    email: "",
    title: "",
    description: "",
    category: "", // OPTIONAL
    constituency: "",
    address: "",
    image: null as File | null,
  });

  const [errors, setErrors] = useState<any>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    setErrors((prev: any) => ({ ...prev, [id]: "" }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const validateForm = () => {
    const newErrors: any = {};
    let valid = true;

    if (!form.userName) {
      newErrors.userName = "Citizen name is required";
      valid = false;
    }

    if (!form.mobileNumber || form.mobileNumber.length < 10) {
      newErrors.mobileNumber = "Valid mobile number required";
      valid = false;
    }

    if (!form.title) {
      newErrors.title = "Grievance title is required";
      valid = false;
    }

    if (!form.description || form.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
      valid = false;
    }

    if (!form.constituency) {
      newErrors.constituency = "Constituency is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...form,
        grievanceNumber: `GRV-${Date.now()}`,
        status: "Open",
        createdAt: new Date().toISOString(),
      };

      console.log("Grievance Payload:", payload);

      await new Promise((r) => setTimeout(r, 1000));

      toast.success("Grievance submitted successfully");
      window.location.href = "/citizen/grievances";
    } catch {
      toast.error("Failed to submit grievance");
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
        <div className="flex items-center gap-3">
          <div
            className="p-2 rounded-lg"
            style={{ backgroundColor: theme.backgroundSecondary }}
          >
            <Building2 className="h-6 w-6" style={{ color: theme.textPrimary }} />
          </div>

          <div>
            <h1
              className="text-2xl font-bold"
              style={{ color: theme.textPrimary }}
            >
              Add New Grievance
            </h1>
            <p className="text-sm" style={{ color: theme.textSecondary }}>
              Submit a grievance for resolution
            </p>
          </div>
        </div>

        <Link href="/citizen/grievances">
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
            <Building2 className="h-5 w-5" />
            Grievance Information
          </CardTitle>
          <p className="text-sm mt-1" style={{ color: theme.textSecondary }}>
            Fill in the details to submit a grievance
          </p>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* BASIC INFO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label style={{ color: theme.textPrimary }}>
                  Citizen Name *
                </Label>
                <Input
                  id="userName"
                  value={form.userName}
                  onChange={handleChange}
                  style={{
                    backgroundColor: theme.input.bg,
                    borderColor: errors.userName ? "#ef4444" : theme.input.border,
                    color: theme.input.text,
                  }}
                />
                {errors.userName && (
                  <p className="text-sm text-red-500">{errors.userName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label style={{ color: theme.textPrimary }}>
                  Mobile Number *
                </Label>
                <Input
                  id="mobileNumber"
                  value={form.mobileNumber}
                  onChange={handleChange}
                  style={{
                    backgroundColor: theme.input.bg,
                    borderColor: errors.mobileNumber ? "#ef4444" : theme.input.border,
                    color: theme.input.text,
                  }}
                />
                {errors.mobileNumber && (
                  <p className="text-sm text-red-500">{errors.mobileNumber}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label style={{ color: theme.textPrimary }}>
                Email (Optional)
              </Label>
              <Input
                id="email"
                value={form.email}
                onChange={handleChange}
                style={{
                  backgroundColor: theme.input.bg,
                  borderColor: theme.input.border,
                  color: theme.input.text,
                }}
              />
            </div>

            <div className="space-y-2">
              <Label style={{ color: theme.textPrimary }}>
                Grievance Title *
              </Label>
              <Input
                id="title"
                value={form.title}
                onChange={handleChange}
                style={{
                  backgroundColor: theme.input.bg,
                  borderColor: errors.title ? "#ef4444" : theme.input.border,
                  color: theme.input.text,
                }}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label style={{ color: theme.textPrimary }}>
                Grievance Description *
              </Label>
              <Textarea
                id="description"
                rows={4}
                value={form.description}
                onChange={handleChange}
                style={{
                  backgroundColor: theme.input.bg,
                  borderColor: errors.description ? "#ef4444" : theme.input.border,
                  color: theme.input.text,
                }}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description}</p>
              )}
            </div>

            {/* 📸 IMAGE UPLOAD */}
            <div className="space-y-2">
              <Label style={{ color: theme.textPrimary }}>
                Upload Picture (Optional)
              </Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{
                  backgroundColor: theme.input.bg,
                  borderColor: theme.input.border,
                  color: theme.input.text,
                }}
              />
            </div>

            {/* CATEGORY (OPTIONAL) */}
            <div className="space-y-2">
              <Label style={{ color: theme.textPrimary }}>
                Grievance Category (Optional)
              </Label>
              <Select
                onValueChange={(value) =>
                  setForm((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger
                  style={{
                    backgroundColor: theme.input.bg,
                    borderColor: theme.input.border,
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
                  <SelectItem value="Road">Road</SelectItem>
                  <SelectItem value="Water">Water</SelectItem>
                  <SelectItem value="Electricity">Electricity</SelectItem>
                  <SelectItem value="Sanitation">Sanitation</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* CONSTITUENCY */}
            <div className="space-y-2">
              <Label style={{ color: theme.textPrimary }}>
                Constituency *
              </Label>
              {/* CONSTITUENCY */}
<div className="space-y-2">

  <Select
    value={form.constituency}
    onValueChange={(value) => {
      setForm((prev) => ({ ...prev, constituency: value }));
      setErrors((prev: any) => ({ ...prev, constituency: "" }));
    }}
  >
    <SelectTrigger
      style={{
        backgroundColor: theme.input.bg,
        borderColor: errors.constituency ? "#ef4444" : theme.input.border,
        color: theme.input.text,
      }}
    >
      <SelectValue placeholder="Select constituency" />
    </SelectTrigger>

    <SelectContent
      style={{
        backgroundColor: theme.backgroundSecondary,
        borderColor: theme.border,
      }}
    >
      {/* For now only one */}
      <SelectItem value="Korei">
        Korei
      </SelectItem>
    </SelectContent>
  </Select>

  {errors.constituency && (
    <p className="text-sm text-red-500">{errors.constituency}</p>
  )}
</div>

              {errors.constituency && (
                <p className="text-sm text-red-500">{errors.constituency}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label style={{ color: theme.textPrimary }}>
                Address / Landmark
              </Label>
              <Textarea
                id="address"
                value={form.address}
                onChange={handleChange}
                style={{
                  backgroundColor: theme.input.bg,
                  borderColor: theme.input.border,
                  color: theme.input.text,
                }}
              />
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
                <Link href="/citizen/grievances">
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
                  {isSubmitting ? "Submitting..." : "Submit Grievance"}
                </Button>
              </div>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}
