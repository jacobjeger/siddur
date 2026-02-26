import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import { HebrewDateHeader } from "../../src/components/common/HebrewDateHeader";
import { useHebrewDate } from "../../src/hooks/useHebrewDate";

export default function SiddurTab() {
  const { tefilaType } = useHebrewDate();

  const tefilaLabel =
    tefilaType === "shacharis"
      ? "Shacharis"
      : tefilaType === "mincha"
        ? "Mincha"
        : tefilaType === "maariv"
          ? "Maariv"
          : "Shacharis";

  return (
    <View className="flex-1 bg-white">
      <HebrewDateHeader />

      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-lg text-gray-600 mb-2">
          It's time for
        </Text>
        <Text className="text-3xl font-bold text-blue-700 mb-8">
          {tefilaLabel}
        </Text>

        <Pressable className="bg-blue-600 rounded-xl px-8 py-4 mb-4 w-full items-center active:bg-blue-700">
          <Text className="text-white text-lg font-semibold">
            Start Davening
          </Text>
        </Pressable>

        <Link href="/siddur/browse" asChild>
          <Pressable className="border border-gray-300 rounded-xl px-8 py-4 w-full items-center active:bg-gray-50">
            <Text className="text-gray-700 text-lg">
              Browse All Tefilos
            </Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}
