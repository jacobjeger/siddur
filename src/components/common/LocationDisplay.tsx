import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocationStore } from "../../stores/useLocationStore";
import { useTheme } from "../../hooks/useTheme";

export function LocationDisplay() {
  const { location, loading } = useLocationStore();
  const { colors } = useTheme();

  return (
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
      <Ionicons name="location" size={14} color={colors.textMuted} />
      <Text style={{ color: colors.textSecondary, fontSize: 13, marginLeft: 4 }}>
        {loading ? "Getting location..." : location?.name ?? "Unknown Location"}
      </Text>
    </View>
  );
}
