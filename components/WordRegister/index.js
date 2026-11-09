import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
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

function InputField({ label, placeholder, value, onChangeText, multiline = false }) {
    return (
        <View style={styles.field}>
            <Text style={styles.fieldLabel}>{label}</Text>
            <TextInput
                style={[styles.input, multiline && styles.textArea]}
                placeholder={placeholder}
                placeholderTextColor="#9CA3AF"
                value={value}
                onChangeText={onChangeText}
                multiline={multiline}
                numberOfLines={multiline ? 4 : 1}
            />
        </View>
    );
}

const WordRegister = ({ onAddWord }) => {
    const [word, setWord] = useState('');
    const [translation, setTranslation] = useState('');
    const [definition, setDefinition] = useState('');

    const handleSave = async () => {
        console.log('Guardar en el Diccionario');
        console.log('Palabra en Inglés:', word);
        console.log('Traducción:', translation);
        console.log('Definición:', definition);

        const data = {
            word: word.trim(),
            translation: translation.trim(),
            definition: definition.trim(),
        };
        console.log('Data to send:', data);

        // Validar que la palabra y la traducción no sean vacías
        if (data.word === '' || data.translation === '') {
            Alert.alert('Error', 'La palabra en inglés y la traducción no pueden estar vacías');
            return;
        }

        // Validar que la definición no sea vacía
        if (data.definition === '') {
            Alert.alert('Error', 'Por favor agregá un ejemplo o definición');
            return;
        }

        try {
            if (onAddWord) {
                onAddWord(data);
            } else {
                const response = await addWord(data);
                console.log('Response:', response);
            }
            Alert.alert('Registro exitoso', 'La palabra se guardó correctamente en el diccionario');
            setWord('');
            setTranslation('');
            setDefinition('');
            router.push('/');
        } catch (error) {
            console.error('Error guardando palabra:', error);
            Alert.alert('Error', 'Error al guardar la palabra: ' + error.message);
        }
    };

    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <View style={styles.headerIdentity}>
                    <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
                        <MaterialIcons name="arrow-back" size={24} color={colors.onSurface} />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.headerTitle}>Registrar Palabra</Text>
                        <Text style={styles.headerSubtitle}>Nuevo vocabulario</Text>
                    </View>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.card}>
                    <SeccionTitulo icon="book" titulo="Detalles de la palabra" />
                    <InputField label="Palabra en Inglés" placeholder="Ej. Resilience" value={word} onChangeText={setWord} />
                    <InputField label="Traducción" placeholder="Ej. Resiliencia" value={translation} onChangeText={setTranslation} />
                    <InputField label="Ejemplo / Definición" placeholder="Ej. The resilience of the team..." value={definition} onChangeText={setDefinition} multiline />
                </View>

                <TouchableOpacity style={styles.payButton} onPress={handleSave}>
                    <MaterialIcons name="check" size={20} color={colors.onSecondary} />
                    <Text style={styles.payText}>Guardar en el Diccionario</Text>
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
    field: { gap: 4 },
    fieldLabel: { fontSize: 10, fontWeight: '700', color: colors.onSurfaceVariant, textTransform: 'uppercase' },
    input: { backgroundColor: colors.surfaceLow, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, color: colors.primary },
    textArea: { height: 90, textAlignVertical: 'top' },
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
    payText: { fontSize: 14, fontWeight: '700', color: colors.onSecondary },
});

export default WordRegister;