import { api } from "../../config/Axios";
import { AddPost } from "../interface/request/addPost.request";
import { Message } from "../interface/response/message.response";
import { PostDetails } from "../interface/response/postDetails.response";

export const PostsModule = {
  addPost: async (postEntries: AddPost): Promise<Message> => {
    try {
      const response = await api.request<Message>({
        method: 'POST',
        url: '/posts/add',
        data: postEntries,
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
    }
  },
  deletePost: async (postUuid: string): Promise<Message> => {
    try {
      const response = await api.request<Message>({
        method: 'DELETE',
        url: `/posts/delete/${postUuid}`,
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
    }
  },
  viewPost: async (postUuid: string): Promise<PostDetails> => {
    try {
      const response = await api.request<PostDetails>({
        method: 'GET',
        url: `/posts/view/${postUuid}`,
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
    }
  },
  support: async (postUuid: string): Promise<Message> => {
    try {
      const response = await api.request<Message>({
        method: 'POST',
        url: `/posts/support/${postUuid}`,
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
    }
  },
  keep: async (postUuid: string): Promise<Message> => {
    try {
      const response = await api.request<Message>({
        method: 'POST',
        url: `/posts/keep/${postUuid}`,
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
    }
  },
};
