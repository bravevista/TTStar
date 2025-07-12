import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { HugeiconsIcon } from '@hugeicons/react-native';
import {
  MoreHorizontalCircle01Icon,
  StarIcon,
  Comment02Icon,
  AutoConversationsIcon,
  BookmarkAdd02Icon,
} from '@hugeicons/core-free-icons';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import ImageViewer from 'react-native-image-zoom-viewer';

import { useTheme } from '../../hooks/useTheme';
import { useGetPostDetails } from '../../hooks/useGetPostDetails.hook';
import { MainStackParamList } from '../../types/navigation';
import { Loading } from '../../components/common/Loading';
import UserCard from '../../components/common/UserCard';
import { formatDate } from '../../utils/FormatDate.utils';
import PostContent from '../../components/specific/Post/PostContent';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function PostDetailScreen() {
  const { colors, typography } = useTheme();
  const navigation = useNavigation();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const route = useRoute<RouteProp<MainStackParamList, 'PostDetail'>>();
  const { uuid: postUuid } = route.params;

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handle', index);
  }, []);

  const { postData, isLoading, error } = useGetPostDetails(postUuid);
  const date = formatDate(postData?.created_at ?? '');

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background, width: SCREEN_WIDTH },
      ]}
    >
      <View style={[styles.header, { width: SCREEN_WIDTH }]}>
        <View style={styles.profile}>
          <Image
            source={postData?.user.profilephoto}
            style={[styles.profilephoto, { borderColor: colors.primary }]}
            contentFit="cover"
          />
          <View style={[styles.capsuleText, { backgroundColor: colors.card }]}>
            <Text
              style={[
                {
                  color: colors.text,
                  fontWeight: typography.fontWeights.semibold,
                  fontSize: typography.fontSizes.sm,
                },
              ]}
            >
              @{postData?.user.username}
            </Text>
          </View>
        </View>
        <View style={[styles.capsuleIcon, { backgroundColor: colors.card }]}>
          <HugeiconsIcon
            key="More"
            icon={MoreHorizontalCircle01Icon}
            size={moderateScale(21)}
            color={colors.text}
            strokeWidth={1.2}
          />
        </View>
      </View>

      <Image
        source={postData?.image}
        style={styles.images}
        contentFit="cover"
      />

      <View style={styles.stats}>
        <View style={[styles.capsuleText, { backgroundColor: colors.card }]}>
          <Text
            style={{
              color: colors.text,
              fontWeight: typography.fontWeights.bold,
              fontSize: typography.fontSizes.lg,
            }}
          >
            {postData?.stats.views}{' '}
            <Text
              style={{
                fontWeight: typography.fontWeights.light,
                fontSize: typography.fontSizes.md,
              }}
            >
              Vistas
            </Text>
          </Text>
        </View>
      </View>

      <View style={styles.interactions}>
        <View style={[styles.capsuleIcon, { backgroundColor: colors.card }]}>
          <HugeiconsIcon
            key="Like"
            icon={StarIcon}
            size={moderateScale(21)}
            color={colors.text}
            strokeWidth={1.2}
          />
        </View>
        <View style={[styles.capsuleIcon, { backgroundColor: colors.card }]}>
          <HugeiconsIcon
            key="Comentar"
            icon={Comment02Icon}
            size={moderateScale(21)}
            color={colors.text}
            strokeWidth={1.2}
          />
        </View>
        <View style={[styles.capsuleIcon, { backgroundColor: colors.card }]}>
          <HugeiconsIcon
            key="Potenciar"
            icon={AutoConversationsIcon}
            size={moderateScale(21)}
            color={colors.text}
            strokeWidth={1.2}
          />
        </View>
        <View style={[styles.capsuleIcon, { backgroundColor: colors.card }]}>
          <HugeiconsIcon
            key="Guardar"
            icon={BookmarkAdd02Icon}
            size={moderateScale(21)}
            color={colors.text}
            strokeWidth={1.2}
          />
        </View>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        backgroundStyle={[{ backgroundColor: colors.background }]}
        handleIndicatorStyle={[{ backgroundColor: colors.primary }]}
        handleStyle={{
          backgroundColor: colors.background2,
          borderRadius: moderateScale(25),
        }}
      >
        <BottomSheetView style={styles.contentContainer}>
          <UserCard
            type={postData?.user.type!}
            uuid={postData?.user._id!}
            name={postData?.user.name!}
            lastname={postData?.user.lastname!}
            profilephoto={postData?.user.profilephoto!}
            username={postData?.user.username!}
            showdate
            date={date}
          />
          {postData?.content && <PostContent text={postData.content} />}
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  contentContainer: {
    flex: 1,
    padding: scale(10),
  },
  header: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(15),
    zIndex: 2,
  },
  profile: {
    flexDirection: 'row',
    gap: moderateScale(8),
  },
  profilephoto: {
    width: 40,
    height: 40,
    borderRadius: moderateScale(15),
    borderWidth: 2,
  },
  capsuleIcon: {
    padding: moderateScale(12),
    borderRadius: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  capsuleText: {
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(15),
    borderRadius: moderateScale(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  interactions: {
    position: 'absolute',
    flexDirection: 'column',
    gap: 8,
    right: 15,
    bottom: 200,
    zIndex: 2,
  },
  stats: {
    position: 'absolute',
    flexDirection: 'column',
    gap: 8,
    left: 15,
    bottom: 200,
    zIndex: 2,
  },
  images: {
    width: 450,
    height: SCREEN_HEIGHT,
  },
});
