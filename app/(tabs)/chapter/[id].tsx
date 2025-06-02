import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Share, Platform } from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../src/contexts/ThemeContext';
import { useUser } from '../../../src/contexts/UserContext';
import { getChapterById } from '../../../data/chaptersData';

export default function ChapterScreen() {
  const { id } = useLocalSearchParams();
  const { isDark, fontSize } = useTheme();
  const { preferences } = useUser();
  const insets = useSafeAreaInsets();
  const chapter = getChapterById(id as string);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${chapter?.title}\n\n${chapter?.description}`,
        title: chapter?.title,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

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
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
      // Fix Android overlap with status bar
      paddingTop: Platform.OS === 'android' ? insets.top + 12 : 12,
      backgroundColor: isDark ? '#1f2937' : '#ffffff',
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#374151' : '#e5e7eb',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      // Ensure minimum height to prevent content overlap
      minHeight: Platform.OS === 'android' ? insets.top + 60 : 60,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerCenter: {
      flex: 1,
      alignItems: 'center',
      marginHorizontal: 16,
    },
    headerTitle: {
      fontSize: getFontSize() + 2,
      fontWeight: 'bold',
      color: isDark ? '#ffffff' : '#111827',
      textAlign: 'center',
    },
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    headerButton: {
      padding: 8,
      borderRadius: 8,
      backgroundColor: isDark ? '#374151' : '#f3f4f6',
      minWidth: 40,
      alignItems: 'center',
    },
    content: {
      flex: 1,
      padding: 20,
    },
    titleSection: {
      marginBottom: 20,
    },
    title: {
      fontSize: getFontSize() + 6,
      fontWeight: 'bold',
      color: isDark ? '#ffffff' : '#111827',
      marginBottom: 12,
      textAlign: 'right',
      lineHeight: getFontSize() * 1.4,
    },
    text: {
      fontSize: getFontSize(),
      color: isDark ? '#e5e7eb' : '#374151',
      lineHeight: getFontSize() * 1.8,
      textAlign: 'right',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    errorText: {
      fontSize: getFontSize() + 2,
      color: isDark ? '#ef4444' : '#dc2626',
      textAlign: 'center',
    },
  });

  if (!chapter) {
    return (
      <>
        <Stack.Screen 
          options={{ 
            headerShown: false,
            title: '', // Prevent folder name from showing
          }} 
        />
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <TouchableOpacity style={styles.headerButton} onPress={handleGoBack}>
                <MaterialIcons name="arrow-forward" size={20} color={isDark ? '#ffffff' : '#111827'} />
              </TouchableOpacity>
            </View>
            <View style={styles.headerCenter}>
              <Text style={styles.headerTitle}>خطأ</Text>
            </View>
            <View style={styles.headerRight} />
          </View>
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>الفصل غير موجود</Text>
            <TouchableOpacity 
              style={[styles.headerButton, { marginTop: 16 }]} 
              onPress={handleGoBack}
            >
              <Text style={{ color: isDark ? '#ffffff' : '#111827' }}>العودة</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen 
        options={{ 
          headerShown: false,
          title: chapter.title, // Use actual chapter title, but header is hidden
        }} 
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.headerButton} onPress={handleGoBack}>
              <MaterialIcons name="arrow-forward" size={20} color={isDark ? '#ffffff' : '#111827'} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode="tail">
              {chapter?.title}
            </Text>
          </View>
          
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerButton} onPress={handleShare}>
              <MaterialIcons name="share" size={24} color={isDark ? '#ffffff' : '#111827'} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView 
          style={styles.content} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Platform.OS === 'android' ? insets.bottom + 20 : 20 }} // Add padding for Android navigation bar
        >
          <View style={styles.titleSection}>
            <Text style={styles.title}>{chapter.title}</Text>
          </View>

          <Text style={styles.text}>{chapter.content}</Text>
        </ScrollView>
      </View>
    </>
  );
}