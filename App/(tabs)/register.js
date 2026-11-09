import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WordRegister from '../../components/WordRegister';

export default function Register() {
    return (
        <SafeAreaView style={styles.screen} edges={['top']}>
            <WordRegister />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#F7F9FB',
    },
});

