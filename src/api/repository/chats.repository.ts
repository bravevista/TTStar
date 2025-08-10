import { api } from '../../config/Axios';
import { ListChatsParams } from '../interface/request/listChatsParams.request';
import { ListMessagesParams } from '../interface/request/listMessagesParams.request';
import { GetChatResponse } from '../interface/response/getChat.reponse';
import { ListChatsResponse } from '../interface/response/listChats.response';
import { ListMessagesResponse } from '../interface/response/listMessages.response';

export const ChatsModule = {
  getChat: async (chatId: string): Promise<GetChatResponse> => {
    try {
      const response = await api.request<GetChatResponse>({
        method: 'GET',
        url: `/chats/${chatId}`,
      });
      return response.data;
    } catch (error: any) {
      console.error('Full Error Object:', error);

      if (error.response) {
        console.error('Response Error:', error.response.data);
        throw error; // Error original para poder acceder al código de error
        /*throw new Error(error.response.data.message || 'Error del servidor');*/
      } else if (error.request) {
        console.error('Request Error:', error.request);
        throw new Error('El servidor no responde');
      } else {
        console.error('Network Error:', error.message);
        throw new Error('Error de conexión');
      }
    }
  },
  listChats: async (params: ListChatsParams): Promise<ListChatsResponse> => {
    try {
      const listChatsParams = new URLSearchParams();
      if (params.limit) {
        listChatsParams.set('limit', params.limit.toString());
      }
      if (params.cursor) {
        listChatsParams.set('cursor', params.cursor);
      }
      const response = await api.request<ListChatsResponse>({
        method: 'GET',
        url: '/chats',
        params: listChatsParams,
      });
      return response.data;
    } catch (error: any) {
      console.error('Full Error Object:', error);
      if (error.response) {
        console.error('Response Error:', error.response.data);
        throw new Error(error.response.data.message || 'Error del servidor');
      } else if (error.request) {
        console.error('Request Error:', error.request);
        throw new Error('El servidor no responde');
      } else {
        console.error('Network Error:', error.message);
        throw new Error('Error de conexión');
      }
    }
  },
  listMessages: async (
    params: ListMessagesParams
  ): Promise<ListMessagesResponse> => {
    try {
      const listMessagesParams = new URLSearchParams();
      if (params.limit) {
        listMessagesParams.set('limit', params.limit.toString());
      }
      if (params.cursor) {
        listMessagesParams.set('cursor', params.cursor);
      }
      const response = await api.request<ListMessagesResponse>({
        method: 'GET',
        url: `/chats/${params.chatId}/messages`,
        params: listMessagesParams,
      });
      return response.data;
    } catch (error: any) {
      console.error('Full Error Object:', error);
      if (error.response) {
        console.error('Response Error:', error.response.data);
        throw new Error(error.response.data.message || 'Error del servidor');
      } else if (error.request) {
        console.error('Request Error:', error.request);
        throw new Error('El servidor no responde');
      } else {
        console.error('Network Error:', error.message);
        throw new Error('Error de conexión');
      }
    }
  },
};
