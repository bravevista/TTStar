import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  Dimensions,
  StatusBar,
  Pressable,
} from 'react-native';
import { useDebounce } from 'use-debounce';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Search01Icon } from '@hugeicons/core-free-icons';
import { useNavigation } from '@react-navigation/native';

import { useSearchUsers } from '../../hooks/useSearchUsers.hook';
import { useTheme } from '../../hooks/useTheme';
import { useUserStore } from '../../contexts/store/useUserStore';
import { MainStackParamList, TabScreenProps } from '../../types/navigation';
import SearchCard from '../../components/specific/SearchCard';
import MainHeader from '../../components/common/MainHeader';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function SearchScreen({
  navigation,
  route,
}: TabScreenProps<'SearchTab'>) {
  const { colors, theme, typography } = useTheme();
  const UserMe = useUserStore(state => state.user);
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 500);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useSearchUsers({ terms: debouncedQuery });

  const users = data?.pages.flatMap(page => page.results) || [];

  const renderItem = ({ item }: any) => <SearchCard item={item} />;

  return (
    <View style={[styles.container, { backgroundColor: colors.background2 }]}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <MainHeader />
      <View
        style={[
          styles.header,
          { backgroundColor: colors.background, width: SCREEN_WIDTH },
        ]}
      >
        <View style={[styles.message, { width: SCREEN_WIDTH * 0.91 }]}>
          <Text
            style={[
              {
                color: colors.text,
                fontWeight: typography.fontWeights.regular,
                fontSize: typography.fontSizes.sm,
              },
            ]}
          >
            Hola {UserMe?.name?.split(' ')[0]} 👋
          </Text>
          <Text
            style={[
              {
                color: colors.text,
                fontWeight: typography.fontWeights.bold,
                fontSize: typography.fontSizes.md,
                marginBottom: moderateScale(10),
              },
            ]}
          >
            Vamos a encontrar nuevos amigos, temas y grupos.
          </Text>
        </View>
        <View
          style={[styles.searchInput, { backgroundColor: colors.background2 }]}
        >
          <HugeiconsIcon
            icon={Search01Icon}
            size={moderateScale(24)}
            color={colors.text}
            strokeWidth={1.5}
          />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Buscar usuarios..."
            placeholderTextColor={colors.textSecondary}
            style={[
              {
                width: SCREEN_WIDTH * 0.81,
                color: colors.text,
                backgroundColor: colors.background2,
              },
            ]}
          />
        </View>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : isError ? (
        <Text style={{ color: colors.error, marginTop: 20 }}>
          Error al buscar usuarios
        </Text>
      ) : users.length === 0 && debouncedQuery ? (
        <Text style={{ color: colors.textSecondary, marginTop: 20 }}>
          No se encontraron usuarios
        </Text>
      ) : (
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.flatList}
          onEndReached={() => hasNextPage && fetchNextPage()}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator size="small" color={colors.primary} />
            ) : null
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  header: {
    paddingTop: verticalScale(15),
    height: verticalScale(95),
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: scale(18),
  },
  message: {
    alignItems: 'flex-start',
  },
  searchInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(10),
    borderRadius: moderateScale(15),
    height: scale(42),
    gap: moderateScale(10),
  },
  flatList: {
    paddingTop: verticalScale(5),
    paddingBottom: verticalScale(100),
    marginHorizontal: 15,
    borderWidth: 1,
    //borderColor: 'red',
    borderBottomLeftRadius: moderateScale(15),
    borderBottomRightRadius: moderateScale(15),
  },
  avatar: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(15),
    borderWidth: 2.5,
    marginRight: moderateScale(15),
  },
});
