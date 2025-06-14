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
import Post from '../../components/common/Post';
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

  const content = `Hola **amigos** 😄
Les comparto esta novedad:
**Gran evento** el próximo jueves 🎉
Nos vemos ahí.`;

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
          <Post
            image={user.profilephoto}
            content={content}
            date="27 Dic 2025"
            user={user}
          />
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
    gap: moderateScale(4),
    paddingBottom: moderateScale(10),
  },
});
