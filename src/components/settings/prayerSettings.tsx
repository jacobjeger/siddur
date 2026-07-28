import { View, Text, Pressable } from "react-native";
import { useSettingsStore, type Nusach } from "../../stores/useSettingsStore";
import { useTheme } from "../../hooks/useTheme";
import { Card, Chip } from "../common/ui";
import { MIN_TOUCH_TARGET, spacing } from "../../theme/tokens";

const NUSACH_OPTIONS: { value: Nusach; label: string }[] = [
  { value: "ashkenaz", label: "Ashkenaz" },
  { value: "sefard", label: "Sefard" },
  { value: "edot_hamizrach", label: "Edot HaMizrach" },
  { value: "ari", label: "Ari (Chabad)" },
];

const row = { flexDirection: "row" as const, flexWrap: "wrap" as const, gap: spacing.sm };

export function NusachCard() {
  const { nusach, setNusach } = useSettingsStore();

  return (
    <Card title="Nusach" subtitle="Which text is shown">
      <View style={row}>
        {NUSACH_OPTIONS.map((opt) => (
          <Chip
            key={opt.value}
            label={opt.label}
            selected={nusach === opt.value}
            onPress={() => setNusach(opt.value)}
          />
        ))}
      </View>
    </Card>
  );
}

export function MinhagCard() {
  const { minhag, setMinhag } = useSettingsStore();

  return (
    <Card
      title="Minhag"
      subtitle="Which customs apply. Affects Shir Shel Yom and L'Dovid, not which text is shown."
    >
      <View style={row}>
        <Chip
          label="Standard"
          selected={minhag === "standard"}
          onPress={() => setMinhag("standard")}
        />
        <Chip
          label="Gra / Eretz Yisrael"
          selected={minhag === "gra"}
          onPress={() => setMinhag("gra")}
        />
      </View>
    </Card>
  );
}

export function TextSizeCard() {
  const { colors } = useTheme();
  const { textSize, setTextSize } = useSettingsStore();

  const step = (delta: number, label: string) => (
    <Pressable
      onPress={() => setTextSize(Math.min(32, Math.max(16, textSize + delta)))}
      accessibilityRole="button"
      accessibilityLabel={delta > 0 ? "Increase text size" : "Decrease text size"}
      style={({ pressed }) => ({
        width: MIN_TOUCH_TARGET,
        height: MIN_TOUCH_TARGET,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        backgroundColor: pressed ? colors.surfaceSecondary : colors.background,
      })}
    >
      <Text style={{ fontSize: 18, fontWeight: "bold", color: colors.text }}>
        {label}
      </Text>
    </Pressable>
  );

  return (
    <Card title="Text Size" subtitle="Size of the prayer text">
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {step(-2, "−")}
        {/* Preview at the chosen size, so the number means something. */}
        <Text
          style={{
            fontFamily: "NotoSerifHebrew-Regular",
            fontSize: textSize,
            color: colors.text,
          }}
        >
          אָבִינוּ
        </Text>
        {step(2, "+")}
      </View>
      <Text
        style={{
          fontSize: 13,
          color: colors.textMuted,
          textAlign: "center",
          marginTop: spacing.sm,
        }}
      >
        {textSize}pt
      </Text>
    </Card>
  );
}
