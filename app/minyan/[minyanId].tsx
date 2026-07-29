import {
  View,
  Text,
  ScrollView,
  Pressable,
  Linking,
  Platform,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LoadingSpinner } from "../../src/components/common/LoadingSpinner";
import { useMinyan } from "../../src/hooks/useMinyanim";
import { useTheme } from "../../src/hooks/useTheme";
import { useLocationStore } from "../../src/stores/useLocationStore";
import { useSettingsStore } from "../../src/stores/useSettingsStore";
import { NUSACH_LABELS } from "../../src/utils/constants";
import { haversineKm, formatDistance } from "../../src/utils/distance";
import {
  SLOT_LABELS,
  DAY_SCOPE_LABELS,
  formatMinyanTime,
  groupTimes,
} from "../../src/utils/minyanFormatting";

import { Focusable } from "../../src/components/common/Focusable";
export default function MinyanDetailScreen() {
  const { minyanId } = useLocalSearchParams<{ minyanId: string }>();
  const { colors } = useTheme();
  const { data: minyan, isLoading, isError } = useMinyan(minyanId);
  const location = useLocationStore((s) => s.location);
  const timeFormat = useSettingsStore((s) => s.timeFormat);

  if (isLoading) {
    return <LoadingSpinner message="Loading minyan..." />;
  }

  if (isError || !minyan) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 32,
        }}
      >
        <Ionicons
          name="alert-circle-outline"
          size={40}
          color={colors.textMuted}
        />
        <Text
          style={{
            color: colors.text,
            fontSize: 16,
            fontWeight: "600",
            marginTop: 10,
          }}
        >
          Minyan not found
        </Text>
      </View>
    );
  }

  const distanceKm = location ? haversineKm(location, minyan) : null;

  function openMaps() {
    if (!minyan) return;
    const query = encodeURIComponent(minyan.address || minyan.name);
    const url = Platform.select({
      ios: `http://maps.apple.com/?q=${query}&ll=${minyan.latitude},${minyan.longitude}`,
      default: `geo:${minyan.latitude},${minyan.longitude}?q=${query}`,
    });
    if (url) Linking.openURL(url);
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
    >
      <Text style={{ fontSize: 22, fontWeight: "700", color: colors.text }}>
        {minyan.name}
      </Text>
      <Text style={{ fontSize: 14, color: colors.textMuted, marginTop: 4 }}>
        {NUSACH_LABELS[minyan.nusach] ?? minyan.nusach}
        {distanceKm != null ? ` · ${formatDistance(distanceKm, "mi")}` : ""}
      </Text>

      {minyan.address ? (
        <Focusable
          onPress={openMaps}
          accessibilityRole="button"
          accessibilityLabel={`Open ${minyan.address} in maps`}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 16,
            padding: 14,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
          }}
        >
          <Ionicons name="navigate-outline" size={18} color={colors.primary} />
          <Text style={{ color: colors.text, marginLeft: 10, flex: 1 }}>
            {minyan.address}
          </Text>
          <Ionicons
            name="chevron-forward"
            size={16}
            color={colors.textMuted}
          />
        </Focusable>
      ) : null}

      {minyan.phone ? (
        <Focusable
          onPress={() => Linking.openURL(`tel:${minyan.phone}`)}
          accessibilityRole="button"
          accessibilityLabel={`Call ${minyan.phone}`}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            padding: 14,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
          }}
        >
          <Ionicons name="call-outline" size={18} color={colors.primary} />
          <Text style={{ color: colors.text, marginLeft: 10, flex: 1 }}>
            {minyan.phone}
          </Text>
        </Focusable>
      ) : null}

      {groupTimes(minyan.times).map(([scope, times]) => (
        <View
          key={scope}
          style={{
            marginTop: 16,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
            padding: 14,
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontWeight: "600",
              color: colors.textMuted,
              textTransform: "uppercase",
              letterSpacing: 0.5,
              marginBottom: 6,
            }}
          >
            {DAY_SCOPE_LABELS[scope]}
          </Text>
          {times.map((t, i) => (
            <View
              key={`${t.slot}-${t.time}`}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 9,
                borderBottomWidth: i === times.length - 1 ? 0 : 1,
                borderBottomColor: colors.border,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, color: colors.text }}>
                  {SLOT_LABELS[t.slot]}
                </Text>
                {t.note ? (
                  <Text style={{ fontSize: 12, color: colors.textMuted }}>
                    {t.note}
                  </Text>
                ) : null}
              </View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "600",
                  color: colors.text,
                }}
              >
                {formatMinyanTime(t.time, timeFormat)}
              </Text>
            </View>
          ))}
        </View>
      ))}

      {minyan.notes ? (
        <Text
          style={{ color: colors.textSecondary, fontSize: 13, marginTop: 16 }}
        >
          {minyan.notes}
        </Text>
      ) : null}
    </ScrollView>
  );
}
