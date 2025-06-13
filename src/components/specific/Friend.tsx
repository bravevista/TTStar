import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useTheme } from '../../hooks/useTheme';
import { getAcronym } from '../../utils/GetAcronimun.utils';
import { UserType, userTypeLabels } from '../../utils/TransformTypeUser.utils';
import { MainStackParamList } from '../../types/navigation';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface FriendProps {
  uuid: string;
  type?: string;
  profilephoto?: string;
  name?: string;
  lastname?: string;
  username?: string;
  faculty?: string;
  universitycareer?: string;
}

export default function Friend({
  uuid,
  type,
  profilephoto,
  name,
  lastname,
  username,
  faculty,
  universitycareer,
}: FriendProps) {
  const { colors, typography } = useTheme();
  const queryClient = useQueryClient();
  const facultyAcronym = getAcronym(faculty ?? '');

  const navigation =
    useNavigation<
      NativeStackNavigationProp<MainStackParamList, 'ProfileUser'>
    >();

  const handleProfile = () => {
    navigation.navigate('ProfileUser', { uuid: uuid });
  };

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
          source={profilephoto}
          style={[styles.image, { borderColor: colors.primary }]}
          contentFit="cover"
        />
        <View>
          <Text
            numberOfLines={1}
            lineBreakMode="tail"
            style={[{ color: colors.text, fontSize: typography.fontSizes.md }]}
          >
            {name} {lastname}
          </Text>
          <Text
            numberOfLines={1}
            lineBreakMode="tail"
            style={[
              {
                color: colors.textSecondary,
                fontSize: typography.fontSizes.sm,
              },
            ]}
          >
            @{username} - {userTypeLabels[type as UserType]}
          </Text>
          <Text
            numberOfLines={1}
            lineBreakMode="tail"
            style={[{ color: colors.text, fontSize: typography.fontSizes.sm }]}
          >
            {facultyAcronym} - {universitycareer}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: scale(18),
    paddingVertical: verticalScale(8),
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
