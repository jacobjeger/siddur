import { View, Text, ScrollView, Switch } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSettingsStore } from "../../src/stores/useSettingsStore";
import { useTheme, type ThemeColors } from "../../src/hooks/useTheme";
import { Card, Chip, SectionHeader } from "../../src/components/common/ui";
import { spacing } from "../../src/theme/tokens";
import { ALL_TEFILOS } from "../../src/data/prayers";
import {
  NusachCard,
  MinhagCard,
  TextSizeCard,
} from "../../src/components/settings/prayerSettings";
import {
  LocationCard,
  IsraelDiasporaCard,
  LuachCard,
  CandleLightingCard,
  HavdalaCard,
  CustomZmanimCards,
} from "../../src/components/settings/zmanimSettings";

/** No English exists in the corpus yet, so the toggle would be inert. */
const HAS_TRANSLATIONS = ALL_TEFILOS.some((t) =>
  t.sections.some((s) => Boolean(s.translation))
);

export default function SettingsTab() {
  const {
    showEnglish,
    darkMode,
    keepScreenOn,
    timeFormat,
    setShowEnglish,
    setDarkMode,
    setKeepScreenOn,
    setTimeFormat,
  } = useSettingsStore();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Dark band behind the light-styled status bar — see minyanim.tsx. */}
      <View style={{ height: insets.top, backgroundColor: colors.headerBg }} />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: spacing.lg,
          paddingBottom: spacing.xxl,
        }}
      >
        {/*
          This screen was 13 ungrouped cards in one scroll, with prayer and
          zmanim settings interleaved — Nusach sat after every zmanim control,
          and Candle Lighting was stranded away from the rest of them. The
          grouping now matches the three independent axes the app models:
          nusach (which text), minhag (which customs) and luach (which times).
        */}
        <SectionHeader title="Prayer" />
        <View style={{ gap: spacing.md }}>
          <NusachCard />
          <MinhagCard />
          <TextSizeCard />
          {HAS_TRANSLATIONS && (
            <Card title="Translation">
              <SettingRow
                label="Show English"
                value={showEnglish}
                onToggle={setShowEnglish}
                colors={colors}
                isLast
              />
            </Card>
          )}
        </View>

        <SectionHeader title="Zmanim" />
        <View style={{ gap: spacing.md }}>
          <LuachCard />
          <LocationCard />
          <IsraelDiasporaCard />
          <CandleLightingCard />
          <HavdalaCard />
          <CustomZmanimCards />
        </View>

        <SectionHeader title="App" />
        <View style={{ gap: spacing.md }}>
          <Card title="Appearance" subtitle="Dark mode">
            <View
              style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}
            >
              {(["off", "on", "system"] as const).map((mode) => (
                <Chip
                  key={mode}
                  label={mode[0].toUpperCase() + mode.slice(1)}
                  selected={darkMode === mode}
                  onPress={() => setDarkMode(mode)}
                />
              ))}
            </View>
          </Card>

          <Card title="Behaviour">
            <SettingRow
              label="Keep screen on while davening"
              value={keepScreenOn}
              onToggle={setKeepScreenOn}
              colors={colors}
            />
            <SettingRow
              label="24-hour time"
              value={timeFormat === "24h"}
              onToggle={(v) => setTimeFormat(v ? "24h" : "12h")}
              colors={colors}
              isLast
            />
          </Card>
        </View>

        <SectionHeader title="About" />
        <Card>
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
          <Text
            style={{ fontSize: 13, color: colors.textMuted, marginTop: spacing.xs }}
          >
            Texts distributed via Sefaria (sefaria.org)
          </Text>
          <Text
            style={{ fontSize: 13, color: colors.textMuted, marginTop: spacing.xs }}
          >
            Zmanim powered by KosherJava/KosherZmanim
          </Text>
          <Text
            style={{ fontSize: 13, color: colors.textMuted, marginTop: spacing.xs }}
          >
            Minyan data from GoDaven.com
          </Text>
        </Card>
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
        paddingVertical: spacing.md,
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: colors.border,
        minHeight: 44,
      }}
    >
      <Text style={{ fontSize: 16, color: colors.text, flex: 1 }}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onToggle}
        accessibilityLabel={label}
        trackColor={{ false: colors.border, true: colors.accent }}
        thumbColor={value ? colors.onAccent : colors.surfaceSecondary}
      />
    </View>
  );
}
