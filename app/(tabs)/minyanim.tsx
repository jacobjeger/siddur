import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  Linking,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LoadingSpinner } from "../../src/components/common/LoadingSpinner";
import { LocationDisplay } from "../../src/components/common/LocationDisplay";
import { useTheme, type ThemeColors } from "../../src/hooks/useTheme";
import { useMinyanim } from "../../src/hooks/useMinyanim";
import {
  useSettingsStore,
  type Nusach,
} from "../../src/stores/useSettingsStore";
import { NUSACH_LABELS } from "../../src/utils/constants";
import { formatDistance } from "../../src/utils/distance";
import { SLOT_LABELS, formatMinyanTime } from "../../src/utils/minyanFormatting";
import type { TefilaSlot } from "../../src/services/minyanim/types";

const SLOTS: TefilaSlot[] = ["shacharis", "mincha", "maariv"];
const NUSACHIM: Nusach[] = ["ashkenaz", "sefard", "edot_hamizrach", "ari"];

function FilterChip({
  label,
  selected,
  onPress,
  colors,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
  colors: ThemeColors;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        borderWidth: 1,
        backgroundColor: selected ? colors.primary : colors.surface,
        borderColor: selected ? colors.primary : colors.border,
      }}
    >
      <Text
        style={{
          fontSize: 13,
          fontWeight: "500",
          color: selected ? colors.onPrimary : colors.text,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function CenteredMessage({
  icon,
  title,
  body,
  colors,
  children,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  body: string;
  colors: ThemeColors;
  children?: React.ReactNode;
}) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 32,
      }}
    >
      <Ionicons name={icon} size={40} color={colors.textMuted} />
      <Text
        style={{
          color: colors.text,
          fontSize: 16,
          fontWeight: "600",
          marginTop: 10,
          textAlign: "center",
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          color: colors.textSecondary,
          marginTop: 4,
          textAlign: "center",
        }}
      >
        {body}
      </Text>
      {children}
    </View>
  );
}

export default function MinyanimTab() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const timeFormat = useSettingsStore((s) => s.timeFormat);

  const [search, setSearch] = useState("");
  const [nusach, setNusach] = useState<Nusach | null>(null);
  const [slot, setSlot] = useState<TefilaSlot | null>(null);

  const { data, isLoading, isError, error, refetch, isLive } = useMinyanim({
    search,
    nusach,
    slot,
  });

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/*
        The status bar is styled "light" app-wide, so the band behind it has to
        be dark on every screen. This tab has no header of its own, and without
        this the clock and battery were white-on-cream.
      */}
      <View style={{ height: insets.top, backgroundColor: colors.headerBg }} />
      <LocationDisplay />

      {!isLive && (
        <View
          style={{
            marginHorizontal: 16,
            marginTop: 12,
            padding: 12,
            borderRadius: 10,
            backgroundColor: colors.primaryLight,
            borderWidth: 1,
            borderColor: colors.border,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="information-circle-outline"
            size={16}
            color={colors.primary}
          />
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 12,
              marginLeft: 6,
              flex: 1,
            }}
          >
            Sample data — live GoDaven minyanim are not connected yet.
          </Text>
        </View>
      )}

      <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search by name or address"
          placeholderTextColor={colors.textMuted}
          style={{
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 10,
            paddingHorizontal: 12,
            paddingVertical: 9,
            color: colors.text,
            backgroundColor: colors.surface,
          }}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, paddingVertical: 10 }}
        >
          {SLOTS.map((s) => (
            <FilterChip
              key={s}
              label={SLOT_LABELS[s]}
              selected={slot === s}
              onPress={() => setSlot(slot === s ? null : s)}
              colors={colors}
            />
          ))}
          {NUSACHIM.map((n) => (
            <FilterChip
              key={n}
              label={NUSACH_LABELS[n] ?? n}
              selected={nusach === n}
              onPress={() => setNusach(nusach === n ? null : n)}
              colors={colors}
            />
          ))}
        </ScrollView>
      </View>

      {isLoading ? (
        <LoadingSpinner message="Loading minyanim..." />
      ) : isError ? (
        <CenteredMessage
          icon="cloud-offline-outline"
          title="Couldn't load minyanim"
          body={error instanceof Error ? error.message : "Something went wrong."}
          colors={colors}
        >
          <Pressable
            onPress={() => refetch()}
            style={{
              marginTop: 14,
              paddingHorizontal: 18,
              paddingVertical: 9,
              borderRadius: 8,
              backgroundColor: colors.primary,
            }}
          >
            <Text style={{ color: colors.onPrimary, fontWeight: "600" }}>Retry</Text>
          </Pressable>
        </CenteredMessage>
      ) : !data || data.length === 0 ? (
        <CenteredMessage
          icon="search-outline"
          title="No minyanim found"
          body="Try clearing the filters or widening your search."
          colors={colors}
        />
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
        >
          {data.map((minyan) => {
            const next = slot
              ? minyan.times.find((t) => t.slot === slot)
              : minyan.times[0];

            return (
              <Pressable
                key={minyan.id}
                onPress={() => router.push(`/minyan/${minyan.id}`)}
                style={({ pressed }) => ({
                  backgroundColor: pressed
                    ? colors.surfaceSecondary
                    : colors.surface,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: colors.border,
                  padding: 14,
                  marginBottom: 10,
                  flexDirection: "row",
                  alignItems: "center",
                })}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: colors.text,
                    }}
                  >
                    {minyan.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      color: colors.textMuted,
                      marginTop: 2,
                    }}
                  >
                    {NUSACH_LABELS[minyan.nusach] ?? minyan.nusach}
                    {minyan.distanceKm != null
                      ? ` · ${formatDistance(minyan.distanceKm, "mi")}`
                      : ""}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: next ? colors.textSecondary : colors.textMuted,
                      marginTop: 4,
                    }}
                  >
                    {next
                      ? `${SLOT_LABELS[next.slot]} ${formatMinyanTime(next.time, timeFormat)}`
                      : "Times unavailable"}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={colors.textMuted}
                />
              </Pressable>
            );
          })}

          <Pressable
            onPress={() => Linking.openURL("https://www.godaven.com")}
            style={{ marginTop: 8, paddingVertical: 12, alignItems: "center" }}
          >
            <Text style={{ color: colors.primary, fontSize: 14 }}>
              Browse more on GoDaven.com
            </Text>
          </Pressable>
        </ScrollView>
      )}
    </View>
  );
}
