import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

import { FollowButton } from '../specific/FollowButton';
import { useUserStore } from '../../contexts/store/useUserStore';
import { moderateScale, scale } from 'react-native-size-matters';
import { UserType, userTypeLabels } from '../../utils/TransformTypeUser.utils';
import { useTheme } from '../../hooks/useTheme';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Calendar02Icon } from '@hugeicons/core-free-icons';

interface UserCardProps {
  type: string;
  uuid: string;
  name: string;
  lastname: string;
  profilephoto: string;
  username: string;
  showdate: boolean;
  date?: string;
}

export default function UserCard({
  type,
  uuid,
  name,
  lastname,
  profilephoto,
  username,
  showdate = false,
  date,
}: UserCardProps) {
  const { colors, typography } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Image
          style={[
            styles.profilePhoto,
            {
              borderColor: colors.primary,
            },
          ]}
          source={profilephoto}
          contentFit="cover"
        />
        <View>
          <Text
            style={{
              color: colors.text,
              fontSize: typography.fontSizes.sm,
              fontWeight: typography.fontWeights.semibold,
            }}
          >
            {name} {lastname}
          </Text>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: typography.fontSizes.xs,
              fontWeight: typography.fontWeights.medium,
            }}
          >
            @{username} - {userTypeLabels[type as UserType]}
          </Text>
          {showdate && (
            <View style={styles.date}>
              <HugeiconsIcon
                icon={Calendar02Icon}
                size={moderateScale(12)}
                color={colors.text}
                strokeWidth={1.5}
              />
              <Text
                style={{
                  color: colors.text,
                  fontSize: typography.fontSizes.xs,
                  fontWeight: typography.fontWeights.regular,
                }}
              >
                {date}
              </Text>
            </View>
          )}
        </View>
      </View>
      <FollowButton
        followedUuid={uuid}
        initiallyFollowing={true}
        standalone={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: scale(35),
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
  },
  profilePhoto: {
    width: moderateScale(52),
    height: moderateScale(52),
    borderRadius: moderateScale(15),
    borderWidth: moderateScale(2),
  },
  date: {
    flexDirection: 'row',
    gap: moderateScale(3),
  },
});
