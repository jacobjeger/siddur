import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { getTefilaById } from "../../src/data/prayers";
import { getTextForNusach } from "../../src/data/types";
import { useSettingsStore } from "../../src/stores/useSettingsStore";
import { useTheme } from "../../src/hooks/useTheme";

export default function TefilaScreen() {
  const { tefilaId } = useLocalSearchParams<{ tefilaId: string }>();
  const { nusach, textSize, showEnglish, keepScreenOn } = useSettingsStore();
  const { colors } = useTheme();

  const tefila = getTefilaById(tefilaId ?? "");

  if (!tefila) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.background }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: colors.text }}>
          Tefila not found
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
          headerStyle: { backgroundColor: colors.headerBg },
          headerTintColor: "#ffffff",
        }}
      />
      <ScrollView
        style={{ flex: 1, backgroundColor: colors.background }}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {/* Title banner */}
        <View
          style={{
            alignItems: "center",
            paddingVertical: 24,
            paddingHorizontal: 20,
            backgroundColor: colors.surface,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
          }}
        >
          <Text
            style={{
              fontFamily: "NotoSerifHebrew-Bold",
              fontSize: textSize + 6,
              color: colors.primary,
            }}
          >
            {tefila.nameHe}
          </Text>
          <Text style={{ fontSize: 15, color: colors.textSecondary, marginTop: 6 }}>
            {tefila.name}
          </Text>
        </View>

        {/* Prayer sections */}
        {tefila.sections.map((section, index) => {
          const showSectionHeader =
            tefila.sections.length > 1 || section.title !== tefila.name;

          return (
            <View
              key={section.id}
              style={{
                paddingHorizontal: 20,
                paddingTop: 24,
                paddingBottom: 20,
                borderBottomWidth: index < tefila.sections.length - 1 ? 1 : 0,
                borderBottomColor: colors.border,
              }}
            >
              {showSectionHeader && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 16,
                    paddingBottom: 8,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "700",
                      color: colors.accent,
                    }}
                  >
                    {section.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: colors.accent,
                      fontFamily: "NotoSerifHebrew-Bold",
                    }}
                  >
                    {section.titleHe}
                  </Text>
                </View>
              )}

              {section.instruction && (
                <View
                  style={{
                    backgroundColor: colors.surfaceSecondary,
                    borderRadius: 8,
                    paddingHorizontal: 14,
                    paddingVertical: 10,
                    marginBottom: 16,
                  }}
                >
                  <Text style={{ fontSize: 14, color: colors.textSecondary, fontStyle: "italic" }}>
                    {section.instruction}
                  </Text>
                </View>
              )}

              <Text
                style={{
                  fontFamily: "NotoSerifHebrew-Regular",
                  fontSize: textSize,
                  lineHeight: textSize * 2,
                  color: colors.text,
                  writingDirection: "rtl",
                  textAlign: "right",
                }}
              >
                {getTextForNusach(section.text, nusach)}
              </Text>

              {showEnglish && section.translation && (
                <View
                  style={{
                    marginTop: 20,
                    paddingTop: 16,
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                  }}
                >
                  <Text
                    style={{
                      color: colors.textSecondary,
                      lineHeight: (textSize - 2) * 1.7,
                      fontSize: textSize - 2,
                    }}
                  >
                    {getTextForNusach(section.translation, nusach)}
                  </Text>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </>
  );
}
