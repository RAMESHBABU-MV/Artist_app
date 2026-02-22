import { apiService } from './api';

export interface User {
    id: string;
    email: string;
    role: string;
    status: string;
    created_at: string;
}

export const UserService = {
    getAllUsers: async () => {
        const response = await apiService.get('/users');
        return response.data;
    },

    updateUserStatus: async (id: string, status: string) => {
        const response = await apiService.patch(`/users/${id}`, { user: { status } });
        return response.data;
    },
    updateUser: async (id: string, userData: Partial<User>) => {
        const response = await apiService.patch(`/users/${id}`, { user: userData });
        return response.data;
    },
    deleteUser: async (id: string) => {
        const response = await apiService.delete(`/users/${id}`);
        return response.data;
    }
};


