import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  ScrollView,
  Pressable,
} from 'react-native';

import { TabScreenProps } from '../../types/navigation';
import { useTheme } from '../../hooks/useTheme';
import MainHeader from '../../components/common/MainHeader';
import { Image, ImageBackground } from 'expo-image';
import { scale, verticalScale } from 'react-native-size-matters';
import ExploreStackNavigator from '../../navigation/ExploreStackNavigator';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ExploreScreen({
  navigation,
  route,
}: TabScreenProps<'ExploreTab'>) {
  const { colors, typography, theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <MainHeader />
      <ImageBackground
        source="https://game-tournaments.com/media/news/n68138.jpeg"
        style={[styles.image, { width: SCREEN_WIDTH }]}
        contentFit="cover"
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <Pressable style={styles.category}>
            <Text
              style={{
                color: 'white',
                fontSize: typography.fontSizes.sm,
                fontWeight: typography.fontWeights.bold,
              }}
            >
              Todos
            </Text>
          </Pressable>
          <Pressable style={styles.category}>
            <Text
              style={{
                color: 'white',
                fontSize: typography.fontSizes.sm,
                fontWeight: typography.fontWeights.bold,
              }}
            >
              Vida universitaria
            </Text>
          </Pressable>
          <Pressable style={styles.category}>
            <Text
              style={{
                color: 'white',
                fontSize: typography.fontSizes.sm,
                fontWeight: typography.fontWeights.bold,
              }}
            >
              Bienestar
            </Text>
          </Pressable>
          <Pressable style={styles.category}>
            <Text
              style={{
                color: 'white',
                fontSize: typography.fontSizes.sm,
                fontWeight: typography.fontWeights.bold,
              }}
            >
              Reclutamiento
            </Text>
          </Pressable>
          <Pressable style={styles.category}>
            <Text
              style={{
                color: 'white',
                fontSize: typography.fontSizes.sm,
                fontWeight: typography.fontWeights.bold,
              }}
            >
              Académico
            </Text>
          </Pressable>
        </ScrollView>
      </ImageBackground>

      <View style={styles.stackSection}>
        <ExploreStackNavigator />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    height: scale(45),
  },
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(10),
    gap: scale(10),
  },
  category: {
    borderWidth: 2,
    borderColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  stackSection: {
    flex: 1,
    paddingTop: verticalScale(2),
  },
});
