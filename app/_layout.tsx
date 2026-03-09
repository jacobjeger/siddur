import "../global.css";
import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-system-ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTheme } from "../src/hooks/useTheme";

const queryClient = new QueryClient();

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
          options={{ headerShown: true, title: "סידור" }}
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
      <AppStack />
    </QueryClientProvider>
  );
}
