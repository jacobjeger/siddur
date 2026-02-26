import { View, Text, Pressable, ScrollView, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LocationDisplay } from "../../src/components/common/LocationDisplay";
import { useTheme } from "../../src/hooks/useTheme";

const SAMPLE_MINYANIM = [
  {
    id: "1",
    name: "Young Israel",
    type: "Shacharis",
    time: "6:45 AM",
    nusach: "Ashkenaz",
    distance: "0.3 mi",
  },
  {
    id: "2",
    name: "Chabad House",
    type: "Shacharis",
    time: "7:30 AM",
    nusach: "Ari",
    distance: "0.8 mi",
  },
  {
    id: "3",
    name: "Sephardic Center",
    type: "Mincha/Maariv",
    time: "5:15 PM",
    nusach: "Edot HaMizrach",
    distance: "1.2 mi",
  },
  {
    id: "4",
    name: "Beis Medrash",
    type: "Maariv",
    time: "9:00 PM",
    nusach: "Ashkenaz",
    distance: "0.5 mi",
  },
];

export default function MinyanomTab() {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <LocationDisplay />

      <ScrollView style={{ flex: 1 }}>
        {/* Info banner */}
        <View
          style={{
            marginHorizontal: 16,
            marginTop: 16,
            backgroundColor: colors.primaryLight,
            borderRadius: 12,
            padding: 16,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
            <Ionicons name="information-circle" size={20} color={colors.primary} />
            <Text style={{ fontSize: 14, fontWeight: "bold", color: colors.primary, marginLeft: 8 }}>
              Minyan Finder Preview
            </Text>
          </View>
          <Text style={{ fontSize: 14, color: colors.textSecondary }}>
            Live minyan data from GoDaven integration is coming soon.
            Below is a preview of the experience.
          </Text>
        </View>

        {/* Sample minyanim */}
        <View style={{ marginHorizontal: 16, marginTop: 16 }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "bold",
              color: colors.textMuted,
              textTransform: "uppercase",
              letterSpacing: 1,
              marginBottom: 8,
              paddingHorizontal: 4,
            }}
          >
            Nearby Minyanim
          </Text>
          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: 12,
              overflow: "hidden",
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            {SAMPLE_MINYANIM.map((minyan, index) => (
              <View
                key={minyan.id}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  borderBottomWidth: index < SAMPLE_MINYANIM.length - 1 ? 1 : 0,
                  borderBottomColor: colors.border,
                }}
              >
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: "600", color: colors.text }}>
                      {minyan.name}
                    </Text>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
                      <View
                        style={{
                          backgroundColor: colors.primaryLight,
                          borderRadius: 4,
                          paddingHorizontal: 8,
                          paddingVertical: 2,
                          marginRight: 8,
                        }}
                      >
                        <Text style={{ fontSize: 12, fontWeight: "500", color: colors.primary }}>
                          {minyan.type}
                        </Text>
                      </View>
                      <Text style={{ fontSize: 12, color: colors.textMuted }}>
                        {minyan.nusach}
                      </Text>
                    </View>
                  </View>
                  <View style={{ alignItems: "flex-end" }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold", color: colors.text }}>
                      {minyan.time}
                    </Text>
                    <Text style={{ fontSize: 12, color: colors.textMuted, marginTop: 4 }}>
                      {minyan.distance}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* GoDaven link */}
        <View style={{ marginHorizontal: 16, marginTop: 16, marginBottom: 32 }}>
          <Pressable
            onPress={() => Linking.openURL("https://www.godaven.com")}
            style={({ pressed }) => ({
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 12,
              paddingHorizontal: 24,
              paddingVertical: 16,
              alignItems: "center",
              backgroundColor: pressed ? colors.surfaceSecondary : colors.surface,
              flexDirection: "row",
              justifyContent: "center",
            })}
          >
            <Ionicons name="globe-outline" size={20} color={colors.text} />
            <Text style={{ color: colors.text, fontSize: 16, marginLeft: 8 }}>
              Find Minyanim on GoDaven.com
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
