import { View, Text, Pressable, ScrollView } from "react-native";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { HebrewDateHeader } from "../../src/components/common/HebrewDateHeader";
import { useHebrewDate } from "../../src/hooks/useHebrewDate";
import { useNextZman } from "../../src/hooks/useNextZman";
import { useSettingsStore } from "../../src/stores/useSettingsStore";
import { useTheme } from "../../src/hooks/useTheme";
import { getTefilosForTime } from "../../src/data/prayers";
import { ZMAN_NAMES } from "../../src/utils/constants";
import { formatZmanTime, formatCountdown } from "../../src/utils/timeFormatting";

const TEFILA_LABELS: Record<string, { en: string; he: string }> = {
  shacharis: { en: "Shacharis", he: "שחרית" },
  mincha: { en: "Mincha", he: "מנחה" },
  maariv: { en: "Maariv", he: "מעריב" },
  none: { en: "Shacharis", he: "שחרית" },
};

export default function SiddurTab() {
  const { tefilaType } = useHebrewDate();
  const { nextZman, countdown } = useNextZman();
  const timeFormat = useSettingsStore((s) => s.timeFormat);
  const router = useRouter();
  const { colors } = useTheme();

  const current = TEFILA_LABELS[tefilaType] ?? TEFILA_LABELS.shacharis;
  const tefilosForTime = getTefilosForTime(
    tefilaType === "none" ? "shacharis" : tefilaType
  );

  const firstTefilaId = tefilosForTime[0]?.id;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <HebrewDateHeader />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 32 }}>
        {/* Current tefila card */}
        <View
          style={{
            backgroundColor: colors.primaryLight,
            borderRadius: 16,
            padding: 20,
            borderWidth: 1,
            borderColor: colors.border,
            marginBottom: 16,
          }}
        >
          <Text style={{ fontSize: 13, color: colors.textSecondary, fontWeight: "500" }}>
            It's time for
          </Text>
          <View style={{ flexDirection: "row", alignItems: "baseline", marginTop: 4, marginBottom: 12 }}>
            <Text style={{ fontSize: 28, fontWeight: "bold", color: colors.primary }}>
              {current.en}
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: colors.accent,
                marginLeft: 12,
                fontFamily: "NotoSerifHebrew-Bold",
              }}
            >
              {current.he}
            </Text>
          </View>

          {nextZman && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: colors.surface,
                borderRadius: 10,
                paddingHorizontal: 12,
                paddingVertical: 8,
                marginBottom: 14,
              }}
            >
              <Text style={{ fontSize: 13, color: colors.textSecondary }}>
                {ZMAN_NAMES[nextZman.key]?.en ?? nextZman.key}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 13, fontWeight: "500", color: colors.text, marginRight: 8 }}>
                  {formatZmanTime(nextZman.time, timeFormat)}
                </Text>
                <Text style={{ fontSize: 13, fontWeight: "bold", color: colors.primary }}>
                  {formatCountdown(countdown)}
                </Text>
              </View>
            </View>
          )}

          <Pressable
            onPress={() => {
              if (tefilosForTime.length > 0) {
                router.push({
                  pathname: "/siddur/daven",
                  params: { tefilaIds: tefilosForTime.map((t) => t.id).join(",") },
                });
              } else if (firstTefilaId) {
                router.push(`/siddur/${firstTefilaId}`);
              }
            }}
            style={({ pressed }) => ({
              backgroundColor: pressed ? colors.primaryDark : colors.primary,
              borderRadius: 12,
              paddingVertical: 16,
              alignItems: "center",
            })}
          >
            <Text style={{ color: "#ffffff", fontSize: 18, fontWeight: "600" }}>
              Start Davening
            </Text>
          </Pressable>
        </View>

        {/* Quick access tefilos for current time */}
        {tefilosForTime.length > 0 && (
          <View style={{ marginBottom: 16 }}>
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
              {current.en} Tefilos
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
              {tefilosForTime.map((tefila, index) => (
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
                      borderBottomWidth: index < tefilosForTime.length - 1 ? 1 : 0,
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
        )}

        {/* Browse all */}
        <Link href="/siddur/browse" asChild>
          <Pressable
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
            <Ionicons name="book-outline" size={20} color={colors.text} />
            <Text style={{ color: colors.text, fontSize: 17, marginLeft: 8 }}>
              Browse All Tefilos
            </Text>
          </Pressable>
        </Link>
      </ScrollView>
    </View>
  );
}
