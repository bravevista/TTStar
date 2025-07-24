import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

interface TRefreshProps {
  visible: boolean;
  color: string;
}

const TopRefreshIndicator = ({ visible, color }: TRefreshProps) => {
  if (!visible) return null;

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(150)}
      style={styles.indicatorContainer}
    >
      <ActivityIndicator size="small" color={color} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  indicatorContainer: {
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});

export default TopRefreshIndicator;
