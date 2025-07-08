import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Add a small delay to ensure everything is loaded
    const timer = setTimeout(() => {
      try {
        router.replace('/onboarding');
      } catch (error) {
        console.log('Navigation error:', error);
        // Fallback navigation
        router.push('/onboarding');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>E</Text>
        </View>
        <Text style={styles.appName}>ElimApp</Text>
        <Text style={styles.tagline}>Learning. Together. Anywhere.</Text>
      </View>
      <View style={styles.loadingContainer}>
        <View style={styles.loadingBar}>
          <View style={styles.loadingProgress} />
        </View>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0ea5e9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 120, // Increased margin to move loading indicator lower
  },
  logo: {
    width: 100,
    height: 100,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#0ea5e9',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
    textAlign: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 80, // Moved higher from bottom
    width: '80%',
    alignItems: 'center',
  },
  loadingBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
    width: '100%',
    marginBottom: 16,
  },
  loadingProgress: {
    height: '100%',
    width: '70%',
    backgroundColor: '#ffffff',
    borderRadius: 2,
  },
  loadingText: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.8,
  },
});