import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Image } from 'expo-image';
import { FontAwesome6 } from '@expo/vector-icons';
import Svg, { Line } from 'react-native-svg';

import { useTheme } from '../../hooks/useTheme';
import VerifiedCheck from '../../assets/svg/VerifiedCheck';
import { useUserStore } from '../../contexts/store/useUserStore';
import { MainStackParamList } from '../../types/navigation';

export default function PresentationProfile({
  leftNavigateTo,
  rightNavigateTo,
}: any) {
  const { colors, typography } = useTheme();
  const userMe = useUserStore(state => state.user);
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const handleEdit = () => {
    navigation.navigate(leftNavigateTo, { uuid: userMe?._id });
  };

  const handleProfile = () => {
    navigation.navigate(rightNavigateTo, { uuid: userMe?._id });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Pressable
        onPress={handleEdit}
        style={({ pressed }) => [
          styles.LIContainer,
          { backgroundColor: pressed ? colors.card : colors.background },
        ]}
      >
        <Image
          source={userMe?.profilephoto}
          style={[styles.image, { borderColor: colors.primary }]}
          contentFit="cover"
        />
        <View style={styles.body}>
          <View style={styles.data}>
            <View style={styles.name}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  {
                    color: colors.text,
                    fontSize: typography.fontSizes.lg,
                    fontWeight: typography.fontWeights.bold,
                  },
                ]}
              >
                {userMe?.name?.split(' ')[0]} {userMe?.lastname?.split(' ')[0]}
              </Text>
              <VerifiedCheck
                primaryColor={colors.primary}
                size={moderateScale(20)}
              />
            </View>
            <Text
              style={[
                { color: colors.text, fontSize: typography.fontSizes.sm },
              ]}
            >
              @{userMe?.username}
            </Text>
          </View>
          <Svg height={2} style={styles.horizontalLine} pointerEvents="none">
            <Line
              x1="0"
              y1="0"
              x2="100%"
              y2="0"
              stroke={colors.text}
              strokeWidth="2"
            />
          </Svg>
          <View style={styles.insigniaContainer}>
            <View style={styles.insignia}>
              <Image
                source={
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/UNMSM_coatofarms_seal.svg/514px-UNMSM_coatofarms_seal.svg.png'
                }
                style={styles.icoInsignia}
                contentFit="contain"
              />
              <Text style={[{ color: colors.textSecondary }]}>UNMSM</Text>
            </View>
            <View style={styles.insignia}>
              <Image
                source={
                  'https://procsoft.wordpress.com/wp-content/uploads/2019/10/cropped-logo-fisi-3.png?w=240'
                }
                style={styles.icoInsignia}
                contentFit="fill"
              />
              <Text style={[{ color: colors.textSecondary }]}>FISI</Text>
            </View>
          </View>
        </View>
      </Pressable>

      <View style={styles.LCContainer}>
        <Svg width={2} style={styles.verticalLine}>
          <Line
            x1="0"
            y1="0"
            x2="0"
            y2="100%"
            stroke={colors.text}
            strokeWidth="2"
          />
        </Svg>
      </View>

      <Pressable
        onPress={handleProfile}
        style={({ pressed }) => [
          styles.LDContainer,
          { backgroundColor: pressed ? colors.card : colors.background },
        ]}
      >
        <FontAwesome6
          name="arrow-up-right-from-square"
          size={moderateScale(21)}
          color={colors.text}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: scale(340),
    height: verticalScale(70),
    borderRadius: moderateScale(15),
    flexDirection: 'row',
  },
  LIContainer: {
    flex: 0.805,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(15),
    borderTopLeftRadius: moderateScale(15),
    borderBottomLeftRadius: moderateScale(15),
  },
  image: {
    width: moderateScale(52),
    height: moderateScale(52),
    borderRadius: 21,
    borderWidth: scale(2),
  },
  body: {
    width: scale(170),
  },
  data: {
    paddingHorizontal: scale(2),
  },
  name: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: moderateScale(7),
    width: moderateScale(157),
  },
  horizontalLine: {
    width: '100%',
    marginVertical: verticalScale(3),
  },
  insigniaContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: scale(2),
    gap: moderateScale(10),
  },
  insignia: {
    flexDirection: 'row',
    gap: moderateScale(5),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icoInsignia: {
    width: moderateScale(14),
    height: moderateScale(14),
  },
  LCContainer: {
    flex: 0.02,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verticalLine: {
    height: '60%',
    marginHorizontal: scale(1),
  },
  LDContainer: {
    flex: 0.175,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: moderateScale(15),
    borderBottomRightRadius: moderateScale(15),
  },
});
