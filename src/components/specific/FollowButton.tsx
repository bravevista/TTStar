import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { ActivityIndicator } from 'react-native-paper';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Navigation04Icon } from '@hugeicons/core-free-icons';

import { RelationshipModule } from '../../api/repository/relationship.repository';
import { useTheme } from '../../hooks/useTheme';

type FollowButtonProps = {
  followedUuid: string;
  initiallyFollowing?: boolean;
};

export function FollowButton({
  followedUuid,
  initiallyFollowing = false,
}: FollowButtonProps) {
  const { colors, typography } = useTheme();
  const queryClient = useQueryClient();
  const [isFollowing, setIsFollowing] = useState(initiallyFollowing);

  const { data, mutate, isPending, error } = useMutation({
    mutationFn: async () => {
      if (isFollowing) {
        return await RelationshipModule.unFollow(followedUuid);
      } else {
        return await RelationshipModule.follow(followedUuid);
      }
    },
    onMutate: () => {
      // Opcional: animación de feedback instantáneo
    },
    onSuccess: () => {
      setIsFollowing(prev => !prev);
      queryClient.invalidateQueries({
        queryKey: ['user-relationship', followedUuid],
      });
    },
    onError: (error: any) => {
      setIsFollowing(prev => !prev);
      Toast.show({
        type: 'error',
        text1: 'Error al seguir al usuario',
        text2: error.message || 'No se pudo procesar la solicitud',
      });
    },
  });

  return (
    <Pressable
      style={[
        styles.followButton,
        {
          backgroundColor: isFollowing ? colors.background : colors.primary,
          borderColor: colors.primary,
        },
      ]}
      disabled={isPending}
      onPress={() => mutate()}
    >
      <View
        style={[
          styles.iconInfo,
          {
            paddingHorizontal: isPending ? moderateScale(20.5) : 0,
            paddingVertical: isPending ? moderateScale(1) : 0,
          },
        ]}
      >
        {isPending ? (
          <ActivityIndicator
            size={moderateScale(15)}
            animating={true}
            color="white"
          />
        ) : (
          <>
            {!isFollowing && (
              <HugeiconsIcon
                icon={Navigation04Icon}
                size={moderateScale(15)}
                color="white"
                strokeWidth={1.5}
              />
            )}
            <Text
              style={{
                color: isFollowing ? colors.text : 'white',
                fontWeight: typography.fontWeights.bold,
              }}
            >
              {isFollowing ? 'Siguiendo' : 'Seguir'}
            </Text>
          </>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  followButton: {
    position: 'absolute',
    bottom: -moderateScale(40),
    left: moderateScale(300),
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(8),
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    zIndex: 15,
  },
  iconInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(5),
  },
});
