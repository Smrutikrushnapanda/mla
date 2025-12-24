"use client";

import { useRouter } from "next/navigation";
import {
  Shield,
  Users,
  User,
  Building2,
} from "lucide-react";

export default function Page() {
  const router = useRouter();

  const roles = [
    {
      id: "admin",
      title: "Admin",
      description: "System administration & configuration",
      icon: Shield,
      path: "/admin/dashboard",
    },
    {
      id: "mla",
      title: "MLA",
      description: "Constituency monitoring & reports",
      icon: Building2,
      path: "/mla/dashboard",
    },
    {
      id: "staff",
      title: "Staff",
      description: "Daily operations & grievance handling",
      icon: Users,
      path: "/staff/dashboard",
    },
    {
      id: "citizen",
      title: "Citizen",
      description: "Raise grievances & track status",
      icon: User,
      path: "/citizen/dashboard",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="w-full max-w-4xl">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-800">
            MLA Connect Portal
          </h1>
          <p className="text-slate-600 mt-2">
            Select your role to continue
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <button
                key={role.id}
                onClick={() => router.push(role.path)}
                className="group rounded-xl border bg-white p-8 text-left shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 focus:outline-none"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-blue-600 text-white group-hover:bg-blue-700 transition">
                    <Icon size={26} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-800">
                      {role.title}
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">
                      {role.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
