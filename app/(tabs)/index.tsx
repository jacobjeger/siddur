import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { HebrewDateHeader } from "../../src/components/common/HebrewDateHeader";
import { LocationDisplay } from "../../src/components/common/LocationDisplay";
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

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <HebrewDateHeader />
      <LocationDisplay />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      >
        {/* Start Davening hero card */}
        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: 16,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: colors.border,
            marginBottom: 20,
          }}
        >
          {/* Card header */}
          <View
            style={{
              backgroundColor: colors.headerBg,
              paddingHorizontal: 20,
              paddingVertical: 16,
            }}
          >
            <Text style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>
              It's time for
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
              <Text style={{ fontSize: 26, fontWeight: "bold", color: "#ffffff" }}>
                {current.en}
              </Text>
              <Text
                style={{
                  fontSize: 22,
                  color: colors.accent,
                  marginLeft: 12,
                  fontFamily: "NotoSerifHebrew-Bold",
                }}
              >
                {current.he}
              </Text>
            </View>
          </View>

          {/* Next zman info */}
          {nextZman && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 20,
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
              }}
            >
              <View>
                <Text style={{ fontSize: 12, color: colors.textMuted }}>Next Zman</Text>
                <Text style={{ fontSize: 15, fontWeight: "600", color: colors.text, marginTop: 2 }}>
                  {ZMAN_NAMES[nextZman.key]?.en ?? nextZman.key}
                </Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ fontSize: 15, color: colors.text }}>
                  {formatZmanTime(nextZman.time, timeFormat)}
                </Text>
                <Text style={{ fontSize: 13, fontWeight: "bold", color: colors.accent, marginTop: 2 }}>
                  in {formatCountdown(countdown)}
                </Text>
              </View>
            </View>
          )}

          {/* Start Davening button */}
          <TouchableOpacity
            onPress={() => {
              if (tefilosForTime.length > 0) {
                router.push({
                  pathname: "/siddur/daven",
                  params: { tefilaIds: tefilosForTime.map((t) => t.id).join(",") },
                });
              }
            }}
            activeOpacity={0.8}
            style={{
              backgroundColor: colors.accent,
              marginHorizontal: 16,
              marginVertical: 16,
              borderRadius: 12,
              paddingVertical: 16,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="book" size={20} color="#ffffff" />
              <Text style={{ color: "#ffffff", fontSize: 18, fontWeight: "700", marginLeft: 8 }}>
                Start Davening
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Individual tefilos for current time */}
        {tefilosForTime.length > 0 && (
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "600",
                color: colors.textMuted,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                marginBottom: 10,
                marginLeft: 4,
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
                <TouchableOpacity
                  key={tefila.id}
                  onPress={() => router.push(`/siddur/${tefila.id}`)}
                  activeOpacity={0.6}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    borderBottomWidth: index < tefilosForTime.length - 1 ? 1 : 0,
                    borderBottomColor: colors.border,
                  }}
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
                  <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Browse all tefilos button */}
        <TouchableOpacity
          onPress={() => router.push("/siddur/browse")}
          activeOpacity={0.7}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 12,
            paddingVertical: 16,
          }}
        >
          <Ionicons name="library-outline" size={20} color={colors.primary} />
          <Text style={{ color: colors.primary, fontSize: 16, fontWeight: "600", marginLeft: 8 }}>
            Browse All Tefilos
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
