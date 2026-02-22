import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AvailabilityService, type Availability } from '../services/AvailabilityService';
import { useToast } from '../components/common/Toast';

export const useAvailabilities = () => {
    const queryClient = useQueryClient();
    const { showToast } = useToast();

    const {
        data: availabilities = [],
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: ['availabilities'],
        queryFn: async () => {
            const data = await AvailabilityService.getAll();
            return data as Availability[];
        }
    });

    const createMutation = useMutation({
        mutationFn: (data: Partial<Availability>) => AvailabilityService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['availabilities'] });
            showToast('Availability created successfully', 'success');
        },
        onError: (err: any) => {
            showToast(err.message || 'Failed to create availability', 'error');
        }
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Availability> }) =>
            AvailabilityService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['availabilities'] });
            showToast('Availability updated successfully', 'success');
        },
        onError: (err: any) => {
            showToast(err.message || 'Failed to update availability', 'error');
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => AvailabilityService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['availabilities'] });
            showToast('Availability deleted successfully', 'success');
        },
        onError: (err: any) => {
            showToast(err.message || 'Failed to delete availability', 'error');
        }
    });

    return {
        availabilities,
        isLoading,
        error,
        refetch,
        createAvailability: createMutation.mutate,
        updateAvailability: updateMutation.mutate,
        deleteAvailability: deleteMutation.mutate,
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending
    };
};
