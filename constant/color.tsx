// colors.ts
export const lightTheme = {
  name: "light",
  
  // Backgrounds
  background: "#ffffff",
  backgroundSecondary: "#f8fafc",
  backgroundTertiary: "#f1f5f9",
  backgroundGradient: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)",
  danger: "#f43f5e",
  success:"#4ade80",

  // Cards & Surfaces
  cardBackground: "#ffffff",
  cardBorder: "#e2e8f0",
  cardBg: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)",
  
  // Text
  textPrimary: "#0f172a",
  textSecondary: "#475569",
  textTertiary: "#64748b",
  textHighlight: "#1e3a8a",
  
  // Accents & Highlights
  accentGradient: "linear-gradient(135deg, #eff6ff, #dbeafe)",
  highlight: "#3b82f6",
  highlightSecondary: "#60a5fa",
  
  // Sidebar specific
  sidebarHover: "#e0f2fe",
  sidebarSubmenuHover: "#dbeafe",
  
  // Borders & Dividers
  border: "#e2e8f0",
  borderSecondary: "#cbd5e1",
  
  // Effects
  shadow: "rgba(0, 0, 0, 0.08)",
  blob1: "rgba(147, 197, 253, 0.2)",
  blob2: "rgba(96, 165, 250, 0.15)",
  
  // Special
  shoeColor: "#ffffff",
  footerBg: "linear-gradient(to right, #f0f9ff, #e2e8f0)",
  
  // Buttons
  buttonPrimary: {
    bg: "linear-gradient(135deg, #1e40af, #3b82f6)",
    hover: "linear-gradient(135deg, #1e3a8a, #2563eb)",
    text: "#ffffff",
  },
  buttonOutline: {
    border: "#3b82f6",
    text: "#1e40af",
    hoverBg: "#3b82f6",
    hoverText: "#ffffff",
  },
  
  // Inputs
  input: {
    bg: "#f8fafc",           // Changed from #f8fafc to white for better contrast
    border: "#e2e8f0",       // Changed from #cbd5e1 to match border color
    focusBorder: "#3b82f6",
    text: "#0f172a",
    placeholder: "#94a3b8",  // Light gray for placeholder text
  },
};

export const darkTheme = {
  name: "dark",
  
  // Backgrounds
  background: "#0f172a",
  backgroundSecondary: "#1e293b",
  backgroundTertiary: "#334155",
  backgroundGradient: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #1e3a8a 100%)",
  danger: "#f43f5e",
  success: "#255F38",

  // Cards & Surfaces
  cardBackground: "#1e293b",
  cardBorder: "#334155",
  cardBg: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
  
  // Text
  textPrimary: "#f8fafc",
  textSecondary: "#cbd5e1",
  textTertiary: "#94a3b8",
  textHighlight: "#93c5fd",
  
  // Accents & Highlights
  accentGradient: "linear-gradient(135deg, #1e293b, #334155)",
  highlight: "#60a5fa",
  highlightSecondary: "#3b82f6",
  
  // Sidebar specific
  sidebarHover: "#334155",
  sidebarSubmenuHover: "#2d3a4d",
  
  // Borders & Dividers
  border: "#334155",
  borderSecondary: "#cbd5e1",
  
  // Effects
  shadow: "rgba(0, 0, 0, 0.5)",
  blob1: "rgba(59, 130, 246, 0.15)",
  blob2: "rgba(37, 99, 235, 0.1)",
  
  // Special
  shoeColor: "#93c5fd",
  footerBg: "linear-gradient(to right, #0f172a, #1e293b)",
  
  // Buttons
  buttonPrimary: {
    bg: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
    hover: "linear-gradient(135deg, #2563eb, #60a5fa)",
    text: "#ffffff",
  },
  buttonOutline: {
    border: "#60a5fa",
    text: "#e0f2fe",
    hoverBg: "#60a5fa",
    hoverText: "#0f172a",
  },
  
  // Inputs
  input: {
    bg: "#0f172a",           // Changed from #1e293b to darker background for better contrast
    border: "#334155",       // Kept the same for consistency
    focusBorder: "#60a5fa",
    text: "#f8fafc",
    placeholder: "#64748b",  // Medium gray for placeholder text (darker than light theme)
  },
};

export type ThemeType = typeof lightTheme;

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};