import { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { moderateScale } from 'react-native-size-matters';
import { UserAdd01Icon } from '@hugeicons/core-free-icons';

import { useTheme } from '../../hooks/useTheme';

interface FriendRequestButtonProps {
  userId: string;
  isFriend?: boolean;
  onSendRequest?: (userId: string) => void; // Acción al aceptar
}

export function AddFriendButton({
  userId,
  isFriend = false,
  onSendRequest,
}: FriendRequestButtonProps) {
  const { colors, typography } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const handleSendRequest = () => {
    if (onSendRequest) {
      onSendRequest(userId);
    }
    setModalVisible(false);
  };

  return (
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
  );
}

const styles = StyleSheet.create({
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
  iconInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(5),
  },
});
