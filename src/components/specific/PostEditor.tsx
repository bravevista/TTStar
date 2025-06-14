import { View, TextInput, StyleSheet, Text } from 'react-native';
import { useState } from 'react';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import PostContent from '../common/PostContent';

interface PostEditorProps {
  onChangeText: (text: string) => void;
  value: string;
  maxLength?: number;
}

export default function PostEditor({
  value,
  onChangeText,
  maxLength = 1000,
}: PostEditorProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>¿Qué deseas compartir?</Text>
      <TextInput
        style={[styles.input, focused && styles.inputFocused]}
        multiline
        placeholder="Escribe tu publicación aquí. Usa **doble asterisco** para negrita ✨"
        onChangeText={onChangeText}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        maxLength={maxLength}
        textAlignVertical="top"
      />
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>
          {value.length}/{maxLength}
        </Text>
      </View>

      <View style={styles.previewContainer}>
        <Text style={styles.previewTitle}>Vista previa</Text>
        <PostContent text={value} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(15),
  },
  label: {
    fontSize: moderateScale(16),
    marginBottom: moderateScale(10),
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: moderateScale(5),
    padding: moderateScale(10),
    fontSize: moderateScale(14),
    minHeight: verticalScale(120),
  },
  inputFocused: {
    borderColor: '#007AFF',
  },
  counterContainer: {
    alignItems: 'flex-end',
    marginTop: moderateScale(5),
  },
  counterText: {
    fontSize: moderateScale(12),
    color: '#888',
  },
  previewContainer: {
    marginTop: moderateScale(20),
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: moderateScale(10),
  },
  previewTitle: {
    fontSize: moderateScale(15),
    fontWeight: '600',
    marginBottom: moderateScale(5),
  },
});
