import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter, Stack, useLocalSearchParams } from "expo-router";
import { TEFILA_CATEGORIES } from "../../src/data/categories";
import { getTefilosByCategory } from "../../src/data/prayers";
import { useTheme } from "../../src/hooks/useTheme";

export default function BrowseTefilosScreen() {
  const { colors } = useTheme();
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
                  <TouchableOpacity
                    key={tefila.id}
                    onPress={() => router.push(`/siddur/${tefila.id}`)}
                    activeOpacity={0.6}
                    style={{
                      paddingHorizontal: 20,
                      paddingVertical: 15,
                      borderBottomWidth: index < tefilos.length - 1 ? 1 : 0,
                      borderBottomColor: colors.border,
                    }}
                  >
                    <Text style={{ fontSize: 17, color: colors.text }}>
                      {tefila.name} - {tefila.nameHe}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          );
        })}
        <View style={{ height: 32 }} />
      </ScrollView>
    </>
  );
}
