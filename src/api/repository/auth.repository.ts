import { api } from "../../config/Axios";
import { Credentials } from "../interface/request/credentials.request";
import { Login } from "../interface/response/login.response";
import { Message } from "../interface/response/message.response";

export const AuthModule = {
  signIn: async (userCredentials: Credentials): Promise<Login> => {
    try {
      const response = await api.request<Login>({
        method: 'POST',
        url: '/auth/signin',
        data: userCredentials,
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
  signOut: async (): Promise<Message> => {
    try {
      const response = await api.request<Message>({
        method: 'POST',
        url: '/auth/signout'
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
