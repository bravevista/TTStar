import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { HugeiconsIcon } from '@hugeicons/react-native';
import {
  Notification03Icon,
  PhoneDeveloperModeIcon,
  PlusSignSquareIcon,
} from '@hugeicons/core-free-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useTheme } from '../../hooks/useTheme';
import { MainStackParamList } from '../../types/navigation';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function MainHeader() {
  const { colors, typography } = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const handleShare = () => {
    navigation.navigate('ShareExperiences');
  };

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
        <Pressable
          style={({ pressed }) => [
            styles.createbutton,
            { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 },
          ]}
          onPress={handleShare}
        >
          <HugeiconsIcon
            icon={PlusSignSquareIcon}
            size={moderateScale(18)}
            color={'white'}
            strokeWidth={2}
          />
          <Text
            style={{
              color: 'white',
              fontSize: typography.fontSizes.xs + moderateScale(1.5),
              fontWeight: typography.fontWeights.bold,
            }}
          >
            Compartir
          </Text>
        </Pressable>
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
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 1,
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
  createbutton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(6),
    gap: scale(4),
    paddingHorizontal: scale(5),
    paddingVertical: verticalScale(5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
