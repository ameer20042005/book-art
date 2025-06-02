import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { ThemeProvider } from '../src/contexts/ThemeContext';
import { UserProvider } from '../src/contexts/UserContext';

// Prevent auto-hiding splash screen
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <UserProvider>
        <Stack 
          screenOptions={{ 
            headerShown: false,
            contentStyle: { 
              // Remove any global padding that causes overlap
              paddingTop: 0 
            },
            animation: 'slide_from_right',
          }} 
        />
        <StatusBar style="auto" />
      </UserProvider>
    </ThemeProvider>
  );
}