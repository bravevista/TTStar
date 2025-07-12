import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { moderateScale } from 'react-native-size-matters';

import { TabScreenProps } from '../../types/navigation';
import { TestRepository } from '../../api/repository/test';
import { User } from '../../api/interface/userTest';
import { useTheme } from '../../hooks/useTheme';
import MainHeader from '../../components/common/MainHeader';
import Post from '../../components/specific/Post/Post';
import { useUserStore } from '../../contexts/store/useUserStore';

export default function HomeScreen({
  navigation,
  route,
}: TabScreenProps<'HomeTab'>) {
  const { colors, theme } = useTheme();
  const user = useUserStore(state => state.user);

  const {
    data: users,
    isLoading,
    error,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: TestRepository.getUsers,
  });

  if (isLoading) {
    return <ActivityIndicator size="large" color={colors.primary} />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const content = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
Hola **amigos** 😄
Les comparto esta novedad:
**Gran evento** el próximo jueves 🎉 Nos vemos ahí.
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
hola
tralalerlor tralalala`;

  return (
    <View style={[styles.container, { backgroundColor: colors.background2 }]}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <MainHeader />
      <ScrollView
        contentContainerStyle={styles.view}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {user && (
          <>
            <Post
              _id="4b033d32-3df8-46e3-862f-62e0cd23de49"
              image={user.profilephoto}
              content={content}
              date="27 Dic 2025"
              user={user}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  view: {
    gap: moderateScale(10),
    paddingBottom: moderateScale(10),
  },
});
