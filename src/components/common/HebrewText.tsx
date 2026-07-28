import { Text, type TextProps, type TextStyle } from "react-native";
import { useTheme } from "../../hooks/useTheme";

/**
 * Hebrew text, rendered right-to-left in the siddur font.
 *
 * Outside the two siddur screens, Hebrew was being rendered left-aligned in the
 * system font. That is visibly wrong for anything containing bidi-neutral
 * characters — `סוף זמן ק"ש (מג"א)` has both parentheses and gershayim, which
 * resolve to the wrong side under LTR, and `בה"ב` and `ספירת העומר — יום כ״ה`
 * break the same way.
 *
 * Never join Hebrew and Latin in one string; use two of these instead. A hyphen
 * between an LTR and an RTL run is the textbook bidi failure case.
 */
export function HebrewText({
  children,
  style,
  bold,
  ...rest
}: TextProps & { bold?: boolean }) {
  const { colors } = useTheme();

  const base: TextStyle = {
    fontFamily: bold ? "NotoSerifHebrew-Bold" : "NotoSerifHebrew-Regular",
    color: colors.text,
    writingDirection: "rtl",
    textAlign: "right",
  };

  return (
    <Text {...rest} style={[base, style]}>
      {children}
    </Text>
  );
}
