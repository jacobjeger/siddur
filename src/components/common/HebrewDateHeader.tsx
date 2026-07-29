import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHebrewDate } from "../../hooks/useHebrewDate";
import { useTheme } from "../../hooks/useTheme";

import { typeScale } from "../../theme/tokens";
/**
 * colors.accent on headerBg is only ~3.7:1 at 13pt in light mode, under the
 * 4.5:1 minimum. A translucent white reads far better on the dark header in
 * both themes.
 */
const subtitleStyle = {
  color: "rgba(255,255,255,0.92)",
  textAlign: "center" as const,
  fontSize: typeScale.caption,
  marginTop: 4,
};

export function HebrewDateHeader() {
  const { hebrewDate, englishDate, parsha, specialDay, omerDay } =
    useHebrewDate();
  const { colors } = useTheme();
  // This is the topmost element on its screens and the tabs draw no header, so
  // without the inset it renders under the status bar / notch.
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        backgroundColor: colors.headerBg,
        paddingHorizontal: 16,
        paddingTop: insets.top + 14,
        paddingBottom: 14,
      }}
    >
      <Text
        style={{
          fontFamily: "NotoSerifHebrew-Bold",
          color: "#fff",
          textAlign: "center",
          fontSize: typeScale.title,
        }}
      >
        {hebrewDate}
      </Text>
      <Text
        style={{
          color: "rgba(255,255,255,0.7)",
          textAlign: "center",
          fontSize: typeScale.caption,
          marginTop: 4,
        }}
      >
        {englishDate}
      </Text>
      {parsha ? (
        <Text
          style={subtitleStyle}
        >
          Parashat {parsha}
        </Text>
      ) : null}
      {specialDay ? (
        <Text
          style={subtitleStyle}
        >
          {specialDay}
        </Text>
      ) : null}
      {/* omerDay was computed and threaded through the hook, then never shown. */}
      {omerDay > 0 ? (
        <Text
          style={subtitleStyle}
        >
          Omer: Day {omerDay}
        </Text>
      ) : null}
    </View>
  );
}
