import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Lab5Screen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Label */}
      <Text style={styles.title}>This is task 1</Text>

      {/* Контейнер для кнопок */}
      <View style={styles.buttonsContainer}>
        {/* ВИПРАВЛЕННЯ: додано "as any" до шляху */}
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => router.push('/lab5/task2' as any)}
        >
          <Text style={styles.buttonText}>Task 2</Text>
        </TouchableOpacity>

        {/* ВИПРАВЛЕННЯ: додано "as any" до шляху */}
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => router.push('/lab5/task3' as any)}
        >
          <Text style={styles.buttonText}>Task 3</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(90, 70, 147, 0.5)', // BG color
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    color: '#fff',
    fontSize: 20, // Font: Avenir Medium 20pt
    fontFamily: 'Avenir', 
    marginBottom: 40,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // BG color контейнера
    width: 360, // 360pt
    maxWidth: '95%', // Адаптивність для менших екранів
    height: 140, // 140pt
    borderRadius: 8,
  },
  button: {
    backgroundColor: 'rgba(231, 64, 71, 1)', // Button BG color
    width: 90, // 90pt
    height: 40, // 40pt
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8, // Corner radius 8pt
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});