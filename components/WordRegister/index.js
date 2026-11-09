import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { addWord } from '../../services/words';

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

function SeccionTitulo({ icon, titulo }) {
    return (
        <View style={styles.seccionHeader}>
            {icon ? <MaterialIcons name={icon} size={20} color={colors.secondaryContainer} /> : null}
            <Text style={styles.seccionTitulo}>{titulo}</Text>
        </View>
    );
}

function InputField({ label, placeholder, value, onChangeText, editable = true }) {
    return (
        <View style={styles.field}>
            <Text style={styles.fieldLabel}>{label}</Text>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#9CA3AF"
                value={value}
                onChangeText={onChangeText}
                editable={editable}
                autoCapitalize="none"
            />
        </View>
    );
}

const WordRegister = ({ onAddWord }) => {
    const [word, setWord] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        const data = {
            word: word.trim(),
        };

        if (data.word === '') {
            Alert.alert('Error', 'Por favor ingresá una palabra en inglés');
            return;
        }

        try {
            setLoading(true);
            if (onAddWord) {
                await onAddWord(data);
            } else {
                const response = await addWord(data);
                console.log('Response:', response);
            }
            Alert.alert('Registro exitoso', 'la palabra se guardó en el diccionario');
            setWord('');
            router.push('/');
        } catch (error) {
            console.error('Error guardando palabra:', error);
            Alert.alert('Error', 'Error al guardar la palabra: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <View style={styles.headerIdentity}>
                    <View>
                        <Text style={styles.headerTitle}>Registrar Palabra</Text>
                        <Text style={styles.headerSubtitle}>Nuevo vocabulario</Text>
                    </View>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.card}>
                    <SeccionTitulo icon="auto-awesome" titulo="Generación con IA" />
                    <Text style={styles.helperText}>
                        Escribí únicamente la palabra. Nuestra IA se encargará de generar automáticamente su traducción, definición y categoría.
                    </Text>
                    <InputField
                        label="Palabra"
                        placeholder="Ej. Resilience"
                        value={word}
                        onChangeText={setWord}
                        editable={!loading}
                    />
                </View>

                <TouchableOpacity
                    style={[styles.payButton, loading && styles.payButtonDisabled]}
                    onPress={handleSave}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <ActivityIndicator size="small" color={colors.onSecondary} />
                            <Text style={styles.payText}>Generando con IA...</Text>
                        </>
                    ) : (
                        <>
                            <MaterialIcons name="auto-awesome" size={20} color={colors.onSecondary} />
                            <Text style={styles.payText}>Generar y Guardar en el Diccionario</Text>
                        </>
                    )}
                </TouchableOpacity>
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
    card: { backgroundColor: colors.white, borderRadius: 12, padding: 16, gap: 12, elevation: 2 },
    seccionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
    seccionTitulo: { fontSize: 16, fontWeight: '600', color: colors.primary },
    helperText: { fontSize: 13, lineHeight: 18, color: colors.onSurfaceVariant },
    field: { gap: 4 },
    fieldLabel: { fontSize: 10, fontWeight: '700', color: colors.onSurfaceVariant, textTransform: 'uppercase' },
    input: { backgroundColor: colors.surfaceLow, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, color: colors.primary },
    payButton: {
        height: 56,
        borderRadius: 12,
        backgroundColor: colors.secondaryContainer,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginTop: 4,
        elevation: 4,
    },
    payButtonDisabled: {
        opacity: 0.7,
    },
    payText: { fontSize: 14, fontWeight: '700', color: colors.onSecondary },
});

export default WordRegister;