import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { getTefilaById } from "../../src/data/prayers";
import { getTextForNusach } from "../../src/data/types";
import { useSettingsStore } from "../../src/stores/useSettingsStore";
import { useTheme } from "../../src/hooks/useTheme";
import { assemblePrayer, getActiveInsertionNames } from "../../src/utils/prayerAssembler";
import { getInsertionContext } from "../../src/utils/jewishCalendar";
import { useMemo } from "react";
import { buildTefilaFromPath, buildTefilaForService, buildTefilaFromSupplementary } from "../../src/services/database";
import type { Tefila } from "../../src/data/types";

export default function TefilaScreen() {
  const { tefilaId } = useLocalSearchParams<{ tefilaId: string }>();
  const { nusach, textSize, showEnglish, keepScreenOn } = useSettingsStore();
  const { colors } = useTheme();

  const context = useMemo(() => getInsertionContext(), []);
  const activeInsertions = useMemo(() => getActiveInsertionNames(context), [context]);

  const tefila = useMemo(() => {
    const id = tefilaId ?? "";

    // New DB-backed path format: "dbpath:<nusach>:<path>"
    if (id.startsWith("dbpath:")) {
      const parts = id.split(":");
      const dbNusach = parts[1] || nusach;
      const dbPath = parts.slice(2).join(":");
      return buildTefilaFromPath(dbNusach as any, dbPath);
    }

    // New DB-backed service format: "dbservice:<service>"
    if (id.startsWith("dbservice:")) {
      const service = id.substring("dbservice:".length);
      return buildTefilaForService(nusach, service);
    }

    // Supplementary text format: "dbsupplementary:<source>:<path>"
    if (id.startsWith("dbsupplementary:")) {
      const parts = id.split(":");
      const source = parts[1];
      const path = parts.slice(2).join(":") || undefined;
      return buildTefilaFromSupplementary(source, path);
    }

    // Legacy static lookup with insertion assembly
    const baseTefila = getTefilaById(id);
    return baseTefila ? assemblePrayer(baseTefila, context) : undefined;
  }, [tefilaId, nusach, context]);

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
          {activeInsertions.length > 0 && (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                marginTop: 10,
                gap: 6,
              }}
            >
              {activeInsertions.map((name) => (
                <View
                  key={name}
                  style={{
                    backgroundColor: colors.accent + "22",
                    borderRadius: 12,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                  }}
                >
                  <Text style={{ fontSize: 11, color: colors.accent, fontWeight: "600" }}>
                    {name}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Prayer sections */}
        {tefila.sections.map((section, index) => {
          const showSectionHeader =
            tefila.sections.length > 1 || section.title !== tefila.name;

          const hebrewText =
            typeof section.text === "string"
              ? section.text
              : getTextForNusach(section.text, nusach);
          const englishText = section.translation
            ? typeof section.translation === "string"
              ? section.translation
              : getTextForNusach(section.translation, nusach)
            : null;

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
                {hebrewText}
              </Text>

              {showEnglish && englishText && (
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
                    {englishText}
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
