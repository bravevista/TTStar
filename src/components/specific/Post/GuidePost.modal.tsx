import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { MaterialIcons } from '@expo/vector-icons';

import { useTheme } from '../../../hooks/useTheme';
import PostContent from './PostContent';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface PreviewPostProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  closeButtonText?: string;
  backgroundDismiss?: boolean;
}

export default function GuidePostModal({
  visible,
  onClose,
  title = '',
  closeButtonText = 'Cerrar',
  backgroundDismiss = true,
}: PreviewPostProps) {
  const { colors, typography } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback
        onPress={backgroundDismiss ? onClose : undefined}
      >
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.modalContainer,
                {
                  backgroundColor: colors.background,
                  width: SCREEN_WIDTH,
                },
              ]}
            >
              {title ? (
                <Text
                  style={[
                    styles.title,
                    {
                      color: colors.text,
                      fontSize: typography.fontSizes.lg,
                      fontWeight: typography.fontWeights.bold,
                    },
                  ]}
                >
                  {title}
                </Text>
              ) : null}

              <Text style={[styles.subText, { color: colors.text }]}>
                Para los ejemplos usaremos la palabra{' '}
                <Text style={{ fontWeight: 'bold' }}>"kuyay"</Text>, pero puedes
                cambiarlo por el contenido que necesitas.
              </Text>

              <View style={styles.content}>
                <View
                  style={[styles.subContent, { borderColor: colors.border }]}
                >
                  <Text style={[styles.codeText, { color: colors.text }]}>
                    kuyay
                  </Text>
                  <Text style={[styles.codeText, { color: colors.text }]}>
                    **kuyay**
                  </Text>
                  <Text style={[styles.codeText, { color: colors.text }]}>
                    _kuyay_
                  </Text>
                  <Text style={[styles.codeText, { color: colors.text }]}>
                    [kuyay](https://...le.com/)
                  </Text>
                </View>

                <MaterialIcons
                  name="arrow-forward-ios"
                  size={moderateScale(32)}
                  color={colors.primary}
                  style={{ marginHorizontal: moderateScale(10) }}
                />

                <View
                  style={[styles.subContent, { borderColor: colors.border }]}
                >
                  <PostContent text="kuyay" />
                  <PostContent text="**kuyay**" />
                  <PostContent text="_kuyay_" />
                  <PostContent text="[kuyay](https://example.com/)" />
                </View>
              </View>

              <View style={styles.postText}>
                <Text style={{ fontWeight: 'bold', color: colors.primary }}>
                  ✨ PLUS ✨
                </Text>
                <Text style={{ color: colors.text }}>
                  Si deseas poner los links y que estos se muestren tal cual,
                  <Text style={{ fontWeight: typography.fontWeights.bold }}>
                    {' '}
                    puedes hacerlo
                  </Text>
                  ! Solo debes poner el link, por ejemplo:
                </Text>
                <Text style={[styles.codeTextV2, { color: colors.text }]}>
                  [link](link)
                </Text>
                <Text style={[styles.codeTextV2, { color: colors.text }]}>
                  [https://example.com/](https://example.com/)
                </Text>
              </View>

              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text
                  style={{
                    color: colors.primary,
                    fontSize: typography.fontSizes.md,
                    fontWeight: typography.fontWeights.bold,
                  }}
                >
                  {closeButtonText}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    borderRadius: moderateScale(12),
    padding: moderateScale(20),
    elevation: 5,
    gap: moderateScale(15),
  },
  title: {
    textAlign: 'center',
  },
  subText: {
    fontSize: moderateScale(13),
    textAlign: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subContent: {
    borderWidth: 1.5,
    borderRadius: moderateScale(12),
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: moderateScale(8),
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: moderateScale(12),
    paddingVertical: moderateScale(10),
  },
  codeTextV2: {
    fontFamily: 'monospace',
    fontSize: moderateScale(12),
  },
  postText: {
    gap: moderateScale(5),
    marginTop: moderateScale(10),
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: moderateScale(10),
  },
});
