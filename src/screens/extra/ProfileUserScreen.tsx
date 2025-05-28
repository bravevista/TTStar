import React, { useState } from 'react';
import { Image } from 'expo-image';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Pressable,
  Modal,
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
} from '@hugeicons/core-free-icons';

import { useUserStore } from '../../contexts/store/useUserStore';
import { useTheme } from '../../hooks/useTheme';
import HeaderProfile from '../../components/specific/HeaderProfile';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ProfileUserScreen() {
  const { colors, typography } = useTheme();
  const UserMe = useUserStore(state => state.user);
  const [modalVisible, setModalVisible] = useState(false);

  // Obtener siglas de la facultad
  function getAcronym(phrase: string): string {
    return phrase
      .split(' ')
      .filter(word => word[0] === word[0]?.toUpperCase())
      .map(word => word[0])
      .join('');
  }
  const acronymFaculty = getAcronym(UserMe?.faculty ?? '');

  // Capitalizar primer carácter
  function capitalizeFirst(text: string): string {
    return text ? text[0].toUpperCase() + text.slice(1) : '';
  }
  const academicLevel = capitalizeFirst(UserMe?.academicdegree ?? '');

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
  const birthdaydate = formatDate(UserMe?.birthdaydate ?? '');

  return (
    <View style={[styles.container, { backgroundColor: colors.background2 }]}>
      <HeaderProfile />
      <View>
        {/* Imagen de portada */}
        <Image
          source={UserMe?.coverphoto}
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
            source={UserMe?.profilephoto}
            style={[styles.profilephoto, { borderColor: colors.primary }]}
            contentFit="cover"
          />
        </View>

        {/* Botón flotante sobre la foto */}
        <Pressable
          style={[
            styles.friendRequest,
            { backgroundColor: colors.background, borderColor: colors.primary },
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

        <Pressable
          style={[styles.followButton, { backgroundColor: colors.primary }]}
          onPress={() => {
            /* Acción */
          }}
        >
          <View style={styles.iconInfo}>
            <HugeiconsIcon
              icon={Navigation04Icon}
              size={moderateScale(15)}
              color="white"
              strokeWidth={1.5}
            />
            <Text
              style={{
                color: 'white',
                fontWeight: typography.fontWeights.bold,
              }}
            >
              Seguir
            </Text>
          </View>
        </Pressable>

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
            {UserMe?.name} {UserMe?.lastname}
          </Text>

          <Text style={{ color: colors.textSecondary }}>
            @{UserMe?.username}
          </Text>
          <Text
            style={{
              color: colors.text,
              fontWeight: typography.fontWeights.medium,
            }}
          >
            {UserMe?.email}
          </Text>
          <Text style={{ color: colors.text }}>
            {acronymFaculty} - {UserMe?.universitycareer}
          </Text>

          {/* Íconos de nivel y cumpleaños */}
          <View style={styles.extraData}>
            <View style={styles.iconInfo}>
              <HugeiconsIcon
                icon={GraduationScrollIcon}
                size={moderateScale(15)}
                color={colors.text}
                strokeWidth={1.5}
              />
              <Text style={{ color: colors.text }}>{academicLevel}</Text>
            </View>
            <View style={styles.iconInfo}>
              <HugeiconsIcon
                icon={BirthdayCakeIcon}
                size={moderateScale(15)}
                color={colors.text}
                strokeWidth={1.5}
              />
              <Text style={{ color: colors.text }}>{birthdaydate}</Text>
            </View>
          </View>
        </View>

        {/* Seguidores y sobre mí */}
        <View
          style={[
            styles.aboutMe,
            { width: SCREEN_WIDTH, backgroundColor: colors.background },
          ]}
        >
          <View style={styles.extraData}>
            <View style={styles.iconInfo}>
              <HugeiconsIcon
                icon={AirdropIcon}
                size={moderateScale(15)}
                color={colors.text}
                strokeWidth={1.5}
              />
              <Text style={{ color: colors.text }}>144 seguidores</Text>
            </View>
            <View style={styles.iconInfo}>
              <HugeiconsIcon
                icon={AddTeamIcon}
                size={moderateScale(15)}
                color={colors.text}
                strokeWidth={1.5}
              />
              <Text style={{ color: colors.text }}>144 amigos</Text>
            </View>
          </View>

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
          <Text style={{ color: colors.text }}>{UserMe?.bio}</Text>
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
      </View>
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
    </View>
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
    bottom: moderateScale(277),
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
    bottom: moderateScale(282),
    left: moderateScale(260),
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(8),
    borderRadius: moderateScale(10),
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 16,
  },
  followButton: {
    position: 'absolute',
    bottom: moderateScale(282),
    left: moderateScale(300),
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(8),
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 15,
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
  extraData: {
    flexDirection: 'row',
    gap: moderateScale(15),
    marginTop: verticalScale(5),
  },
  iconInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(5),
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
