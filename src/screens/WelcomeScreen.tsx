import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { FeatureCarousel } from '../components/specific/FeatureCarousel';
import { Button } from '../components/common/Button';

// Datos de características para el carrusel - HARDCODE
const FEATURES = [
    {
        id: '1',
        title: 'Diseño Intuitivo',
        description: 'Interfaz fácil de usar con navegación fluida y diseño moderno',
        icon: 'layers-outline',
    },
    {
        id: '2',
        title: 'Personalización Total',
        description: 'Adapta la aplicación a tus necesidades y preferencias personales',
        icon: 'color-palette-outline',
    },
    {
        id: '3',
        title: 'Sincronización en la Nube',
        description: 'Accede a tus datos desde cualquier dispositivo en tiempo real',
        icon: 'cloud-outline',
    },
];

const WelcomeScreen = ({ navigation }: any) => {
    const { colors, toggleTheme, theme, spacing, typography, shadows } = useTheme();
    const [scrollX] = useState(new Animated.Value(0));

    const handleLogin = () => {
        // Navegación a la pantalla de inicio de sesión
        // navigation.navigate('Login');
        console.log('Navegando a Login');
    };

    const handleRegister = () => {
        // Navegación a la pantalla de registro
        // navigation.navigate('Register');
        console.log('Navegando a Register');
    };

    return (
        <View style={[
            styles.container, { backgroundColor: colors.background },
        ]}>
            <StatusBar barStyle={theme ===  'dark' ? 'light-content' : 'dark-content'} 
                backgroundColor={colors.background}
            />

            {/* Header con logo y botón de tema */}
            <View style={styles.header}>
                <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode='contain' />
                <TouchableOpacity onPress={toggleTheme} style={[
                    styles.themeToggle, { backgroundColor: colors.card, ...shadows.sm }
                ]}>
                    <Ionicons name={theme === 'dark' ? 'sunny-outline' : 'moon-outline'} size={24} color={colors.primary} />
                </TouchableOpacity>
            </View>

            {/* Título de bienvenida */}
            <View style={styles.welcomeSection}>
                <Text style={[
                    styles.welcomeSection, { color: colors.text, fontSize: typography.fontSizes.xxxl }
                ]}>
                    !Bienvenido!
                </Text>
                <Text style={[
                    styles.welcomeSubtitle, { color: colors.textSecondary, fontSize: typography.fontSizes.lg }
                ]}>
                    Descubre todo lo que puedes hacer con nuestra aplicación
                </Text>
            </View>

            {/*  Carrusel de características */}
            <View style={styles.featuresSection}>
                <FeatureCarousel features={FEATURES} scrollX={scrollX} />
            </View>

            {/* Botones de acción */}
            <View style={styles.actionButtons}>
                <Button title='Iniciar sesión' variant='primary' fullWidth onPress={handleLogin} />
                <Button title='Registrarse' variant='outline' fullWidth onPress={handleRegister} />
            </View>

            {/* Política de privacidad y términos */}
            <TouchableOpacity style={styles.termsContainer}>
                <Text style={[
                    styles.termsText, { color: colors.textSecondary, fontSize: typography.fontSizes.sm }
                ]}>
                    Al continuar, aceptas nuestros Términos y Políticas de Privacidad
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    logo: {
        width: 120,
        height: 40,
    },
    themeToggle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeSection: {
        paddingHorizontal: 20,
        marginTop: 30,
        marginBottom: 20,
    },
    welcomeTitle: {
        fontWeight: '700',
        marginBottom: 8,
    },
    welcomeSubtitle: {
        fontWeight: '400',
        lineHeight: 24,
    },
    featuresSection: {
        flex: 1,
        marginVertical: 20,
    },
    actionButtons: {
        paddingHorizontal: 20,
        marginVertical: 20,
    },
    termsContainer: {
        paddingHorizontal: 20,
        paddingBottom: 30,
        alignItems: 'center',
    },
    termsText: {
        textAlign: 'center',
    },
});

export default WelcomeScreen;