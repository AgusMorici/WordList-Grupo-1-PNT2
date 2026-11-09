import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
    surface: '#FFFFFF',        // Blanco limpio (fondo de barra estilo editorial/diccionario)
    active: '#1E1B4B',         // Índigo profundo (tinta principal / sombras)
    secondary: '#4F46E5',      // Índigo vibrante (acento principal de aprendizaje para tab activo)
    tertiary: '#10B981',       // Verde esmeralda (acento de progreso / aciertos en el juego)
    inactive: '#94A3B8',       // Gris pizarra suave (íconos y textos inactivos)
    outlineVariant: '#EEF2FF', // Borde sutil con tinte índigo claro
};

const getIcon = (routeName, color, size) => {
    switch (routeName) {
        case 'index':
            return <Ionicons name="home" color={color} size={size} />;
        case 'game':
            return <Ionicons name="game-controller-outline" color={color} size={size} />;
        case 'favoritos':
            return <Ionicons name="heart-outline" color={color} size={size} />;
    }
    return <Ionicons name="home" color={color} size={size} />;
};

export default function TabsLayout() {
    return (
        <Tabs
            initialRouteName="index"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: COLORS.secondary,
                tabBarInactiveTintColor: COLORS.inactive,
                tabBarStyle: {
                    height: 80,
                    paddingTop: 8,
                    paddingBottom: 10,
                    backgroundColor: COLORS.surface,
                    borderTopColor: COLORS.outlineVariant,
                    borderTopWidth: 1,
                    shadowColor: COLORS.active,
                    shadowOpacity: 0.08,
                    shadowRadius: 8,
                    elevation: 8,
                },
                tabBarIcon: ({ color, size }) => getIcon(route.name, color, size),
            })}
        >
            <Tabs.Screen name="index" options={{ title: 'Diccionario' }} />
            <Tabs.Screen name="game" options={{ title: 'Juego' }} />
            <Tabs.Screen name="favoritos" options={{ title: 'Favoritos' }} />
            <Tabs.Screen name="palabra" options={{ href: null, headerShown: true, title: 'Detalle' }} />
        </Tabs>
    );
}