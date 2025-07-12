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
  PostDetails: { postId: string };
  Appearance: undefined;
  // Aquí añades pantallas que necesitan navegacion directa
};

export type RootTopTabParamList = {
  contactos: undefined;
  mensajes: undefined;
  solicitudes: undefined;
};

// Pantallas vinculadas al BottonNavigation
export type RootTabParamList = {
  HomeTab: undefined;
  SearchTab: undefined;
  ExploreTab: undefined;
  ContactsTab: undefined;
  ProfileTab: undefined;
};

// Pantallas a las que se puede acceder desde el BottomTab pero no estan en él
export type MainStackParamList = {
  MainTabs: undefined; // Pantalla que contiene el BottomTabNavigator
  ProfileUser: { uuid: string };
  EditProfile: { uuid: string };
  Appearance: undefined;
  Accessibility: undefined;
  FAQ: undefined;
  Help: undefined;
  Feedback: undefined;
  PrivacyPolicy: undefined;
  TermsOfUse: undefined;
  PostDetail: { uuid: string };
  PostModal: undefined;
  ShareExperiences: undefined;
};

// Props para los componentes de pantalla
export type ScreenProps<T extends keyof RootStackParamList> = {
  navigation: NativeStackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};

export type TabScreenProps<T extends keyof RootTabParamList> = {
  navigation: BottomTabNavigationProp<RootTabParamList, T>;
  route: RouteProp<RootTabParamList, T>;
};
