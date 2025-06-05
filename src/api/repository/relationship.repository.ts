import { api } from "../../config/Axios";
import { Message } from "../interface/response/message.response";

export const RelationshipModule = {
  follow: async (followedUuid: string): Promise<Message> => {
    try {
      const response = await api.request<Message>({
        method: 'POST',
        url: '/relationship/follow',
        data: { followedUuid },
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
  unFollow: async (followedUuid: string): Promise<Message> => {
    try {
      const response = await api.request<Message>({
        method: 'POST',
        url: '/relationship/unfollow',
        data: { followedUuid }
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
  getUserRelationship: async (uuid: string): Promise<AreRelated> => {
    try {
      const response = await api.request<AreRelated>({
        method: 'GET',
        url: `/relationship/know/${uuid}`
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
  getSocialStatistics: async (uuid: string): Promise<SocialStatistics> => {
    try {
      const response = await api.request<SocialStatistics>({
        method: 'GET',
        url: `/relationship/statistics/social/${uuid}`
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
  sendFriendRequest: async (receiverUuid: string): Promise<Message> => {
    try {
      const response = await api.request<Message>({
        method: 'POST',
        url: `/relationship/friend/request`,
        data: { receiverUuid }
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
  cancelFriendRequest: async (receiverUuid: string): Promise<Message> => {
    try {
      const response = await api.request<Message>({
        method: 'POST',
        url: `/relationship/friend/request/remove`,
        data: { receiverUuid }
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
  responseFriendRequest: async (senderUuid: string, response: string): Promise<Message> => {
    try {
      const responsef = await api.request<Message>({
        method: 'POST',
        url: `/relationship/friend/request/response`,
        data: {
          senderUuid,
          response, //Solo "Accepted" o "Rejected"
        }
      });
      return responsef.data;
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
