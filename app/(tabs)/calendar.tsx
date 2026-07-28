import { useMemo } from "react";
import { View, Text, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LocationDisplay } from "../../src/components/common/LocationDisplay";
import { useHebrewDate } from "../../src/hooks/useHebrewDate";
import { useZmanim } from "../../src/hooks/useZmanim";
import { useLocationStore } from "../../src/stores/useLocationStore";
import { useSettingsStore } from "../../src/stores/useSettingsStore";
import { useTheme, type ThemeColors } from "../../src/hooks/useTheme";
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

function Card({
  icon,
  title,
  colors,
  children,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  colors: ThemeColors;
  children: React.ReactNode;
}) {
  return (
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Ionicons name={icon} size={18} color={colors.accent} />
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
          {title}
        </Text>
      </View>
      {children}
    </View>
  );
}

function InfoRow({
  label,
  value,
  colors,
  isLast,
}: {
  label: string;
  value: string;
  colors: ThemeColors;
  isLast?: boolean;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 9,
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: colors.border,
      }}
    >
      <Text style={{ fontSize: 15, color: colors.textSecondary }}>{label}</Text>
      <Text
        style={{
          fontSize: 15,
          fontWeight: "600",
          color: colors.text,
          flexShrink: 1,
          textAlign: "right",
        }}
      >
        {value}
      </Text>
    </View>
  );
}

export default function CalendarTab() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const hebrew = useHebrewDate();
  const { zmanim } = useZmanim();
  const timeZone = useLocationStore((s) => s.location?.timezone);
  const timeFormat = useSettingsStore((s) => s.timeFormat);

  const now = new Date();
  const dayIndex = now.getDay();

  const upcoming = useMemo(
    () => getUpcomingEvents(new Date(), hebrew.options),
    [hebrew.options]
  );
  const molad = useMemo(
    () => getMolad(new Date(), hebrew.options),
    [hebrew.options]
  );

  const todayEvents: { label: string; labelHe: string; icon: keyof typeof Ionicons.glyphMap }[] =
    [];
  if (hebrew.specialDay) {
    todayEvents.push({
      label: hebrew.specialDay,
      labelHe: hebrew.dayDavening.specialDayLabelHe,
      icon: "star",
    });
  }
  if (hebrew.isRoshChodesh && !hebrew.specialDay) {
    todayEvents.push({
      label: "Rosh Chodesh",
      labelHe: "ראש חודש",
      icon: "moon",
    });
  }
  if (hebrew.omerDay > 0) {
    todayEvents.push({
      label: `Sefiras HaOmer — Day ${hebrew.omerDay}`,
      labelHe: `ספירת העומר — יום ${toHebrewNumeral(hebrew.omerDay)}`,
      icon: "leaf",
    });
  }
  if (hebrew.isFastDay) {
    todayEvents.push({ label: "Fast Day", labelHe: "יום צום", icon: "water" });
  }

  const d = hebrew.dayDavening;
  if (d.specialShabbos) {
    todayEvents.push({
      label: `Shabbos ${SPECIAL_SHABBOS_LABELS[d.specialShabbos].en}`,
      labelHe: `שבת ${SPECIAL_SHABBOS_LABELS[d.specialShabbos].he}`,
      icon: "bookmark",
    });
  }
  if (d.isYizkor) {
    todayEvents.push({ label: "Yizkor", labelHe: "יזכור", icon: "flower" });
  }
  if (d.bircasHaChodesh.said) {
    todayEvents.push({
      label: "Bircas HaChodesh",
      labelHe: "ברכת החודש",
      icon: "moon",
    });
  }
  if (d.isBaHab) {
    todayEvents.push({ label: "Ba'Hab", labelHe: 'בה"ב', icon: "water" });
  }
  if (d.isYomKippurKatan) {
    todayEvents.push({
      label: "Yom Kippur Katan",
      labelHe: "יום כיפור קטן",
      icon: "moon",
    });
  }
  if (d.isEruvTavshilin) {
    todayEvents.push({
      label: "Eruv Tavshilin",
      labelHe: "עירוב תבשילין",
      icon: "restaurant",
    });
  }
  if (d.isBedikasChometzNight) {
    todayEvents.push({
      label: "Bedikas Chometz tonight",
      labelHe: "בדיקת חמץ",
      icon: "flashlight",
    });
  }
  if (d.isTaanisBechoros) {
    todayEvents.push({
      label: "Taanis Bechoros",
      labelHe: "תענית בכורות",
      icon: "water",
    });
  }

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
        <Text
          style={{
            fontFamily: "NotoSerifHebrew-Bold",
            fontSize: 26,
            color: "#ffffff",
            textAlign: "center",
          }}
        >
          {hebrew.hebrewDate}
        </Text>
        <Text
          style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", marginTop: 6 }}
        >
          {DAY_NAMES[dayIndex]} — {DAY_NAMES_HE[dayIndex]}
        </Text>
      </View>

      <LocationDisplay />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      >
        {(hebrew.parsha || hebrew.upcomingParsha) && (
          <Card
            icon="book-outline"
            title={hebrew.parsha ? "This Week's Parsha" : "Upcoming Parsha"}
            colors={colors}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "700", color: colors.text }}
            >
              {hebrew.parsha || hebrew.upcomingParsha}
            </Text>
          </Card>
        )}

        {todayEvents.length > 0 && (
          <Card icon="today-outline" title="Today" colors={colors}>
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
                    <Text
                      style={{
                        fontSize: 14,
                        color: colors.accent,
                        fontFamily: "NotoSerifHebrew-Regular",
                      }}
                    >
                      {event.labelHe}
                    </Text>
                  ) : null}
                </View>
              </View>
            ))}
          </Card>
        )}

        <Card icon="information-circle-outline" title="Details" colors={colors}>
          <InfoRow
            label="Hebrew date"
            value={hebrew.englishDate}
            colors={colors}
          />
          {hebrew.dafYomi ? (
            <InfoRow label="Daf Yomi" value={hebrew.dafYomi} colors={colors} />
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
            colors={colors}
          />
          <InfoRow
            label="Tachanun"
            value={d.sayTachanun ? "Said" : "Not said"}
            colors={colors}
          />
          {d.shirShelYom.psalm > 0 && (
            <InfoRow
              label="Shir Shel Yom"
              value={`Tehillim ${d.shirShelYom.psalm}${
                d.shirShelYom.includesPsalm95 ? " + 95:1–3" : ""
              }${d.shirShelYom.addBarchiNafshi ? " + Barchi Nafshi" : ""}`}
              colors={colors}
            />
          )}
          {d.ldovid.said && (
            <InfoRow
              label="L'Dovid"
              value={d.ldovid.tefillos
                .map((t) => t[0].toUpperCase() + t.slice(1))
                .join(" & ")}
              colors={colors}
            />
          )}
          {d.pirkeiAvos.said && (
            <InfoRow
              label="Pirkei Avos"
              value={`Chapter ${d.pirkeiAvos.chapter}`}
              colors={colors}
            />
          )}
          {d.tzidkascha.said && (
            <InfoRow label="Tzidkascha" value="Said at Mincha" colors={colors} />
          )}
          {d.isAvHaRachamim && (
            <InfoRow label="Av HaRachamim" value="Said" colors={colors} />
          )}
          {d.isAvinuMalkeinu && (
            <InfoRow label="Avinu Malkeinu" value="Said" colors={colors} />
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
            colors={colors}
            isLast
          />
        </Card>

        {d.omerText ? (
          <Card icon="leaf-outline" title="Sefiras HaOmer" colors={colors}>
            <Text
              style={{
                fontSize: 18,
                lineHeight: 30,
                color: colors.text,
                fontFamily: "NotoSerifHebrew-Regular",
                textAlign: "right",
                writingDirection: "rtl",
              }}
            >
              {d.omerText}
            </Text>
          </Card>
        ) : null}

        {hebrew.dayDavening.activeInsertions.length > 0 && (
          <Card icon="add-circle-outline" title="Insertions" colors={colors}>
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
                  <Text
                    style={{
                      fontSize: 13,
                      color: colors.accent,
                      fontFamily: "NotoSerifHebrew-Regular",
                    }}
                  >
                    {ins.nameHe}
                  </Text>
                </View>
              ))}
            </View>
          </Card>
        )}

        {(zmanim?.candleLighting || zmanim?.havdala) && (
          <Card icon="flame-outline" title="Shabbos & Yom Tov" colors={colors}>
            {zmanim.candleLighting && (
              <InfoRow
                label="Candle lighting"
                value={formatZmanTime(
                  zmanim.candleLighting,
                  timeFormat,
                  timeZone
                )}
                colors={colors}
                isLast={!zmanim.havdala}
              />
            )}
            {zmanim.havdala && (
              <InfoRow
                label="Havdala"
                value={formatZmanTime(zmanim.havdala, timeFormat, timeZone)}
                colors={colors}
                isLast
              />
            )}
          </Card>
        )}

        {upcoming.length > 0 && (
          <Card icon="calendar-outline" title="Upcoming" colors={colors}>
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
                    borderRadius: 10,
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
