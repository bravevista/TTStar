import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: 'primary' | 'secondary' | 'outline';
    loading?: boolean;
    fullWidth?: boolean;
};

export const Button = ({
    title,
    variant = 'primary',
    loading = false,
    fullWidth = false,
    style,
    ...rest
}: ButtonProps) => {
    const { colors, borderRadius, shadows, typography } = useTheme();

    const getButtonStyles = () => {
        switch (variant) {
            case 'primary':
                return {
                    backgroundColor: colors.primary,
                    ...shadows.md,
                };
            case 'secondary':
                return {
                    backgroundColor: colors.secondary,
                    ...shadows.md,
                };
            case 'outline':
                return {
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    borderColor: colors.primary,
                };
            default:
                return {
                    backgroundColor: colors.primary,
                    ...shadows.md,
                };
        };
    };

    const getTextStyles = () => {
        switch (variant) {
            case 'primary':
            case 'secondary':
                return {
                    color: '#FFFFFF',
                };
            case 'outline':
                return {
                    color: colors.primary,
                };
            default:
                return {
                    color: '#FFFFFF',
                };
        };
    };

    return (
        <TouchableOpacity style={[
            styles.button,
            getButtonStyles(),
            fullWidth && styles.fullWidth,
            style,
        ]} disabled = {loading} {...rest}>
            {loading ? (
                <ActivityIndicator 
                    color={variant === 'outline' ? colors.primary : '#FFFFFF'}
                />
            ): (
                <Text style={[
                    styles.text,
                    getTextStyles(),
                    { fontSize: typography.fontSizes.md }
                ]}
                >
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 54,
        paddingHorizontal: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8,
    },
    fullWidth: {
        width: '100%',
    },
    text: {
        fontWeight: '600',
    },
});