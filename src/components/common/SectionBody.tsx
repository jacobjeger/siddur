import { View, Text } from "react-native";
import { useTheme } from "../../hooks/useTheme";

/**
 * Renders one prayer section's body: the rubric (if any), the liturgy, and a
 * placeholder when the text has not been restored yet.
 *
 * Rubrics were previously mixed into `text` and rendered as if they were
 * liturgy. They are now separated into `instructionHe`, so they need a visually
 * distinct treatment — otherwise separating them out gains nothing and the
 * instructions simply disappear.
 */
export function SectionBody({
  text,
  instruction,
  instructionHe,
  textSize,
}: {
  text: string;
  instruction?: string;
  instructionHe?: string;
  textSize: number;
}) {
  const { colors } = useTheme();
  const hasText = Boolean(text?.trim());

  return (
    <View>
      {instructionHe ? (
        <Text
          style={{
            fontFamily: "NotoSerifHebrew-Regular",
            fontSize: textSize * 0.62,
            lineHeight: textSize * 1.15,
            color: colors.textMuted,
            writingDirection: "rtl",
            textAlign: "right",
            marginBottom: 10,
          }}
        >
          {instructionHe}
        </Text>
      ) : null}

      {instruction ? (
        <Text
          style={{
            fontSize: textSize * 0.6,
            lineHeight: textSize * 1.05,
            color: colors.textMuted,
            fontStyle: "italic",
            marginBottom: 10,
          }}
        >
          {instruction}
        </Text>
      ) : null}

      {hasText ? (
        <Text
          style={{
            fontFamily: "NotoSerifHebrew-Regular",
            fontSize: textSize,
            lineHeight: textSize * 2,
            color: colors.text,
            writingDirection: "rtl",
            textAlign: "right",
          }}
        >
          {text}
        </Text>
      ) : (
        // 43 sections are still empty. Without this the screen shows a heading
        // followed by blank space, which reads as a rendering bug rather than
        // as missing content.
        <View
          style={{
            paddingVertical: 14,
            paddingHorizontal: 12,
            borderRadius: 8,
            borderWidth: 1,
            borderStyle: "dashed",
            borderColor: colors.border,
            backgroundColor: colors.surfaceSecondary,
          }}
        >
          <Text
            style={{
              fontSize: 13,
              color: colors.textMuted,
              textAlign: "center",
            }}
          >
            Text not yet available for this section
          </Text>
        </View>
      )}
    </View>
  );
}
