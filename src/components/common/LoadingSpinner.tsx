import { View, ActivityIndicator, Text } from "react-native";

interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({ message }: LoadingSpinnerProps) {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color="#1a56db" />
      {message && (
        <Text className="text-gray-500 mt-4 text-center">{message}</Text>
      )}
    </View>
  );
}
