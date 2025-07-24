import { api } from "../../config/Axios";
import { EndlessParams } from "../interface/request/endlessParams.request";
import { SessionParams } from "../interface/request/sessionParams.request";
import { Message } from "../interface/response/message.response";
import { PostResponse } from "../interface/response/post.response";

export const AnnaModule = {
  cleanSession: async (params: SessionParams): Promise<Message> => {
    try {
      const response = await api.request<Message>({
        method: 'POST',
        url: '/posts/anna/clean',
        params
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
      };
    };
  },
  feedContent: async (params: EndlessParams): Promise<PostResponse> => {
    try {
      const response = await api.request<PostResponse>({
        method: 'GET',
        url: '/posts/anna',
        params
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
      };
    };
  },
};
