import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

// Definición de todas las rutas disponibles en la aplicación
export type RootStackParamList = {
    Onboarding: undefined;
    Welcome: undefined;
    Login: undefined;
    Register: undefined;
    Main: undefined;
    // Aquí añades más rutas según vayas creando pantallas
};

export type RootTabParamList = {
    Home: undefined;
    Search: undefined;
    Explore: undefined;
    Contacts: undefined;
    Profile: undefined;
};

// Tipos de propiedades de navegación para cada pantalla
export type OnboardingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;
export type WelcomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;
export type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
export type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;
export type HomeScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Home'>;
export type SearchScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Search'>;
export type ExploreScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Explore'>;
export type ContactsScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Contacts'>;
export type ProfileScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Profile'>;

// Tipos de propiedades de ruta para cada pantalla
export type OnboardingScreenRouteProp = RouteProp<RootStackParamList, 'Onboarding'>;
export type WelcomeScreenRouteProp = RouteProp<RootStackParamList, 'Welcome'>;
export type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;
export type RegisterScreenRouteProp = RouteProp<RootStackParamList, 'Register'>;
export type HomeScreenRouteProp = RouteProp<RootTabParamList, 'Home'>;
export type SearchScreenRouteProp = RouteProp<RootTabParamList, 'Search'>;
export type ExploreScreenRouteProp = RouteProp<RootTabParamList, 'Explore'>;
export type ContactsScreenRouteProp = RouteProp<RootTabParamList, 'Contacts'>;
export type ProfileScreenRouteProp = RouteProp<RootTabParamList, 'Profile'>;

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

export interface SearchScreenProps {
    navigation: SearchScreenNavigationProp;
    route: SearchScreenRouteProp;
};