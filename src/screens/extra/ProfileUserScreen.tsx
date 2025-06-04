import React, { useState } from 'react';
import { Image } from 'expo-image';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Pressable,
  Modal,
  ScrollView,
} from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { HugeiconsIcon } from '@hugeicons/react-native';
import {
  GraduationScrollIcon,
  BirthdayCakeIcon,
  AudioBook04Icon,
  AirdropIcon,
  AddTeamIcon,
  Navigation04Icon,
  UserAdd01Icon,
  IdIcon,
  SmartPhone01Icon,
  BalloonsIcon,
  Briefcase01Icon,
  Building03Icon,
  UserGroup03Icon,
  MusicNoteSquare02Icon,
} from '@hugeicons/core-free-icons';
import { RouteProp, useRoute } from '@react-navigation/native';

import { useTheme } from '../../hooks/useTheme';
import HeaderProfile from '../../components/specific/HeaderProfile';
import { MainStackParamList } from '../../types/navigation';
import { useUserProfile } from '../../hooks/useUserProfile.hook';
import Toast from 'react-native-toast-message';
import { FollowButton } from '../../components/specific/FollowButton';
import { Loading } from '../../components/common/Loading';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Tipos para campos adicionales
type UserField = {
  icon: React.ComponentType;
  value: string | null | undefined;
  label: string;
};

const userTypeLabels = {
  student: 'Estudiante',
  professor: 'Docente',
  administrative: 'Administrativo',
  generalservices: 'Servicios generales',
} as const;

type UserType = keyof typeof userTypeLabels;

export default function ProfileUserScreen() {
  const { colors, typography } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const route = useRoute<RouteProp<MainStackParamList, 'ProfileUser'>>();
  const { uuid } = route.params;

  const { userData, isFollowing, socialStats, isLoading, isOwnProfile, error } =
    useUserProfile(uuid);

  const userTypeLabels = {
    student: 'Estudiante',
    professor: 'Docente',
    administrative: 'Administrativo',
    generalservices: 'Servicios generales',
  };

  function getAcronym(phrase: string): string {
    return phrase
      .split(' ')
      .filter(word => word[0] === word[0]?.toUpperCase())
      .map(word => word[0])
      .join('');
  }
  const acronymFaculty = getAcronym(userData?.faculty ?? '');

  // Capitalizar primer carácter
  function capitalizeFirst(text: string): string {
    return text ? text[0].toUpperCase() + text.slice(1) : '';
  }
  const academicLevel = capitalizeFirst(userData?.academicdegree ?? '');

  // Formatear fecha
  function formatDate(dateInput: Date | string): string {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return '';
    const day = date.getDate();
    const monthNames = [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ];
    return `${day} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  }
  const birthdaydate = formatDate(userData?.birthdaydate ?? '');

  const userFields: UserField[] = [
    {
      icon: UserGroup03Icon,
      value: userData?.organization,
      label: 'Organización',
    },
    {
      icon: Building03Icon,
      value: userData?.employer,
      label: 'Empleador',
    },
    {
      icon: Briefcase01Icon,
      value: userData?.job,
      label: 'Trabajo',
    },
    {
      icon: GraduationScrollIcon,
      value: academicLevel,
      label: 'Nivel',
    },
    {
      icon: BirthdayCakeIcon,
      value: birthdaydate,
      label: 'Nacimiento',
    },
    {
      icon: SmartPhone01Icon,
      value: userData?.cellphone,
      label: 'Teléfono',
    },
    {
      icon: IdIcon,
      value: userData?.code,
      label: 'Código',
    },
    {
      icon: BalloonsIcon,
      value: userData?.gender,
      label: 'Género',
    },
    {
      icon: MusicNoteSquare02Icon,
      value: userData?.profilemusic,
      label: 'Música',
    },
  ];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background2 }}>
      <HeaderProfile />
      <View style={{ position: 'relative', height: verticalScale(170) }}>
        {/* Imagen de portada */}
        <Image
          source={userData?.coverphoto}
          style={[styles.coverphoto, { width: SCREEN_WIDTH }]}
          contentFit="cover"
        />

        {/* Foto de perfil superpuesta */}
        <View
          style={[
            styles.profilePhotoContainer,
            { backgroundColor: colors.background },
          ]}
        >
          <Image
            source={userData?.profilephoto}
            style={[styles.profilephoto, { borderColor: colors.primary }]}
            contentFit="cover"
          />
        </View>

        {/* Botones solo si no es el perfil propio */}
        {!isOwnProfile && (
          <>
            <Pressable
              style={[
                styles.friendRequest,
                {
                  backgroundColor: colors.background,
                  borderColor: colors.primary,
                },
              ]}
              onPress={() => setModalVisible(true)}
            >
              <View style={styles.iconInfo}>
                <HugeiconsIcon
                  icon={UserAdd01Icon}
                  size={moderateScale(15)}
                  color={colors.text}
                  strokeWidth={3}
                />
              </View>
            </Pressable>
            <FollowButton
              followedUuid={uuid}
              initiallyFollowing={isFollowing}
            />
          </>
        )}
      </View>

      {/* Datos del usuario */}
      <View
        style={[
          styles.data,
          { width: SCREEN_WIDTH, backgroundColor: colors.background },
        ]}
      >
        <Text
          style={[
            styles.name,
            {
              color: colors.text,
              fontSize: typography.fontSizes.xl,
              fontWeight: typography.fontWeights.bold,
            },
          ]}
        >
          {userData?.name} {userData?.lastname}
        </Text>

        <View style={styles.iconInfo}>
          <Text style={{ color: colors.textSecondary }}>
            @{userData?.username}
          </Text>
          {userData?.type && (
            <Text
              style={[
                styles.type,
                {
                  backgroundColor: colors.primary,
                  color: 'white',
                  fontSize: typography.fontSizes.xs,
                },
              ]}
            >
              {userTypeLabels[userData.type as UserType]}
            </Text>
          )}
        </View>
        <Text
          style={{
            color: colors.text,
            fontWeight: typography.fontWeights.medium,
          }}
        >
          {userData?.email}
        </Text>
        {acronymFaculty && userData?.faculty && (
          <Text style={{ color: colors.text }}>
            {userData.faculty} ({acronymFaculty})
          </Text>
        )}
        {acronymFaculty && userData?.universitycareer && (
          <Text
            style={[
              { color: colors.text, fontWeight: typography.fontWeights.bold },
            ]}
          >
            {userData.universitycareer}
          </Text>
        )}
        <View style={[styles.extraData, { paddingTop: 7 }]}>
          <View style={styles.iconInfo}>
            <HugeiconsIcon
              icon={AirdropIcon}
              size={moderateScale(15)}
              color={colors.text}
              strokeWidth={1.5}
            />
            <Text style={{ color: colors.text }}>
              {socialStats.numberOfFollowers} seguidores
            </Text>
          </View>
          <View style={styles.iconInfo}>
            <HugeiconsIcon
              icon={AddTeamIcon}
              size={moderateScale(15)}
              color={colors.text}
              strokeWidth={1.5}
            />
            <Text style={{ color: colors.text }}>
              {socialStats.numberOfFriends} amigos
            </Text>
          </View>
        </View>
      </View>

      {/* Campos adicionales dinámicos */}
      {userFields.some(field => field.value) && (
        <View
          style={[
            styles.dynamicFieldsContainer,
            { width: SCREEN_WIDTH, backgroundColor: colors.background },
          ]}
        >
          {userFields.map(
            (field, index) =>
              field.value && (
                <View
                  key={index}
                  style={[
                    styles.fieldRow,
                    { backgroundColor: colors.background2 },
                  ]}
                >
                  <View style={styles.iconInfo}>
                    <HugeiconsIcon
                      icon={field.icon}
                      size={moderateScale(15)}
                      color={colors.textSecondary}
                      strokeWidth={1.5}
                    />
                    <Text
                      style={{
                        color: colors.textSecondary,
                        fontWeight: typography.fontWeights.medium,
                      }}
                    >
                      {field.label}:
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: colors.text,
                      flexShrink: 1,
                      maxWidth: SCREEN_WIDTH - moderateScale(120), // Evitar desbordamiento
                    }}
                    numberOfLines={1}
                    ellipsizeMode="middle"
                  >
                    {field.value}
                  </Text>
                </View>
              )
          )}
        </View>
      )}

      {/* Sobre mí */}
      <View
        style={[
          styles.aboutMe,
          { width: SCREEN_WIDTH, backgroundColor: colors.background },
        ]}
      >
        <View style={styles.iconInfo}>
          <HugeiconsIcon
            icon={AudioBook04Icon}
            size={moderateScale(15)}
            color={colors.textSecondary}
            strokeWidth={2}
          />
          <Text
            style={{
              color: colors.textSecondary,
              fontWeight: typography.fontWeights.bold,
            }}
          >
            Sobre mí:
          </Text>
        </View>
        <Text style={{ color: colors.text }}>{userData?.bio}</Text>
      </View>

      {/* Medallero */}
      <View
        style={[
          styles.medalTable,
          { width: SCREEN_WIDTH, backgroundColor: colors.background },
        ]}
      >
        <View style={styles.iconInfo}>
          <HugeiconsIcon
            icon={AudioBook04Icon}
            size={moderateScale(15)}
            color={colors.textSecondary}
            strokeWidth={2}
          />
          <Text
            style={{
              color: colors.textSecondary,
              fontWeight: typography.fontWeights.bold,
            }}
          >
            Medallero
          </Text>
        </View>
      </View>

      {!isOwnProfile && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View
              style={[
                styles.modalContent,
                { backgroundColor: colors.background },
              ]}
            >
              <Text style={[styles.modalText, { color: colors.text }]}>
                ¿Estás seguro de enviar una solicitud de amistad?
              </Text>

              <View style={styles.modalButtons}>
                <Pressable
                  style={[
                    styles.modalButton,
                    {
                      backgroundColor: colors.background,
                      borderColor: colors.text,
                    },
                  ]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text
                    style={{
                      color: colors.text,
                      fontSize: typography.fontSizes.md,
                      fontWeight: typography.fontWeights.bold,
                    }}
                  >
                    Cancelar
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.modalButton,
                    { backgroundColor: colors.primary },
                  ]}
                  onPress={() => {
                    // Acción para enviar solicitud
                    setModalVisible(false);
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: typography.fontWeights.bold,
                    }}
                  >
                    Enviar
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      )}
      <Toast />
    </ScrollView>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  coverphoto: {
    height: verticalScale(170),
  },
  profilePhotoContainer: {
    position: 'absolute',
    bottom: -moderateScale(50),
    left: moderateScale(10),
    width: moderateScale(95),
    height: moderateScale(95),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(25),
    zIndex: 10,
  },
  profilephoto: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(20),
    borderWidth: scale(2.5),
  },
  friendRequest: {
    position: 'absolute',
    bottom: -moderateScale(40),
    left: moderateScale(260),
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(8),
    borderRadius: moderateScale(10),
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 16,
  },
  data: {
    paddingHorizontal: scale(18),
    paddingVertical: verticalScale(15),
    justifyContent: 'center',
    marginBottom: moderateScale(4),
  },
  name: {
    paddingTop: verticalScale(25),
  },
  type: {
    marginLeft: moderateScale(2),
    borderRadius: moderateScale(15),
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(2),
  },
  extraData: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: moderateScale(15),
  },
  iconInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(5),
  },
  dynamicFieldsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(15),
    gap: moderateScale(6),
    marginBottom: moderateScale(4),
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(5),
    borderRadius: moderateScale(8),
    paddingVertical: moderateScale(6),
    paddingHorizontal: moderateScale(10),
    flexShrink: 1,
    flexGrow: 0,
    flexBasis: 'auto',
  },
  aboutMe: {
    paddingVertical: verticalScale(15),
    paddingHorizontal: scale(18),
    gap: moderateScale(5),
    marginBottom: moderateScale(4),
  },
  medalTable: {
    paddingVertical: verticalScale(15),
    paddingHorizontal: scale(18),
    justifyContent: 'center',
    alignItems: 'center',
    gap: moderateScale(5),
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: moderateScale(20),
    borderRadius: moderateScale(12),
    alignItems: 'center',
  },
  modalText: {
    fontSize: moderateScale(15),
    textAlign: 'center',
    marginBottom: moderateScale(15),
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: moderateScale(10),
  },
  modalButton: {
    flex: 1,
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
});
