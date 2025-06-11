import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

import { TabScreenProps } from '../../types/navigation';
import { useTheme } from '../../hooks/useTheme';
import MainHeader from '../../components/common/MainHeader';

export default function ExploreScreen({
  navigation,
  route,
}: TabScreenProps<'ExploreTab'>) {
  const { colors, theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <MainHeader />
      <Text>Explore</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
