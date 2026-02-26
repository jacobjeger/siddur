import { View, Text, ScrollView, Pressable } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TEFILA_CATEGORIES } from "../../src/data/categories";
import { getTefilosByCategory } from "../../src/data/prayers";
import { useTheme } from "../../src/hooks/useTheme";

export default function BrowseTefilosScreen() {
  const { colors } = useTheme();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      {TEFILA_CATEGORIES.map((category) => {
        const tefilos = getTefilosByCategory(category.id);
        if (tefilos.length === 0) return null;

        return (
          <View key={category.id} style={{ marginTop: 16 }}>
            <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 16, marginBottom: 8 }}>
              <Ionicons
                name={category.icon as any}
                size={20}
                color={colors.accent}
              />
              <Text style={{ fontSize: 17, fontWeight: "bold", color: colors.text, marginLeft: 8 }}>
                {category.name}
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  color: colors.textMuted,
                  marginLeft: 8,
                  fontFamily: "NotoSerifHebrew-Bold",
                }}
              >
                {category.nameHe}
              </Text>
            </View>

            <View
              style={{
                backgroundColor: colors.surface,
                marginHorizontal: 16,
                borderRadius: 12,
                overflow: "hidden",
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              {tefilos.map((tefila, index) => (
                <Link
                  key={tefila.id}
                  href={`/siddur/${tefila.id}`}
                  asChild
                >
                  <Pressable
                    style={({ pressed }) => ({
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingHorizontal: 16,
                      paddingVertical: 12,
                      backgroundColor: pressed ? colors.surfaceSecondary : "transparent",
                      borderBottomWidth: index < tefilos.length - 1 ? 1 : 0,
                      borderBottomColor: colors.border,
                    })}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 16, fontWeight: "500", color: colors.text }}>
                        {tefila.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: colors.textMuted,
                          marginTop: 2,
                          fontFamily: "NotoSerifHebrew-Regular",
                        }}
                      >
                        {tefila.nameHe}
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
                  </Pressable>
                </Link>
              ))}
            </View>
          </View>
        );
      })}
      <View style={{ height: 32 }} />
    </ScrollView>
  );
}
