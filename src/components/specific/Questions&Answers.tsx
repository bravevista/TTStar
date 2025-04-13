import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, LayoutChangeEvent } from 'react-native';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, interpolate, Extrapolation, Easing } from 'react-native-reanimated';

import { useTheme } from '../../hooks/useTheme';

type FAQItem = {
    id: string;
    question: string;
    answer: string;
};

type FAQProps = {
    items: FAQItem[];
    duration?: number;
    easing?: (value: number) => number;
};

const AnimatedIcon = Animated.createAnimatedComponent(MaterialIcons);

export default function QuestionsAndAnswers({ items, duration = 300, easing = Easing.out(Easing.cubic) }: FAQProps) {
    const { colors, typography } = useTheme();
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [answerHeights, setAnswerHeights] = useState<Record<string, number>>({});
    const measurementViewRefs = useRef<Record<string, boolean>>({});
    
    // Inicializamos el registro de medidas
    useEffect(() => {
        const newMeasurementRefs: Record<string, boolean> = {};
        items.forEach(item => {
            newMeasurementRefs[item.id] = false;
        });
        measurementViewRefs.current = newMeasurementRefs;
    }, [items]);

    const toggleItem = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const handleMeasureLayout = (id: string, event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout;
        if (height > 0 && !measurementViewRefs.current[id]) {
            // Agregar un pequeño margen adicional para asegurar que todo el texto sea visible
            const heightWithMargin = height + verticalScale(10);
            setAnswerHeights(prev => ({ ...prev, [id]: heightWithMargin }));
            measurementViewRefs.current[id] = true;
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {items.map((item) => {
                const isExpanded = expandedId === item.id;
                const animationProgress = useSharedValue(0);

                useEffect(() => {
                    animationProgress.value = withTiming(
                        isExpanded ? 1 : 0,
                        { duration, easing }
                    );
                }, [isExpanded]);

                const answerStyle = useAnimatedStyle(() => {
                    return {
                        height: interpolate(
                            animationProgress.value,
                            [0, 1],
                            [0, answerHeights[item.id] || 0],
                            Extrapolation.CLAMP
                        ),
                        opacity: interpolate(
                            animationProgress.value,
                            [0, 0.5, 1],
                            [0, 0.5, 1],
                            Extrapolation.CLAMP
                        ),
                    };
                });

                const iconStyle = useAnimatedStyle(() => {
                    return {
                        transform: [{
                            rotate: `${interpolate(
                                animationProgress.value,
                                [0, 1],
                                [0, 180],
                                Extrapolation.CLAMP
                            )}deg`,
                        }],
                    };
                });

                return (
                    <View 
                        key={item.id}
                        style={[
                            styles.itemContainer, 
                            { borderColor: colors.card, backgroundColor: colors.background }, 
                            isExpanded && styles.expandedItem
                        ]}
                    >
                        <Pressable
                            onPress={() => toggleItem(item.id)}
                            style={({ pressed }) => [
                                styles.questionContainer,
                                pressed && styles.pressedQuestion,
                                { backgroundColor: pressed ? colors.card : colors.background }
                            ]}
                        >
                            <Text
                                style={[styles.questionText, { color: colors.text, fontWeight: typography.fontWeights.semibold }]}
                                numberOfLines={isExpanded ? undefined : 2}
                                ellipsizeMode='tail'
                            >
                                {item.question}
                            </Text>
                            <AnimatedIcon
                                name='keyboard-arrow-down'
                                size={moderateScale(24)}
                                color={colors.primary}
                                style={[iconStyle, styles.icon]}
                            />
                        </Pressable>

                        {/* Contenedor invisible para medir altura con precisión */}
                        <View
                            style={styles.measurementContainer}
                            onLayout={(event) => handleMeasureLayout(item.id, event)}
                        >
                            <View style={styles.measurementInner}>
                                <Text style={[styles.answerText, { color: colors.textSecondary, fontSize: typography.fontSizes.md }]}>
                                    {item.answer}
                                </Text>
                            </View>
                        </View>

                        {/* Contenedor animado visible para la respuesta */}
                        <Animated.View style={[styles.answerContainer, answerStyle]}>
                            <Text style={[styles.answerText, { color: colors.textSecondary, fontSize: typography.fontSizes.md }]}>
                                {item.answer}
                            </Text>
                        </Animated.View>
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: scale(320),
        paddingHorizontal: scale(16),
        paddingVertical: verticalScale(8),
    },
    itemContainer: {
        borderWidth: 2,
        borderRadius: moderateScale(15),
        marginBottom: verticalScale(10),
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
    },
    expandedItem: {
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
    },
    questionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: scale(18),
        paddingVertical: verticalScale(16),
        minHeight: verticalScale(56),
    },
    pressedQuestion: {
        opacity: 0.8,
    },
    questionText: {
        flex: 1,
        fontSize: moderateScale(16),
        marginRight: scale(12),
        lineHeight: moderateScale(22),
        letterSpacing: 0.2,
    },
    icon: {
        marginLeft: scale(4),
    },
    answerContainer: {
        paddingHorizontal: scale(18),
        paddingTop: 0,
        overflow: 'scroll',
    },
    answerText: {
        lineHeight: moderateScale(22),
        letterSpacing: 0.1,
    },
    measurementContainer: {
        position: 'absolute',
        opacity: 0,
        left: 0,
        right: 0,
        pointerEvents: 'none',
        zIndex: -999,
    },
    measurementInner: {
        paddingHorizontal: scale(18),
        paddingTop: verticalScale(2),
        paddingBottom: verticalScale(10),
    },
});