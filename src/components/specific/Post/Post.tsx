import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useState } from 'react';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { HugeiconsIcon } from '@hugeicons/react-native';
import {
  StarIcon,
  Comment02Icon,
  AutoConversationsIcon,
  BookmarkAdd02Icon,
  Settings03Icon,
} from '@hugeicons/core-free-icons';

import { useTheme } from '../../../hooks/useTheme';
import UserCard from '../../common/UserCard';
import PostContent from './PostContent';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../../types/navigation';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MAX_IMAGE_HEIGHT = 500;

interface PostProps {
  _id: string;
  image?: string;
  content: string;
  date: string;
  user: {
    type: string;
    _id: string;
    name: string;
    lastname: string;
    profilephoto: string;
    username: string;
  };
}

export default function Post({ _id, image, content, date, user }: PostProps) {
  const { colors, typography } = useTheme();
  const [imageHeight, setImageHeight] = useState<number>(MAX_IMAGE_HEIGHT);
  const navigation =
    useNavigation<
      NativeStackNavigationProp<MainStackParamList, 'ProfileUser'>
    >();
  const navigationTwo =
    useNavigation<
      NativeStackNavigationProp<MainStackParamList, 'PostDetail'>
    >();

  const handleImageLoad = (event: any) => {
    const { width, height } = event.source;
    if (width && height) {
      const aspectRatio = width / height;
      const calculatedHeight = SCREEN_WIDTH / aspectRatio;
      setImageHeight(Math.min(calculatedHeight, MAX_IMAGE_HEIGHT));
    }
  };

  const handleProfile = () => {
    navigation.navigate('ProfileUser', { uuid: user._id });
  };
  const handleView = () => {
    navigationTwo.navigate('PostDetail', { uuid: _id });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {image && (
        <Pressable
          unstable_pressDelay={300}
          onPress={handleView}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.9 : 1,
            },
          ]}
        >
          <Image
            style={[styles.image, { width: SCREEN_WIDTH, height: imageHeight }]}
            source={image}
            contentFit="cover"
            onLoad={handleImageLoad}
          />
        </Pressable>
      )}
      <View style={styles.content}>
        <Pressable
          unstable_pressDelay={300}
          onPress={handleProfile}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? colors.card : colors.background,
              opacity: pressed ? 0.9 : 1,
            },
          ]}
        >
          <UserCard
            type={user.type!}
            uuid={user._id!}
            name={user.name!}
            lastname={user.lastname!}
            profilephoto={user.profilephoto!}
            username={user.username!}
            showdate
            date={date}
          />
        </Pressable>
        {content && (
          <Pressable
            unstable_pressDelay={300}
            onPress={handleView}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? colors.card : colors.background,
                opacity: pressed ? 0.9 : 1,
              },
            ]}
          >
            <PostContent text={content} />
          </Pressable>
        )}
        <View
          style={[
            styles.divider,
            {
              backgroundColor: colors.border,
              width: SCREEN_WIDTH,
            },
          ]}
        />
      </View>
      <View style={[styles.optionsContainer, { width: SCREEN_WIDTH }]}>
        <View style={styles.optionGroup}>
          <View style={styles.socialOption}>
            <HugeiconsIcon
              key="Like"
              icon={StarIcon}
              size={moderateScale(21)}
              color={colors.text}
              strokeWidth={1.2}
            />
            <Text
              style={{ color: colors.text, fontSize: typography.fontSizes.sm }}
            >
              Apoyar
            </Text>
          </View>
          <View style={styles.socialOption}>
            <HugeiconsIcon
              key="Comentar"
              icon={Comment02Icon}
              size={moderateScale(21)}
              color={colors.text}
              strokeWidth={1.2}
            />
            <Text
              style={{ color: colors.text, fontSize: typography.fontSizes.sm }}
            >
              Comentar
            </Text>
          </View>
          <View style={styles.socialOption}>
            <HugeiconsIcon
              key="Potenciar"
              icon={AutoConversationsIcon}
              size={moderateScale(21)}
              color={colors.text}
              strokeWidth={1.2}
            />
            <Text
              style={{ color: colors.text, fontSize: typography.fontSizes.sm }}
            >
              Impulsar
            </Text>
            {/* Una alternativa retewt o compartir con opcion de citar */}
          </View>
        </View>
        <View style={styles.optionGroup}>
          <HugeiconsIcon
            key="Guardar"
            icon={BookmarkAdd02Icon}
            size={moderateScale(21)}
            color={colors.text}
            strokeWidth={1.2}
          />
          <HugeiconsIcon
            key="Opciones"
            icon={Settings03Icon}
            size={moderateScale(21)}
            color={colors.text}
            strokeWidth={1.2}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: moderateScale(5),
    paddingBottom: moderateScale(15),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    borderTopLeftRadius: moderateScale(5),
    borderTopRightRadius: moderateScale(5),
  },
  content: {
    paddingVertical: moderateScale(5),
  },
  textContainer: {
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(10),
  },
  divider: {
    height: moderateScale(1.5),
    marginVertical: moderateScale(5),
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(15),
    marginTop: verticalScale(5),
  },
  optionGroup: {
    flexDirection: 'row',
    gap: moderateScale(10),
  },
  socialOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(4),
  },
});
