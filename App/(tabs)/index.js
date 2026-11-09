import { SafeAreaView, StyleSheet } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { getWords, getUserGameStats } from '../../services/words';
import HomeFlatList from '../../components/HomeFlatList';

const Index = () => {
  const [words, setWords] = useState([]);
  const [gameStats, setGameStats] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getWords()
        .then(words => {
          // console.log('words', words);
          setWords(words);
        })
        .catch(error => console.error('Error fetching words:', error));

      getUserGameStats()
        .then(stats => setGameStats(stats))
        .catch(error => console.error('Error fetching stats:', error));
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <HomeFlatList words={words} gameStats={gameStats} />
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});