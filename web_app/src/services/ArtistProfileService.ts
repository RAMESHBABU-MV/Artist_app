import { apiService } from './api';

export interface ArtistProfile {
    id: string;
    user_id: string;
    bio: string;
    base_price: number;
    city: string;
    experience_years: number;
    is_approved: boolean;
    approved_at: string | null;
    created_at: string;
    updated_at: string;
}

export const ArtistProfileService = {
    getAll: async () => {
        const response = await apiService.get('/artist_profiles');
        return response.data;
    },
    getById: async (id: string) => {
        const response = await apiService.get(`/artist_profiles/${id}`);
        return response.data;
    },
    create: async (data: Partial<ArtistProfile>) => {
        const response = await apiService.post('/artist_profiles', { artist_profile: data });
        return response.data;
    },
    update: async (id: string, data: Partial<ArtistProfile>) => {
        const response = await apiService.patch(`/artist_profiles/${id}`, { artist_profile: data });
        return response.data;
    },
    delete: async (id: string) => {
        const response = await apiService.delete(`/artist_profiles/${id}`);
        return response.data;
    }
};
