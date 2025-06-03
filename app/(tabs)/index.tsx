import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useTheme } from "../../src/contexts/ThemeContext";

export default function HomeScreen() {
  const { isDark, fontSize } = useTheme();
  const insets = useSafeAreaInsets();

  const getFontSize = () => {
    switch (fontSize) {
      case "small":
        return 14;
      case "large":
        return 18;
      default:
        return 16;
    }
  };

  const navigateToChapter = (chapterId: string) => {
    router.push(`/chapter/${chapterId}`);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#111827" : "#f8fafc",
    },
    header: {
      padding: 16,
      paddingBottom: 16,
      backgroundColor: isDark ? "#1f2937" : "#2563eb",
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      elevation: 8,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      marginTop: Platform.OS === "android" ? 0 : 0,
    },
    coverImage: {
      width: 80,
      height: 80,
      borderRadius: 8,
      marginLeft: 16,
      borderWidth: 2,
      borderColor: "rgba(255, 255, 255, 0.3)",
    },
    headerTitleContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },
    headerTextContainer: {
      flex: 1,
    },
    appTitle: {
      fontSize: getFontSize() + 8,
      fontWeight: "bold",
      color: "#ffffff",
      textAlign: "right",
      marginBottom: 0,
    },
    appSubtitle: {
      fontSize: getFontSize(),
      color: "#ffffff",
      opacity: 0.95,
      textAlign: "center",
      lineHeight: getFontSize() * 1.4,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    welcomeSection: {
      backgroundColor: isDark ? "#111827" : "#ffffff", // نفس لون الخلفية
      borderRadius: 20,
      padding: 24,
      marginBottom: 24,
      borderWidth: 1.5,
      borderColor: isDark ? "#374151" : "#d1d5db", // إطار واضح حسب الوضع
      elevation: 0, // إزالة الظل
      shadowColor: undefined,
      shadowOffset: undefined,
      shadowOpacity: undefined,
      shadowRadius: undefined,
    },
    welcomeTitle: {
      fontSize: getFontSize() + 6,
      fontWeight: "bold",
      color: isDark ? "#ffffff" : "#111827",
      textAlign: "center",
      marginBottom: 16,
    },
    welcomeText: {
      fontSize: getFontSize(),
      color: isDark ? "#d1d5db" : "#4b5563",
      textAlign: "center",
      lineHeight: getFontSize() * 1.6,
      marginBottom: 20,
    },
    featuresContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 16,
      marginBottom: 16,
    },
    featureItem: {
      alignItems: "center",
      flex: 1,
      marginHorizontal: 8,
    },
    featureButton: {
      alignItems: "center",
      backgroundColor: isDark ? "#374151" : "#f3f4f6",
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: isDark ? "#4b5563" : "#e5e7eb",
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    featureIcon: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: "#2563eb",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 8,
    },
    featureText: {
      fontSize: getFontSize() - 2,
      color: isDark ? "#9ca3af" : "#6b7280",
      textAlign: "center",
      fontWeight: "500",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.appTitle}>حقيبة معلم التربية الفنية</Text>
          </View>
          <Image
            source={require("../../assets/images/photo_2025-06-03_00-45-37.jpg")}
            style={styles.coverImage}
          />
        </View>
        <Text style={styles.appSubtitle}>
          للمرحلة الابتدائية وفق متطلبات المنهج الحديث: دراسة تربوية تطويرية
        </Text>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: Platform.OS === "android" ? insets.bottom + 20 : 20,
        }} // Adjust padding for nav bar
      >
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>اعداد الباحث</Text>
          <Text style={styles.welcomeText}>
وسام عبد الستار الربيع الفنية، ماجستير طرائق تدريس التربية الفنية، مرشد فني أقدم
          </Text>

          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <TouchableOpacity 
                style={styles.featureButton}
                onPress={() => navigateToChapter("1")}
                activeOpacity={0.7}
              >
                <View style={styles.featureIcon}>
                  <Text style={{ color: "#ffffff", fontSize: 20 }}>📚</Text>
                </View>
                <Text style={styles.featureText}>الفصل الأول</Text>
                <Text style={[styles.featureText, { fontSize: getFontSize() - 4, marginTop: 4 }]}>
                  مقدمة
                </Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.featureItem}>
              <TouchableOpacity 
                style={styles.featureButton}
                onPress={() => navigateToChapter("2")}
                activeOpacity={0.7}
              >
                <View style={styles.featureIcon}>
                  <Text style={{ color: "#ffffff", fontSize: 20 }}>🎯</Text>
                </View>
                <Text style={styles.featureText}>الفصل الثاني</Text>
                <Text style={[styles.featureText, { fontSize: getFontSize() - 4, marginTop: 4 }]}>
                  مفاهيم أساسية
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <TouchableOpacity 
                style={styles.featureButton}
                onPress={() => navigateToChapter("3")}
                activeOpacity={0.7}
              >
                <View style={styles.featureIcon}>
                  <Text style={{ color: "#ffffff", fontSize: 20 }}>🚀</Text>
                </View>
                <Text style={styles.featureText}>الفصل الثالث</Text>
                <Text style={[styles.featureText, { fontSize: getFontSize() - 4, marginTop: 4 }]}>
                  تطبيقات عملية
                </Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.featureItem}>
              <TouchableOpacity 
                style={styles.featureButton}
                onPress={() => navigateToChapter("4")}
                activeOpacity={0.7}
              >
                <View style={styles.featureIcon}>
                  <Text style={{ color: "#ffffff", fontSize: 20 }}>✏️</Text>
                </View>
                <Text style={styles.featureText}>الفصل الرابع</Text>
                <Text style={[styles.featureText, { fontSize: getFontSize() - 4, marginTop: 4 }]}>
                  تمارين
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
