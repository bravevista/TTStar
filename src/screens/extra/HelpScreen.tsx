import React, { useRef } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '../../hooks/useTheme';
import StackHeader from '../../components/common/StackHeader';

export default function HelpScreen() {
  const { colors, typography, theme } = useTheme();
  const animation = useRef<LottieView>(null);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      <StackHeader
        title="Ayuda"
        iconFamiliy="Feather"
        iconName="help-circle"
        showBackButton
      />

      <ScrollView
        contentContainerStyle={[
          styles.subContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <LottieView
          autoPlay
          ref={animation}
          style={styles.animation}
          source={require('../../assets/lottie/Help&Support.json')}
        />
        <Text
          style={[
            {
              color: colors.text,
              fontSize: typography.fontSizes.xxl,
              fontWeight: typography.fontWeights.bold,
            },
          ]}
        >
          ¡Escríbenos para ayudarte!
        </Text>
        <Text
          style={[
            styles.text,
            { color: colors.text, fontWeight: typography.fontWeights.regular },
          ]}
        >
          Estaremos encantados de acompañarte y brindarte el soporte que
          necesites. Nuestro objetivo es que tu experiencia sea lo más clara y
          positiva posible. Estamos aquí para ayudarte en cada paso del camino.
          Por favor, no dudes en contactarnos a través del siguiente correo:
        </Text>
        <Text
          style={[
            styles.text,
            { color: colors.text, fontWeight: typography.fontWeights.bold },
          ]}
        >
          soporte@trustthreads.com
        </Text>
        <Text
          style={[
            styles.text,
            { color: colors.text, fontWeight: typography.fontWeights.regular },
          ]}
        >
          Te brindaremos el apoyo lo más pronto posible. Para una mejor
          atención, te pedimos evitar el envío de correos repetitivos.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

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
  text: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(5),
    textAlign: 'center',
    letterSpacing: 0.1,
  },
  animation: {
    aspectRatio: 251 / 186,
    width: scale(300),
  },
});
