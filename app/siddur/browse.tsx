import { View, Text, ScrollView, Pressable } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TEFILA_CATEGORIES } from "../../src/data/categories";
import { getTefilosByCategory } from "../../src/data/prayers";

export default function BrowseTefilosScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      {TEFILA_CATEGORIES.map((category) => {
        const tefilos = getTefilosByCategory(category.id);
        if (tefilos.length === 0) return null;

        return (
          <View key={category.id} className="mt-4">
            <View className="flex-row items-center px-4 mb-2">
              <Ionicons
                name={category.icon as any}
                size={20}
                color="#1a56db"
              />
              <Text className="text-lg font-bold text-gray-800 ml-2">
                {category.name}
              </Text>
              <Text
                className="text-lg text-gray-400 ml-2"
                style={{ fontFamily: "NotoSerifHebrew-Bold" }}
              >
                {category.nameHe}
              </Text>
            </View>

            <View className="bg-white mx-4 rounded-xl overflow-hidden">
              {tefilos.map((tefila, index) => (
                <Link
                  key={tefila.id}
                  href={`/siddur/${tefila.id}`}
                  asChild
                >
                  <Pressable
                    className={`flex-row items-center justify-between px-4 py-3 active:bg-gray-50 ${
                      index < tefilos.length - 1
                        ? "border-b border-gray-100"
                        : ""
                    }`}
                  >
                    <View className="flex-1">
                      <Text className="text-base font-medium text-gray-800">
                        {tefila.name}
                      </Text>
                      <Text
                        className="text-sm text-gray-500 mt-0.5"
                        style={{ fontFamily: "NotoSerifHebrew-Regular" }}
                      >
                        {tefila.nameHe}
                      </Text>
                    </View>
                    <Ionicons
                      name="chevron-forward"
                      size={18}
                      color="#9ca3af"
                    />
                  </Pressable>
                </Link>
              ))}
            </View>
          </View>
        );
      })}
      <View className="h-8" />
    </ScrollView>
  );
}
