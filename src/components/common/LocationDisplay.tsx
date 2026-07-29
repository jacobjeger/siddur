import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useLocationStore } from "../../stores/useLocationStore";
import { useTheme } from "../../hooks/useTheme";
import { Focusable } from "./Focusable";

import { typeScale } from "../../theme/tokens";
export function LocationDisplay() {
  const { location, loading } = useLocationStore();
  const { colors } = useTheme();
  const router = useRouter();

  const isFallback = location?.source === "fallback";

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 16,
          paddingVertical: 8,
          backgroundColor: colors.surfaceSecondary,
        }}
      >
        <Ionicons
          name={location?.source === "manual" ? "pin" : "location"}
          size={14}
          color={colors.textMuted}
        />
        <Text
          style={{ color: colors.textSecondary, fontSize: typeScale.caption, marginLeft: 4 }}
        >
          {loading
            ? "Getting location..."
            : location?.name ?? "Unknown Location"}
        </Text>
      </View>

      {/*
        Previously a denied permission silently substituted New York and the
        UI presented it as real, so zmanim could be wrong with no indication.
      */}
      {isFallback && (
        <Focusable
          onPress={() => router.push("/(tabs)/settings")}
          accessibilityRole="button"
          accessibilityLabel="Using a default location. Tap to set your location."
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: colors.primaryLight,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Ionicons name="warning-outline" size={15} color={colors.primary} />
          <Text
            style={{
              color: colors.text,
              fontSize: typeScale.caption,
              marginLeft: 6,
              flex: 1,
            }}
          >
            Using a default location — zmanim may be wrong. Tap to set your
            location.
          </Text>
          <Ionicons name="chevron-forward" size={14} color={colors.textMuted} />
        </Focusable>
      )}
    </View>
  );
}
