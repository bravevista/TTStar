import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import { useTheme } from '../../hooks/useTheme';
import { FeatureCarousel } from '../../components/specific/FeatureCarousel';
import { Button } from '../../components/common/Button';
import { Feature } from '../../types/feature';
import { ScreenProps } from '../../types/navigation';
import Header from '../../components/common/Header';

// Datos de características para el carrusel - HARDCODE
const FEATURES: Feature[] = [
  {
    id: '1',
    title: 'Diseño Intuitivo',
    description:
      'Interfaz fácil de usar con navegación fluida y diseño moderno',
    iconName: 'layers-outline',
    // Si prefieres usar una imagen:
    // imagePath: require('../assets/images/design.png'),
  },
  {
    id: '2',
    title: 'Personalización Total',
    description:
      'Adapta la aplicación a tus necesidades y preferencias personales',
    iconName: 'color-palette-outline',
  },
  {
    id: '3',
    title: 'Sincronización en la Nube',
    description:
      'Accede a tus datos desde cualquier dispositivo en tiempo real',
    iconName: 'cloud-outline',
  },
  {
    id: '4',
    title: 'Sincronización en la Nube',
    description:
      'Accede a tus datos desde cualquier dispositivo en tiempo real',
    iconName: 'cloud-outline',
  },
];

export default function WelcomeScreen({
  navigation,
  route,
}: ScreenProps<'Welcome'>) {
  const { colors, toggleTheme, theme, spacing, typography, shadows } =
    useTheme();
  const [scrollX] = useState(new Animated.Value(0));

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleRegister = () => {
    // Navegación a la pantalla de registro
    // navigation.navigate('Register');
    console.log('Navegando a Register');
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      <Header
        primaryColor={colors.primary}
        nameLogoColor={colors.text}
        nameLogoFontSize={typography.fontSizes.xl}
        toggleTheme={toggleTheme}
        colorCard={colors.card}
        shadows={shadows.sm}
        theme={theme}
      />
      {/* Header con logo y botón de tema
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/images/logo.png')} style={styles.logo} contentFit='contain' />
                    <Text style={[styles.nameLogo, { color: colors.text, fontSize: typography.fontSizes.xl }]}>
                        trustthreads
                    </Text>
                </View>
                <TouchableOpacity onPress={toggleTheme} style={[
                    styles.themeToggle, { backgroundColor: colors.card, ...shadows.sm }
                ]}>
                    <Ionicons name={theme === 'dark' ? 'sunny-outline' : 'moon-outline'} size={24} color={colors.primary} />
                </TouchableOpacity>
            </View> */}

      {/* Título de bienvenida
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
            </View> */}

      {/*  Carrusel de características */}
      <View style={styles.featuresSection}>
        <FeatureCarousel features={FEATURES} scrollX={scrollX} />
      </View>

      {/* Botones de acción */}
      <View style={styles.actionButtons}>
        <Button
          title="Iniciar sesión"
          variant="primary"
          fullWidth
          onPress={handleLogin}
        />
        <Button
          title="Registrarse"
          variant="outline"
          fullWidth
          onPress={handleRegister}
        />
      </View>

      {/* Política de privacidad y términos */}
      <TouchableOpacity style={styles.termsContainer}>
        <Text
          style={[
            styles.termsText,
            { color: colors.textSecondary, fontSize: typography.fontSizes.sm },
          ]}
        >
          Al continuar, aceptas nuestros Términos y Políticas de Privacidad
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: scale(10),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(10),
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: moderateScale(25),
    height: moderateScale(25),
    marginRight: scale(8),
  },
  nameLogo: {
    fontWeight: '400',
    fontStyle: 'italic',
  },
  themeToggle: {
    width: moderateScale(37),
    height: moderateScale(37),
    borderRadius: moderateScale(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuresSection: {
    flex: 1,
    marginVertical: verticalScale(20),
  },
  actionButtons: {
    paddingHorizontal: scale(20),
    marginVertical: verticalScale(20),
  },
  termsContainer: {
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(30),
    alignItems: 'center',
  },
  termsText: {
    textAlign: 'center',
  },
});
