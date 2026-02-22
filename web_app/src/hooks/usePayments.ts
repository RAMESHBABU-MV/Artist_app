import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PaymentService, type Payment } from '../services/PaymentService';
import { useToast } from '../components/common/Toast';

export const usePayments = () => {
    const queryClient = useQueryClient();
    const { showToast } = useToast();

    const {
        data: payments = [],
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const data = await PaymentService.getAll();
            return data as Payment[];
        }
    });

    const createMutation = useMutation({
        mutationFn: (data: Partial<Payment>) => PaymentService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['payments'] });
            showToast('Payment created successfully', 'success');
        },
        onError: (err: any) => {
            showToast(err.message || 'Failed to create payment', 'error');
        }
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Payment> }) =>
            PaymentService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['payments'] });
            showToast('Payment updated successfully', 'success');
        },
        onError: (err: any) => {
            showToast(err.message || 'Failed to update payment', 'error');
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => PaymentService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['payments'] });
            showToast('Payment deleted successfully', 'success');
        },
        onError: (err: any) => {
            showToast(err.message || 'Failed to delete payment', 'error');
        }
    });

    return {
        payments,
        isLoading,
        error,
        refetch,
        createPayment: createMutation.mutate,
        updatePayment: updateMutation.mutate,
        deletePayment: deleteMutation.mutate,
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending
    };
};
