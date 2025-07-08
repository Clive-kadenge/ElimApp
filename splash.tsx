import { View, Text, StyleSheet, Image } from 'react-native';

export function SplashScreen() {
  return (
    <View style={styles.splashContainer}>
      <Image source={require('../assets/images/ElimAPP-Logo.png')} style={styles.logo} />
      <Text style={styles.splashText}>Welcome to ElimApp</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#e0f2fe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  splashText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
});