import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHebrewDate } from "../../hooks/useHebrewDate";
import { useTheme } from "../../hooks/useTheme";

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
          fontSize: 18,
        }}
      >
        {hebrewDate || "Loading..."}
      </Text>
      <Text
        style={{
          color: "rgba(255,255,255,0.7)",
          textAlign: "center",
          fontSize: 13,
          marginTop: 4,
        }}
      >
        {englishDate}
      </Text>
      {parsha ? (
        <Text
          style={{
            color: colors.accent,
            textAlign: "center",
            fontSize: 13,
            marginTop: 4,
          }}
        >
          Parashat {parsha}
        </Text>
      ) : null}
      {specialDay ? (
        <Text
          style={{
            color: colors.accent,
            textAlign: "center",
            fontSize: 13,
            marginTop: 4,
          }}
        >
          {specialDay}
        </Text>
      ) : null}
      {/* omerDay was computed and threaded through the hook, then never shown. */}
      {omerDay > 0 ? (
        <Text
          style={{
            color: colors.accent,
            textAlign: "center",
            fontSize: 13,
            marginTop: 4,
          }}
        >
          Omer: Day {omerDay}
        </Text>
      ) : null}
    </View>
  );
}
