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
            <View style={[styles.featureContainer, { width }]}>
                <View style={[styles.iconContainer, {
                    backgroundColor: colors.primary + '20', // Color primario con opacidad
                    shadowColor: colors.primary
                }]}>
                    <Ionicons name={item.icon as any} size={40} color={colors.primary} />
                </View>
                <Text style={[styles.featureTitle, {
                    color: colors.text,
                    fontSize: typography.fontSizes.xl
                }]}>
                    {item.title}
                </Text>
                <Text style={[styles.featureDescription, {
                    color: colors.textSecondary,
                    fontSize: typography.fontSizes.md
                }]}>
                    {item.description}
                </Text>
            </View>
        );
    };

    // Calculamos la posición para los indicadores del carrusel
    const indicatorPositon = scrollX.interpolate({
        inputRange: [0, width, width * 2],
        outputRange: [0, 20, 40],
    });

    return (
        <View style={styles.container}>
            <Animated.FlatList 
                data={features} renderItem={renderFeatureItem} keyExtractor={(item) => item.id}
                horizontal pagingEnabled showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
            />
            {/* Indicadores del carrusel */}
            <View style={styles.indicatorsContainer}>
                <Animated.View style={[
                    styles.indicator,
                    styles.activeIndicator,
                    { backgroundColor: colors.primary, transform: [{ translateX: indicatorPositon }], }
                ]}/>
                {features.map((_, i) => (
                    <View key={i} style={[
                        styles.indicator, { backgroundColor: colors.inactive }
                    ]}/>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    featureContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    featureTitle: {
        fontWeight: '600',
        marginBottom: 10,
        textAlign: 'center',
    },
    featureDescription: {
        textAlign: 'center',
        paddingHorizontal: 20,
        lineHeight: 22,
    },
    indicatorsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 20,
        position: 'relative',
    },
    indicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    activeIndicator: {
        position: 'absolute',
        zIndex: 1,
    },
});