import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../hooks/useAuth';

export default function Profile() {
    const { auth, handleLogout } = useAuth();
    const user = auth?.user;

    return (
        <View style={styles.container}>
            <View style={styles.iconWrap}>
                <Ionicons name="log-out-outline" size={40} color="#4F46E5" />
            </View>

            <Text style={styles.title}>Cerrar sesión</Text>
            <Text style={styles.subtitle}>
                {user?.name ? `${user.name}, ¿querés salir de tu cuenta?` : '¿Querés salir de tu cuenta?'}
            </Text>
            {user?.email ? <Text style={styles.email}>{user.email}</Text> : null}

            <Pressable
                style={({ pressed }) => [styles.button, pressed && styles.pressed]}
                onPress={handleLogout}
                accessibilityRole="button"
            >
                <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
                <Text style={styles.buttonText}>Cerrar sesión</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#F7F9FB',
    },
    iconWrap: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#EEF2FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1E1B4B',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        color: '#44474D',
        textAlign: 'center',
    },
    email: {
        fontSize: 13,
        color: '#94A3B8',
        marginTop: 4,
    },
    button: {
        marginTop: 28,
        height: 52,
        width: '100%',
        maxWidth: 320,
        borderRadius: 14,
        backgroundColor: '#4F46E5',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
    pressed: {
        transform: [{ scale: 0.98 }],
    },
});