import { View, Text, ScrollView, RefreshControl } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { HebrewDateHeader } from "../../src/components/common/HebrewDateHeader";
import { HebrewText } from "../../src/components/common/HebrewText";
import { LoadingSpinner } from "../../src/components/common/LoadingSpinner";
import { LocationDisplay } from "../../src/components/common/LocationDisplay";
import { useZmanim } from "../../src/hooks/useZmanim";
import { useNextZman } from "../../src/hooks/useNextZman";
import { useLocationStore } from "../../src/stores/useLocationStore";
import { useSettingsStore } from "../../src/stores/useSettingsStore";
import { useTheme } from "../../src/hooks/useTheme";
import { ZMAN_NAMES } from "../../src/utils/constants";
import {
  ZMAN_ORDER,
  ZMAN_GROUP_LABELS,
  type ZmanGroup,
} from "../../src/services/zmanim/types";
import {
  formatZmanTime,
  formatCountdown,
} from "../../src/utils/timeFormatting";

export default function ZmanimTab() {
  const { zmanim, loading, error, refresh } = useZmanim();
  const { nextZman, countdown } = useNextZman();
  const location = useLocationStore((s) => s.location);
  const timeFormat = useSettingsStore((s) => s.timeFormat);
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const timeZone = location?.timezone;

  // Previously this replaced the ENTIRE tab, so the header and location bar
  // vanished and the layout jumped on every cold load — and the top of the
  // screen went light behind a light-styled status bar.
  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <HebrewDateHeader />
        <LocationDisplay />
        <LoadingSpinner message="Loading zmanim..." />
      </View>
    );
  }

  if (error || !zmanim) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        {/* Dark band behind the light-styled status bar — see minyanim.tsx. */}
        <View style={{ height: insets.top, backgroundColor: colors.headerBg }} />
        <LocationDisplay />
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 32,
          }}
        >
          <Ionicons
            name="alert-circle-outline"
            size={44}
            color={colors.textMuted}
          />
          <Text
            style={{
              color: colors.text,
              fontSize: 17,
              fontWeight: "600",
              marginTop: 12,
              textAlign: "center",
            }}
          >
            Couldn&apos;t calculate zmanim
          </Text>
          <Text
            style={{
              color: colors.textSecondary,
              marginTop: 6,
              textAlign: "center",
            }}
          >
            {error ?? "No zmanim are available for this location."}
          </Text>
        </View>
      </View>
    );
  }

  const groups = ZMAN_ORDER.reduce<Record<ZmanGroup, typeof ZMAN_ORDER>>(
    (acc, entry) => {
      if (zmanim[entry.key] != null) acc[entry.group].push(entry);
      return acc;
    },
    { morning: [], afternoon: [], evening: [] }
  );

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
          <Text
            style={{
              fontSize: 13,
              color: colors.textSecondary,
              fontWeight: "500",
            }}
          >
            Next Zman
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: colors.primary,
              marginTop: 4,
            }}
          >
            {ZMAN_NAMES[nextZman.key]?.en ?? nextZman.key}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 8,
            }}
          >
            <Text style={{ fontSize: 17, color: colors.text }}>
              {formatZmanTime(nextZman.time, timeFormat, timeZone)}
            </Text>
            <Text
              style={{ fontSize: 17, fontWeight: "600", color: colors.primary }}
            >
              {formatCountdown(countdown)}
            </Text>
          </View>
        </View>
      )}

      <ScrollView
        style={{ flex: 1, paddingHorizontal: 16, paddingTop: 8 }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={refresh}
            tintColor={colors.primary}
          />
        }
      >
        {(Object.keys(groups) as ZmanGroup[]).map((group) =>
          groups[group].length === 0 ? null : (
            <View key={group} style={{ marginBottom: 8 }}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "700",
                  color: colors.textMuted,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                  marginTop: 12,
                  marginBottom: 4,
                }}
              >
                {ZMAN_GROUP_LABELS[group].en}
              </Text>

              {groups[group].map(({ key }) => (
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
                  <View style={{ flex: 1, paddingRight: 12 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "500",
                        color: colors.text,
                      }}
                    >
                      {ZMAN_NAMES[key]?.en ?? key}
                    </Text>
                    <HebrewText
                      // Left-aligned so it sits under its English label; the
                      // RTL writing direction still orders the text correctly.
                      style={{
                        fontSize: 14,
                        color: colors.textMuted,
                        textAlign: "left",
                      }}
                    >
                      {ZMAN_NAMES[key]?.he ?? ""}
                    </HebrewText>
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: colors.text,
                    }}
                  >
                    {formatZmanTime(zmanim[key], timeFormat, timeZone)}
                  </Text>
                </View>
              ))}
            </View>
          )
        )}
        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}
