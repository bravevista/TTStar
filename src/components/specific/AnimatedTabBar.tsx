import React, { useReducer } from 'react';
import { StyleSheet, View, LayoutChangeEvent } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { Svg, Path } from 'react-native-svg';

import TabBarComponent from './TabBarComponent';
import { useTheme } from '../../hooks/useTheme';

const AnimatedSVG = Animated.createAnimatedComponent(Svg);

export default function AnimatedTabBar({
  state: { index: activeIndex, routes },
  navigation,
  descriptors,
}: BottomTabBarProps) {
  const { colors, theme } = useTheme();
  const { bottom } = useSafeAreaInsets();

  const reducer = (state: any, action: { x: number; index: number }) => {
    return [...state, { x: action.x, index: action.index }];
  };

  const [layout, dispatch] = useReducer(reducer, []);

  const handleLayout = (event: LayoutChangeEvent, index: number) => {
    dispatch({ x: event.nativeEvent.layout.x, index });
  };

  const xOffset = useDerivedValue(() => {
    if (layout.length !== routes.length) return 0;
    return (
      [...layout].find(({ index }) => index === activeIndex)!.x + (60 - 110) / 2
    ); // Centrar el indicador
  }, [activeIndex, layout]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(xOffset.value, { duration: 250 }) }],
    };
  });

  return (
    <View
      style={[
        {
          backgroundColor: colors.background,
          borderColor: colors.border,
          paddingBottom: bottom,
        },
      ]}
    >
      <AnimatedSVG
        width={110}
        height={60}
        viewBox="0 0 110 60"
        style={[styles.activeBackground, animatedStyles]}
      >
        <Path
          fill={colors.background2}
          d="M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20z"
        />
      </AnimatedSVG>

      <View style={[styles.tabBarContainer, { borderTopColor: colors.card }]}>
        {routes.map((route, index) => {
          const active = index === activeIndex;
          const { options } = descriptors[route.key];

          return (
            <TabBarComponent
              key={route.key}
              active={active}
              options={options}
              color={active ? colors.primary : colors.textSecondary}
              onLayout={e => handleLayout(e, index)}
              onPress={() => navigation.navigate(route.name)}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  activeBackground: {
    position: 'absolute',
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderTopWidth: 1,
  },
});
