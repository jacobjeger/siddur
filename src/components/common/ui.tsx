import { View, Text, Pressable, type ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../hooks/useTheme";
import { radius, spacing, type, MIN_TOUCH_TARGET } from "../../theme/tokens";

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
                fontSize: type.eyebrow,
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
            fontSize: type.caption,
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
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
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
          fontSize: 14,
          fontWeight: "500",
          color: selected ? colors.onPrimary : colors.text,
        }}
      >
        {label}
      </Text>
    </Pressable>
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
        style={{ fontSize: type.body, color: colors.textSecondary, flexShrink: 1 }}
      >
        {label}
      </Text>
      <Text
        style={{
          fontSize: type.body,
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
