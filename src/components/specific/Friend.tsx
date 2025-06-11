import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import { useUserStore } from '../../contexts/store/useUserStore';
import { useTheme } from '../../hooks/useTheme';
import { getAcronym } from '../../utils/GetAcronimun.utils';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function FriendRequest() {
  const { colors, typography } = useTheme();
  const user = useUserStore(state => state.user);
  const facultyAcronym = getAcronym(user?.faculty ?? '');

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          width: SCREEN_WIDTH,
          borderColor: colors.border,
        },
      ]}
    >
      <View style={styles.content}>
        <Image
          source={user?.profilephoto}
          style={[styles.image, { borderColor: colors.primary }]}
          contentFit="cover"
        />
        <View>
          <Text
            style={[{ color: colors.text, fontSize: typography.fontSizes.md }]}
          >
            {user?.name} {user?.lastname}
          </Text>
          <Text
            style={[
              {
                color: colors.textSecondary,
                fontSize: typography.fontSizes.sm,
              },
            ]}
          >
            @{user?.username}
          </Text>
          <Text
            style={[{ color: colors.text, fontSize: typography.fontSizes.sm }]}
          >
            {facultyAcronym} - {user?.universitycareer}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(15),
    gap: moderateScale(15),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(20),
  },
  image: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(21),
    borderWidth: scale(2),
  },
});
