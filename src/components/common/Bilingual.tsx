import { View, Text, type StyleProp, type TextStyle, type ViewStyle } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { HebrewText } from "./HebrewText";
import { typeScale } from "../../theme/tokens";

/**
 * A Hebrew name with an English gloss beneath it.
 *
 * The app paired the two at identical size and near-identical weight, English
 * first — `Start Davening  התחל להתפלל`, `All Tefilos  כל התפילות`,
 * `Next Zman  הזמן הבא`, `Shacharis  שחרית`. That reads like a translation
 * table rather than a siddur, doubles the width of every row, and for a reader
 * who knows the siddur cold the English is the part to shrink.
 *
 * This exists as one component precisely so the convention cannot drift. The
 * pairs appeared at six sites with slightly different sizes and orders at each;
 * changing them screen by screen would have left the app with two conventions
 * instead of one.
 *
 * The gloss line is also the slot a translation grows into later — it can
 * become a paragraph without the layout changing shape.
 */
export function Bilingual({
  he,
  en,
  size = "title",
  align = "right",
  style,
  glossStyle,
  numberOfLines,
}: {
  he: string;
  /** Omit where the Hebrew is self-evident — סוף זמן rows do not need a gloss. */
  en?: string;
  size?: "title" | "body" | "display";
  align?: "right" | "left" | "center";
  style?: StyleProp<ViewStyle>;
  glossStyle?: StyleProp<TextStyle>;
  numberOfLines?: number;
}) {
  const { colors } = useTheme();
  const hebrewSize = typeScale[size];

  return (
    <View style={[{ alignItems: alignToFlex(align) }, style]}>
      <HebrewText
        bold
        numberOfLines={numberOfLines}
        style={{ fontSize: hebrewSize, color: colors.text, textAlign: align }}
      >
        {he}
      </HebrewText>
      {en ? (
        <Text
          numberOfLines={numberOfLines}
          style={[
            {
              fontSize: typeScale.caption,
              color: colors.textSecondary,
              textAlign: align,
              marginTop: 1,
            },
            glossStyle,
          ]}
        >
          {en}
        </Text>
      ) : null}
    </View>
  );
}

function alignToFlex(align: "right" | "left" | "center") {
  if (align === "right") return "flex-end";
  if (align === "left") return "flex-start";
  return "center";
}
