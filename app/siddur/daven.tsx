import { useRef, useMemo } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import { getTefilaById } from "../../src/data/prayers";
import { getTextForNusach } from "../../src/data/types";
import { useSettingsStore } from "../../src/stores/useSettingsStore";
import { useTheme } from "../../src/hooks/useTheme";
import { assemblePrayer } from "../../src/utils/prayerAssembler";
import { getInsertionContext } from "../../src/utils/jewishCalendar";
import type { Tefila } from "../../src/data/types";

export default function DavenScreen() {
  const { tefilaIds } = useLocalSearchParams<{ tefilaIds: string }>();
  const { nusach, textSize, showEnglish } = useSettingsStore();
  const { colors } = useTheme();
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const sectionYPositions = useRef<Record<string, number>>({});

  const context = useMemo(() => getInsertionContext(), []);

  const ids = (tefilaIds ?? "").split(",").filter(Boolean);
  const tefilos: Tefila[] = ids
    .map((id) => getTefilaById(id))
    .filter((t): t is Tefila => t != null)
    .map((t) => assemblePrayer(t, context));

  if (tefilos.length === 0) {
    return (
      <>
        <Stack.Screen
          options={{
            title: "Davening",
            headerStyle: { backgroundColor: colors.headerBg },
            headerTintColor: "#ffffff",
          }}
        />
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.background }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: colors.text }}>
            לא נמצאו תפילות
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ marginTop: 16 }}
          >
            <Text style={{ fontSize: 16, color: colors.primary }}>חזרה</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  const mainTitle = tefilos.length === 1 ? tefilos[0].name : "Davening";

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
          title: mainTitle,
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
        {tefilos.map((tefila, tefilaIndex) => (
          <View key={tefila.id}>
            {/* Tefila header + Hebrew TOC */}
            <View
              style={{
                alignItems: "center",
                paddingVertical: 20,
                paddingHorizontal: 20,
                backgroundColor: colors.surface,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
                marginTop: tefilaIndex > 0 ? 4 : 0,
              }}
            >
              <Text
                style={{
                  fontFamily: "NotoSerifHebrew-Bold",
                  fontSize: textSize + 2,
                  color: colors.text,
                  marginBottom: 8,
                }}
              >
                {tefila.nameHe}
              </Text>
              {tefila.sections.length > 1 &&
                tefila.sections.map((section) => (
                  <TouchableOpacity
                    key={section.id}
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

            {/* Sections */}
            {tefila.sections.map((section) => (
              <View
                key={section.id}
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

                {/* Instruction — inline */}
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
          </View>
        ))}

        {/* Completion */}
        <View style={{ alignItems: "center", paddingVertical: 40, paddingHorizontal: 20 }}>
          <Text
            style={{
              fontFamily: "NotoSerifHebrew-Bold",
              fontSize: 20,
              color: colors.text,
            }}
          >
            סיום התפילה
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.8}
            style={{
              marginTop: 20,
              backgroundColor: colors.primary,
              borderRadius: 12,
              paddingHorizontal: 40,
              paddingVertical: 14,
            }}
          >
            <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: "600" }}>
              סיום
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}
