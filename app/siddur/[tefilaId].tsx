import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { getTefilaById } from "../../src/data/prayers";
import { getTextForNusach } from "../../src/data/types";
import { useSettingsStore } from "../../src/stores/useSettingsStore";

export default function TefilaScreen() {
  const { tefilaId } = useLocalSearchParams<{ tefilaId: string }>();
  const { nusach, textSize, showEnglish } = useSettingsStore();

  const tefila = getTefilaById(tefilaId ?? "");

  if (!tefila) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-xl font-bold text-gray-800">
          Tefila not found
        </Text>
        <Text className="text-gray-500 mt-2">
          Could not find prayer: {tefilaId}
        </Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: tefila.name,
          headerBackTitle: "Back",
        }}
      />
      <ScrollView className="flex-1 bg-white">
        {/* Title */}
        <View className="items-center pt-6 pb-4 border-b border-gray-100 mx-4">
          <Text
            className="text-2xl text-blue-900"
            style={{ fontFamily: "NotoSerifHebrew-Bold", fontSize: textSize + 4 }}
          >
            {tefila.nameHe}
          </Text>
          <Text className="text-base text-gray-500 mt-1">{tefila.name}</Text>
        </View>

        {/* Sections */}
        {tefila.sections.map((section, index) => {
          const showSectionHeader =
            tefila.sections.length > 1 || section.title !== tefila.name;

          return (
          <View
            key={section.id}
            className={`px-4 py-5 ${
              index < tefila.sections.length - 1
                ? "border-b border-gray-100"
                : ""
            }`}
          >
            {/* Section title - hidden when same as tefila name for single-section tefilos */}
            {showSectionHeader && (
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-sm font-bold text-blue-700 uppercase tracking-wide">
                {section.title}
              </Text>
              <Text
                className="text-sm text-blue-400"
                style={{ fontFamily: "NotoSerifHebrew-Bold" }}
              >
                {section.titleHe}
              </Text>
            </View>
            )}

            {/* Instruction */}
            {section.instruction && (
              <View className="bg-amber-50 rounded-lg px-3 py-2 mb-3 border border-amber-200">
                <Text className="text-sm text-amber-800 italic">
                  {section.instruction}
                </Text>
              </View>
            )}

            {/* Hebrew text */}
            <Text
              className="text-gray-900 leading-loose"
              style={{
                fontFamily: "NotoSerifHebrew-Regular",
                fontSize: textSize,
                lineHeight: textSize * 1.8,
                writingDirection: "rtl",
                textAlign: "right",
              }}
            >
              {getTextForNusach(section.text, nusach)}
            </Text>

            {/* English translation */}
            {showEnglish && section.translation && (
              <View className="mt-4 pt-3 border-t border-gray-100">
                <Text
                  className="text-gray-600 leading-relaxed"
                  style={{ fontSize: textSize - 4 }}
                >
                  {getTextForNusach(section.translation, nusach)}
                </Text>
              </View>
            )}
          </View>
          );
        })}

        <View className="h-12" />
      </ScrollView>
    </>
  );
}
