import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { HebrewDateHeader } from "../../src/components/common/HebrewDateHeader";
import { LocationDisplay } from "../../src/components/common/LocationDisplay";
import { useZmanim } from "../../src/hooks/useZmanim";
import { useNextZman } from "../../src/hooks/useNextZman";
import { useSettingsStore } from "../../src/stores/useSettingsStore";
import { useTheme } from "../../src/hooks/useTheme";
import { ZMAN_NAMES } from "../../src/utils/constants";
import { formatZmanTime, formatCountdown } from "../../src/utils/timeFormatting";

export default function ZmanimTab() {
  const { zmanim, loading } = useZmanim();
  const { nextZman, countdown } = useNextZman();
  const timeFormat = useSettingsStore((s) => s.timeFormat);
  const { colors } = useTheme();

  if (loading || !zmanim) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ color: colors.textSecondary, marginTop: 16 }}>Loading zmanim...</Text>
      </View>
    );
  }

  const zmanimEntries = Object.entries(zmanim).filter(
    ([_, value]) => value != null
  ) as [string, Date][];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <HebrewDateHeader />
      <LocationDisplay />

      {nextZman && (
        <View
          style={{
            marginHorizontal: 16,
            marginTop: 8,
            marginBottom: 8,
            backgroundColor: colors.primaryLight,
            borderRadius: 12,
            padding: 16,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Text style={{ fontSize: 13, color: colors.textSecondary, fontWeight: "500" }}>
            Next Zman
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: colors.primary, marginTop: 4 }}>
            {ZMAN_NAMES[nextZman.key]?.en ?? nextZman.key}
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
            <Text style={{ fontSize: 17, color: colors.text }}>
              {formatZmanTime(nextZman.time, timeFormat)}
            </Text>
            <Text style={{ fontSize: 17, fontWeight: "600", color: colors.primary }}>
              {formatCountdown(countdown)}
            </Text>
          </View>
        </View>
      )}

      <ScrollView style={{ flex: 1, paddingHorizontal: 16, paddingTop: 8 }}>
        {zmanimEntries.map(([key, time]) => (
          <View
            key={key}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            }}
          >
            <View>
              <Text style={{ fontSize: 16, fontWeight: "500", color: colors.text }}>
                {ZMAN_NAMES[key]?.en ?? key}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: colors.textMuted,
                  fontFamily: "NotoSerifHebrew-Regular",
                }}
              >
                {ZMAN_NAMES[key]?.he ?? ""}
              </Text>
            </View>
            <Text style={{ fontSize: 16, fontWeight: "600", color: colors.text }}>
              {formatZmanTime(time, timeFormat)}
            </Text>
          </View>
        ))}
        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}
