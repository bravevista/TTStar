import React from 'react';
import { StyleSheet, View } from 'react-native';
import Onboarding from '../components/specific/onboarding/Onboarding';

export default function OnboardingScreen() {
    return (
        <View style={styles.container}>
            <View>
                <Onboarding />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});