import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import FriendRequestsScreen from '../screens/extra/FriendRequestsScreen';
import FriendsListScreen from '../screens/extra/FriendsListScreen';
import ChatsScreen from '../screens/extra/ChatsScreen';
import { useTheme } from '../hooks/useTheme';
import { moderateScale } from 'react-native-size-matters';
import { typography } from '../styles/theme';
import { RootTopTabParamList } from '../types/navigation';

const TopTab = createMaterialTopTabNavigator<RootTopTabParamList>();

interface Props {
  query: string;
  onTabChange: (tab: keyof RootTopTabParamList) => void;
}

export default function TopTabNavigator({ query, onTabChange }: Props) {
  const { colors } = useTheme();

  return (
    <TopTab.Navigator
      screenListeners={{
        state: e => {
          const index = e.data.state.index;
          const routeName = e.data.state.routeNames[index];
          onTabChange(routeName);
        },
      }}
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: moderateScale(12),
          fontWeight: typography.fontWeights.bold,
          textTransform: 'capitalize',
        },
        tabBarStyle: {
          backgroundColor: colors.background,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.primary,
          height: moderateScale(3),
        },
        tabBarPressColor: colors.background,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
      }}
    >
      <TopTab.Screen
        name="contactos"
        children={() => <FriendsListScreen query={query} />}
      />
      <TopTab.Screen
        name="mensajes"
        children={() => <ChatsScreen query={query} />}
      />
      <TopTab.Screen
        name="solicitudes"
        children={() => <FriendRequestsScreen query={query} />}
      />
    </TopTab.Navigator>
  );
}
