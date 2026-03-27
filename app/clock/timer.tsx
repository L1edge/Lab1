import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';

const ITEM_HEIGHT = 45; // Висота одного рядка цифри (дуже важливо для магніту)

// Генеруємо масиви для барабанів (0-23, 0-59, 0-59)
const generateRange = (max: number) => Array.from({ length: max + 1 }, (_, i) => i);
const hoursData = generateRange(23);
const minutesData = generateRange(59);
const secondsData = generateRange(59);

export default function TimerScreen() {
  const [selectedHours, setSelectedHours] = useState(0);
  const [selectedMinutes, setSelectedMinutes] = useState(1);
  const [selectedSeconds, setSelectedSeconds] = useState(0);

  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false); // Час вийшов
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const toggleTimer = () => {
    if (!isRunning) {
      if (timeLeft === 0) {
        // Збираємо час з барабанів!
        const totalSeconds = selectedHours * 3600 + selectedMinutes * 60 + selectedSeconds;
        if (totalSeconds > 0) {
          setTimeLeft(totalSeconds);
          setIsRunning(true);
        }
      } else {
        setIsRunning(true); // Продовжуємо після паузи
      }
    } else {
      setIsRunning(false); // Пауза
    }
  };
  
  const cancelTimer = () => {
    setIsRunning(false);
    setTimeLeft(0);
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // НАДІЙНИЙ КОМПОНЕНТ БАРАБАНУ
  const ScrollPicker = ({ data, selectedValue, onValueChange, label }: any) => {
    return (
      <View style={styles.pickerColumn}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.toString()}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT} // МАГНІТ
          decelerationRate="fast"
          contentContainerStyle={{ paddingVertical: ITEM_HEIGHT * 2 }} 
          getItemLayout={(_, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index })}
          scrollEventThrottle={16}
          onScroll={(e) => {
            // Визначаємо, яка цифра зараз по центру, і зберігаємо її
            const index = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);
            if (data[index] !== undefined && data[index] !== selectedValue) {
              onValueChange(data[index]);
            }
          }}
          renderItem={({ item }) => {
            const isSelected = item === selectedValue;
            return (
              <View style={styles.pickerItem}>
                <Text style={isSelected ? styles.pickerActive : styles.pickerMuted}>
                  {item} {isSelected && <Text style={styles.pickerLabel}>{label}</Text>}
                </Text>
              </View>
            );
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {isRunning || timeLeft > 0 ? (
        <View style={styles.activeTimerContainer}>
          <Text style={styles.activeTimerText}>{formatTime(timeLeft)}</Text>
        </View>
      ) : (
        <View style={styles.pickerContainer}>
          <View style={styles.pickerHighlight} />
          <ScrollPicker data={hoursData} selectedValue={selectedHours} onValueChange={setSelectedHours} label="hours" />
          <ScrollPicker data={minutesData} selectedValue={selectedMinutes} onValueChange={setSelectedMinutes} label="min" />
          <ScrollPicker data={secondsData} selectedValue={selectedSeconds} onValueChange={setSelectedSeconds} label="sec" />
        </View>
      )}

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={cancelTimer}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, isRunning ? styles.pauseButton : styles.startButton]} onPress={toggleTimer}>
          <Text style={isRunning ? styles.pauseButtonText : styles.startButtonText}>{isRunning ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingText}>When Timer Ends</Text>
        <Text style={styles.settingValue}>Radar {'>'}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', alignItems: 'center' },
  pickerContainer: { flexDirection: 'row', width: '100%', height: ITEM_HEIGHT * 5, marginTop: 50, position: 'relative' },
  pickerColumn: { flex: 1, zIndex: 1 },
  pickerItem: { height: ITEM_HEIGHT, justifyContent: 'center', alignItems: 'center' },
  pickerActive: { color: '#FFF', fontSize: 24, fontWeight: '500' },
  pickerMuted: { color: '#444', fontSize: 22 },
  pickerLabel: { fontSize: 16, fontWeight: 'normal' },
  pickerHighlight: { position: 'absolute', top: ITEM_HEIGHT * 2, width: '90%', left: '5%', height: ITEM_HEIGHT, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 8, zIndex: 0 },
  activeTimerContainer: { height: ITEM_HEIGHT * 5, justifyContent: 'center', alignItems: 'center', marginTop: 50 },
  activeTimerText: { color: '#FFF', fontSize: 80, fontWeight: '200', fontVariant: ['tabular-nums'] },
  buttonsContainer: { flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingHorizontal: 30, marginTop: 50 },
  button: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', borderWidth: 2 },
  cancelButton: { backgroundColor: '#1C1C1E', borderColor: '#333' },
  cancelButtonText: { color: '#8E8E93', fontSize: 16 },
  startButton: { backgroundColor: 'rgba(52, 199, 89, 0.2)', borderColor: '#34C759' },
  startButtonText: { color: '#34C759', fontSize: 16 },
  pauseButton: { backgroundColor: 'rgba(255, 149, 0, 0.2)', borderColor: '#FF9500' },
  pauseButtonText: { color: '#FF9500', fontSize: 16 },
  settingRow: { width: '90%', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#1C1C1E', padding: 15, borderRadius: 10, marginTop: 40 },
  settingText: { color: '#FFF', fontSize: 16 },
  settingValue: { color: '#8E8E93', fontSize: 16 },
});