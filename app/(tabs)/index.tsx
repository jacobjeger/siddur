import { useMemo } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { HebrewDateHeader } from "../../src/components/common/HebrewDateHeader";
import { LocationDisplay } from "../../src/components/common/LocationDisplay";
import { useHebrewDate } from "../../src/hooks/useHebrewDate";
import { useNextZman } from "../../src/hooks/useNextZman";
import { useSettingsStore } from "../../src/stores/useSettingsStore";
import { useTheme } from "../../src/hooks/useTheme";
import {
  useSiddurDb,
  getAvailableServices,
} from "../../src/services/database";
import { ZMAN_NAMES } from "../../src/utils/constants";
import { formatZmanTime, formatCountdown } from "../../src/utils/timeFormatting";
import { getInsertionContext } from "../../src/utils/jewishCalendar";
import { getDayDaveningInfo, getSmartDavenFlow } from "../../src/utils/smartDaven";

export default function SiddurTab() {
  const { tefilaType } = useHebrewDate();
  const { nextZman, countdown } = useNextZman();
  const { timeFormat, nusach } = useSettingsStore();
  const router = useRouter();
  const { colors } = useTheme();
  const { isReady: dbReady } = useSiddurDb();

  const currentService = tefilaType === "none" ? "shacharis" : tefilaType;

  // Calendar-aware day info
  const insertionContext = useMemo(() => getInsertionContext(), []);
  const dayInfo = useMemo(
    () => getDayDaveningInfo(insertionContext),
    [insertionContext]
  );

  // Smart davening flow
  const davenFlow = useMemo(
    () => getSmartDavenFlow(nusach, currentService as any, dayInfo),
    [nusach, currentService, dayInfo]
  );

  // Quick-access services
  const quickAccess = useMemo(() => {
    if (!dbReady) return [];
    const all = getAvailableServices(nusach);
    return all.filter(
      (s) =>
        s.key === "birkasHamazon" ||
        s.key === "kaddish" ||
        s.key === "bedtimeShema" ||
        s.key === "tefilasHaderech"
    );
  }, [dbReady, nusach]);

  const handleStartDavening = () => {
    if (davenFlow.useMultiMode) {
      // Multi-service: use daven screen
      const ids = davenFlow.serviceKeys
        .map((k) => `dbservice:${k}`)
        .join(",");
      router.push({
        pathname: "/siddur/daven",
        params: { tefilaIds: ids },
      });
    } else {
      // Single service
      router.push({
        pathname: "/siddur/[tefilaId]",
        params: { tefilaId: `dbservice:${davenFlow.serviceKeys[0]}` },
      });
    }
  };

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
                {davenFlow.title}
              </Text>
              <Text
                style={{
                  fontSize: 22,
                  color: colors.accent,
                  marginLeft: 12,
                  fontFamily: "NotoSerifHebrew-Bold",
                }}
              >
                {davenFlow.titleHe}
              </Text>
            </View>
            {dayInfo.specialDayLabel !== "" && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 8,
                  backgroundColor: "rgba(255,255,255,0.15)",
                  alignSelf: "flex-start",
                  borderRadius: 8,
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                }}
              >
                <Ionicons name="calendar" size={14} color={colors.accent} />
                <Text style={{ fontSize: 13, color: "#ffffff", fontWeight: "600", marginLeft: 6 }}>
                  {dayInfo.specialDayLabel}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: colors.accent,
                    fontFamily: "NotoSerifHebrew-Bold",
                    marginLeft: 8,
                  }}
                >
                  {dayInfo.specialDayLabelHe}
                </Text>
              </View>
            )}
          </View>

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

          <TouchableOpacity
            onPress={handleStartDavening}
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

        {/* Today's davening info — insertions, tachanun, hallel */}
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
            Today's Davening
          </Text>
          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: colors.border,
              padding: 14,
            }}
          >
            {/* Tachanun & Hallel row */}
            <View style={{ flexDirection: "row", gap: 16, marginBottom: dayInfo.activeInsertions.length > 0 ? 12 : 0 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name={dayInfo.sayTachanun ? "checkmark-circle" : "close-circle"}
                  size={16}
                  color={dayInfo.sayTachanun ? colors.accent : colors.textMuted}
                />
                <Text style={{ fontSize: 13, color: colors.textSecondary, marginLeft: 4 }}>
                  {dayInfo.sayTachanun ? "Tachanun" : "No Tachanun"}
                </Text>
              </View>
              {dayInfo.hallelType !== "none" && (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="musical-notes" size={16} color={colors.accent} />
                  <Text style={{ fontSize: 13, color: colors.textSecondary, marginLeft: 4 }}>
                    {dayInfo.hallelType === "full" ? "Full Hallel" : "Half Hallel"}
                  </Text>
                </View>
              )}
            </View>

            {/* Active insertions badges */}
            {dayInfo.activeInsertions.length > 0 && (
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 6,
                }}
              >
                {dayInfo.activeInsertions.map((ins) => (
                  <View
                    key={ins.name}
                    style={{
                      backgroundColor: colors.accent + "18",
                      borderRadius: 8,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontSize: 12, color: colors.accent, fontWeight: "600" }}>
                      {ins.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: colors.accent,
                        fontFamily: "NotoSerifHebrew-Bold",
                        marginLeft: 6,
                        opacity: 0.8,
                      }}
                    >
                      {ins.nameHe}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Quick Access */}
        {dbReady && quickAccess.length > 0 && (
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
              Quick Access
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
              {quickAccess.map((service, index) => (
                <TouchableOpacity
                  key={service.key}
                  onPress={() =>
                    router.push({
                      pathname: "/siddur/[tefilaId]",
                      params: { tefilaId: `dbservice:${service.key}` },
                    })
                  }
                  activeOpacity={0.6}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    borderBottomWidth: index < quickAccess.length - 1 ? 1 : 0,
                    borderBottomColor: colors.border,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: "500", color: colors.text }}>
                      {service.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: colors.textMuted,
                        marginTop: 2,
                        fontFamily: "NotoSerifHebrew-Regular",
                      }}
                    >
                      {service.nameHe}
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
