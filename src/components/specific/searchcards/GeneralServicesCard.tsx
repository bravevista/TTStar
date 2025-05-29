import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useUserStore } from '../../../contexts/store/useUserStore';

export function GeneralServicesCard({
  user,
  color,
}: {
  user: any;
  color: any;
}) {
  const { colors, typography } = useTheme();
  const userTypesense = useUserStore(state => state.user);
  const itsMe = userTypesense?._id === user.id;

  function getAcronym(phrase: string): string {
    return phrase
      .split(' ')
      .filter(word => word[0] === word[0]?.toUpperCase())
      .map(word => word[0])
      .join('');
  }

  return (
    <View style={styles.userInfo}>
      <Text style={[styles.name, { color: colors.text }]}>
        {user.name} {user.lastname}
      </Text>
      <View style={styles.typeLabel}>
        <Text style={[styles.username, { color: colors.textSecondary }]}>
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
          {user.type === 'generalservices' ? 'Servicios generales' : user.type}
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
      <Text>
        {getAcronym(user.university ?? '')} - {user.job}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  username: {
    fontSize: 14,
  },
  typeLabel: {
    flexDirection: 'row',
    gap: moderateScale(10),
    marginTop: 2,
    alignItems: 'center',
  },
  type: {
    borderRadius: moderateScale(5),
    paddingHorizontal: scale(5),
    paddingVertical: verticalScale(2),
  },
});
