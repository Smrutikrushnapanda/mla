// app/mla/layout.tsx
"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { MLASidebar } from "@/components/mla-dashboard/layout/sidebar";
import Header from "@/components/mla-dashboard/layout/header";
import { useThemeStore } from "@/store/useThemeStore";
import { useEffect } from "react";

export default function MLALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, hydrated } = useThemeStore();

  // Wait for hydration to prevent flash of wrong theme
  useEffect(() => {
    if (hydrated) {
      document.documentElement.style.setProperty(
        "--background",
        theme.background
      );
      document.documentElement.style.setProperty(
        "--foreground",
        theme.foreground
      );
      // Add other CSS variables as needed
    }
  }, [theme, hydrated]);

  // Optionally show loading state while hydrating
  if (!hydrated) {
    return null; // or a loading spinner
  }

  return (
    <SidebarProvider>
      <div
        className="flex min-h-screen w-full overflow-x-hidden"
        style={{
          backgroundColor: theme.background,
          color: theme.foreground,
        }}
      >
        <MLASidebar />

        <div className="flex flex-1 flex-col overflow-x-hidden">
          <Header />

          <main
            className="flex-1 p-6 overflow-x-hidden"
            style={{ backgroundColor: theme.muted || theme.background }}
          >
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}