import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, I18nManager } from 'react-native';
import * as Localization from 'expo-localization';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/src/contexts/ThemeContext';
import { Text, View } from 'react-native';

export default function TabLayout() {
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();
  
  // تحديد الألوان حسب الثيم
  const currentTheme = Colors[isDark ? 'dark' : 'light'];
  
  // تفعيل RTL للغة العربية
  const isRTL = Localization.isRTL || I18nManager.isRTL;
  
  // التأكد من تفعيل RTL
  if (!I18nManager.isRTL) {
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: currentTheme.tabIconSelected, // استخدام اللون من الثيم
        tabBarInactiveTintColor: currentTheme.tabIconDefault,
        headerShown: true,
        tabBarLabelStyle: {
          textAlign: isRTL ? 'right' : 'left',
          fontSize: 12,
          writingDirection: isRTL ? 'rtl' : 'ltr',
        },
        tabBarItemStyle: {
          flexDirection: isRTL ? 'row-reverse' : 'row',
        },
        tabBarStyle: {
          backgroundColor: currentTheme.background,
          borderTopColor: isDark ? '#333333' : '#E5E5E5',
          borderTopWidth: 1,
          paddingBottom: Platform.OS === 'android' ? Math.max(25, insets.bottom + 15) : 30,
          paddingTop: Platform.OS === 'android' ? 5 : 0,
          height: Platform.OS === 'android' ? 100 : 90,
          shadowColor: currentTheme.text,
          shadowOffset: { width: 0, height: -1 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 8,
        },
        headerStyle: {
          backgroundColor: currentTheme.background,
          height: Platform.OS === 'android' ? 60 + insets.top : 60,
          shadowColor: currentTheme.text,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 4,
        },
        headerTintColor: currentTheme.text,
        headerTitleStyle: {
          color: currentTheme.text,
          fontWeight: '600',
          textAlign: 'left',
          marginLeft: 20,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'الرئيسية',
          headerTitle: () => (
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Text style={{
                color: currentTheme.text,
                fontWeight: '600',
                fontSize: 18,
                textAlign: 'right',
                paddingLeft: 12,
              }}>
                الرئيسية
              </Text>
            </View>
          ),
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chapters"
        options={{
          title: 'الفصول',
          headerTitle: () => (
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Text style={{
                color: currentTheme.text,
                fontWeight: '600',
                fontSize: 18,
                textAlign: 'right',
                paddingLeft: 12,
              }}>
                الفصول
              </Text>
            </View>
          ),
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name={focused ? 'book-open-page-variant' : 'book-open-page-variant-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'الإعدادات',
          headerTitle: () => (
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Text style={{
                color: currentTheme.text,
                fontWeight: '600',
                fontSize: 18,
                textAlign: 'right',
                paddingLeft: 12,
              }}>
                الإعدادات
              </Text>
            </View>
          ),
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="settings" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chapter"
        options={{
          href: null, // إخفاء هذا التاب
          headerShown: false, // شاشة الفصل سيكون لها هيدر خاص بها
        }}
      />
    </Tabs>
  );
}