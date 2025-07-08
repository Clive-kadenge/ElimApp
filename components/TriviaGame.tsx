import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Trophy, Clock, Lightbulb, Star, RotateCcw } from 'lucide-react-native';

interface TriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  hint: string;
  xpReward: number;
}

const mockQuestions: TriviaQuestion[] = [
  {
    id: 1,
    question: "What is the capital of Kenya?",
    options: ["Mombasa", "Nairobi", "Kisumu", "Nakuru"],
    correctAnswer: 1,
    subject: "Geography",
    difficulty: "easy",
    hint: "It's the largest city in Kenya",
    xpReward: 10
  },
  {
    id: 2,
    question: "What is 2 + 2 × 3?",
    options: ["8", "12", "10", "6"],
    correctAnswer: 0,
    subject: "Mathematics",
    difficulty: "medium",
    hint: "Remember the order of operations (BODMAS)",
    xpReward: 15
  },
  {
    id: 3,
    question: "Who wrote 'Things Fall Apart'?",
    options: ["Ngugi wa Thiong'o", "Chinua Achebe", "Wole Soyinka", "Okot p'Bitek"],
    correctAnswer: 1,
    subject: "Literature",
    difficulty: "medium",
    hint: "This Nigerian author is famous for his portrayal of African culture",
    xpReward: 20
  }
];

export default function TriviaGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showHint, setShowHint] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    if (timeLeft > 0 && !showAnswer && !gameCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showAnswer) {
      handleTimeUp();
    }
  }, [timeLeft, showAnswer, gameCompleted]);

  const handleTimeUp = () => {
    setShowAnswer(true);
    Alert.alert('Time Up!', 'You ran out of time for this question.');
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showAnswer) return;
    
    setSelectedAnswer(answerIndex);
    setShowAnswer(true);
    
    const isCorrect = answerIndex === mockQuestions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      const xpGained = mockQuestions[currentQuestion].xpReward;
      setScore(score + xpGained);
      setCorrectAnswers(correctAnswers + 1);
      Alert.alert('Correct!', `You earned ${xpGained} XP!`);
    } else {
      Alert.alert('Wrong Answer', 'Better luck next time!');
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
      setTimeLeft(30);
      setShowHint(false);
    } else {
      setGameCompleted(true);
    }
  };

  const handlePlayAgain = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setScore(0);
    setTimeLeft(30);
    setShowHint(false);
    setGameCompleted(false);
    setCorrectAnswers(0);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'hard': return '#ef4444';
      default: return '#6b7280';
    }
  };

  if (gameCompleted) {
    return (
      <View style={styles.container}>
        <View style={styles.completedContainer}>
          <Trophy size={64} color="#f59e0b" />
          <Text style={styles.completedTitle}>Game Completed!</Text>
          <Text style={styles.completedScore}>Final Score: {score} XP</Text>
          <Text style={styles.completedStats}>
            {correctAnswers} out of {mockQuestions.length} correct
          </Text>
          
          <View style={styles.completedActions}>
            <TouchableOpacity style={styles.playAgainButton} onPress={handlePlayAgain}>
              <RotateCcw size={20} color="#ffffff" />
              <Text style={styles.playAgainText}>Play Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  const question = mockQuestions[currentQuestion];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.questionInfo}>
          <Text style={styles.questionCount}>
            Question {currentQuestion + 1} of {mockQuestions.length}
          </Text>
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(question.difficulty) }]}>
            <Text style={styles.difficultyText}>{question.difficulty}</Text>
          </View>
        </View>
        <Text style={styles.subject}>{question.subject}</Text>
      </View>

      <View style={styles.timerContainer}>
        <Clock size={20} color="#ef4444" />
        <Text style={styles.timer}>{timeLeft}s</Text>
        <View style={styles.timerBar}>
          <View style={[styles.timerProgress, { width: `${(timeLeft / 30) * 100}%` }]} />
        </View>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{question.question}</Text>
        
        {showHint && (
          <View style={styles.hintContainer}>
            <Lightbulb size={16} color="#f59e0b" />
            <Text style={styles.hintText}>{question.hint}</Text>
          </View>
        )}
      </View>

      <View style={styles.optionsContainer}>
        {question.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedAnswer === index && styles.selectedOption,
              showAnswer && index === question.correctAnswer && styles.correctOption,
              showAnswer && selectedAnswer === index && index !== question.correctAnswer && styles.wrongOption,
            ]}
            onPress={() => handleAnswerSelect(index)}
            disabled={showAnswer}
          >
            <Text style={[
              styles.optionText,
              selectedAnswer === index && styles.selectedOptionText,
              showAnswer && index === question.correctAnswer && styles.correctOptionText,
              showAnswer && selectedAnswer === index && index !== question.correctAnswer && styles.wrongOptionText,
            ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.actionsContainer}>
        {!showAnswer && (
          <TouchableOpacity 
            style={styles.hintButton} 
            onPress={() => setShowHint(!showHint)}
          >
            <Lightbulb size={20} color="#f59e0b" />
            <Text style={styles.hintButtonText}>
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </Text>
          </TouchableOpacity>
        )}

        {showAnswer && (
          <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
            <Text style={styles.nextButtonText}>
              {currentQuestion < mockQuestions.length - 1 ? 'Next Question' : 'Finish'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.scoreContainer}>
        <Star size={20} color="#f59e0b" />
        <Text style={styles.scoreText}>Score: {score} XP</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  questionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  questionCount: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '600',
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  subject: {
    fontSize: 16,
    color: '#0ea5e9',
    fontWeight: 'bold',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  timer: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ef4444',
    marginLeft: 8,
    marginRight: 16,
  },
  timerBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#f3f4f6',
    borderRadius: 3,
    overflow: 'hidden',
  },
  timerProgress: {
    height: '100%',
    backgroundColor: '#ef4444',
    borderRadius: 3,
  },
  questionContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e3a8a',
    lineHeight: 26,
  },
  hintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    borderRadius: 10,
    padding: 12,
    marginTop: 16,
  },
  hintText: {
    fontSize: 14,
    color: '#f59e0b',
    fontWeight: '600',
    marginLeft: 8,
    flex: 1,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedOption: {
    borderColor: '#0ea5e9',
    backgroundColor: '#eff6ff',
  },
  correctOption: {
    borderColor: '#10b981',
    backgroundColor: '#ecfdf5',
  },
  wrongOption: {
    borderColor: '#ef4444',
    backgroundColor: '#fef2f2',
  },
  optionText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '600',
  },
  selectedOptionText: {
    color: '#0ea5e9',
  },
  correctOptionText: {
    color: '#10b981',
  },
  wrongOptionText: {
    color: '#ef4444',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  hintButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#f59e0b',
  },
  hintButtonText: {
    fontSize: 14,
    color: '#f59e0b',
    fontWeight: '600',
    marginLeft: 8,
  },
  nextButton: {
    backgroundColor: '#0ea5e9',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    shadowColor: '#0ea5e9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  nextButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  scoreText: {
    fontSize: 18,
    color: '#1e3a8a',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  completedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  completedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginTop: 20,
    marginBottom: 16,
  },
  completedScore: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0ea5e9',
    marginBottom: 8,
  },
  completedStats: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 32,
  },
  completedActions: {
    width: '100%',
  },
  playAgainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0ea5e9',
    paddingVertical: 16,
    borderRadius: 25,
    shadowColor: '#0ea5e9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  playAgainText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});