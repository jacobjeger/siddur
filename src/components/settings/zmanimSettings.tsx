import { useState } from "react";
import { View, Text, Pressable, TextInput, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../stores/useSettingsStore";
import { useLocationStore } from "../../stores/useLocationStore";
import { useTheme } from "../../hooks/useTheme";
import { Card, Chip } from "../common/ui";
import { hitSlopFor, spacing } from "../../theme/tokens";
import { searchCities } from "../../services/location/locationService";
import { isLocationInIsrael } from "../../utils/geoRegion";
import { LUACH_PRESETS, LUACH_ORDER } from "../../services/zmanim/luach";
import type { CitySearchResult } from "../../services/location/types";
import type {
  AlosMethod,
  HavdalaMethod,
  TzeisMethod,
} from "../../stores/useSettingsStore";

/**
 * Zmanim-related settings, split into independently-composable cards so the
 * settings screen can group them under headings rather than presenting one
 * undifferentiated scroll.
 */

const HAVDALA_OPTIONS: { value: HavdalaMethod; label: string }[] = [
  { value: "8.5deg", label: "8.5°" },
  { value: "42min", label: "42 min" },
  { value: "72min", label: "72 min" },
];

const ALOS_OPTIONS: { value: AlosMethod; label: string }[] = [
  { value: "72min", label: "72 min" },
  { value: "16.1deg", label: "16.1°" },
  { value: "18deg", label: "18°" },
  { value: "19.8deg", label: "19.8°" },
  { value: "90min", label: "90 min" },
];

const TZEIS_OPTIONS: { value: TzeisMethod; label: string }[] = [
  { value: "8.5deg", label: "8.5°" },
  { value: "16.1deg", label: "16.1°" },
  { value: "18deg", label: "18°" },
  { value: "50min", label: "50 min" },
  { value: "72min", label: "72 min" },
];

const CANDLE_LIGHTING_OPTIONS = [18, 20, 22, 30, 40];

const row = { flexDirection: "row" as const, flexWrap: "wrap" as const, gap: spacing.sm };

export function LocationCard() {
  const { colors } = useTheme();
  const { locationMode, manualLocation, setLocationMode, setManualLocation } =
    useSettingsStore();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CitySearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [failed, setFailed] = useState(false);

  async function runSearch() {
    setSearching(true);
    setFailed(false);
    try {
      const found = await searchCities(query);
      setResults(found);
      // searchCities swallows network errors and returns [], which previously
      // told an offline user the city did not exist.
      setFailed(found.length === 0);
    } finally {
      setSearching(false);
    }
  }

  function choose(city: CitySearchResult) {
    setManualLocation({ lat: city.latitude, lng: city.longitude, name: city.name });
    setLocationMode("manual");
    setResults([]);
    setQuery("");
  }

  return (
    <Card title="Location">
      <View style={[row, { marginBottom: spacing.md }]}>
        <Chip
          label="Automatic (GPS)"
          selected={locationMode === "auto"}
          onPress={() => setLocationMode("auto")}
        />
        <Chip
          label="Manual"
          selected={locationMode === "manual"}
          onPress={() => setLocationMode("manual")}
        />
      </View>

      {locationMode === "manual" && (
        <View>
          {manualLocation && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: spacing.sm,
              }}
            >
              <Ionicons name="pin" size={15} color={colors.primary} />
              <Text style={{ color: colors.text, marginLeft: 6, flex: 1 }}>
                {manualLocation.name}
              </Text>
              <Pressable
                onPress={() => setManualLocation(null)}
                accessibilityRole="button"
                accessibilityLabel="Clear manual location"
                hitSlop={hitSlopFor(18)}
              >
                <Ionicons name="close" size={18} color={colors.textMuted} />
              </Pressable>
            </View>
          )}

          <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.xs }}>
            <TextInput
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={runSearch}
              placeholder="Search for a city"
              placeholderTextColor={colors.textMuted}
              returnKeyType="search"
              accessibilityLabel="City search"
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 8,
                paddingHorizontal: spacing.md,
                paddingVertical: spacing.sm,
                color: colors.text,
                backgroundColor: colors.background,
              }}
            />
            <Pressable
              onPress={runSearch}
              accessibilityRole="button"
              accessibilityLabel="Search cities"
              style={{
                paddingHorizontal: 14,
                justifyContent: "center",
                borderRadius: 8,
                backgroundColor: colors.primary,
              }}
            >
              {searching ? (
                <ActivityIndicator size="small" color={colors.onPrimary} />
              ) : (
                <Ionicons name="search" size={16} color={colors.onPrimary} />
              )}
            </Pressable>
          </View>

          {results.map((city) => (
            <Pressable
              key={`${city.latitude},${city.longitude}`}
              onPress={() => choose(city)}
              accessibilityRole="button"
              accessibilityLabel={`Use ${city.name}`}
              style={{
                paddingVertical: spacing.md,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
              }}
            >
              <Text style={{ color: colors.text }}>{city.name}</Text>
            </Pressable>
          ))}

          {!searching && failed && query.length >= 2 && (
            <Text
              style={{ color: colors.textMuted, fontSize: 13, paddingVertical: spacing.md }}
            >
              No matches. Check the spelling, try a larger nearby city, or
              confirm you are online.
            </Text>
          )}
        </View>
      )}
    </Card>
  );
}

export function IsraelDiasporaCard() {
  const { inIsrael, setInIsrael } = useSettingsStore();
  const location = useLocationStore((s) => s.location);
  const autoDetected = isLocationInIsrael(location);

  return (
    <Card
      title="Israel / Diaspora"
      subtitle="Affects second-day Yom Tov, the parsha, and when V'Sein Tal U'Matar begins"
    >
      <View style={row}>
        <Chip
          label={`Auto (${autoDetected ? "Israel" : "Diaspora"})`}
          selected={inIsrael === null}
          onPress={() => setInIsrael(null)}
        />
        <Chip label="Israel" selected={inIsrael === true} onPress={() => setInIsrael(true)} />
        <Chip
          label="Diaspora"
          selected={inIsrael === false}
          onPress={() => setInIsrael(false)}
        />
      </View>
    </Card>
  );
}

export function LuachCard() {
  const { colors } = useTheme();
  const { luachId, setLuachId } = useSettingsStore();

  return (
    <Card
      title="Luach"
      subtitle="Which opinions zmanim are calculated from. Independent of nusach — nusach chooses the text, luach chooses the times."
    >
      <View style={row}>
        {LUACH_ORDER.map((id) => (
          <Chip
            key={id}
            label={LUACH_PRESETS[id].name}
            selected={luachId === id}
            onPress={() => setLuachId(id)}
          />
        ))}
      </View>
      <Text style={{ fontSize: 13, color: colors.textMuted, marginTop: spacing.md }}>
        {LUACH_PRESETS[luachId]?.description ?? ""}
      </Text>
    </Card>
  );
}

export function CandleLightingCard() {
  const { candleLightingOffset, setCandleLightingOffset } = useSettingsStore();

  return (
    <Card title="Candle Lighting" subtitle="Minutes before shkia">
      <View style={row}>
        {CANDLE_LIGHTING_OPTIONS.map((min) => (
          <Chip
            key={min}
            label={`${min}${min === 40 ? " (Jer.)" : ""}`}
            selected={candleLightingOffset === min}
            onPress={() => setCandleLightingOffset(min)}
          />
        ))}
      </View>
    </Card>
  );
}

export function HavdalaCard() {
  const { havdalaMethod, setHavdalaMethod } = useSettingsStore();

  return (
    <Card title="Havdala" subtitle="Method used to calculate the end of Shabbos and Yom Tov">
      <View style={row}>
        {HAVDALA_OPTIONS.map((opt) => (
          <Chip
            key={opt.value}
            label={opt.label}
            selected={havdalaMethod === opt.value}
            onPress={() => setHavdalaMethod(opt.value)}
          />
        ))}
      </View>
    </Card>
  );
}

/**
 * Only shown for the "Custom" luach. A named luach defines its own alos, tzeis
 * and elevation, so exposing these alongside it would imply they do something
 * when they do not.
 */
export function CustomZmanimCards() {
  const {
    luachId,
    alosMethod,
    tzeisMethod,
    useElevation,
    setAlosMethod,
    setTzeisMethod,
    setUseElevation,
  } = useSettingsStore();

  if (luachId !== "custom") return null;

  return (
    <>
      <Card title="Alos HaShachar" subtitle="Opinion used for dawn">
        <View style={row}>
          {ALOS_OPTIONS.map((opt) => (
            <Chip
              key={opt.value}
              label={opt.label}
              selected={alosMethod === opt.value}
              onPress={() => setAlosMethod(opt.value)}
            />
          ))}
        </View>
      </Card>

      <Card
        title="Tzeis HaKochavim"
        subtitle="Opinion used for nightfall — also decides when the Hebrew date rolls over"
      >
        <View style={row}>
          {TZEIS_OPTIONS.map((opt) => (
            <Chip
              key={opt.value}
              label={opt.label}
              selected={tzeisMethod === opt.value}
              onPress={() => setTzeisMethod(opt.value)}
            />
          ))}
        </View>
      </Card>

      <Card
        title="Elevation"
        subtitle="Factor your altitude into netz and shkia, and everything derived from them"
      >
        <View style={row}>
          <Chip
            label="Sea level"
            selected={!useElevation}
            onPress={() => setUseElevation(false)}
          />
          <Chip
            label="Use elevation"
            selected={useElevation}
            onPress={() => setUseElevation(true)}
          />
        </View>
      </Card>
    </>
  );
}
