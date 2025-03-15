import React from 'react';
import { StyleSheet, View, Text, Animated, useWindowDimensions } from 'react-native';
import { Slide } from '../../../types/slide';

export default function Paginator({ data, scrollX }: { data: Slide[], scrollX: Animated.Value }) {
    const { width } = useWindowDimensions();

    return (
        <View style={{ flexDirection: 'row', height: 64 }}>
            {data.map((_, i) => {
                const inputRange = [(i - 1) * width, i * width, (1 + i) * width];

                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [10, 20, 10],
                    extrapolate: 'clamp',
                });

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: 'clamp',
                });

                return <Animated.View style={[styles.dot, { width: dotWidth, opacity }]} key={i.toString()} />
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    dot: {
        height: 10,
        borderRadius: 5,
        backgroundColor: '#493d8a',
        marginHorizontal: 8,
    },
});