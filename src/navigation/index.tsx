import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';

export type RootStackParamList = {
    Onboarding: undefined;
    Welcome: undefined;
    Login: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Onboarding' screenOptions={{
                headerShown: false,
            }}>
                <Stack.Screen name='Onboarding' component={OnboardingScreen} />
                <Stack.Screen name='Welcome' component={WelcomeScreen} />
                <Stack.Screen name='Login' component={LoginScreen} />
                {/* Aquí agregarias el resto de pantallas */}
            </Stack.Navigator>
        </NavigationContainer>
    );
};