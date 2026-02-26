import "../global.css";
import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-system-ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

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
      <Stack screenOptions={{ headerShown: false }}>
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
          name="minyan/[minyanId]"
          options={{ headerShown: true, title: "Minyan Details" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </QueryClientProvider>
  );
}
