import { View, Text, Pressable, ScrollView } from "react-native";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { HebrewDateHeader } from "../../src/components/common/HebrewDateHeader";
import { useHebrewDate } from "../../src/hooks/useHebrewDate";
import { useNextZman } from "../../src/hooks/useNextZman";
import { useSettingsStore } from "../../src/stores/useSettingsStore";
import { getTefilosForTime } from "../../src/data/prayers";
import { ZMAN_NAMES } from "../../src/utils/constants";
import { formatZmanTime, formatCountdown } from "../../src/utils/timeFormatting";

const TEFILA_LABELS: Record<string, { en: string; he: string }> = {
  shacharis: { en: "Shacharis", he: "שחרית" },
  mincha: { en: "Mincha", he: "מנחה" },
  maariv: { en: "Maariv", he: "מעריב" },
  none: { en: "Shacharis", he: "שחרית" },
};

export default function SiddurTab() {
  const { tefilaType } = useHebrewDate();
  const { nextZman, countdown } = useNextZman();
  const timeFormat = useSettingsStore((s) => s.timeFormat);
  const router = useRouter();

  const current = TEFILA_LABELS[tefilaType] ?? TEFILA_LABELS.shacharis;
  const tefilosForTime = getTefilosForTime(
    tefilaType === "none" ? "shacharis" : tefilaType
  );

  const firstTefilaId = tefilosForTime[0]?.id;

  return (
    <View className="flex-1 bg-white">
      <HebrewDateHeader />

      <ScrollView className="flex-1" contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 32 }}>
        {/* Current tefila card */}
        <View className="bg-blue-50 rounded-2xl p-5 border border-blue-200 mb-4">
          <Text className="text-sm text-blue-600 font-medium">
            It's time for
          </Text>
          <View className="flex-row items-baseline mt-1 mb-3">
            <Text className="text-3xl font-bold text-blue-800">
              {current.en}
            </Text>
            <Text
              className="text-xl text-blue-400 ml-3"
              style={{ fontFamily: "NotoSerifHebrew-Bold" }}
            >
              {current.he}
            </Text>
          </View>

          {nextZman && (
            <View className="flex-row justify-between items-center bg-white rounded-lg px-3 py-2 mb-4">
              <Text className="text-sm text-gray-600">
                {ZMAN_NAMES[nextZman.key]?.en ?? nextZman.key}
              </Text>
              <View className="flex-row items-center">
                <Text className="text-sm font-medium text-gray-700 mr-2">
                  {formatZmanTime(nextZman.time, timeFormat)}
                </Text>
                <Text className="text-sm font-bold text-blue-600">
                  {formatCountdown(countdown)}
                </Text>
              </View>
            </View>
          )}

          <Pressable
            onPress={() => {
              if (firstTefilaId) router.push(`/siddur/${firstTefilaId}`);
            }}
            className="bg-blue-600 rounded-xl py-4 items-center active:bg-blue-700"
          >
            <Text className="text-white text-lg font-semibold">
              Start Davening
            </Text>
          </Pressable>
        </View>

        {/* Quick access tefilos for current time */}
        {tefilosForTime.length > 0 && (
          <View className="mb-4">
            <Text className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2 px-1">
              {current.en} Tefilos
            </Text>
            <View className="bg-gray-50 rounded-xl overflow-hidden">
              {tefilosForTime.map((tefila, index) => (
                <Link
                  key={tefila.id}
                  href={`/siddur/${tefila.id}`}
                  asChild
                >
                  <Pressable
                    className={`flex-row items-center justify-between px-4 py-3 active:bg-gray-100 ${
                      index < tefilosForTime.length - 1
                        ? "border-b border-gray-200"
                        : ""
                    }`}
                  >
                    <View className="flex-1">
                      <Text className="text-base font-medium text-gray-800">
                        {tefila.name}
                      </Text>
                      <Text
                        className="text-sm text-gray-500"
                        style={{ fontFamily: "NotoSerifHebrew-Regular" }}
                      >
                        {tefila.nameHe}
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
                  </Pressable>
                </Link>
              ))}
            </View>
          </View>
        )}

        {/* Browse all */}
        <Link href="/siddur/browse" asChild>
          <Pressable className="border border-gray-300 rounded-xl px-6 py-4 items-center active:bg-gray-50 flex-row justify-center">
            <Ionicons name="book-outline" size={20} color="#374151" />
            <Text className="text-gray-700 text-lg ml-2">
              Browse All Tefilos
            </Text>
          </Pressable>
        </Link>
      </ScrollView>
    </View>
  );
}
