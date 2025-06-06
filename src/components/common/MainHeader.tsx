import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { scale, verticalScale } from 'react-native-size-matters';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function MainHeader() {
  const { colors, typography } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { width: SCREEN_WIDTH, backgroundColor: colors.background },
      ]}
    >
      <Text
        style={{
          color: colors.text,
          fontWeight: typography.fontWeights.bold,
          fontSize: typography.fontSizes.xxl,
        }}
      >
        trustthreads
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(12.5),
  },
});
