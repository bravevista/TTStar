import React, { useCallback, useMemo, useRef, useState } from 'react';
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
  ViewIcon,
} from '@hugeicons/core-free-icons';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import ImageViewer from 'react-native-image-zoom-viewer';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { useTheme } from '../../hooks/useTheme';
import { useGetPostDetails } from '../../hooks/useGetPostDetails.hook';
import { MainStackParamList } from '../../types/navigation';
import { Loading } from '../../components/common/Loading';
import UserCard from '../../components/common/UserCard';
import { formatDate } from '../../utils/FormatDate.utils';
import PostContent from '../../components/specific/Post/PostContent';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import InteractionPostButton from '../../components/specific/InteractionPostButton';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function PostDetailScreen() {
  const { colors, typography } = useTheme();
  const [initialSheetHeight, setInitialSheetHeight] = useState<number | null>(
    null
  );
  const navigation = useNavigation();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [sheetIndex, setSheetIndex] = useState(0);
  const insets = useSafeAreaInsets();
  const route = useRoute<RouteProp<MainStackParamList, 'PostDetail'>>();
  const { uuid: postUuid } = route.params;

  const snapPoints = useMemo(() => ['50%', '85%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    setSheetIndex(index);
  }, []);

  const { postData, isLoading, error } = useGetPostDetails(postUuid);
  const date = formatDate(postData?.created_at ?? '');

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: 'black',
          width: SCREEN_WIDTH,
        },
      ]}
    >
      {initialSheetHeight !== null && (
        <View
          style={{
            height: SCREEN_HEIGHT - initialSheetHeight + insets.bottom,
          }}
        >
          <ImageViewer
            imageUrls={[
              {
                url: postData?.image ?? ' ',
              },
            ]}
            backgroundColor={'#000'}
            enableSwipeDown={false}
            enableImageZoom={true}
            renderHeader={() => (
              <View style={[styles.header, { width: SCREEN_WIDTH }]}>
                <View style={[styles.profile]}>
                  <Image
                    source={postData?.user.profilephoto}
                    style={[
                      styles.profilephoto,
                      { borderColor: colors.primary },
                    ]}
                    contentFit="cover"
                  />
                  <View
                    style={[
                      styles.capsuleText,
                      { backgroundColor: colors.card },
                    ]}
                  >
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
                <View
                  style={[styles.capsuleIcon, { backgroundColor: colors.card }]}
                >
                  <HugeiconsIcon
                    key="More"
                    icon={MoreHorizontalCircle01Icon}
                    size={moderateScale(21)}
                    color={colors.text}
                    strokeWidth={1.2}
                  />
                </View>
              </View>
            )}
            renderFooter={() => (
              <View
                style={{
                  width: SCREEN_WIDTH,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View style={styles.stats}>
                  <View
                    style={[
                      styles.capsuleText,
                      { backgroundColor: colors.card },
                    ]}
                  >
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
                  <InteractionPostButton keyIcon="Like" hugeIcon="StarIcon" />
                  <InteractionPostButton
                    keyIcon="Comentar"
                    hugeIcon="CommentIcon"
                  />
                  <InteractionPostButton
                    keyIcon="Impulsar"
                    hugeIcon="BoostIcon"
                  />
                  <InteractionPostButton
                    keyIcon="Guardar"
                    hugeIcon="KeepIcon"
                  />
                </View>
              </View>
            )}
            renderIndicator={() => <></>}
            saveToLocalByLongPress={false}
            style={styles.viewerWrapper}
          />
        </View>
      )}

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={[{ backgroundColor: colors.background }]}
        handleIndicatorStyle={[{ backgroundColor: colors.primary }]}
        handleStyle={{
          backgroundColor: colors.background2,
          borderRadius: moderateScale(25),
        }}
      >
        <BottomSheetView
          style={[
            styles.contentContainer,
            {
              paddingBottom: insets.bottom,
            },
          ]}
          onLayout={e => {
            if (initialSheetHeight === null) {
              setInitialSheetHeight(e.nativeEvent.layout.height);
            }
          }}
        >
          <UserCard uuid={postData?.user._id!} showdate date={date} />
          {postData?.content && <PostContent text={postData.content} variant />}
          <View style={styles.statsInteractions}>
            <View style={styles.showStats}>
              <HugeiconsIcon
                key="Like"
                icon={StarIcon}
                size={moderateScale(18)}
                color={colors.textSecondary}
                strokeWidth={1}
              />
              <Text
                style={{
                  fontSize: typography.fontSizes.sm,
                  color: colors.textSecondary,
                }}
              >
                {postData?.stats.supports}
              </Text>
            </View>
            <View style={styles.showStats}>
              <HugeiconsIcon
                key="Comentar"
                icon={Comment02Icon}
                size={moderateScale(18)}
                color={colors.textSecondary}
                strokeWidth={1}
              />
              <Text
                style={{
                  fontSize: typography.fontSizes.sm,
                  color: colors.textSecondary,
                }}
              >
                {postData?.stats.comments}
              </Text>
            </View>
            <View style={styles.showStats}>
              <HugeiconsIcon
                key="Impulsar"
                icon={AutoConversationsIcon}
                size={moderateScale(18)}
                color={colors.textSecondary}
                strokeWidth={1}
              />
              <Text
                style={{
                  fontSize: typography.fontSizes.sm,
                  color: colors.textSecondary,
                }}
              >
                {postData?.stats.boosts}
              </Text>
            </View>
            <View style={styles.showStats}>
              <HugeiconsIcon
                key="Guardar"
                icon={BookmarkAdd02Icon}
                size={moderateScale(18)}
                color={colors.textSecondary}
                strokeWidth={1}
              />
              <Text
                style={{
                  fontSize: typography.fontSizes.sm,
                  color: colors.textSecondary,
                }}
              >
                {postData?.stats.keeps}
              </Text>
            </View>
            <View style={styles.showStats}>
              <HugeiconsIcon
                key="Vistas"
                icon={ViewIcon}
                size={moderateScale(18)}
                color={colors.textSecondary}
                strokeWidth={1}
              />
              <Text
                style={{
                  fontSize: typography.fontSizes.sm,
                  color: colors.textSecondary,
                }}
              >
                {postData?.stats.views}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.divider,
              {
                backgroundColor: colors.border,
                width: SCREEN_WIDTH * 0.94,
              },
            ]}
          />
          {sheetIndex !== 0 && (
            <Animated.View entering={FadeIn} exiting={FadeOut}>
              <Text>Comentarios</Text>
              <Text>Aquí el resultado de los comentarios endeless</Text>
            </Animated.View>
          )}
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    position: 'relative',
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
    padding: moderateScale(10),
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
  statsInteractions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(8),
  },
  showStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(5),
  },
  divider: {
    height: moderateScale(1.5),
    marginTop: moderateScale(5),
    marginBottom: moderateScale(10),
  },
  interactions: {
    //position: 'absolute',
    flexDirection: 'column',
    gap: moderateScale(15),
    right: 15,
    bottom: verticalScale(60),
    zIndex: 2,
  },
  stats: {
    //position: 'absolute',
    flexDirection: 'column',
    gap: 8,
    left: 15,
    top: verticalScale(87),
    zIndex: 2,
  },
  viewerWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
});
