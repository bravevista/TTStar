import { api } from "../../config/Axios";
import { SearchParams } from "../interface/request/searchParams.request";
import { SearchUserResponse } from "../interface/response/searchUser.response";

export const SearchModule = {
  searchUsers: async (params: SearchParams): Promise<SearchUserResponse> => {
    try {
      const response = await api.request<SearchUserResponse>({
        method: 'GET',
        url: '/search/users',
        params
      });
      return response.data
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
