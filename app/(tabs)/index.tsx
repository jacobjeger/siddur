import { useMemo } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { HebrewDateHeader } from "../../src/components/common/HebrewDateHeader";
import { LocationDisplay } from "../../src/components/common/LocationDisplay";
import { useHebrewDate } from "../../src/hooks/useHebrewDate";
import { useNextZman } from "../../src/hooks/useNextZman";
import { useSettingsStore } from "../../src/stores/useSettingsStore";
import { useTheme } from "../../src/hooks/useTheme";
import { getTefilosForTime } from "../../src/data/prayers";
import { ZMAN_NAMES } from "../../src/utils/constants";
import { formatZmanTime, formatCountdown } from "../../src/utils/timeFormatting";
import { TEFILA_CATEGORIES } from "../../src/data/categories";
import { getTefilosByCategory } from "../../src/data/prayers";

const MAIN_CATEGORIES = ["shacharis", "mincha", "maariv", "blessings", "shabbos"];

export default function SiddurTab() {
  const { tefilaType } = useHebrewDate();
  const { nextZman, countdown } = useNextZman();
  const timeFormat = useSettingsStore((s) => s.timeFormat);
  const router = useRouter();
  const { colors } = useTheme();

  const tefilosForTime = getTefilosForTime(
    tefilaType === "none" ? "shacharis" : tefilaType
  );

  const mainCategories = TEFILA_CATEGORIES.filter((c) =>
    MAIN_CATEGORIES.includes(c.id)
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <HebrewDateHeader />
      <LocationDisplay />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Next zman info bar */}
        {nextZman && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 20,
              paddingVertical: 10,
              backgroundColor: colors.surface,
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            }}
          >
            <Text style={{ fontSize: 14, color: colors.textSecondary }}>
              {ZMAN_NAMES[nextZman.key]?.en ?? nextZman.key}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Text style={{ fontSize: 14, color: colors.text }}>
                {formatZmanTime(nextZman.time, timeFormat)}
              </Text>
              <Text style={{ fontSize: 13, fontWeight: "600", color: colors.accent }}>
                in {formatCountdown(countdown)}
              </Text>
            </View>
          </View>
        )}

        {/* Main tefila list */}
        <View
          style={{
            backgroundColor: colors.surface,
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderColor: colors.border,
            marginTop: 16,
          }}
        >
          {mainCategories.map((category, index) => {
            const tefilos = getTefilosByCategory(category.id);
            if (tefilos.length === 0) return null;

            return (
              <TouchableOpacity
                key={category.id}
                onPress={() => {
                  if (tefilos.length === 1) {
                    router.push(`/siddur/${tefilos[0].id}`);
                  } else {
                    router.push({
                      pathname: "/siddur/browse",
                      params: { category: category.id },
                    });
                  }
                }}
                activeOpacity={0.6}
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 15,
                  borderBottomWidth: index < mainCategories.length - 1 ? 1 : 0,
                  borderBottomColor: colors.border,
                }}
              >
                <Text style={{ fontSize: 17, color: colors.text }}>
                  {category.name} - {category.nameHe}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Browse all */}
        <TouchableOpacity
          onPress={() => router.push("/siddur/browse")}
          activeOpacity={0.6}
          style={{
            backgroundColor: colors.surface,
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderColor: colors.border,
            marginTop: 16,
            paddingHorizontal: 20,
            paddingVertical: 15,
          }}
        >
          <Text style={{ fontSize: 17, color: colors.primary }}>
            כל התפילות - All Tefilos
          </Text>
        </TouchableOpacity>

        {/* Start davening shortcut */}
        {tefilosForTime.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/siddur/daven",
                params: { tefilaIds: tefilosForTime.map((t) => t.id).join(",") },
              });
            }}
            activeOpacity={0.6}
            style={{
              backgroundColor: colors.surface,
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderColor: colors.border,
              marginTop: 16,
              paddingHorizontal: 20,
              paddingVertical: 15,
            }}
          >
            <Text style={{ fontSize: 17, color: colors.accent, fontWeight: "600" }}>
              התחל להתפלל - Start Davening
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}
