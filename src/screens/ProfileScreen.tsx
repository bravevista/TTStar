import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { FontAwesome6 } from '@expo/vector-icons';
import Svg, { Line } from 'react-native-svg';

import { useTheme } from '../hooks/useTheme';
import VerifiedCheck from '../assets/svg/VerifiedCheck';
import InfoButton from '../components/common/InfoButton';

export default function ProfileScreen() {
    const { colors, typography } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background2 }]}>
            <View style={[styles.profile, { backgroundColor: colors.background }]}>
                <View>
                    <Image source={'https://img.freepik.com/free-vector/night-ocean-landscape-full-moon-stars-shine_107791-7397.jpg'} style={[styles.image, { borderColor: colors.primary }]} contentFit='cover' />
                </View>
                <View style={styles.body}>
                    <View style={styles.data}>
                        <View style={styles.name}>
                            <Text style={[{ color: colors.text, fontSize: typography.fontSizes.lg, fontWeight: typography.fontWeights.bold }]}>Edson Gutierrez</Text>
                            <VerifiedCheck primaryColor={colors.primary} size={20} />
                        </View>
                        <Text style={[{ color: colors.text, fontSize: typography.fontSizes.sm }]}>@edssonmoon</Text>
                    </View>
                    <Svg height={2} style={styles.horizontalLine} pointerEvents="none">
                        <Line
                            x1="0" y1="0" x2="100%" y2="0"
                            stroke={colors.text}
                            strokeWidth="2"
                        />
                    </Svg>
                    <View style={styles.insigniaContainer}>
                        <View style={styles.insignia}>
                            <Image source={'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/UNMSM_coatofarms_seal.svg/514px-UNMSM_coatofarms_seal.svg.png'} style={styles.icoInsignia} contentFit='contain' />
                            <Text style={[{ color: colors.textSecondary }]}>UNMSM</Text>
                        </View>
                        <View style={styles.insignia}>
                            <Image source={'https://procsoft.wordpress.com/wp-content/uploads/2019/10/cropped-logo-fisi-3.png?w=240'} style={styles.icoInsignia} contentFit='fill' />
                            <Text style={[{ color: colors.textSecondary }]}>FISI</Text>
                        </View>
                    </View>
                </View>

                <Svg width={2} style={styles.verticalLine}>
                    <Line
                        x1="0" y1="0"
                        x2="0" y2="100%"
                        stroke={colors.text}
                        strokeWidth="2"
                    />
                </Svg>

                <View style={styles.goProfile}>
                    <FontAwesome6 name='arrow-up-right-from-square' size={25} color={colors.text} />
                </View>
            </View>
            
            <View style={[styles.optionContainer, { backgroundColor: colors.background }]}>
                <Text style={[styles.headerOption, { color: colors.text, fontSize: typography.fontSizes.xl }]}>General</Text>
                <View style={styles.optionWrapped}>
                    <InfoButton text='Apariencia' iconFamily='Octicons' iconName='paintbrush' />
                </View>
            </View>

            <View style={[styles.optionContainer, { backgroundColor: colors.background }]}>
                <Text style={[styles.headerOption, { color: colors.text, fontSize: typography.fontSizes.xl }]}>Ayuda</Text>
                <View style={styles.optionWrapped}>
                    <InfoButton text='Preguntas frecuentes' iconFamily='MaterialCommunityIcons' iconName='head-question-outline' />
                    <InfoButton text='Ayuda' />
                    <InfoButton text='Feedback' iconFamily='MaterialCommunityIcons' iconName='message-bookmark-outline' />
                    <InfoButton text='Políticas de privacidad' iconFamily='MaterialIcons' iconName='privacy-tip' />
                    <InfoButton text='Términos de uso' iconFamily='Ionicons' iconName='newspaper-outline' />
                </View>
            </View>
            
            <View style={[styles.optionContainer, { backgroundColor: colors.background }]}>
                <Text style={[styles.headerOption, { color: colors.text, fontSize: typography.fontSizes.xl }]}>Sesión</Text>
                <View style={styles.optionWrapped}>
                    <InfoButton text='Cerrar sesión' iconFamily='Entypo' iconName='log-out' />
                </View>
            </View>

            <Text style={[{ color: colors.textSecondary }]}>Versión: 0.1.1 Alfa cerrada</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        top: 10,
        gap: 10,
    },
    profile: {
        width: 420,
        height: 85,
        borderRadius: 15,
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    image: {
        width: 55,
        height: 55,
        borderRadius: 50,
        borderWidth: 3,
    },
    body: {
        width: 220,
    },
    data: {
        paddingHorizontal: 2,
    },
    name: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 7,
    },
    horizontalLine: {
        width: '100%',
        marginVertical: 3,
    },
    verticalLine: {
        height: '50%',
        marginHorizontal: 1,
    },
    insigniaContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: 3,
        gap: 10,
    },
    insignia: {
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    icoInsignia: {
        width: 15,
        height: 15,
    },
    goProfile: {
        paddingRight: 10,
    },
    optionContainer: {
        flexDirection: 'column',
        paddingVertical: 10,
        borderRadius: 15,
        width: 420,
    },
    headerOption: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontWeight: 'bold'
    },
    optionWrapped: {
        gap: 5,
    },
});