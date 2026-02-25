import { apiService } from './api';

export interface Availability {
    id: string;
    artist_profile_id: string;
    available_date: string;
    start_time: string;
    end_time: string;
    is_booked: boolean;
    created_at: string;
    updated_at: string;
}

export const AvailabilityService = {
    getAll: async () => {
        const response = await apiService.get('/availabilities');
        return response.data;
    },
    getById: async (id: string) => {
        const response = await apiService.get(`/availabilities/${id}`);
        return response.data;
    },
    create: async (data: Partial<Availability>) => {
        const response = await apiService.post('/availabilities', { availability: data });
        return response.data;
    },
    update: async (id: string, data: Partial<Availability>) => {
        const response = await apiService.patch(`/availabilities/${id}`, { availability: data });
        return response.data;
    },
    delete: async (id: string) => {
        const response = await apiService.delete(`/availabilities/${id}`);
        return response.data;
    }
};
