import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { User, Bell, Globe, Moon, Shield, CircleHelp as HelpCircle, LogOut, CreditCard as Edit, Camera, ChevronRight, Languages, Palette } from 'lucide-react-native';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');
  const [biometricLogin, setBiometricLogin] = useState(false);

  const handleLanguageSwitch = () => {
    const newLanguage = language === 'English' ? 'Kiswahili' : 'English';
    setLanguage(newLanguage);
    Alert.alert('Language Changed', `App language changed to ${newLanguage}`);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => console.log('Logout') },
      ]
    );
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing feature coming soon!');
  };

  const handleFaceVerification = () => {
    Alert.alert('Face Verification', 'Face verification setup coming soon!');
  };

  const handleHelp = () => {
    Alert.alert('Help & Support', 'Help center coming soon!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Profile Section */}
        <View style={styles.section}>
          <View style={styles.profileCard}>
            <View style={styles.profileImageContainer}>
              <View style={styles.profileImage}>
                <Text style={styles.profileInitial}>JD</Text>
              </View>
              <TouchableOpacity style={styles.cameraButton}>
                <Camera size={16} color="#ffffff" />
              </TouchableOpacity>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>John Doe</Text>
              <Text style={styles.profileRole}>Student - Form 4A</Text>
              <Text style={styles.profileEmail}>john.doe@student.com</Text>
            </View>
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <Edit size={20} color="#0ea5e9" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <TouchableOpacity style={styles.settingItem} onPress={handleEditProfile}>
            <View style={styles.settingLeft}>
              <User size={24} color="#0ea5e9" />
              <Text style={styles.settingText}>Edit Profile</Text>
            </View>
            <ChevronRight size={20} color="#6b7280" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={handleFaceVerification}>
            <View style={styles.settingLeft}>
              <Shield size={24} color="#10b981" />
              <Text style={styles.settingText}>Face Verification</Text>
            </View>
            <ChevronRight size={20} color="#6b7280" />
          </TouchableOpacity>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Shield size={24} color="#f59e0b" />
              <Text style={styles.settingText}>Biometric Login</Text>
            </View>
            <Switch
              value={biometricLogin}
              onValueChange={setBiometricLogin}
              trackColor={{ false: '#f3f4f6', true: '#0ea5e9' }}
              thumbColor={biometricLogin ? '#ffffff' : '#ffffff'}
            />
          </View>
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Bell size={24} color="#8b5cf6" />
              <Text style={styles.settingText}>Push Notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#f3f4f6', true: '#0ea5e9' }}
              thumbColor={notifications ? '#ffffff' : '#ffffff'}
            />
          </View>

          <TouchableOpacity style={styles.settingItem} onPress={handleLanguageSwitch}>
            <View style={styles.settingLeft}>
              <Languages size={24} color="#06b6d4" />
              <Text style={styles.settingText}>Language</Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>{language}</Text>
              <ChevronRight size={20} color="#6b7280" />
            </View>
          </TouchableOpacity>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Palette size={24} color="#ec4899" />
              <Text style={styles.settingText}>Dark Mode</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#f3f4f6', true: '#0ea5e9' }}
              thumbColor={darkMode ? '#ffffff' : '#ffffff'}
            />
          </View>
        </View>

        {/* Extra Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Extra Features</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Globe size={24} color="#14b8a6" />
              <Text style={styles.settingText}>Extra-Curricular Activities</Text>
            </View>
            <ChevronRight size={20} color="#6b7280" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <User size={24} color="#f97316" />
              <Text style={styles.settingText}>AI Tutor Settings</Text>
            </View>
            <ChevronRight size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <TouchableOpacity style={styles.settingItem} onPress={handleHelp}>
            <View style={styles.settingLeft}>
              <HelpCircle size={24} color="#6366f1" />
              <Text style={styles.settingText}>Help & Support</Text>
            </View>
            <ChevronRight size={20} color="#6b7280" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Shield size={24} color="#64748b" />
              <Text style={styles.settingText}>Privacy Policy</Text>
            </View>
            <ChevronRight size={20} color="#6b7280" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <HelpCircle size={24} color="#64748b" />
              <Text style={styles.settingText}>Terms of Service</Text>
            </View>
            <ChevronRight size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={24} color="#ef4444" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>ElimApp v1.0.0</Text>
          <Text style={styles.appInfoText}>© 2024 ElimApp Technologies</Text>
        </View>
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
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 12,
    marginHorizontal: 20,
  },
  profileCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  profileImageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0ea5e9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  cameraButton: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#10b981',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  profileRole: {
    fontSize: 14,
    color: '#0ea5e9',
    fontWeight: '600',
  },
  profileEmail: {
    fontSize: 12,
    color: '#6b7280',
  },
  editButton: {
    padding: 8,
  },
  settingItem: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 16,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: 16,
    color: '#6b7280',
    marginRight: 8,
  },
  logoutButton: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    fontSize: 16,
    color: '#ef4444',
    fontWeight: '600',
    marginLeft: 12,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  appInfoText: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
});