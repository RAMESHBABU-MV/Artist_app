import { apiService } from './api';

export interface Review {
    id: string;
    artist_profile_id: string;
    booking_id: string;
    customer_id: string;
    rating: number;
    comment: string;
    created_at: string;
    updated_at: string;
}

export const ReviewService = {
    getAll: async () => {
        const response = await apiService.get('/reviews');
        return response.data;
    },
    getById: async (id: string) => {
        const response = await apiService.get(`/reviews/${id}`);
        return response.data;
    },
    create: async (data: Partial<Review>) => {
        const response = await apiService.post('/reviews', { review: data });
        return response.data;
    },
    update: async (id: string, data: Partial<Review>) => {
        const response = await apiService.patch(`/reviews/${id}`, { review: data });
        return response.data;
    },
    delete: async (id: string) => {
        const response = await apiService.delete(`/reviews/${id}`);
        return response.data;
    }
};
