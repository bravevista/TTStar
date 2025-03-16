import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import slidesData from '../data/slides.data';
import { useTheme } from '../hooks/useTheme';
import { RootStackParamList } from '../navigation';
import { NavigationButton } from '../components/specific/onboarding/NavigationButton';

type typeButton = 'PrevButton' | 'SkipButton' | 'NextButton' | 'DoneButton';
type NavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding'>;

export default function OnboardingScreen() {
    const { colors, typography } = useTheme();
    const { width, height } = useWindowDimensions();
    const [showHomepage, setShowHomePage] = useState(false);
    const navigation = useNavigation<NavigationProp>();

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
                        <View style={styles.container}>
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
                        </View>
                    );
                }}
                activeDotStyle={{
                    backgroundColor: colors.primary,
                    width: 30,
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
    },
    title: {
        fontWeight: '600',
        marginBottom: 10,
        textAlign: 'center',
    },
    description: {
        textAlign: 'center',
        paddingHorizontal: 20,
        lineHeight: 22
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
});