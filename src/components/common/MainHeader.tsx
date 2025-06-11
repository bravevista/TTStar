import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { HugeiconsIcon } from '@hugeicons/react-native';
import {
  Notification03Icon,
  PhoneDeveloperModeIcon,
} from '@hugeicons/core-free-icons';

import { useTheme } from '../../hooks/useTheme';

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
      <View style={styles.notifications}>
        <View
          style={[styles.icobutton, { backgroundColor: colors.background }]}
        >
          <HugeiconsIcon
            icon={PhoneDeveloperModeIcon}
            size={moderateScale(21)}
            color={colors.text}
            strokeWidth={1.8}
          />
        </View>
        <View
          style={[styles.icobutton, { backgroundColor: colors.background }]}
        >
          <HugeiconsIcon
            icon={Notification03Icon}
            size={moderateScale(21)}
            color={colors.text}
            strokeWidth={1.8}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(12.5),
    zIndex: 2,
  },
  notifications: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: moderateScale(7),
  },
  icobutton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(10),
    padding: 5,
  },
});
