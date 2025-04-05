import { api } from "../config/Axios";

// ✅ Interceptor de auth
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            console.warn('Sesión expirada. Intentando refrescar toke...');
            await api.get('/auth/refresh-token'); // 🔄 Intentar renovar token
            return api(error.config); // Reintentar la petición original
        };
        return Promise.reject(error);
    },
);