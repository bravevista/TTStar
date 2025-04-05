import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import MainAppNavigator from './MainAppNavigator';

// Importación de pantallas de auth
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import LoginScreen from '../screens/auth/LoginScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName='Onboarding' 
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
            >
                <Stack.Screen name='Onboarding' component={OnboardingScreen} />
                <Stack.Screen name='Welcome' component={WelcomeScreen} />
                <Stack.Screen name='Login' component={LoginScreen} />
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