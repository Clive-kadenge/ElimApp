import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function SchoolDashboard() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🏫 School Dashboard</Text>
      <Text style={styles.subtitle}>Monitor school-wide data and manage tutors:</Text>

      {/* TODO: Add bulk messaging, tutor verification, school-wide reports, analytics */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f3f4f6',
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4f46e5',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 20,
  },
});
