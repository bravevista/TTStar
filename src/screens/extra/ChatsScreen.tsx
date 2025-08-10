import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { useQueryClient } from '@tanstack/react-query';
import { useListChats } from '../../hooks/useListChats.hook';
import { ChatWithContact } from '../../api/interface/response/getChat.reponse';
import { useState } from 'react';
import { Avatar, List, TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../types/navigation';
import ChatCard from '../../components/specific/ChatCard';
import { useChannel } from 'ably/react';
import { useUserStore } from '../../contexts/store/useUserStore';

interface Props {
  query: string;
}

interface ChatWithOptimisticState extends ChatWithContact {
  _optimistic?: boolean;
}

export default function ChatsScreen({ query }: Props) {
  const { colors } = useTheme();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<MainStackParamList, 'ChatConversation'>
    >();
  const [searchValue, setSearchValue] = useState('');
  const queryClient = useQueryClient();
  const currentUserUuid = useUserStore(state => state.user?._id);

  const { data, isLoading, isError, fetchNextPage, hasNextPage } = useListChats(
    {}
  );

  const chats: ChatWithOptimisticState[] =
    data?.pages.flatMap(page => page.data) ?? [];

  useChannel(`notifications:${currentUserUuid}`, message => {
    const updatedChat = message.data;

    queryClient.setQueryData(['listChats', {}], (oldData: any) => {
      if (!oldData) return oldData;

      const pages = oldData.pages.map((page: any) => ({
        ...page,
        data: [...page.data],
      }));

      let existingContact = null;
      let hasOptimisticVersion = false;

      for (const page of pages) {
        const idx = page.data.findIndex(
          (chat: any) => chat._id === updatedChat._id
        );
        if (idx !== -1) {
          existingContact = page.data[idx].contact;
          hasOptimisticVersion = page.data[idx]._optimistic === true;
          page.data.splice(idx, 1);
        }
      }

      pages[0].data.unshift({
        ...updatedChat,
        contact: existingContact,
        _optimistic: false,
      });

      pages[0].data.sort(
        (a: any, b: any) =>
          (b.lastMessage?.timestamp ?? 0) - (a.lastMessage?.timestamp ?? 0)
      );

      return {
        ...oldData,
        pages,
      };
    });
  });

  const filteredChats = chats.filter(chat => {
    if (!chat.contact) {
      return false; // Excluir chats sin contacto
    }

    const contact = chat.contact;
    const search = searchValue.toLowerCase();
    return (
      contact.name.toLowerCase().includes(search) ||
      contact.lastname.toLowerCase().includes(search) ||
      contact.username.toLowerCase().includes(search)
    );
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {isLoading && (
        <Text style={{ color: colors.text }}>Cargando chats...</Text>
      )}
      {isError && (
        <Text style={{ color: colors.error }}>Error al cargar los chats</Text>
      )}
      {filteredChats.length === 0 && !isLoading && (
        <Text style={{ color: colors.text }}>No hay chats disponibles</Text>
      )}
      {filteredChats.map(chat => (
        <ChatCard key={chat._id} chat={chat} />
      ))}
      {hasNextPage && (
        <Text style={{ color: colors.text }} onPress={() => fetchNextPage()}>
          Cargar más
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
});
