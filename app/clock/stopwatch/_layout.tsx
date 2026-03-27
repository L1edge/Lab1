import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Стандартні іконки Expo

export default function ClockLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#000', borderTopColor: '#333' },
        tabBarActiveTintColor: '#FF9500', 
        tabBarInactiveTintColor: '#8E8E93',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'World Clock',
          tabBarIcon: ({ color }) => <Ionicons name="globe-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="alarm"
        options={{
          title: 'Alarm',
          tabBarIcon: ({ color }) => <Ionicons name="alarm-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="stopwatch"
        options={{
          title: 'Stopwatch',
          headerShown: false, 
          tabBarIcon: ({ color }) => <Ionicons name="stopwatch-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="timer"
        options={{
          title: 'Timer',
          tabBarIcon: ({ color }) => <Ionicons name="timer-outline" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}