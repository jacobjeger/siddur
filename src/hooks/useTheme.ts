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
  /**
   * Foreground for text/icons sitting ON primary or accent.
   *
   * Not always white: the dark theme's primary (#c4a265) and accent (#d4a843)
   * are light golds, so white-on-gold lands around 2.1–2.4:1 — well under the
   * 4.5:1 minimum. Every selected chip and the main CTA were unreadable in dark
   * mode because they hardcoded #ffffff.
   */
  onPrimary: string;
  onAccent: string;
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
  onPrimary: "#ffffff",
  onAccent: "#ffffff",
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
  // Dark on light gold, not white — see ThemeColors.onPrimary.
  onPrimary: "#1a1612",
  onAccent: "#1a1612",
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
