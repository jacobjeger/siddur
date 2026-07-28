import { View, Text } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { toBlocks } from "../../utils/sectionBlocks";

/**
 * Renders one prayer section: liturgy and rubrics interleaved in their original
 * order, with rubrics styled distinctly, plus a placeholder when the text has
 * not been restored yet.
 *
 * Rubrics must render IN PLACE. An earlier version hoisted them into a separate
 * block above the liturgy, which destroyed the meaning wherever a cue label
 * selects between alternatives — Birkas HaShanim showed both the summer and
 * winter formulas run together with nothing to distinguish them.
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
  const blocks = toBlocks(text);
  const hasText = blocks.length > 0;

  const rubricStyle = {
    fontFamily: "NotoSerifHebrew-Regular",
    fontSize: textSize * 0.62,
    lineHeight: textSize * 1.15,
    color: colors.textMuted,
    writingDirection: "rtl" as const,
    textAlign: "right" as const,
  };

  return (
    <View>
      {/* A leading rubric that applies to the whole section. */}
      {instructionHe ? (
        <Text style={[rubricStyle, { marginBottom: 10 }]}>{instructionHe}</Text>
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
        blocks.map((block, i) =>
          block.kind === "rubric" ? (
            <Text
              key={i}
              style={[
                rubricStyle,
                { marginTop: i === 0 ? 0 : 8, marginBottom: 4 },
              ]}
            >
              {block.text}
            </Text>
          ) : (
            <Text
              key={i}
              style={{
                fontFamily: "NotoSerifHebrew-Regular",
                fontSize: textSize,
                lineHeight: textSize * 2,
                color: colors.text,
                writingDirection: "rtl",
                textAlign: "right",
              }}
            >
              {block.text}
            </Text>
          )
        )
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
            style={{ fontSize: 13, color: colors.textMuted, textAlign: "center" }}
          >
            Text not yet available for this section
          </Text>
        </View>
      )}
    </View>
  );
}
