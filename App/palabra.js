import { useState, useEffect } from 'react';
import { ScrollView, View, Text, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { getWordById } from '../services/words';

const colors = {
    background: '#F7F9FB',
    card: '#FFFFFF',
    primary: '#000412',
    onSurfaceVariant: '#44474D',
    hero: '#F6F7F9',
    orange: '#FE6B00',
    outline: '#75777E',
};

const Palabra = () => {
    const { id } = useLocalSearchParams();
    const [palabra, setPalabra] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favorito, setFavorito] = useState(false);

    useEffect(() => {
        getWordById(id)
            .then((data) => {
                setPalabra(data);
                setFavorito(Boolean(data.favorite));
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);

    const handlePlayAudio = () => {
        console.log(`Reproduciendo audio para: ${palabra.word}`);
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={colors.orange} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <MaterialIcons name="error-outline" size={40} color={colors.outline} />
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Stack.Screen options={{ title: palabra.word }} />

            <View style={styles.header}>
                <View style={styles.identity}>
                    <Text style={styles.category}>{palabra.category}</Text>
                    <Text style={styles.word}>{palabra.word}</Text>
                </View>
                <Pressable
                    style={({ pressed }) => [styles.fav, pressed && styles.favPressed]}
                    onPress={() => setFavorito((current) => !current)}
                    accessibilityRole="button"
                >
                    <MaterialIcons
                        name={favorito ? 'favorite' : 'favorite-border'}
                        size={24}
                        color={favorito ? colors.orange : colors.onSurfaceVariant}
                    />
                </Pressable>
            </View>

            <View style={styles.box}>
                <Text style={styles.label}>Traducción</Text>
                <Text style={styles.translation}>{palabra.translation}</Text>
            </View>

            <View style={styles.box}>
                <Text style={styles.label}>Definición</Text>
                <Text style={styles.definition}>"{palabra.definition}"</Text>
            </View>

            <Pressable
                style={({ pressed }) => [styles.listen, pressed && styles.listenPressed]}
                onPress={handlePlayAudio}
                accessibilityRole="button"
            >
                <MaterialIcons name="volume-up" size={20} color="#FFFFFF" />
                <Text style={styles.listenText}>Escuchar pronunciación</Text>
            </Pressable>
        </ScrollView>
    );
};

export default Palabra;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    content: { padding: 24 },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    errorText: { marginTop: 10, color: colors.onSurfaceVariant, fontWeight: '600' },
    header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    identity: { flex: 1 },
    category: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 0.8,
        textTransform: 'uppercase',
        color: colors.onSurfaceVariant,
        marginBottom: 4,
    },
    word: { fontSize: 34, fontWeight: '700', color: colors.primary, letterSpacing: -0.3 },
    fav: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.card,
        elevation: 2,
        shadowColor: '#0F1E36',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
    },
    favPressed: { transform: [{ scale: 0.9 }] },
    box: {
        backgroundColor: colors.card,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
    },
    label: { fontSize: 12, fontWeight: '600', color: colors.outline, marginBottom: 6 },
    translation: { fontSize: 22, fontWeight: '700', color: colors.orange },
    definition: {
        fontSize: 16,
        lineHeight: 24,
        color: colors.onSurfaceVariant,
        fontStyle: 'italic',
    },
    listen: {
        marginTop: 12,
        height: 52,
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: colors.orange,
    },
    listenPressed: { transform: [{ scale: 0.97 }] },
    listenText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});