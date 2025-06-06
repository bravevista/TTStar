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

  function getAcronym(phrase: string): string {
    return phrase
      .split(' ')
      .filter(word => word[0] === word[0]?.toUpperCase())
      .map(word => word[0])
      .join('');
  }

  const renderItem = ({ item }: any) => <SearchCard item={item} />;

  return (
    <View style={[styles.container, { backgroundColor: colors.background2 }]}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <View
        style={[
          styles.header,
          { backgroundColor: colors.primary, width: SCREEN_WIDTH },
        ]}
      >
        <Text
          style={[
            {
              color: 'white',
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
              color: 'white',
              fontWeight: typography.fontWeights.bold,
              fontSize: typography.fontSizes.md,
            },
          ]}
        >
          Vamos a encontrar nuevos amigos, temas y grupos.
        </Text>
      </View>
      <View
        style={[styles.searchInput, { backgroundColor: colors.background }]}
      >
        <HugeiconsIcon
          icon={Search01Icon}
          size={moderateScale(24)}
          color={colors.textSecondary}
          strokeWidth={1.5}
        />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar usuarios..."
          placeholderTextColor={colors.textSecondary}
          style={[
            styles.input,
            {
              color: colors.text,
              backgroundColor: colors.background,
            },
          ]}
        />
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
    paddingHorizontal: scale(15),
  },
  header: {
    paddingTop: verticalScale(30),
    position: 'absolute',
    height: verticalScale(150),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: scale(18),
  },
  searchInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(70),
    paddingHorizontal: scale(10),
    borderRadius: moderateScale(15),
    height: scale(42),
  },
  input: {
    width: '90%',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderRadius: moderateScale(15),
  },
  flatList: {
    paddingTop: verticalScale(5),
    paddingBottom: verticalScale(100),
  },
  avatar: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(15),
    borderWidth: 2.5,
    marginRight: moderateScale(15),
  },
});
