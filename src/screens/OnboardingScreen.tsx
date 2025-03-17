import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, useWindowDimensions, StatusBar } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Image } from 'expo-image';

import slidesData from '../data/slides.data';
import { useTheme } from '../hooks/useTheme';
import { NavigationButton } from '../components/specific/onboarding/NavigationButton';
import { OnboardingScreenProps } from '../types/navigation';
import Header from '../components/common/Header';

type typeButton = 'PrevButton' | 'SkipButton' | 'NextButton' | 'DoneButton';

export default function OnboardingScreen({ navigation, route }: OnboardingScreenProps) {
    const { colors, toggleTheme, theme, typography, shadows } = useTheme();
    const { width, height } = useWindowDimensions();
    const [showHomepage, setShowHomePage] = useState(false);

    const buttonLabel = (label: string, type?: typeButton) => (
        <NavigationButton
            label={label}
            type={type}
            color={colors.primary}
            fontSize={typography.fontSizes.sm}
        />
    );

    useEffect(() => {
        if (showHomepage) {
            navigation.navigate('Welcome');
        };
    }, [showHomepage]);

    if (!showHomepage) {
        return (
            <AppIntroSlider 
                data={slidesData}
                renderItem={({ item }) => {
                    return (
                        <View style={[styles.container, { backgroundColor: colors.background }]}>
                            <StatusBar barStyle={theme ===  'dark' ? 'light-content' : 'dark-content'} 
                                backgroundColor={colors.background}
                            />
                            <Header 
                                primaryColor={colors.primary}
                                nameLogoColor={colors.text}
                                nameLogoFontSize={typography.fontSizes.xl}
                                showThemeButton={false}
                            />
                            <Image source={item.image} style={[styles.image, { width }]} contentFit='contain' />
                            <Text style={[styles.title, {
                                color: colors.text,
                                fontSize: typography.fontSizes.xl
                            }]}>
                                {item.title}
                            </Text>
                            <Text style={[styles.description, {
                                color: colors.textSecondary,
                                fontSize: typography.fontSizes.md
                            }]}>
                                {item.description}
                            </Text>
                            <View style={styles.toggleTheme}>
                                <Header 
                                    primaryColor={colors.primary}
                                    toggleTheme={toggleTheme} 
                                    colorCard={colors.card} 
                                    shadows={shadows.sm}
                                    theme={theme}
                                    showLogoWithName={false}
                                />
                            </View>
                        </View>
                    );
                }}
                activeDotStyle={{
                    backgroundColor: colors.primary,
                    width: 30,
                }}
                dotStyle={{
                    backgroundColor: colors.border
                }}
                renderNextButton={() => buttonLabel('Siguiente', 'NextButton')}
                showPrevButton={true}
                renderPrevButton={() => buttonLabel('Anterior', 'PrevButton')}
                renderDoneButton={() => buttonLabel('Listo', 'DoneButton')}
                onDone={() => {
                    setShowHomePage(true);
                }}
            />
        );
    };

    return null;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 400,
        justifyContent: 'center',
        transform: [{ translateY: -15 }],
    },
    title: {
        fontWeight: '600',
        marginBottom: 10,
        textAlign: 'center',
    },
    description: {
        textAlign: 'center',
        paddingHorizontal: 20,
        lineHeight: 22,
        marginBottom: 30,
    },
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
    toggleTheme: {
        flex: 1,
        position: 'absolute',
        top: 0,
        right: 0,
    },
});