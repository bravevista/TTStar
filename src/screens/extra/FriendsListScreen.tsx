import { ScrollView, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import Friend from '../../components/specific/Friend';

interface Props {
  query: string;
}

export default function FriendsListScreen({ query }: Props) {
  const { colors } = useTheme();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <Friend />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
