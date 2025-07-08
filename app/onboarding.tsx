import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { BookOpen, Users, Brain, Award } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    id: 1,
    title: 'Learn Together',
    subtitle: 'Connect with classmates, teachers, and parents in one platform',
    icon: Users,
    color: '#0ea5e9',
  },
  {
    id: 2,
    title: 'Smart Learning',
    subtitle: 'AI-powered tutoring and personalized learning experiences',
    icon: Brain,
    color: '#10b981',
  },
  {
    id: 3,
    title: 'Track Progress',
    subtitle: 'Monitor academic performance and earn rewards',
    icon: Award,
    color: '#f59e0b',
  },
];

export default function OnboardingScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const nextSlide = () => {
    if (currentSlide < onboardingData.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      router.replace('/auth');
    }
  };

  const skip = () => {
    router.replace('/auth');
  };

  const IconComponent = onboardingData[currentSlide].icon;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={skip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <View style={styles.slideContainer}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: onboardingData[currentSlide].color },
          ]}
        >
          <IconComponent size={64} color="#ffffff" />
        </View>
        <Text style={styles.title}>
          {onboardingData[currentSlide].title}
        </Text>
        <Text style={styles.subtitle}>
          {onboardingData[currentSlide].subtitle}
        </Text>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.pagination}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                {
                  backgroundColor:
                    index === currentSlide ? '#0ea5e9' : '#e5e7eb',
                },
              ]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={nextSlide}>
          <Text style={styles.nextButtonText}>
            {currentSlide === onboardingData.length - 1
              ? 'Get Started'
              : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  skipButton: {
    alignSelf: 'flex-end',
    marginTop: 60,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  skipText: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '600',
  },
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e3a8a',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  bottomContainer: {
    paddingBottom: 40,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  paginationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 4,
  },
  nextButton: {
    backgroundColor: '#0ea5e9',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#0ea5e9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});