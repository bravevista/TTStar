import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Dimensions,
  Pressable,
  Alert,
  Animated,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import { Agreement03Icon } from '@hugeicons/core-free-icons';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { Feather, AntDesign } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import { useEffect, useRef, useState } from 'react';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useUserStore } from '../../../contexts/store/useUserStore';
import Post from './Post';
import { useTheme } from '../../../hooks/useTheme';
import PreviewPostModal from './PreviewPost.modal';
import { HugeiconsIcon } from '@hugeicons/react-native';
import GuidePostModal from './GuidePost.modal';
import { Button } from '../../common/Button';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MAX_LENGTH = 1000;

interface PostEditorProps {
  onChangeText: (text: string) => void;
  value: string;
  maxLength?: number;
}

type Selection = {
  start: number;
  end: number;
};

const useImagePicker = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleImageResult = (result: ImagePicker.ImagePickerResult) => {
    if (!result.canceled && result.assets?.[0]?.uri) {
      setImageUri(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso requerido', 'Necesitamos acceso a tu galería');
      return;
    }
    handleImageResult(
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 1,
        allowsEditing: true,
      })
    );
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso requerido', 'Necesitamos acceso a tu cámara');
      return;
    }
    handleImageResult(
      await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
      })
    );
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

  return { imageUri, pickImage, takePhoto, removeImage };
};

const FormatButton = ({
  icon,
  onPress,
  tooltip,
  isPressured,
}: {
  icon: React.ReactNode;
  onPress: () => void;
  tooltip: string;
  isPressured?: boolean;
}) => {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.formatButton,
        { backgroundColor: isPressured ? colors.primary : colors.background2 },
      ]}
      accessibilityLabel={tooltip}
    >
      {icon}
    </Pressable>
  );
};

const PostEditorHeader = ({ user }: { user: any }) => {
  const { colors, typography } = useTheme();
  const [open, setOpen] = useState(false);
  const [dValue, setDValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Universidad', value: 'university' },
  ]);

  const [openT, setOpenT] = useState(false);
  const [dValueT, setDValueT] = useState(null);
  const [itemsT, setItemsT] = useState([
    { label: 'General', value: 'general' },
    { label: 'Vida Universitaria', value: 'universityLife' },
    { label: 'Innovación', value: 'innovation' },
    { label: 'Eventos', value: 'events' },
    { label: 'Reclutamiento', value: 'recruitments' },
  ]);

  return (
    <View style={[styles.header, { width: SCREEN_WIDTH * 0.9 }]}>
      <View style={styles.headerImage}>
        <Image
          source={user?.profilephoto}
          style={[styles.profileImage, { borderColor: colors.primary }]}
          contentFit="cover"
        />
        <Text
          style={{
            color: colors.text,
            fontSize: typography.fontSizes.md,
            fontWeight: typography.fontWeights.medium,
          }}
        >
          DAC:
        </Text>
      </View>
      <View style={styles.headerScope}>
        <DropDownPicker
          placeholder="Alcance ..."
          open={open}
          value={dValue}
          items={items}
          setOpen={setOpen}
          setValue={setDValue}
          setItems={setItems}
          listMode="SCROLLVIEW"
          language="ES"
          containerStyle={{ width: scale(112) }}
          style={{
            backgroundColor: colors.background2,
            borderColor: colors.background2,
            borderRadius: 20,
          }}
          textStyle={{
            color: colors.text,
            fontWeight: typography.fontWeights.medium,
            paddingHorizontal: scale(5),
          }}
          dropDownContainerStyle={{
            backgroundColor: colors.background2,
            borderColor: colors.background2,
            borderRadius: 20,
          }}
        />
        <DropDownPicker
          placeholder="Categoría ..."
          open={openT}
          value={dValueT}
          items={itemsT}
          setOpen={setOpenT}
          setValue={setDValueT}
          setItems={setItemsT}
          listMode="SCROLLVIEW"
          language="ES"
          containerStyle={{ width: scale(125) }}
          style={{
            backgroundColor: colors.background2,
            borderColor: colors.background2,
            borderRadius: 20,
          }}
          textStyle={{
            color: colors.text,
            fontWeight: typography.fontWeights.medium,
            paddingHorizontal: scale(10),
          }}
          dropDownContainerStyle={{
            backgroundColor: colors.background2,
            borderColor: colors.background2,
            borderRadius: 20,
          }}
        />
      </View>
    </View>
  );
};

const PostImagePreview = ({
  uri,
  onRemove,
}: {
  uri: string;
  onRemove: () => void;
}) => (
  <View style={styles.imageWrapper}>
    <Image source={{ uri }} style={styles.selectedImage} contentFit="cover" />
    <Pressable onPress={onRemove} style={styles.removeButton}>
      <AntDesign name="closecircle" size={24} color="tomato" />
    </Pressable>
  </View>
);

const PostActionsFooter = ({
  onPickImage,
  onTakePhoto,
  onPreview,
  onGuide,
}: {
  onPickImage: () => void;
  onTakePhoto: () => void;
  onPreview: () => void;
  onGuide: () => void;
}) => {
  const { colors, typography } = useTheme();

  return (
    <>
      <View style={styles.actionsContainer}>
        <View style={styles.imageActions}>
          <Pressable
            onPress={onPickImage}
            style={[styles.iconButton, { backgroundColor: colors.background2 }]}
          >
            <Feather name="image" size={22} color={colors.primary} />
          </Pressable>
          <Pressable
            onPress={onTakePhoto}
            style={[styles.iconButton, { backgroundColor: colors.background2 }]}
          >
            <Feather name="camera" size={22} color={colors.primary} />
          </Pressable>
        </View>

        <Pressable
          style={[
            styles.postButton,
            {
              borderColor: colors.primary,
              backgroundColor: colors.background2,
            },
          ]}
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

      <View style={styles.previewButtons}>
        <Pressable onPress={onGuide}>
          <View
            style={[
              styles.viewPreview,
              styles.iconButton,
              { backgroundColor: colors.background2 },
            ]}
          >
            <Feather name="airplay" size={24} color={colors.primary} />
            <Text style={{ color: colors.primary }}>GUÍA</Text>
          </View>
        </Pressable>
        <Pressable onPress={onPreview}>
          <View
            style={[
              styles.viewPreview,
              styles.iconButton,
              { backgroundColor: colors.background2 },
            ]}
          >
            <Feather name="eye" size={24} color={colors.primary} />
            <Text style={{ color: colors.primary }}>VISTA PREVIA</Text>
          </View>
        </Pressable>
      </View>
    </>
  );
};

export default function PostEditor({
  value,
  onChangeText,
  maxLength = MAX_LENGTH,
}: PostEditorProps) {
  const { colors, typography } = useTheme();
  const user = useUserStore(state => state.user);
  const [modalVisible, setModalVisible] = useState(false);
  const [guideVisible, setGuideVisible] = useState(false);
  const [focused, setFocused] = useState(false);
  const [selection, setSelection] = useState<Selection>({ start: 0, end: 0 });
  const [activeFormats, setActiveFormats] = useState<Record<string, boolean>>({
    bold: false,
    italic: false,
  });
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const { imageUri, pickImage, takePhoto, removeImage } = useImagePicker();

  useEffect(() => {
    if (modalVisible) {
      Animated.spring(scaleAnim, {
        toValue: 0.92,
        useNativeDriver: true,
      }).start();
    } else {
      scaleAnim.setValue(0.8);
    }
  }, [modalVisible]);

  const toggleFormat = (
    format: string,
    prefix: string,
    suffix: string = prefix
  ) => {
    const isActive = !activeFormats[format];
    setActiveFormats(prev => ({ ...prev, [format]: isActive }));
    if (isActive) {
      const newText =
        value.substring(0, selection.start) +
        prefix +
        value.substring(selection.start);
      onChangeText(newText);
      setSelection({
        start: selection.start + prefix.length,
        end: selection.start + prefix.length,
      });
    } else {
      const newText =
        value.substring(0, selection.start) +
        suffix +
        value.substring(selection.start);
      onChangeText(newText);
      setSelection({
        start: selection.start + suffix.length,
        end: selection.start + suffix.length,
      });
    }
  };

  const [isPressuredBold, setIsPressuredBold] = useState<boolean>(false);
  const [isPressuredItalic, setIsPressuredItalic] = useState<boolean>(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.container}>
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

        <PostEditorHeader user={user} />

        {imageUri && <PostImagePreview uri={imageUri} onRemove={removeImage} />}

        <View style={styles.formatToolbar}>
          <FormatButton
            icon={
              <Text
                style={[
                  styles.formatButtonText,
                  {
                    color: colors.text,
                    fontWeight: typography.fontWeights.bold,
                    fontFamily: 'monospace',
                  },
                ]}
              >
                B
              </Text>
            }
            onPress={() => {
              toggleFormat('bold', '**');
              if (!isPressuredBold) {
                setIsPressuredBold(true);
              } else {
                setIsPressuredBold(false);
              }
            }}
            tooltip="Negrita"
            isPressured={isPressuredBold}
          />
          <FormatButton
            icon={
              <Text
                style={[
                  styles.formatButtonText,
                  {
                    color: colors.text,
                    fontStyle: 'italic',
                    fontFamily: 'monospace',
                  },
                ]}
              >
                I
              </Text>
            }
            onPress={() => {
              toggleFormat('italic', '_');
              if (!isPressuredItalic) {
                setIsPressuredItalic(true);
              } else {
                setIsPressuredItalic(false);
              }
            }}
            tooltip="Cursiva"
            isPressured={isPressuredItalic}
          />
        </View>

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
          placeholder="Escribe tu publicación aquí..."
          onChangeText={onChangeText}
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onSelectionChange={({ nativeEvent }) =>
            setSelection(nativeEvent.selection)
          }
          maxLength={maxLength}
          textAlignVertical="top"
        />

        <View style={styles.counterContainer}>
          <Text
            style={[
              styles.counterText,
              {
                color: colors.textSecondary,
                fontSize: typography.fontSizes.sm,
              },
            ]}
          >
            {value.length}/{maxLength}
          </Text>
        </View>

        <View
          style={[
            styles.divider,
            {
              backgroundColor: colors.border,
              width: SCREEN_WIDTH,
            },
          ]}
        />

        <PostActionsFooter
          onPickImage={pickImage}
          onTakePhoto={takePhoto}
          onPreview={() => setModalVisible(true)}
          onGuide={() => setGuideVisible(true)}
        />

        <PreviewPostModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          title="✨ Gran trabajo, se ve estupendo. ✨"
          closeButtonText="¡Continuemos!"
          backgroundDismiss={true}
        >
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <Post
              date="27 Dic 2025"
              content={value}
              user={user!}
              image={imageUri ?? undefined}
            />
          </Animated.View>
        </PreviewPostModal>
        <GuidePostModal
          visible={guideVisible}
          onClose={() => setGuideVisible(false)}
          title="Guía rápida de uso.✨"
          closeButtonText="Sigamos"
          backgroundDismiss={true}
        />
        <View style={styles.response}>
          <Button title={'Limpiar'} variant="outline" />
          <Button title="COMPARTIR" />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  // Contenedores principales
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: verticalScale(20),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(10),
  },

  // Componentes de texto
  title: {
    paddingBottom: verticalScale(15),
  },
  counterText: {
    fontStyle: 'italic',
  },

  // Componentes de entrada
  input: {
    borderWidth: 1,
    borderRadius: moderateScale(8),
    padding: moderateScale(12),
    minHeight: verticalScale(100),
    marginTop: moderateScale(5),
  },
  formatToolbar: {
    flexDirection: 'row',
    gap: moderateScale(8),
    width: SCREEN_WIDTH * 0.9,
    marginBottom: moderateScale(5),
  },
  formatButton: {
    padding: moderateScale(6),
    borderRadius: moderateScale(6),
    width: moderateScale(30),
    height: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  formatButtonText: {
    fontSize: moderateScale(14),
  },

  // Componentes de imagen
  imageWrapper: {
    position: 'relative',
    marginBottom: verticalScale(10),
  },
  selectedImage: {
    width: scale(85),
    height: verticalScale(85),
    borderRadius: moderateScale(8),
    marginTop: verticalScale(10),
  },
  removeButton: {
    position: 'absolute',
    top: moderateScale(5),
    right: -moderateScale(10),
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 2,
  },

  // Botones y acciones
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.9,
    marginBottom: verticalScale(10),
  },
  imageActions: {
    flexDirection: 'row',
    gap: moderateScale(12),
  },
  iconButton: {
    padding: moderateScale(8),
    backgroundColor: '#f0f4f8',
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  postButton: {
    flexDirection: 'row',
    gap: moderateScale(5),
    padding: moderateScale(4),
    backgroundColor: '#f0f4f8',
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: moderateScale(2.5),
    paddingHorizontal: moderateScale(12),
  },
  previewButtons: {
    flexDirection: 'row',
    gap: moderateScale(5),
    width: SCREEN_WIDTH * 0.9,
    justifyContent: 'space-between',
  },
  viewPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(5),
  },
  divider: {
    height: moderateScale(1.5),
    marginVertical: moderateScale(10),
  },

  // Componentes del header
  headerImage: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(3),
  },
  profileImage: {
    width: moderateScale(38),
    height: moderateScale(38),
    borderRadius: moderateScale(10),
    borderWidth: 2,
    marginRight: moderateScale(5),
  },
  headerScope: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(5),
  },

  // Contadores y utilidades
  counterContainer: {
    width: SCREEN_WIDTH * 0.9,
    alignItems: 'flex-end',
    marginTop: verticalScale(5),
  },
  response: {
    flexDirection: 'row',
    marginTop: moderateScale(10),
    gap: moderateScale(10),
  },
});
