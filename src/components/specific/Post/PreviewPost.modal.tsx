import React, { ReactNode } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { useTheme } from '../../../hooks/useTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface PreviewPostProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  closeButtonText?: string;
  backgroundDismiss?: boolean;
}

export default function PreviewPostModal({
  visible,
  onClose,
  title = '',
  children,
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
                      fontWeight: typography.fontWeights.bold,
                      fontSize: typography.fontSizes.lg,
                    },
                  ]}
                >
                  {title}
                </Text>
              ) : null}

              <View style={[styles.content]}>{children}</View>

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
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: moderateScale(2),
    borderRadius: moderateScale(10),
    padding: moderateScale(20),
    elevation: 5,
  },
  title: {
    fontSize: 18,
    marginBottom: moderateScale(12),
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginTop: moderateScale(10),
  },
});
