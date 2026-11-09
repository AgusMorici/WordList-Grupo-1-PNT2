import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FavoritesList from '../../components/Favorites';

export default function Favorites() {
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <FavoritesList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7F9FB',
  },
});

