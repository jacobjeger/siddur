import { View, Text } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { HebrewText } from "./HebrewText";
import { Focusable } from "./Focusable";
import type { PrayerSection } from "../../data/types";

/**
 * The reader's sticky head: where you are, and how far through.
 *
 * Replaces a 209 dp block of in-content chrome — a repeated Hebrew tefila
 * title, a jump chip, and a 40 dp centred rule-divider per section — that left
 * four to six lines of liturgy on a 502 dp screen. The tefila name is now
 * permanently visible instead of being said twice and then scrolling away.
 *
 * The middle tier is the YAML `group` field ("Pesukei D'zimra", "Tachanun"),
 * which every one of the 118 Shacharis sections carries and which the UI had
 * never rendered. It is the tier that makes a 118-section tefila navigable.
 *
 * Deliberately does NOT scale with the reader text size. The old title block
 * used `textSize + 2` and the jump chip `textSize - 6`, so enlarging the
 * liturgy also enlarged the chrome and gave back much of the space it bought.
 */
export function RunningHead({
  tefilaName,
  section,
  index,
  total,
  progress,
  onPressIndex,
}: {
  tefilaName: string;
  section?: PrayerSection;
  index: number;
  total: number;
  progress: number;
  onPressIndex?: () => void;
}) {
  const { colors } = useTheme();
  const group = section?.group;

  const body = (
    <View
      style={{
        backgroundColor: colors.headerBg,
        paddingHorizontal: 16,
        paddingTop: 5,
        paddingBottom: 0,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 8 }}>
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 10,
              letterSpacing: 1.2,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.62)",
              fontWeight: "700",
            }}
          >
            {group ? `${tefilaName} · ${group}` : tefilaName}
          </Text>
          {group ? (
            <HebrewText
              bold
              numberOfLines={1}
              style={{ fontSize: 15, color: "#ffffff", marginTop: 1 }}
            >
              {section?.titleHe ?? ""}
            </HebrewText>
          ) : null}
        </View>
        <Text
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.7)",
            fontVariant: ["tabular-nums"],
            paddingBottom: 2,
          }}
        >
          {index + 1}/{total}
        </Text>
      </View>

      {/* 2dp progress rule along the bottom edge. */}
      <View
        style={{
          height: 2,
          marginTop: 4,
          backgroundColor: "rgba(255,255,255,0.18)",
        }}
      >
        <View
          style={{
            height: 2,
            width: `${Math.round(Math.max(0, Math.min(1, progress)) * 100)}%`,
            backgroundColor: colors.accent,
          }}
        />
      </View>
    </View>
  );

  // The whole head is the index affordance when there is an index to open —
  // one target instead of the in-content chip that cost ~52 dp.
  if (!onPressIndex) return body;
  return (
    <Focusable
      dense
      onPress={onPressIndex}
      accessibilityRole="button"
      accessibilityLabel={`Jump to section. Currently ${section?.title ?? ""}, ${index + 1} of ${total}`}
    >
      {body}
    </Focusable>
  );
}
