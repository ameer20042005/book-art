import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/src/contexts/ThemeContext';
import { useUser } from '@/src/contexts/UserContext';
// import DifficultyBadge from './DifficultyBadge'; // تم حذف مكون مستوى الصعوبة
// import ReadTimeIndicator from './ReadTimeIndicator'; // تم حذف مكون وقت القراءة
import type { Chapter } from '../data/chaptersData';

interface ChapterCardProps {
  chapter: Chapter;
  onPress: () => void;
  style?: ViewStyle;
}

export default function ChapterCard({ chapter, onPress, style }: ChapterCardProps) {
  const { isDark, fontSize } = useTheme();
  const { preferences } = useUser();
  
  const chapterProgress = preferences.readingProgress[chapter.id];
  const isBookmarked = chapterProgress?.bookmarked || false;

  const getFontSize = () => {
    switch (fontSize) {
      case 'small':
        return 14;
      case 'large':
        return 18;
      default:
        return 16;
    }
  };

  const styles = StyleSheet.create({
    card: {
      backgroundColor: isDark ? '#1f2937' : '#ffffff',
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      borderWidth: 1,
      borderColor: isDark ? '#374151' : '#f3f4f6',
      ...style,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    leftContent: {
      flex: 1,
      marginRight: 12,
    },
    title: {
      fontSize: getFontSize() + 2,
      fontWeight: 'bold',
      marginBottom: 8,
      textAlign: 'right',
      color: isDark ? '#ffffff' : '#111827',
      lineHeight: getFontSize() * 1.4,
    },
    description: {
      fontSize: getFontSize() - 1,
      color: isDark ? '#d1d5db' : '#6b7280',
      textAlign: 'right',
      lineHeight: getFontSize() * 1.3,
      // تعديل لإزالة الهامش السفلي غير الضروري بعد إزالة metadata
    },
    // تم حذف أنماط metadata لأنها لم تعد مطلوبة
    chevron: {
      marginTop: 4,
    },
  });

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.leftContent}>
          <Text style={styles.title}>{chapter.title}</Text>
          <Text style={styles.description}>{chapter.description}</Text>
          {/* تم حذف عرض وقت القراءة ومستوى الصعوبة */}
        </View>
        
        <View style={styles.chevron}>
          <MaterialIcons name="chevron-left" size={24} color={isDark ? '#9ca3af' : '#6b7280'} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
