import { useMemo } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getTefilaById } from "../../src/data/prayers";
import { getTextForNusach } from "../../src/data/types";
import { useSettingsStore } from "../../src/stores/useSettingsStore";
import { useTheme } from "../../src/hooks/useTheme";
import { assemblePrayer, getActiveInsertionNames } from "../../src/utils/prayerAssembler";
import { getInsertionContext } from "../../src/utils/jewishCalendar";
import { buildTefilaFromPath, buildTefilaForService, buildTefilaFromSupplementary } from "../../src/services/database";
import type { Tefila } from "../../src/data/types";

export default function DavenScreen() {
  const { tefilaIds } = useLocalSearchParams<{ tefilaIds: string }>();
  const { nusach, textSize, showEnglish } = useSettingsStore();
  const { colors } = useTheme();
  const router = useRouter();

  const context = useMemo(() => getInsertionContext(), []);
  const activeInsertions = useMemo(() => getActiveInsertionNames(context), [context]);

  const ids = (tefilaIds ?? "").split(",").filter(Boolean);
  const tefilos: Tefila[] = useMemo(() => {
    return ids
      .map((id) => {
        // DB-backed path format: "dbpath:<nusach>:<path>"
        if (id.startsWith("dbpath:")) {
          const parts = id.split(":");
          const dbNusach = parts[1] || nusach;
          const dbPath = parts.slice(2).join(":");
          return buildTefilaFromPath(dbNusach as any, dbPath);
        }
        // DB-backed service format: "dbservice:<service>"
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
        return baseTefila ? assemblePrayer(baseTefila, context) : null;
      })
      .filter((t): t is Tefila => t != null);
  }, [tefilaIds, nusach, context]);

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
            No tefilos found
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ marginTop: 16 }}
          >
            <Text style={{ fontSize: 16, color: colors.primary }}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  const mainTitle = tefilos.length === 1 ? tefilos[0].name : "Davening";

  return (
    <>
      <Stack.Screen
        options={{
          title: mainTitle,
          headerBackTitle: "Home",
          headerStyle: { backgroundColor: colors.headerBg },
          headerTintColor: "#ffffff",
        }}
      />
      <ScrollView
        style={{ flex: 1, backgroundColor: colors.background }}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {/* Active insertion badges */}
        {activeInsertions.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              paddingHorizontal: 16,
              paddingVertical: 10,
              gap: 6,
              backgroundColor: colors.surface,
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
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

        {tefilos.map((tefila, tefilaIndex) => (
          <View key={tefila.id}>
            {/* Tefila divider header */}
            <View
              style={{
                backgroundColor: colors.headerBg,
                paddingVertical: 16,
                paddingHorizontal: 20,
                alignItems: "center",
                marginTop: tefilaIndex > 0 ? 4 : 0,
              }}
            >
              <Text
                style={{
                  fontFamily: "NotoSerifHebrew-Bold",
                  fontSize: textSize + 4,
                  color: "#ffffff",
                }}
              >
                {tefila.nameHe}
              </Text>
              <Text style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", marginTop: 4 }}>
                {tefila.name}
              </Text>
            </View>

            {/* Sections */}
            {tefila.sections.map((section, sectionIndex) => {
              const showSectionHeader =
                tefila.sections.length > 1 || section.title !== tefila.name;

              return (
                <View
                  key={section.id}
                  style={{
                    paddingHorizontal: 20,
                    paddingTop: 24,
                    paddingBottom: 20,
                    borderBottomWidth:
                      sectionIndex < tefila.sections.length - 1 ? 1 : 0,
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
                      <Text
                        style={{
                          fontSize: 14,
                          color: colors.textSecondary,
                          fontStyle: "italic",
                        }}
                      >
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
          </View>
        ))}

        {/* Completion */}
        <View style={{ alignItems: "center", paddingVertical: 40, paddingHorizontal: 20 }}>
          <Ionicons name="checkmark-circle" size={52} color={colors.accent} />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              color: colors.text,
              marginTop: 12,
            }}
          >
            Finished Davening
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
              Done
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}
