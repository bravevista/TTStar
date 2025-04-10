import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

import { TabScreenProps } from '../../types/navigation';
import { useTheme } from '../../hooks/useTheme';

export default function ContactsScreen({ navigation, route }: TabScreenProps<'ContactsTab'>) {
    const { colors, theme } = useTheme();

    return (
        <View style={styles.container}>
            <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
                backgroundColor={colors.background}
            />
            <Text>Contacts</Text>
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