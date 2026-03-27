import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity, SafeAreaView, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ITEM_HEIGHT = 45;
const hoursData = Array.from({ length: 24 }, (_, i) => i);
const minutesData = Array.from({ length: 60 }, (_, i) => i);

export default function AlarmScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [alarms, setAlarms] = useState([
    { id: '1', time: '06:40', label: 'Tomorrow Morning', isActive: true },
    { id: '2', time: '00:30', label: 'Alarm', isActive: false },
  ]);

  // Стани для нового будильника
  const [showAddModal, setShowAddModal] = useState(false);
  const [newHour, setNewHour] = useState(7);
  const [newMinute, setNewMinute] = useState(0);

  const toggleAlarm = (id: string) => setAlarms(alarms.map(a => a.id === id ? { ...a, isActive: !a.isActive } : a));
  const deleteAlarm = (id: string) => setAlarms(alarms.filter(a => a.id !== id));
  
  const saveNewAlarm = () => {
    const formattedTime = `${newHour.toString().padStart(2, '0')}:${newMinute.toString().padStart(2, '0')}`;
    setAlarms([...alarms, { id: Date.now().toString(), time: formattedTime, label: 'Alarm', isActive: true }]);
    setShowAddModal(false);
  };

  const ScrollPicker = ({ data, selectedValue, onValueChange, label }: any) => {
    return (
      <View style={styles.pickerColumn}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.toString()}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          contentContainerStyle={{ paddingVertical: ITEM_HEIGHT * 2 }} 
          getItemLayout={(_, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index })}
          scrollEventThrottle={16}
          onScroll={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);
            if (data[index] !== undefined && data[index] !== selectedValue) onValueChange(data[index]);
          }}
          renderItem={({ item }) => {
            const isSelected = item === selectedValue;
            return (
              <View style={styles.pickerItem}>
                <Text style={isSelected ? styles.pickerActive : styles.pickerMuted}>
                  {item.toString().padStart(2, '0')} {isSelected && <Text style={styles.pickerLabel}>{label}</Text>}
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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          <Text style={styles.headerButton}>{isEditing ? 'Done' : 'Edit'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowAddModal(true)}>
          <Text style={styles.headerButtonPlus}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.mainTitle}>Alarm</Text>

      <ScrollView style={styles.list}>
        {alarms.map((alarm) => (
          <View key={alarm.id} style={styles.alarmRow}>
            {isEditing && (
              <TouchableOpacity onPress={() => deleteAlarm(alarm.id)} style={{ marginRight: 15 }}>
                <Ionicons name="remove-circle" size={24} color="#FF3B30" />
              </TouchableOpacity>
            )}
            <View style={{ flex: 1 }}>
              <Text style={[styles.timeText, !alarm.isActive && styles.disabledText]}>{alarm.time}</Text>
              <Text style={styles.labelText}>{alarm.label}</Text>
            </View>
            {!isEditing && (
              <Switch value={alarm.isActive} onValueChange={() => toggleAlarm(alarm.id)} trackColor={{ false: '#333', true: '#34C759' }} />
            )}
          </View>
        ))}
      </ScrollView>

      {/* МОДАЛКА ВИБОРУ ЧАСУ ДЛЯ НОВОГО БУДИЛЬНИКА */}
      <Modal visible={showAddModal} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowAddModal(false)}><Text style={styles.headerButton}>Cancel</Text></TouchableOpacity>
            <Text style={styles.modalTitle}>Add Alarm</Text>
            <TouchableOpacity onPress={saveNewAlarm}><Text style={[styles.headerButton, { fontWeight: 'bold' }]}>Save</Text></TouchableOpacity>
          </View>
          
          <View style={styles.pickerContainer}>
            <View style={styles.pickerHighlight} />
            <ScrollPicker data={hoursData} selectedValue={newHour} onValueChange={setNewHour} label="h" />
            <ScrollPicker data={minutesData} selectedValue={newMinute} onValueChange={setNewMinute} label="m" />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, paddingTop: 10, paddingBottom: 5 },
  headerButton: { color: '#FF9500', fontSize: 18 },
  headerButtonPlus: { color: '#FF9500', fontSize: 28, lineHeight: 28 },
  mainTitle: { color: '#FFF', fontSize: 34, fontWeight: 'bold', paddingHorizontal: 15, paddingBottom: 15, borderBottomWidth: 0.5, borderBottomColor: '#333' },
  list: { flex: 1 },
  alarmRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 15, borderBottomWidth: 0.5, borderBottomColor: '#333' },
  timeText: { color: '#FFF', fontSize: 50, fontWeight: '300' },
  disabledText: { color: '#8E8E93' },
  labelText: { color: '#8E8E93', fontSize: 14 },

  modalContainer: { flex: 1, backgroundColor: '#1C1C1E' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderBottomWidth: 0.5, borderBottomColor: '#333', paddingTop: 20 },
  modalTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  
  pickerContainer: { flexDirection: 'row', width: '100%', height: ITEM_HEIGHT * 5, marginTop: 50, position: 'relative' },
  pickerColumn: { flex: 1, zIndex: 1 },
  pickerItem: { height: ITEM_HEIGHT, justifyContent: 'center', alignItems: 'center' },
  pickerActive: { color: '#FFF', fontSize: 28, fontWeight: '500' },
  pickerMuted: { color: '#444', fontSize: 24 },
  pickerLabel: { fontSize: 18, fontWeight: 'normal' },
  pickerHighlight: { position: 'absolute', top: ITEM_HEIGHT * 2, width: '90%', left: '5%', height: ITEM_HEIGHT, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 8, zIndex: 0 },
});