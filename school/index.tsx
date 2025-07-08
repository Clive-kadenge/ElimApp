import { View, Text, StyleSheet } from 'react-native';

export function SchoolScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>School Dashboard</Text>
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