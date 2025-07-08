import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Calendar, Clock, Plus, CreditCard as Edit, ChevronLeft, ChevronRight } from 'lucide-react-native';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const mockTimetable = {
  Monday: [
    { time: '8:00 AM', subject: 'Mathematics', room: 'Room 101', teacher: 'Mr. Smith' },
    { time: '9:30 AM', subject: 'English', room: 'Room 203', teacher: 'Mrs. Johnson' },
    { time: '11:00 AM', subject: 'Chemistry', room: 'Lab A', teacher: 'Dr. Brown' },
    { time: '1:00 PM', subject: 'Physics', room: 'Lab B', teacher: 'Mr. Wilson' },
    { time: '2:30 PM', subject: 'History', room: 'Room 105', teacher: 'Ms. Davis' },
  ],
  Tuesday: [
    { time: '8:00 AM', subject: 'Biology', room: 'Lab C', teacher: 'Dr. Miller' },
    { time: '9:30 AM', subject: 'Mathematics', room: 'Room 101', teacher: 'Mr. Smith' },
    { time: '11:00 AM', subject: 'Kiswahili', room: 'Room 201', teacher: 'Mrs. Mwangi' },
    { time: '1:00 PM', subject: 'Geography', room: 'Room 102', teacher: 'Mr. Ochieng' },
    { time: '2:30 PM', subject: 'Art', room: 'Art Studio', teacher: 'Ms. Wanjiku' },
  ],
  Wednesday: [
    { time: '8:00 AM', subject: 'English', room: 'Room 203', teacher: 'Mrs. Johnson' },
    { time: '9:30 AM', subject: 'Physics', room: 'Lab B', teacher: 'Mr. Wilson' },
    { time: '11:00 AM', subject: 'Mathematics', room: 'Room 101', teacher: 'Mr. Smith' },
    { time: '1:00 PM', subject: 'Chemistry', room: 'Lab A', teacher: 'Dr. Brown' },
    { time: '2:30 PM', subject: 'PE', room: 'Gymnasium', teacher: 'Coach Roberts' },
  ],
  Thursday: [
    { time: '8:00 AM', subject: 'History', room: 'Room 105', teacher: 'Ms. Davis' },
    { time: '9:30 AM', subject: 'Biology', room: 'Lab C', teacher: 'Dr. Miller' },
    { time: '11:00 AM', subject: 'English', room: 'Room 203', teacher: 'Mrs. Johnson' },
    { time: '1:00 PM', subject: 'Mathematics', room: 'Room 101', teacher: 'Mr. Smith' },
    { time: '2:30 PM', subject: 'Music', room: 'Music Room', teacher: 'Mr. Kimani' },
  ],
  Friday: [
    { time: '8:00 AM', subject: 'Mathematics', room: 'Room 101', teacher: 'Mr. Smith' },
    { time: '9:30 AM', subject: 'Chemistry', room: 'Lab A', teacher: 'Dr. Brown' },
    { time: '11:00 AM', subject: 'Biology', room: 'Lab C', teacher: 'Dr. Miller' },
    { time: '1:00 PM', subject: 'Kiswahili', room: 'Room 201', teacher: 'Mrs. Mwangi' },
    { time: '2:30 PM', subject: 'Computer Science', room: 'Computer Lab', teacher: 'Mr. Ndung\'u' },
  ],
  Saturday: [
    { time: '8:00 AM', subject: 'Extra-curricular', room: 'Various', teacher: 'Various' },
    { time: '10:00 AM', subject: 'Sports', room: 'Field', teacher: 'Coach Roberts' },
  ],
  Sunday: [
    { time: '10:00 AM', subject: 'Study Time', room: 'Library', teacher: 'Self Study' },
  ],
};

export default function TimetableScreen() {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');
  const [userRole] = useState('student'); // In real app, get from auth context

  const getCurrentDayIndex = () => {
    const today = new Date().getDay();
    return today === 0 ? 6 : today - 1; // Convert Sunday (0) to 6, Monday (1) to 0, etc.
  };

  const getSubjectColor = (subject: string) => {
    const colors = {
      Mathematics: '#0ea5e9',
      English: '#10b981',
      Chemistry: '#f59e0b',
      Physics: '#8b5cf6',
      Biology: '#06b6d4',
      History: '#ef4444',
      Geography: '#84cc16',
      Kiswahili: '#f97316',
      Art: '#ec4899',
      Music: '#6366f1',
      PE: '#14b8a6',
      'Computer Science': '#3b82f6',
      'Extra-curricular': '#64748b',
      Sports: '#22c55e',
      'Study Time': '#a855f7',
    };
    return colors[subject as keyof typeof colors] || '#6b7280';
  };

  const handleSuggestTime = () => {
    Alert.alert(
      'Suggest Time Block',
      'What would you like to suggest?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Study Session', onPress: () => suggestTimeBlock('study') },
        { text: 'Extra Activity', onPress: () => suggestTimeBlock('activity') },
      ]
    );
  };

  const suggestTimeBlock = (type: string) => {
    Alert.alert(
      'Suggestion Sent',
      `Your ${type} time block suggestion has been sent to the teacher.`
    );
  };

  if (viewMode === 'day') {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => setViewMode('week')}>
              <ChevronLeft size={24} color="#1e3a8a" />
            </TouchableOpacity>
            <Text style={styles.title}>{selectedDay}</Text>
            <TouchableOpacity onPress={handleSuggestTime}>
              <Plus size={24} color="#0ea5e9" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.daySchedule}>
            {mockTimetable[selectedDay as keyof typeof mockTimetable]?.map((item, index) => (
              <View key={index} style={styles.scheduleItem}>
                <View style={styles.timeContainer}>
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>
                <View style={[styles.subjectContainer, { backgroundColor: getSubjectColor(item.subject) }]}>
                  <Text style={styles.subjectText}>{item.subject}</Text>
                  <Text style={styles.roomText}>{item.room}</Text>
                  <Text style={styles.teacherText}>{item.teacher}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Timetable</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={styles.viewModeButton}
              onPress={() => setViewMode('day')}
            >
              <Calendar size={20} color="#0ea5e9" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.suggestButton}
              onPress={handleSuggestTime}
            >
              <Plus size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.daysContainer}>
        {daysOfWeek.map((day, index) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayButton,
              selectedDay === day && styles.selectedDayButton,
              index === getCurrentDayIndex() && styles.todayButton,
            ]}
            onPress={() => setSelectedDay(day)}
          >
            <Text style={[
              styles.dayButtonText,
              selectedDay === day && styles.selectedDayButtonText,
              index === getCurrentDayIndex() && styles.todayButtonText,
            ]}>
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.content}>
        <View style={styles.weekView}>
          {daysOfWeek.map((day) => (
            <View key={day} style={styles.dayColumn}>
              <Text style={styles.dayHeader}>{day}</Text>
              <View style={styles.daySchedule}>
                {mockTimetable[day as keyof typeof mockTimetable]?.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.classBlock, { backgroundColor: getSubjectColor(item.subject) }]}
                    onPress={() => {
                      setSelectedDay(day);
                      setViewMode('day');
                    }}
                  >
                    <Text style={styles.classTime}>{item.time}</Text>
                    <Text style={styles.className}>{item.subject}</Text>
                    <Text style={styles.classRoom}>{item.room}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {userRole === 'parent' && (
        <View style={styles.parentActions}>
          <TouchableOpacity style={styles.parentButton}>
            <Edit size={20} color="#0ea5e9" />
            <Text style={styles.parentButtonText}>Suggest Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.parentButton}>
            <Clock size={20} color="#10b981" />
            <Text style={styles.parentButtonText}>Smart Schedule</Text>
          </TouchableOpacity>
        </View>
      )}
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
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewModeButton: {
    padding: 8,
    marginRight: 12,
  },
  suggestButton: {
    backgroundColor: '#0ea5e9',
    borderRadius: 20,
    padding: 8,
  },
  daysContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    maxHeight: 60,
  },
  dayButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  selectedDayButton: {
    backgroundColor: '#0ea5e9',
    borderColor: '#0ea5e9',
  },
  todayButton: {
    backgroundColor: '#fef3c7',
    borderColor: '#f59e0b',
  },
  dayButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  selectedDayButtonText: {
    color: '#ffffff',
  },
  todayButtonText: {
    color: '#f59e0b',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  weekView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayColumn: {
    flex: 1,
    marginHorizontal: 2,
  },
  dayHeader: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1e3a8a',
    textAlign: 'center',
    marginBottom: 8,
  },
  daySchedule: {
    flex: 1,
  },
  classBlock: {
    padding: 8,
    borderRadius: 8,
    marginBottom: 4,
    minHeight: 60,
  },
  classTime: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: '600',
  },
  className: {
    fontSize: 11,
    color: '#ffffff',
    fontWeight: 'bold',
    marginTop: 2,
  },
  classRoom: {
    fontSize: 9,
    color: '#ffffff',
    opacity: 0.8,
  },
  scheduleItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  timeContainer: {
    width: 80,
    alignItems: 'center',
    marginRight: 16,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
  },
  subjectContainer: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  subjectText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  roomText: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 2,
  },
  teacherText: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.8,
  },
  parentActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  parentButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 20,
    marginHorizontal: 8,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  parentButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 8,
  },
});