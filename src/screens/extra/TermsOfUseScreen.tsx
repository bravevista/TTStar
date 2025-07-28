import { View, Text, StyleSheet, StatusBar, FlatList } from 'react-native';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '../../hooks/useTheme';
import StackHeader from '../../components/common/StackHeader';
import FileDinamicItem from '../../components/specific/FileDinamicItem';
import { TermsOfUseSection, termsOfUseData } from '../../data/termsOfUse.data';

export default function TermsOfUseScreen() {
  const { colors, typography, theme } = useTheme();

  const renderItem = ({ item }: { item: TermsOfUseSection }) => (
    <FileDinamicItem item={item} colors={colors} typography={typography} />
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      <StackHeader
        title="Términos de uso"
        iconFamiliy="Ionicons"
        iconName="newspaper-outline"
        showBackButton
      />

      <Text
        style={[
          styles.title,
          {
            color: colors.text,
            fontSize: typography.fontSizes.xxl,
            fontWeight: typography.fontWeights.bold,
          },
        ]}
      >
        Términos de uso
      </Text>

      <FlatList
        data={termsOfUseData}
        renderItem={renderItem}
        keyExtractor={(item, index) => `terms-of-use-${index}`}
        contentContainerStyle={[
          styles.subContainer,
          { backgroundColor: colors.background },
        ]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    textAlign: 'left',
    width: scale(320),
    paddingHorizontal: scale(21),
  },
  subContainer: {
    width: scale(320),
    textAlign: 'left',
    paddingBottom: verticalScale(20),
    paddingHorizontal: scale(21),
  },
});
