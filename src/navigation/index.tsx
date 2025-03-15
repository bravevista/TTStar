import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';

const Stack = createStackNavigator();

export const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Onboarding' screenOptions={{
                headerShown: false,
            }}>
                <Stack.Screen name='Onboarding' component={OnboardingScreen} />
                <Stack.Screen name='Welcome' component={WelcomeScreen} />
                {/* Aquí agregarias el resto de pantallas */}
            </Stack.Navigator>
        </NavigationContainer>
    );
};