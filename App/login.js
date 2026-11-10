import { useEffect, useRef, useState } from 'react';
import {
    Animated,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
    Alert,
} from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { login } from '../services/authentication';
import { useAuth } from '../hooks/useAuth';

const colors = {
    surface: '#FFFaf5',
    surfaceLow: '#FFF7ED',
    surfaceHigh: '#FFEDD5',
    surfaceContainer: '#FED7AA',
    surfaceHighest: '#FDBA74',
    surfaceLowest: '#FFFFFF',
    primary: '#000412',
    primaryContainer: '#9A3412',
    onPrimary: '#FFFFFF',
    onSurface: '#191C1E',
    onSurfaceVariant: '#7C2D12',
    outline: '#EA580C',
    outlineVariant: '#FB923C',
    secondary: '#EA580C',
    secondaryContainer: '#FE6B00',
    secondaryFixed: '#FFEDD5',
    onSecondaryFixed: '#9A3412',
};

function Emblem() {
    return (
        <View style={styles.emblem}>
            <MaterialIcons name="menu-book" size={26} color={colors.onPrimary} />
        </View>
    );
}

function Field({
    label,
    hint,
    icon,
    value,
    onChangeText,
    placeholder,
    focused,
    onFocus,
    onBlur,
    secureTextEntry,
    onToggleSecure,
    passwordVisible,
    inputRef,
    returnKeyType,
    onSubmitEditing,
    textContentType,
    autoComplete,
    keyboardType,
}) {
    return (
        <View style={styles.fieldBlock}>
            <View style={styles.labelRow}>
                <Text style={styles.label}>{label}</Text>
                {hint ? <Text style={styles.hint}>{hint}</Text> : null}
            </View>
            <View style={[styles.inputShell, focused && styles.inputShellFocused]}>
                <View style={styles.inputIcon} pointerEvents="none">
                    <MaterialIcons name={icon} size={20} color={colors.outline} />
                </View>
                <TextInput
                    ref={inputRef}
                    style={[styles.input, onToggleSecure && styles.inputWithAction]}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="rgba(154, 52, 18, 0.45)"
                    selectionColor={colors.secondaryContainer}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={secureTextEntry}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    returnKeyType={returnKeyType}
                    onSubmitEditing={onSubmitEditing}
                    textContentType={textContentType}
                    autoComplete={autoComplete}
                    keyboardType={keyboardType}
                    underlineColorAndroid="transparent"
                />
                {onToggleSecure ? (
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Mostrar u ocultar contraseña"
                        onPress={onToggleSecure}
                        hitSlop={8}
                        style={({ pressed }) => [styles.eyeButton, pressed && styles.eyePressed]}
                    >
                        <MaterialIcons
                            name={passwordVisible ? 'visibility-off' : 'visibility'}
                            size={20}
                            color={colors.outline}
                        />
                    </Pressable>
                ) : null}
            </View>
        </View>
    );
}

function SocialButton({ name, label, accessibilityLabel, color, onPress }) {
    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabel}
            onPress={onPress}
            style={({ pressed }) => [styles.socialButton, pressed && styles.socialPressed]}
        >
            <FontAwesome name={name} size={20} color={color} />
            <Text style={styles.socialLabel}>{label}</Text>
        </Pressable>
    );
}

const Login = () => {
    const { handleLogin } = useAuth();
    const insets = useSafeAreaInsets();
    const passwordRef = useRef(null);
    const pulse = useRef(new Animated.Value(1)).current;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [remember, setRemember] = useState(true);
    const [focused, setFocused] = useState(null);

    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(pulse, {
                    toValue: 0.35,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(pulse, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ]),
        );
        animation.start();
        return () => animation.stop();
    }, [pulse]);

    // La autenticación se conecta en estos handlers.
    const handleIniciarSesion = () => {
        console.log('Iniciar sesión');
        console.log(email, password);
        login(email, password)
            .then((response) => {
                console.log(response);
                handleLogin(response);
            })
            .catch((error) => {
                console.log(error);
                Alert.alert('Error', error.error);
            });
    };
    const handleOlvideContrasena = () => { };
    const handleBiometria = () => { };
    const handleApple = () => { };
    const handleGoogle = () => { };
    const handleRegistro = () => { };

    return (
        <View style={styles.screen}>
            <StatusBar barStyle="dark-content" />
            <View style={[styles.header, { paddingTop: insets.top }]} />

            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView
                    style={styles.flex}
                    contentContainerStyle={[
                        styles.content,
                        { paddingBottom: 32 + insets.bottom },
                    ]}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.hero}>
                        <View style={styles.glowOrange} pointerEvents="none" />
                        <View style={styles.glowBlue} pointerEvents="none" />

                        <View style={styles.brandRow}>
                            <Emblem />
                            <View style={styles.brandText}>
                                <View style={styles.brandNameRow}>
                                    <Text style={styles.brandName}>WORDLIST</Text>
                                    <View style={styles.driveChip}>
                                        <Text style={styles.driveChipText}>AI</Text>
                                    </View>
                                </View>
                                <Text style={styles.brandTag}>English Dictionary & Game</Text>
                            </View>
                        </View>

                        <View style={styles.accessPill}>
                            <Animated.View style={[styles.accessDot, { opacity: pulse }]} />
                            <Text style={styles.accessText}>Práctica Interactiva</Text>
                            <MaterialIcons name="auto-awesome" size={14} color={colors.secondary} />
                        </View>

                        <Text style={styles.heading}>Tu Diccionario Personal</Text>
                        <Text style={styles.subtitle}>
                            Ingresá a tu cuenta para aprender nuevas palabras en otro idioma y poner a prueba tu memoria.
                        </Text>
                    </View>

                    <View style={styles.formCard}>
                        <Field
                            label="Correo electrónico"
                            hint="Requerido"
                            icon="mail"
                            value={email}
                            onChangeText={setEmail}
                            placeholder="usuario@test.com"
                            focused={focused === 'email'}
                            onFocus={() => setFocused('email')}
                            onBlur={() => setFocused(null)}
                            returnKeyType="next"
                            onSubmitEditing={() => passwordRef.current?.focus()}
                            textContentType="username"
                            autoComplete="username"
                            keyboardType="email-address"
                        />
                        <Field
                            label="Contraseña"
                            icon="lock"
                            value={password}
                            onChangeText={setPassword}
                            placeholder="••••••••••••"
                            focused={focused === 'password'}
                            onFocus={() => setFocused('password')}
                            onBlur={() => setFocused(null)}
                            secureTextEntry={!passwordVisible}
                            passwordVisible={passwordVisible}
                            onToggleSecure={() => setPasswordVisible((visible) => !visible)}
                            inputRef={passwordRef}
                            returnKeyType="done"
                            onSubmitEditing={handleIniciarSesion}
                            textContentType="password"
                            autoComplete="password"
                        />

                        <View style={styles.utilityRow}>
                            <Pressable
                                accessibilityRole="checkbox"
                                accessibilityState={{ checked: remember }}
                                onPress={() => setRemember((value) => !value)}
                                style={styles.remember}
                            >
                                <View style={[styles.checkbox, remember && styles.checkboxOn]}>
                                    {remember ? (
                                        <MaterialIcons name="check" size={16} color={colors.onPrimary} />
                                    ) : null}
                                </View>
                                <Text style={styles.rememberText}>Mantener sesión activa</Text>
                            </Pressable>
                            <Pressable
                                accessibilityRole="button"
                                onPress={handleOlvideContrasena}
                                hitSlop={8}
                            >
                                <Text style={styles.forgot}>¿Olvidaste tu clave?</Text>
                            </Pressable>
                        </View>

                        <Pressable
                            accessibilityRole="button"
                            onPress={handleIniciarSesion}
                            style={({ pressed }) => [
                                styles.loginButton,
                                pressed && styles.pressed,
                            ]}
                        >
                            <Text style={styles.loginLabel}>Entrar a WordList</Text>
                            <MaterialIcons name="login" size={20} color={colors.onPrimary} />
                        </Pressable>
                    </View>

                    <Pressable
                        accessibilityRole="button"
                        onPress={handleBiometria}
                        style={({ pressed }) => [
                            styles.faceButton,
                            pressed && styles.pressedSoft,
                        ]}
                    >
                        <View style={styles.faceIcon}>
                            <MaterialIcons name="face" size={18} color={colors.primaryContainer} />
                        </View>
                        <Text style={styles.faceLabel}>Acceso rápido biométrico</Text>
                        <MaterialIcons name="fingerprint" size={18} color={colors.outline} />
                    </Pressable>

                    <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>O ingresá con</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    <View style={styles.socialRow}>
                        <SocialButton
                            name="apple"
                            label="Apple"
                            accessibilityLabel="Continuar con Apple"
                            color={colors.primary}
                            onPress={handleApple}
                        />
                        <SocialButton
                            name="google"
                            label="Google"
                            accessibilityLabel="Continuar con Google"
                            color="#4285F4"
                            onPress={handleGoogle}
                        />
                    </View>

                    <Text style={styles.signup}>
                        ¿Todavía no tenés cuenta?{' '}
                        <Text style={styles.signupLink} onPress={handleRegistro} suppressHighlighting>
                            Crear cuenta
                        </Text>
                    </Text>

                    <View style={styles.seal}>
                        <MaterialIcons name="school" size={15} color={colors.outline} />
                        <Text style={styles.sealText}>
                            WordList · Aprendizaje con Inteligencia Artificial
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.surface,
    },
    flex: {
        flex: 1,
    },
    header: {
        backgroundColor: colors.surface,
    },
    content: {
        paddingHorizontal: 20,
    },
    hero: {
        marginTop: 12,
        marginBottom: 18,
        paddingVertical: 22,
        paddingHorizontal: 18,
        borderRadius: 24,
        backgroundColor: colors.surfaceLowest,
        alignItems: 'flex-start',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.surfaceHigh,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.06,
        shadowRadius: 14,
        elevation: 2,
    },
    glowOrange: {
        position: 'absolute',
        top: -50,
        right: -30,
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: 'rgba(254, 107, 0, 0.12)',
    },
    glowBlue: {
        position: 'absolute',
        bottom: -40,
        left: -20,
        width: 130,
        height: 130,
        borderRadius: 65,
        backgroundColor: 'rgba(251, 146, 60, 0.12)',
    },
    brandRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 12,
    },
    emblem: {
        width: 50,
        height: 50,
        borderRadius: 16,
        backgroundColor: colors.secondaryContainer,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.secondaryContainer,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 4,
    },
    brandText: {
        paddingLeft: 2,
    },
    brandNameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    brandName: {
        fontSize: 20,
        lineHeight: 24,
        fontWeight: '800',
        letterSpacing: 0.4,
        color: colors.primary,
    },
    driveChip: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
        backgroundColor: colors.secondaryFixed,
    },
    driveChipText: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '800',
        letterSpacing: 0.8,
        textTransform: 'uppercase',
        color: colors.onSecondaryFixed,
    },
    brandTag: {
        marginTop: 2,
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '600',
        color: colors.outline,
    },
    accessPill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        backgroundColor: colors.surfaceLow,
        borderWidth: 1,
        borderColor: colors.surfaceHigh,
    },
    accessDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.secondary,
    },
    accessText: {
        fontSize: 11,
        lineHeight: 15,
        fontWeight: '700',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
        color: colors.primaryContainer,
    },
    heading: {
        fontSize: 24,
        lineHeight: 30,
        fontWeight: '800',
        letterSpacing: -0.4,
        color: colors.primary,
        textAlign: 'left',
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 13,
        lineHeight: 19,
        fontWeight: '500',
        color: colors.onSurfaceVariant,
        textAlign: 'left',
    },
    formCard: {
        backgroundColor: colors.surfaceLowest,
        borderRadius: 24,
        padding: 20,
        gap: 16,
        borderWidth: 1,
        borderColor: colors.surfaceHigh,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.07,
        shadowRadius: 16,
        elevation: 3,
    },
    fieldBlock: {
        gap: 6,
    },
    labelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
    },
    label: {
        flexShrink: 1,
        fontSize: 11,
        lineHeight: 16,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        color: colors.primaryContainer,
    },
    hint: {
        fontSize: 11,
        lineHeight: 16,
        fontWeight: '600',
        color: colors.outlineVariant,
    },
    inputShell: {
        height: 50,
        borderRadius: 14,
        backgroundColor: colors.surfaceLow,
        borderWidth: 1.5,
        borderColor: colors.surfaceHigh,
        justifyContent: 'center',
    },
    inputShellFocused: {
        backgroundColor: colors.surfaceLowest,
        borderColor: colors.secondaryContainer,
    },
    inputIcon: {
        position: 'absolute',
        left: 14,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
    },
    input: {
        paddingLeft: 44,
        paddingRight: 16,
        paddingVertical: 0,
        fontSize: 14,
        color: colors.onSurface,
        textAlignVertical: 'center',
    },
    inputWithAction: {
        paddingRight: 44,
    },
    eyeButton: {
        position: 'absolute',
        right: 8,
        top: '50%',
        marginTop: -16,
        width: 32,
        height: 32,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    eyePressed: {
        transform: [{ scale: 0.95 }],
    },
    utilityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        paddingTop: 2,
    },
    remember: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        flex: 1,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.surfaceContainer,
    },
    checkboxOn: {
        backgroundColor: colors.secondaryContainer,
    },
    rememberText: {
        flexShrink: 1,
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '500',
        color: colors.onSurfaceVariant,
    },
    forgot: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '700',
        color: colors.secondaryContainer,
    },
    loginButton: {
        height: 54,
        marginTop: 4,
        borderRadius: 16,
        backgroundColor: colors.secondaryContainer,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        shadowColor: colors.secondaryContainer,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 14,
        elevation: 4,
    },
    loginLabel: {
        fontSize: 16,
        lineHeight: 22,
        fontWeight: '700',
        color: colors.onPrimary,
    },
    pressed: {
        transform: [{ scale: 0.98 }],
    },
    pressedSoft: {
        transform: [{ scale: 0.99 }],
        backgroundColor: colors.surfaceContainer,
    },
    socialPressed: {
        transform: [{ scale: 0.98 }],
        backgroundColor: colors.surfaceLow,
    },
    faceButton: {
        height: 48,
        marginTop: 14,
        borderRadius: 14,
        backgroundColor: colors.surfaceLowest,
        borderWidth: 1,
        borderColor: colors.surfaceHigh,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 16,
    },
    faceIcon: {
        width: 28,
        height: 28,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.surfaceHigh,
    },
    faceLabel: {
        flex: 1,
        fontSize: 13,
        lineHeight: 18,
        fontWeight: '600',
        color: colors.onSurface,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginVertical: 20,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: colors.surfaceHighest,
    },
    dividerText: {
        fontSize: 11,
        lineHeight: 16,
        fontWeight: '700',
        letterSpacing: 0.8,
        textTransform: 'uppercase',
        color: colors.outline,
    },
    socialRow: {
        flexDirection: 'row',
        gap: 10,
    },
    socialButton: {
        flex: 1,
        height: 48,
        borderRadius: 14,
        backgroundColor: colors.surfaceLowest,
        borderWidth: 1,
        borderColor: colors.surfaceHigh,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    socialLabel: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '600',
        color: colors.onSurface,
    },
    signup: {
        marginTop: 20,
        marginBottom: 8,
        fontSize: 13,
        lineHeight: 20,
        color: colors.onSurfaceVariant,
        textAlign: 'center',
    },
    signupLink: {
        fontSize: 13,
        lineHeight: 20,
        fontWeight: '800',
        color: colors.secondaryContainer,
    },
    seal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingTop: 4,
        opacity: 0.85,
    },
    sealText: {
        flexShrink: 1,
        fontSize: 11,
        lineHeight: 14,
        fontWeight: '600',
        color: colors.outline,
    },
});
