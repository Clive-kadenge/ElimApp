import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { Search, Send, Phone, Video, MoveVertical as MoreVertical, Bell, BellOff } from 'lucide-react-native';

const mockConversations = [
  {
    id: 1,
    name: 'Mr. Smith (Mathematics)',
    lastMessage: 'Great work on the algebra assignment!',
    time: '2:30 PM',
    unread: 2,
    type: 'teacher',
    avatar: '👨‍🏫',
  },
  {
    id: 2,
    name: 'Mrs. Johnson (English)',
    lastMessage: 'Please submit your essay by Friday',
    time: '1:15 PM',
    unread: 0,
    type: 'teacher',
    avatar: '👩‍🏫',
  },
  {
    id: 3,
    name: 'Parent Group - Form 4A',
    lastMessage: 'Meeting scheduled for next week',
    time: '12:45 PM',
    unread: 5,
    type: 'group',
    avatar: '👥',
  },
  {
    id: 4,
    name: 'Dr. Brown (Chemistry)',
    lastMessage: 'Lab results discussion tomorrow',
    time: '11:30 AM',
    unread: 1,
    type: 'teacher',
    avatar: '👨‍🔬',
  },
  {
    id: 5,
    name: 'Study Group - Mathematics',
    lastMessage: 'Anyone free for study session?',
    time: 'Yesterday',
    unread: 0,
    type: 'group',
    avatar: '📚',
  },
];

const mockMessages = [
  {
    id: 1,
    sender: 'Mr. Smith',
    message: 'Good morning! How are you finding the new algebra topics?',
    time: '9:00 AM',
    isMe: false,
  },
  {
    id: 2,
    sender: 'Me',
    message: 'Good morning Mr. Smith! I\'m doing well, but I have some questions about quadratic equations.',
    time: '9:05 AM',
    isMe: true,
  },
  {
    id: 3,
    sender: 'Mr. Smith',
    message: 'That\'s great! Quadratic equations can be tricky. What specific part are you struggling with?',
    time: '9:10 AM',
    isMe: false,
  },
  {
    id: 4,
    sender: 'Me',
    message: 'I\'m having trouble with the discriminant and understanding when there are no real solutions.',
    time: '9:15 AM',
    isMe: true,
  },
  {
    id: 5,
    sender: 'Mr. Smith',
    message: 'Great question! The discriminant (b² - 4ac) tells us about the nature of solutions. When it\'s negative, we have no real solutions. Would you like me to explain more?',
    time: '9:20 AM',
    isMe: false,
  },
];

export default function MessagesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [messageText, setMessageText] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      Alert.alert('Message Sent', 'Your message has been sent successfully!');
      setMessageText('');
    }
  };

  const handleCall = () => {
    Alert.alert('Voice Call', 'Starting voice call...');
  };

  const handleVideoCall = () => {
    Alert.alert('Video Call', 'Starting video call...');
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    Alert.alert(
      'Notifications',
      `Push notifications ${!notificationsEnabled ? 'enabled' : 'disabled'} for messages.`
    );
  };

  if (selectedConversation) {
    const conversation = mockConversations.find(c => c.id === selectedConversation);
    
    return (
      <View style={styles.container}>
        <View style={styles.chatHeader}>
          <TouchableOpacity onPress={() => setSelectedConversation(null)}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <View style={styles.chatInfo}>
            <Text style={styles.chatName}>{conversation?.name}</Text>
            <Text style={styles.chatStatus}>Online</Text>
          </View>
          <View style={styles.chatActions}>
            <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
              <Phone size={20} color="#0ea5e9" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleVideoCall}>
              <Video size={20} color="#0ea5e9" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <MoreVertical size={20} color="#0ea5e9" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.messagesContainer}>
          {mockMessages.map((msg) => (
            <View key={msg.id} style={[
              styles.messageItem,
              msg.isMe ? styles.myMessage : styles.theirMessage
            ]}>
              <View style={[
                styles.messageBubble,
                msg.isMe ? styles.myBubble : styles.theirBubble
              ]}>
                <Text style={[
                  styles.messageText,
                  msg.isMe ? styles.myMessageText : styles.theirMessageText
                ]}>
                  {msg.message}
                </Text>
                <Text style={[
                  styles.messageTime,
                  msg.isMe ? styles.myMessageTime : styles.theirMessageTime
                ]}>
                  {msg.time}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.messageInput}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            value={messageText}
            onChangeText={setMessageText}
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
            <Send size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <TouchableOpacity onPress={toggleNotifications}>
          {notificationsEnabled ? (
            <Bell size={24} color="#0ea5e9" />
          ) : (
            <BellOff size={24} color="#6b7280" />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#6b7280" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search conversations..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.conversationsList}>
        {mockConversations
          .filter(conv => 
            conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((conversation) => (
            <TouchableOpacity
              key={conversation.id}
              style={styles.conversationItem}
              onPress={() => setSelectedConversation(conversation.id)}
            >
              <View style={styles.avatarContainer}>
                <Text style={styles.avatar}>{conversation.avatar}</Text>
                {conversation.type === 'group' && (
                  <View style={styles.groupBadge}>
                    <Text style={styles.groupBadgeText}>G</Text>
                  </View>
                )}
              </View>
              
              <View style={styles.conversationContent}>
                <View style={styles.conversationHeader}>
                  <Text style={styles.conversationName}>{conversation.name}</Text>
                  <Text style={styles.conversationTime}>{conversation.time}</Text>
                </View>
                <View style={styles.conversationFooter}>
                  <Text style={styles.lastMessage} numberOfLines={1}>
                    {conversation.lastMessage}
                  </Text>
                  {conversation.unread > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadText}>{conversation.unread}</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>

      {/* Notification Settings */}
      <View style={styles.notificationSettings}>
        <TouchableOpacity style={styles.settingsButton} onPress={toggleNotifications}>
          <Text style={styles.settingsText}>
            {notificationsEnabled ? 'Disable' : 'Enable'} Push Notifications
          </Text>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  conversationsList: {
    flex: 1,
  },
  conversationItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    position: 'relative',
  },
  avatar: {
    fontSize: 24,
  },
  groupBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#0ea5e9',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupBadgeText: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  conversationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e3a8a',
    flex: 1,
  },
  conversationTime: {
    fontSize: 12,
    color: '#6b7280',
  },
  conversationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    color: '#6b7280',
    flex: 1,
  },
  unreadBadge: {
    backgroundColor: '#0ea5e9',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  unreadText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  chatHeader: {
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
  backButton: {
    fontSize: 16,
    color: '#0ea5e9',
    fontWeight: '600',
  },
  chatInfo: {
    flex: 1,
    alignItems: 'center',
  },
  chatName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  chatStatus: {
    fontSize: 12,
    color: '#10b981',
  },
  chatActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  messageItem: {
    marginBottom: 16,
  },
  myMessage: {
    alignItems: 'flex-end',
  },
  theirMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 18,
  },
  myBubble: {
    backgroundColor: '#0ea5e9',
    borderBottomRightRadius: 6,
  },
  theirBubble: {
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
  myMessageText: {
    color: '#ffffff',
  },
  theirMessageText: {
    color: '#1e3a8a',
  },
  messageTime: {
    fontSize: 12,
  },
  myMessageTime: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  theirMessageTime: {
    color: '#6b7280',
  },
  messageInput: {
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
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  sendButton: {
    backgroundColor: '#0ea5e9',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationSettings: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  settingsButton: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
  },
  settingsText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '600',
  },
});