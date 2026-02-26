import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MinyanomTab() {
  return (
    <View className="flex-1 bg-white items-center justify-center px-6">
      <Ionicons name="people" size={64} color="#9ca3af" />
      <Text className="text-2xl font-bold text-gray-700 mt-4">
        Minyan Finder
      </Text>
      <Text className="text-base text-gray-500 mt-2 text-center">
        Find nearby minyanim powered by GoDaven.
      </Text>
      <Text className="text-sm text-gray-400 mt-4">Coming soon</Text>
    </View>
  );
}
