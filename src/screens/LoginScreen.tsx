import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../hooks/useTheme';
import Header from '../components/common/Header';
import SignInSVG from '../assets/svg/SignInSVG';
import { Button } from '../components/common/Button';
import { NaviButton } from '../components/common/NaviButton';
import { LoginScreenProps } from '../types/navigation';

export default function LoginScreen({ navigation, route }: LoginScreenProps) {
    const { colors, toggleTheme, theme, spacing, typography, shadows } = useTheme();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [focusedInput, setFocusedInput] = useState<string | null>(null);
    const handleFocus = (input: string) => setFocusedInput(input);
    const handleBlur = () => setFocusedInput(null);

    const handleWelcome = () => {
        navigation.navigate('Welcome');
    };

    const handleHome = () => {
        // Navegación a la pantalla de inicio de sesión
        navigation.navigate('Home');
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
                backgroundColor={colors.background}
            />
            <View style={styles.navButton}>
                <NaviButton
                    label='Anterior'
                    type='PrevButton'
                    color={colors.primary}
                    fontSize={typography.fontSizes.sm}
                    onPress={handleWelcome}
                />
            </View>
            <View style={styles.toggleTheme}>
                <Header 
                    primaryColor={colors.primary}
                    toggleTheme={toggleTheme} 
                    colorCard={colors.card} 
                    shadows={shadows.sm}
                    theme={theme}
                    showLogo={false}
                    showName={false}
                />
            </View>

            <SignInSVG primaryColor={colors.primary} size={350} />
            <View style={styles.welcomeSection}>
                <Text style={[
                    styles.welcomeTitle, { color: colors.text, fontSize: typography.fontSizes.xxxl }
                ]}>
                    ¡Bienvenido!
                </Text>
                <Text style={[
                    styles.welcomeSubtitle, { color: colors.textSecondary, fontSize: typography.fontSizes.lg }
                ]}>
                    Descubre todo lo que puedes hacer con nuestra aplicación
                </Text>
            </View>
            
            <View style={styles.inputContainer}>
                <Ionicons name="mail-sharp" size={20} color={focusedInput === 'email' ? colors.primary : "#aaa"} style={styles.icon} />
                <TextInput
                    style={[styles.input, focusedInput === 'email' && { borderColor: colors.primary }, { color: focusedInput === 'email' ? colors.primary : colors.text }]}
                    placeholder="Email"
                    placeholderTextColor={colors.textSecondary}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                />
            </View>

            <View style={styles.inputContainer}>
                <Ionicons name="lock-closed" size={20} color={focusedInput === 'password' ? colors.primary : "#aaa"} style={styles.icon} />
                <TextInput
                    style={[styles.input, focusedInput === 'password' && { borderColor: colors.primary }, { color: focusedInput === 'password' ? colors.primary : colors.text }]}
                    placeholder="Contraseña"
                    placeholderTextColor={colors.textSecondary}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCorrect={false}
                    onFocus={() => handleFocus('password')}
                    onBlur={handleBlur}
                />
                <TouchableOpacity 
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.passwordToggle}
                >
                    <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color={focusedInput === 'password' ? colors.primary : "#aaa"} style={styles.icon2}/>
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
                <Text style={[styles.forgotPassword, { color: colors.secondary }]}>
                    ¿Olvidaste tu contraseña?
                </Text>
            </View>
            <Button title='Iniciar sesión' onPress={handleHome} />
            
            <View style={styles.otherContainer}>
                <Text style={{ color: colors.text }} selectable >¿No tienes una cuenta? </Text>
                <Text style={[styles.forgotPassword, { color: colors.secondary }]} onPress={handleHome} >
                    Registrate aquí
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navButton: {
        flex: 1,
        zIndex: 10,
        position: 'absolute',
        top: 8,
        left: 0,
        paddingRight: 5,    
        borderColor: '#aaa',
        borderWidth: 2,
        borderLeftWidth: 0,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderRadius: 15,
    },
    toggleTheme: {
        flex: 1,
        position: 'absolute',
        zIndex: 10,
        top: 0,
        right: 0,
    },
    welcomeSection: {
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeTitle: {
        fontWeight: '700',
        marginBottom: 8,
        textAlign: 'center',
    },
    welcomeSubtitle: {
        fontWeight: '400',
        lineHeight: 24,
        textAlign: 'center',
    },
    inputContainer: {
        position: 'relative',
        marginBottom: 15,
        width: 320,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1.5,
        borderRadius: 25,
        paddingHorizontal: 50,
        fontSize: 16,
    },
    icon: {
        position: 'absolute',
        left: 15,
        top: 15,
    },
    icon2: {
        position: 'absolute',
        right: 15,
    },
    passwordToggle: {
        position: 'absolute',
        right: 10,
        top: 15,
    },
    forgotPassword: {
        textAlign: 'right',
        fontWeight: 'bold',
    },
    otherContainer: {
        flexDirection: 'row',
        paddingTop: 12,
    },
});