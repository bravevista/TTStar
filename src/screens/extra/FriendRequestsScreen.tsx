import React from 'react';
import {
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

import { useTheme } from '../../hooks/useTheme';
import FriendRequest from '../../components/specific/FriendRequest';
import { verticalScale } from 'react-native-size-matters';
import { useUserStore } from '../../contexts/store/useUserStore';
import { useGetFriendRequests } from '../../hooks/useGetFriendRequests.hook';

interface Props {
  query: string; // Si lo usarás después para filtrar
}

export default function FriendRequestsScreen({ query }: Props) {
  const { colors } = useTheme();
  const user = useUserStore(state => state.user);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useGetFriendRequests({});

  // Flatten all friend requests
  const friendRequests = data?.pages.flatMap(page => page.data) ?? [];

  if (isLoading) {
    return (
      <View
        style={[
          styles.loaderContainer,
          { backgroundColor: colors.background2 },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (isError) {
    return (
      <View
        style={[
          styles.loaderContainer,
          { backgroundColor: colors.background2 },
        ]}
      >
        <Text style={{ color: colors.text }}>
          Ocurrió un error al cargar las solicitudes
        </Text>
      </View>
    );
  }

  return (
    <>
      <FlatList
        contentContainerStyle={[
          styles.container,
          { backgroundColor: colors.background2 },
        ]}
        data={friendRequests}
        keyExtractor={item => item.uuid.toString()}
        renderItem={({ item }) => (
          <FriendRequest
            senderUuid={item.senderuuid}
            type={item.type}
            profilephoto={item.profilephoto}
            name={item.name}
            lastname={item.lastname}
            username={item.username}
            universitycareer={item.universitycareer}
            coverphoto={item.coverphoto}
          />
        )}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.2}
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
            <Text style={{ color: colors.text }}>
              No tienes solicitudes de amistad pendientes
            </Text>
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
    gap: verticalScale(5),
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
