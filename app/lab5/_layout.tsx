import { Stack } from 'expo-router';

export default function Lab5Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: 'rgba(90, 70, 147, 1)' }, // Колір Navigation Bar [cite: 250]
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Autolayout' }} />
      <Stack.Screen name="task2" options={{ title: 'Task 2' }} />
      <Stack.Screen name="task3" options={{ title: 'Task 3' }} />
    </Stack>
  );
}