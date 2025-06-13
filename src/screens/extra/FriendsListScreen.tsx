import { useState } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import { useTheme } from '../../hooks/useTheme';
import Friend from '../../components/specific/Friend';
import { useGetFriendsList } from '../../hooks/useGetFriendsList.hook';

interface Props {
  query: string;
}

export default function FriendsListScreen({ query }: Props) {
  const { colors } = useTheme();
  const queryClient = useQueryClient();

  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useGetFriendsList({});

  const friendsList = data?.pages.flatMap(page => page.data) ?? [];

  const onRefresh = async () => {
    setIsRefreshing(true);
    await queryClient.resetQueries({ queryKey: ['friends-list'] });
    setIsRefreshing(false);
  };

  if (isLoading && !isRefreshing) {
    return (
      <View
        style={[styles.loaderContainer, { backgroundColor: colors.background }]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (isError) {
    return (
      <View
        style={[styles.loaderContainer, { backgroundColor: colors.background }]}
      >
        <Text style={{ color: colors.text }}>
          Ocurrió un error al cargar la lista de amigos
        </Text>
      </View>
    );
  }

  return (
    <>
      <FlatList
        contentContainerStyle={[
          styles.container,
          {
            backgroundColor: colors.background,
          },
        ]}
        data={friendsList}
        keyExtractor={item => item.uuid.toString()}
        renderItem={({ item }) => (
          <Friend
            uuid={item.uuid}
            type={item.type}
            profilephoto={item.profilephoto}
            name={item.name}
            lastname={item.lastname}
            username={item.username}
            faculty={item.faculty}
            universitycareer={item.universitycareer}
          />
        )}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.2}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : null
        }
        ListEmptyComponent={
          <View
            style={[
              styles.emptyContainer,
              { backgroundColor: colors.background },
            ]}
          >
            <Text style={{ color: colors.text }}>No tienes amigos :c</Text>
          </View>
        }
      />
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
