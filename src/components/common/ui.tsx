import { View, Text, Pressable, type ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../hooks/useTheme";
import { Focusable } from "./Focusable";
import { radius, spacing, typeScale, MIN_TOUCH_TARGET } from "../../theme/tokens";

/**
 * Shared surface primitives.
 *
 * These replace three near-identical Card implementations (calendar tab,
 * LocationSettings, and five inlined copies in settings) and three
 * near-identical Chip implementations, each with its own radius and padding.
 */

export function Card({
  title,
  subtitle,
  icon,
  children,
  style,
}: {
  title?: string;
  subtitle?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderRadius: radius.md,
          borderWidth: 1,
          borderColor: colors.border,
          padding: spacing.lg,
        },
        style,
      ]}
    >
      {title ? (
        <View style={{ marginBottom: subtitle ? spacing.xs : spacing.md }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {icon ? (
              <Ionicons
                name={icon}
                size={18}
                color={colors.accent}
                style={{ marginRight: spacing.sm }}
              />
            ) : null}
            <Text
              style={{
                fontSize: typeScale.eyebrow,
                fontWeight: "600",
                color: colors.textMuted,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                flex: 1,
              }}
            >
              {title}
            </Text>
          </View>
        </View>
      ) : null}

      {subtitle ? (
        <Text
          style={{
            fontSize: typeScale.caption,
            color: colors.textMuted,
            marginBottom: spacing.md,
          }}
        >
          {subtitle}
        </Text>
      ) : null}

      {children}
    </View>
  );
}

/**
 * Group heading for a run of related cards. Settings was 13 ungrouped cards in
 * one scroll, with prayer and zmanim settings interleaved arbitrarily.
 */
export function SectionHeader({ title }: { title: string }) {
  const { colors } = useTheme();

  return (
    <Text
      accessibilityRole="header"
      style={{
        fontSize: typeScale.eyebrow,
        fontWeight: "700",
        color: colors.textMuted,
        textTransform: "uppercase",
        letterSpacing: 0.8,
        marginTop: spacing.xl,
        marginBottom: spacing.sm,
        marginHorizontal: spacing.lg + spacing.xs,
      }}
    >
      {title}
    </Text>
  );
}

export function Chip({
  label,
  selected,
  onPress,
  pill,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
  /** Pill shape for filter bars; squared for settings groups. */
  pill?: boolean;
}) {
  const { colors } = useTheme();

  return (
    <Focusable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      // Selection stays a FILL here and focus is a ring drawn outside the chip,
      // so the two never collide. Deliberately not `selected` on Focusable: a
      // gold left edge on a pill reads as damage, and the fill already says it.
      style={{
        minHeight: MIN_TOUCH_TARGET,
        justifyContent: "center",
        paddingHorizontal: spacing.lg,
        borderRadius: pill ? radius.pill : radius.sm,
        borderWidth: 1,
        backgroundColor: selected ? colors.primary : colors.surface,
        borderColor: selected ? colors.primary : colors.border,
      }}
    >
      <Text
        style={{
          fontSize: typeScale.body,
          fontWeight: "500",
          color: selected ? colors.onPrimary : colors.text,
        }}
      >
        {label}
      </Text>
    </Focusable>
  );
}

/** A label/value row, as used by the calendar details card and minyan detail. */
export function InfoRow({
  label,
  value,
  isLast,
}: {
  label: string;
  value: string;
  isLast?: boolean;
}) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: colors.border,
        gap: spacing.md,
      }}
    >
      {/* Both sides shrink, so a long value wraps instead of crushing the
          label into a one-word-per-line column. */}
      <Text
        style={{ fontSize: typeScale.body, color: colors.textSecondary, flexShrink: 1 }}
      >
        {label}
      </Text>
      <Text
        style={{
          fontSize: typeScale.body,
          fontWeight: "600",
          color: colors.text,
          flexShrink: 1,
          textAlign: "right",
        }}
      >
        {value}
      </Text>
    </View>
  );
}
