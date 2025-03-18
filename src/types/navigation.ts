import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

// Definición de todas las rutas disponibles en la aplicación
export type RootStackParamList = {
    Onboarding: undefined;
    Welcome: undefined;
    Login: undefined;
    Register: undefined;
    Home: undefined;
    // Aquí añades más rutas según vayas creando pantallas
};

// Tipos de propiedades de navegación para cada pantalla
export type OnboardingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;
export type WelcomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;
export type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
export type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;
export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

// Tipos de propiedades de ruta para cada pantalla
export type OnboardingScreenRouteProp = RouteProp<RootStackParamList, 'Onboarding'>;
export type WelcomeScreenRouteProp = RouteProp<RootStackParamList, 'Welcome'>;
export type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;
export type RegisterScreenRouteProp = RouteProp<RootStackParamList, 'Register'>;
export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

// Props para los componentes de pantalla
export interface OnboardingScreenProps {
    navigation: OnboardingScreenNavigationProp;
    route: OnboardingScreenRouteProp;
};

export interface WelcomeScreenProps {
    navigation: WelcomeScreenNavigationProp;
    route: WelcomeScreenRouteProp;
};

export interface LoginScreenProps {
    navigation: LoginScreenNavigationProp;
    route: LoginScreenRouteProp;
};

export interface RegisterScreenProps {
    navigation: RegisterScreenNavigationProp;
    route: RegisterScreenRouteProp;
};

export interface HomeScreenProps {
    navigation: HomeScreenNavigationProp;
    route: HomeScreenRouteProp;
};