// app/(protected)/mla/project-category/page.tsx
"use client";

import { ProjectCategoryTable } from "@/components/mla-dashboard/project-category/table/project-category-table";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus } from "lucide-react";
import { useState } from "react";
import { useThemeStore } from "@/store/useThemeStore";
import Link from "next/link";

export default function ProjectCategoryPage() {
  const { theme } = useThemeStore();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-3xl font-bold"
            style={{ color: theme.textPrimary }}
          >
            Project Category Management
          </h1>
          <p className="mt-1" style={{ color: theme.textSecondary }}>
            Manage and organize project categories for Korei Constituency
          </p>
        </div>

        <Link href="/mla/AddProject">
          <Button
            className="flex items-center gap-2"
            style={{
              background: theme.buttonPrimary.bg,
              color: theme.buttonPrimary.text,
            }}
          >
            <ArrowRight className="mr-2 h-4 w-4" />
            Add
          </Button>
        </Link>
      </div>

      <ProjectCategoryTable />
    </div>
  );
}
