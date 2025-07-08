import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Trophy, 
  Target, 
  Calendar, 
  MessageCircle, 
  Book, 
  Star, 
  Award,
  Brain,
  Users,
  TrendingUp
} from 'lucide-react-native';

// Mock user data - in real app this would come from auth context
const mockUser = {
  role: 'student',
  name: 'John Doe',
  xp: 1250,
  level: 5,
  streak: 7,
  class: 'Form 4A',
  subjects: ['Mathematics', 'English', 'Kiswahili', 'Chemistry', 'Physics'],
  assignments: 3,
  messages: 5,
  trivia: { available: 2, completed: 15 }
};

export default function DashboardScreen() {
  const [user] = useState(mockUser);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getDashboardContent = () => {
    switch (user.role) {
      case 'student':
        return <StudentDashboard user={user} />;
      case 'parent':
        return <ParentDashboard user={user} />;
      case 'teacher':
        return <TeacherDashboard user={user} />;
      case 'school':
        return <SchoolDashboard user={user} />;
      default:
        return <StudentDashboard user={user} />;
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loadingContent}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>E</Text>
          </View>
          <Text style={styles.loadingText}>Loading your dashboard...</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* ElimApp Logo Section */}
      <View style={styles.logoSection}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>E</Text>
          </View>
          <Text style={styles.appName}>ElimApp</Text>
        </View>
      </View>

      {/* Welcome Message */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome to ElimApp!</Text>
        <Text style={styles.welcomeSubtext}>Your learning journey starts here</Text>
      </View>

      <View style={styles.header}>
        <View style={styles.welcomeUserContainer}>
          <Text style={styles.welcomeBackText}>Welcome back,</Text>
          <Text style={styles.userName}>{user.name}</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <MessageCircle size={24} color="#0ea5e9" />
          {user.messages > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{user.messages}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {getDashboardContent()}
    </ScrollView>
  );
}

function StudentDashboard({ user }: { user: any }) {
  return (
    <View>
      {/* XP Progress Section */}
      <View style={styles.xpContainer}>
        <View style={styles.xpHeader}>
          <View style={styles.xpInfo}>
            <Text style={styles.xpTitle}>Level {user.level}</Text>
            <Text style={styles.xpSubtitle}>{user.xp} XP</Text>
          </View>
          <View style={styles.streakContainer}>
            <Award size={20} color="#f59e0b" />
            <Text style={styles.streakText}>{user.streak} day streak</Text>
          </View>
        </View>
        <View style={styles.xpBar}>
          <View style={[styles.xpProgress, { width: '70%' }]} />
        </View>
        <Text style={styles.xpLabel}>350 XP to next level</Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#0ea5e9' }]}>
          <Brain size={32} color="#ffffff" />
          <Text style={styles.actionText}>AI Tutor</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#10b981' }]}>
          <Trophy size={32} color="#ffffff" />
          <Text style={styles.actionText}>Trivia Game</Text>
          <View style={styles.actionBadge}>
            <Text style={styles.actionBadgeText}>{user.trivia.available}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#f59e0b' }]}>
          <Book size={32} color="#ffffff" />
          <Text style={styles.actionText}>Assignments</Text>
          <View style={styles.actionBadge}>
            <Text style={styles.actionBadgeText}>{user.assignments}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Today's Schedule */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Today's Schedule</Text>
        <View style={styles.scheduleCard}>
          <View style={styles.scheduleItem}>
            <View style={styles.scheduleTime}>
              <Text style={styles.timeText}>9:00 AM</Text>
            </View>
            <View style={styles.scheduleContent}>
              <Text style={styles.subjectText}>Mathematics</Text>
              <Text style={styles.topicText}>Algebra - Linear Equations</Text>
            </View>
          </View>
          <View style={styles.scheduleItem}>
            <View style={styles.scheduleTime}>
              <Text style={styles.timeText}>11:00 AM</Text>
            </View>
            <View style={styles.scheduleContent}>
              <Text style={styles.subjectText}>English</Text>
              <Text style={styles.topicText}>Literature - Poetry Analysis</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityCard}>
          <View style={styles.activityItem}>
            <Star size={20} color="#f59e0b" />
            <Text style={styles.activityText}>Completed Chemistry assignment</Text>
          </View>
          <View style={styles.activityItem}>
            <Trophy size={20} color="#10b981" />
            <Text style={styles.activityText}>Won Science trivia challenge</Text>
          </View>
          <View style={styles.activityItem}>
            <Target size={20} color="#0ea5e9" />
            <Text style={styles.activityText}>Reached Level 5</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function ParentDashboard({ user }: { user: any }) {
  return (
    <View>
      {/* Child Performance Overview */}
      <View style={styles.performanceContainer}>
        <Text style={styles.sectionTitle}>Child's Performance</Text>
        <View style={styles.performanceCard}>
          <View style={styles.performanceItem}>
            <TrendingUp size={24} color="#10b981" />
            <View style={styles.performanceText}>
              <Text style={styles.performanceLabel}>Overall Grade</Text>
              <Text style={styles.performanceValue}>85%</Text>
            </View>
          </View>
          <View style={styles.performanceItem}>
            <Award size={24} color="#f59e0b" />
            <View style={styles.performanceText}>
              <Text style={styles.performanceLabel}>Assignments</Text>
              <Text style={styles.performanceValue}>12/15</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Quick Actions for Parents */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#0ea5e9' }]}>
          <MessageCircle size={32} color="#ffffff" />
          <Text style={styles.actionText}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#10b981' }]}>
          <Calendar size={32} color="#ffffff" />
          <Text style={styles.actionText}>Timetable</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#8b5cf6' }]}>
          <Users size={32} color="#ffffff" />
          <Text style={styles.actionText}>Feedback</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function TeacherDashboard({ user }: { user: any }) {
  return (
    <View>
      {/* Teacher Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Users size={32} color="#0ea5e9" />
          <Text style={styles.statNumber}>124</Text>
          <Text style={styles.statLabel}>Students</Text>
        </View>
        <View style={styles.statCard}>
          <Book size={32} color="#10b981" />
          <Text style={styles.statNumber}>8</Text>
          <Text style={styles.statLabel}>Assignments</Text>
        </View>
        <View style={styles.statCard}>
          <Trophy size={32} color="#f59e0b" />
          <Text style={styles.statNumber}>95%</Text>
          <Text style={styles.statLabel}>Completion</Text>
        </View>
      </View>

      {/* Teacher Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#0ea5e9' }]}>
          <Book size={32} color="#ffffff" />
          <Text style={styles.actionText}>Post Assignment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#10b981' }]}>
          <Users size={32} color="#ffffff" />
          <Text style={styles.actionText}>Student Reports</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#f59e0b' }]}>
          <MessageCircle size={32} color="#ffffff" />
          <Text style={styles.actionText}>Messages</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function SchoolDashboard({ user }: { user: any }) {
  return (
    <View>
      {/* School Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Users size={32} color="#0ea5e9" />
          <Text style={styles.statNumber}>1,245</Text>
          <Text style={styles.statLabel}>Students</Text>
        </View>
        <View style={styles.statCard}>
          <Book size={32} color="#10b981" />
          <Text style={styles.statNumber}>52</Text>
          <Text style={styles.statLabel}>Teachers</Text>
        </View>
        <View style={styles.statCard}>
          <Trophy size={32} color="#f59e0b" />
          <Text style={styles.statNumber}>88%</Text>
          <Text style={styles.statLabel}>Performance</Text>
        </View>
      </View>

      {/* School Management */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#0ea5e9' }]}>
          <Users size={32} color="#ffffff" />
          <Text style={styles.actionText}>Manage Teachers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#10b981' }]}>
          <TrendingUp size={32} color="#ffffff" />
          <Text style={styles.actionText}>Analytics</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#8b5cf6' }]}>
          <Users size={32} color="#ffffff" />
          <Text style={styles.actionText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 16,
  },
  // Logo Section Styles
  logoSection: {
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0ea5e9',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 8,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  // Welcome Message Styles
  welcomeContainer: {
    backgroundColor: '#0ea5e9',
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#0ea5e9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  welcomeSubtext: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
  },
  welcomeUserContainer: {
    flex: 1,
  },
  welcomeBackText: {
    fontSize: 16,
    color: '#6b7280',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  notificationButton: {
    padding: 8,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  xpContainer: {
    backgroundColor: '#ffffff',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  xpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  xpInfo: {
    flex: 1,
  },
  xpTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  xpSubtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  streakText: {
    fontSize: 14,
    color: '#f59e0b',
    fontWeight: '600',
    marginLeft: 4,
  },
  xpBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  xpProgress: {
    height: '100%',
    backgroundColor: '#0ea5e9',
    borderRadius: 4,
  },
  xpLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 8,
    textAlign: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#0ea5e9',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 5,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginTop: 8,
    textAlign: 'center',
  },
  actionBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ef4444',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBadgeText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  sectionContainer: {
    backgroundColor: '#ffffff',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 16,
  },
  scheduleCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 10,
    padding: 16,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  scheduleTime: {
    width: 80,
    marginRight: 16,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0ea5e9',
  },
  scheduleContent: {
    flex: 1,
  },
  subjectText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e3a8a',
  },
  topicText: {
    fontSize: 14,
    color: '#6b7280',
  },
  activityCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 10,
    padding: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  activityText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 12,
  },
  performanceContainer: {
    backgroundColor: '#ffffff',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  performanceCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 10,
    padding: 16,
  },
  performanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  performanceText: {
    marginLeft: 16,
    flex: 1,
  },
  performanceLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  performanceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
});