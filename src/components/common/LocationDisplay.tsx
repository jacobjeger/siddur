import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocationStore } from "../../stores/useLocationStore";

export function LocationDisplay() {
  const { location, loading } = useLocationStore();

  return (
    <View className="flex-row items-center justify-center px-4 py-2 bg-gray-50">
      <Ionicons name="location" size={14} color="#6b7280" />
      <Text className="text-gray-500 text-sm ml-1">
        {loading ? "Getting location..." : location?.name ?? "Unknown Location"}
      </Text>
    </View>
  );
}
