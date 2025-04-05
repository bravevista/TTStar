import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, AntDesign } from '@expo/vector-icons';

import { RootTabParamList } from '../types/navigation';
import { useTheme } from '../hooks/useTheme';
import AnimatedTabBar from '../components/specific/AnimatedTabBar';

// Importaciones de pantallas
import HomeScreen from '../screens/main/HomeScreen';
import SearchScreen from '../screens/main/SearchScreen';
import ExploreScreen from '../screens/main/ExploreScreen';
import ContactsScreen from '../screens/main/ContactsScreen';
import ProfileScreen from '../screens/main/ProfileScreen';

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabNavigator() {
    const { colors } = useTheme();

    return (
        <Tab.Navigator 
            tabBar={(props) => <AnimatedTabBar {...props} />} 
            screenOptions={{
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textSecondary,
                tabBarStyle: {
                    backgroundColor: colors.card,
                    borderTopColor: colors.border,
                },
                headerShown: false,
            }}
        >
            <Tab.Screen 
                name="HomeTab" 
                component={HomeScreen} 
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home" color={color} size={21} />
                    ),
                    title: 'Inicio',
                }}
            />
            <Tab.Screen
                name="SearchTab" 
                component={SearchScreen} 
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="search" color={color} size={21} />
                    ),
                }}
            />
            <Tab.Screen 
                name="ExploreTab" 
                component={ExploreScreen} 
                options={{
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="find" color={color} size={21} />
                    ),
                }}
            />
            <Tab.Screen 
                name="ContactsTab" 
                component={ContactsScreen} 
                options={{
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="message1" color={color} size={21} />
                    ),
                }}
            />
            <Tab.Screen 
                name="ProfileTab" 
                component={ProfileScreen} 
                options={{
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="user" color={color} size={21} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};