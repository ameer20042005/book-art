import { Stack } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { Pressable } from 'react-native';
import { router } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={styles.title}>This screen does not exist.</Text>
        <Pressable style={styles.link} onPress={() => router.replace('/') }>
          <Text style={styles.linkText}>Go to home screen!</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  linkText: {
    color: '#007AFF',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
});
