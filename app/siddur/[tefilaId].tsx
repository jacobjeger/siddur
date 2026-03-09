import { useRef, useMemo } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { getTefilaById } from "../../src/data/prayers";
import { getTextForNusach } from "../../src/data/types";
import { useSettingsStore } from "../../src/stores/useSettingsStore";
import { useTheme } from "../../src/hooks/useTheme";
import { assemblePrayer } from "../../src/utils/prayerAssembler";
import { getInsertionContext } from "../../src/utils/jewishCalendar";

export default function TefilaScreen() {
  const { tefilaId } = useLocalSearchParams<{ tefilaId: string }>();
  const { nusach, textSize, showEnglish } = useSettingsStore();
  const { colors } = useTheme();
  const scrollRef = useRef<ScrollView>(null);
  const sectionYPositions = useRef<Record<string, number>>({});

  const baseTefila = getTefilaById(tefilaId ?? "");
  const context = useMemo(() => getInsertionContext(), []);
  const tefila = useMemo(
    () => (baseTefila ? assemblePrayer(baseTefila, context) : undefined),
    [baseTefila, context]
  );

  if (!tefila) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.background }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: colors.text }}>
          לא נמצאה תפילה
        </Text>
      </View>
    );
  }

  const scrollToSection = (sectionId: string) => {
    const y = sectionYPositions.current[sectionId];
    if (y != null && scrollRef.current) {
      scrollRef.current.scrollTo({ y, animated: true });
    }
  };

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
        ref={scrollRef}
        style={{ flex: 1, backgroundColor: colors.background }}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {/* Hebrew TOC */}
        {tefila.sections.length > 1 && (
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
                fontSize: textSize + 2,
                color: colors.text,
                marginBottom: 10,
              }}
            >
              {tefila.nameHe}
            </Text>
            {tefila.sections.map((section, idx) => (
              <TouchableOpacity
                key={`${section.id}-${idx}`}
                onPress={() => scrollToSection(section.id)}
                activeOpacity={0.6}
              >
                <Text
                  style={{
                    fontFamily: "NotoSerifHebrew-Regular",
                    fontSize: 15,
                    color: colors.textMuted,
                    marginVertical: 2,
                  }}
                >
                  {section.titleHe}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Prayer sections */}
        {tefila.sections.map((section, index) => (
          <View
            key={`${section.id}-${index}`}
            onLayout={(e) => {
              sectionYPositions.current[section.id] = e.nativeEvent.layout.y;
            }}
            style={{
              paddingHorizontal: 20,
              paddingTop: 28,
              paddingBottom: 20,
            }}
          >
            {/* Hebrew section divider */}
            {(tefila.sections.length > 1 || section.titleHe !== tefila.nameHe) && (
              <Text
                style={{
                  fontFamily: "NotoSerifHebrew-Bold",
                  fontSize: textSize - 2,
                  color: colors.textSecondary,
                  textAlign: "center",
                  marginBottom: 20,
                }}
              >
                {section.titleHe}
              </Text>
            )}

            {/* Instruction — inline, not boxed */}
            {section.instruction && (
              <Text
                style={{
                  fontSize: 14,
                  color: colors.textMuted,
                  textAlign: "right",
                  writingDirection: "rtl",
                  marginBottom: 12,
                }}
              >
                {section.instruction}
              </Text>
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
        ))}
      </ScrollView>
    </>
  );
}
