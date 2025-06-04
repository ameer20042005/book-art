import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/src/contexts/ThemeContext';
import { getAllChapters, Chapter } from '../data/chaptersData';

interface SearchBarProps {
  onChapterSelect: (chapter: Chapter) => void;
}

export default function SearchBar({ onChapterSelect }: SearchBarProps) {
  const { isDark, fontSize } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchResults, setSearchResults] = useState<Chapter[]>([]);

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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const filtered = chapters.filter(chapter =>
        chapter.title.toLowerCase().includes(query.toLowerCase()) ||
        chapter.description.toLowerCase().includes(query.toLowerCase()) ||
        chapter.content?.toLowerCase().includes(query.toLowerCase()) ||
        chapter.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      setSearchResults(filtered);
      setIsSearchActive(true);
    } else {
      setSearchResults([]);
      setIsSearchActive(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearchActive(false);
  };

  const handleChapterSelect = (chapter: Chapter) => {
    clearSearch();
    onChapterSelect(chapter);
  };

  const styles = StyleSheet.create({    container: {
      position: 'relative',
      zIndex: 10,
    },
    searchInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDark ? '#374151' : '#f9fafb',
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: isDark ? '#4b5563' : '#d1d5db',
    },
    searchInput: {
      flex: 1,
      fontSize: getFontSize(),
      color: isDark ? '#ffffff' : '#111827',
      textAlign: 'right',
      marginHorizontal: 8,
    },    searchResults: {
      position: 'absolute',
      top: 55,
      left: 0,
      right: 0,
      backgroundColor: isDark ? '#1f2937' : '#ffffff',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: isDark ? '#374151' : '#e5e7eb',
      maxHeight: 250,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.15,
      shadowRadius: 3.84,
      zIndex: 20,
    },
    resultItem: {
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#374151' : '#f3f4f6',
    },
    resultTitle: {
      fontSize: getFontSize(),
      fontWeight: '600',
      color: isDark ? '#ffffff' : '#111827',
      textAlign: 'right',
      marginBottom: 4,
    },
    resultDescription: {
      fontSize: getFontSize() - 2,
      color: isDark ? '#9ca3af' : '#6b7280',
      textAlign: 'right',
    },
    noResults: {
      padding: 16,
      alignItems: 'center',
    },
    noResultsText: {
      fontSize: getFontSize(),
      color: isDark ? '#9ca3af' : '#6b7280',
    },
  });

  const renderSearchResult = ({ item }: { item: Chapter }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => handleChapterSelect(item)}
    >
      <Text style={styles.resultTitle}>{item.title}</Text>
      <Text style={styles.resultDescription} numberOfLines={2}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchInputContainer}>
        <MaterialIcons name="search" size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
        <TextInput
          style={styles.searchInput}
          placeholder="البحث في الفصول..."
          placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
          value={searchQuery}
          onChangeText={handleSearch}        />
        {Boolean(searchQuery) ? (
          <TouchableOpacity onPress={clearSearch}>
            <MaterialIcons name="close" size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
          </TouchableOpacity>        ) : null}
      </View>
      {Boolean(isSearchActive) && (
        <View style={styles.searchResults}>
          {Boolean(searchResults.length > 0) ? (
            <FlatList
              data={searchResults}
              renderItem={renderSearchResult}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.noResults}>
              <Text style={styles.noResultsText}>لا توجد نتائج</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}
