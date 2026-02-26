import { View, Text, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getTefilaById } from "../../src/data/prayers";
import { getTextForNusach } from "../../src/data/types";
import { useSettingsStore } from "../../src/stores/useSettingsStore";
import { useTheme } from "../../src/hooks/useTheme";
import type { Tefila } from "../../src/data/types";

export default function DavenScreen() {
  const { tefilaIds } = useLocalSearchParams<{ tefilaIds: string }>();
  const { nusach, textSize, showEnglish } = useSettingsStore();
  const { colors } = useTheme();
  const router = useRouter();

  const ids = (tefilaIds ?? "").split(",").filter(Boolean);
  const tefilos: Tefila[] = ids
    .map((id) => getTefilaById(id))
    .filter((t): t is Tefila => t != null);

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
          <Text style={{ fontSize: 20, fontWeight: "bold", color: colors.text }}>
            No tefilos found
          </Text>
          <Pressable
            onPress={() => router.back()}
            style={{ marginTop: 16 }}
          >
            <Text style={{ fontSize: 16, color: colors.primary }}>Go Back</Text>
          </Pressable>
        </View>
      </>
    );
  }

  const mainTitle = tefilos.length === 1 ? tefilos[0].name : tefilos[0].name + " +";

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
      <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
        {tefilos.map((tefila, tefilaIndex) => (
          <View key={tefila.id}>
            {/* Tefila divider/header */}
            <View
              style={{
                backgroundColor: colors.headerBg,
                paddingVertical: 14,
                paddingHorizontal: 16,
                alignItems: "center",
                marginTop: tefilaIndex > 0 ? 8 : 0,
              }}
            >
              <Text
                style={{
                  fontFamily: "NotoSerifHebrew-Bold",
                  fontSize: textSize + 2,
                  color: "#ffffff",
                }}
              >
                {tefila.nameHe}
              </Text>
              <Text style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>
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
                    paddingHorizontal: 16,
                    paddingVertical: 20,
                    borderBottomWidth:
                      sectionIndex < tefila.sections.length - 1 ? 1 : 0,
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
                      <Text
                        style={{
                          fontSize: 13,
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
          </View>
        ))}

        {/* Completion */}
        <View
          style={{
            alignItems: "center",
            paddingVertical: 32,
            paddingHorizontal: 16,
          }}
        >
          <Ionicons name="checkmark-circle" size={48} color={colors.accent} />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: colors.text,
              marginTop: 12,
            }}
          >
            Finished Davening
          </Text>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => ({
              marginTop: 16,
              backgroundColor: pressed ? colors.primaryDark : colors.primary,
              borderRadius: 12,
              paddingHorizontal: 32,
              paddingVertical: 14,
            })}
          >
            <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: "600" }}>
              Done
            </Text>
          </Pressable>
        </View>

        <View style={{ height: 48 }} />
      </ScrollView>
    </>
  );
}
