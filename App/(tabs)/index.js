import { SafeAreaView, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { getWords } from '../../services/words';
import HomeFlatList from '../../components/HomeFlatList';

const Index = () => {
  const [words, setWords] = useState([]);

  useEffect(() => {
    getWords().then(words => {
      // console.log('words', words);
      setWords(words);
    }).catch(error => console.error('Error fetching words:', error));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <HomeFlatList words={words} />
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