import { useMemo } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LocationDisplay } from "../../src/components/common/LocationDisplay";
import { useHebrewDate } from "../../src/hooks/useHebrewDate";
import { useZmanim } from "../../src/hooks/useZmanim";
import { useLocationStore } from "../../src/stores/useLocationStore";
import { useSettingsStore } from "../../src/stores/useSettingsStore";
import { useTheme } from "../../src/hooks/useTheme";
import { Card, InfoRow } from "../../src/components/common/ui";
import { HebrewText } from "../../src/components/common/HebrewText";
import { radius } from "../../src/theme/tokens";
import {
  getUpcomingEvents,
  getMolad,
} from "../../src/services/zmanim/hebrewCalendarService";
import { formatZmanTime } from "../../src/utils/timeFormatting";
import { toHebrewNumeral } from "../../src/utils/hebrewNumbers";

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Shabbos",
];
const SPECIAL_SHABBOS_LABELS: Record<string, { en: string; he: string }> = {
  shkalim: { en: "Shkalim", he: "שקלים" },
  zachor: { en: "Zachor", he: "זכור" },
  parah: { en: "Parah", he: "פרה" },
  hachodesh: { en: "HaChodesh", he: "החודש" },
  shuva: { en: "Shuva", he: "שובה" },
  shira: { en: "Shira", he: "שירה" },
  hagadol: { en: "HaGadol", he: "הגדול" },
  chazon: { en: "Chazon", he: "חזון" },
  nachamu: { en: "Nachamu", he: "נחמו" },
};

const DAY_NAMES_HE = [
  "יום ראשון",
  "יום שני",
  "יום שלישי",
  "יום רביעי",
  "יום חמישי",
  "יום שישי",
  "שבת",
];

export default function CalendarTab() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const hebrew = useHebrewDate();
  const { zmanim, refresh } = useZmanim();
  const timeZone = useLocationStore((s) => s.location?.timezone);
  const timeFormat = useSettingsStore((s) => s.timeFormat);

  // `hebrew` already re-derives at midnight (useZmanim drives it off an
  // AppState + interval day key), so deriving the day index from it keeps this
  // screen from freezing at whatever date it happened to mount on.
  const dayIndex = new Date().getDay();

  const upcoming = useMemo(
    () => getUpcomingEvents(new Date(), hebrew.options),
    [hebrew.options]
  );
  const molad = useMemo(
    () => getMolad(new Date(), hebrew.options),
    [hebrew.options]
  );

  const d = hebrew.dayDavening;

  // Previously ~76 lines of imperative pushes in the render body, re-running on
  // every render.
  const todayEvents = useMemo(() => {
    const events: {
      label: string;
      labelHe: string;
      icon: keyof typeof Ionicons.glyphMap;
    }[] = [];
    const add = (
      when: boolean,
      label: string,
      labelHe: string,
      icon: keyof typeof Ionicons.glyphMap
    ) => {
      if (when) events.push({ label, labelHe, icon });
    };

    add(
      Boolean(hebrew.specialDay),
      hebrew.specialDay,
      d.specialDayLabelHe,
      "star"
    );
    add(
      hebrew.isRoshChodesh && !hebrew.specialDay,
      "Rosh Chodesh",
      "ראש חודש",
      "moon"
    );
    add(
      hebrew.omerDay > 0,
      `Sefiras HaOmer — Day ${hebrew.omerDay}`,
      `ספירת העומר — יום ${toHebrewNumeral(hebrew.omerDay)}`,
      "leaf"
    );
    add(hebrew.isFastDay, "Fast Day", "יום צום", "water");

    if (d.specialShabbos) {
      // The map covers the nine known parshiyos; an unmapped key must not
      // crash the tab, so fall back to the raw id.
      const special = SPECIAL_SHABBOS_LABELS[d.specialShabbos];
      add(
        true,
        `Shabbos ${special?.en ?? d.specialShabbos}`,
        special ? `שבת ${special.he}` : "",
        "bookmark"
      );
    }

    add(d.isYizkor, "Yizkor", "יזכור", "flower");
    add(d.bircasHaChodesh.said, "Bircas HaChodesh", "ברכת החודש", "moon");
    add(d.isBaHab, "Ba'Hab", 'בה"ב', "water");
    add(d.isYomKippurKatan, "Yom Kippur Katan", "יום כיפור קטן", "moon");
    add(d.isEruvTavshilin, "Eruv Tavshilin", "עירוב תבשילין", "restaurant");
    add(
      d.isBedikasChometzNight,
      "Bedikas Chometz tonight",
      "בדיקת חמץ",
      "flashlight"
    );
    add(d.isTaanisBechoros, "Taanis Bechoros", "תענית בכורות", "water");

    return events;
  }, [hebrew, d]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View
        style={{
          backgroundColor: colors.headerBg,
          paddingHorizontal: 20,
          paddingTop: insets.top + 16,
          paddingBottom: 20,
          alignItems: "center",
        }}
      >
        <HebrewText
          bold
          style={{ fontSize: 26, color: "#ffffff", textAlign: "center" }}
        >
          {hebrew.hebrewDate}
        </HebrewText>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            marginTop: 6,
          }}
        >
          <Text style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>
            {DAY_NAMES[dayIndex]}
          </Text>
          <HebrewText
            style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}
          >
            {DAY_NAMES_HE[dayIndex]}
          </HebrewText>
        </View>
      </View>

      <LocationDisplay />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={refresh}
            tintColor={colors.primary}
          />
        }
      >
        {(hebrew.parsha || hebrew.upcomingParsha) && (
          <Card
            icon="book-outline"
            title={hebrew.parsha ? "This Week's Parsha" : "Upcoming Parsha"}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "700", color: colors.text }}
            >
              {hebrew.parsha || hebrew.upcomingParsha}
            </Text>
          </Card>
        )}

        {todayEvents.length > 0 && (
          <Card icon="today-outline" title="Today">
            {todayEvents.map((event, i) => (
              <View
                key={event.label}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 8,
                  borderBottomWidth: i === todayEvents.length - 1 ? 0 : 1,
                  borderBottomColor: colors.border,
                }}
              >
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: colors.accent + "22",
                  }}
                >
                  <Ionicons name={event.icon} size={15} color={colors.accent} />
                </View>
                <View style={{ marginLeft: 10, flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "600",
                      color: colors.text,
                    }}
                  >
                    {event.label}
                  </Text>
                  {event.labelHe ? (
                    <HebrewText
                      style={{ fontSize: 14, color: colors.accent }}
                    >
                      {event.labelHe}
                    </HebrewText>
                  ) : null}
                </View>
              </View>
            ))}
          </Card>
        )}

        <Card icon="information-circle-outline" title="Details">
          <InfoRow
            label="Hebrew date"
            value={hebrew.englishDate}
          />
          {hebrew.dafYomi ? (
            <InfoRow label="Daf Yomi" value={hebrew.dafYomi} />
          ) : null}
          <InfoRow
            label="Hallel"
            value={
              hebrew.dayDavening.hallelType === "none"
                ? "Not said"
                : hebrew.dayDavening.hallelType === "full"
                  ? "Full Hallel"
                  : "Half Hallel"
            }
          />
          <InfoRow
            label="Tachanun"
            value={d.sayTachanun ? "Said" : "Not said"}
          />
          {d.shirShelYom.psalm > 0 && (
            <InfoRow
              label="Shir Shel Yom"
              value={`Tehillim ${d.shirShelYom.psalm}${
                d.shirShelYom.includesPsalm95 ? " + 95:1–3" : ""
              }${d.shirShelYom.addBarchiNafshi ? " + Barchi Nafshi" : ""}`}
            />
          )}
          {d.ldovid.said && (
            <InfoRow
              label="L'Dovid"
              value={d.ldovid.tefillos
                .map((t) => t[0].toUpperCase() + t.slice(1))
                .join(" & ")}
            />
          )}
          {d.pirkeiAvos.said && (
            <InfoRow
              label="Pirkei Avos"
              value={`Chapter ${d.pirkeiAvos.chapter}`}
            />
          )}
          {d.tzidkascha.said && (
            <InfoRow label="Tzidkascha" value="Said at Mincha" />
          )}
          {d.isAvHaRachamim && (
            <InfoRow label="Av HaRachamim" value="Said" />
          )}
          {d.isAvinuMalkeinu && (
            <InfoRow label="Avinu Malkeinu" value="Said" />
          )}
          <InfoRow
            label="Molad"
            value={
              // Prefer the molad being announced today, if any.
              (d.bircasHaChodesh.molad ?? molad)
                ? `${(d.bircasHaChodesh.molad ?? molad)!.toLocaleDateString(
                    "en-US",
                    { month: "short", day: "numeric", timeZone }
                  )}, ${formatZmanTime(
                    d.bircasHaChodesh.molad ?? molad,
                    timeFormat,
                    timeZone
                  )}`
                : "—"
            }
            isLast
          />
        </Card>

        {d.omerText ? (
          <Card icon="leaf-outline" title="Sefiras HaOmer">
            <HebrewText style={{ fontSize: 18, lineHeight: 30 }}>
              {d.omerText}
            </HebrewText>
          </Card>
        ) : null}

        {hebrew.dayDavening.activeInsertions.length > 0 && (
          <Card icon="add-circle-outline" title="Insertions">
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {hebrew.dayDavening.activeInsertions.map((ins) => (
                <View
                  key={ins.name}
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 8,
                    backgroundColor: colors.primaryLight,
                    borderWidth: 1,
                    borderColor: colors.border,
                  }}
                >
                  <Text style={{ fontSize: 13, color: colors.text }}>
                    {ins.name}
                  </Text>
                  <HebrewText style={{ fontSize: 13, color: colors.accent }}>
                    {ins.nameHe}
                  </HebrewText>
                </View>
              ))}
            </View>
          </Card>
        )}

        {(zmanim?.candleLighting || zmanim?.havdala) && (
          <Card icon="flame-outline" title="Shabbos & Yom Tov">
            {zmanim.candleLighting && (
              <InfoRow
                label="Candle lighting"
                value={formatZmanTime(
                  zmanim.candleLighting,
                  timeFormat,
                  timeZone
                )}
                isLast={!zmanim.havdala}
              />
            )}
            {zmanim.havdala && (
              <InfoRow
                label="Havdala"
                value={formatZmanTime(zmanim.havdala, timeFormat, timeZone)}
                isLast
              />
            )}
          </Card>
        )}

        {upcoming.length > 0 && (
          <Card icon="calendar-outline" title="Upcoming">
            {upcoming.map((event, i) => (
              <View
                key={`${event.date.toISOString()}-${event.label}`}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 9,
                  borderBottomWidth: i === upcoming.length - 1 ? 0 : 1,
                  borderBottomColor: colors.border,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "600",
                      color: colors.text,
                    }}
                  >
                    {event.label}
                  </Text>
                  <Text style={{ fontSize: 13, color: colors.textMuted }}>
                    {event.date.toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </Text>
                </View>
                <View
                  style={{
                    paddingHorizontal: 8,
                    paddingVertical: 3,
                    borderRadius: radius.sm,
                    backgroundColor: colors.primaryLight,
                  }}
                >
                  <Text style={{ fontSize: 12, color: colors.textSecondary }}>
                    {event.daysAway === 1 ? "Tomorrow" : `${event.daysAway}d`}
                  </Text>
                </View>
              </View>
            ))}
          </Card>
        )}
      </ScrollView>
    </View>
  );
}
