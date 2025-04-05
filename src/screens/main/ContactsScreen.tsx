import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { TabScreenProps } from '../../types/navigation';

export default function ContactsScreen({ navigation, route }: TabScreenProps<'ContactsTab'>) {
    return (
        <View style={styles.container}>
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