import { View, Text, ScrollView, Pressable, Switch } from "react-native";
import { useSettingsStore } from "../../src/stores/useSettingsStore";

type Nusach = "ashkenaz" | "sefard" | "edot_hamizrach" | "ari";

const NUSACH_OPTIONS: { value: Nusach; label: string }[] = [
  { value: "ashkenaz", label: "Ashkenaz" },
  { value: "sefard", label: "Sefard" },
  { value: "edot_hamizrach", label: "Edot HaMizrach" },
  { value: "ari", label: "Ari (Chabad)" },
];

const CANDLE_LIGHTING_OPTIONS = [18, 20, 22, 30, 40];

export default function SettingsTab() {
  const {
    nusach,
    textSize,
    showEnglish,
    darkMode,
    keepScreenOn,
    timeFormat,
    candleLightingOffset,
    setNusach,
    setTextSize,
    setShowEnglish,
    setDarkMode,
    setKeepScreenOn,
    setTimeFormat,
    setCandleLightingOffset,
  } = useSettingsStore();

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Nusach */}
      <View className="bg-white mt-4 mx-4 rounded-xl p-4">
        <Text className="text-lg font-bold text-gray-800 mb-3">Nusach</Text>
        <View className="flex-row flex-wrap gap-2">
          {NUSACH_OPTIONS.map((opt) => (
            <Pressable
              key={opt.value}
              onPress={() => setNusach(opt.value)}
              className={`px-4 py-2 rounded-lg border ${
                nusach === opt.value
                  ? "bg-blue-600 border-blue-600"
                  : "bg-white border-gray-300"
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  nusach === opt.value ? "text-white" : "text-gray-700"
                }`}
              >
                {opt.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Text Size */}
      <View className="bg-white mt-4 mx-4 rounded-xl p-4">
        <Text className="text-lg font-bold text-gray-800 mb-3">Text Size</Text>
        <View className="flex-row items-center justify-between">
          <Pressable
            onPress={() => setTextSize(Math.max(16, textSize - 2))}
            className="w-10 h-10 items-center justify-center bg-gray-100 rounded-lg active:bg-gray-200"
          >
            <Text className="text-lg font-bold text-gray-600">−</Text>
          </Pressable>
          <Text className="text-base font-semibold text-gray-800">
            {textSize}pt
          </Text>
          <Pressable
            onPress={() => setTextSize(Math.min(32, textSize + 2))}
            className="w-10 h-10 items-center justify-center bg-gray-100 rounded-lg active:bg-gray-200"
          >
            <Text className="text-lg font-bold text-gray-600">+</Text>
          </Pressable>
        </View>
      </View>

      {/* Toggles */}
      <View className="bg-white mt-4 mx-4 rounded-xl p-4">
        <SettingRow
          label="Show English Translation"
          value={showEnglish}
          onToggle={setShowEnglish}
        />
        <SettingRow
          label="Keep Screen On While Davening"
          value={keepScreenOn}
          onToggle={setKeepScreenOn}
        />
        <SettingRow
          label="24-Hour Time"
          value={timeFormat === "24h"}
          onToggle={(v) => setTimeFormat(v ? "24h" : "12h")}
        />
      </View>

      {/* Dark Mode */}
      <View className="bg-white mt-4 mx-4 rounded-xl p-4">
        <Text className="text-lg font-bold text-gray-800 mb-3">Dark Mode</Text>
        <View className="flex-row gap-2">
          {(["off", "on", "system"] as const).map((mode) => (
            <Pressable
              key={mode}
              onPress={() => setDarkMode(mode)}
              className={`px-4 py-2 rounded-lg border ${
                darkMode === mode
                  ? "bg-blue-600 border-blue-600"
                  : "bg-white border-gray-300"
              }`}
            >
              <Text
                className={`text-sm font-medium capitalize ${
                  darkMode === mode ? "text-white" : "text-gray-700"
                }`}
              >
                {mode}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Candle Lighting Offset */}
      <View className="bg-white mt-4 mx-4 rounded-xl p-4">
        <Text className="text-lg font-bold text-gray-800 mb-3">
          Candle Lighting
        </Text>
        <Text className="text-sm text-gray-500 mb-3">
          Minutes before shkia
        </Text>
        <View className="flex-row gap-2">
          {CANDLE_LIGHTING_OPTIONS.map((min) => (
            <Pressable
              key={min}
              onPress={() => setCandleLightingOffset(min)}
              className={`px-4 py-2 rounded-lg border ${
                candleLightingOffset === min
                  ? "bg-blue-600 border-blue-600"
                  : "bg-white border-gray-300"
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  candleLightingOffset === min ? "text-white" : "text-gray-700"
                }`}
              >
                {min}
                {min === 40 ? " (Jer.)" : ""}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* About */}
      <View className="bg-white mt-4 mx-4 mb-8 rounded-xl p-4">
        <Text className="text-lg font-bold text-gray-800 mb-2">About</Text>
        <Text className="text-sm text-gray-500">
          Texts provided by Sefaria (sefaria.org)
        </Text>
        <Text className="text-sm text-gray-500 mt-1">
          Zmanim powered by KosherJava/KosherZmanim
        </Text>
        <Text className="text-sm text-gray-500 mt-1">
          Minyan data from GoDaven.com
        </Text>
      </View>
    </ScrollView>
  );
}

function SettingRow({
  label,
  value,
  onToggle,
}: {
  label: string;
  value: boolean;
  onToggle: (v: boolean) => void;
}) {
  return (
    <View className="flex-row justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
      <Text className="text-base text-gray-700 flex-1">{label}</Text>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: "#d1d5db", true: "#93c5fd" }}
        thumbColor={value ? "#1a56db" : "#f4f3f4"}
      />
    </View>
  );
}
