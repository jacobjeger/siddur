import "../global.css";
import { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-system-ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTheme } from "../src/hooks/useTheme";
import { SiddurDbProvider, useSiddurDb } from "../src/services/database";

const queryClient = new QueryClient();

function DbGate({ children }: { children: React.ReactNode }) {
  const { isReady, error } = useSiddurDb();
  const { colors } = useTheme();

  if (error) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.background, padding: 20 }}>
        <Text style={{ color: colors.text, fontSize: 16, textAlign: "center" }}>
          Failed to load siddur database: {error}
        </Text>
      </View>
    );
  }

  if (!isReady) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ color: colors.textSecondary, marginTop: 12, fontSize: 14 }}>
          Loading siddur...
        </Text>
      </View>
    );
  }

  return <>{children}</>;
}

function AppStack() {
  const { colors, isDark } = useTheme();

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          headerStyle: { backgroundColor: colors.headerBg },
          headerTintColor: "#ffffff",
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="siddur/[tefilaId]"
          options={{ headerShown: true, title: "Tefila" }}
        />
        <Stack.Screen
          name="siddur/browse"
          options={{ headerShown: true, title: "Browse Tefilos" }}
        />
        <Stack.Screen
          name="siddur/daven"
          options={{ headerShown: true, title: "Davening" }}
        />
        <Stack.Screen
          name="minyan/[minyanId]"
          options={{ headerShown: true, title: "Minyan Details" }}
        />
      </Stack>
      <StatusBar style={isDark ? "light" : "light"} />
    </>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "NotoSerifHebrew-Regular": require("../src/assets/fonts/NotoSerifHebrew-Regular.ttf"),
    "NotoSerifHebrew-Bold": require("../src/assets/fonts/NotoSerifHebrew-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SiddurDbProvider>
        <DbGate>
          <AppStack />
        </DbGate>
      </SiddurDbProvider>
    </QueryClientProvider>
  );
}
