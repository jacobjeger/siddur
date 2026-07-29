import { useMemo, useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme, type ThemeColors } from "../../hooks/useTheme";
import { HebrewText } from "../common/HebrewText";
import { radius, MIN_TOUCH_TARGET } from "../../theme/tokens";
import {
  getMonthGrid,
  getWeekDays,
  getAgenda,
  effectiveToday,
  type CalendarDay,
} from "../../services/zmanim/calendarGrid";
import type {
  DayType,
  HebrewDateOptions,
} from "../../services/zmanim/hebrewCalendarService";

import { Focusable } from "../common/Focusable";
export type CalendarView = "today" | "week" | "month" | "list";

const VIEWS: { key: CalendarView; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "week", label: "Week" },
  { key: "month", label: "Month" },
  { key: "list", label: "List" },
];

const WEEKDAY_INITIALS = ["S", "M", "T", "W", "T", "F", "S"];
const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Shabbos"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Accent colour per day type. Shabbos and Yom Tov are the two the eye needs to
 * find first, so they get the strongest treatment; the minor days are tinted
 * rather than filled so a month of them does not read as noise.
 */
function dayAccent(type: DayType, colors: ThemeColors): string | null {
  switch (type) {
    case "shabbos":
      return colors.primary;
    case "yom_tov":
      return colors.accent;
    case "chol_hamoed":
    case "rosh_chodesh":
    case "chanukah":
    case "purim":
      return colors.textSecondary;
    case "fast_day":
      return colors.textMuted;
    default:
      return null;
  }
}

export function ViewSwitcher({
  value,
  onChange,
}: {
  value: CalendarView;
  onChange: (view: CalendarView) => void;
}) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: colors.surfaceSecondary,
        borderRadius: radius.md,
        padding: 3,
        marginHorizontal: 16,
        marginTop: 12,
      }}
    >
      {VIEWS.map((view) => {
        const active = view.key === value;
        return (
          <Focusable
            key={view.key}
            onPress={() => onChange(view.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            accessibilityLabel={`${view.label} view`}
            style={{
              flex: 1,
              // MIN_TOUCH_TARGET, not padding: at paddingVertical 9 these came
              // out ~35dp, under the 44dp minimum, on the tab's main control.
              minHeight: MIN_TOUCH_TARGET,
              justifyContent: "center",
              borderRadius: radius.sm,
              alignItems: "center",
              backgroundColor: active ? colors.primary : "transparent",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: active ? "700" : "500",
                color: active ? colors.onPrimary : colors.textSecondary,
              }}
            >
              {view.label}
            </Text>
          </Focusable>
        );
      })}
    </View>
  );
}

/** Shared ← title → bar for the week and month views. */
function Pager({
  title,
  subtitle,
  onPrev,
  onNext,
  onToday,
  showToday,
}: {
  title: string;
  subtitle?: string;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  showToday: boolean;
}) {
  const { colors } = useTheme();
  const arrow = (
    name: "chevron-back" | "chevron-forward",
    onPress: () => void,
    label: string
  ) => (
    <Focusable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={8}
      style={{
        width: MIN_TOUCH_TARGET,
        height: MIN_TOUCH_TARGET,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ionicons name={name} size={22} color={colors.primary} />
    </Focusable>
  );

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 4,
        marginBottom: 4,
      }}
    >
      {arrow("chevron-back", onPrev, "Previous")}
      <Focusable
        onPress={onToday}
        disabled={!showToday}
        accessibilityRole="button"
        accessibilityLabel="Jump to today"
        style={{ flex: 1, alignItems: "center" }}
      >
        <Text style={{ fontSize: 17, fontWeight: "700", color: colors.text }}>
          {title}
        </Text>
        {subtitle ? (
          <HebrewText style={{ fontSize: 13, color: colors.textMuted }}>
            {subtitle}
          </HebrewText>
        ) : null}
        {showToday ? (
          <Text style={{ fontSize: 11, color: colors.primary, marginTop: 2 }}>
            Tap to return to today
          </Text>
        ) : null}
      </Focusable>
      {arrow("chevron-forward", onNext, "Next")}
    </View>
  );
}

/** The detail strip shown under the grid for whichever day is selected. */
function DayDetail({ day }: { day: CalendarDay }) {
  const { colors } = useTheme();
  const accent = dayAccent(day.dayType, colors);

  const notes: string[] = [];
  if (day.label) notes.push(day.label);
  if (day.isCholHamoed && !day.label) notes.push("Chol HaMoed");
  if (day.isFastDay && !day.label) notes.push("Fast day");
  if (day.isChanukah && !day.label) notes.push("Chanukah");
  if (day.omerDay > 0) notes.push(`Omer day ${day.omerDay}`);

  return (
    <View
      style={{
        marginTop: 14,
        padding: 14,
        borderRadius: radius.md,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderLeftWidth: accent ? 4 : 1,
        borderLeftColor: accent ?? colors.border,
      }}
    >
      <Text style={{ fontSize: 15, fontWeight: "700", color: colors.text }}>
        {WEEKDAY_SHORT[day.date.getDay()]}, {MONTHS[day.date.getMonth()]}{" "}
        {day.civilDay}
      </Text>
      <HebrewText style={{ fontSize: 15, color: colors.textSecondary, marginTop: 3 }}>
        {day.hebrewDayHe} {day.hebrewMonthHe}
      </HebrewText>
      {notes.length ? (
        <Text style={{ fontSize: 13, color: colors.textMuted, marginTop: 6 }}>
          {notes.join(" · ")}
        </Text>
      ) : (
        <Text style={{ fontSize: 13, color: colors.textMuted, marginTop: 6 }}>
          No special observance
        </Text>
      )}
    </View>
  );
}

function MonthCell({
  day,
  selected,
  onPress,
}: {
  day: CalendarDay;
  selected: boolean;
  onPress: () => void;
}) {
  const { colors } = useTheme();
  const accent = dayAccent(day.dayType, colors);
  const dim = !day.inMonth;

  return (
    <Focusable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={`${MONTHS[day.date.getMonth()]} ${day.civilDay}${
        day.label ? `, ${day.label}` : ""
      }`}
      style={{
        width: `${100 / 7}%`,
        aspectRatio: 0.92,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 2,
      }}
    >
      <View
        style={{
          width: "88%",
          height: "88%",
          borderRadius: radius.sm,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: selected
            ? colors.primary
            : day.isToday
              ? colors.primaryLight
              : "transparent",
          // The today ring survives selection. The previous expression said
          // `day.isToday && !selected`, which removed the ring in exactly the
          // case the comment said it had to survive; it only looked right
          // because selection also paints the primary colour.
          borderWidth: day.isToday ? 1.5 : 0,
          borderColor: selected ? colors.onPrimary : colors.primary,
          opacity: dim ? 0.32 : 1,
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: day.isToday || selected ? "700" : "500",
            color: selected ? colors.onPrimary : colors.text,
          }}
        >
          {day.civilDay}
        </Text>
        <HebrewText
          style={{
            fontSize: 10,
            color: selected ? colors.onPrimary : colors.textMuted,
          }}
        >
          {day.hebrewDayHe}
        </HebrewText>
        <View
          style={{
            height: 4,
            marginTop: 2,
            width: 4,
            borderRadius: 2,
            backgroundColor:
              accent && !selected ? accent : "transparent",
          }}
        />
      </View>
    </Focusable>
  );
}

export function MonthView({ options }: { options: HebrewDateOptions }) {
  const { colors } = useTheme();
  const today = useMemo(() => effectiveToday(new Date(), options), [options]);
  const [anchor, setAnchor] = useState(today);
  const [selected, setSelected] = useState(today);

  const days = useMemo(
    () => getMonthGrid(anchor, options),
    [anchor, options]
  );
  // Restrict to in-month cells. The 42-cell grid includes the tail of the
  // previous month and the head of the next, so paging from 31 March to April
  // resolved the selection to April's leading 31-March PADDING cell — which
  // renders at opacity 0.32, giving a dimmed "selected" highlight and a detail
  // strip reading "Tuesday, March 31" under an "April 2026" header.
  const selectedDay =
    days.find(
      (d) =>
        d.inMonth &&
        d.date.getFullYear() === selected.getFullYear() &&
        d.date.getMonth() === selected.getMonth() &&
        d.date.getDate() === selected.getDate()
    ) ?? days.find((d) => d.inMonth)!;

  const shift = (months: number) => {
    const next = new Date(anchor.getFullYear(), anchor.getMonth() + months, 1);
    setAnchor(next);
  };

  const inMonth = days.filter((d) => d.inMonth);
  // A civil month always straddles two Hebrew months, so name both.
  const hebrewSpan = Array.from(
    new Set(inMonth.map((d) => d.hebrewMonthHe))
  ).join(" – ");

  const isCurrentMonth =
    anchor.getFullYear() === today.getFullYear() &&
    anchor.getMonth() === today.getMonth();

  return (
    <View>
      <Pager
        title={`${MONTHS[anchor.getMonth()]} ${anchor.getFullYear()}`}
        subtitle={hebrewSpan}
        onPrev={() => shift(-1)}
        onNext={() => shift(1)}
        onToday={() => {
          setAnchor(today);
          setSelected(today);
        }}
        showToday={!isCurrentMonth}
      />

      <View style={{ flexDirection: "row", marginTop: 6, marginBottom: 2 }}>
        {WEEKDAY_INITIALS.map((initial, i) => (
          <Text
            key={i}
            style={{
              width: `${100 / 7}%`,
              textAlign: "center",
              fontSize: 12,
              fontWeight: "600",
              color: i === 6 ? colors.primary : colors.textMuted,
            }}
          >
            {initial}
          </Text>
        ))}
      </View>

      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {days.map((day) => (
          <MonthCell
            key={day.date.toISOString()}
            day={day}
            selected={day.date.getTime() === selectedDay.date.getTime()}
            onPress={() => setSelected(day.date)}
          />
        ))}
      </View>

      <DayDetail day={selectedDay} />
    </View>
  );
}

export function WeekView({ options }: { options: HebrewDateOptions }) {
  const { colors } = useTheme();
  const today = useMemo(() => effectiveToday(new Date(), options), [options]);
  const [anchor, setAnchor] = useState(today);

  const days = useMemo(() => getWeekDays(anchor, options), [anchor, options]);

  const shift = (weeks: number) =>
    setAnchor(
      new Date(
        anchor.getFullYear(),
        anchor.getMonth(),
        anchor.getDate() + weeks * 7
      )
    );

  const first = days[0];
  const last = days[6];
  const span =
    first.date.getMonth() === last.date.getMonth()
      ? `${MONTHS[first.date.getMonth()]} ${first.civilDay}–${last.civilDay}`
      : `${MONTHS[first.date.getMonth()]} ${first.civilDay} – ${
          MONTHS[last.date.getMonth()]
        } ${last.civilDay}`;

  const showsToday = days.some((d) => d.isToday);

  return (
    <View>
      <Pager
        title={span}
        subtitle={Array.from(new Set(days.map((d) => d.hebrewMonthHe))).join(" – ")}
        onPrev={() => shift(-1)}
        onNext={() => shift(1)}
        onToday={() => setAnchor(today)}
        showToday={!showsToday}
      />

      <View style={{ marginTop: 8 }}>
        {days.map((day) => {
          const accent = dayAccent(day.dayType, colors);
          return (
            <View
              key={day.date.toISOString()}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 12,
                paddingHorizontal: 12,
                marginBottom: 6,
                borderRadius: radius.md,
                backgroundColor: day.isToday
                  ? colors.primaryLight
                  : colors.surface,
                borderWidth: 1,
                borderColor: day.isToday ? colors.primary : colors.border,
                borderLeftWidth: accent ? 4 : 1,
                borderLeftColor: accent ?? colors.border,
              }}
            >
              <View style={{ width: 58 }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: colors.textMuted,
                  }}
                >
                  {WEEKDAY_SHORT[day.date.getDay()]}
                </Text>
                <Text
                  style={{
                    fontSize: 19,
                    fontWeight: day.isToday ? "800" : "600",
                    color: colors.text,
                  }}
                >
                  {day.civilDay}
                </Text>
              </View>

              <View style={{ flex: 1 }}>
                <HebrewText style={{ fontSize: 15, color: colors.text }}>
                  {day.hebrewDayHe} {day.hebrewMonthHe}
                </HebrewText>
                {day.label ? (
                  <Text
                    style={{
                      fontSize: 13,
                      color: colors.textSecondary,
                      marginTop: 2,
                    }}
                  >
                    {day.label}
                  </Text>
                ) : null}
                {day.omerDay > 0 ? (
                  <Text
                    style={{ fontSize: 12, color: colors.textMuted, marginTop: 2 }}
                  >
                    Omer {day.omerDay}
                  </Text>
                ) : null}
              </View>

              {day.isToday ? (
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: "700",
                    color: colors.primary,
                  }}
                >
                  TODAY
                </Text>
              ) : null}
            </View>
          );
        })}
      </View>
    </View>
  );
}

export function AgendaView({ options }: { options: HebrewDateOptions }) {
  const { colors } = useTheme();
  const entries = useMemo(() => getAgenda(options, 240), [options]);

  if (!entries.length) {
    return (
      <Text style={{ color: colors.textMuted, textAlign: "center", padding: 24 }}>
        Nothing scheduled in the next eight months.
      </Text>
    );
  }

  return (
    <View>
      {entries.map((entry) => {
        const accent = dayAccent(entry.dayType, colors);
        return (
          <View
            key={entry.date.toISOString()}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 12,
              paddingHorizontal: 12,
              marginBottom: 6,
              borderRadius: radius.md,
              backgroundColor: colors.surface,
              borderWidth: 1,
              borderColor: colors.border,
              borderLeftWidth: accent ? 4 : 1,
              borderLeftColor: accent ?? colors.border,
            }}
          >
            <View style={{ width: 64 }}>
              <Text
                style={{ fontSize: 12, color: colors.textMuted, fontWeight: "600" }}
              >
                {WEEKDAY_SHORT[entry.date.getDay()].slice(0, 3)}
              </Text>
              <Text style={{ fontSize: 17, fontWeight: "700", color: colors.text }}>
                {MONTHS[entry.date.getMonth()].slice(0, 3)} {entry.civilDay}
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: "600", color: colors.text }}>
                {entry.label || WEEKDAY_SHORT[entry.date.getDay()]}
              </Text>
              <HebrewText
                style={{ fontSize: 13, color: colors.textSecondary, marginTop: 2 }}
              >
                {entry.hebrewDayHe} {entry.hebrewMonthHe}
              </HebrewText>
            </View>

            <Text style={{ fontSize: 12, color: colors.textMuted }}>
              {entry.daysAway === 0
                ? "Today"
                : entry.daysAway === 1
                  ? "Tomorrow"
                  : `${entry.daysAway}d`}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
