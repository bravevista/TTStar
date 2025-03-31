import React, { useEffect, useReducer, useRef } from 'react';
import { Pressable, StyleSheet, View, Text, LayoutChangeEvent } from 'react-native';
import { BottomTabBarProps, BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Animated, { useAnimatedStyle, withTiming, useDerivedValue } from 'react-native-reanimated';
import Lottie from 'lottie-react-native';
import { Svg } from 'react-native-svg';
import { Ionicons, AntDesign } from '@expo/vector-icons';

import { RootTabParamList } from '../types/navigation';
import { useTheme } from '../hooks/useTheme';
import AnimatedTabBar from '../components/specific/AnimatedTabBar';

// Importaciones de pantallas
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import ExploreScreen from '../screens/ExploreScreen';
import ContactsScreen from '../screens/ContactsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator<RootTabParamList>();
const AnimatedSVG = Animated.createAnimatedComponent(Svg);

export default function BottomTabNavigator() {
    const { colors } = useTheme();

    return (
        <Tab.Navigator tabBar={(props) => <AnimatedTabBar {...props} />} screenOptions={{
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.textSecondary,
            tabBarStyle: {
                backgroundColor: colors.card,
                borderTopColor: colors.border,
            },
            headerShown: false,
        }}>
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({ color }) => (
                    <Ionicons name="home" color={color} size={21} />
                ),
            }}/>
            <Tab.Screen name="Search" component={SearchScreen} options={{
                tabBarIcon: ({ color }) => (
                    <Ionicons name="search" color={color} size={21} />
                ),
            }}/>
            <Tab.Screen name="Explore" component={ExploreScreen} options={{
                tabBarIcon: ({ color }) => (
                    <AntDesign name="find" color={color} size={21} />
                ),
            }}/>
            <Tab.Screen name="Contacts" component={ContactsScreen} options={{
                tabBarIcon: ({ color }) => (
                    <AntDesign name="message1" color={color} size={21} />
                ),
            }}/>
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarIcon: ({ color }) => (
                    <AntDesign name="user" color={color} size={21} />
                ),
            }}/>
        </Tab.Navigator>
    );
};