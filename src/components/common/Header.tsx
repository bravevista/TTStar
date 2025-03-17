import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LogoSVG from '../../assets/svg/LogoSVG';

export default function Header({
    primaryColor,
    nameLogoColor,
    nameLogoFontSize,
    toggleTheme,
    colorCard,
    shadows,
    theme,
    showLogoWithName = true, // Controla si se muestra el logo con el nombre
    showThemeButton = true, // Controla si se muestra el botón de tema
}: any) {
    return (
        <View style={styles.header}>
            {showLogoWithName && (
                <View style={styles.logoContainer}>
                    <LogoSVG primaryColor={primaryColor} />
                    <Text style={[styles.nameLogo, { color: nameLogoColor, fontSize: nameLogoFontSize }]}>
                        trustthreads
                    </Text>
                </View>
            )}
            {showThemeButton && (
                <TouchableOpacity onPress={toggleTheme} style={[
                    styles.themeToggle, { backgroundColor: colorCard, ...shadows } 
                ]}>
                    <Ionicons name={theme === 'dark' ? 'sunny-outline' : 'moon-outline'} size={24} color={primaryColor} />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
        gap: 12,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    nameLogo: {
        fontWeight: '400',
        fontStyle: 'italic'
    },
    themeToggle: {
        width: 37,
        height: 37,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});