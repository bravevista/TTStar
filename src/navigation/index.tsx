import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';

const Stack = createStackNavigator();

export const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Welcome' screenOptions={{
                headerShown: false,
            }}>
                <Stack.Screen name='Welcome' component={WelcomeScreen} />
                {/* Aquí agregarias el resto de pantallas */}
            </Stack.Navigator>
        </NavigationContainer>
    );
};