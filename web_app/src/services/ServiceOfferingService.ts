import { apiService } from './api';

export interface ServiceOffering {
    id: string;
    artist_profile_id: string;
    name: string;
    description: string;
    price: number;
    duration_minutes: number;
    created_at: string;
    updated_at: string;
}

export const ServiceOfferingService = {
    getAll: async () => {
        const response = await apiService.get('/services');
        return response.data;
    },
    getById: async (id: string) => {
        const response = await apiService.get(`/services/${id}`);
        return response.data;
    },
    create: async (data: Partial<ServiceOffering>) => {
        const response = await apiService.post('/services', { service: data });
        return response.data;
    },
    update: async (id: string, data: Partial<ServiceOffering>) => {
        const response = await apiService.patch(`/services/${id}`, { service: data });
        return response.data;
    },
    delete: async (id: string) => {
        const response = await apiService.delete(`/services/${id}`);
        return response.data;
    }
};
