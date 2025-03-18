import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

// Importación de pantallas
import WelcomeScreen from '../screens/WelcomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Onboarding' screenOptions={{
                headerShown: false,
                gestureEnabled: false,
            }}>
                <Stack.Screen name='Onboarding' component={OnboardingScreen} />
                <Stack.Screen name='Welcome' component={WelcomeScreen} />
                <Stack.Screen name='Login' component={LoginScreen} />
                {/* Aquí agregarias el resto de pantallas */}
            </Stack.Navigator>
        </NavigationContainer>
    );
};