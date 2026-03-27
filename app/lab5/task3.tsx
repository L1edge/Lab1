import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function Task3Screen() {
  return (
    <View style={styles.screen}>
      {/* Контейнер зафарбований в Group Table View Background Color [cite: 276] */}
      <View style={styles.container}>
        <Text style={styles.label}>Text Label</Text>
        {/* Поля вводу зробити неактивними [cite: 276] */}
        <TextInput 
          style={styles.input} 
          placeholder="Some placeholder text" // [cite: 283]
          editable={false} 
        />

        <Text style={styles.label}>Another Text Label</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Another placeholder text" // [cite: 285]
          editable={false} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    backgroundColor: '#F2F2F7', // Системний колір фону груп [cite: 276]
    margin: 8, // Відступи з усіх боків по 8pt [cite: 276]
    padding: 16,
    borderRadius: 8,
  },
  label: {
    fontSize: 17,
    marginBottom: 8,
    color: '#000',
  },
  input: {
    backgroundColor: '#fff',
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    color: '#a0a0a0', // Візуально неактивний текст
  }
});