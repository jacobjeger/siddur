import { View, ActivityIndicator, Text } from "react-native";
import { useTheme } from "../../hooks/useTheme";

interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({ message }: LoadingSpinnerProps) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background,
      }}
    >
      <ActivityIndicator size="large" color={colors.primary} />
      {message && (
        <Text
          style={{
            color: colors.textSecondary,
            marginTop: 16,
            textAlign: "center",
          }}
        >
          {message}
        </Text>
      )}
    </View>
  );
}
