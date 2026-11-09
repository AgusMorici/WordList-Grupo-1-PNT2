import { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { getWordById } from '../../services/words';

const colors = {
    background: '#F7F9FB',
    card: '#FFFFFF',
    primary: '#000412',
    onSurface: '#191C1E',
    onSurfaceVariant: '#44474D',
    hero: '#F6F7F9',
    orange: '#FE6B00',
    outline: '#75777E',
};

const Palabra = () => {
    const { id } = useLocalSearchParams();
    const insets = useSafeAreaInsets();
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
            <View style={[styles.center, { paddingTop: insets.top }]}>
                <ActivityIndicator size="large" color={colors.orange} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.center, { paddingTop: insets.top }]}>
                <MaterialIcons name="error-outline" size={40} color={colors.outline} />
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={[styles.screen, { paddingTop: insets.top }]}>
            <View style={styles.topBar}>
                <View style={styles.topBarIdentity}>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => router.back()}
                        accessibilityRole="button"
                        accessibilityLabel="Volver"
                    >
                        <MaterialIcons name="arrow-back" size={24} color={colors.onSurface} />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.topBarTitle}>Detalle de Palabra</Text>
                        <Text style={styles.topBarSubtitle}>{palabra.category}</Text>
                    </View>
                </View>
            </View>

            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <View style={styles.identity}>
                        <Text style={styles.category}>{palabra.category}</Text>
                        <Text style={styles.word}>{palabra.word}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.fav}
                        onPress={() => setFavorito((current) => !current)}
                        accessibilityRole="button"
                    >
                        <MaterialIcons
                            name={favorito ? 'favorite' : 'favorite-border'}
                            size={24}
                            color={favorito ? colors.orange : colors.onSurfaceVariant}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.box}>
                    <Text style={styles.label}>Traducción</Text>
                    <Text style={styles.translation}>{palabra.translation}</Text>
                </View>

                <View style={styles.box}>
                    <Text style={styles.label}>Definición</Text>
                    <Text style={styles.definition}>"{palabra.definition}"</Text>
                </View>

                <TouchableOpacity
                    style={styles.listen}
                    onPress={handlePlayAudio}
                    accessibilityRole="button"
                >
                    <MaterialIcons name="volume-up" size={20} color="#FFFFFF" />
                    <Text style={styles.listenText}>Escuchar pronunciación</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default Palabra;

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    topBar: {
        minHeight: 64,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.card,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
        zIndex: 1,
    },
    topBarIdentity: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        flexShrink: 1,
    },
    iconButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    topBarTitle: {
        fontSize: 18,
        lineHeight: 24,
        fontWeight: '600',
        color: colors.primary,
    },
    topBarSubtitle: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '700',
        letterSpacing: 0.4,
        color: colors.onSurfaceVariant,
    },
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