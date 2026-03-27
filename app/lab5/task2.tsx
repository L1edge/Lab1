import { View, Text, Image, StyleSheet } from 'react-native';

export default function Task2Screen() {
  return (
    <View style={styles.container}>
      {/* Картинка зі збереженням співвідношення [cite: 264] */}
      <Image 
        source={{ uri: 'https://http.cat/200' }} 
        style={styles.image} 
        resizeMode="contain" 
      />
      
      {/* Текст розміщується по центру області що залишилась [cite: 264] */}
      <View style={styles.textContainer}>
        <Text style={styles.label}>This cat is so cute</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 8, // 8pt відступи [cite: 269, 270, 271]
  },
  image: {
    width: '100%',
    height: 250, // Зберігає пропорції через resizeMode="contain"
  },
  textContainer: {
    flex: 1, // Займає всю область, що залишилась
    justifyContent: 'center', // Центрування [cite: 264]
    alignItems: 'center',
  },
  label: {
    fontSize: 17, // Font: System 17pt [cite: 272]
    color: '#000',
  }
});