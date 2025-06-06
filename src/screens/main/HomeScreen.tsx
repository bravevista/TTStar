import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';

import { TabScreenProps } from '../../types/navigation';
import { TestRepository } from '../../api/repository/test';
import { User } from '../../api/interface/userTest';
import { useTheme } from '../../hooks/useTheme';
import MainHeader from '../../components/common/MainHeader';

export default function HomeScreen({
  navigation,
  route,
}: TabScreenProps<'HomeTab'>) {
  const { colors, theme } = useTheme();

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

  return (
    <View style={[styles.container, { backgroundColor: colors.background2 }]}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <MainHeader />
      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text style={{ color: '#785' }}>{item.company.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
