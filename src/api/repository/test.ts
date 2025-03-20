import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { User } from '../interface/userTest';
import { api } from '../../config/Axios';

export const TestRepository = {
    getUsers: async (): Promise<User[]> => {
        const response = await api.request<User[]>({
            method: 'GET',
            url: '/users',
        });
        return response.data;
    },
};