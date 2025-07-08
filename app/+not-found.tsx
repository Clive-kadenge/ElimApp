import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/4439444/pexels-photo-4439444.jpeg?auto=compress&cs=tinysrgb&w=400' }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>Oops! Page not found</Text>
        <Text style={styles.subtitle}>
          The screen you're looking for doesn't exist. Maybe it was moved or deleted.
        </Text>
        <TouchableOpacity style={styles.button}>
          <Link href="/" asChild>
            <Text style={styles.buttonText}>Go Home</Text>
          </Link>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  image: {
    width: 220,
    height: 180,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#0ea5e9',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
});