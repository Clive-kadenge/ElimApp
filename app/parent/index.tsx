import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ParentDashboard() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>👨‍👩‍👧 Parent Dashboard</Text>
      <Text style={styles.subtitle}>Track your child’s learning journey:</Text>

      {/* TODO: Add insights like performance data, messages, and assignment status */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0fdf4',
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#047857',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#4b5563',
    marginBottom: 20,
  },
});
