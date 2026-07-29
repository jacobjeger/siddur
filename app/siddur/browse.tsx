import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter, Stack, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { HebrewText } from "../../src/components/common/HebrewText";
import { useSettingsStore } from "../../src/stores/useSettingsStore";
import { Focusable } from "../../src/components/common/Focusable";
import { TEFILA_CATEGORIES } from "../../src/data/categories";
import { getTefilosByCategory } from "../../src/data/prayers";
import { useTheme } from "../../src/hooks/useTheme";

export default function BrowseTefilosScreen() {
  const { colors } = useTheme();
  const textSize = useSettingsStore((s) => s.textSize);
  const router = useRouter();
  const { category } = useLocalSearchParams<{ category?: string }>();

  const categoriesToShow = category
    ? TEFILA_CATEGORIES.filter((c) => c.id === category)
    : TEFILA_CATEGORIES;

  const headerTitle = category
    ? (TEFILA_CATEGORIES.find((c) => c.id === category)?.name ?? "Tefilos")
    : "סידור";

  return (
    <>
      <Stack.Screen
        options={{
          title: headerTitle,
          headerStyle: { backgroundColor: colors.headerBg },
          headerTintColor: "#ffffff",
        }}
      />
      <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
        {categoriesToShow.map((cat) => {
          const tefilos = getTefilosByCategory(cat.id);
          if (tefilos.length === 0) return null;

          return (
            <View key={cat.id}>
              {/* Category header — only show when browsing all */}
              {!category && (
                <View
                  style={{
                    paddingHorizontal: 20,
                    paddingTop: 24,
                    paddingBottom: 8,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "600",
                      color: colors.textMuted,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                    }}
                  >
                    {cat.name}
                  </Text>
                </View>
              )}

              {/* Tefila list */}
              <View
                style={{
                  backgroundColor: colors.surface,
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderColor: colors.border,
                }}
              >
                {tefilos.map((tefila, index) => (
                  <Focusable
                    key={tefila.id}
                    onPress={() => router.push(`/siddur/${tefila.id}`)}
                    style={{
                      paddingHorizontal: 20,
                      paddingVertical: 15,
                      borderBottomWidth: index < tefilos.length - 1 ? 1 : 0,
                      borderBottomColor: colors.border,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <Text
                        style={{ fontSize: textSize - 5, color: colors.text }}
                        numberOfLines={1}
                      >
                        {tefila.name}
                      </Text>
                      <HebrewText
                        style={{
                          fontSize: textSize - 5,
                          color: colors.textSecondary,
                          flexShrink: 1,
                        }}
                        numberOfLines={1}
                      >
                        {tefila.nameHe}
                      </HebrewText>
                    </View>
                  </Focusable>
                ))}
              </View>
            </View>
          );
        })}
        {categoriesToShow.every(
          (cat) => getTefilosByCategory(cat.id).length === 0
        ) && (
          <View
            style={{
              alignItems: "center",
              paddingHorizontal: 32,
              paddingVertical: 64,
            }}
          >
            <Ionicons
              name="book-outline"
              size={40}
              color={colors.textMuted}
            />
            <Text
              style={{
                color: colors.text,
                fontSize: 16,
                fontWeight: "600",
                marginTop: 10,
                textAlign: "center",
              }}
            >
              Nothing here yet
            </Text>
            <Text
              style={{
                color: colors.textSecondary,
                marginTop: 4,
                textAlign: "center",
              }}
            >
              This category has no tefilos available.
            </Text>
          </View>
        )}
        <View style={{ height: 32 }} />
      </ScrollView>
    </>
  );
}
