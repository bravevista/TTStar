import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '../../hooks/useTheme';
import { getAcronym } from '../../utils/GetAcronimun.utils';
import { UserType, userTypeLabels } from '../../utils/TransformTypeUser.utils';
import { RelationshipModule } from '../../api/repository/relationship.repository';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../types/navigation';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface FriendRequestProps {
  senderUuid: string;
  type?: string;
  profilephoto?: string;
  name?: string;
  lastname?: string;
  username?: string;
  faculty?: string;
  universitycareer?: string;
  coverphoto?: string;
}

export default function FriendRequest({
  senderUuid,
  type,
  profilephoto,
  name,
  lastname,
  username,
  faculty,
  universitycareer,
  coverphoto,
}: FriendRequestProps) {
  const { colors, typography } = useTheme();
  const queryClient = useQueryClient();
  const facultyAcronym = getAcronym(faculty ?? '');

  const navigation =
    useNavigation<
      NativeStackNavigationProp<MainStackParamList, 'ProfileUser'>
    >();

  const handleProfile = () => {
    navigation.navigate('ProfileUser', { uuid: senderUuid });
  };

  const { mutate: respondToRequest, isPending } = useMutation({
    mutationFn: async (response: 'Accepted' | 'Rejected') =>
      await RelationshipModule.responseFriendRequest(senderUuid, response),
    onSuccess: async (_, response) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['user-relationship', senderUuid],
        }),
        queryClient.invalidateQueries({ queryKey: ['friend-requests'] }),
      ]);
      Toast.show({
        type: 'success',
        text1:
          response === 'Accepted' ? 'Amigo agregado' : 'Solicitud rechazada',
      });
    },
    onError: (error: any) => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message || 'No se pudo responder a la solicitud',
      });
    },
  });

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background, width: SCREEN_WIDTH * 0.98 },
      ]}
    >
      <Image
        source={coverphoto}
        style={[styles.cover, { width: SCREEN_WIDTH * 0.95 }]}
        contentFit="cover"
      />
      <Pressable
        style={({ pressed }) => [
          styles.content,
          {
            width: SCREEN_WIDTH * 0.95,
            opacity: pressed ? 0.7 : 1,
          },
        ]}
        onPress={handleProfile}
      >
        <Image
          source={profilephoto}
          style={[styles.image, { borderColor: colors.primary }]}
          contentFit="cover"
        />
        <View style={[styles.textContainer, { width: SCREEN_WIDTH * 0.5 }]}>
          <Text
            numberOfLines={1}
            lineBreakMode="tail"
            style={[{ color: colors.text, fontSize: typography.fontSizes.md }]}
          >
            {name} {lastname}
          </Text>
          <Text
            numberOfLines={1}
            lineBreakMode="tail"
            style={[
              {
                color: colors.textSecondary,
                fontSize: typography.fontSizes.sm,
              },
            ]}
          >
            @{username} - {userTypeLabels[type as UserType]}
          </Text>
          <Text
            numberOfLines={1}
            lineBreakMode="tail"
            style={[{ color: colors.text, fontSize: typography.fontSizes.sm }]}
          >
            {universitycareer}
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: colors.primary, opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={() => respondToRequest('Accepted')}
          >
            <Text
              style={[
                {
                  color: 'white',
                  fontSize: typography.fontSizes.sm,
                  fontWeight: typography.fontWeights.bold,
                },
              ]}
            >
              ACEPTAR
            </Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: colors.error, opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={() => respondToRequest('Rejected')}
          >
            <Text
              style={[
                {
                  color: 'white',
                  fontSize: typography.fontSizes.sm,
                  fontWeight: typography.fontWeights.bold,
                },
              ]}
            >
              DECLINAR
            </Text>
          </Pressable>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: verticalScale(5),
    paddingHorizontal: scale(10),
    borderRadius: moderateScale(2),
    alignItems: 'center',
    gap: moderateScale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textContainer: {},
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(8),
  },
  image: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(21),
    borderWidth: scale(2),
  },
  cover: {
    width: moderateScale(80),
    height: moderateScale(60),
    borderTopLeftRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
  },
  buttonsContainer: {
    flexDirection: 'column',
    gap: moderateScale(4),
  },
  button: {
    width: moderateScale(100),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
