import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function TeacherDashboard() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📘 Teacher Dashboard</Text>
      <Text style={styles.subtitle}>Manage your classes, assignments, and feedback:</Text>

      {/* TODO: Add grading tools, assignment creation, student chat, and progress trackers */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fefce8',
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ca8a04',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#4b5563',
    marginBottom: 20,
  },
});
