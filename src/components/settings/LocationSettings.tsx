import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../stores/useSettingsStore";
import { useLocationStore } from "../../stores/useLocationStore";
import { useTheme } from "../../hooks/useTheme";
import { Card, Chip } from "../common/ui";
import { hitSlopFor } from "../../theme/tokens";
import { searchCities } from "../../services/location/locationService";
import { isLocationInIsrael } from "../../utils/geoRegion";
import { LUACH_PRESETS, LUACH_ORDER } from "../../services/zmanim/luach";
import type { CitySearchResult } from "../../services/location/types";
import type {
  AlosMethod,
  HavdalaMethod,
  TzeisMethod,
} from "../../stores/useSettingsStore";

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

export function LocationSettings() {
  const { colors } = useTheme();
  const {
    locationMode,
    manualLocation,
    havdalaMethod,
    inIsrael,
    alosMethod,
    tzeisMethod,
    useElevation,
    minhag,
    luachId,
    setLocationMode,
    setManualLocation,
    setHavdalaMethod,
    setInIsrael,
    setAlosMethod,
    setTzeisMethod,
    setUseElevation,
    setMinhag,
    setLuachId,
  } = useSettingsStore();
  const location = useLocationStore((s) => s.location);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CitySearchResult[]>([]);
  const [searching, setSearching] = useState(false);

  const autoDetected = isLocationInIsrael(location);

  async function runSearch() {
    setSearching(true);
    try {
      setResults(await searchCities(query));
    } finally {
      setSearching(false);
    }
  }

  function choose(city: CitySearchResult) {
    setManualLocation({
      lat: city.latitude,
      lng: city.longitude,
      name: city.name,
    });
    setLocationMode("manual");
    setResults([]);
    setQuery("");
  }

  return (
    <>
      <Card title="Location">
        <View style={{ flexDirection: "row", gap: 8, marginBottom: 12 }}>
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
                  paddingVertical: 8,
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
                  // The icon alone is an ~18pt target; hitSlop brings the
                  // touchable area up to roughly 44pt.
                  hitSlop={hitSlopFor(18)}
                >
                  <Ionicons name="close" size={18} color={colors.textMuted} />
                </Pressable>
              </View>
            )}

            <View style={{ flexDirection: "row", gap: 8, marginTop: 4 }}>
              <TextInput
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={runSearch}
                placeholder="Search for a city"
                placeholderTextColor={colors.textMuted}
                returnKeyType="search"
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  color: colors.text,
                  backgroundColor: colors.background,
                }}
              />
              <Pressable
                onPress={runSearch}
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
                style={{
                  paddingVertical: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                }}
              >
                <Text style={{ color: colors.text }}>{city.name}</Text>
              </Pressable>
            ))}

            {!searching && query.length >= 2 && results.length === 0 && (
              <Text
                style={{
                  color: colors.textMuted,
                  fontSize: 13,
                  paddingVertical: 10,
                }}
              >
                No matches — try a larger nearby city.
              </Text>
            )}
          </View>
        )}
      </Card>

      <Card
        title="Israel / Diaspora"
        subtitle="Affects second-day Yom Tov, the parsha, and when V'Sein Tal U'Matar begins"
      >
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Chip
            label={`Auto (${autoDetected ? "Israel" : "Diaspora"})`}
            selected={inIsrael === null}
            onPress={() => setInIsrael(null)}
          />
          <Chip
            label="Israel"
            selected={inIsrael === true}
            onPress={() => setInIsrael(true)}
          />
          <Chip
            label="Diaspora"
            selected={inIsrael === false}
            onPress={() => setInIsrael(false)}
          />
        </View>
      </Card>

      <Card
        title="Havdala"
        subtitle="Method used to calculate the end of Shabbos and Yom Tov"
      >
        <View style={{ flexDirection: "row", gap: 8 }}>
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

      {/* Minhag is a custom axis, not a zmanim one — it stays visible
          regardless of which luach is selected. */}
      <Card
        title="Minhag"
        subtitle="Independent of nusach — affects Shir Shel Yom and L'Dovid, not which text is shown"
      >
        <View style={{ flexDirection: "row", gap: 8 }}>
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

      <Card
        title="Luach"
        subtitle="The opinion set used for zmanim. Independent of nusach — nusach chooses the text, luach chooses the times."
      >
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {LUACH_ORDER.map((id) => (
            <Chip
              key={id}
              label={LUACH_PRESETS[id].name}
              selected={luachId === id}
              onPress={() => setLuachId(id)}
            />
          ))}
        </View>
        <Text
          style={{ fontSize: 13, color: colors.textMuted, marginTop: 10 }}
        >
          {LUACH_PRESETS[luachId]?.description ?? ""}
        </Text>
      </Card>

      {/*
        A named luach defines its own alos, tzeis and elevation, so exposing the
        individual pickers alongside it would be misleading — they would appear
        to do something and not. Only "Custom" shows them.
      */}
      {luachId !== "custom" ? null : (
      <>
      <Card
        title="Alos HaShachar"
        subtitle="Opinion used for dawn"
      >
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
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
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
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
        <View style={{ flexDirection: "row", gap: 8 }}>
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
      )}
    </>
  );
}
