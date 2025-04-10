import { api } from "../config/Axios";
import { Message } from "./interface/response/message.response";
import { navigate } from "../services/Navigation.service";

let isRefreshing = false;
let failedQueue: Array<() => void> = [];

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve) => {
                    failedQueue.push(() => resolve(api(originalRequest)));
                });
            };
            originalRequest._retry = true;
            isRefreshing = true;

            try {
                console.warn('Access token expirada. Intentando refrescar toke...');
                const response = await api.request<Message>({
                    method: 'POST',
                    url: '/auth/refresh-token',
                });
                console.log(response.data);
                isRefreshing = false;
                failedQueue.forEach((cb) => cb());
                failedQueue = [];
                return api(originalRequest);
            } catch(refreshError) {
                isRefreshing = false;
                failedQueue = [];
                // Logout
                const response = await api.request<Message>({
                    method: 'POST',
                    url: '/auth/force/logout'
                });
                console.log('Force logout:',response.data);
                // Redireccionar a Welcome
                navigate('Welcome');
                return Promise.reject(refreshError);
            };
        };
        return Promise.reject(error);
    },
);