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
  background: "#faf6ef",
  surface: "#fff9f0",
  surfaceSecondary: "#f3ece0",
  text: "#2c1810",
  textSecondary: "#5c4033",
  textMuted: "#8b7355",
  border: "#d4c5a9",
  primary: "#1b3a4b",
  primaryLight: "#e8d5b7",
  primaryDark: "#0f2634",
  accent: "#b8860b",
  tabBarBg: "#f5efe4",
  tabBarBorder: "#d4c5a9",
  headerBg: "#1b3a4b",
};

const darkTheme: ThemeColors = {
  background: "#1a1612",
  surface: "#2a2420",
  surfaceSecondary: "#3a322c",
  text: "#e8dcc8",
  textSecondary: "#c4b89a",
  textMuted: "#8b7d6b",
  border: "#3d352e",
  primary: "#c4a265",
  primaryLight: "#2d2520",
  primaryDark: "#d4b87a",
  accent: "#d4a843",
  tabBarBg: "#221e1a",
  tabBarBorder: "#3d352e",
  headerBg: "#1a1612",
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
