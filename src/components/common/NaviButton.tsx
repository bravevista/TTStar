import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface NaviButtonProps {
    label: string;
    type?: 'PrevButton' | 'SkipButton' | 'NextButton' | 'DoneButton';
    color: string;
    fontSize: number;
    onPress: () => void;
}

export const NaviButton: React.FC<NaviButtonProps> = ({ label, type, color, fontSize, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.7}>
            {type === 'PrevButton' && <AntDesign name='left' size={15} color={color} />}
            <Text style={[styles.text, { fontSize, color }]}>{label}</Text>
            {type === 'DoneButton' && <AntDesign name='check' size={15} color={color} />}
            {(!type || type === 'NextButton') && <AntDesign name='right' size={15} color={color} />}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 5,
        backgroundColor: 'transparent',
    },
    text: {
        fontWeight: '600',
    },
});
