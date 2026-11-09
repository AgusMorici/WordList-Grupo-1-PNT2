import { FlatList, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Word from '../Word';

function ProgressHeader({ gameStats = [] }) {
    const { width } = useWindowDimensions();

    const totalCorrectas = gameStats.reduce((acc, item) => acc + (item.correctas || 0), 0);
    const totalIncorrectas = gameStats.reduce((acc, item) => acc + (item.incorrectas || 0), 0);
    const totalIntentos = totalCorrectas + totalIncorrectas;
    const porcentaje = totalIntentos > 0 ? Math.round((totalCorrectas / totalIntentos) * 100) : 0;

    let mensaje = 'Todavía no practicaste · ¡Tocá para ir al juego!';
    let barColor = '#94A3B8';
    let iconName = 'school';

    if (totalIntentos > 0) {
        if (porcentaje >= 80) {
            mensaje = '¡Vas muy bien! Excelente dominio del vocabulario 🔥';
            barColor = '#16A34A';
            iconName = 'emoji-events';
        } else if (porcentaje >= 50) {
            mensaje = 'Buen ritmo · Seguí practicando para afianzar 💪';
            barColor = '#FE6B00';
            iconName = 'trending-up';
        } else {
            mensaje = 'Te falta practicar un poco más · ¡No aflojes! 📚';
            barColor = '#DC2626';
            iconName = 'fitness-center';
        }
    }

    return (
        <Pressable
            style={[styles.card, { width: width - 32 }]}
            onPress={() => router.push('/game')}
        >
            <View style={styles.topRow}>
                <View style={styles.titleRow}>
                    <View style={[styles.iconWrap, { backgroundColor: `${barColor}18` }]}>
                        <MaterialIcons name={iconName} size={20} color={barColor} />
                    </View>
                    <View>
                        <Text style={styles.title}>Tu progreso en el juego</Text>
                        <Text style={styles.subtitle}>
                            {totalIntentos > 0
                                ? `${totalCorrectas} aciertos de ${totalIntentos} intentos`
                                : 'Sin intentos registrados'}
                        </Text>
                    </View>
                </View>
                <Text style={[styles.percentage, { color: barColor }]}>{porcentaje}%</Text>
            </View>

            <View style={styles.track}>
                <View
                    style={[
                        styles.fill,
                        {
                            width: `${porcentaje}%`,
                            backgroundColor: barColor,
                        },
                    ]}
                />
            </View>

            <Text style={styles.message}>{mensaje}</Text>
        </Pressable>
    );
}

const HomeFlatList = ({ words, gameStats = [] }) => {
    return (
        <FlatList
            data={words}
            ListHeaderComponent={<ProgressHeader gameStats={gameStats} />}
            renderItem={({ item }) => <Word word={item} />}
            keyExtractor={(item) => String(item.id ?? item._id)}
        />
    );
};

const styles = StyleSheet.create({
    card: {
        alignSelf: 'center',
        marginTop: 12,
        marginBottom: 16,
        padding: 16,
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        shadowColor: '#0F1E36',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.06,
        shadowRadius: 16,
        elevation: 3,
        gap: 10,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        flex: 1,
    },
    iconWrap: {
        width: 38,
        height: 38,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 15,
        fontWeight: '700',
        color: '#000412',
    },
    subtitle: {
        fontSize: 11,
        fontWeight: '600',
        color: '#75777E',
    },
    percentage: {
        fontSize: 22,
        fontWeight: '800',
    },
    track: {
        height: 10,
        width: '100%',
        backgroundColor: '#F2F4F6',
        borderRadius: 999,
        overflow: 'hidden',
    },
    fill: {
        height: '100%',
        borderRadius: 999,
    },
    message: {
        fontSize: 12,
        fontWeight: '600',
        color: '#44474D',
    },
});

export default HomeFlatList;
