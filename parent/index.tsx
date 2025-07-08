import { View, Text, StyleSheet } from 'react-native';

export function ParentScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parent Dashboard</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0ea5e9',
  },
});