import { useColorScheme } from "react-native";
import { useSettingsStore } from "../stores/useSettingsStore";

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceSecondary: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  primary: string;
  primaryLight: string;
  primaryDark: string;
  accent: string;
  tabBarBg: string;
  tabBarBorder: string;
  headerBg: string;
}

const lightTheme: ThemeColors = {
  background: "#ffffff",
  surface: "#ffffff",
  surfaceSecondary: "#f9fafb",
  text: "#1f2937",
  textSecondary: "#6b7280",
  textMuted: "#9ca3af",
  border: "#e5e7eb",
  primary: "#1a56db",
  primaryLight: "#eff6ff",
  primaryDark: "#1e3a5f",
  accent: "#eab308",
  tabBarBg: "#ffffff",
  tabBarBorder: "#e5e7eb",
  headerBg: "#f9fafb",
};

const darkTheme: ThemeColors = {
  background: "#111827",
  surface: "#1f2937",
  surfaceSecondary: "#374151",
  text: "#f9fafb",
  textSecondary: "#d1d5db",
  textMuted: "#9ca3af",
  border: "#374151",
  primary: "#60a5fa",
  primaryLight: "#1e3a5f",
  primaryDark: "#93c5fd",
  accent: "#fbbf24",
  tabBarBg: "#1f2937",
  tabBarBorder: "#374151",
  headerBg: "#1f2937",
};

export function useTheme() {
  const systemScheme = useColorScheme();
  const darkMode = useSettingsStore((s) => s.darkMode);

  const isDark =
    darkMode === "on" || (darkMode === "system" && systemScheme === "dark");

  return {
    isDark,
    colors: isDark ? darkTheme : lightTheme,
  };
}
