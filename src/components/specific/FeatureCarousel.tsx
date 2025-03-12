import React from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';

const { width } = Dimensions.get('window');

interface Feature {
    id: string;
    title: string;
    description: string;
    icon: string;
};

interface FeatureCarouselProps {
    features: Feature[];
    scrollX: Animated.Value;
};

export const FeatureCarousel = ({ features, scrollX }: FeatureCarouselProps) => {
    const { colors, typography, shadows } = useTheme();

    // Función para renderizar cada slide del carrusel
    const renderFeatureItem = ({ item }: { item: Feature }) => {
        return (
            <View style={[]}>
                <View></View>
            </View>
        );
    };
};