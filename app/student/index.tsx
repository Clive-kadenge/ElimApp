import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function StudentDashboard() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🎓 Student Dashboard</Text>
      <Text style={styles.subtitle}>Welcome back! Here's your learning progress:</Text>

      {/* TODO: Add components like XP bar, assignments, trivia access, timetable preview */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9fafb',
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 20,
  },
});

