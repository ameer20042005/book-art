import { Stack } from 'expo-router';
import { useTheme } from '../../../src/contexts/ThemeContext';

export default function ChapterLayout() {
  const { isDark } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: isDark ? '#111827' : '#f8fafc',
          // Remove all padding to avoid any layout overlap
          paddingTop: 0,
        },
        animation: 'slide_from_right',
        presentation: 'card',
      }}
    />
  );
}
