import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface NavigationButtonProps {
    label: string;
    type?: 'PrevButton' | 'SkipButton' | 'NextButton' | 'DoneButton';
    color: string;
    fontSize: number;
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({ label, type, color, fontSize }) => {
    return (
        <View style={styles.next}>
            {type === 'PrevButton' && <AntDesign name='left' size={15} color={color} />}
            <Text style={[styles.nextText, { fontSize, color }]}>{label}</Text>
            {type === 'DoneButton' && <AntDesign name='check' size={15} color={color} />}
            {(!type || type === 'NextButton') && <AntDesign name='right' size={15} color={color} />}
        </View>
    );
};

const styles = StyleSheet.create({
    next: {
        paddingTop: 12,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 5,
    },
    nextText: {
        fontWeight: '600',
    },
});
