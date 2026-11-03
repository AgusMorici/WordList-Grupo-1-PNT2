import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getWords } from '../../services/words';

const colors = {
    surface: '#F7F9FB',
    white: '#FFFFFF',
    primary: '#000412',
    onSurface: '#191C1E',
    onSurfaceVariant: '#44474D',
    surfaceLow: '#F2F4F6',
    secondaryContainer: '#FE6B00',
    onSecondary: '#FFFFFF',
    success: '#16A34A',
    error: '#DC2626',
};

function GameHeader({ puntaje, total }) {
    return (
        <View style={styles.header}>
            <View style={styles.headerIdentity}>
                <View style={styles.iconButton}>
                    <MaterialIcons name="sports-esports" size={24} color={colors.onSurface} />
                </View>
                <View>
                    <Text style={styles.headerTitle}>Spell Checker</Text>
                    <Text style={styles.headerSubtitle}>Puntaje: {puntaje} / {total}</Text>
                </View>
            </View>
        </View>
    );
}

// Normaliza para comparar: sin mayúsculas ni espacios de más
const normalizar = (texto) => texto.trim().toLowerCase();

const elegirAlAzar = (lista, actual) => {
    if (lista.length <= 1) return lista[0];
    let nueva;
    do {
        nueva = lista[Math.floor(Math.random() * lista.length)];
    } while (nueva === actual); // evita repetir la misma dos veces seguidas
    return nueva;
};

const Game = () => {
    const [palabras, setPalabras] = useState([]);
    const [palabraActual, setPalabraActual] = useState(null);
    const [inputVal, setInputVal] = useState('');
    const [resultado, setResultado] = useState(null); // null | 'correcto' | 'incorrecto'
    const [puntaje, setPuntaje] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        getWords().then((data) => {
            setPalabras(data);
            setPalabraActual(elegirAlAzar(data));
        });
    }, []);

    const verificar = () => {
        if (!inputVal.trim()) return;
        const acerto = normalizar(inputVal) === normalizar(palabraActual.word);
        setResultado(acerto ? 'correcto' : 'incorrecto');
        setTotal((t) => t + 1);
        if (acerto) setPuntaje((p) => p + 1);
    };

    const siguiente = () => {
        setPalabraActual(elegirAlAzar(palabras, palabraActual));
        setInputVal('');
        setResultado(null);
    };

    if (!palabraActual) {
        return (
            <View style={[styles.screen, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={colors.secondaryContainer} />
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <GameHeader puntaje={puntaje} total={total} />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.card}>
                    <Text style={styles.instruction}>Escribe en inglés la traducción para:</Text>
                    <Text style={styles.targetWord}>{palabraActual.translation}</Text>
                    <Text style={styles.category}>{palabraActual.category}</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Escribe tu respuesta..."
                        placeholderTextColor="#9CA3AF"
                        value={inputVal}
                        onChangeText={setInputVal}
                        autoCapitalize="none"
                        autoCorrect={false}
                        editable={resultado === null}
                        onSubmitEditing={verificar}
                    />

                    {resultado === 'correcto' && (
                        <Text style={[styles.feedback, { color: colors.success }]}>¡Correcto! 🎉</Text>
                    )}
                    {resultado === 'incorrecto' && (
                        <Text style={[styles.feedback, { color: colors.error }]}>
                            Incorrecto. Era: {palabraActual.word}
                        </Text>
                    )}

                    {resultado === null ? (
                        <TouchableOpacity style={styles.payButton} onPress={verificar}>
                            <Text style={styles.payText}>Verificar Ortografía</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.payButton} onPress={siguiente}>
                            <Text style={styles.payText}>Siguiente palabra</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.surface },
    header: {
        minHeight: 64,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        elevation: 2,
    },
    headerIdentity: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    iconButton: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
    headerTitle: { fontSize: 18, fontWeight: '600', color: colors.primary },
    headerSubtitle: { fontSize: 10, fontWeight: '700', letterSpacing: 0.4, color: colors.onSurfaceVariant },
    content: { padding: 16, gap: 12 },
    card: { backgroundColor: colors.white, borderRadius: 12, padding: 20, gap: 16, elevation: 2, alignItems: 'center' },
    instruction: { fontSize: 14, color: colors.onSurfaceVariant },
    targetWord: { fontSize: 26, fontWeight: '800', color: colors.primary },
    category: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.8, color: colors.onSurfaceVariant },
    input: {
        width: '100%',
        backgroundColor: colors.surfaceLow,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        fontSize: 16,
        color: colors.primary,
        textAlign: 'center',
    },
    feedback: { fontSize: 16, fontWeight: '700' },
    payButton: {
        width: '100%',
        height: 52,
        borderRadius: 12,
        backgroundColor: colors.secondaryContainer,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
    },
    payText: { fontSize: 14, fontWeight: '700', color: colors.onSecondary },
});

export default Game;