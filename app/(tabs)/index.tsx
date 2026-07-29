import { useCallback, useMemo } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { HebrewText } from "../../src/components/common/HebrewText";
import { HebrewDateHeader } from "../../src/components/common/HebrewDateHeader";
import { LocationDisplay } from "../../src/components/common/LocationDisplay";
import { useHebrewDate } from "../../src/hooks/useHebrewDate";
import { useNextZman } from "../../src/hooks/useNextZman";
import { useLocationStore } from "../../src/stores/useLocationStore";
import { useSettingsStore } from "../../src/stores/useSettingsStore";
import { useTheme } from "../../src/hooks/useTheme";
import { radius, typeScale } from "../../src/theme/tokens";
import { Focusable } from "../../src/components/common/Focusable";
import { getTefilosForTime } from "../../src/data/prayers";
import { hasContent } from "../../src/utils/tefilaContent";
import { ZMAN_NAMES } from "../../src/utils/constants";
import { formatZmanTime, formatCountdown } from "../../src/utils/timeFormatting";
import { TEFILA_CATEGORIES } from "../../src/data/categories";
import { getTefilosByCategory } from "../../src/data/prayers";
import { describeTachanun } from "../../src/utils/describeTachanun";

import { useKeyHandler } from "../../src/hooks/useKeyHandler";
import { useReadingStore, getResumable } from "../../src/stores/useReadingStore";
import { Bilingual } from "../../src/components/common/Bilingual";
const MAIN_CATEGORIES = ["shacharis", "mincha", "maariv", "blessings"];

export default function SiddurTab() {
  const { tefilaType, dayDavening } = useHebrewDate();
  const { nextZman, countdown } = useNextZman();
  const timeFormat = useSettingsStore((s) => s.timeFormat);
  const nusach = useSettingsStore((s) => s.nusach);
  const timeZone = useLocationStore((s) => s.location?.timezone);
  const router = useRouter();
  const { colors } = useTheme();

  // getTefilosForTime also sweeps in every "anytime" tefila, which appended
  // Birchas HaMazon and Bedtime Shema to the Shacharis flow. Restrict the
  // daven flow to this slot, and drop tefilos with no text yet.
  const slot = tefilaType === "none" ? "shacharis" : tefilaType;
  const tefilosForTime = getTefilosForTime(slot).filter(
    (t) => t.timeContext === slot && hasContent(t, nusach)
  );

  const startDavening = useCallback(() => {
    if (tefilosForTime.length === 0) return;
    router.push({
      pathname: "/siddur/daven",
      params: { tefilaIds: tefilosForTime.map((t) => t.id).join(",") },
    });
  }, [tefilosForTime]);

  // "Flip open, press OK, you are in the text." hasTVPreferredFocus is a no-op
  // on plain Android, so the two-second path is the screen default action:
  // OK is only routed here when nothing on screen holds focus.
  // Where the user was up to, if it is recent enough to be worth offering.
  const readingPositions = useReadingStore((state) => state.positions);
  const resumable = useMemo(
    () => getResumable(readingPositions),
    [readingPositions]
  );
  const resume = useCallback(() => {
    if (!resumable) return;
    // The key is a tefila id, or the comma-joined list of a daven flow.
    if (resumable.key.includes(",")) {
      router.push({
        pathname: "/siddur/daven",
        params: { tefilaIds: resumable.key, resume: "1" },
      });
    } else {
      router.push({
        pathname: "/siddur/[tefilaId]",
        params: { tefilaId: resumable.key, resume: "1" },
      });
    }
  }, [resumable, router]);

  useKeyHandler({ defaultAction: startDavening });

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
        {/* Next zman card */}
        {nextZman && (
          <View
            style={{
              marginHorizontal: 16,
              marginTop: 16,
              padding: 16,
              backgroundColor: colors.surface,
              borderRadius: radius.md,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                marginBottom: 4,
              }}
            >
              <HebrewText style={{ fontSize: typeScale.caption, color: colors.textMuted }}>
                הזמן הבא
              </HebrewText>
              <Text style={{ fontSize: typeScale.caption, color: colors.textMuted }}>
                Next Zman
              </Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Bilingual
                he={ZMAN_NAMES[nextZman.key]?.he ?? ""}
                en={ZMAN_NAMES[nextZman.key]?.en ?? nextZman.key}
                align="right"
                numberOfLines={1}
                style={{ flex: 1 }}
              />
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ fontSize: typeScale.title, fontWeight: "600", color: colors.text }}>
                  {formatZmanTime(nextZman.time, timeFormat, timeZone)}
                </Text>
                <Text style={{ fontSize: typeScale.body, fontWeight: "600", color: colors.accent, marginTop: 2 }}>
                  in {formatCountdown(countdown)}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* What's different about today's davening */}
        {(dayDavening.specialDayLabel ||
          dayDavening.activeInsertions.length > 0) && (
          <View
            style={{
              marginHorizontal: 16,
              marginTop: 16,
              padding: 16,
              backgroundColor: colors.surface,
              borderRadius: radius.md,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                marginBottom: 8,
              }}
            >
              <HebrewText style={{ fontSize: typeScale.caption, color: colors.textMuted }}>
                היום
              </HebrewText>
              <Text style={{ fontSize: typeScale.caption, color: colors.textMuted }}>
                Today
              </Text>
            </View>

            {dayDavening.specialDayLabel ? (
              <Text
                style={{
                  fontSize: typeScale.title,
                  fontWeight: "600",
                  color: colors.text,
                  marginBottom: 8,
                }}
              >
                {dayDavening.specialDayLabel}
              </Text>
            ) : null}

            <View style={{ flexDirection: "row", gap: 16, marginBottom: 10 }}>
              <Text style={{ fontSize: typeScale.body, color: colors.textSecondary }}>
                Tachanun: {describeTachanun(dayDavening.sayTachanun)}
              </Text>
              {dayDavening.hallelType !== "none" && (
                <Text style={{ fontSize: typeScale.body, color: colors.textSecondary }}>
                  Hallel:{" "}
                  {dayDavening.hallelType === "full" ? "Full" : "Half"}
                </Text>
              )}
            </View>

            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
              {dayDavening.activeInsertions.map((ins) => (
                <View
                  key={ins.name}
                  style={{
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: radius.sm,
                    backgroundColor: colors.primaryLight,
                    borderWidth: 1,
                    borderColor: colors.border,
                  }}
                >
                  <Text style={{ fontSize: typeScale.caption, color: colors.text }}>
                    {ins.name}
                  </Text>
                </View>
              ))}
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
              <Focusable
                key={category.id}
                accessibilityRole="button"
                accessibilityLabel={`${category.name} — ${tefilos.length} tefilos`}
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
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 20,
                  paddingVertical: 16,
                  borderBottomWidth: index < mainCategories.length - 1 ? 1 : 0,
                  borderBottomColor: colors.border,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <Bilingual
                    he={category.nameHe}
                    en={category.name}
                    align="right"
                    numberOfLines={1}
                    style={{ flex: 1 }}
                  />
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={colors.textMuted}
                />
              </Focusable>
            );
          })}
        </View>

        {/* Browse all */}
        <Focusable
          onPress={() => router.push("/siddur/browse")}
          accessibilityRole="button"
          accessibilityLabel="Browse all tefilos"
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: colors.surface,
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderColor: colors.border,
            marginTop: 16,
            paddingHorizontal: 20,
            paddingVertical: 16,
          }}
        >
          <View
            style={{ flex: 1, flexDirection: "row", alignItems: "center", gap: 8 }}
          >
            <Bilingual
              he="כל התפילות"
              en="All Tefilos"
              align="right"
              numberOfLines={1}
              style={{ flex: 1 }}
            />
          </View>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={colors.textMuted}
          />
        </Focusable>

        {/* Start davening shortcut */}
        {tefilosForTime.length > 0 && (
          <Focusable
            autoFocus
            accessibilityRole="button"
            accessibilityLabel="Start davening"
            onPress={startDavening}
            style={{
              alignItems: "center",
              backgroundColor: colors.primary,
              borderRadius: radius.md,
              marginTop: 20,
              marginHorizontal: 16,
              paddingVertical: 16,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <HebrewText
                bold
                style={{ fontSize: typeScale.display, color: colors.onPrimary }}
              >
                הַתְחֵל
              </HebrewText>
              <Text
                style={{
                  fontSize: typeScale.caption,
                  color: colors.onPrimary,
                  opacity: 0.85,
                  marginTop: 1,
                }}
              >
                Start Davening
              </Text>
            </View>
          </Focusable>
        )}

        {resumable && (
          <Focusable
            onPress={resume}
            accessibilityRole="button"
            accessibilityLabel={`Resume at ${resumable.position.sectionTitle}`}
            style={{
              alignItems: "center",
              backgroundColor: colors.surfaceSecondary,
              borderRadius: radius.sm,
              marginTop: 8,
              marginHorizontal: 16,
              paddingVertical: 10,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <HebrewText bold style={{ fontSize: typeScale.body, color: colors.primary }}>
                הַמְשֵׁךְ
              </HebrewText>
              <Text style={{ fontSize: typeScale.caption, color: colors.textSecondary }}>
                Resume · {resumable.position.sectionTitle}
              </Text>
            </View>
          </Focusable>
        )}
      </ScrollView>
    </View>
  );
}
