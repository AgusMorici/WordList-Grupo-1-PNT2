import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const colors = {
    surface: '#F7F9FB',
    white: '#FFFFFF',
    primary: '#000412',
    onSurface: '#191C1E',
    onSurfaceVariant: '#44474D',
    surfaceLow: '#F2F4F6',
    secondaryContainer: '#FE6B00',
    onSecondary: '#FFFFFF',
};

function GameHeader() {
    return (
        <View style={styles.header}>
            <View style={styles.headerIdentity}>
                <View style={styles.iconButton}>
                    <MaterialIcons name="sports-esports" size={24} color={colors.onSurface} />
                </View>
                <View>
                    <Text style={styles.headerTitle}>Spell Checker</Text>
                    <Text style={styles.headerSubtitle}>Práctica activa</Text>
                </View>
            </View>
        </View>
    );
}

const Game = () => {
    const [inputVal, setInputVal] = useState('');
    const palabraActual = { translation: 'Fecha límite' };

    return (
        <View style={styles.screen}>
            <GameHeader />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.card}>
                    <Text style={styles.instruction}>Escribe en inglés la traducción para:</Text>
                    <Text style={styles.targetWord}>{palabraActual.translation}</Text>

                    <TouchableOpacity style={styles.audioPrompt}>
                        <MaterialIcons name="volume-up" size={24} color={colors.secondaryContainer} />
                        <Text style={styles.audioText}>Escuchar pronunciación</Text>
                    </TouchableOpacity>

                    <TextInput
                        style={styles.input}
                        placeholder="Escribe tu respuesta..."
                        placeholderTextColor="#9CA3AF"
                        value={inputVal}
                        onChangeText={setInputVal}
                    />

                    <TouchableOpacity style={styles.payButton}>
                        <Text style={styles.payText}>Verificar Ortografía</Text>
                    </TouchableOpacity>
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
    targetWord: { fontSize: 26, fontWeight: '800', color: colors.primary, marginBottom: 4 },
    audioPrompt: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: colors.surfaceLow,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        marginBottom: 8,
    },
    audioText: { fontSize: 12, fontWeight: '600', color: colors.primary },
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