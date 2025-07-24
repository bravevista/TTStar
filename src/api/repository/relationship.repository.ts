import { api } from "../../config/Axios";
import { GetFriendRequestsParams } from "../interface/request/getFriendRequestsParams.request";
import { Params } from "../interface/request/endlessParams.request";
import { FriendRequestsResponse } from "../interface/response/friendRequests.response";
import { FriendsListResponse } from "../interface/response/friendsList.response";
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
  getFriendRequests: async (params?: GetFriendRequestsParams): Promise<FriendRequestsResponse> => {
    const query = new URLSearchParams();
    if (params?.limit !== undefined) {
      query.append('limit', params.limit.toString());
    };
    if (params?.cursor) {
      query.append('cursor', params.cursor);
    };

    try {
      const response = await api.request<FriendRequestsResponse>({
        method: 'GET',
        url: `/relationship/friend/requests${query.toString() ? `?${query}` : ''}`,
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
  getFriendsList: async (params?: Params): Promise<FriendsListResponse> => {
    const query = new URLSearchParams();
    if (params?.limit !== undefined) {
      query.append('limit', params.limit.toString());
    };
    if (params?.cursor) {
      query.append('cursor', params.cursor);
    };

    try {
      const response = await api.request<FriendsListResponse>({
        method: 'GET',
        url: `/relationship/friends/record${query.toString() ? `?${query}` : ''}`,
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
