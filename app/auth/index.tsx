import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { User, UserCheck, Users, Building, Eye, EyeOff } from 'lucide-react-native';

const roles = [
  { id: 'student', label: 'Student', icon: User, color: '#0ea5e9' },
  { id: 'parent', label: 'Parent', icon: UserCheck, color: '#10b981' },
  { id: 'teacher', label: 'Teacher', icon: Users, color: '#f59e0b' },
  { id: 'school', label: 'School', icon: Building, color: '#8b5cf6' },
];

export default function AuthScreen() {
  const [selectedRole, setSelectedRole] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!selectedRole) {
      newErrors.role = 'Please select your role to continue';
    }

    if (!phoneNumber && !email) {
      newErrors.contact = 'Please enter your phone number or email';
    }

    if (phoneNumber && !/^\+?[\d\s-()]+$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    if (email && !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Please enter your password';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin && !name) {
      newErrors.name = 'Please enter your full name';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAuth = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store user data (in a real app, this would be in secure storage)
      const userData = {
        role: selectedRole,
        name: name || 'User',
        email: email || '',
        phoneNumber: phoneNumber || '',
        isAuthenticated: true,
      };

      console.log('Authentication successful:', userData);
      
      // Show success message
      Alert.alert(
        'Success!',
        `${isLogin ? 'Login' : 'Account creation'} successful as ${selectedRole}!`,
        [
          {
            text: 'Continue',
            onPress: () => {
              // Navigate to main app with replace to prevent going back
              router.replace('/(tabs)');
            },
          },
        ]
      );
      
    } catch (error) {
      console.error('Authentication error:', error);
      setErrors({ general: 'Authentication failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBiometricLogin = () => {
    if (!selectedRole) {
      setErrors({ role: 'Please select your role first' });
      return;
    }

    if (Platform.OS === 'web') {
      Alert.alert(
        'Biometric Login',
        'Biometric authentication is not available on web. Please use your credentials.'
      );
    } else {
      Alert.alert(
        'Biometric Login',
        'Biometric authentication will be implemented in a future update. Please use your credentials for now.'
      );
    }
  };

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Logo Section */}
      <View style={styles.logoSection}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>E</Text>
          </View>
          <Text style={styles.appName}>ElimApp</Text>
          <Text style={styles.tagline}>Learning. Together. Anywhere.</Text>
        </View>
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>Welcome to ElimApp</Text>
        <Text style={styles.subtitle}>Select your role to continue</Text>
      </View>

      {/* Error Display */}
      {errors.general && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errors.general}</Text>
        </View>
      )}

      {errors.role && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errors.role}</Text>
        </View>
      )}

      <View style={styles.roleContainer}>
        {roles.map(role => (
          <TouchableOpacity
            key={role.id}
            style={[
              styles.roleButton,
              selectedRole === role.id && {
                backgroundColor: role.color,
                borderColor: role.color,
                transform: [{ scale: 1.05 }],
              },
            ]}
            onPress={() => {
              setSelectedRole(role.id);
              clearError('role');
            }}
            activeOpacity={0.8}
          >
            <role.icon
              size={32}
              color={selectedRole === role.id ? '#ffffff' : role.color}
            />
            <Text
              style={[
                styles.roleLabel,
                selectedRole === role.id && { color: '#ffffff' },
              ]}
            >
              {role.label}
            </Text>
            {selectedRole === role.id && (
              <View style={styles.selectedIndicator}>
                <Text style={styles.checkmark}>✓</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {selectedRole ? (
        <View style={styles.authContainer}>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleButton, isLogin && styles.activeToggle]}
              onPress={() => {
                setIsLogin(true);
                setErrors({});
              }}
            >
              <Text
                style={[styles.toggleText, isLogin && styles.activeToggleText]}
              >
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, !isLogin && styles.activeToggle]}
              onPress={() => {
                setIsLogin(false);
                setErrors({});
              }}
            >
              <Text
                style={[
                  styles.toggleText,
                  !isLogin && styles.activeToggleText,
                ]}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          {!isLogin && (
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Full Name *</Text>
              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                placeholder="Enter your full name"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  clearError('name');
                }}
                autoCapitalize="words"
                autoComplete="name"
              />
              {errors.name && <Text style={styles.inputErrorText}>{errors.name}</Text>}
            </View>
          )}

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Phone Number *</Text>
            <TextInput
              style={[styles.input, errors.phoneNumber && styles.inputError]}
              placeholder="e.g., +254712345678"
              value={phoneNumber}
              onChangeText={(text) => {
                setPhoneNumber(text);
                clearError('phoneNumber');
                clearError('contact');
              }}
              keyboardType="phone-pad"
              autoComplete="tel"
            />
            {errors.phoneNumber && <Text style={styles.inputErrorText}>{errors.phoneNumber}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email (optional)</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="your.email@example.com"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                clearError('email');
                clearError('contact');
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
            {errors.email && <Text style={styles.inputErrorText}>{errors.email}</Text>}
          </View>

          {errors.contact && <Text style={styles.inputErrorText}>{errors.contact}</Text>}

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password *</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.passwordInput, errors.password && styles.inputError]}
                placeholder="Enter your password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  clearError('password');
                }}
                secureTextEntry={!showPassword}
                autoComplete="password"
              />
              <TouchableOpacity
                style={styles.passwordToggle}
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={20} color="#6b7280" />
                ) : (
                  <Eye size={20} color="#6b7280" />
                )}
              </TouchableOpacity>
            </View>
            {errors.password && <Text style={styles.inputErrorText}>{errors.password}</Text>}
          </View>

          <TouchableOpacity
            style={[
              styles.authButton,
              (!selectedRole || isLoading) && styles.authButtonDisabled,
            ]}
            onPress={handleAuth}
            disabled={!selectedRole || isLoading}
          >
            <Text style={styles.authButtonText}>
              {isLoading
                ? 'Please wait...'
                : isLogin
                ? 'Login'
                : 'Create Account'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.biometricButton}
            onPress={handleBiometricLogin}
          >
            <Text style={styles.biometricText}>Use Biometric Login</Text>
          </TouchableOpacity>

          <View style={styles.roleInfo}>
            <Text style={styles.roleInfoText}>
              Logging in as:{' '}
              <Text style={styles.roleInfoHighlight}>
                {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
              </Text>
            </Text>
          </View>

          {/* Quick Login for Testing */}
          <View style={styles.testingContainer}>
            <Text style={styles.testingTitle}>Quick Login (Testing)</Text>
            <TouchableOpacity
              style={styles.quickLoginButton}
              onPress={() => {
                setPhoneNumber('+254712345678');
                setPassword('password123');
                setTimeout(() => handleAuth(), 100);
              }}
            >
              <Text style={styles.quickLoginText}>Fill Demo Credentials</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            👆 Please select your role above to continue with authentication
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  logoSection: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    backgroundColor: '#0ea5e9',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 4,
  },
  tagline: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  header: { 
    alignItems: 'center', 
    marginTop: 20, 
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: { 
    fontSize: 16, 
    color: '#6b7280', 
    textAlign: 'center' 
  },
  errorContainer: {
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  roleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  roleButton: {
    width: '48%',
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#f9fafb',
    position: 'relative',
  },
  roleLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginTop: 8,
  },
  selectedIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: '#10b981' 
  },
  authContainer: { 
    paddingHorizontal: 20, 
    paddingBottom: 40 
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 25,
    padding: 4,
    marginBottom: 30,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 21,
  },
  activeToggle: { 
    backgroundColor: '#0ea5e9' 
  },
  toggleText: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#6b7280' 
  },
  activeToggleText: { 
    color: '#fff' 
  },
  inputContainer: { 
    marginBottom: 20 
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
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
  inputError: {
    borderColor: '#dc2626',
    backgroundColor: '#fef2f2',
  },
  inputErrorText: {
    color: '#dc2626',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  passwordInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  passwordToggle: {
    padding: 16,
  },
  authButton: {
    backgroundColor: '#0ea5e9',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#0ea5e9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  authButtonDisabled: {
    backgroundColor: '#9ca3af',
    shadowOpacity: 0,
    elevation: 0,
  },
  authButtonText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#fff' 
  },
  biometricButton: { 
    paddingVertical: 16, 
    alignItems: 'center', 
    marginTop: 16 
  },
  biometricText: { 
    fontSize: 16, 
    color: '#0ea5e9', 
    fontWeight: '600' 
  },
  roleInfo: {
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  roleInfoText: { 
    fontSize: 14, 
    color: '#1e40af', 
    textAlign: 'center' 
  },
  roleInfoHighlight: { 
    fontWeight: 'bold', 
    color: '#0ea5e9' 
  },
  testingContainer: {
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  testingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#166534',
    textAlign: 'center',
    marginBottom: 12,
  },
  quickLoginButton: {
    backgroundColor: '#10b981',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  quickLoginText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
  },
  instructionContainer: {
    backgroundColor: '#fef3c7',
    borderRadius: 12,
    padding: 20,
    margin: 20,
    borderWidth: 1,
    borderColor: '#fbbf24',
  },
  instructionText: {
    fontSize: 16,
    color: '#92400e',
    textAlign: 'center',
    fontWeight: '600',
  },
});