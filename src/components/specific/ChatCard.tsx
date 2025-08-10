import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../hooks/useTheme';
import { View, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../types/navigation';
import { ChatWithContact } from '../../api/interface/response/getChat.reponse';
import { Avatar, List, TouchableRipple } from 'react-native-paper';

interface ChatCardProps {
  chat: ChatWithContact;
}

export default function ChatCard({ chat }: ChatCardProps) {
  const { colors, typography } = useTheme();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<MainStackParamList, 'ChatConversation'>
    >();

  const handlePress = () => {
    navigation.navigate('ChatConversation', { contactId: chat.contact.uuid });
  };

  return (
    <TouchableRipple
      key={chat._id}
      onPress={handlePress}
      rippleColor={colors.primary + '33'} // color con transparencia
      style={{ borderRadius: 8 }}
    >
      <List.Item
        key={chat._id}
        title={`${chat.contact.name} ${chat.contact.lastname}`}
        titleStyle={{ color: colors.text }}
        description={
          chat.lastMessage?.data
            ? (() => {
                try {
                  const messageData = JSON.parse(chat.lastMessage.data);
                  return messageData.text || chat.lastMessage.data;
                } catch {
                  return chat.lastMessage.data;
                }
              })()
            : ''
        }
        descriptionNumberOfLines={1}
        descriptionStyle={{ color: colors.textSecondary }}
        left={props => (
          <Avatar.Image
            {...props}
            size={50}
            source={{ uri: chat.contact.profilephoto }}
          />
        )}
        right={props => (
          <Text {...props} style={{ color: colors.text, fontSize: 12 }}>
            {chat.lastMessage
              ? new Date(chat.lastMessage.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : ''}
          </Text>
        )}
      />
    </TouchableRipple>
  );
}
