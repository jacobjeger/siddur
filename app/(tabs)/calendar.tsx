import { useMemo } from "react";
import { View, Text, ScrollView } from "react-native";
import { JewishCalendar, HebrewDateFormatter } from "kosher-zmanim";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../src/hooks/useTheme";
import { useZmanim } from "../../src/hooks/useZmanim";
import { useSettingsStore } from "../../src/stores/useSettingsStore";
import { formatZmanTime } from "../../src/utils/timeFormatting";

const hebrewFormatter = new HebrewDateFormatter();
hebrewFormatter.setHebrewFormat(true);

const englishFormatter = new HebrewDateFormatter();
englishFormatter.setHebrewFormat(false);

interface CalendarEvent {
  label: string;
  labelHe: string;
  detail?: string;
  icon: string;
  color?: string;
}

// Month names in Hebrew
const HEBREW_MONTHS: Record<number, { en: string; he: string }> = {
  1: { en: "Nissan", he: "ניסן" },
  2: { en: "Iyar", he: "אייר" },
  3: { en: "Sivan", he: "סיון" },
  4: { en: "Tammuz", he: "תמוז" },
  5: { en: "Av", he: "אב" },
  6: { en: "Elul", he: "אלול" },
  7: { en: "Tishrei", he: "תשרי" },
  8: { en: "Cheshvan", he: "חשוון" },
  9: { en: "Kislev", he: "כסלו" },
  10: { en: "Teves", he: "טבת" },
  11: { en: "Shevat", he: "שבט" },
  12: { en: "Adar", he: "אדר" },
  13: { en: "Adar II", he: "אדר ב׳" },
};

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Shabbos"];
const DAY_NAMES_HE = ["יום ראשון", "יום שני", "יום שלישי", "יום רביעי", "יום חמישי", "יום שישי", "שבת"];

export default function CalendarTab() {
  const { colors } = useTheme();
  const { zmanim } = useZmanim();
  const { timeFormat, candleLightingOffset } = useSettingsStore();

  const calendarData = useMemo(() => {
    const now = new Date();
    const cal = new JewishCalendar(now);

    // Basic date info
    const hebrewDate = hebrewFormatter.format(cal);
    const jewishDay = cal.getJewishDayOfMonth();
    const jewishMonth = cal.getJewishMonth();
    const jewishYear = cal.getJewishYear();
    const dayOfWeek = cal.getDayOfWeek(); // 1=Sun, 7=Shabbos
    const dayName = DAY_NAMES[dayOfWeek - 1] ?? "";
    const dayNameHe = DAY_NAMES_HE[dayOfWeek - 1] ?? "";
    const monthInfo = HEBREW_MONTHS[jewishMonth] ?? { en: "", he: "" };

    // Parsha
    let parsha = "";
    let parshaHe = "";
    try {
      parsha = englishFormatter.formatParsha(cal) || "";
      parshaHe = hebrewFormatter.formatParsha(cal) || "";
    } catch { /* not Shabbos */ }

    // If not Shabbos, get upcoming parsha
    let upcomingParsha = parsha;
    let upcomingParshaHe = parshaHe;
    if (!parsha) {
      try {
        const upcoming = cal.getUpcomingParsha();
        if (upcoming) {
          // Create a temporary formatter to get the text
          upcomingParsha = englishFormatter.formatParsha(cal) || "";
          upcomingParshaHe = hebrewFormatter.formatParsha(cal) || "";
        }
      } catch { /* skip */ }
      // Fallback: manually step forward to Shabbos
      if (!upcomingParsha) {
        try {
          const tempCal = new JewishCalendar(now);
          const daysUntilShabbos = dayOfWeek === 7 ? 7 : 7 - dayOfWeek;
          const shabbosDate = new Date(now);
          shabbosDate.setDate(shabbosDate.getDate() + daysUntilShabbos);
          const shabbosCal = new JewishCalendar(shabbosDate);
          upcomingParsha = englishFormatter.formatParsha(shabbosCal) || "";
          upcomingParshaHe = hebrewFormatter.formatParsha(shabbosCal) || "";
        } catch { /* skip */ }
      }
    }

    // Special day / Yom Tov
    let specialDay = "";
    try {
      specialDay = englishFormatter.formatYomTov(cal) || "";
    } catch { /* none */ }

    // Omer
    let omerDay = -1;
    try {
      omerDay = cal.getDayOfOmer();
    } catch { /* not in omer season */ }

    // Days until Shabbos
    const daysUntilShabbos = dayOfWeek === 7 ? 0 : 7 - dayOfWeek;

    // Is today erev Shabbos?
    const isErevShabbos = dayOfWeek === 6;

    // Rosh Chodesh info
    const isRoshChodesh = cal.isRoshChodesh();
    const isErevRoshChodesh = cal.isErevRoshChodesh();

    // Candle lighting (Friday) — use sunset minus offset
    let candleLightingTime: string | null = null;
    if (isErevShabbos && zmanim?.sunset) {
      const offset = candleLightingOffset ?? 18;
      const candleTime = new Date(zmanim.sunset.getTime() - offset * 60 * 1000);
      candleLightingTime = formatZmanTime(candleTime, timeFormat);
    }

    // Upcoming events
    const events: CalendarEvent[] = [];

    if (specialDay) {
      events.push({
        label: specialDay,
        labelHe: "",
        icon: "star",
        color: colors.accent,
      });
    }

    if (isRoshChodesh) {
      events.push({
        label: "Rosh Chodesh",
        labelHe: "ראש חודש",
        icon: "moon",
        color: colors.primary,
      });
    }

    if (cal.isChanukah()) {
      const dayOfChanukah = cal.getDayOfChanukah();
      events.push({
        label: `Chanukah — Day ${dayOfChanukah}`,
        labelHe: `חנוכה — נר ${dayOfChanukah}`,
        detail: dayOfChanukah === 8 ? "Zos Chanukah" : undefined,
        icon: "flame",
        color: "#E8A317",
      });
    }

    if (cal.isTaanis() && !cal.isYomKippur()) {
      events.push({
        label: "Fast Day",
        labelHe: "יום צום",
        icon: "water",
        color: colors.textMuted,
      });
    }

    if (cal.isCholHamoed()) {
      events.push({
        label: "Chol HaMoed",
        labelHe: "חול המועד",
        icon: "leaf",
        color: "#4CAF50",
      });
    }

    if (omerDay > 0) {
      const weeks = Math.floor(omerDay / 7);
      const days = omerDay % 7;
      let omerDetail = `Day ${omerDay}`;
      if (weeks > 0 && days > 0) {
        omerDetail += ` (${weeks} week${weeks > 1 ? "s" : ""}, ${days} day${days > 1 ? "s" : ""})`;
      } else if (weeks > 0) {
        omerDetail += ` (${weeks} week${weeks > 1 ? "s" : ""})`;
      }
      events.push({
        label: "Sefirat HaOmer",
        labelHe: "ספירת העומר",
        detail: omerDetail,
        icon: "trending-up",
        color: "#9C27B0",
      });
    }

    if (isErevShabbos) {
      events.push({
        label: "Erev Shabbos",
        labelHe: "ערב שבת",
        detail: candleLightingTime
          ? `Candle lighting: ${candleLightingTime}`
          : undefined,
        icon: "flame",
        color: colors.accent,
      });
    }

    if (isErevRoshChodesh && !isRoshChodesh) {
      events.push({
        label: "Erev Rosh Chodesh",
        labelHe: "ערב ראש חודש",
        icon: "moon",
      });
    }

    // Daf Yomi
    let dafYomi = "";
    try {
      const daf = cal.getDafYomiBavli();
      if (daf) {
        dafYomi = englishFormatter.formatDafYomiBavli(daf) || "";
      }
    } catch { /* skip */ }

    // Upcoming Shabbos info
    const upcomingShabbosInfo = daysUntilShabbos > 0 && daysUntilShabbos <= 6
      ? `in ${daysUntilShabbos} day${daysUntilShabbos > 1 ? "s" : ""}`
      : dayOfWeek === 7 ? "Today" : "";

    return {
      hebrewDate,
      jewishDay,
      jewishMonth,
      jewishYear,
      monthInfo,
      dayName,
      dayNameHe,
      parsha,
      parshaHe,
      upcomingParsha,
      upcomingParshaHe,
      specialDay,
      omerDay,
      events,
      dafYomi,
      daysUntilShabbos,
      upcomingShabbosInfo,
      candleLightingTime,
      isErevShabbos,
    };
  }, [zmanim, timeFormat, candleLightingOffset, colors]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header */}
      <View
        style={{
          backgroundColor: colors.headerBg,
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 20,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "NotoSerifHebrew-Bold",
            fontSize: 28,
            color: "#ffffff",
          }}
        >
          {calendarData.hebrewDate}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.7)",
            marginTop: 6,
          }}
        >
          {calendarData.dayName} — {calendarData.dayNameHe}
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      >
        {/* Parsha card */}
        {calendarData.upcomingParsha ? (
          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: colors.border,
              padding: 16,
              marginBottom: 16,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
              <Ionicons name="book-outline" size={18} color={colors.accent} />
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "600",
                  color: colors.textMuted,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                  marginLeft: 8,
                }}
              >
                {calendarData.parsha ? "This Week's Parsha" : "Upcoming Parsha"}
              </Text>
            </View>
            <Text style={{ fontSize: 20, fontWeight: "700", color: colors.text }}>
              Parashat {calendarData.upcomingParsha}
            </Text>
            {calendarData.upcomingParshaHe ? (
              <Text
                style={{
                  fontSize: 18,
                  color: colors.accent,
                  fontFamily: "NotoSerifHebrew-Bold",
                  marginTop: 4,
                }}
              >
                פרשת {calendarData.upcomingParshaHe}
              </Text>
            ) : null}
            {calendarData.upcomingShabbosInfo && !calendarData.parsha ? (
              <Text style={{ fontSize: 13, color: colors.textMuted, marginTop: 6 }}>
                Shabbos {calendarData.upcomingShabbosInfo}
              </Text>
            ) : null}
          </View>
        ) : null}

        {/* Events / Today's Info */}
        {calendarData.events.length > 0 && (
          <View style={{ marginBottom: 16 }}>
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
              Today
            </Text>
            <View
              style={{
                backgroundColor: colors.surface,
                borderRadius: 14,
                borderWidth: 1,
                borderColor: colors.border,
                overflow: "hidden",
              }}
            >
              {calendarData.events.map((event, i) => (
                <View
                  key={event.label}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    borderBottomWidth: i < calendarData.events.length - 1 ? 1 : 0,
                    borderBottomColor: colors.border,
                  }}
                >
                  <View
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      backgroundColor: (event.color ?? colors.textMuted) + "18",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 12,
                    }}
                  >
                    <Ionicons
                      name={event.icon as any}
                      size={18}
                      color={event.color ?? colors.textMuted}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Text style={{ fontSize: 16, fontWeight: "600", color: colors.text }}>
                        {event.label}
                      </Text>
                      {event.labelHe ? (
                        <Text
                          style={{
                            fontSize: 14,
                            color: colors.textMuted,
                            fontFamily: "NotoSerifHebrew-Regular",
                            marginLeft: 8,
                          }}
                        >
                          {event.labelHe}
                        </Text>
                      ) : null}
                    </View>
                    {event.detail && (
                      <Text style={{ fontSize: 13, color: colors.textSecondary, marginTop: 2 }}>
                        {event.detail}
                      </Text>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Month info */}
        <View style={{ marginBottom: 16 }}>
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
            Jewish Date Details
          </Text>
          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: colors.border,
              overflow: "hidden",
            }}
          >
            <InfoRow
              label="Day"
              value={`${calendarData.jewishDay}`}
              icon="calendar-outline"
              colors={colors}
              showBorder
            />
            <InfoRow
              label="Month"
              value={`${calendarData.monthInfo.en} — ${calendarData.monthInfo.he}`}
              icon="calendar"
              colors={colors}
              showBorder
            />
            <InfoRow
              label="Year"
              value={`${calendarData.jewishYear}`}
              icon="time-outline"
              colors={colors}
              showBorder={!!calendarData.dafYomi}
            />
            {calendarData.dafYomi ? (
              <InfoRow
                label="Daf Yomi"
                value={calendarData.dafYomi}
                icon="document-text-outline"
                colors={colors}
                showBorder={false}
              />
            ) : null}
          </View>
        </View>

        {/* Candle lighting (erev Shabbos) */}
        {calendarData.isErevShabbos && calendarData.candleLightingTime && (
          <View style={{ marginBottom: 16 }}>
            <View
              style={{
                backgroundColor: colors.accent + "15",
                borderRadius: 14,
                borderWidth: 1,
                borderColor: colors.accent + "40",
                padding: 16,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: colors.accent + "25",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 14,
                }}
              >
                <Ionicons name="flame" size={24} color={colors.accent} />
              </View>
              <View>
                <Text style={{ fontSize: 14, color: colors.textSecondary }}>
                  Candle Lighting
                </Text>
                <Text style={{ fontSize: 22, fontWeight: "700", color: colors.text }}>
                  {calendarData.candleLightingTime}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Upcoming dates */}
        <UpcomingDatesSection colors={colors} />
      </ScrollView>
    </View>
  );
}

function InfoRow({
  label,
  value,
  icon,
  colors,
  showBorder,
}: {
  label: string;
  value: string;
  icon: string;
  colors: any;
  showBorder: boolean;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: showBorder ? 1 : 0,
        borderBottomColor: colors.border,
      }}
    >
      <Ionicons name={icon as any} size={18} color={colors.textMuted} style={{ marginRight: 12 }} />
      <Text style={{ fontSize: 14, color: colors.textMuted, width: 80 }}>{label}</Text>
      <Text style={{ fontSize: 15, fontWeight: "500", color: colors.text, flex: 1 }}>{value}</Text>
    </View>
  );
}

/** Shows upcoming Rosh Chodesh, holidays, and fast days */
function UpcomingDatesSection({ colors }: { colors: any }) {
  const upcoming = useMemo(() => {
    const events: Array<{ label: string; labelHe: string; date: string; daysAway: number; icon: string }> = [];
    const now = new Date();
    const today = new JewishCalendar(now);
    const todayDow = today.getDayOfWeek();

    // Scan ahead up to 60 days
    for (let i = 1; i <= 60; i++) {
      const futureDate = new Date(now);
      futureDate.setDate(futureDate.getDate() + i);
      const cal = new JewishCalendar(futureDate);

      let label = "";
      let labelHe = "";
      let icon = "calendar-outline";

      // Rosh Chodesh
      if (cal.isRoshChodesh()) {
        const month = HEBREW_MONTHS[cal.getJewishMonth()];
        label = `Rosh Chodesh ${month?.en ?? ""}`;
        labelHe = `ראש חודש ${month?.he ?? ""}`;
        icon = "moon";
      }

      // Major holidays
      try {
        const yomTov = new HebrewDateFormatter();
        yomTov.setHebrewFormat(false);
        const name = yomTov.formatYomTov(cal) || "";
        if (name && !label) {
          label = name;
          icon = "star";
        }
      } catch { /* not a yom tov */ }

      // Fast days
      if (cal.isTaanis() && !label) {
        try {
          const fmt = new HebrewDateFormatter();
          fmt.setHebrewFormat(false);
          label = fmt.formatYomTov(cal) || "Fast Day";
          icon = "water";
        } catch {
          label = "Fast Day";
          icon = "water";
        }
      }

      if (label && !events.some((e) => e.label === label)) {
        const dateStr = new HebrewDateFormatter();
        dateStr.setHebrewFormat(true);
        let hebrewDateStr = "";
        try {
          hebrewDateStr = dateStr.format(cal);
        } catch { /* skip */ }

        events.push({
          label,
          labelHe,
          date: hebrewDateStr,
          daysAway: i,
          icon,
        });
      }

      if (events.length >= 8) break;
    }

    return events;
  }, []);

  if (upcoming.length === 0) return null;

  return (
    <View style={{ marginBottom: 16 }}>
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
        Upcoming
      </Text>
      <View
        style={{
          backgroundColor: colors.surface,
          borderRadius: 14,
          borderWidth: 1,
          borderColor: colors.border,
          overflow: "hidden",
        }}
      >
        {upcoming.map((event, i) => (
          <View
            key={`${event.label}-${event.daysAway}`}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderBottomWidth: i < upcoming.length - 1 ? 1 : 0,
              borderBottomColor: colors.border,
            }}
          >
            <Ionicons
              name={event.icon as any}
              size={18}
              color={colors.textMuted}
              style={{ marginRight: 12 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: "500", color: colors.text }}>
                {event.label}
              </Text>
              {event.date ? (
                <Text
                  style={{
                    fontSize: 13,
                    color: colors.textMuted,
                    fontFamily: "NotoSerifHebrew-Regular",
                    marginTop: 1,
                  }}
                >
                  {event.date}
                </Text>
              ) : null}
            </View>
            <View
              style={{
                backgroundColor: colors.primary + "15",
                borderRadius: 10,
                paddingHorizontal: 8,
                paddingVertical: 3,
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: "600", color: colors.primary }}>
                {event.daysAway === 1 ? "Tomorrow" : `${event.daysAway} days`}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
