import React from 'react';
import { View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../src/contexts/ThemeContext';
import { getAllChapters } from '../../data/chaptersData';
import ChapterCard from '../../components/ChapterCard';
import SearchBar from '../../components/SearchBar';

export default function ChaptersScreen() {
  const { isDark, fontSize } = useTheme();
  const insets = useSafeAreaInsets();
  const chapters = getAllChapters();

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
    container: {
      flex: 1,
      backgroundColor: isDark ? '#111827' : '#f8fafc',
    },    header: {
      backgroundColor: isDark ? '#1f2937' : '#2563eb',
      paddingHorizontal: 20,
      paddingVertical: 24,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    headerTitle: {
      fontSize: getFontSize() + 8,
      fontWeight: 'bold',
      color: '#ffffff',
      textAlign: 'center',
      marginBottom: 8,
    },
    headerSubtitle: {
      fontSize: getFontSize(),
      color: '#ffffff',
      opacity: 0.9,
      textAlign: 'center',
    },
    searchContainer: {
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    content: {
      flex: 1,
      paddingHorizontal: 16,
    },
    sectionTitle: {
      fontSize: getFontSize() + 4,
      fontWeight: 'bold',
      color: isDark ? '#ffffff' : '#111827',
      textAlign: 'right',
      marginBottom: 16,
      marginTop: 16,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>فصول الكتاب</Text>
        <Text style={styles.headerSubtitle}>
          استكشف جميع فصول كتاب فن التعلم
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <SearchBar onChapterSelect={(chapter) => router.push(`/chapter/${chapter.id}`)} />
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Platform.OS === 'android' ? insets.bottom + 20 : 20 }} // Consistent padding for nav bar
      >
        <Text style={styles.sectionTitle}>جميع الفصول</Text>
        {chapters.map((chapter) => (
          <ChapterCard
            key={chapter.id}
            chapter={chapter}
            onPress={() => router.push(`/chapter/${chapter.id}`)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
