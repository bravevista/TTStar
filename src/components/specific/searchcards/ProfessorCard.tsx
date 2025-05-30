import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useUserStore } from '../../../contexts/store/useUserStore';

export function ProfessorCard({ user, color }: { user: any; color: any }) {
  const { colors, typography } = useTheme();
  const userTypesense = useUserStore(state => state.user);
  const itsMe = userTypesense?._id === user.id;

  return (
    <View style={styles.userInfo}>
      <Text
        style={[
          {
            color: colors.text,
            fontSize: typography.fontSizes.md,
            fontWeight: typography.fontWeights.semibold,
          },
        ]}
      >
        {user.name} {user.lastname}
      </Text>
      <View style={styles.typeLabel}>
        <Text
          style={[
            { color: colors.textSecondary, fontSize: typography.fontSizes.sm },
          ]}
        >
          @{user.username}
        </Text>
        <Text
          style={[
            styles.type,
            {
              color: 'white',
              backgroundColor: color,
              fontSize: typography.fontSizes.xs,
              fontWeight: typography.fontWeights.bold,
            },
          ]}
        >
          {user.type === 'professor' ? 'Docente' : user.type}
        </Text>
        {itsMe ? (
          <Text
            style={[
              styles.type,
              {
                color: 'white',
                backgroundColor: 'brown',
                fontSize: typography.fontSizes.xs,
                fontWeight: typography.fontWeights.bold,
              },
            ]}
          >
            Tú
          </Text>
        ) : null}
      </View>
      <Text
        style={[{ color: colors.text, fontSize: typography.fontSizes.sm }]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {user.faculty ?? ''}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  userInfo: {
    flex: 1,
  },
  typeLabel: {
    flexDirection: 'row',
    gap: moderateScale(10),
    marginTop: moderateScale(2),
    alignItems: 'center',
  },
  type: {
    borderRadius: moderateScale(5),
    paddingHorizontal: scale(5),
    paddingVertical: verticalScale(2),
  },
});
