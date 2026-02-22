import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { BookingService, type Booking } from '../services/BookingService';
import { useToast } from '../components/common/Toast';

export const useBookings = () => {
    const queryClient = useQueryClient();
    const { showToast } = useToast();

    const {
        data: bookings = [],
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
            const data = await BookingService.getAll();
            return data as Booking[];
        }
    });

    const createMutation = useMutation({
        mutationFn: (data: Partial<Booking>) => BookingService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
            showToast('Booking created successfully', 'success');
        },
        onError: (err: any) => {
            showToast(err.message || 'Failed to create booking', 'error');
        }
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Booking> }) =>
            BookingService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
            showToast('Booking updated successfully', 'success');
        },
        onError: (err: any) => {
            showToast(err.message || 'Failed to update booking', 'error');
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => BookingService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
            showToast('Booking deleted successfully', 'success');
        },
        onError: (err: any) => {
            showToast(err.message || 'Failed to delete booking', 'error');
        }
    });

    return {
        bookings,
        isLoading,
        error,
        refetch,
        createBooking: createMutation.mutate,
        updateBooking: updateMutation.mutate,
        deleteBooking: deleteMutation.mutate,
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending
    };
};
