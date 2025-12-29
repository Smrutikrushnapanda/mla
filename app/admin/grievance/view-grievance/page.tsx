"use client";

import { useState } from "react";
import React from "react";
import {
    ArrowLeft,
    FileText,
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Building2,
    Flag,
    CheckCircle,
    Clock,
    AlertCircle,
    XCircle,
    Download,
    Share2,
    Printer,
    Edit,
    Users,
    MessageSquare,
} from "lucide-react";
import { useThemeStore } from "@/store/useThemeStore";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

// Mock grievance data (in real app, would fetch by ID)
const mockGrievance = {
    id: "1",
    ticketId: "GRV-2024-001",
    subject: "Street Light Not Working",
    description:
        "The street light near my house has been non-functional for the past week. It's causing safety issues at night. Multiple residents have complained about this issue. We need immediate attention as this is affecting the safety of our neighborhood, especially for women and children returning home late.",
    category: "Infrastructure",
    department: "Public Works Department",
    priority: "High",
    status: "In Progress",
    citizenName: "Ramesh Kumar",
    citizenPhone: "+91-9876543210",
    citizenEmail: "ramesh.k@email.com",
    location: "Gandhi Nagar, Ward 5",
    constituency: "Bhubaneswar Central",
    submittedDate: new Date("2024-12-15"),
    assignedTo: "PWD Engineer - Bhubaneswar",
    assignedDate: new Date("2024-12-16"),
    remarks: "Work order issued. Electrician team assigned.",

    // Timeline data
    timeline: [
        {
            status: "Submitted",
            date: new Date("2024-12-15T10:30:00"),
            description: "Grievance submitted by citizen",
            actor: "Ramesh Kumar",
            completed: true,
        },
        {
            status: "Acknowledged",
            date: new Date("2024-12-15T14:45:00"),
            description: "Grievance received and verified by department",
            actor: "System",
            completed: true,
        },
        {
            status: "Assigned",
            date: new Date("2024-12-16T09:15:00"),
            description: "Assigned to PWD Engineer - Bhubaneswar",
            actor: "Admin Officer",
            completed: true,
        },
        {
            status: "In Progress",
            date: new Date("2024-12-18T11:00:00"),
            description: "Work order issued. Electrician team dispatched to site",
            actor: "PWD Engineer",
            completed: true,
            remarks: "Site inspection completed. Parts ordered for repair.",
        },
        {
            status: "Under Review",
            date: new Date("2024-12-20T15:30:00"),
            description: "Quality check and verification in progress",
            actor: "Quality Team",
            completed: false,
            estimated: true,
        },
        {
            status: "Resolved",
            date: null,
            description: "Issue resolved and verified",
            actor: "Department",
            completed: false,
            estimated: false,
        },
    ],

    // Additional updates/comments
    updates: [
        {
            date: new Date("2024-12-18T11:00:00"),
            user: "PWD Engineer",
            message: "Site inspection completed. Faulty transformer identified. Replacement parts have been ordered.",
        },
        {
            date: new Date("2024-12-19T16:30:00"),
            user: "PWD Supervisor",
            message: "Parts received. Repair work scheduled for tomorrow morning.",
        },
        {
            date: new Date("2024-12-20T10:15:00"),
            user: "Electrician Team",
            message: "Repair work started. Expected completion by evening.",
        },
    ],
};

export default function ViewGrievancePage() {
    const { theme, mode } = useThemeStore();
    const isDarkMode = mode === "dark";
    const router = useRouter();
    const [grievance] = useState(mockGrievance);

    const getStatusIcon = (status: string, completed: boolean) => {
        if (completed) {
            return CheckCircle;
        }

        switch (status) {
            case "Submitted":
                return FileText;
            case "Acknowledged":
                return CheckCircle;
            case "Assigned":
                return Users;
            case "In Progress":
                return Clock;
            case "Under Review":
                return AlertCircle;
            case "Resolved":
                // When not completed yet, show a neutral/in-progress icon
                return Clock;
            case "Rejected":
                return XCircle;
            default:
                return Clock;
        }
    };

    const getStatusColor = (status: string, completed: boolean) => {
        if (completed) {
            return "#10b981"; // green
        }

        switch (status) {
            case "In Progress":
            case "Under Review":
                return "#3b82f6"; // blue
            case "Resolved":
                // Use blue when resolution is pending (not completed)
                return "#3b82f6"; // blue
            case "Rejected":
                return "#ef4444"; // red
            default:
                return "#9ca3af"; // gray
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "Critical":
                return "#dc2626";
            case "High":
                return "#ef4444";
            case "Medium":
                return "#f59e0b";
            case "Low":
                return "#10b981";
            default:
                return "#6b7280";
        }
    };

    const getStatusBadgeColor = (status: string) => {
        switch (status) {
            case "Resolved":
                return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
            case "In Progress":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
            case "Pending":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
            case "Rejected":
                return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
        }
    };

    const formatDate = (date: Date | null) => {
        if (!date) return "Pending";
        const options: Intl.DateTimeFormatOptions = {
            day: "2-digit",
            month: "short",
            year: "numeric",
        };
        return new Date(date).toLocaleDateString("en-GB", options);
    };

    const formatDateTime = (date: Date | null) => {
        if (!date) return "Pending";
        const dateOptions: Intl.DateTimeFormatOptions = {
            day: "2-digit",
            month: "short",
            year: "numeric",
        };
        const timeOptions: Intl.DateTimeFormatOptions = {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        };
        const dateStr = new Date(date).toLocaleDateString("en-GB", dateOptions);
        const timeStr = new Date(date).toLocaleTimeString("en-US", timeOptions);
        return `${dateStr} at ${timeStr}`;
    };

    const handlePrint = () => window.print();
    const handleDownload = () => alert("Downloading grievance details...");
    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied!");
    };

    return (
        <div
            className="min-h-screen p-4 md:p-6 space-y-6 print:p-0"
            style={{ background: theme.backgroundGradient }}
        >
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 print:hidden">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <Button
                        variant="outline"
                        onClick={() => router.back()}
                        style={{
                            borderColor: theme.border,
                            color: isDarkMode ? "#fff" : "#000",
                            cursor: "pointer",
                        }}
                    >
                        <ArrowLeft
                            className="h-4 w-4 mr-2"
                            style={{ color: isDarkMode ? "#fff" : "#000" }}
                        />
                        Back
                    </Button>

                    <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                            <div
                                className="p-2 rounded-lg w-fit"
                                style={{ backgroundColor: theme.primary + "20" }}
                            >
                                <FileText
                                    className="h-6 w-6"
                                    style={{ color: isDarkMode ? "white" : "black" }}
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h1
                                    className="text-xl sm:text-2xl font-bold line-clamp-2"
                                    style={{ color: theme.textPrimary }}
                                >
                                    {grievance.subject}
                                </h1>
                                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1">
                                    <p
                                        className="text-xs sm:text-sm font-mono whitespace-nowrap"
                                        style={{ color: theme.textSecondary }}
                                    >
                                        {grievance.ticketId}
                                    </p>
                                    <Badge className={getStatusBadgeColor(grievance.status)}>
                                        {grievance.status}
                                    </Badge>
                                    <Badge
                                        style={{
                                            backgroundColor: getPriorityColor(grievance.priority),
                                            color: "#ffffff",
                                        }}
                                    >
                                        {grievance.priority} Priority
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 md:self-start">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handlePrint}
                        style={{
                            borderColor: theme.border,
                            color: isDarkMode ? "#fff" : "#000",
                            cursor: "pointer",
                        }}
                    >
                        <Printer
                            className="h-4 w-4 mr-2"
                            style={{ color: isDarkMode ? "#fff" : "#000" }}
                        />
                        Print
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDownload}
                        style={{
                            borderColor: theme.border,
                            color: isDarkMode ? "#fff" : "#000",
                            cursor: "pointer",
                        }}
                    >
                        <Download
                            className="h-4 w-4 mr-2"
                            style={{ color: isDarkMode ? "#fff" : "#000" }}
                        />
                        Export
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleShare}
                        style={{
                            borderColor: theme.border,
                            color: isDarkMode ? "#fff" : "#000",
                            cursor: "pointer",
                        }}
                    >
                        <Share2
                            className="h-4 w-4 mr-2"
                            style={{ color: isDarkMode ? "#fff" : "#000" }}
                        />
                        Share
                    </Button>
                    <Button
                        size="sm"
                        style={{
                            backgroundColor: theme.primary,
                            color: "white",
                            cursor: "pointer",
                        }}
                    >
                        <Edit className="h-4 w-4 mr-2" style={{ color: "white" }} />
                        Update Status
                    </Button>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* LEFT COLUMN - Timeline */}
                <div className="lg:col-span-2 space-y-6">
                    {/* TIMELINE CARD */}
                    <Card
                        style={{
                            background: theme.cardBackground,
                            borderColor: theme.border,
                        }}
                    >
                        <CardHeader>
                            <CardTitle style={{ color: theme.textPrimary }}>
                                Tracking Timeline
                            </CardTitle>
                            <CardDescription style={{ color: theme.textSecondary }}>
                                Real-time status updates and progress tracking
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="relative">
                                {grievance.timeline.map((item, index) => {
                                    const Icon = getStatusIcon(item.status, item.completed);
                                    const statusColor = getStatusColor(item.status, item.completed);
                                    const isLast = index === grievance.timeline.length - 1;

                                    return (
                                        <div key={index} className="relative pb-8 last:pb-0">
                                            {/* Connecting Line */}
                                            {!isLast && (
                                                <div
                                                    className="absolute left-5 top-10 w-0.5 h-full -ml-px"
                                                    style={{
                                                        backgroundColor: item.completed
                                                            ? statusColor
                                                            : theme.border,
                                                    }}
                                                />
                                            )}

                                            {/* Timeline Item */}
                                            <div className="relative flex items-start gap-4">
                                                {/* Icon Circle */}
                                                <div
                                                    className="flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0 z-10"
                                                    style={{
                                                        backgroundColor: item.completed
                                                            ? statusColor
                                                            : theme.cardBackground,
                                                        borderWidth: item.completed ? "0" : "2px",
                                                        borderColor: statusColor,
                                                        boxShadow: `0 0 0 4px ${theme.cardBackground}`,
                                                    }}
                                                >
                                                    <Icon
                                                        className="h-5 w-5"
                                                        style={{
                                                            color: item.completed ? "#ffffff" : statusColor,
                                                        }}
                                                    />
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 min-w-0 pt-0.5">
                                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-1">
                                                        <h3
                                                            className="font-semibold text-base"
                                                            style={{
                                                                color: item.completed
                                                                    ? theme.textPrimary
                                                                    : theme.textSecondary,
                                                            }}
                                                        >
                                                            {item.status}
                                                            {item.estimated && (
                                                                <span
                                                                    className="text-xs ml-2 font-normal"
                                                                    style={{ color: theme.textSecondary }}
                                                                >
                                                                    (Estimated)
                                                                </span>
                                                            )}
                                                        </h3>
                                                        {item.date && (
                                                            <p
                                                                className="text-sm whitespace-nowrap"
                                                                style={{ color: theme.textSecondary }}
                                                            >
                                                                {formatDateTime(item.date)}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <p
                                                        className="text-sm mb-1"
                                                        style={{ color: theme.textSecondary }}
                                                    >
                                                        {item.description}
                                                    </p>
                                                    <p
                                                        className="text-xs"
                                                        style={{ color: theme.textSecondary }}
                                                    >
                                                        By: {item.actor}
                                                    </p>
                                                    {item.remarks && (
                                                        <div
                                                            className="mt-2 p-3 rounded-md text-sm"
                                                            style={{
                                                                backgroundColor: theme.backgroundSecondary,
                                                                color: theme.textPrimary,
                                                            }}
                                                        >
                                                            <strong>Remarks:</strong> {item.remarks}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    {/* UPDATES/COMMENTS */}
                    <Card
                        style={{
                            background: theme.cardBackground,
                            borderColor: theme.border,
                        }}
                    >
                        <CardHeader>
                            <CardTitle style={{ color: theme.textPrimary }}>
                                Updates & Comments
                            </CardTitle>
                            <CardDescription style={{ color: theme.textSecondary }}>
                                Communication log and progress updates
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {grievance.updates.map((update, index) => (
                                    <div
                                        key={index}
                                        className="p-4 rounded-lg border"
                                        style={{
                                            borderColor: theme.border,
                                            backgroundColor: theme.backgroundSecondary,
                                        }}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div
                                                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                                                style={{ backgroundColor: theme.primary + "20" }}
                                            >
                                                <MessageSquare
                                                    className="h-4 w-4"
                                                    style={{ color: theme.primary }}
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                                                    <p
                                                        className="font-medium text-sm"
                                                        style={{ color: theme.textPrimary }}
                                                    >
                                                        {update.user}
                                                    </p>
                                                    <p
                                                        className="text-xs"
                                                        style={{ color: theme.textSecondary }}
                                                    >
                                                        {formatDateTime(update.date)}
                                                    </p>
                                                </div>
                                                <p
                                                    className="text-sm"
                                                    style={{ color: theme.textSecondary }}
                                                >
                                                    {update.message}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* RIGHT COLUMN - Details */}
                <div className="space-y-6">
                    {/* GRIEVANCE DETAILS */}
                    <Card
                        style={{
                            background: theme.cardBackground,
                            borderColor: theme.border,
                        }}
                    >
                        <CardHeader>
                            <CardTitle style={{ color: theme.textPrimary }}>
                                Grievance Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p
                                    className="text-sm mb-2"
                                    style={{ color: theme.textSecondary }}
                                >
                                    Description
                                </p>
                                <p style={{ color: theme.textPrimary }} className="text-sm leading-relaxed">
                                    {grievance.description}
                                </p>
                            </div>

                            <Separator />

                            <InfoItem
                                label="Category"
                                value={grievance.category}
                                icon={<FileText className="h-4 w-4" />}
                            />
                            <InfoItem
                                label="Department"
                                value={grievance.department}
                                icon={<Building2 className="h-4 w-4" />}
                            />
                            <InfoItem
                                label="Location"
                                value={grievance.location}
                                icon={<MapPin className="h-4 w-4" />}
                            />
                            <InfoItem
                                label="Constituency"
                                value={grievance.constituency}
                                icon={<Flag className="h-4 w-4" />}
                            />
                            <InfoItem
                                label="Submitted Date"
                                value={formatDate(grievance.submittedDate)}
                                icon={<Calendar className="h-4 w-4" />}
                            />
                            {grievance.assignedTo && (
                                <InfoItem
                                    label="Assigned To"
                                    value={grievance.assignedTo}
                                    icon={<Users className="h-4 w-4" />}
                                />
                            )}
                        </CardContent>
                    </Card>

                    {/* CITIZEN INFORMATION */}
                    <Card
                        style={{
                            background: theme.cardBackground,
                            borderColor: theme.border,
                        }}
                    >
                        <CardHeader>
                            <CardTitle style={{ color: theme.textPrimary }}>
                                Citizen Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <InfoItem
                                label="Name"
                                value={grievance.citizenName}
                                icon={<User className="h-4 w-4" />}
                            />
                            <InfoItem
                                label="Phone"
                                value={grievance.citizenPhone}
                                icon={<Phone className="h-4 w-4" />}
                            />
                            {grievance.citizenEmail && (
                                <InfoItem
                                    label="Email"
                                    value={grievance.citizenEmail}
                                    icon={<Mail className="h-4 w-4" />}
                                />
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

/* ---------- HELPER COMPONENTS ---------- */

function InfoItem({
    label,
    value,
    icon,
}: {
    label: string;
    value: string;
    icon: React.ReactNode;
}) {
    const { theme } = useThemeStore();

    return (
        <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
                <div style={{ color: theme.textSecondary }} className="flex-shrink-0">
                    {React.cloneElement(icon as React.ReactElement<any>, {
                        style: { color: theme.textSecondary },
                    })}
                </div>
                <span className="text-sm" style={{ color: theme.textSecondary }}>
                    {label}
                </span>
            </div>
            <span
                style={{ color: theme.textPrimary }}
                className="font-medium text-sm text-right break-words"
            >
                {value}
            </span>
        </div>
    );
}
