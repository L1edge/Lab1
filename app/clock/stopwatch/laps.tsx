import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function LapsScreen() {
  const { history } = useLocalSearchParams();
  const lapsArray = history ? JSON.parse(history as string) : [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>History of Stops</Text>
      <ScrollView>
        {lapsArray.map((lapTime: string, index: number) => (
          <View key={index} style={styles.lapRow}>
            <Text style={styles.lapText}>Stop #{index + 1}</Text>
            <Text style={styles.lapText}>{lapTime}</Text>
          </View>
        ))}
        {lapsArray.length === 0 && <Text style={styles.emptyText}>No history yet. Press Start and Stop.</Text>}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  title: { color: '#FFF', fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  lapRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 0.5, borderBottomColor: '#333' },
  lapText: { color: '#FFF', fontSize: 18 },
  emptyText: { color: '#8E8E93', textAlign: 'center', marginTop: 50 },
});