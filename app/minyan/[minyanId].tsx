import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function MinyanDetailScreen() {
  const { minyanId } = useLocalSearchParams<{ minyanId: string }>();

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-gray-800">
        Minyan: {minyanId}
      </Text>
      <Text className="text-gray-500 mt-2">
        Minyan details coming in Phase 5
      </Text>
    </View>
  );
}
