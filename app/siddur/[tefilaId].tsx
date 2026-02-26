import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { getTefilaById } from "../../src/data/prayers";
import { getTextForNusach } from "../../src/data/types";
import { useSettingsStore } from "../../src/stores/useSettingsStore";
import { useTheme } from "../../src/hooks/useTheme";

export default function TefilaScreen() {
  const { tefilaId } = useLocalSearchParams<{ tefilaId: string }>();
  const { nusach, textSize, showEnglish } = useSettingsStore();
  const { colors } = useTheme();

  const tefila = getTefilaById(tefilaId ?? "");

  if (!tefila) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.background }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: colors.text }}>
          Tefila not found
        </Text>
        <Text style={{ color: colors.textSecondary, marginTop: 8 }}>
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
          headerStyle: { backgroundColor: colors.headerBg },
          headerTintColor: "#ffffff",
        }}
      />
      <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
        {/* Title */}
        <View
          style={{
            alignItems: "center",
            paddingTop: 24,
            paddingBottom: 16,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
            marginHorizontal: 16,
          }}
        >
          <Text
            style={{
              fontFamily: "NotoSerifHebrew-Bold",
              fontSize: textSize + 4,
              color: colors.primary,
            }}
          >
            {tefila.nameHe}
          </Text>
          <Text style={{ fontSize: 16, color: colors.textSecondary, marginTop: 4 }}>
            {tefila.name}
          </Text>
        </View>

        {/* Sections */}
        {tefila.sections.map((section, index) => {
          const showSectionHeader =
            tefila.sections.length > 1 || section.title !== tefila.name;

          return (
            <View
              key={section.id}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 20,
                borderBottomWidth: index < tefila.sections.length - 1 ? 1 : 0,
                borderBottomColor: colors.border,
              }}
            >
              {showSectionHeader && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 12,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "bold",
                      color: colors.accent,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                    }}
                  >
                    {section.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
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
                    backgroundColor: colors.primaryLight,
                    borderRadius: 10,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    marginBottom: 12,
                    borderWidth: 1,
                    borderColor: colors.border,
                  }}
                >
                  <Text style={{ fontSize: 13, color: colors.textSecondary, fontStyle: "italic" }}>
                    {section.instruction}
                  </Text>
                </View>
              )}

              <Text
                style={{
                  fontFamily: "NotoSerifHebrew-Regular",
                  fontSize: textSize,
                  lineHeight: textSize * 1.8,
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
                    marginTop: 16,
                    paddingTop: 12,
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                  }}
                >
                  <Text
                    style={{
                      color: colors.textSecondary,
                      lineHeight: (textSize - 4) * 1.6,
                      fontSize: textSize - 4,
                    }}
                  >
                    {getTextForNusach(section.translation, nusach)}
                  </Text>
                </View>
              )}
            </View>
          );
        })}

        <View style={{ height: 48 }} />
      </ScrollView>
    </>
  );
}
