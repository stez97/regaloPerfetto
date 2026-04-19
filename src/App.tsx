import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootStackParamList } from "./navigation";
import CreateRecipientScreen from "./screens/CreateRecipient";
import GuidedSessionScreen from "./screens/GuidedSession";
import HomeScreen from "./screens/Home";
import IdeaDetailScreen from "./screens/IdeaDetail";
import OnboardingScreen from "./screens/Onboarding";
import ResultsScreen from "./screens/Results";
import SettingsScreen from "./screens/Settings";
import ShortlistScreen from "./screens/Shortlist";
import SplashScreen from "./screens/Splash";
import { storage } from "./services/storageService";
import { theme } from "./theme";

const Stack = createNativeStackNavigator<RootStackParamList>();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.background,
    card: theme.colors.surface,
    text: theme.colors.text,
    border: theme.colors.border,
    primary: theme.colors.text,
  },
};

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function bootstrap() {
      const completed = await storage.get<boolean>("onboarding_completed");
      await new Promise((resolve) => setTimeout(resolve, 1200));

      if (isMounted) {
        setHasCompletedOnboarding(Boolean(completed));
        setIsReady(true);
      }
    }

    void bootstrap();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!isReady) {
    return <SplashScreen />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator
          initialRouteName={hasCompletedOnboarding ? "Home" : "Onboarding"}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="CreateRecipient" component={CreateRecipientScreen} />
          <Stack.Screen name="GuidedSession" component={GuidedSessionScreen} />
          <Stack.Screen name="Results" component={ResultsScreen} />
          <Stack.Screen name="IdeaDetail" component={IdeaDetailScreen} />
          <Stack.Screen name="Shortlist" component={ShortlistScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
