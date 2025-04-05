import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from '../types/navigation';
import BottomTabNavigator from './BottomTabNavigator';
import AppearanceScreen from '../screens/extra/AppearanceScreen';
import PostModal from '../screens/mod/Post.modal';

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainAppNavigator() {
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
                    headerBackTitle: 'Atrás'
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