import { useCallback, useMemo, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import { getWords } from '../../services/words';
import { useAuth } from '../../hooks/useAuth';

const colors = {
    surface: '#F7F9FB',
    card: '#FFFFFF',
    primary: '#000412',
    primaryContainer: '#0F1E36',
    onPrimary: '#FFFFFF',
    onSurface: '#191C1E',
    onSurfaceVariant: '#44474D',
    surfaceLow: '#F2F4F6',
    surfaceContainer: '#ECEEF0',
    surfaceHigh: '#E6E8EA',
    outline: '#75777E',
    outlineVariant: '#C5C6CE',
    orange: '#FE6B00',
    onOrange: '#FFFFFF',
    secondary: '#A04100',
};

function IconoRedondo({ name, onPress }) {
    return (
        <Pressable style={styles.iconoRedondo} onPress={onPress}>
            <MaterialIcons name={name} size={20} color={colors.onSurface} />
        </Pressable>
    );
}

function Vacio({ icon, titulo, detalle }) {
    return (
        <View style={styles.vacio}>
            <View style={styles.vacioIcono}>
                <MaterialIcons name={icon} size={28} color={colors.outline} />
            </View>
            <Text style={styles.vacioTitulo}>{titulo}</Text>
            <Text style={styles.vacioDetalle}>{detalle}</Text>
        </View>
    );
}

function Pestanas({ actual, conteos, onChange }) {
    const items = [
        { id: 'favoritas', label: 'Favoritas' },
        { id: 'todas', label: 'Todas' },
    ];

    return (
        <View style={styles.segmento}>
            {items.map((item) => {
                const activo = item.id === actual;
                return (
                    <Pressable
                        key={item.id}
                        style={[styles.pestana, activo && styles.pestanaActiva]}
                        accessibilityRole="tab"
                        accessibilityState={{ selected: activo }}
                        onPress={() => onChange(item.id)}
                    >
                        <Text style={[styles.pestanaTexto, activo && styles.pestanaTextoActivo]} numberOfLines={1}>
                            {item.label}
                        </Text>
                        <View style={[styles.conteo, activo ? styles.conteoActivo : styles.conteoInactivo]}>
                            <Text style={[styles.conteoTexto, activo ? styles.conteoTextoActivo : styles.conteoTextoInactivo]}>
                                {conteos[item.id]}
                            </Text>
                        </View>
                    </Pressable>
                );
            })}
        </View>
    );
}

function TarjetaPalabra({ palabra }) {
    const id = palabra.id ?? palabra._id;

    return (
        <View style={styles.sombraHistorial}>
            <Pressable
                style={styles.tarjetaHistorial}
                onPress={() => router.push(`/palabra/${id}`)}
            >
                <View style={styles.historialTope}>
                    <View style={styles.historialIdentidad}>
                        <View style={styles.fotoChica}>
                            <MaterialIcons name="menu-book" size={22} color={colors.primaryContainer} />
                        </View>
                        <View style={styles.historialTexto}>
                            <Text style={styles.historialNombre} numberOfLines={1}>
                                {palabra.word}
                            </Text>
                            <Text style={styles.historialLugar} numberOfLines={1}>
                                {palabra.translation}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.badgeCategoria}>
                        <Text style={styles.badgeCategoriaTexto}>
                            {palabra.category || 'General'}
                        </Text>
                    </View>
                </View>

                {palabra.definition ? (
                    <View style={styles.definicionCaja}>
                        <Text style={styles.definicionTexto} numberOfLines={2}>
                            "{palabra.definition}"
                        </Text>
                    </View>
                ) : null}
            </Pressable>
        </View>
    );
}

const Favorites = () => {
    const { handleLogout } = useAuth();
    const [palabras, setPalabras] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(false);
    const [pestana, setPestana] = useState('favoritas');
    const scrollRef = useRef(null);

    useFocusEffect(
        useCallback(() => {
            let vivo = true;
            setCargando(true);
            setError(false);

            getWords()
                .then((respuesta) => {
                    if (!vivo) return;
                    setPalabras(Array.isArray(respuesta) ? respuesta : []);
                })
                .catch(() => {
                    if (vivo) {
                        setError(true);
                    }
                })
                .finally(() => {
                    if (vivo) {
                        setCargando(false);
                    }
                });

            return () => {
                vivo = false;
            };
        }, [])
    );

    const favoritas = useMemo(
        () => palabras.filter((p) => Boolean(p.favorite)),
        [palabras]
    );

    const listaActual = pestana === 'favoritas' ? favoritas : palabras;

    function cambiarPestana(siguiente) {
        setPestana(siguiente);
        scrollRef.current?.scrollTo({ y: 0, animated: true });
    }

    return (
        <ScrollView
            ref={scrollRef}
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.encabezado}>
                <View style={styles.encabezadoTexto}>
                    <Text style={styles.titulo}>Mis Palabras</Text>
                    <View style={styles.resumenFila}>
                        <View style={[styles.resumenPunto, favoritas.length === 0 && styles.resumenPuntoVacio]} />
                        <Text style={styles.resumen}>
                            {cargando
                                ? 'Cargando vocabulario...'
                                : `${favoritas.length} favoritas · ${palabras.length} en total`}
                        </Text>
                    </View>
                </View>
            </View>

            <Pestanas
                actual={pestana}
                conteos={{
                    favoritas: favoritas.length,
                    todas: palabras.length,
                }}
                onChange={cambiarPestana}
            />

            {cargando ? (
                <View style={styles.estado}>
                    <ActivityIndicator color={colors.primaryContainer} />
                </View>
            ) : null}

            {error ? (
                <Vacio
                    icon="cloud-off"
                    titulo="No se pudieron cargar las palabras"
                    detalle="Revisá la conexión con el servidor e intentá de nuevo."
                />
            ) : null}

            {!cargando && !error ? (
                <View style={styles.seccion}>
                    {listaActual.length === 0 ? (
                        <Vacio
                            icon={pestana === 'favoritas' ? 'favorite-border' : 'menu-book'}
                            titulo={
                                pestana === 'favoritas'
                                    ? 'Todavía no tenés palabras favoritas'
                                    : 'No hay palabras registradas'
                            }
                            detalle="Agregá nuevas palabras o marcalas como favoritas en el diccionario."
                        />
                    ) : (
                        listaActual.map((palabra, idx) => (
                            <TarjetaPalabra
                                key={String(palabra.id ?? palabra._id ?? idx)}
                                palabra={palabra}
                            />
                        ))
                    )}
                </View>
            ) : null}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 28,
        gap: 20,
    },
    encabezado: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
    },
    encabezadoTexto: {
        flex: 1,
    },
    titulo: {
        fontSize: 26,
        lineHeight: 34,
        fontWeight: '700',
        letterSpacing: -0.5,
        color: colors.primary,
    },
    resumenFila: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 2,
    },
    resumenPunto: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.orange,
    },
    resumenPuntoVacio: {
        backgroundColor: colors.outlineVariant,
    },
    resumen: {
        flexShrink: 1,
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '600',
        letterSpacing: 0.2,
        color: colors.onSurfaceVariant,
    },
    encabezadoAcciones: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    iconoRedondo: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.card,
        shadowColor: '#0F1E36',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 2,
    },
    segmento: {
        flexDirection: 'row',
        gap: 4,
        padding: 4,
        borderRadius: 999,
        backgroundColor: colors.surfaceLow,
    },
    pestana: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingVertical: 8,
        paddingHorizontal: 4,
        borderRadius: 999,
    },
    pestanaActiva: {
        backgroundColor: colors.primaryContainer,
        shadowColor: '#0F1E36',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.12,
        shadowRadius: 3,
        elevation: 2,
    },
    pestanaTexto: {
        flexShrink: 1,
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '600',
        letterSpacing: 0.2,
        color: colors.onSurfaceVariant,
    },
    pestanaTextoActivo: {
        color: colors.onPrimary,
    },
    conteo: {
        minWidth: 20,
        height: 20,
        paddingHorizontal: 4,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    conteoActivo: {
        backgroundColor: colors.orange,
    },
    conteoInactivo: {
        backgroundColor: colors.surfaceHigh,
    },
    conteoTexto: {
        fontSize: 11,
        lineHeight: 14,
        fontWeight: '700',
    },
    conteoTextoActivo: {
        color: colors.onOrange,
    },
    conteoTextoInactivo: {
        color: colors.onSurfaceVariant,
    },
    estado: {
        paddingVertical: 48,
        alignItems: 'center',
    },
    seccion: {
        gap: 12,
    },
    sombraHistorial: {
        borderRadius: 16,
        backgroundColor: colors.card,
        shadowColor: '#0F1E36',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 2,
    },
    tarjetaHistorial: {
        gap: 12,
        padding: 16,
        borderRadius: 16,
        backgroundColor: colors.card,
    },
    historialTope: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 8,
    },
    historialIdentidad: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    fotoChica: {
        width: 48,
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.surfaceContainer,
    },
    historialTexto: {
        flex: 1,
        minWidth: 0,
    },
    historialNombre: {
        fontSize: 16,
        lineHeight: 22,
        fontWeight: '700',
        color: colors.primary,
    },
    historialLugar: {
        fontSize: 13,
        lineHeight: 18,
        fontWeight: '600',
        color: colors.orange,
    },
    badgeCategoria: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 999,
        backgroundColor: colors.surfaceLow,
    },
    badgeCategoriaTexto: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '700',
        color: colors.onSurfaceVariant,
    },
    definicionCaja: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        backgroundColor: colors.surfaceLow,
    },
    definicionTexto: {
        fontSize: 12,
        lineHeight: 16,
        fontStyle: 'italic',
        color: colors.onSurfaceVariant,
    },
    vacio: {
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 32,
        borderRadius: 16,
        backgroundColor: colors.card,
        shadowColor: '#0F1E36',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    vacioIcono: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
        backgroundColor: colors.surfaceLow,
    },
    vacioTitulo: {
        fontSize: 18,
        lineHeight: 24,
        fontWeight: '600',
        color: colors.primary,
        textAlign: 'center',
    },
    vacioDetalle: {
        marginTop: 4,
        fontSize: 14,
        lineHeight: 20,
        color: colors.onSurfaceVariant,
        textAlign: 'center',
    },
});

export default Favorites;

