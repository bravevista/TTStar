import { useQuery } from '@tanstack/react-query';
import { ChatsModule } from '../api/repository/chats.repository';
import { GetChatResponse } from '../api/interface/response/getChat.reponse';

export function useGetChat(chatId: string) {
  return useQuery<GetChatResponse, Error>({
    queryKey: ['getChat', chatId],
    queryFn: () => ChatsModule.getChat(chatId),
    enabled: !!chatId,
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: (failureCount, error: any) => {
      if (error.response.status === 404) {
        return false; // No reintentar si el chat no existe
      }
      return failureCount < 3; // Reintentar hasta 3 veces en caso de otros errores
    },
  });
}
