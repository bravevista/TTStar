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
import { scale, verticalScale } from 'react-native-size-matters';
import { Image, ImageBackground } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TabScreenProps } from '../../types/navigation';
import { useTheme } from '../../hooks/useTheme';
import MainHeader from '../../components/common/MainHeader';
import ExploreStackNavigator from '../../navigation/ExploreStackNavigator';
import TransparentButton from '../../components/specific/TransparenteButton';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ExploreScreen({
  navigation,
  route,
}: TabScreenProps<'ExploreTab'>) {
  const { colors, typography, theme } = useTheme();

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <MainHeader />
      <TransparentButton />
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
          <Pressable style={styles.categorySelected}>
            <Text
              style={{
                color: 'transparent',
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
    </SafeAreaView>
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
  categorySelected: {
    borderWidth: 2,
    borderColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    backgroundColor: 'transparent',
  },
  stackSection: {
    flex: 1,
    paddingTop: verticalScale(2),
  },
});
