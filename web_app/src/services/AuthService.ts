import { apiService } from './api';
import { TokenManager } from './TokenManager';

export const AuthService = {
    login: async (credentials: any) => {
        const response = await apiService.post('/login', credentials);
        if (response.success) {
            await TokenManager.setToken(response.data.token);
            // Store only user info separately
            const { token, ...userInfo } = response.data;
            localStorage.setItem('user', JSON.stringify(userInfo));
        }
        return response;
    },
    signup: async (userData: any) => {
        const response = await apiService.post('/signup', { user: userData });
        if (response.success) {
            await TokenManager.setToken(response.data.token);
            // Server returns { user, token }. We store user.
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response;
    },

    logout: async () => {
        await TokenManager.clearToken();
        localStorage.removeItem('user');
    },
    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
};

