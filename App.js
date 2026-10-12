import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ActivityIndicator, Text, View, Platform, StatusBar } from 'react-native';
import HomeFlatList from './components/HomeFlatList';
import { getWords } from './services/words';

export default function App() {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWords()
      .then((data) => {
        setWords(data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FE6B00" />
        <Text style={{ marginTop: 10, color: '#44474D', fontWeight: '600' }}>Cargando diccionario...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <HomeFlatList words={words} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F7F9FB',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingBottom: Platform.OS === 'android' ? 20 : 0 // Esto levanta el contenido para que la barra inferior de gestos no lo tape
  },
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#F7F9FB'
  },
});