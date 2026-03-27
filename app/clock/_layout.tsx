import { Tabs } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol'; // Використовуємо твій робочий компонент

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
          // SF Symbol: globe
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="globe" color={color} />,
        }}
      />
      <Tabs.Screen
        name="alarm"
        options={{
          title: 'Alarm',
          // SF Symbol: alarm
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="alarm" color={color} />,
        }}
      />
      <Tabs.Screen
        name="stopwatch"
        options={{
          title: 'Stopwatch',
          headerShown: false, 
          // SF Symbol: stopwatch
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="stopwatch" color={color} />,
        }}
      />
      <Tabs.Screen
        name="timer"
        options={{
          title: 'Timer',
          // SF Symbol: timer
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="timer" color={color} />,
        }}
      />
    </Tabs>
  );
}