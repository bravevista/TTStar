import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from '../types/navigation';
import MainAppNavigator from './MainAppNavigator';
import { navigationRef } from '../services/Navigation.service';

// Importación de pantallas de auth
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import LoginScreen from '../screens/auth/LoginScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator 
                initialRouteName='Onboarding' 
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
            >
                <Stack.Screen name='Onboarding' component={OnboardingScreen} options={{ animation: 'fade' }} />
                <Stack.Screen name='Welcome' component={WelcomeScreen} options={{ animation: 'fade_from_bottom' }} />
                <Stack.Screen name='Login' component={LoginScreen} options={{ animation: 'ios_from_right' }} />
                <Stack.Screen
                    name='Main'
                    component={MainAppNavigator}
                    options={{
                        gestureEnabled: false,
                        headerLeft: () => null,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};