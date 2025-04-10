import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity } from 'react-native';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

import BottomTabNavigator from './BottomTabNavigator';
import { useTheme } from '../hooks/useTheme';
import { MainStackParamList } from '../types/navigation';
import AppearanceScreen from '../screens/extra/AppearanceScreen';
import PostModal from '../screens/mod/Post.modal';
import FAQScreen from '../screens/extra/FAQScreen';
import HelpScreen from '../screens/extra/HelpScreen';
import FeedbackScreen from '../screens/extra/Feedback';
import SecurityPoliciesScreen from '../screens/extra/SecurityPoliciesScreen';
import TermsOfUseScreen from '../screens/extra/TermsOfUse';
import AccessibilityScreen from '../screens/extra/AccessibilityScreen';

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainAppNavigator() {
    const { colors } = useTheme();
    
    return (
        <Stack.Navigator
            initialRouteName='MainTabs'
            screenOptions={{
                headerShown: false,
                presentation: 'card' //Hay mas tipos como modal
            }}
        >
            {/* BottomTab Navigator como pantalla principal */}
            <Stack.Screen
                name='MainTabs'
                component={BottomTabNavigator}
                options={{ headerShown: false }}
            />

             {/* Pantallas de stack normales */}
            <Stack.Screen 
                name="Appearance" 
                component={AppearanceScreen} 
                options={{ 
                    headerShown: true,
                    headerTitle: 'Apariencia',
                    headerBackTitle: 'Atrás',
                    headerTintColor: colors.text,
                    headerStyle: { backgroundColor: colors.background },
                }}
            />
            <Stack.Screen 
                name="Accessibility"
                component={AccessibilityScreen} 
                options={{ 
                    headerShown: true,
                    headerTitle: 'Accesibilidad',
                    headerBackTitle: 'Atrás',
                    headerTintColor: colors.text,
                    headerStyle: { backgroundColor: colors.background },
                }}
            />
            <Stack.Screen 
                name="FAQ"
                component={FAQScreen} 
                options={{ 
                    headerShown: true,
                    headerTitle: 'Preguntas frecuentes',
                    headerBackTitle: 'Atrás',
                    headerTintColor: colors.text,
                    headerStyle: { backgroundColor: colors.background },
                }}
            />
            <Stack.Screen 
                name="Help"
                component={HelpScreen} 
                options={{ 
                    headerShown: true,
                    headerTitle: 'Ayuda',
                    headerBackTitle: 'Atrás',
                    headerTintColor: colors.text,
                    headerStyle: { backgroundColor: colors.background },
                }}
            />
            <Stack.Screen 
                name="Feedback"
                component={FeedbackScreen}
                options={{
                    animation: 'fade_from_bottom',
                }}
            />
            <Stack.Screen 
                name="SecurityPolicies"
                component={SecurityPoliciesScreen}
                options={{ 
                    headerShown: true,
                    headerTitle: 'Políticas de privacidad',
                    headerBackTitle: 'Atrás',
                    headerTintColor: colors.text,
                    headerStyle: { backgroundColor: colors.background },
                }}
            />
            <Stack.Screen 
                name="TermsOfUse"
                component={TermsOfUseScreen}
                options={{ 
                    headerShown: true,
                    headerTitle: 'Términos de uso',
                    headerBackTitle: 'Atrás',
                    headerTintColor: colors.text,
                    headerStyle: { backgroundColor: colors.background },
                }}
            />

            {/* Grupo para modales */}
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name="PostModal" component={PostModal} />
                {/* Agrega otros modales aquí */}
            </Stack.Group>
        </Stack.Navigator>
    );
};