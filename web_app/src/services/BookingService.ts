import { apiService } from './api';

export interface Booking {
    id: string;
    artist_profile_id: string;
    customer_id: string;
    service_id: string;
    booking_date: string;
    start_time: string;
    end_time: string;
    status: string;
    stripe_payment_intent_id?: string | null;
    total_amount: number;
    created_at: string;
    updated_at: string;
}

export const BookingService = {
    getAll: async () => {
        const response = await apiService.get('/bookings');
        return response.data;
    },
    getById: async (id: string) => {
        const response = await apiService.get(`/bookings/${id}`);
        return response.data;
    },
    create: async (data: Partial<Booking>) => {
        const response = await apiService.post('/bookings', { booking: data });
        return response.data;
    },
    update: async (id: string, data: Partial<Booking>) => {
        const response = await apiService.patch(`/bookings/${id}`, { booking: data });
        return response.data;
    },
    delete: async (id: string) => {
        const response = await apiService.delete(`/bookings/${id}`);
        return response.data;
    }
};
