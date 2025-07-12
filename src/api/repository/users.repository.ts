import { api } from "../../config/Axios";
import { UserProfile } from "../interface/response/userProfile.response";

export const UsersModule = {
  aboutMe: async (): Promise<UserProfile> => {
    try {
      const response = await api.request<UserProfile>({
        method: 'GET',
        url: '/users/about/me',
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
  aboutThis: async (uuid: string): Promise<UserProfile> => {
    try {
      const response = await api.request<UserProfile>({
        method: 'GET',
        url: `/users/about/this/${uuid}`,
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
  }
};
