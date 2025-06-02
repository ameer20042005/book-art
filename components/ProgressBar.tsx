import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '@/src/contexts/ThemeContext';

interface ProgressBarProps {
  progress: number; // 0-100
  height?: number;
  backgroundColor?: string;
  progressColor?: string;
  showPercentage?: boolean;
  style?: ViewStyle;
}

export default function ProgressBar({
  progress,
  height = 8,
  backgroundColor,
  progressColor,
  showPercentage = false,
  style,
}: ProgressBarProps) {
  const { isDark } = useTheme();
  const defaultBackgroundColor = backgroundColor || (isDark ? '#374151' : '#e5e7eb');
  const defaultProgressColor = progressColor || '#2563eb';

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      ...style,
    },
    progressBarBackground: {
      height,
      backgroundColor: defaultBackgroundColor,
      borderRadius: height / 2,
      overflow: 'hidden',
    },
    progressBarFill: {
      height: '100%',
      backgroundColor: defaultProgressColor,
      borderRadius: height / 2,
      width: `${Math.min(100, Math.max(0, progress))}%`,
    },
    percentageText: {
      fontSize: 12,
      color: isDark ? '#e5e7eb' : '#6b7280',
      textAlign: 'center',
      marginTop: 4,
    } as TextStyle,
  });
  return (
    <View style={styles.container}>
      <View style={styles.progressBarBackground}>
        <View style={styles.progressBarFill} />
      </View>
      {Boolean(showPercentage) && (
        <Text style={styles.percentageText}>{Math.round(progress)}%</Text>
      )}
    </View>
  );
}
