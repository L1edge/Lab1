import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// База міст для додавання
const AVAILABLE_CITIES = [
  { id: '10', name: 'Tokyo', timezone: 'Asia/Tokyo', offsetText: 'Today, +7HRS' },
  { id: '11', name: 'Paris', timezone: 'Europe/Paris', offsetText: 'Today, -1HRS' },
  { id: '12', name: 'Sydney', timezone: 'Australia/Sydney', offsetText: 'Tomorrow, +9HRS' },
];

export default function WorldClockScreen() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isEditing, setIsEditing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  
  const [cities, setCities] = useState([
    { id: '1', name: 'Kyiv', timezone: 'Europe/Kyiv', offsetText: 'Today, +0HRS' },
    { id: '4', name: 'London', timezone: 'Europe/London', offsetText: 'Today, -2HRS' },
  ]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getCityTime = (timezone: string) => {
    return new Intl.DateTimeFormat('en-GB', { timeZone: timezone, hour: '2-digit', minute: '2-digit', hour12: false }).format(currentTime);
  };

  const deleteCity = (id: string) => setCities(cities.filter(c => c.id !== id));
  const addCity = (city: any) => {
    if (!cities.find(c => c.id === city.id)) setCities([...cities, city]);
    setShowAddModal(false);
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

      <Text style={styles.mainTitle}>World Clock</Text>

      <ScrollView style={styles.list}>
        {cities.map((city) => (
          <View key={city.id} style={styles.cityRow}>
            {isEditing && (
              <TouchableOpacity onPress={() => deleteCity(city.id)} style={styles.deleteBtn}>
                <Ionicons name="remove-circle" size={24} color="#FF3B30" />
              </TouchableOpacity>
            )}
            <View style={{ flex: 1 }}>
              <Text style={styles.offsetText}>{city.offsetText}</Text>
              <Text style={styles.cityName}>{city.name}</Text>
            </View>
            {!isEditing && <Text style={styles.timeText}>{getCityTime(city.timezone)}</Text>}
          </View>
        ))}
      </ScrollView>

      {/* Модальне вікно для додавання міста */}
      <Modal visible={showAddModal} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Choose a City</Text>
            <TouchableOpacity onPress={() => setShowAddModal(false)}>
              <Text style={styles.headerButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={AVAILABLE_CITIES}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.modalItem} onPress={() => addCity(item)}>
                <Text style={styles.modalItemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
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
  cityRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 15, borderBottomWidth: 0.5, borderBottomColor: '#333' },
  deleteBtn: { marginRight: 15 },
  offsetText: { color: '#8E8E93', fontSize: 14, marginBottom: 4 },
  cityName: { color: '#FFF', fontSize: 24 },
  timeText: { color: '#FFF', fontSize: 50, fontWeight: '300' },
  
  modalContainer: { flex: 1, backgroundColor: '#1C1C1E', paddingTop: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderBottomWidth: 0.5, borderBottomColor: '#333' },
  modalTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  modalItem: { padding: 20, borderBottomWidth: 0.5, borderBottomColor: '#333' },
  modalItemText: { color: '#FFF', fontSize: 18 },
});