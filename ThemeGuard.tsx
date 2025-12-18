"use client"

import { useThemeStore } from "@/store/useThemeStore"

export default function ThemeGuard({ children }: { children: React.ReactNode }) {
  const hydrated = useThemeStore((s) => s.hydrated)

  if (!hydrated) return null

  return <>{children}</>
}
