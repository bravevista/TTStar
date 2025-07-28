import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import { moderateScale } from 'react-native-size-matters';
import Animated, { FadeIn, FadeInUp, FadeOut } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import MainHeader from '../../components/common/MainHeader';
import Post from '../../components/specific/Post/Post';
import { TabScreenProps } from '../../types/navigation';
import { useTheme } from '../../hooks/useTheme';
import { useUserStore } from '../../contexts/store/useUserStore';
import { Loading } from '../../components/common/Loading';
import { useAnnaFeed } from '../../hooks/useAnnaFeed.hook';
import { formatDate } from '../../utils/FormatDate.utils';
import { AnnaModule } from '../../api/repository/anna.repository';
import TopRefreshIndicator from '../../components/common/TopRefreshIndicator';

export default function HomeScreen({
  navigation,
  route,
}: TabScreenProps<'HomeTab'>) {
  const { colors, typography, theme } = useTheme();
  const queryClient = useQueryClient();
  const { user } = useUserStore();

  useEffect(() => {
    AnnaModule.cleanSession({ typesession: 'feed' });
  }, []);

  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useAnnaFeed({});

  const posts = data?.pages.flatMap(page => page.data) || [];
  const renderItem = ({ item }: any) => (
    <Animated.View
      entering={FadeInUp.springify().damping(20)}
      exiting={FadeOut}
    >
      <Post
        _id={item.uuid}
        image={item.images?.[0]}
        content={item.content}
        date={formatDate(item.created_at)}
        useruuid={[item.creators?.[0] ?? '']}
      />
    </Animated.View>
  );

  const onRefresh = async () => {
    try {
      setIsRefreshing(true);
      await AnnaModule.cleanSession({ typesession: 'feed' });
      await refetch();
    } catch (error) {
      console.error('Error refreshing feed:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  if (isLoading && !isRefreshing) {
    return <Loading />;
  }

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.container, { backgroundColor: colors.background2 }]}
    >
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <MainHeader />
      <FlatList
        data={posts}
        keyExtractor={item => item.uuid.toString()}
        renderItem={renderItem}
        contentContainerStyle={[styles.view, { flexGrow: 1 }]}
        ItemSeparatorComponent={() => (
          <View style={{ height: moderateScale(10) }} />
        )}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : null
        }
        ListEmptyComponent={
          <Animated.View
            entering={FadeIn.duration(300)}
            exiting={FadeOut.duration(200)}
            style={styles.emptyContainer}
          >
            <Text
              style={[
                styles.emptyText,
                {
                  color: colors.text,
                  fontWeight: typography.fontWeights.regular,
                  fontSize: typography.fontSizes.lg,
                },
              ]}
            >
              {isError
                ? 'Ocurrió un error al cargar el feed.'
                : 'No hay publicaciones por el momento.'}
            </Text>
            <TouchableOpacity
              style={[styles.reloadButton, { backgroundColor: colors.primary }]}
              onPress={onRefresh}
              activeOpacity={0.8}
            >
              <Text style={styles.reloadText}>Recargar</Text>
            </TouchableOpacity>
          </Animated.View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  view: {
    paddingBottom: moderateScale(10),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(20),
  },
  emptyText: {
    fontSize: moderateScale(14),
    textAlign: 'center',
    marginBottom: moderateScale(10),
  },
  reloadButton: {
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(8),
  },
  reloadText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: moderateScale(13),
  },
});
