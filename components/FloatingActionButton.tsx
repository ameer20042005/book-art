import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, ViewStyle, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../src/contexts/ThemeContext';

// تحديد الأيقونات المسموح بها
type IconName = 'bookmark' | 'bookmark-border' | 'search' | 'share' | 'arrow-upward';

interface FloatingActionButtonProps {
  onPress?: () => void;
  iconName: IconName;
  style?: ViewStyle;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onPress, iconName, style }) => {
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const fabStyle = [
    styles.fab,
    { backgroundColor: isDark ? '#1f2937' : '#2563eb' },
    { bottom: (Platform.OS === 'android' ? insets.bottom : 0) + 20 }, // تعديل للحفاظ على المسافة المناسبة من شريط التنقل
    style,
  ];

  return (
    <TouchableOpacity style={fabStyle} onPress={onPress} activeOpacity={0.7}>
      <MaterialIcons name={iconName} size={28} color="#ffffff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    right: 20,
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
});

export default FloatingActionButton;
