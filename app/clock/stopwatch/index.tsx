import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

export default function StopwatchScreen() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => setTime((prev) => prev + 10), 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartStop = () => {
    if (isRunning) {
      // Зупинка: записуємо час в історію
      setLaps([...laps, formatTime(time)]);
    }
    setIsRunning(!isRunning);
  };

  const handleLapNav = () => {
    // Перехід на новий екран (UINavigationController) з передачею історії
    router.push({ pathname: '/clock/stopwatch/laps', params: { history: JSON.stringify(laps) } } as any);
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')},${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{formatTime(time)}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, styles.lapButton]} onPress={handleLapNav}>
          <Text style={styles.lapButtonText}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, isRunning ? styles.stopButton : styles.startButton]} 
          onPress={handleStartStop}
        >
          <Text style={isRunning ? styles.stopButtonText : styles.startButtonText}>
            {isRunning ? 'Stop' : 'Start'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', alignItems: 'center' },
  timeContainer: { flex: 0.6, justifyContent: 'center' },
  timeText: { color: '#FFF', fontSize: 75, fontWeight: '200', fontVariant: ['tabular-nums'] },
  buttonsContainer: { flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingHorizontal: 30 },
  button: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', borderWidth: 2 },
  lapButton: { backgroundColor: '#1C1C1E', borderColor: '#333' },
  lapButtonText: { color: '#FFF', fontSize: 16 },
  startButton: { backgroundColor: 'rgba(52, 199, 89, 0.2)', borderColor: '#34C759' },
  startButtonText: { color: '#34C759', fontSize: 16 },
  stopButton: { backgroundColor: 'rgba(255, 59, 48, 0.2)', borderColor: '#FF3B30' },
  stopButtonText: { color: '#FF3B30', fontSize: 16 },
});