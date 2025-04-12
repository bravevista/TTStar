import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import { Entypo, Feather } from '@expo/vector-icons';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { useTheme } from '../../hooks/useTheme';
import StackHeader from '../../components/common/StackHeader';
import { ThemeMode } from '../../types/theme';

const availableColors = [
    '#007AFF', '#34C759', '#FF9500', '#AF52DE', '#FF375F',
    '#FF2D55', '#5AC8FA', '#6B4CE6', '#FFCC00', '#FF3B30',
];
const themeOptions = [
    { key: 'auto', label: 'Automático', icon: 'settings' },
    { key: 'light', label: 'Claro', icon: 'sun' },
    { key: 'dark', label: 'Oscuro', icon: 'moon' },
];

export default function AppearanceScreen() {
    const { colors, typography, theme, toggleTheme, themeMode } = useTheme();
    const [selectedColor, setSelectedColor] = useState(colors.primary);
    const [tempColor, setTempColor] = useState(colors.primary); //para aplicar luego
    const [pickerOpen, setPickerOpen] =useState(false);

    const themeButtonRef = useRef<View>(null);
    const [themePickerOpen, setThemePickerOpen] = useState(false);
    const [themePickerPosition, setThemePickerPosition] = useState({ x: 0, y: 0 });

    const handleColorSelect = (color: string) => {
        setTempColor(color);
    };

    const applyColorChange = () => {
        setSelectedColor(tempColor);
        setPickerOpen(false);
        // Aquí puedes guardar en asyncStorage o en el context si lo usás
    };

    const handleThemePress = () => {
        themeButtonRef.current?.measureInWindow((x, y, width, height) => {
            const popoverWidth = scale(200);
            setThemePickerPosition({
                x: x + width - popoverWidth,
                y: y + height - verticalScale(42),
            });
            setThemePickerOpen(prev => !prev);
        });
    };

    const handleThemeSelect = (mode: ThemeMode) => {
        toggleTheme(mode);
        setThemePickerOpen(false);
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
                backgroundColor={colors.background}
            />

            <StackHeader
                title="Apariencia"
                iconFamiliy="Octicons"
                iconName="paintbrush"
                showBackButton
            />

            <ScrollView contentContainerStyle={[styles.subContainer, { backgroundColor: colors.background }]}>
                <View style={styles.header}>
                    <Text style={[{ color: colors.text, fontSize: typography.fontSizes.xxl, fontWeight: typography.fontWeights.bold }]}>
                        ¡Personaliza tu experiencia!
                    </Text>
                </View>

                <View style={[styles.themeContainer, styles.modeTwo, { borderColor: colors.textSecondary }]}>
                    <Text style={[{ color: colors.text, fontSize: typography.fontSizes.md, fontWeight: typography.fontWeights.medium }]}>
                        Tema
                    </Text>
                    <TouchableOpacity
                        onPress={handleThemePress}
                        ref={themeButtonRef}
                        style={[styles.themePicker, { borderColor: colors.textSecondary }]}
                    >
                        <Feather name={themeOptions.find(opt => opt.key === themeMode)?.icon as any ?? 'settings'} size={moderateScale(20)} color={colors.text} />
                        <Text style={[{ color: colors.text }]}>{themeOptions.find(opt => opt.key === themeMode)?.label as string}</Text>
                        <Entypo name={themePickerOpen ? 'chevron-up' : 'chevron-down'} size={moderateScale(20)} color={colors.text} />
                    </TouchableOpacity>
                </View>

                {/* {themePickerOpen && (
                    <View style={styles.themeDropdown}>
                        {themeOptions.map(option => (
                            <TouchableOpacity
                                key={option.key}
                                onPress={() => {
                                    toggleTheme(option.key as ThemeMode);
                                    setThemePickerOpen(false);
                                    // guardar en context o asyncStorage aquí si quieres
                                }}
                                style={[
                                    styles.themeOption,
                                    themeMode === option.key && { backgroundColor: colors.card }
                                ]}
                            >
                                <Feather name={option.icon as any} size={18} color={colors.text} />
                                <Text style={[{ color: colors.text, marginLeft: scale(10) }]}>{option.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )} */}

                {themePickerOpen && (
                    <Animated.View
                        entering={FadeIn.duration(150)}
                        exiting={FadeOut.duration(150)}
                        style={[styles.themePopover, { 
                            backgroundColor: colors.background,
                            borderColor: colors.textSecondary,
                            left: themePickerPosition.x,
                            top: themePickerPosition.y,
                            shadowColor: colors.text,
                        }]}
                    >
                        {themeOptions.map(option => (
                            <TouchableOpacity
                                key={option.key}
                                onPress={() => handleThemeSelect(option.key as ThemeMode)}
                                style={[
                                    styles.themeOption,
                                    themeMode === option.key && { backgroundColor: colors.card }
                                ]}
                            >
                                <Feather name={option.icon as any} size={moderateScale(18)} color={colors.text} />
                                <Text style={[{ color: colors.text, marginLeft: scale(10) }]}>{option.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </Animated.View>
                )}

                <View style={[styles.colorPrimaryContainer, { borderColor: colors.textSecondary }, pickerOpen ? styles.modeOne : styles.modeTwo]}>
                    <Text style={[{ color: colors.text, fontSize: typography.fontSizes.md, fontWeight: typography.fontWeights.medium }]}>
                        Color principal
                    </Text>
                    <TouchableOpacity
                        onPress={() => setPickerOpen(!pickerOpen)}
                        style={[styles.pickerContainer, { borderColor: colors.textSecondary }]}
                    >
                        <View style={[styles.colorCircle, {
                            backgroundColor: selectedColor,
                            borderColor: colors.text
                        }]} />
                        <Entypo name={pickerOpen ? 'chevron-up' : 'chevron-down'} color={colors.text} />
                    </TouchableOpacity>
                </View>

                {pickerOpen && (
                    <View style={[styles.dropDown, { backgroundColor: colors.background2, borderColor: colors.textSecondary }]}>
                        <View style={styles.colorPalette}>
                            {availableColors.map(color => (
                                <TouchableOpacity
                                    key={color}
                                    onPress={() => handleColorSelect(color)}
                                    style={[styles.colorOption, { backgroundColor: color }, tempColor === color && styles.selectedOption]}
                                />
                            ))}
                        </View>

                        <TouchableOpacity
                            onPress={applyColorChange}
                            style={[styles.applyButton, { backgroundColor: tempColor }]}
                        >
                            <Text style={{ color: '#fff', fontWeight: typography.fontWeights.bold }}>
                                Aplicar
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: verticalScale(5),
        paddingBottom: verticalScale(20),
        paddingHorizontal: scale(21),
    },
    header: {
        paddingBottom: verticalScale(10),
    },
    themeContainer: {
        width: scale(300),
        height: verticalScale(45),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scale(10),
        marginBottom: verticalScale(10),
    },
    themePicker: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: moderateScale(10),
        padding: moderateScale(6),
        gap: scale(8),
    },
    themeDropdown: {
        width: scale(300),
        borderRadius: moderateScale(10),
        padding: scale(8),
        gap: verticalScale(6),
        marginBottom: verticalScale(10),
    },
    themePopover: {
        position: 'absolute',
        width: scale(200),
        borderRadius: moderateScale(10),
        padding: scale(8),
        gap: verticalScale(6),
        borderWidth: 1,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 100,
    },
    themeOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: verticalScale(6),
        paddingHorizontal: scale(10),
        borderRadius: moderateScale(8),
    },
    colorPrimaryContainer: {
        width: scale(300),
        height: verticalScale(45),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scale(10),
    },
    modeOne: {
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopLeftRadius: moderateScale(15),
        borderTopRightRadius: moderateScale(15),
    },
    modeTwo: {
        borderWidth: 1,
        borderRadius: moderateScale(15),
    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: moderateScale(6),
        borderRadius: moderateScale(20),
        borderWidth: 1,
        gap: moderateScale(5),
    },
    colorCircle: {
        width: scale(21),
        height: scale(18),
        borderRadius: scale(18),
        borderWidth: 2,
    },
    dropDown: {
        width: scale(300),
        padding: scale(15),
        borderWidth: 1,
        borderBottomLeftRadius: moderateScale(15),
        borderBottomRightRadius: moderateScale(15),
        gap: verticalScale(10),
    },
    colorPalette: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: scale(12),
        justifyContent: 'flex-start',
    },
    colorOption: {
        width: scale(32),
        height: scale(32),
        borderRadius: scale(16),
        borderWidth: 2,
        borderColor: '#fff',
    },
    selectedOption: {
        borderWidth: 2,
        borderColor: '#000',
    },
    applyButton: {
        alignSelf: 'flex-end',
        paddingVertical: verticalScale(6),
        paddingHorizontal: scale(16),
        borderRadius: moderateScale(10),
    },
});