import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Plus, Calendar, Users, MapPin, Trophy, Star, Clock } from 'lucide-react-native';

interface Activity {
  id: number;
  name: string;
  category: 'sports' | 'arts' | 'academics' | 'community';
  description: string;
  schedule: string;
  participants: number;
  maxParticipants: number;
  location: string;
  teacher: string;
  isRegistered: boolean;
}

interface Event {
  id: number;
  name: string;
  type: 'camp' | 'competition' | 'workshop' | 'performance';
  date: string;
  location: string;
  description: string;
  fee: number;
  isRegistered: boolean;
}

const mockActivities: Activity[] = [
  {
    id: 1,
    name: 'Football Club',
    category: 'sports',
    description: 'Join our school football team and compete in inter-school tournaments.',
    schedule: 'Mon, Wed, Fri 4:00 PM - 6:00 PM',
    participants: 25,
    maxParticipants: 30,
    location: 'Main Field',
    teacher: 'Coach Roberts',
    isRegistered: true,
  },
  {
    id: 2,
    name: 'Drama Club',
    category: 'arts',
    description: 'Explore your acting skills and participate in school plays.',
    schedule: 'Tue, Thu 3:30 PM - 5:30 PM',
    participants: 18,
    maxParticipants: 25,
    location: 'Drama Hall',
    teacher: 'Ms. Wanjiku',
    isRegistered: false,
  },
  {
    id: 3,
    name: 'Debate Society',
    category: 'academics',
    description: 'Develop your public speaking and critical thinking skills.',
    schedule: 'Wed 2:00 PM - 4:00 PM',
    participants: 12,
    maxParticipants: 20,
    location: 'Conference Room',
    teacher: 'Mr. Kimani',
    isRegistered: false,
  },
  {
    id: 4,
    name: 'Environmental Club',
    category: 'community',
    description: 'Work on environmental conservation projects and awareness campaigns.',
    schedule: 'Sat 9:00 AM - 12:00 PM',
    participants: 15,
    maxParticipants: 25,
    location: 'School Garden',
    teacher: 'Mrs. Mwangi',
    isRegistered: true,
  },
];

const mockEvents: Event[] = [
  {
    id: 1,
    name: 'Science Camp 2024',
    type: 'camp',
    date: '2024-04-15 to 2024-04-17',
    location: 'Ol Pejeta Conservancy',
    description: 'Three-day science camp focusing on wildlife conservation and research.',
    fee: 5000,
    isRegistered: false,
  },
  {
    id: 2,
    name: 'Inter-School Basketball Tournament',
    type: 'competition',
    date: '2024-03-20',
    location: 'Nyayo Stadium',
    description: 'Regional basketball tournament for secondary schools.',
    fee: 500,
    isRegistered: true,
  },
  {
    id: 3,
    name: 'Creative Writing Workshop',
    type: 'workshop',
    date: '2024-03-08',
    location: 'Library Hall',
    description: 'Workshop on creative writing techniques with published authors.',
    fee: 1000,
    isRegistered: false,
  },
  {
    id: 4,
    name: 'Annual Talent Show',
    type: 'performance',
    date: '2024-05-10',
    location: 'School Auditorium',
    description: 'Showcase your talents in music, dance, drama, and more.',
    fee: 0,
    isRegistered: false,
  },
];

export default function ExtraCurricular() {
  const [activities, setActivities] = useState(mockActivities);
  const [events, setEvents] = useState(mockEvents);
  const [selectedTab, setSelectedTab] = useState<'activities' | 'events'>('activities');

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'sports': return '#10b981';
      case 'arts': return '#8b5cf6';
      case 'academics': return '#0ea5e9';
      case 'community': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'camp': return '#10b981';
      case 'competition': return '#ef4444';
      case 'workshop': return '#0ea5e9';
      case 'performance': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  const handleActivityRegistration = (activityId: number) => {
    setActivities(prev =>
      prev.map(activity =>
        activity.id === activityId
          ? { ...activity, isRegistered: !activity.isRegistered }
          : activity
      )
    );
    
    const activity = activities.find(a => a.id === activityId);
    Alert.alert(
      'Registration Updated',
      `You have ${activity?.isRegistered ? 'left' : 'joined'} ${activity?.name}!`
    );
  };

  const handleEventRegistration = (eventId: number) => {
    setEvents(prev =>
      prev.map(event =>
        event.id === eventId
          ? { ...event, isRegistered: !event.isRegistered }
          : event
      )
    );
    
    const event = events.find(e => e.id === eventId);
    Alert.alert(
      'Registration Updated',
      `You have ${event?.isRegistered ? 'cancelled registration for' : 'registered for'} ${event?.name}!`
    );
  };

  const renderActivities = () => (
    <ScrollView style={styles.content}>
      {activities.map((activity) => (
        <View key={activity.id} style={styles.activityCard}>
          <View style={styles.activityHeader}>
            <View style={styles.activityInfo}>
              <Text style={styles.activityName}>{activity.name}</Text>
              <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(activity.category) }]}>
                <Text style={styles.categoryText}>{activity.category}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={[
                styles.registerButton,
                activity.isRegistered && styles.registeredButton
              ]}
              onPress={() => handleActivityRegistration(activity.id)}
            >
              <Text style={[
                styles.registerButtonText,
                activity.isRegistered && styles.registeredButtonText
              ]}>
                {activity.isRegistered ? 'Leave' : 'Join'}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.activityDescription}>{activity.description}</Text>

          <View style={styles.activityDetails}>
            <View style={styles.detailRow}>
              <Clock size={16} color="#6b7280" />
              <Text style={styles.detailText}>{activity.schedule}</Text>
            </View>
            <View style={styles.detailRow}>
              <MapPin size={16} color="#6b7280" />
              <Text style={styles.detailText}>{activity.location}</Text>
            </View>
            <View style={styles.detailRow}>
              <Users size={16} color="#6b7280" />
              <Text style={styles.detailText}>
                {activity.participants}/{activity.maxParticipants} participants
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Star size={16} color="#6b7280" />
              <Text style={styles.detailText}>Teacher: {activity.teacher}</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  const renderEvents = () => (
    <ScrollView style={styles.content}>
      {events.map((event) => (
        <View key={event.id} style={styles.eventCard}>
          <View style={styles.eventHeader}>
            <View style={styles.eventInfo}>
              <Text style={styles.eventName}>{event.name}</Text>
              <View style={[styles.eventTypeBadge, { backgroundColor: getEventTypeColor(event.type) }]}>
                <Text style={styles.eventTypeText}>{event.type}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={[
                styles.registerButton,
                event.isRegistered && styles.registeredButton
              ]}
              onPress={() => handleEventRegistration(event.id)}
            >
              <Text style={[
                styles.registerButtonText,
                event.isRegistered && styles.registeredButtonText
              ]}>
                {event.isRegistered ? 'Cancel' : 'Register'}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.eventDescription}>{event.description}</Text>

          <View style={styles.eventDetails}>
            <View style={styles.detailRow}>
              <Calendar size={16} color="#6b7280" />
              <Text style={styles.detailText}>{event.date}</Text>
            </View>
            <View style={styles.detailRow}>
              <MapPin size={16} color="#6b7280" />
              <Text style={styles.detailText}>{event.location}</Text>
            </View>
            <View style={styles.detailRow}>
              <Trophy size={16} color="#6b7280" />
              <Text style={styles.detailText}>
                Fee: {event.fee === 0 ? 'Free' : `KES ${event.fee}`}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Extra-Curricular</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'activities' && styles.activeTab]}
          onPress={() => setSelectedTab('activities')}
        >
          <Text style={[styles.tabText, selectedTab === 'activities' && styles.activeTabText]}>
            Activities
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'events' && styles.activeTab]}
          onPress={() => setSelectedTab('events')}
        >
          <Text style={[styles.tabText, selectedTab === 'events' && styles.activeTabText]}>
            Events
          </Text>
        </TouchableOpacity>
      </View>

      {selectedTab === 'activities' ? renderActivities() : renderEvents()}
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
  addButton: {
    backgroundColor: '#0ea5e9',
    borderRadius: 20,
    padding: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 4,
    backgroundColor: '#f3f4f6',
  },
  activeTab: {
    backgroundColor: '#0ea5e9',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#ffffff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  activityCard: {
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
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 8,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: '#0ea5e9',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  registeredButton: {
    backgroundColor: '#ef4444',
  },
  registerButtonText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
  },
  registeredButtonText: {
    color: '#ffffff',
  },
  activityDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  activityDetails: {
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingTop: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
  },
  eventCard: {
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
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  eventInfo: {
    flex: 1,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 8,
  },
  eventTypeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  eventTypeText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  eventDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  eventDetails: {
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingTop: 16,
  },
});