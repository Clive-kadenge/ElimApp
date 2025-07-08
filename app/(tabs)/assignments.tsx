import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { Plus, Download, Upload, Calendar, Clock, CircleCheck as CheckCircle, CircleAlert as AlertCircle } from 'lucide-react-native';

const mockAssignments = [
  {
    id: 1,
    title: 'Algebra Problem Set',
    subject: 'Mathematics',
    dueDate: '2024-01-15',
    status: 'pending',
    questions: 15,
    submitted: false,
    hasAttachment: true,
  },
  {
    id: 2,
    title: 'Essay on Climate Change',
    subject: 'English',
    dueDate: '2024-01-18',
    status: 'submitted',
    questions: 1,
    submitted: true,
    hasAttachment: false,
  },
  {
    id: 3,
    title: 'Chemical Reactions Lab',
    subject: 'Chemistry',
    dueDate: '2024-01-20',
    status: 'pending',
    questions: 8,
    submitted: false,
    hasAttachment: true,
  },
];

export default function AssignmentsScreen() {
  const [assignments, setAssignments] = useState(mockAssignments);
  const [userRole] = useState('student'); // In real app, get from auth context
  const [showCreateForm, setShowCreateForm] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return '#10b981';
      case 'pending':
        return '#f59e0b';
      case 'overdue':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleSubmitAssignment = (id: number) => {
    Alert.alert(
      'Submit Assignment',
      'Are you sure you want to submit this assignment?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Submit',
          onPress: () => {
            setAssignments(prev =>
              prev.map(assignment =>
                assignment.id === id
                  ? { ...assignment, status: 'submitted', submitted: true }
                  : assignment
              )
            );
            Alert.alert('Success', 'Assignment submitted successfully!');
          },
        },
      ]
    );
  };

  if (userRole === 'teacher') {
    return <TeacherAssignmentsView />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Assignments</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {assignments.filter(a => a.status === 'pending').length}
            </Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {assignments.filter(a => a.status === 'submitted').length}
            </Text>
            <Text style={styles.statLabel}>Submitted</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {assignments.map((assignment) => (
          <View key={assignment.id} style={styles.assignmentCard}>
            <View style={styles.assignmentHeader}>
              <View style={styles.assignmentInfo}>
                <Text style={styles.assignmentTitle}>{assignment.title}</Text>
                <Text style={styles.subjectText}>{assignment.subject}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(assignment.status) }]}>
                <Text style={styles.statusText}>
                  {assignment.status === 'submitted' ? 'Submitted' : 'Pending'}
                </Text>
              </View>
            </View>

            <View style={styles.assignmentDetails}>
              <View style={styles.detailItem}>
                <Calendar size={16} color="#6b7280" />
                <Text style={styles.detailText}>Due: {assignment.dueDate}</Text>
              </View>
              <View style={styles.detailItem}>
                <Clock size={16} color="#6b7280" />
                <Text style={styles.detailText}>
                  {getDaysUntilDue(assignment.dueDate)} days left
                </Text>
              </View>
              <View style={styles.detailItem}>
                <AlertCircle size={16} color="#6b7280" />
                <Text style={styles.detailText}>{assignment.questions} questions</Text>
              </View>
            </View>

            <View style={styles.assignmentActions}>
              {assignment.hasAttachment && (
                <TouchableOpacity style={styles.actionButton}>
                  <Download size={20} color="#0ea5e9" />
                  <Text style={styles.actionText}>Download</Text>
                </TouchableOpacity>
              )}
              {!assignment.submitted && (
                <TouchableOpacity 
                  style={[styles.actionButton, styles.submitButton]}
                  onPress={() => handleSubmitAssignment(assignment.id)}
                >
                  <Upload size={20} color="#ffffff" />
                  <Text style={[styles.actionText, { color: '#ffffff' }]}>Submit</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function TeacherAssignmentsView() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    subject: '',
    questions: '',
    dueDate: '',
    description: '',
  });

  const handleCreateAssignment = () => {
    if (!newAssignment.title || !newAssignment.subject || !newAssignment.questions) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    Alert.alert('Success', 'Assignment created successfully!');
    setShowCreateForm(false);
    setNewAssignment({ title: '', subject: '', questions: '', dueDate: '', description: '' });
  };

  if (showCreateForm) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Assignment</Text>
          <TouchableOpacity onPress={() => setShowCreateForm(false)}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Title *</Text>
              <TextInput
                style={styles.input}
                value={newAssignment.title}
                onChangeText={(text) => setNewAssignment(prev => ({ ...prev, title: text }))}
                placeholder="Assignment title"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Subject *</Text>
              <TextInput
                style={styles.input}
                value={newAssignment.subject}
                onChangeText={(text) => setNewAssignment(prev => ({ ...prev, subject: text }))}
                placeholder="Subject name"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Number of Questions *</Text>
              <TextInput
                style={styles.input}
                value={newAssignment.questions}
                onChangeText={(text) => setNewAssignment(prev => ({ ...prev, questions: text }))}
                placeholder="Number of questions"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Due Date</Text>
              <TextInput
                style={styles.input}
                value={newAssignment.dueDate}
                onChangeText={(text) => setNewAssignment(prev => ({ ...prev, dueDate: text }))}
                placeholder="YYYY-MM-DD"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={newAssignment.description}
                onChangeText={(text) => setNewAssignment(prev => ({ ...prev, description: text }))}
                placeholder="Assignment description..."
                multiline
                numberOfLines={4}
              />
            </View>

            <TouchableOpacity style={styles.attachmentButton}>
              <Plus size={20} color="#0ea5e9" />
              <Text style={styles.attachmentText}>Add Attachment</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.createButton} onPress={handleCreateAssignment}>
              <Text style={styles.createButtonText}>Create Assignment</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Assignments</Text>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => setShowCreateForm(true)}
        >
          <Plus size={20} color="#ffffff" />
          <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {mockAssignments.map((assignment) => (
          <View key={assignment.id} style={styles.assignmentCard}>
            <View style={styles.assignmentHeader}>
              <View style={styles.assignmentInfo}>
                <Text style={styles.assignmentTitle}>{assignment.title}</Text>
                <Text style={styles.subjectText}>{assignment.subject}</Text>
              </View>
              <View style={styles.submissionStats}>
                <Text style={styles.submissionText}>12/25 submitted</Text>
              </View>
            </View>

            <View style={styles.assignmentActions}>
              <TouchableOpacity style={styles.actionButton}>
                <CheckCircle size={20} color="#10b981" />
                <Text style={styles.actionText}>Review</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Download size={20} color="#0ea5e9" />
                <Text style={styles.actionText}>Export</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  cancelText: {
    fontSize: 16,
    color: '#ef4444',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
  },
  statItem: {
    alignItems: 'center',
    marginLeft: 20,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  assignmentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  assignmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  assignmentInfo: {
    flex: 1,
  },
  assignmentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 4,
  },
  subjectText: {
    fontSize: 14,
    color: '#0ea5e9',
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '600',
  },
  submissionStats: {
    alignItems: 'flex-end',
  },
  submissionText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '600',
  },
  assignmentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 6,
  },
  assignmentActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  submitButton: {
    backgroundColor: '#0ea5e9',
    borderColor: '#0ea5e9',
  },
  actionText: {
    fontSize: 14,
    color: '#0ea5e9',
    fontWeight: '600',
    marginLeft: 6,
  },
  createButton: {
    backgroundColor: '#0ea5e9',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#0ea5e9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  createButtonText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: 'bold',
    marginLeft: 6,
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e3a8a',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  attachmentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#0ea5e9',
    borderStyle: 'dashed',
    marginBottom: 20,
  },
  attachmentText: {
    fontSize: 16,
    color: '#0ea5e9',
    fontWeight: '600',
    marginLeft: 8,
  },
});