import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const getIcon = (routeName, color, size) => {
    switch (routeName) {
        case 'index':
            return <Ionicons name="home" color={color} size={size} />;
        case 'game':
            return <Ionicons name="game-controller" color={color} size={size} />;
        case 'favoritos':
            return <Ionicons name="heart" color={color} size={size} />;
    }
    return <Ionicons name="home" color={color} size={size} />;
};

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#FE6B00',
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