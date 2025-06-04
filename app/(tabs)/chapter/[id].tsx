import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Share, Platform, Image, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../src/contexts/ThemeContext';
import { useUser } from '../../../src/contexts/UserContext';
import { getChapterById } from '../../../data/chaptersData';
import Markdown from 'react-native-markdown-display';
import { useState } from 'react';

export default function ChapterScreen() {
  const { id } = useLocalSearchParams();
  const { isDark, fontSize } = useTheme();
  const { preferences } = useUser();
  const insets = useSafeAreaInsets();
  const chapter = getChapterById(id as string);
  const [imageLoading, setImageLoading] = useState<{[key: number]: boolean}>({});

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${chapter?.title}\n\n${chapter?.description}\n\n${chapter?.content}`,
        title: chapter?.title,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleGoBack = () => {
    router.replace('/chapters');
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
      textAlign: 'right',
      writingDirection: 'rtl',
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
      writingDirection: 'rtl',
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
      writingDirection: 'rtl',
    },
    text: {
      fontSize: getFontSize(),
      color: isDark ? '#e5e7eb' : '#374151',
      lineHeight: getFontSize() * 1.8,
      textAlign: 'right',
      writingDirection: 'rtl',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      writingDirection: 'rtl',
    },
    errorText: {
      fontSize: getFontSize() + 2,
      color: isDark ? '#ef4444' : '#dc2626',
      textAlign: 'center',
      writingDirection: 'rtl',
    },
  });

  if (!chapter) {
    return (
      <>
        <Stack.Screen 
          options={{ 
            headerShown: false,
            title: '',
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
              <Text style={{ color: isDark ? '#ffffff' : '#111827', writingDirection: 'rtl' }}>العودة</Text>
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
          title: chapter.title,
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
          contentContainerStyle={{ 
            paddingBottom: Platform.OS === 'android' ? insets.bottom + 20 : 20,
          }}
        >
          <View style={styles.titleSection}>
            <Text style={styles.title}>{chapter.title}</Text>
          </View>

          {chapter.content ? (
            <Markdown 
              style={{
                body: {
                  fontSize: getFontSize(),
                  color: isDark ? '#e5e7eb' : '#374151',
                  lineHeight: getFontSize() * 1.8,
                  textAlign: 'right',
                  writingDirection: 'rtl',
                  fontFamily: 'System',
                },
                heading1: {
                  fontSize: getFontSize() + 8,
                  fontWeight: 'bold',
                  color: isDark ? '#ffffff' : '#111827',
                  textAlign: 'right',
                  marginBottom: 16,
                  marginTop: 24,
                  marginLeft: 190,
                  writingDirection: 'rtl',
                },
                heading2: {
                  fontSize: getFontSize() + 6,
                  fontWeight: 'bold',
                  color: isDark ? '#ffffff' : '#111827',
                  textAlign: 'right',
                  marginBottom: 12,
                  marginTop: 20,
                  marginLeft: 130,
                  writingDirection: 'rtl',
                },
                heading3: {
                  fontSize: getFontSize() + 4,
                  fontWeight: 'bold',
                  color: isDark ? '#ffffff' : '#111827',
                  textAlign: 'right',
                  marginBottom: 8,
                  marginTop: 16,
                  marginLeft: 110,
                  writingDirection: 'rtl',
                },
                heading4: {
                  fontSize: getFontSize() + 2,
                  fontWeight: 'bold',
                  color: isDark ? '#ffffff' : '#111827',
                  textAlign: 'right',
                  marginBottom: 6,
                  marginTop: 12,
                  marginLeft: 80,
                  writingDirection: 'rtl',
                },
                heading5: {
                  fontSize: getFontSize() + 1,
                  fontWeight: 'bold',
                  color: isDark ? '#ffffff' : '#111827',
                  textAlign: 'right',
                  marginBottom: 4,
                  marginTop: 8,
                  marginLeft: 80,
                  writingDirection: 'rtl',
                },
                heading6: {
                  fontSize: getFontSize(),
                  fontWeight: 'bold',
                  color: isDark ? '#ffffff' : '#111827',
                  textAlign: 'right',
                  marginBottom: 4,
                  marginTop: 8,
                  marginLeft: 80,
                  writingDirection: 'rtl',
                },
                paragraph: {
                  fontSize: getFontSize(),
                  color: isDark ? '#e5e7eb' : '#374151',
                  lineHeight: getFontSize() * 1.8,
                  textAlign: 'right',
                  marginBottom: 12,
                  writingDirection: 'rtl',
                },
                listItem: {
                  fontSize: getFontSize(),
                  color: isDark ? '#e5e7eb' : '#374151',
                  textAlign: 'right',
                  marginBottom: 8,
                  writingDirection: 'rtl',
                },
                strong: {
                  fontWeight: '900',
                  color: isDark ? '#60a5fa' : '#2563eb',
                  marginLeft: 120,
                  paddingLeft: 40,
                  paddingRight: 20,
                  paddingVertical: 8,
                  backgroundColor: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(37, 99, 235, 0.1)',
                  borderLeftWidth: 4,
                  borderLeftColor: isDark ? '#60a5fa' : '#2563eb',
                  borderRadius: 4,
                  writingDirection: 'rtl',
                  fontSize: getFontSize() + 1,
                  lineHeight: getFontSize() * 1.6,
                },
                image: {
                  width: '100%',
                  height: 200,
                  borderRadius: 8,
                  marginVertical: 16,
                  alignSelf: 'center',
                  resizeMode: 'contain',
                },
              }}
            >
              {chapter.content}
            </Markdown>
          ) : chapter.contentParts ? (
            chapter.contentParts.map((part, index) => {
              if (part.type === 'text') {
                return (
                  <Markdown 
                    key={index}
                    style={{
                      body: {
                        fontSize: getFontSize(),
                        color: isDark ? '#e5e7eb' : '#374151',
                        lineHeight: getFontSize() * 1.8,
                        textAlign: 'right',
                        marginBottom: 12,
                        writingDirection: 'rtl',
                      },
                      heading1: {
                        fontSize: getFontSize() + 8,
                        fontWeight: 'bold',
                        color: isDark ? '#ffffff' : '#111827',
                        textAlign: 'right',
                        marginBottom: 16,
                        marginTop: 24,
                        marginLeft: 150,
                        writingDirection: 'rtl',
                      },
                      heading2: {
                        fontSize: getFontSize() + 6,
                        fontWeight: 'bold',
                        color: isDark ? '#ffffff' : '#111827',
                        textAlign: 'right',
                        marginBottom: 12,
                        marginTop: 20,
                        marginLeft: 130,
                        writingDirection: 'rtl',
                      },
                      heading3: {
                        fontSize: getFontSize() + 4,
                        fontWeight: 'bold',
                        color: isDark ? '#ffffff' : '#111827',
                        textAlign: 'right',
                        marginBottom: 8,
                        marginTop: 16,
                        marginLeft: 110,
                        writingDirection: 'rtl',
                      },
                      heading4: {
                        fontSize: getFontSize() + 2,
                        fontWeight: 'bold',
                        color: isDark ? '#ffffff' : '#111827',
                        textAlign: 'right',
                        marginBottom: 6,
                        marginTop: 12,
                        marginLeft: 80,
                        writingDirection: 'rtl',
                      },
                      heading5: {
                        fontSize: getFontSize() + 1,
                        fontWeight: 'bold',
                        color: isDark ? '#ffffff' : '#111827',
                        textAlign: 'right',
                        marginBottom: 4,
                        marginTop: 8,
                        marginLeft: 80,
                        writingDirection: 'rtl',
                      },
                      heading6: {
                        fontSize: getFontSize(),
                        fontWeight: 'bold',
                        color: isDark ? '#ffffff' : '#111827',
                        textAlign: 'right',
                        marginBottom: 4,
                        marginTop: 8,
                        marginLeft: 80,
                        writingDirection: 'rtl',
                      },
                      paragraph: {
                        fontSize: getFontSize(),
                        color: isDark ? '#e5e7eb' : '#374151',
                        lineHeight: getFontSize() * 1.8,
                        textAlign: 'right',
                        marginBottom: 12,
                        writingDirection: 'rtl',
                      },
                      listItem: {
                        fontSize: getFontSize(),
                        color: isDark ? '#e5e7eb' : '#374151',
                        textAlign: 'right',
                        marginBottom: 8,
                        writingDirection: 'rtl',
                      },
                      strong: {
                        fontWeight: '900',
                        color: isDark ? '#60a5fa' : '#2563eb',
                        marginLeft: 120,
                        paddingLeft: 40,
                        paddingRight: 20,
                        paddingVertical: 8,
                        backgroundColor: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(37, 99, 235, 0.1)',
                        borderLeftWidth: 4,
                        borderLeftColor: isDark ? '#60a5fa' : '#2563eb',
                        borderRadius: 4,
                        writingDirection: 'rtl',
                        fontSize: getFontSize() + 1,
                        lineHeight: getFontSize() * 1.6,
                      },
                    }}
                  >
                    {part.value}
                  </Markdown>
                );
              } else if (part.type === 'image') {
                return (
                  <View key={index} style={{
                    marginVertical: 16,
                    alignItems: 'center',
                    backgroundColor: isDark ? '#374151' : '#f3f4f6',
                    borderRadius: 8,
                    padding: 8,
                  }}>
                    {imageLoading[index] && (
                      <View style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: [{ translateX: -12 }, { translateY: -12 }],
                        zIndex: 1,
                      }}>
                        <ActivityIndicator 
                          size="large" 
                          color={isDark ? '#60a5fa' : '#2563eb'} 
                        />
                      </View>
                    )}
                    <Image 
                      source={part.src}
                      style={{
                        width: '100%',
                        height: 450,
                        resizeMode: 'contain',
                        borderRadius: 8,
                        opacity: imageLoading[index] ? 0.3 : 1,
                      }}
                      onLoadStart={() => setImageLoading(prev => ({ ...prev, [index]: true }))}
                      onLoad={() => setImageLoading(prev => ({ ...prev, [index]: false }))}
                      onError={() => {
                        setImageLoading(prev => ({ ...prev, [index]: false }));
                        console.log('خطأ في تحميل الصورة:', part.alt);
                      }}
                    />
                    {part.alt && (
                      <Text style={{
                        fontSize: getFontSize() - 2,
                        color: isDark ? '#9ca3af' : '#6b7280',
                        textAlign: 'center',
                        marginTop: 8,
                        fontStyle: 'italic',
                        writingDirection: 'rtl',
                      }}>
                        {part.alt}
                      </Text>
                    )}
                  </View>
                );
              }
              return null;
            })
          ) : (
            <Text style={styles.text}>لا يوجد محتوى لعرضه.</Text>
          )}
        </ScrollView>
      </View>
    </>
  );
}
