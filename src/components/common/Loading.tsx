import { View, Text, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { useTheme } from '../../hooks/useTheme';

export function Loading() {
  const { colors, typography } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ActivityIndicator
        animating={true}
        size={moderateScale(32)}
        color={colors.primary}
      />
      <Text
        style={[
          styles.text,
          {
            color: colors.text,
            fontSize: typography.fontSizes.md,
            fontWeight: typography.fontWeights.medium,
          },
        ]}
      >
        Cargando...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    paddingTop: verticalScale(20),
  },
});
