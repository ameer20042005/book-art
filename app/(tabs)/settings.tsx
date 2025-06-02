import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, Platform, ScrollView } from 'react-native';
import { useState } from 'react';
import { useTheme } from '../../src/contexts/ThemeContext';
import { useUser } from '../../src/contexts/UserContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const { theme, fontSize, setTheme, setFontSize, isDark } = useTheme();
  const { preferences, setReadingGoals } = useUser();
  const insets = useSafeAreaInsets();
  
  const [dailyMinutes, setDailyMinutes] = useState(preferences.readingGoals.dailyMinutes.toString());
  const [weeklyChapters, setWeeklyChapters] = useState(preferences.readingGoals.weeklyChapters.toString());

  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#111827' : '#f5f5f5',
      // paddingTop: insets.top, // Removed: Tab navigator header handles top inset
    },
    scrollViewContent: {
      padding: 16,
      paddingBottom: Platform.OS === 'android' ? insets.bottom + 20 : 20, // Padding for nav bar
    },
    section: {
      backgroundColor: isDark ? '#1f2937' : '#ffffff',
      borderRadius: 12,
      padding: 16,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 16,
      color: isDark ? '#ffffff' : '#333333',
      textAlign: 'right',
    },
    option: {
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#374151' : '#f0f0f0',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    optionText: {
      fontSize: 16,
      color: isDark ? '#e0e0e0' : '#666666',
      textAlign: 'right',
    },
    activeOption: {
      color: '#2563eb',
      fontWeight: 'bold',
    },
    optionsContainer: {
      flexDirection: 'row',
      gap: 10,
      justifyContent: 'flex-end',
    },
    goalsInput: {
      backgroundColor: isDark ? '#374151' : '#f9fafb',
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      color: isDark ? '#ffffff' : '#111827',
      textAlign: 'right',
      borderWidth: 1,
      borderColor: isDark ? '#4b5563' : '#d1d5db',
      marginBottom: 12,
    },
    saveButton: {
      backgroundColor: '#2563eb',
      borderRadius: 8,
      padding: 12,
      alignItems: 'center',
      marginTop: 16,
    },
    saveButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
    },
  });

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>تخصيص القراءة</Text>
        
        <View style={styles.option}>
          <View style={styles.optionsContainer}>
            <TouchableOpacity onPress={() => setFontSize('small')}>
              <Text style={[
                styles.optionText,
                fontSize === 'small' ? styles.activeOption : null
              ]}>صغير</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFontSize('medium')}>
              <Text style={[
                styles.optionText,
                fontSize === 'medium' ? styles.activeOption : null
              ]}>متوسط</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFontSize('large')}>
              <Text style={[
                styles.optionText,
                fontSize === 'large' ? styles.activeOption : null
              ]}>كبير</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.optionText}>حجم الخط</Text>
        </View>

        <View style={styles.option}>
          <View style={styles.optionsContainer}>
            <TouchableOpacity onPress={() => setTheme('light')}>
              <Text style={[
                styles.optionText,
                theme === 'light' ? styles.activeOption : null
              ]}>فاتح</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setTheme('dark')}>
              <Text style={[
                styles.optionText,
                theme === 'dark' ? styles.activeOption : null
              ]}>داكن</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setTheme('system')}>
              <Text style={[
                styles.optionText,
                theme === 'system' ? styles.activeOption : null
              ]}>تلقائي</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.optionText}>السمة</Text>
        </View>
      </View>
    </ScrollView>
  );
}