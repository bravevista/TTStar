import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { useEffect, useRef } from 'react';
import { Text, LayoutChangeEvent, Pressable, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../hooks/useTheme';

type TabBarComponentProps = {
  active?: boolean;
  options: BottomTabNavigationOptions;
  color: string;
  onLayout: (e: LayoutChangeEvent) => void;
  onPress: () => void;
};

export default function TabBarComponent({
  active,
  options,
  color,
  onLayout,
  onPress,
}: TabBarComponentProps) {
  const { colors } = useTheme();

  const animatedComponentCircleStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(active ? 1.1 : 0, { duration: 250 }),
        },
      ],
      backgroundColor: colors.background,
      borderWidth: 2.5,
      borderColor: colors.background2,
    };
  });

  const animatedIconContainerStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(active ? 1.1 : 0.5, { duration: 250 }),
    };
  });

  return (
    <Pressable onPress={onPress} onLayout={onLayout} style={styles.component}>
      <Animated.View
        style={[styles.componentCircle, animatedComponentCircleStyles]}
      />
      <Animated.View
        style={[styles.iconContainer, animatedIconContainerStyles]}
      >
        {options.tabBarIcon ? (
          options.tabBarIcon({
            focused: active as boolean,
            color: color,
            size: 25,
          })
        ) : (
          <Text>?</Text>
        )}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  component: {
    height: 60,
    width: 60,
    marginTop: -5,
  },
  componentCircle: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
