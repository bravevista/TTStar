import React, { useState } from 'react';
import { View, Pressable, Modal, Text, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { HugeiconsIcon } from '@hugeicons/react-native';
import {
  UserAdd01Icon,
  UserCheck01Icon,
  UserTime01Icon,
  XCloseIcon,
  CheckCircle02Icon,
} from '@hugeicons/core-free-icons';

import { useTheme } from '../../hooks/useTheme';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RelationshipModule } from '../../api/repository/relationship.repository';
import { ActivityIndicator } from 'react-native-paper';
import Toast from 'react-native-toast-message';

interface FriendRequestButtonProps {
  userUuid: string;
  relationship?: {
    isFriend: boolean;
    hasSentRequest: boolean;
    hasReceivedRequest: boolean;
  };
}

export function AddFriendButton({
  userUuid,
  relationship = {
    isFriend: false,
    hasSentRequest: false,
    hasReceivedRequest: false,
  },
}: FriendRequestButtonProps) {
  const { colors, typography } = useTheme();
  const queryClient = useQueryClient();

  const [modalVisible, setModalVisible] = useState(false);
  const [responseModalVisible, setResponseModalVisible] = useState(false);

  // Determina el estado actual del botón
  let buttonState: 'friend' | 'pending_sent' | 'pending_received' | 'add' =
    'add';

  if (relationship.isFriend) {
    buttonState = 'friend';
  } else if (relationship.hasSentRequest) {
    buttonState = 'pending_sent';
  } else if (relationship.hasReceivedRequest) {
    buttonState = 'pending_received';
  }

  const icon =
    buttonState === 'friend'
      ? UserCheck01Icon
      : buttonState === 'pending_sent' || buttonState === 'pending_received'
        ? UserTime01Icon
        : UserAdd01Icon;

  const backgroundColor =
    buttonState === 'friend'
      ? colors.background
      : buttonState === 'pending_sent' || buttonState === 'pending_received'
        ? colors.background
        : colors.primary;

  const textColor =
    buttonState === 'friend' ||
    buttonState === 'pending_sent' ||
    buttonState === 'pending_received'
      ? colors.textSecondary
      : 'white';

  // Mutaciones

  const { mutate: sendRequest, isPending: isSending } = useMutation({
    mutationFn: async () =>
      await RelationshipModule.sendFriendRequest(userUuid),
    onSuccess: () => {
      setModalVisible(false);
      queryClient.invalidateQueries({
        queryKey: ['user-relationship', userUuid],
      });
      Toast.show({
        type: 'success',
        text1: 'Solicitud enviada',
        text2: 'Esperando respuesta...',
      });
    },
    onError: (error: any) => {
      setModalVisible(false);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message || 'No se pudo enviar la solicitud',
      });
    },
  });

  const { mutate: cancelRequest, isPending: isCancelling } = useMutation({
    mutationFn: async () =>
      await RelationshipModule.cancelFriendRequest(userUuid),
    onSuccess: () => {
      setModalVisible(false);
      queryClient.invalidateQueries({
        queryKey: ['user-relationship', userUuid],
      });
      Toast.show({
        type: 'info',
        text1: 'Solicitud cancelada',
      });
    },
    onError: (error: any) => {
      setModalVisible(false);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message || 'No se pudo cancelar la solicitud',
      });
    },
  });

  const { mutate: respondToRequest, isPending: isResponding } = useMutation({
    mutationFn: async (response: 'Accepted' | 'Rejected') =>
      await RelationshipModule.responseFriendRequest(userUuid, response),
    onSuccess: (_, response) => {
      setResponseModalVisible(false);
      queryClient.invalidateQueries({
        queryKey: ['user-relationship', userUuid],
      });
      Toast.show({
        type: 'success',
        text1:
          response === 'Accepted' ? 'Amigo agregado' : 'Solicitud rechazada',
      });
    },
    onError: (error: any) => {
      setResponseModalVisible(false);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message || 'No se pudo responder a la solicitud',
      });
    },
  });

  return (
    <>
      <Pressable
        style={[
          styles.button,
          {
            backgroundColor,
            borderColor: colors.primary,
          },
        ]}
        onPress={() => {
          if (buttonState === 'pending_received') {
            setResponseModalVisible(true); // Aceptar/rechazar
          } else if (buttonState === 'pending_sent') {
            setModalVisible(true); // Cancelar
          } else if (buttonState === 'add') {
            setModalVisible(true); // Enviar
          }
        }}
        disabled={isSending || isCancelling || isResponding}
      >
        {(isSending || isCancelling || isResponding) && (
          <ActivityIndicator size={moderateScale(15)} animating color="white" />
        )}
        {!isSending && !isCancelling && !isResponding && (
          <HugeiconsIcon
            icon={icon}
            size={moderateScale(16)}
            color={textColor}
            strokeWidth={2.5}
          />
        )}
      </Pressable>

      {/* Modal para enviar/cancelar solicitud */}
      <Modal
        animationType="fade"
        transparent
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
              {buttonState === 'add'
                ? '¿Quieres enviar una solicitud de amistad?'
                : '¿Quieres cancelar la solicitud de amistad?'}
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
                  {
                    backgroundColor:
                      buttonState === 'add' ? colors.primary : colors.error,
                  },
                ]}
                onPress={() =>
                  buttonState === 'add' ? sendRequest : () => cancelRequest()
                }
              >
                <Text
                  style={{
                    color: 'white',
                    fontWeight: typography.fontWeights.bold,
                  }}
                >
                  {buttonState === 'add' ? 'Enviar' : 'Cancelar'}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal para aceptar/rechazar solicitud recibida */}
      <Modal
        animationType="fade"
        transparent
        visible={responseModalVisible}
        onRequestClose={() => setResponseModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: colors.background },
            ]}
          >
            <Text style={[styles.modalText, { color: colors.text }]}>
              ¿Quieres aceptar o rechazar esta solicitud?
            </Text>
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, { backgroundColor: colors.error }]}
                onPress={() => respondToRequest('Rejected')}
              >
                <Text style={{ color: 'white' }}>Rechazar</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.modalButton,
                  { backgroundColor: colors.success },
                ]}
                onPress={() => respondToRequest('Accepted')}
              >
                <Text style={{ color: 'white' }}>Aceptar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
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
