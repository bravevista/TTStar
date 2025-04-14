import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Modal, ActivityIndicator, StatusBar, ScrollView, Keyboard, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMutation } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { FontAwesome6 } from '@expo/vector-icons';
import Svg, { Line } from 'react-native-svg';
import Toast from 'react-native-toast-message';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import { useTheme } from '../../hooks/useTheme';
import { AuthModule } from '../../api/repository/auth.repository';
import VerifiedCheck from '../../assets/svg/VerifiedCheck';
import InfoButton from '../../components/common/InfoButton';
import { TabScreenProps, ScreenProps, RootStackParamList } from '../../types/navigation';

export default function ProfileScreen({ navigation, route }: TabScreenProps<'ProfileTab'>) {
    const { colors, typography, theme } = useTheme();
    const navigationTwo = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const { data, mutate, isPending, error } = useMutation({
        mutationFn: AuthModule.logout,
        onSuccess: (data) => {
            Toast.show({
                type: 'success',
                text1: '¡Sesión cerrada!',
                text2: 'Has cerrado la sesión correctamente.',
                position: 'bottom',
                visibilityTime: 2500,
            });
            console.log('Logout exitoso:', data);
            navigationTwo.reset({
                index: 0,
                routes: [{ name: 'Welcome' }],
            });
        },
        onError: (err) => {
            Toast.show({
                type: 'error',
                text1: 'Error al cerrar sesión.',
                text2: err.message || 'Error de recepción de credenciales.',
                position: 'bottom',
                visibilityTime: 4000,
            });
        },
    });

    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background2 }]}>
            <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
                backgroundColor={colors.background}
            />
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
                    <FontAwesome6 name='arrow-up-right-from-square' size={moderateScale(21)} color={colors.text} />
                </View>
            </View>
            
            <View style={[styles.optionContainer, { backgroundColor: colors.background }]}>
                <Text style={[styles.headerOption, { color: colors.text, fontSize: typography.fontSizes.xl }]}>General</Text>
                <View style={styles.optionWrapped}>
                    <InfoButton text='Apariencia' iconFamily='Octicons' iconName='paintbrush' navigateTo='Appearance' />
                    <InfoButton text='Accesibilidad' iconFamily='Octicons' iconName='accessibility' navigateTo='Accessibility' />
                </View>
            </View>

            <View style={[styles.optionContainer, { backgroundColor: colors.background }]}>
                <Text style={[styles.headerOption, { color: colors.text, fontSize: typography.fontSizes.xl }]}>Ayuda</Text>
                <View style={styles.optionWrapped}>
                    <InfoButton text='Preguntas frecuentes' iconFamily='MaterialCommunityIcons' iconName='head-question-outline' navigateTo='FAQ' />
                    <InfoButton text='Ayuda' navigateTo='Help' />
                    <InfoButton text='Feedback' iconFamily='MaterialCommunityIcons' iconName='message-bookmark-outline' navigateTo='Feedback' />
                    <InfoButton text='Política de privacidad' iconFamily='MaterialIcons' iconName='privacy-tip' navigateTo='PrivacyPolicy' />
                    <InfoButton text='Términos de uso' iconFamily='Ionicons' iconName='newspaper-outline' navigateTo='TermsOfUse' />
                </View>
            </View>
            
            <View style={[styles.optionContainer, { backgroundColor: colors.background }]}>
                <Text style={[styles.headerOption, { color: colors.text, fontSize: typography.fontSizes.xl }]}>Sesión</Text>
                <View style={styles.optionWrapped}>
                    <InfoButton text='Cerrar sesión' iconFamily='Entypo' iconName='log-out' textColor={colors.error} onPress={mutate} />
                </View>
            </View>

            <Text style={[styles.version, { color: colors.textSecondary }]}>Versión: 0.1.1 Alfa cerrada</Text>

            <Modal
                transparent={true}
                animationType="fade"
                visible={isPending}
                onRequestClose={() => {}}
            >
                <View style={styles.modalBackground}>
                    <View style={[styles.modalContainer, { backgroundColor: colors.card }]}>
                        <ActivityIndicator 
                            size="large" 
                            color={colors.primary} 
                        />
                        <Text style={[styles.loadingText, { color: colors.text }]}>
                            Cerrando sesión...
                        </Text>
                    </View>
                </View>
            </Modal>
            <Toast />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: verticalScale(10),
        gap: moderateScale(10),
    },
    profile: {
        width: scale(320),
        height: verticalScale(70),
        borderRadius: moderateScale(15),
        paddingHorizontal: scale(5),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    image: {
        width: moderateScale(50),
        height: moderateScale(50),
        borderRadius: 50,
        borderWidth: scale(3),
    },
    body: {
        width: scale(170),
    },
    data: {
        paddingHorizontal: scale(2),
    },
    name: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: moderateScale(7),
    },
    horizontalLine: {
        width: '100%',
        marginVertical: verticalScale(3),
    },
    verticalLine: {
        height: '50%',
        marginHorizontal: scale(1),
    },
    insigniaContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: scale(2),
        gap: moderateScale(10),
    },
    insignia: {
        flexDirection: 'row',
        gap: moderateScale(5),
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    icoInsignia: {
        width: moderateScale(14),
        height: moderateScale(14),
    },
    goProfile: {
        paddingRight: scale(10),
    },
    optionContainer: {
        flexDirection: 'column',
        paddingVertical: verticalScale(8),
        borderRadius: moderateScale(15),
        width: scale(320),
    },
    headerOption: {
        paddingVertical: verticalScale(8),
        paddingHorizontal: scale(18),
        fontWeight: 'bold'
    },
    optionWrapped: {
        gap: moderateScale(0),
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: scale(250),
        padding: moderateScale(18),
        borderRadius: moderateScale(10),
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    loadingText: {
        marginTop: verticalScale(15),
        fontSize: moderateScale(16),
    },
    version: {
        paddingBottom: verticalScale(20),
    },
});