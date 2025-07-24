import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

import { FollowButton } from '../specific/FollowButton';
import { useUserStore } from '../../contexts/store/useUserStore';
import { moderateScale, scale } from 'react-native-size-matters';
import { UserType, userTypeLabels } from '../../utils/TransformTypeUser.utils';
import { useTheme } from '../../hooks/useTheme';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Calendar02Icon } from '@hugeicons/core-free-icons';
import { useUserCard } from '../../hooks/useUserCard.hook';
import { Loading } from './Loading';

interface UserCardProps {
  uuid: string;
  showdate: boolean;
  date?: string;
}

export default function UserCard({
  uuid,
  showdate = false,
  date,
}: UserCardProps) {
  const { colors, typography } = useTheme();
  const { userData, relationship, isOwnProfile, isLoading, error } =
    useUserCard(uuid);

  if (isLoading) {
    return <Loading />;
  }

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
          source={userData?.profilephoto}
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
            {userData?.name} {userData?.lastname}
          </Text>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: typography.fontSizes.xs,
              fontWeight: typography.fontWeights.medium,
            }}
          >
            @{userData?.username} - {userTypeLabels[userData?.type as UserType]}
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
        initiallyFollowing={isOwnProfile || relationship.isFollowing}
        standalone
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
