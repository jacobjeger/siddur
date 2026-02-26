import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { HebrewDateHeader } from "../../src/components/common/HebrewDateHeader";
import { LocationDisplay } from "../../src/components/common/LocationDisplay";
import { useZmanim } from "../../src/hooks/useZmanim";
import { useNextZman } from "../../src/hooks/useNextZman";
import { useLocationStore } from "../../src/stores/useLocationStore";
import { useSettingsStore } from "../../src/stores/useSettingsStore";
import { ZMAN_NAMES } from "../../src/utils/constants";
import { formatZmanTime, formatCountdown } from "../../src/utils/timeFormatting";

export default function ZmanimTab() {
  const { zmanim, loading } = useZmanim();
  const { nextZman, countdown } = useNextZman();
  const { location } = useLocationStore();
  const timeFormat = useSettingsStore((s) => s.timeFormat);

  if (loading || !zmanim) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#1a56db" />
        <Text className="text-gray-500 mt-4">Loading zmanim...</Text>
      </View>
    );
  }

  const zmanimEntries = Object.entries(zmanim).filter(
    ([_, value]) => value != null
  ) as [string, Date][];

  return (
    <View className="flex-1 bg-white">
      <HebrewDateHeader />
      <LocationDisplay />

      {nextZman && (
        <View className="mx-4 mt-2 mb-2 bg-blue-50 rounded-xl p-4 border border-blue-200">
          <Text className="text-sm text-blue-600 font-medium">Next Zman</Text>
          <Text className="text-xl font-bold text-blue-800 mt-1">
            {ZMAN_NAMES[nextZman.key]?.en ?? nextZman.key}
          </Text>
          <View className="flex-row justify-between items-center mt-2">
            <Text className="text-lg text-blue-700">
              {formatZmanTime(nextZman.time, timeFormat)}
            </Text>
            <Text className="text-lg font-semibold text-blue-600">
              {formatCountdown(countdown)}
            </Text>
          </View>
        </View>
      )}

      <ScrollView className="flex-1 px-4 pt-2">
        {zmanimEntries.map(([key, time]) => (
          <View
            key={key}
            className="flex-row justify-between items-center py-3 border-b border-gray-100"
          >
            <View>
              <Text className="text-base font-medium text-gray-800">
                {ZMAN_NAMES[key]?.en ?? key}
              </Text>
              <Text className="text-sm text-gray-500 font-hebrew">
                {ZMAN_NAMES[key]?.he ?? ""}
              </Text>
            </View>
            <Text className="text-base font-semibold text-gray-700">
              {formatZmanTime(time, timeFormat)}
            </Text>
          </View>
        ))}
        <View className="h-8" />
      </ScrollView>
    </View>
  );
}
