import { View, Text, ScrollView, Pressable, Switch } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSettingsStore } from "../../src/stores/useSettingsStore";
import { useTheme, type ThemeColors } from "../../src/hooks/useTheme";
import { Chip } from "../../src/components/common/ui";
import { MIN_TOUCH_TARGET } from "../../src/theme/tokens";
import { LocationSettings } from "../../src/components/settings/LocationSettings";
import { ALL_TEFILOS } from "../../src/data/prayers";

type Nusach = "ashkenaz" | "sefard" | "edot_hamizrach" | "ari";

const NUSACH_OPTIONS: { value: Nusach; label: string }[] = [
  { value: "ashkenaz", label: "Ashkenaz" },
  { value: "sefard", label: "Sefard" },
  { value: "edot_hamizrach", label: "Edot HaMizrach" },
  { value: "ari", label: "Ari (Chabad)" },
];

const CANDLE_LIGHTING_OPTIONS = [18, 20, 22, 30, 40];

/** No English exists in the corpus yet, so the toggle would be inert. */
const HAS_TRANSLATIONS = ALL_TEFILOS.some((t) =>
  t.sections.some((s) => Boolean(s.translation))
);

export default function SettingsTab() {
  const {
    nusach,
    textSize,
    showEnglish,
    darkMode,
    keepScreenOn,
    timeFormat,
    candleLightingOffset,
    setNusach,
    setTextSize,
    setShowEnglish,
    setDarkMode,
    setKeepScreenOn,
    setTimeFormat,
    setCandleLightingOffset,
  } = useSettingsStore();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Dark band behind the light-styled status bar — see minyanim.tsx. */}
      <View style={{ height: insets.top, backgroundColor: colors.headerBg }} />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
      {/* Nusach */}
      <View
        style={{
          backgroundColor: colors.surface,
          marginTop: 16,
          marginHorizontal: 16,
          borderRadius: 12,
          padding: 16,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <Text style={{ fontSize: 17, fontWeight: "bold", color: colors.text, marginBottom: 12 }}>
          Nusach
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {NUSACH_OPTIONS.map((opt) => (
            <Chip
              key={opt.value}
              label={opt.label}
              selected={nusach === opt.value}
              onPress={() => setNusach(opt.value)}
            />
          ))}
        </View>
      </View>

      {/* Text Size */}
      <View
        style={{
          backgroundColor: colors.surface,
          marginTop: 16,
          marginHorizontal: 16,
          borderRadius: 12,
          padding: 16,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <Text style={{ fontSize: 17, fontWeight: "bold", color: colors.text, marginBottom: 12 }}>
          Text Size
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Pressable
            onPress={() => setTextSize(Math.max(16, textSize - 2))}
            accessibilityRole="button"
            accessibilityLabel="Decrease text size"
            style={({ pressed }) => ({
              width: MIN_TOUCH_TARGET,
              height: MIN_TOUCH_TARGET,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: pressed ? colors.surfaceSecondary : colors.background,
              borderRadius: 8,
            })}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", color: colors.text }}>−</Text>
          </Pressable>
          <Text style={{ fontSize: 16, fontWeight: "600", color: colors.text }}>
            {textSize}pt
          </Text>
          <Pressable
            onPress={() => setTextSize(Math.min(32, textSize + 2))}
            accessibilityRole="button"
            accessibilityLabel="Increase text size"
            style={({ pressed }) => ({
              width: MIN_TOUCH_TARGET,
              height: MIN_TOUCH_TARGET,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: pressed ? colors.surfaceSecondary : colors.background,
              borderRadius: 8,
            })}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", color: colors.text }}>+</Text>
          </Pressable>
        </View>
      </View>

      {/* Toggles */}
      <View
        style={{
          backgroundColor: colors.surface,
          marginTop: 16,
          marginHorizontal: 16,
          borderRadius: 12,
          padding: 16,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        {/*
          Hidden while the dataset has no translations at all — a visible switch
          that changes nothing reads as a broken setting. See
          docs/remaining-text.md; Metsudah (CC BY) or the Sefaria Community
          Translation (CC0) are the license-clean sources when English lands.
        */}
        {HAS_TRANSLATIONS && (
          <SettingRow
            label="Show English Translation"
            value={showEnglish}
            onToggle={setShowEnglish}
            colors={colors}
          />
        )}
        <SettingRow
          label="Keep Screen On While Davening"
          value={keepScreenOn}
          onToggle={setKeepScreenOn}
          colors={colors}
        />
        <SettingRow
          label="24-Hour Time"
          value={timeFormat === "24h"}
          onToggle={(v) => setTimeFormat(v ? "24h" : "12h")}
          colors={colors}
          isLast
        />
      </View>

      {/* Dark Mode */}
      <View
        style={{
          backgroundColor: colors.surface,
          marginTop: 16,
          marginHorizontal: 16,
          borderRadius: 12,
          padding: 16,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <Text style={{ fontSize: 17, fontWeight: "bold", color: colors.text, marginBottom: 12 }}>
          Dark Mode
        </Text>
        <View style={{ flexDirection: "row", gap: 8 }}>
          {(["off", "on", "system"] as const).map((mode) => (
            <Chip
              key={mode}
              label={mode[0].toUpperCase() + mode.slice(1)}
              selected={darkMode === mode}
              onPress={() => setDarkMode(mode)}
            />
          ))}
        </View>
      </View>

      {/* Candle Lighting Offset */}
      <View
        style={{
          backgroundColor: colors.surface,
          marginTop: 16,
          marginHorizontal: 16,
          borderRadius: 12,
          padding: 16,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <Text style={{ fontSize: 17, fontWeight: "bold", color: colors.text, marginBottom: 4 }}>
          Candle Lighting
        </Text>
        <Text style={{ fontSize: 13, color: colors.textMuted, marginBottom: 12 }}>
          Minutes before shkia
        </Text>
        <View style={{ flexDirection: "row", gap: 8 }}>
          {CANDLE_LIGHTING_OPTIONS.map((min) => (
            <Chip
              key={min}
              label={`${min}${min === 40 ? " (Jer.)" : ""}`}
              selected={candleLightingOffset === min}
              onPress={() => setCandleLightingOffset(min)}
            />
          ))}
        </View>
      </View>

      <LocationSettings />

      {/* About */}
      <View
        style={{
          backgroundColor: colors.surface,
          marginTop: 16,
          marginHorizontal: 16,
          marginBottom: 32,
          borderRadius: 12,
          padding: 16,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <Text style={{ fontSize: 17, fontWeight: "bold", color: colors.text, marginBottom: 8 }}>
          About
        </Text>
        {/*
          CC BY requires crediting the originator of the text, not the
          distributor. Sefaria distributes it; Metsudah and Daat are the
          licensors. See docs/text-licenses.md.
        */}
        <Text style={{ fontSize: 13, color: colors.textMuted }}>
          Hebrew text: The Metsudah Siddur (Avrohom Davis), licensed CC BY, and
          Daat Siddur Ashkenaz (public domain). Nusach Sefard text: Torat Emet,
          licensed CC BY-NC-SA — used here under its non-commercial terms.
        </Text>
        <Text style={{ fontSize: 13, color: colors.textMuted, marginTop: 4 }}>
          Texts distributed via Sefaria (sefaria.org)
        </Text>
        <Text style={{ fontSize: 13, color: colors.textMuted, marginTop: 4 }}>
          Zmanim powered by KosherJava/KosherZmanim
        </Text>
        <Text style={{ fontSize: 13, color: colors.textMuted, marginTop: 4 }}>
          Minyan data from GoDaven.com
        </Text>
      </View>
      </ScrollView>
    </View>
  );
}

function SettingRow({
  label,
  value,
  onToggle,
  colors,
  isLast,
}: {
  label: string;
  value: boolean;
  onToggle: (v: boolean) => void;
  colors: ThemeColors;
  isLast?: boolean;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: colors.border,
      }}
    >
      <Text style={{ fontSize: 16, color: colors.text, flex: 1 }}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: colors.border, true: colors.accent }}
        thumbColor={value ? colors.onAccent : colors.surfaceSecondary}
      />
    </View>
  );
}
