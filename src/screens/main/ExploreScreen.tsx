import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

import { TabScreenProps } from '../../types/navigation';
import { useTheme } from '../../hooks/useTheme';

export default function ExploreScreen({ navigation, route }: TabScreenProps<'ExploreTab'>) {
    const { colors, theme } = useTheme();

    return (
        <View style={styles.container}>
            <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
                backgroundColor={colors.background}
            />
            <Text>Explore</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});