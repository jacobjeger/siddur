import { View, Text, Pressable, ScrollView, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LocationDisplay } from "../../src/components/common/LocationDisplay";

const SAMPLE_MINYANIM = [
  {
    id: "1",
    name: "Young Israel",
    type: "Shacharis",
    time: "6:45 AM",
    nusach: "Ashkenaz",
    distance: "0.3 mi",
  },
  {
    id: "2",
    name: "Chabad House",
    type: "Shacharis",
    time: "7:30 AM",
    nusach: "Ari",
    distance: "0.8 mi",
  },
  {
    id: "3",
    name: "Sephardic Center",
    type: "Mincha/Maariv",
    time: "5:15 PM",
    nusach: "Edot HaMizrach",
    distance: "1.2 mi",
  },
  {
    id: "4",
    name: "Beis Medrash",
    type: "Maariv",
    time: "9:00 PM",
    nusach: "Ashkenaz",
    distance: "0.5 mi",
  },
];

export default function MinyanomTab() {
  return (
    <View className="flex-1 bg-gray-50">
      <LocationDisplay />

      <ScrollView className="flex-1">
        {/* Info banner */}
        <View className="mx-4 mt-4 bg-blue-50 rounded-xl p-4 border border-blue-200">
          <View className="flex-row items-center mb-2">
            <Ionicons name="information-circle" size={20} color="#1a56db" />
            <Text className="text-sm font-bold text-blue-800 ml-2">
              Minyan Finder Preview
            </Text>
          </View>
          <Text className="text-sm text-blue-700">
            Live minyan data from GoDaven integration is coming soon.
            Below is a preview of the experience.
          </Text>
        </View>

        {/* Sample minyanim */}
        <View className="mx-4 mt-4">
          <Text className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2 px-1">
            Nearby Minyanim
          </Text>
          <View className="bg-white rounded-xl overflow-hidden">
            {SAMPLE_MINYANIM.map((minyan, index) => (
              <View
                key={minyan.id}
                className={`px-4 py-3 ${
                  index < SAMPLE_MINYANIM.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                <View className="flex-row justify-between items-start">
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-gray-800">
                      {minyan.name}
                    </Text>
                    <View className="flex-row items-center mt-1">
                      <View className="bg-blue-100 rounded px-2 py-0.5 mr-2">
                        <Text className="text-xs font-medium text-blue-700">
                          {minyan.type}
                        </Text>
                      </View>
                      <Text className="text-xs text-gray-500">
                        {minyan.nusach}
                      </Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className="text-base font-bold text-gray-700">
                      {minyan.time}
                    </Text>
                    <Text className="text-xs text-gray-400 mt-1">
                      {minyan.distance}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* GoDaven link */}
        <View className="mx-4 mt-4 mb-8">
          <Pressable
            onPress={() => Linking.openURL("https://www.godaven.com")}
            className="border border-gray-300 rounded-xl px-6 py-4 items-center active:bg-gray-50 flex-row justify-center"
          >
            <Ionicons name="globe-outline" size={20} color="#374151" />
            <Text className="text-gray-700 text-base ml-2">
              Find Minyanim on GoDaven.com
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
