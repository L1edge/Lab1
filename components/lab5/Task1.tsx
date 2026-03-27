import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';

export default function Task1() {
  // Стан для зміни картинки та тексту по натисненню 
  const [isHappy, setIsHappy] = useState(false);
  
  // Отримуємо розміри екрану для визначення орієнтації 
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height; // Якщо ширина більша за висоту - це Landscape [cite: 201]

  const toggleMood = () => setIsHappy(!isHappy);

  return (
    <View style={styles.container}>
      {/* Картинка */}
      <Image 
        source={{ uri: isHappy 
            ? 'https://http.cat/200' // Заглушка для Happy cat
            : 'https://http.cat/404' // Заглушка для Grumpy cat [cite: 225]
        }} 
        style={styles.image} 
        resizeMode="contain"
      />

      {/* Текстове поле Label  */}
      <Text style={styles.label}>
        {isHappy ? "I'm happy cat" : "I'm grumpy cat"}
      </Text>

      {/* Кнопка зникає в Landscape орієнтації  */}
      {!isLandscape && (
        <TouchableOpacity style={styles.button} onPress={toggleMood}>
          <Text style={styles.buttonText}>
            {isHappy ? "Make cat sad!" : "Let cat smile!"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 250,
    marginBottom: 20,
  },
  label: {
    color: 'rgb(45, 68, 115)', // Text color: RGB(45;68;115) [cite: 229]
    fontSize: 20, // Font: System 20 pt [cite: 233]
    marginBottom: 20,
  },
  button: {
    borderWidth: 1, // Border 1 pt [cite: 236]
    borderColor: 'rgb(45, 68, 115)',
    borderRadius: 8, // Corner radius 8pt [cite: 236]
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'rgb(45, 68, 115)',
    fontSize: 20, // 20 pt [cite: 230]
  }
});