import { useState, useEffect } from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const colors = {
    card: '#FFFFFF',
    primary: '#000412',
    onSurface: '#191C1E',
    onSurfaceVariant: '#44474D',
    surfaceLow: '#F2F4F6',
    hero: '#F6F7F9',
    footer: '#F7F8FA',
    orange: '#FE6B00',
    onOrange: '#FFFFFF',
    outline: '#75777E',
    badge: '#0F1E36',
    white: '#FFFFFF',
};

const Word = ({ word }) => {
    const { width } = useWindowDimensions();
    const [favorito, setFavorito] = useState(Boolean(word.favorite));

    useEffect(() => {
        console.log('Word renderizada', word.id);
        return () => {
            console.log('Word desmontada', word.id);
        };
    }, []);

    const handlePlayAudio = () => {
        console.log(`Reproduciendo audio para: ${word.word}`);
        // Acá luego integrarás Expo Audio SDK
    };

    const handleOpenDetail = () => {
    router.push({ pathname: '/palabra', params: { id: word.id } });
};

    return (
        <View style={[styles.shadow, { width: width - 32 }]}>
            <View style={styles.card}>
                <View style={styles.header}>
                    <Pressable style={styles.identity} onPress={handleOpenDetail}>
                        <View style={styles.brandRow}>
                            <Text style={styles.brand}>{word.category}</Text>
                        </View>
                        <Text style={styles.model} numberOfLines={2}>
                            {word.word}
                        </Text>
                    </Pressable>
                    
                    {/* Botón de favorito idéntico al del profe */}
                    <Pressable
                        style={({ pressed }) => [styles.fav, pressed && styles.favPressed]}
                        onPress={() => setFavorito((current) => !current)}
                        accessibilityRole="button"
                    >
                        <MaterialIcons
                            name={favorito ? 'favorite' : 'favorite-border'}
                            size={20}
                            color={favorito ? colors.orange : colors.onSurfaceVariant}
                        />
                    </Pressable>
                </View>

                {/* Sección central: Traducción y Definición / Ejemplo */}
                <Pressable style={styles.hero} onPress={handleOpenDetail}>
                    <Text style={styles.translation}>{word.translation}</Text>
                    <Text style={styles.definition} numberOfLines={3}>
                        "{word.definition}"
                    </Text>
                </Pressable>

                {/* Footer con el botón para escuchar la palabra (equivalente al botón de rentar) */}
                <View style={styles.footer}>
                    <View style={styles.priceBlock}>
                        <Text style={styles.perDay}>Práctica auditiva</Text>
                    </View>
                    <Pressable
                        style={({ pressed }) => [
                            styles.rent,
                            pressed && styles.rentPressed,
                        ]}
                        onPress={handlePlayAudio}
                        accessibilityRole="button"
                    >
                        <Text style={styles.rentText}>Escuchar</Text>
                        <MaterialIcons name="volume-up" size={18} color={colors.onOrange} />
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    shadow: {
        alignSelf: 'center',
        marginBottom: 16,
        borderRadius: 16,
        backgroundColor: colors.card,
        shadowColor: '#0F1E36',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.06,
        shadowRadius: 24,
        elevation: 3,
    },
    card: {
        backgroundColor: colors.card,
        borderRadius: 16,
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 12,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    identity: {
        flex: 1,
    },
    brandRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 2,
    },
    brand: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '700',
        letterSpacing: 0.8,
        textTransform: 'uppercase',
        color: colors.onSurfaceVariant,
    },
    model: {
        fontSize: 22,
        lineHeight: 28,
        fontWeight: '600',
        letterSpacing: -0.2,
        color: colors.primary,
    },
    hero: {
        minHeight: 110,
        marginTop: 12,
        marginHorizontal: 16,
        padding: 16,
        backgroundColor: colors.hero,
        borderRadius: 12,
        justifyContent: 'center',
    },
    translation: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.orange,
        marginBottom: 6,
    },
    definition: {
        fontSize: 14,
        lineHeight: 20,
        color: colors.onSurfaceVariant,
        fontStyle: 'italic',
    },
    fav: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        shadowColor: '#0F1E36',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    favPressed: {
        transform: [{ scale: 0.9 }],
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginTop: 8,
        backgroundColor: colors.footer,
    },
    priceBlock: {
        flexShrink: 1,
    },
    perDay: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '600',
        color: colors.onSurfaceVariant,
    },
    rent: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 20,
        borderRadius: 12,
        backgroundColor: colors.orange,
        shadowColor: '#FE6B00',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 14,
        elevation: 4,
    },
    rentPressed: {
        transform: [{ scale: 0.95 }],
    },
    rentText: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '600',
        letterSpacing: 0.1,
        color: colors.onOrange,
    },
});

export default Word;