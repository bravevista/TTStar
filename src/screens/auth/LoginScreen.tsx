import React, { useRef, useState } from 'react';
import Toast from 'react-native-toast-message';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Header from '../../components/common/Header';
import SignInSVG from '../../assets/svg/SignInSVG';
import { loginSchema } from '../../api/validation/auth.validator';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '../../components/common/Button';
import { NaviButton } from '../../components/common/NaviButton';
import { ScreenProps } from '../../types/navigation';
import { AuthModule } from '../../api/repository/auth.repository';
import { Credentials } from '../../api/interface/request/credentials.request';
import { UsersModule } from '../../api/repository/users.repository';
import { useUserStore } from '../../contexts/store/useUserStore';

export default function LoginScreen({
  navigation,
  route,
}: ScreenProps<'Login'>) {
  const { colors, toggleTheme, theme, typography, shadows } = useTheme();
  const { setUser } = useUserStore();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleFocus = (input: string) => setFocusedInput(input);
  const handleBlur = () => setFocusedInput(null);

  //Referencia para cada TextInput
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleWelcome = () => {
    navigation.navigate('Welcome');
  };

  // React Hook Form para manejar el formulario con las validaciones de ZOD
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const { data, mutate, isPending, error } = useMutation({
    mutationFn: AuthModule.signIn,
    onSuccess: async data => {
      try {
        const userData = await UsersModule.aboutMe();
        setUser(userData);
        Toast.show({
          type: 'success',
          text1: '¡Bienvenido!',
          text2: 'Has iniciado sesión correctamente.',
          position: 'bottom',
          visibilityTime: 2500,
        });
        console.log('Login exitoso:', data);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
        //navigation.replace('Main');
      } catch (err: any) {
        Toast.show({
          type: 'error',
          text1: 'Error al obtener los datos del usuario',
          text2: err.message || 'Intenta nuevamente',
        });
      }
    },
    onError: err => {
      Toast.show({
        type: 'error',
        text1: 'Error en el inicio de sesión.',
        text2: err.message || 'Credenciales incorrectas',
        position: 'bottom',
        visibilityTime: 4000,
      });
    },
  });

  const handleHome = (formData: Credentials) => {
    mutate(formData);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <View style={styles.navButton}>
        <NaviButton
          label="Anterior"
          type="PrevButton"
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
        <Text
          style={[
            styles.welcomeTitle,
            { color: colors.text, fontSize: typography.fontSizes.xxxl },
          ]}
        >
          ¡Bienvenido!
        </Text>
        <Text
          style={[
            styles.welcomeSubtitle,
            { color: colors.textSecondary, fontSize: typography.fontSizes.lg },
          ]}
        >
          Descubre todo lo que puedes hacer con nuestra aplicación
        </Text>
      </View>

      {/* Campo de EMAIL */}
      <View style={styles.inputContainer}>
        <Ionicons
          name="mail-sharp"
          size={20}
          color={focusedInput === 'email' ? colors.primary : '#aaa'}
          style={styles.icon}
        />
        <TextInput
          ref={emailInputRef}
          style={[
            styles.input,
            focusedInput === 'email' && { borderColor: colors.primary },
            { color: focusedInput === 'email' ? colors.primary : colors.text },
          ]}
          placeholder="Email"
          placeholderTextColor={colors.textSecondary}
          autoCapitalize="none"
          autoCorrect={false}
          onFocus={() => handleFocus('email')}
          onBlur={handleBlur}
          onChangeText={text => setValue('email', text)}
          onSubmitEditing={() => passwordInputRef.current?.focus()}
          submitBehavior="newline"
          returnKeyType="next"
        />
      </View>
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}

      {/* Campo de CONTRASEÑA */}
      <View style={styles.inputContainer}>
        <Ionicons
          name="lock-closed"
          size={20}
          color={focusedInput === 'password' ? colors.primary : '#aaa'}
          style={styles.icon}
        />
        <TextInput
          ref={passwordInputRef}
          style={[
            styles.input,
            focusedInput === 'password' && { borderColor: colors.primary },
            {
              color: focusedInput === 'password' ? colors.primary : colors.text,
            },
          ]}
          placeholder="Contraseña"
          placeholderTextColor={colors.textSecondary}
          secureTextEntry={!showPassword}
          autoCorrect={false}
          onFocus={() => handleFocus('password')}
          onBlur={handleBlur}
          onChangeText={text => setValue('password', text)}
          onSubmitEditing={handleSubmit(handleHome)}
          returnKeyType="go"
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.passwordToggle}
        >
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={20}
            color={focusedInput === 'password' ? colors.primary : '#aaa'}
            style={styles.icon2}
          />
        </TouchableOpacity>
      </View>
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}

      <View style={styles.inputContainer}>
        <Text style={[styles.forgotPassword, { color: colors.secondary }]}>
          ¿Olvidaste tu contraseña?
        </Text>
      </View>

      <Button
        title="Iniciar sesión"
        onPress={handleSubmit(handleHome)}
        disabled={isPending}
      />

      <View style={styles.otherContainer}>
        <Text style={{ color: colors.text }} selectable>
          ¿No tienes una cuenta?{' '}
        </Text>
        <Text
          style={[styles.forgotPassword, { color: colors.secondary }]}
          onPress={handleWelcome}
        >
          Registrate aquí
        </Text>
      </View>

      <Modal
        transparent={true}
        animationType="fade"
        visible={isPending}
        onRequestClose={() => {}}
      >
        <View style={styles.modalBackground}>
          <View
            style={[styles.modalContainer, { backgroundColor: colors.card }]}
          >
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={[styles.loadingText, { color: colors.text }]}>
              Iniciando sesión...
            </Text>
          </View>
        </View>
      </Modal>
      <Toast />
    </View>
  );
}

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
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: -10,
    marginBottom: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '70%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
  },
});
