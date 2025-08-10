import { MainStackParamList } from '../../types/navigation';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Keyboard,
  FlatList,
  TextInput as RNTextInput,
  Vibration,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Surface,
  Appbar,
  Avatar,
  Card,
  Button,
  TextInput,
  Menu,
} from 'react-native-paper';
import { useTheme } from '../../hooks/useTheme';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useUserStore } from '../../contexts/store/useUserStore';
import { useGetChat } from '../../hooks/useGetChat.hook';
import { useListMessages } from '../../hooks/useListMessages.hook';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { MoreVerticalIcon } from '@hugeicons/core-free-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SentIcon } from '@hugeicons/core-free-icons';
import { ChatRoomProvider, useMessages, useTyping } from '@ably/chat/react';
import { Message, MessageEvents, OrderBy } from '@ably/chat';
import { Message as AblyPubSubMessage } from 'ably';
import { useQueryClient } from '@tanstack/react-query';
import * as Ably from 'ably';
import { s } from 'react-native-size-matters';
import { useUserProfile } from '../../hooks/useUserProfile.hook';

type NormalizedMessage = {
  serial: string;
  clientId?: string;
  createdAt?: number;
  timestamp: number;
  text: string;
  action?: string;
  isDeleted?: boolean;
  editable: boolean;
  original?: Message;
};

interface ChatConversationContentProps {
  chatId: string;
  currentUserUuid?: string;
  contactId: string;
}

export default function ChatConversationScreen() {
  const currentUserUuid = useUserStore(state => state.user?._id);
  const route = useRoute<RouteProp<MainStackParamList, 'ChatConversation'>>();
  const { contactId } = route.params;
  const participantIds = [currentUserUuid, contactId].sort();
  const chatId = `chat-${participantIds.join('-')}`;

  return (
    <ChatRoomProvider id={chatId}>
      <ChatConversationContent
        chatId={chatId}
        currentUserUuid={currentUserUuid}
        contactId={contactId}
      />
    </ChatRoomProvider>
  );
}

function ChatConversationContent({
  chatId,
  currentUserUuid,
  contactId,
}: ChatConversationContentProps) {
  const { colors, typography } = useTheme();
  const navigation = useNavigation();
  const inputBox = useRef<RNTextInput>(null);
  //const messageEndRef = useRef<>(null);
  const flatListRef = useRef<FlatList>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [scrollPosition, setScrollPosition] = useState<{
    contentHeight: number;
    offset: number;
  } | null>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 });
  const [selectedMessage, setSelectedMessage] =
    useState<NormalizedMessage | null>(null);
  const messageRefs = useRef<{ [key: string]: View | null }>({});
  const [messageText, setMessageText] = useState('');
  const [persistedMessages, setPersistedMessages] = useState<
    AblyPubSubMessage[]
  >([]);
  const [historyMessages, setHistoryMessages] = useState<Message[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);
  const [editText, setEditText] = useState('');
  const [messageUpdates, setMessageUpdates] = useState<
    Record<
      string,
      {
        isDeleted?: boolean;
        updatedText?: string;
      }
    >
  >({});

  const queryClient = useQueryClient();

  const {
    data: chatData,
    isLoading: loadingChat,
    isError: errorChat,
    error: chatError,
    fetchStatus: fetchStatusChat,
  } = useGetChat(`${chatId}::$chat`);

  // Determinar si el chat existe o es nuevo (404)
  const isChatNew = errorChat && (chatError as any)?.response?.status === 404;

  // Fallback: Usar useUserProfile cuando el chat no existe
  const { userData: contactData, isLoading: loadingContactData } =
    useUserProfile(contactId);

  const {
    data: persistedMessagesData,
    isLoading: loadingPersisted,
    fetchNextPage,
    hasNextPage,
  } = useListMessages(
    {
      chatId: `${chatId}::$chat`,
      limit: 20,
    },
    {
      enabled: !isChatNew && !!chatData,
    }
  );

  const {
    send: sendMessage,
    update: updateMessage,
    deleteMessage,
    get,
  } = useMessages({
    listener: event => {
      const message = event.message;
      switch (event.type) {
        case MessageEvents.Created: {
          setMessages(prevMessages => {
            // Verificar si el mensaje ya existe para evitar duplicados
            if (
              prevMessages.some(existingMessage =>
                existingMessage.isSameAs(message)
              )
            ) {
              return prevMessages;
            }

            // Buscar el índice donde insertar el nuevo mensaje
            const index = prevMessages.findIndex(existingMessage =>
              existingMessage.after(message)
            );

            // Crear un nuevo array con el mensaje insertado en el lugar correcto
            const newMessages = [...prevMessages];
            if (index === -1) {
              newMessages.push(message); // Si no hay mensajes posteriores, agregar al final
            } else {
              newMessages.splice(index, 0, message); // Si hay mensajes posteriores, insertar en el índice encontrado
            }
            return newMessages;
          });
          break;
        }
        case MessageEvents.Updated: {
          setMessages(prevMessages => {
            // Encontrar el índice del mensaje original
            const index = prevMessages.findIndex(other =>
              message.isSameAs(other)
            );

            // Si no se encuentra el mensaje, retornar el array original
            if (index === -1) {
              return prevMessages;
            }

            // Aplicar la actualización al mensaje original
            const newMessage = prevMessages[index].with(event);

            // Crear un nuevo array con el mensaje actualizado
            const updatedArray = prevMessages.slice();
            updatedArray[index] = newMessage;
            return updatedArray;
          });

          // Registrar la actualización por serial para aplicarla a todos los mensajes
          setMessageUpdates(prev => ({
            ...prev,
            [message.serial]: {
              updatedText: message.text,
            },
          }));
          break;
        }
        case MessageEvents.Deleted: {
          // Soft delete
          setMessages(prevMessages => {
            // Encontrar el índice del mensaje a eliminar
            const index = prevMessages.findIndex(other =>
              message.isSameAs(other)
            );

            // Si no se encuentra el mensaje, retornar el array original
            if (index === -1) {
              return prevMessages;
            }

            // Aplicar la eliminación al mensaje original
            const newMessage = prevMessages[index].with(event);

            // Crear un nuevo array con el mensaje actualizado
            const updatedArray = prevMessages.slice();
            updatedArray[index] = newMessage;
            return updatedArray;
          });

          // Registrar la eliminación por serial para aplicarla a todos los mensajes
          setMessageUpdates(prev => ({
            ...prev,
            [message.serial]: {
              isDeleted: true,
            },
          }));
          break;
        }
        default: {
          console.error('Unhandled event', event);
        }
      }
    },
  });

  function normalizeMessage(
    msg: AblyPubSubMessage | Message
  ): NormalizedMessage {
    // Obtener el serial del mensaje
    const serial = msg.serial ?? '';

    // Verificar si hay actualizaciones para este mensaje
    const updates = messageUpdates[serial] || {};

    // Determinar si está eliminado basado en la acción del mensaje o las actualizaciones
    const isDeleted = updates.isDeleted || msg.action === 'message.delete';

    if ('data' in msg) {
      let text = '';
      try {
        const parsed =
          typeof msg.data === 'string' ? JSON.parse(msg.data) : msg.data;
        // Usar el texto actualizado si existe, de lo contrario usar el original
        text = updates.updatedText ?? parsed.text ?? '';
      } catch {
        text =
          updates.updatedText ?? (typeof msg.data === 'string' ? msg.data : '');
      }

      return {
        serial,
        clientId: msg.clientId,
        timestamp: Number(msg.createdAt ?? msg.timestamp),
        text,
        action: isDeleted ? 'message.delete' : (msg.action as string),
        isDeleted,
        editable: false,
      };
    }

    // Mensaje de ably/chat
    return {
      serial,
      clientId: msg.clientId,
      timestamp: Number(msg.timestamp),
      // Usar el texto actualizado si existe
      text: updates.updatedText ?? (msg as Message).text ?? '',
      action: isDeleted ? 'message.delete' : (msg.action as string),
      isDeleted,
      editable: true,
      original: msg as Message,
    };
  }

  const { currentlyTyping, keystroke, stop } = useTyping();

  useEffect(() => {
    async function convertPersisted() {
      if (persistedMessagesData) {
        // Mensajes de todas las páginas, ordenados descendente por fecha
        const rawMessages =
          persistedMessagesData.pages.flatMap(page => page.data) ?? [];
        // Convertir a InboundMessage
        const ablyMessages =
          await Ably.Realtime.Message.fromEncodedArray(rawMessages);
        setPersistedMessages(ablyMessages);
      }
    }

    convertPersisted();
  }, [persistedMessagesData]);

  useEffect(() => {
    const fetchRecentMessages = async () => {
      const now = Date.now();
      const fifteenMinutesAgo = now - 15 * 60 * 1000;

      try {
        const result = await get({
          start: fifteenMinutesAgo,
          end: now,
          orderBy: OrderBy.NewestFirst,
          limit: 100,
        });
        setHistoryMessages(result.items);
      } catch (error) {
        console.error('Error fetching recent messages from Ably:', error);
      }
    };

    fetchRecentMessages();
  }, [chatId]);

  const sendChatMessage = async (text: string) => {
    try {
      // Aquí se prosigue con el flujo normal de envío del mensaje al canal de Ably
      await sendMessage({ text: text });
      setMessageText('');
      inputBox.current?.focus();
      stop().catch(err => console.error('Error stopping typing', err)); // Detener el indicador de escritura al enviar el mensaje
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleInputChange = (newText: string) => {
    setMessageText(newText);

    // Si el usuario está escribiendo, enviar el evento de escritura
    // Solo enviar evento de "escribiendo" si NO se está editando un mensaje
    if (!editingMessage) {
      if (newText.trim().length > 0) {
        keystroke().catch(err => console.error('Error starting typing', err));
      } else {
        stop().catch(err => console.error('Error stopping typing', err));
      }
    }
  };

  const handleScroll = (event: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const distanceFromBottom =
      contentSize.height - contentOffset.y - layoutMeasurement.height;

    // Si está a menos de 30px del fondo, habilitar auto-scroll
    setShouldAutoScroll(distanceFromBottom < 30);
  };

  // Función para cargar más mensajes con preservación de posición
  const handleLoadMoreMessages = () => {
    if (flatListRef.current) {
      // Guardar posición actual antes de cargar más mensajes
      setScrollPosition({
        contentHeight,
        offset: flatListRef.current?.props?.contentOffset?.y || 0,
      });
      fetchNextPage();
    }
  };

  const openMenu = () => setShowMenu(true);

  const closeMenu = () => setShowMenu(false);

  const handleMessageLongPress = (message: NormalizedMessage) => {
    // Emitir un evento de vibración para feedback táctil
    Vibration.vibrate(8);

    // Guarda el mensaje seleccionado
    setSelectedMessage(message);

    // Obtiene la referencia del View del mensaje
    const messageRef = messageRefs.current[message.serial];

    if (messageRef) {
      // Mide la posición del mensaje en la pantalla
      messageRef.measureInWindow((x, y, width, height) => {
        // Calcula la posición para el menú
        const anchor = {
          x: x + width / 2, // Centrado horizontalmente respecto al mensaje
          y: y + height + 50, // 10px debajo del mensaje
        };

        setMenuAnchor(anchor);
        openMenu();
      });
    }
  };

  const startEditing = (message: Message) => {
    setEditingMessage(message);
    setMessageText(message.text);
    inputBox.current?.focus();
  };

  const cancelEditing = () => {
    setEditingMessage(null);
    setMessageText('');
    inputBox.current?.blur();
  };

  const handleUpdateMessage = async () => {
    if (!editingMessage) return;
    if (!messageText.trim()) {
      // Si el texto está vacío, cancelar la edición
      cancelEditing();
      return;
    }

    try {
      await updateMessage(
        editingMessage.copy({
          text: messageText,
          metadata: editingMessage.metadata,
          headers: editingMessage.headers,
        })
      );
      setEditingMessage(null);
      setMessageText('');
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  // Combinar todos los mensajes (historial de Mongo, historial de Ably y mensajes durante la sesión actual), evitando duplicados por serial
  const combinedMessages = [
    ...historyMessages,
    ...persistedMessages.filter(
      pm => !historyMessages.some(hm => hm.serial === pm.serial)
    ),
    ...messages.filter(
      msg =>
        !persistedMessages.some(pm => pm.serial === msg.serial) &&
        !historyMessages.some(hm => hm.serial === msg.serial)
    ),
  ].sort((a, b) => Number(b.createdAt) - Number(a.createdAt));

  const normalizedMessages = combinedMessages.map(normalizeMessage);

  /* Auto-scroll al final cuando llegan nuevos mensajes
  useEffect(() => {
    // Solo hacer scroll al final si no estamos cargando más mensajes
    if (!scrollPosition && flatListRef.current && shouldAutoScroll) {
      flatListRef.current.scrollToEnd({ animated: false });
    }
  }, [chatId, normalizedMessages.length, shouldAutoScroll]);*/

  // Preservar posición de scroll al cargar mensajes antiguos
  useEffect(() => {
    // Si hay una posición guardada después de cargar más mensajes
    if (scrollPosition && flatListRef.current && contentHeight > 0) {
      // Calcular diferencia entre altura anterior y nueva
      const diff = contentHeight - scrollPosition.contentHeight;

      // Mantener posición relativa al contenido anterior
      flatListRef.current.scrollToOffset({
        offset: scrollPosition.offset + diff,
        animated: false,
      });

      // Limpiar estado
      setScrollPosition(null);
    }
  }, [normalizedMessages.length, contentHeight]);

  useEffect(() => {
    return () => {
      // Limpia la query de mensajes de este chat al desmontar la pantalla
      queryClient.removeQueries({
        queryKey: ['listMessages', { chatId: `${chatId}::$chat`, limit: 20 }],
        exact: false,
      });
    };
  }, [chatId, queryClient]);

  // Determinar la información de contacto a mostrar (desde chatData o contactData)
  const contactInfo = isChatNew ? contactData : chatData?.contact;
  const isLoading = isChatNew ? loadingContactData : loadingChat;

  if (isLoading) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        <Text style={{ color: colors.text }}>Cargando conversación...</Text>
      </View>
    );
  }

  return (
    <ChatRoomProvider id={chatId}>
      <SafeAreaView
        style={[styles.container]}
        edges={['bottom', 'left', 'right']}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={{ flex: 1, backgroundColor: colors.background }}>
            <Surface style={{ elevation: 4 }}>
              <Appbar.Header
                style={{ backgroundColor: colors.background, height: 56 }}
              >
                <Appbar.BackAction
                  onPress={() => {
                    // Handle back action
                    navigation.goBack();
                  }}
                  color={colors.text}
                />
                <Avatar.Image
                  size={40}
                  source={{ uri: contactInfo?.profilephoto }}
                  style={{ marginRight: 10 }}
                />
                <Appbar.Content
                  title={`${contactInfo?.name} ${contactInfo?.lastname}`}
                  titleStyle={{
                    color: colors.text,
                    fontSize: typography.fontSizes.lg,
                  }}
                />
                <HugeiconsIcon icon={MoreVerticalIcon} />
              </Appbar.Header>
            </Surface>

            <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10 }}>
              <FlatList
                ref={flatListRef}
                data={normalizedMessages}
                keyExtractor={item => item.serial}
                inverted
                showsVerticalScrollIndicator={false}
                //onScroll={handleScroll}
                //scrollEventThrottle={16}
                /*onContentSizeChange={(w, h) => {
                  // Guardar altura del contenido para cálculos de posición
                  setContentHeight(h);

                  // Auto-scroll inicial o cuando llegan nuevos mensajes
                  if (shouldAutoScroll && !scrollPosition) {
                    flatListRef.current?.scrollToEnd({ animated: false });
                  }
                }}*/
                ListFooterComponent={() =>
                  hasNextPage && !isChatNew ? (
                    <Button
                      mode="text"
                      onPress={handleLoadMoreMessages}
                      loading={loadingPersisted}
                      style={{ marginVertical: 8 }}
                    >
                      Cargar más mensajes
                    </Button>
                  ) : null
                }
                renderItem={({ item }) => {
                  const isOwn = item.clientId === currentUserUuid;
                  const isDeleted = item.action === 'message.delete';
                  const messageText = isDeleted
                    ? 'Este mensaje fue eliminado'
                    : item.text;
                  return (
                    <View
                      style={{
                        flexDirection: isOwn ? 'row-reverse' : 'row',
                        alignItems: 'flex-end',
                        marginBottom: 10,
                        gap: 8,
                      }}
                      // Asigna la referencia a este View
                      ref={ref => {
                        messageRefs.current[item.serial] = ref;
                      }}
                    >
                      {!isOwn && (
                        <Avatar.Image
                          size={28}
                          source={{ uri: contactInfo?.profilephoto }}
                          style={{ marginBottom: 10, alignSelf: 'flex-end' }}
                        />
                      )}
                      <Card
                        mode="contained"
                        style={{
                          backgroundColor: isOwn ? colors.primary : colors.card,
                          maxWidth: '86%',
                          borderRadius: 16,
                          opacity: isDeleted ? 0.5 : 1,
                        }}
                        onLongPress={() => handleMessageLongPress(item)}
                        delayLongPress={300}
                      >
                        <Card.Content>
                          <Text
                            style={{
                              color: isOwn ? colors.background : colors.text,
                              fontSize: typography.fontSizes.md,
                            }}
                          >
                            {messageText}
                          </Text>
                        </Card.Content>
                      </Card>
                    </View>
                  );
                }}
              />
              <Menu
                visible={showMenu}
                onDismiss={closeMenu}
                anchor={menuAnchor}
                contentStyle={{
                  backgroundColor: colors.background,
                  borderRadius: 16,
                }}
              >
                {selectedMessage && (
                  <>
                    <Menu.Item
                      title={new Date(
                        selectedMessage.timestamp
                      ).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                      disabled={true}
                      titleStyle={{
                        color: colors.text,
                        fontSize: typography.fontSizes.sm,
                      }}
                    />
                    {selectedMessage.clientId === currentUserUuid &&
                      !selectedMessage.isDeleted &&
                      selectedMessage.editable && (
                        <>
                          <Menu.Item
                            title="Editar"
                            onPress={() => {
                              startEditing(selectedMessage.original!);
                              closeMenu();
                            }}
                            titleStyle={{
                              color: colors.text,
                              fontSize: typography.fontSizes.sm,
                            }}
                          />
                          <Menu.Item
                            title="Eliminar"
                            onPress={() => {
                              if (selectedMessage.original) {
                                deleteMessage(selectedMessage.original);
                              }
                              closeMenu();
                            }}
                            titleStyle={{
                              color: colors.error,
                              fontSize: typography.fontSizes.sm,
                            }}
                          />
                        </>
                      )}
                  </>
                )}
              </Menu>
              {/* Indicador de escritura */}
              {currentlyTyping.has(chatData?.contact.uuid ?? '') && (
                <Text>{chatData?.contact.name} está escribiendo...</Text>
              )}
            </View>
            <View
              style={{
                paddingVertical: 2,
                paddingHorizontal: 4,
                flexDirection: 'column',
                gap: 4,
                backgroundColor: colors.background,
              }}
            >
              {/* Mostrar indicador de edición si hay un mensaje en edición */}
              {editingMessage && (
                <View
                  style={{
                    backgroundColor: colors.primary,
                    padding: 8,
                    borderRadius: 16,
                    marginRight: 8,
                    flexDirection: 'row',
                  }}
                >
                  <Text
                    style={{
                      color: colors.background,
                      fontSize: typography.fontSizes.sm,
                    }}
                  >
                    Editando: {editingMessage.text}
                  </Text>
                  <Button
                    onPress={cancelEditing}
                    style={{
                      backgroundColor: colors.error,
                      borderRadius: 16,
                      height: 36,
                    }}
                  >
                    <Text
                      style={{
                        color: colors.background,
                        fontSize: typography.fontSizes.sm,
                      }}
                    >
                      Cancelar
                    </Text>
                  </Button>
                </View>
              )}
              <View
                style={{
                  paddingVertical: 2,
                  paddingHorizontal: 4,
                  flexDirection: 'row',
                  gap: 4,
                  backgroundColor: colors.background,
                }}
              >
                <TextInput
                  ref={inputBox}
                  placeholder="Mensaje"
                  mode="outlined"
                  style={{
                    backgroundColor: colors.background,
                    color: colors.text,
                    flex: 1,
                    height: 46,
                  }}
                  outlineStyle={{
                    borderRadius: 16,
                  }}
                  value={messageText}
                  onChangeText={handleInputChange}
                />
                {editingMessage ? (
                  <Button
                    mode="contained"
                    onPress={handleUpdateMessage}
                    style={{
                      backgroundColor: colors.primary,
                      borderRadius: 16,
                      height: 46,
                    }}
                  >
                    <Text
                      style={{
                        color: colors.background,
                        fontSize: typography.fontSizes.sm,
                      }}
                    >
                      Editar
                    </Text>
                  </Button>
                ) : (
                  <Button
                    style={{
                      backgroundColor: colors.primary,
                      borderRadius: 16,
                      height: 46,
                    }}
                    mode="contained"
                    onPress={() => {
                      sendChatMessage(messageText);
                    }}
                    disabled={!messageText.trim()}
                  >
                    <HugeiconsIcon
                      icon={SentIcon}
                      size={24}
                      color={colors.background}
                    />
                  </Button>
                )}
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ChatRoomProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
