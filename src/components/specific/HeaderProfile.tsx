import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '../../hooks/useTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function HeaderProfile() {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const hexWithAlpha = (hex: string, alpha: number = 1) => {
    const alphaHex = Math.round(alpha * 255)
      .toString(16)
      .padStart(2, '0');
    return hex + alphaHex;
  };

  const sharedStyle = {
    backgroundColor: hexWithAlpha(colors.background, 1),
    borderColor: hexWithAlpha(colors.text, 0.2),
  };

  return (
    <View style={[styles.container, { width: SCREEN_WIDTH }]}>
      {/* Botón de volver */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[styles.button, sharedStyle]}
      >
        <AntDesign name="left" size={moderateScale(18)} color={colors.text} />
      </TouchableOpacity>

      {/* Botones de la derecha */}
      <View style={styles.rightButtons}>
        <TouchableOpacity style={[styles.button, sharedStyle]}>
          <AntDesign
            name="pushpino"
            size={moderateScale(18)}
            color={colors.text}
          />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, sharedStyle]}>
          <AntDesign
            name="ellipsis1"
            size={moderateScale(18)}
            color={colors.text}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: moderateScale(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(15),
    zIndex: 1,
  },
  button: {
    width: moderateScale(35),
    height: moderateScale(35),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  rightButtons: {
    flexDirection: 'row',
    gap: moderateScale(10),
  },
});
