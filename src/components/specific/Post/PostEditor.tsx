import {
  ScrollView,
  View,
  TextInput,
  StyleSheet,
  Text,
  Dimensions,
  Pressable,
  Alert,
  Button,
  Animated,
} from 'react-native';
import { Agreement03Icon } from '@hugeicons/core-free-icons';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';

import { useEffect, useRef, useState } from 'react';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useUserStore } from '../../../contexts/store/useUserStore';
import Post from './Post';
import { useTheme } from '../../../hooks/useTheme';
import PreviewPostModal from './PreviewPost.modal';
import { HugeiconsIcon } from '@hugeicons/react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MAX_LENGTH = 1000;

interface PostEditorProps {
  onChangeText: (text: string) => void;
  value: string;
  maxLength?: number;
}

export default function PostEditor({
  value,
  onChangeText,
  maxLength = MAX_LENGTH,
}: PostEditorProps) {
  const { colors, typography } = useTheme();
  const user = useUserStore(state => state.user);
  const [modalVisible, setModalVisible] = useState(false);
  const [focused, setFocused] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (modalVisible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      scaleAnim.setValue(0.8);
    }
  }, [modalVisible]);

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permiso requerido', 'Se necesita acceso a la cámara.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ['images'],
    });
    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult) {
      Alert.alert('Permiso requerido', 'Se necesita acceso a la galería.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
      allowsEditing: true,
    });
    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    Alert.alert('Eliminar imagen', '¿Deseas quitar la imagen seleccionada?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => setImageUri(null),
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Título */}
      <Text
        style={[
          styles.title,
          {
            color: colors.text,
            fontSize: typography.fontSizes.xl,
            fontWeight: typography.fontWeights.bold,
          },
        ]}
      >
        ¿Qué deseas compartir?
      </Text>

      {imageUri && (
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: imageUri }}
            style={styles.selectedImage}
            contentFit="cover"
          />
          <Pressable onPress={removeImage} style={styles.removeButton}>
            <AntDesign name="closecircle" size={24} color="tomato" />
          </Pressable>
        </View>
      )}

      {/* Editor de texto */}
      <TextInput
        style={[
          styles.input,
          {
            width: SCREEN_WIDTH * 0.9,
            color: colors.text,
            fontSize: typography.fontSizes.md,
            borderColor: focused ? colors.primary : colors.border,
          },
        ]}
        placeholderTextColor={colors.textSecondary}
        multiline
        placeholder="Escribe tu publicación aquí. Usa **doble asterisco** para negrita ✨"
        onChangeText={onChangeText}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        maxLength={maxLength}
        textAlignVertical="top"
      />

      {/* Contador */}
      <View style={styles.counterContainer}>
        <Text
          style={[
            styles.counterText,
            { color: colors.textSecondary, fontSize: typography.fontSizes.sm },
          ]}
        >
          {value.length}/{maxLength}
        </Text>
      </View>

      {/* Divisor */}
      <View
        style={[
          styles.divider,
          {
            backgroundColor: colors.border,
            width: SCREEN_WIDTH,
          },
        ]}
      />

      {/* Botones de acción de imagen */}
      <View style={styles.imageActionsContainer}>
        <Pressable onPress={pickImage} style={styles.iconButton}>
          <Feather name="image" size={22} color={colors.primary} />
        </Pressable>

        <Pressable onPress={takePhoto} style={styles.iconButton}>
          <Feather name="camera" size={22} color={colors.primary} />
        </Pressable>

        <View
          style={[
            styles.dividerHorizontal,
            {
              backgroundColor: colors.border,
              height: '60%',
              width: 2,
            },
          ]}
        />

        <Pressable
          onPress={() => {}}
          style={[styles.iconButtonv2, { borderColor: colors.primary }]}
        >
          <HugeiconsIcon
            icon={Agreement03Icon}
            size={moderateScale(21)}
            color={colors.primary}
            strokeWidth={2}
          />
          <Text
            style={{
              color: colors.primary,
              fontSize: typography.fontSizes.xs,
              fontWeight: typography.fontWeights.bold,
            }}
          >
            POST
          </Text>
        </Pressable>
      </View>

      <View style={{ flexDirection: 'row', gap: moderateScale(5) }}>
        <Pressable onPress={() => setModalVisible(true)}>
          <View style={[styles.viewPreview, styles.iconButton]}>
            <Feather name="airplay" size={24} color={colors.primary} />
            <Text style={{ color: colors.primary }}>GUÍA</Text>
          </View>
        </Pressable>
        {/* Modal Preview */}
        <Pressable onPress={() => setModalVisible(true)}>
          <View style={[styles.viewPreview, styles.iconButton]}>
            <Feather name="eye" size={24} color={colors.primary} />
            <Text style={{ color: colors.primary }}>VISTA PREVIA</Text>
          </View>
        </Pressable>
      </View>

      <PreviewPostModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="✨ Gran trabajo, se ve estupendo. ✨"
        closeButtonText="¡Continuemos!"
        backgroundDismiss={true}
        children={
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <Post
              date="27 Dic 2025"
              content={value}
              user={user!}
              image={imageUri ?? undefined}
            />
          </Animated.View>
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: verticalScale(20),
  },
  title: {},
  input: {
    borderWidth: 1,
    borderRadius: moderateScale(8),
    padding: moderateScale(12),
    minHeight: verticalScale(100),
    marginTop: moderateScale(10),
  },
  counterContainer: {
    width: SCREEN_WIDTH * 0.9,
    alignItems: 'flex-end',
    marginTop: verticalScale(5),
  },
  counterText: {
    fontStyle: 'italic',
  },
  divider: {
    height: moderateScale(1.5),
    marginVertical: moderateScale(7),
  },
  dividerHorizontal: {
    marginVertical: moderateScale(7),
  },
  previewTitle: {
    marginBottom: moderateScale(25),
  },
  previewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageButtons: {
    flexDirection: 'row',
    gap: moderateScale(8),
    marginTop: verticalScale(12),
  },
  imageButton: {
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(6),
    backgroundColor: '#eef6ff',
    borderRadius: moderateScale(6),
  },
  selectedImage: {
    width: scale(85),
    height: verticalScale(85),
    borderRadius: moderateScale(8),
    marginTop: verticalScale(10),
  },
  imageActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.9,
    gap: moderateScale(12),
    marginBottom: verticalScale(10),
  },
  iconButton: {
    padding: moderateScale(8),
    backgroundColor: '#f0f4f8',
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonv2: {
    flexDirection: 'row',
    gap: moderateScale(5),
    padding: moderateScale(4),
    backgroundColor: '#f0f4f8',
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: moderateScale(2.5),
  },
  imageWrapper: {
    width: scale(100),
    height: verticalScale(100),
    borderRadius: moderateScale(8),
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  removeButton: {
    position: 'absolute',
    top: moderateScale(8),
    right: moderateScale(8),
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 2,
  },
  viewPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(5),
  },
});
