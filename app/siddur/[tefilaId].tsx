import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function TefilaScreen() {
  const { tefilaId } = useLocalSearchParams<{ tefilaId: string }>();

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-gray-800">
        Tefila: {tefilaId}
      </Text>
      <Text className="text-gray-500 mt-2">Prayer text coming in Phase 2</Text>
    </View>
  );
}
