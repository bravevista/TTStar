import * as Ably from 'ably';
import { AblyProvider, ChannelProvider } from 'ably/react';
import { ChatClientProvider } from '@ably/chat/react';
import { ChatClient, LogLevel } from '@ably/chat';
import { useUserStore } from '../contexts/store/useUserStore';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

const realtimeClient = new Ably.Realtime({
  authCallback: (params, callback) => {
    fetch(`${process.env.LOCAL_URL}/auth/ably-token`, {
      method: 'GET',
      credentials: 'include', // Enviar las cookies cross-origin
    })
      .then(res => {
        if (!res.ok) throw new Error('No autorizado');
        return res.json();
      })
      .then(tokenDetails => callback(null, tokenDetails))
      .catch(err => callback(err, null));
  },
  autoConnect: typeof window !== 'undefined',
});

const chatClient = new ChatClient(realtimeClient, {
  logLevel: LogLevel.Info,
});

export default function RealtimeProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUserUuid = useUserStore(state => state.user?._id);

  if (!currentUserUuid) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <AblyProvider client={realtimeClient}>
      <ChatClientProvider client={chatClient}>
        <ChannelProvider channelName={`notifications:${currentUserUuid}`}>
          {children}
        </ChannelProvider>
      </ChatClientProvider>
    </AblyProvider>
  );
}
