import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-system-ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useTheme } from "../src/hooks/useTheme";

import { setKeyEventSource } from "../src/hooks/useKeyHandler";
import { subscribeToKeyEvents } from "../modules/keyevent";
const queryClient = new QueryClient();

function AppStack() {
  const { colors } = useTheme();

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
      {/* headerBg is a dark brand colour in BOTH themes, so status bar content
          is always light. This was previously a dead
          `isDark ? "light" : "light"` ternary. */}
      <StatusBar style="light" />
    </>
  );
}

// Install the native key-event source once. It is a module-level singleton
// because the d-pad outlives any individual screen; screens attach to it via
// useKeyHandler. On a build without the native module this is a no-op.
setKeyEventSource(subscribeToKeyEvents);

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "NotoSerifHebrew-Regular": require("../src/assets/fonts/NotoSerifHebrew-Regular.ttf"),
    "NotoSerifHebrew-Bold": require("../src/assets/fonts/NotoSerifHebrew-Bold.ttf"),
  });

  // The error from useFonts used to be discarded, so a font that fails to load
  // left `fontsLoaded` false forever and the app rendered a permanently blank
  // screen, indistinguishable from a hang. Hebrew still renders in the system
  // fallback face, so on failure carry on rather than showing nothing at all.
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    // Tabs run with headerShown: false and several screens draw their own
    // header, so they need the real inset values rather than relying on a
    // navigator to reserve space.
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AppStack />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
