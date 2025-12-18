// useThemeStore.ts
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { lightTheme, darkTheme, type ThemeType } from "../constant/color"

type ThemeMode = "light" | "dark"

interface ThemeStore {
  mode: ThemeMode
  theme: ThemeType
  hydrated: boolean
  toggleTheme: () => void
  setTheme: (mode: ThemeMode) => void
  setHydrated: () => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      mode: "light",
      theme: lightTheme,
      hydrated: false,

      toggleTheme: () =>
        set((state) => {
          const newMode = state.mode === "light" ? "dark" : "light"
          return {
            mode: newMode,
            theme: newMode === "light" ? lightTheme : darkTheme,
          }
        }),

      setTheme: (mode) =>
        set({
          mode,
          theme: mode === "light" ? lightTheme : darkTheme,
        }),

      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "theme-storage",
      partialize: (state) => ({ mode: state.mode }),

      onRehydrateStorage: () => (state) => {
        if (!state) return
        state.setTheme(state.mode)
        state.setHydrated() 
      },
    }
  )
)
