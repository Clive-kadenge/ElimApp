import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Send, Mic, Volume2, Lock } from 'lucide-react-native';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: string;
}

const mockResponses = [
  "That's a great question! Let me help you understand this concept better.",
  "I can see you're working on a challenging topic. Let's break it down step by step.",
  "Perfect! You're on the right track. Here's how to approach this problem:",
  "Don't worry if this seems difficult at first. Many students find this topic challenging.",
  "Let me provide you with a simpler explanation and some examples.",
];

export default function AITutor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI tutor. I'm here to help you with your studies. What would you like to learn about today?",
      isUser: false,
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isChildMode, setIsChildMode] = useState(false);

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isUser: true,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, newMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      const aiResponse: Message = {
        id: messages.length + 2,
        text: randomResponse,
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleVoiceInput = () => {
    setIsVoiceMode(!isVoiceMode);
    Alert.alert(
      'Voice Input',
      isVoiceMode ? 'Voice input disabled' : 'Voice input enabled. Start speaking...'
    );
  };

  const handleTextToSpeech = (text: string) => {
    Alert.alert('Text to Speech', 'Reading message aloud...');
  };

  const toggleChildMode = () => {
    if (!isChildMode) {
      Alert.alert(
        'Child Mode',
        'This will enable child-only access mode. Parent verification required.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Enable', onPress: () => setIsChildMode(true) },
        ]
      );
    } else {
      setIsChildMode(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Tutor</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={[styles.childModeButton, isChildMode && styles.childModeActive]}
            onPress={toggleChildMode}
          >
            <Lock size={20} color={isChildMode ? '#ffffff' : '#6b7280'} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.messagesContainer}>
        {messages.map((message) => (
          <View key={message.id} style={[
            styles.messageItem,
            message.isUser ? styles.userMessage : styles.aiMessage
          ]}>
            <View style={[
              styles.messageBubble,
              message.isUser ? styles.userBubble : styles.aiBubble
            ]}>
              <Text style={[
                styles.messageText,
                message.isUser ? styles.userMessageText : styles.aiMessageText
              ]}>
                {message.text}
              </Text>
              <Text style={[
                styles.messageTime,
                message.isUser ? styles.userMessageTime : styles.aiMessageTime
              ]}>
                {message.timestamp}
              </Text>
            </View>
            {!message.isUser && (
              <TouchableOpacity 
                style={styles.speakButton}
                onPress={() => handleTextToSpeech(message.text)}
              >
                <Volume2 size={16} color="#0ea5e9" />
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Ask me anything about your studies..."
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={500}
        />
        <TouchableOpacity 
          style={[styles.voiceButton, isVoiceMode && styles.voiceButtonActive]}
          onPress={handleVoiceInput}
        >
          <Mic size={20} color={isVoiceMode ? '#ffffff' : '#0ea5e9'} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.sendButton} 
          onPress={handleSendMessage}
          disabled={inputText.trim() === ''}
        >
          <Send size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Quick Study Topics */}
      <View style={styles.quickTopics}>
        <Text style={styles.quickTopicsTitle}>Quick Help Topics:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            'Math Problems',
            'Science Questions',
            'English Grammar',
            'History Facts',
            'Study Tips',
            'Exam Preparation'
          ].map((topic, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.topicButton}
              onPress={() => setInputText(`Help me with ${topic}`)}
            >
              <Text style={styles.topicButtonText}>{topic}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
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
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  childModeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
  },
  childModeActive: {
    backgroundColor: '#0ea5e9',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  messageItem: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  userMessage: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  aiMessage: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 18,
  },
  userBubble: {
    backgroundColor: '#0ea5e9',
    borderBottomRightRadius: 6,
  },
  aiBubble: {
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 4,
  },
  userMessageText: {
    color: '#ffffff',
  },
  aiMessageText: {
    color: '#1e3a8a',
  },
  messageTime: {
    fontSize: 12,
  },
  userMessageTime: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  aiMessageTime: {
    color: '#6b7280',
  },
  speakButton: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 16,
    backgroundColor: '#eff6ff',
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  voiceButton: {
    padding: 12,
    borderRadius: 20,
    backgroundColor: '#eff6ff',
    marginRight: 8,
  },
  voiceButtonActive: {
    backgroundColor: '#0ea5e9',
  },
  sendButton: {
    backgroundColor: '#0ea5e9',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickTopics: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  quickTopicsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 12,
  },
  topicButton: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  topicButtonText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
  },
});