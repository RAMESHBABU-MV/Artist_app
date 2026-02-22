import { apiService } from './api';

export interface Payment {
    id: string;
    booking_id: string;
    amount: number;
    currency: string;
    payment_status: string;
    stripe_payment_intent_id?: string | null;
    created_at: string;
    updated_at: string;
}

export const PaymentService = {
    getAll: async () => {
        const response = await apiService.get('/payments');
        return response.data;
    },
    getById: async (id: string) => {
        const response = await apiService.get(`/payments/${id}`);
        return response.data;
    },
    create: async (data: Partial<Payment>) => {
        const response = await apiService.post('/payments', { payment: data });
        return response.data;
    },
    update: async (id: string, data: Partial<Payment>) => {
        const response = await apiService.patch(`/payments/${id}`, { payment: data });
        return response.data;
    },
    delete: async (id: string) => {
        const response = await apiService.delete(`/payments/${id}`);
        return response.data;
    }
};
