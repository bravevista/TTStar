import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { TabScreenProps } from '../../types/navigation';

export default function ExploreScreen({ navigation, route }: TabScreenProps<'ExploreTab'>) {
    return (
        <View style={styles.container}>
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