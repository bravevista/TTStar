import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ActivityIndicator,
  StatusBar,
  ScrollView,
  Pressable,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '../../hooks/useTheme';
import { AuthModule } from '../../api/repository/auth.repository';
import InfoButton from '../../components/common/InfoButton';
import {
  TabScreenProps,
  ScreenProps,
  RootStackParamList,
} from '../../types/navigation';
import PresentationProfile from '../../components/specific/PresentationProfile';
import MainHeader from '../../components/common/MainHeader';
import { AnnaModule } from '../../api/repository/anna.repository';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ProfileScreen({
  navigation,
  route,
}: TabScreenProps<'ProfileTab'>) {
  const { colors, typography, theme } = useTheme();
  const navigationTwo =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { data, mutate, isPending, error } = useMutation({
    mutationFn: AuthModule.signOut,
    onSuccess: async data => {
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
    onError: err => {
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
    <SafeAreaView
      edges={['top']}
      style={{ flex: 1, backgroundColor: colors.background2 }}
    >
      <MainHeader />

      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: colors.background2, width: SCREEN_WIDTH },
        ]}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar
          barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor={colors.background}
        />

        <PresentationProfile
          leftNavigateTo="EditProfile"
          rightNavigateTo="ProfileUser"
        />

        <View
          style={[
            styles.optionContainer,
            { backgroundColor: colors.background, width: SCREEN_WIDTH * 0.98 },
          ]}
        >
          <Text
            style={[
              styles.headerOption,
              { color: colors.text, fontSize: typography.fontSizes.xl },
            ]}
          >
            General
          </Text>
          <View style={styles.optionWrapped}>
            <InfoButton
              text="Apariencia"
              iconFamily="Octicons"
              iconName="paintbrush"
              navigateTo="Appearance"
            />
            <InfoButton
              text="Accesibilidad"
              iconFamily="Octicons"
              iconName="accessibility"
              navigateTo="Accessibility"
            />
          </View>
        </View>

        <View
          style={[
            styles.optionContainer,
            { backgroundColor: colors.background, width: SCREEN_WIDTH * 0.98 },
          ]}
        >
          <Text
            style={[
              styles.headerOption,
              { color: colors.text, fontSize: typography.fontSizes.xl },
            ]}
          >
            Ayuda
          </Text>
          <View style={styles.optionWrapped}>
            <InfoButton
              text="Preguntas frecuentes"
              iconFamily="MaterialCommunityIcons"
              iconName="head-question-outline"
              navigateTo="FAQ"
            />
            <InfoButton text="Ayuda" navigateTo="Help" />
            <InfoButton
              text="Feedback"
              iconFamily="MaterialCommunityIcons"
              iconName="message-bookmark-outline"
              navigateTo="Feedback"
            />
            <InfoButton
              text="Política de privacidad"
              iconFamily="MaterialIcons"
              iconName="privacy-tip"
              navigateTo="PrivacyPolicy"
            />
            <InfoButton
              text="Términos de uso"
              iconFamily="Ionicons"
              iconName="newspaper-outline"
              navigateTo="TermsOfUse"
            />
          </View>
        </View>

        <View
          style={[
            styles.optionContainer,
            { backgroundColor: colors.background, width: SCREEN_WIDTH * 0.98 },
          ]}
        >
          <Text
            style={[
              styles.headerOption,
              { color: colors.text, fontSize: typography.fontSizes.xl },
            ]}
          >
            Sesión
          </Text>
          <View style={styles.optionWrapped}>
            <InfoButton
              text="Cerrar sesión"
              iconFamily="Entypo"
              iconName="log-out"
              textColor={colors.error}
              onPress={mutate}
            />
          </View>
        </View>

        <Text style={[styles.version, { color: colors.textSecondary }]}>
          Versión: 0.1.1 Alfa cerrada
        </Text>
        <Modal
          transparent={true}
          animationType="fade"
          visible={isPending}
          onRequestClose={() => {}}
        >
          <View style={styles.modalBackground}>
            <View
              style={[styles.modalContainer, { backgroundColor: colors.card }]}
            >
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={[styles.loadingText, { color: colors.text }]}>
                Cerrando sesión...
              </Text>
            </View>
          </View>
        </Modal>
        <Toast />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  },
  headerOption: {
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(18),
    fontWeight: 'bold',
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
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(20),
  },
});
