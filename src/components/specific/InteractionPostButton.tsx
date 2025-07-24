import { View, Text, StyleSheet, Pressable } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import {
  MoreHorizontalCircle01Icon,
  StarIcon,
  Comment02Icon,
  AutoConversationsIcon,
  BookmarkAdd02Icon,
  ViewIcon,
  BubbleChatQuestionIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';

import { useTheme } from '../../hooks/useTheme';

interface InteractionPostProps {
  keyIcon: string;
  hugeIcon: 'StarIcon' | 'CommentIcon' | 'BoostIcon' | 'KeepIcon';
}

export default function InteractionPostButton({
  keyIcon,
  hugeIcon,
}: InteractionPostProps) {
  const { colors } = useTheme();
  let icon;
  switch (hugeIcon) {
    case 'StarIcon':
      icon = StarIcon;
      break;
    case 'CommentIcon':
      icon = Comment02Icon;
      break;
    case 'BoostIcon':
      icon = AutoConversationsIcon;
      break;
    case 'KeepIcon':
      icon = BookmarkAdd02Icon;
      break;
    default:
      icon = BubbleChatQuestionIcon;
      break;
  }

  return (
    <Pressable
      style={({ pressed }) => [
        styles.capsuleIcon,
        { backgroundColor: colors.card, opacity: pressed ? 0.7 : 1 },
      ]}
    >
      <HugeiconsIcon
        key={keyIcon}
        icon={icon}
        size={moderateScale(21)}
        color={colors.text}
        strokeWidth={1.2}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  capsuleIcon: {
    padding: moderateScale(10),
    borderRadius: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
